import { AuthCredentials } from "@/core/entities/models/authCredentials.model";
import { AuthToken } from "@/core/entities/models/authToken.model";
import { User } from "@/core/entities/models/user.model";

export interface AuthRepository {
  signIn(credentials: AuthCredentials): Promise<AuthToken | any>;
  getUser(token: AuthToken): Promise<User | null>;
  signOut(): Promise<any>;
}
