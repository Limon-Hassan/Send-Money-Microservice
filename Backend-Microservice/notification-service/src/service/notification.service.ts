import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Twilio } from 'twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;
  private twilioClient: Twilio;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });

    this.twilioClient = new Twilio(
      this.configService.get('TWILIO_ACCOUNT_SID'),
      this.configService.get('TWILIO_AUTH_TOKEN'),
    );
  }

  async sendOtpEmail(email: string, otp: string) {
    await this.transporter.sendMail({
      from: `"UMS Security" <${this.configService.get('SMTP_FROM')}>`,
      to: email,
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Your OTP Code</h2>
          <p>Your OTP is:</p>
          <h1 style="color: #4CAF50; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP will expire in <strong>5 minutes</strong>.</p>
          <p>If you didn't request this, please ignore.</p>
        </div>
      `,
    });
    console.log(`Email sent to ${email}`);
  }

  async sendOtpSms(phone: string, otp: string) {
    let formattedPhone = phone;
    if (!phone.startsWith('+')) {
      formattedPhone = `+88${phone}`;
    }

    console.log('Sending SMS to:', formattedPhone);
    console.log('From:', this.configService.get('TWILIO_FROM'));
    console.log('SID:', this.configService.get('TWILIO_ACCOUNT_SID'));

    await this.twilioClient.messages.create({
      body: `Your OTP is: ${otp}. Expires in 5 minutes.`,
      from: this.configService.get('TWILIO_FROM'),
      to: formattedPhone,
    });
    console.log(`SMS sent to ${formattedPhone}`);
  }
}
