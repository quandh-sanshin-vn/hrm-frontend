import { LoginParams, loginRequest, logoutRequest } from "@/apis/modules/auth";
import { AuthRepository } from "@/core/application/infrastructure-interface/repositories/auth.repo-interface";
import { AuthCredentials } from "@/core/entities/models/authCredentials.model";
import { AuthToken } from "@/core/entities/models/authToken.model";
import { User } from "@/core/entities/models/user.model";
import { expirationDate } from "@/utilities/helper";
import { signIn, signOut, getSession } from "next-auth/react";

export class AuthRepositoryImpl implements AuthRepository {
  async signIn(credentials: AuthCredentials): Promise<AuthToken | null> {
    try {
      const params: LoginParams = {
        email: String(credentials.email),
        password: String(credentials.password),
      };
      const response = await loginRequest(params);
      const { access_token, refresh_token, expires_in } = response.data;
      return {
        token: access_token,
        refreshToken: refresh_token,
        expiresAt: expirationDate(expires_in),
        isValid: () => new Date() < expirationDate(expires_in),
      };
    } catch (error) {
      return null;
    }
  }

  async getUser(token: AuthToken): Promise<User | null> {
    return null;
  }

  async signOut(): Promise<void> {
    try {
      console.log("---------1 request.data logout -------------");
      await logoutRequest();
      console.log("---------1 response.data logout -------------");
      return;
    } catch (error) {
      return;
    }
  }
}
