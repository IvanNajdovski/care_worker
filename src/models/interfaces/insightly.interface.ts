export interface IInsightlyDataItem {
  CONTACT_ID: number;
  SALUTATION: any;
  FIRST_NAME: string;
  LAST_NAME: string;
  IMAGE_URL: any;
  BACKGROUND: any;
  OWNER_USER_ID: number;
  DATE_CREATED_UTC: string;
  DATE_UPDATED_UTC: string;
  SOCIAL_LINKEDIN: any;
  SOCIAL_FACEBOOK: any;
  SOCIAL_TWITTER: any;
  DATE_OF_BIRTH: string;
  PHONE: any;
  PHONE_HOME: any;
  PHONE_MOBILE: any;
  PHONE_OTHER: any;
  PHONE_ASSISTANT: any;
  PHONE_FAX: any;
  EMAIL_ADDRESS: string;
  ASSISTANT_NAME: any;
  ADDRESS_MAIL_STREET: any;
  ADDRESS_MAIL_CITY: any;
  ADDRESS_MAIL_STATE: any;
  ADDRESS_MAIL_POSTCODE: any;
  ADDRESS_MAIL_COUNTRY: any;
  ADDRESS_OTHER_STREET: any;
  ADDRESS_OTHER_CITY: any;
  ADDRESS_OTHER_STATE: any;
  ADDRESS_OTHER_POSTCODE: any;
  ADDRESS_OTHER_COUNTRY: any;
  LAST_ACTIVITY_DATE_UTC: string;
  NEXT_ACTIVITY_DATE_UTC: string;
  CREATED_USER_ID: number;
  ORGANISATION_ID: number;
  TITLE: any;
  EMAIL_OPTED_OUT: boolean;
  CUSTOMFIELDS: Customfields[];
  TAGS: Tags[];
  DATES: any[];
  LINKS: Links[];
}

export interface Customfields {
  FIELD_NAME: string;
  FIELD_VALUE: any;
  CUSTOM_FIELD_ID: string;
}

export interface Tags {
  TAG_NAME: string;
}

export interface Links {
  DETAILS: any;
  ROLE: any;
  LINK_ID: number;
  OBJECT_NAME: string;
  OBJECT_ID: number;
  LINK_OBJECT_NAME: string;
  LINK_OBJECT_ID: number;
}
