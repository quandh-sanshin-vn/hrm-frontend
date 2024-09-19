import { AuthRepository } from "../../infrastructure-interface/repositories/auth.repo-interface";

export class LogoutUseCase {
  private authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(): Promise<void> {
    await this.authRepo.signOut();
  }
}
