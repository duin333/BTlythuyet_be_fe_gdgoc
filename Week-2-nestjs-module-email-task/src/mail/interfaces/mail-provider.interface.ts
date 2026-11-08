import { MailProviderName } from '../enums/mail-provider.enum';

export interface SendMailPayload {
  to: string;
  subject: string;
  content: string;
}

export interface SendMailResult {
  provider: MailProviderName;
  messageId: string;
  previewUrl?: string;
}

export interface IMailProvider {
  readonly name: MailProviderName;
  send(payload: SendMailPayload): Promise<SendMailResult>;
}