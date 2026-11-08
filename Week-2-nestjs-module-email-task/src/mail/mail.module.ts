import { Module } from '@nestjs/common';
import { IMailProvider } from './interfaces/mail-provider.interface';
import { MAIL_PROVIDERS } from './mail.constants';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MockMailProvider } from './providers/mock-mail.provider';
import { SmtpMailProvider } from './providers/smtp-mail.provider';

@Module({
  controllers: [MailController],
  providers: [
    SmtpMailProvider,
    MockMailProvider,
    {
      provide: MAIL_PROVIDERS,
      useFactory: (
        smtp: SmtpMailProvider,
        mock: MockMailProvider,
      ): IMailProvider[] => [smtp, mock],
      inject: [SmtpMailProvider, MockMailProvider],
    },
    MailService,
  ],
  exports: [MailService],
})
export class MailModule {}