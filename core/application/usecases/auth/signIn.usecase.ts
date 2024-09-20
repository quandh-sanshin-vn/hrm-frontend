"use client";
import { AuthCredentials } from "@/core/entities/models/authCredentials.model";
import { AuthToken } from "@/core/entities/models/authToken.model";
import { AuthRepository } from "../../infrastructure-interface/repositories/auth.repo-interface";

export class LoginUseCase {
  private authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }
  async execute(credentials: AuthCredentials): Promise<AuthToken | any> {
    const authData = await this.authRepo.signIn(credentials);
    if (authData?.token) {
      // get user info here
      // const user = await this.authRepository.getUser(token);
      return authData;
    }
    return {
      message: authData.response.message,
      code: authData.response.code,
      statusCode: authData.status,
    };
  }
}
