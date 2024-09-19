import { Password } from "@/core/entities/models/password.model";

export interface UserRepository {
  changePassword(password: Password): Promise<any | null>;
}
