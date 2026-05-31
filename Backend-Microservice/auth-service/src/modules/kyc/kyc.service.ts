import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma.service';
import { sumsubRequest } from '../../utils/sumsub.util';
import { createHmac } from 'crypto';

@Injectable()
export class KycService {
  constructor(private prisma: PrismaService) {}

  private get appToken() {
    return process.env.SUMSUB_APP_TOKEN!;
  }

  private get secretKey() {
    return process.env.SUMSUB_SECRET_KEY!;
  }

  private get webhookSecret() {
    return process.env.SUMSUB_WEBHOOK_SECRET!;
  }

  async initKyc(userId: string) {
    const existing = await this.prisma.kycVerification.findUnique({
      where: { userId },
    });

    let applicantId: string;

    if (existing) {
      applicantId = existing.applicantId;
    } else {
      let applicant = await sumsubRequest(
        'POST',
        '/resources/applicants?levelName=basic-kyc-level',
        { externalUserId: userId },
        this.appToken,
        this.secretKey,
      );

      if (!applicant.id) {
        const res = await sumsubRequest(
          'GET',
          `/resources/applicants/-;externalUserId=${userId}`,
          null,
          this.appToken,
          this.secretKey,
        );
        applicant = res?.list?.items?.[0] ?? res;
      }

      applicantId = applicant.id;

      await this.prisma.kycVerification.create({
        data: {
          userId,
          applicantId,
          status: 'pending',
        },
      });
    }

    const tokenRes = await sumsubRequest(
      'POST',
      `/resources/accessTokens?userId=${userId}&levelName=basic-kyc-level`,
      null,
      this.appToken,
      this.secretKey,
    );

    return {
      token: tokenRes.token,
      applicantId,
    };
  }

  async handleWebhook(payload: any, signature: string, rawBody: string) {
    const expectedSig = createHmac('sha256', this.webhookSecret)
      .update(rawBody)
      .digest('hex');

    console.log('=== WEBHOOK DEBUG ===');
    console.log('Received signature:', signature);
    console.log('Expected signature:', expectedSig);
    console.log('Webhook secret (first 5):', this.webhookSecret?.slice(0, 5));
    console.log('Raw body (first 100):', rawBody?.slice(0, 100));
    console.log('====================');

    if (expectedSig !== signature) {
      throw new Error('Invalid webhook signature');
    }

    const { applicantId, reviewResult, type } = payload;
    if (type !== 'applicantReviewed') return;

    const reviewAnswer = reviewResult?.reviewAnswer;

    await this.prisma.kycVerification.updateMany({
      where: { applicantId },
      data: {
        status: reviewAnswer === 'GREEN' ? 'verified' : 'rejected',
        reviewResult: reviewAnswer,
        verifiedAt: reviewAnswer === 'GREEN' ? new Date() : null,
      },
    });
  }

  async getStatus(userId: string) {
    const kyc = await this.prisma.kycVerification.findUnique({
      where: { userId },
      select: {
        status: true,
        reviewResult: true,
        verifiedAt: true,
        createdAt: true,
      },
    });

    if (!kyc) {
      return { status: 'not_started' };
    }
    console.log('KYC Status for user', userId, kyc);
    return kyc;
  }
}
