export interface IEmailConversations {
  conversationId: string;
  conversationType: string;
  recipients: string[];
  messages: IEmailMessage[];
}

export interface IEmailMessage {
  '@odata.etag': string;
  id: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  changeKey: string;
  categories: any[];
  receivedDateTime: string;
  sentDateTime: string;
  hasAttachments: boolean;
  internetMessageId: string;
  subject: string;
  bodyPreview: string;
  importance: string;
  parentFolderId: string;
  conversationId: string;
  conversationIndex: string;
  isDeliveryReceiptRequested: any;
  isReadReceiptRequested: boolean;
  isRead: boolean;
  isDraft: boolean;
  webLink: string;
  inferenceClassification: string;
  body: Body;
  sender: Sender;
  from: From;
  toRecipients: ToRecipient[];
  ccRecipients: any[];
  bccRecipients: any[];
  replyTo: any[];
  flag: Flag;
}

export interface Body {
  contentType: string;
  content: string;
}

export interface Sender {
  emailAddress: EmailAddress;
}

export interface EmailAddress {
  name: string;
  address: string;
}

export interface From {
  emailAddress: EmailAddress2;
}

export interface EmailAddress2 {
  name: string;
  address: string;
}

export interface ToRecipient {
  emailAddress: EmailAddress3;
}

export interface EmailAddress3 {
  name: string;
  address: string;
}

export interface Flag {
  flagStatus: string;
}
