import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MailProviderName } from '../enums/mail-provider.enum';
import {
  IMailProvider,
  SendMailPayload,
  SendMailResult,
} from '../interfaces/mail-provider.interface';

@Injectable()
export class SmtpMailProvider implements IMailProvider {
  readonly name = MailProviderName.SMTP;
  private readonly transporter: nodemailer.Transporter;
  private readonly from: string;

  constructor(config: ConfigService) {
    const port = Number(config.get('SMTP_PORT', 587));
    this.from = config.get<string>('MAIL_FROM', 'no-reply@example.com');
    this.transporter = nodemailer.createTransport({
      host: config.get<string>('SMTP_HOST'),
      port,
      secure: port === 465,
      auth: {
        user: config.get<string>('SMTP_USER'),
        pass: config.get<string>('SMTP_PASS'),
      },
    });
  }

  async send({
    to,
    subject,
    content,
  }: SendMailPayload): Promise<SendMailResult> {
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);
    const info = await this.transporter.sendMail({
      from: this.from,
      to,
      subject,
      ...(isHtml ? { html: content } : { text: content }),
    });
    return {
      provider: this.name,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info) || undefined,
    };
  }
}