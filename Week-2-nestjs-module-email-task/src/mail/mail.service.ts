import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMailDto } from './dto/send-mail.dto';
import {
  IMailProvider,
  SendMailResult,
} from './interfaces/mail-provider.interface';
import { MAIL_PROVIDERS } from './mail.constants';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly registry = new Map<string, IMailProvider>();

  constructor(
    @Inject(MAIL_PROVIDERS) providers: IMailProvider[],
    private readonly config: ConfigService,
  ) {
    providers.forEach((p) => this.register(p));
  }

  register(provider: IMailProvider): void {
    this.registry.set(provider.name, provider);
  }

  resolve(name?: string): IMailProvider {
    const key =
      name ?? this.config.get<string>('MAIL_DEFAULT_PROVIDER', 'mock');
    const provider = this.registry.get(key);
    if (!provider) {
      throw new BadRequestException(
        `Mail provider "${key}" is not supported. Available: ${[...this.registry.keys()].join(', ')}`,
      );
    }
    return provider;
  }

  async send(dto: SendMailDto): Promise<SendMailResult> {
    const provider = this.resolve(dto.provider);
    try {
      return await provider.send({
        to: dto.to,
        subject: dto.subject,
        content: dto.content,
      });
    } catch (err) {
      this.logger.error(
        `Send via "${provider.name}" failed`,
        (err as Error).stack,
      );
      throw new BadGatewayException(`Failed to send email via ${provider.name}`);
    }
  }
}