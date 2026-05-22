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

  async initKyc(userId: string) {
    const existing = await this.prisma.kycVerification.findUnique({
      where: { userId },
    });

    let applicantId: string;

    if (existing) {
      applicantId = existing.applicantId;
    } else {
      const applicant = await sumsubRequest(
        'POST',
        '/resources/applicants?levelName=basic-kyc-level',
        { externalUserId: userId },
        this.appToken,
        this.secretKey,
      );

      console.log('SUMSUB RESPONSE:', JSON.stringify(applicant)); 

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
    const expectedSig = createHmac('sha256', this.secretKey)
      .update(rawBody)
      .digest('hex');

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

    return kyc;
  }
}
