export interface IJwtUserPayload {
  user_id: string;
  email: string;
  roles?: string;
  first_name: string;
  last_name: string;
  // add other JWT payload fields if any
}
