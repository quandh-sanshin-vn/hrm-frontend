"use client";
import { getUserRequest, LoginParams, loginRequest, logoutRequest } from "@/apis/modules/auth";
import { AuthRepository } from "@/core/application/infrastructure-interface/repositories/auth.repo-interface";
import { AuthCredentials } from "@/core/entities/models/authCredentials.model";
import { AuthToken } from "@/core/entities/models/authToken.model";
import { CommonResponse } from "@/core/entities/models/responseCommon.model";
import { useUserStore } from "@/stores/staffStore";
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
      const token = new AuthToken(
        access_token,
        refresh_token,
        expirationDate(expires_in)
    );

    await this.getUser(token);

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
    try {
      const response : any = await getUserRequest(token);
      if(response && response.data) {
        const setUser = useUserStore.getState().setUser;
        setUser(response.data)
      }
      return response;
  }catch(error : any) {
      return error;
    }
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
