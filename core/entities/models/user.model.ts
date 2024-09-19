import { AuthToken } from "./authToken.model";

export class User {
  constructor(
    public id: string,
    public code: string,
    public leader_id: string,
    public user_name: string,
    public role: 1 | 2, // 1: admin; 2: usser
    public email: string,
    public phone: string,
    public address: string,
    public birth_day: string,
    public avatarUrl: string,

    public authToken: AuthToken
  ) {}
}
