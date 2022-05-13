import { MailAdapter, SendMailData } from "../mail-adapter";

import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ef9f37475308e7",
    pass: "676944898bf49d"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Eduardo Rodrigues <edusacramento9@gmail.com>",
      subject: subject,
      html: body,
    })
  }
}