import { Injectable, Logger } from '@nestjs/common';
import { MailProviderName } from '../enums/mail-provider.enum';
import {
  IMailProvider,
  SendMailPayload,
  SendMailResult,
} from '../interfaces/mail-provider.interface';

@Injectable()
export class MockMailProvider implements IMailProvider {
  readonly name = MailProviderName.MOCK;
  private readonly logger = new Logger(MockMailProvider.name);

  send({ to, subject, content }: SendMailPayload): Promise<SendMailResult> {
    this.logger.log(`[MOCK] To: ${to} | Subject: ${subject}\n${content}`);
    return Promise.resolve({
      provider: this.name,
      messageId: `mock-${Date.now()}`,
    });
  }
}