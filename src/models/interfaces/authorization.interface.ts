export interface IJwtUserPayload {
  user_id: string;
  email: string;
  role?: string;
  first_name: string;
  last_name: string;
  // add other JWT payload fields if any
}
