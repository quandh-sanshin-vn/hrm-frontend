"use client";
import {
  getUserRequest,
  LoginParams,
  loginRequest,
  logoutRequest,
  updateUserRequest,
} from "@/apis/modules/auth";
import { AuthRepository } from "@/core/application/infrastructure-interface/repositories/auth.repo-interface";
import { AuthCredentials } from "@/core/entities/models/authCredentials.model";
import { AuthToken } from "@/core/entities/models/authToken.model";
import { CommonResponse } from "@/core/entities/models/responseCommon.model";

import {
  getDepartmentRequest,
  getPositionRequest,
} from "@/apis/modules/common";
import { useCommonStore } from "@/stores/commonStore";
import { useUserStore } from "@/stores/userStore";
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
      await this.getCommonData(token);
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
      const response: any = await getUserRequest(token);
      if (response && response.data) {
        const setUser = useUserStore.getState().setUser;
        setUser(response.data);
      }
      return response;
    } catch (error: any) {
      return error;
    }
  }

  async updateUser(params: FormData): Promise<CommonResponse | null> {
    try {
      const res: any = await updateUserRequest(params);
      return res;
    } catch (error: any) {
      return error;
    }
  }
  async getCommonData(token: AuthToken): Promise<boolean | null> {
    try {
      const position: any = await getPositionRequest(token);
      const department: any = await getDepartmentRequest(token);

      const updatePositionData = useCommonStore.getState().updatePositionData;
      const updateDepartmentData =
        useCommonStore.getState().updateDepartmentData;
      if (position && position.data) {
        const formatted = position.data.map((i: any) => {
          return {
            value: i.id,
            name: i.name,
          };
        });
        updatePositionData(formatted);
      }
      if (department && department.data) {
        updateDepartmentData(department.data);
      }
      return true;
    } catch (error: any) {
      return false;
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
