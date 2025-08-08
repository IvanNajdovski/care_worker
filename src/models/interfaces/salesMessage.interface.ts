export interface ISalesMessagePostBody {
  from: string;
  to: string[];
  message: string;
  attachments?: { name: string; contentType: string; contentBytes: string }[];
  'media_url[][url]': string;
}
