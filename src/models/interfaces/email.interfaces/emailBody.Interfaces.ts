export interface IGetEmailMessagesParams {
  email: string;
}

export interface IEmailSendBody {
  sender: string;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  attachments: string;
  schedule_send: Date | null;
}
