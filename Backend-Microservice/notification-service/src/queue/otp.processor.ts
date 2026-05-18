import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { NotificationService } from '../service/notification.service';

@Processor('otp-queue')
export class OtpProcessor {
  constructor(private notificationService: NotificationService) {}

  @Process('send-otp')
  async handleOtp(job: Job) {
    const { email, phone, otp } = job.data;

    console.log(`Processing OTP job → ${email || phone}`);

    try {
      if (email) {
        await this.notificationService.sendOtpEmail(email, otp);
      }

      if (phone) {
        await this.notificationService.sendOtpSms(phone, otp);
      }
    } catch (error) {
      console.error('OTP job failed:', error.message);
    }
  }
}
