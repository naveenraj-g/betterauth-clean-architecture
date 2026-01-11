import nodemailer from "nodemailer";
import { EmailService } from "../../domain/interfaces/email.service.interface";
import { TSendEmailPayload } from "@/modules/shared/entities/types/email";

export class NodemailerEmailService implements EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async send(message: TSendEmailPayload): Promise<void> {
    await this.transporter.sendMail({
      from: message.from ?? "noreply@example.com",
      to: message.to,
      subject: message.subject,
      html: message.html,
    });
  }
}
