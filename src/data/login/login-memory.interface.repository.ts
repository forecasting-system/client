export interface UserApiResponse {
  id: string;
  username: string;
  email: string;
}

export interface LoginApiResponse {
  user: UserApiResponse;
  token: string;
}
