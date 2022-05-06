export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailUtil {
  sendMail: (data: SendMailData) => Promise<void>;
}
