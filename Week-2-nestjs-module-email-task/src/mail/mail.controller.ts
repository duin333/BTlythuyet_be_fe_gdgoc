import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SendMailDto } from './dto/send-mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  async send(@Body() dto: SendMailDto) {
    const result = await this.mailService.send(dto);
    return { message: 'Email sent successfully', ...result };
  }
}