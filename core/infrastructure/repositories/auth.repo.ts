"use client";
import { LoginParams, loginRequest, logoutRequest } from "@/apis/modules/auth";
import { AuthRepository } from "@/core/application/infrastructure-interface/repositories/auth.repo-interface";
import { AuthCredentials } from "@/core/entities/models/authCredentials.model";
import { AuthToken } from "@/core/entities/models/authToken.model";
import { User } from "@/core/entities/models/user.model";
import { expirationDate } from "@/utilities/helper";

export class AuthRepositoryImpl implements AuthRepository {
  async signIn(credentials: AuthCredentials): Promise<AuthToken | any> {
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
      };
    } catch (error) {
      return error;
    }
  }

  async getUser(token: AuthToken): Promise<any | null> {
    return null;
  }

  async signOut(): Promise<any> {
    try {
      const res = await logoutRequest();
      return res;
    } catch (error) {
      return error;
    }
  }
}
