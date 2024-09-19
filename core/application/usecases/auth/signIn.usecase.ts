import { AuthCredentials } from "@/core/entities/models/authCredentials.model";
import { AuthToken } from "@/core/entities/models/authToken.model";
import { AuthRepository } from "../../infrastructure-interface/repositories/auth.repo-interface";
import { AuthService } from "../../infrastructure-interface/services/auth.service-interface";

export class LoginUseCase {
  private authRepo: AuthRepository;
  private authService: AuthService;

  constructor(authRepo: AuthRepository, authService: AuthService) {
    this.authRepo = authRepo;
    this.authService = authService;
  }
  async execute(credentials: AuthCredentials): Promise<AuthToken | null> {
    const authData = await this.authRepo.signIn(credentials);
    if (authData?.token) {
      this.authService.saveToken(authData?.token);
      return authData;
    }
    return null;
  }
}
