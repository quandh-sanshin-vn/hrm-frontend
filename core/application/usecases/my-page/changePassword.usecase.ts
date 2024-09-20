import { Password } from "@/core/entities/models/password.model";
import { UserRepository } from "../../infrastructure-interface/repositories/user.repo-interface";

export class ChangePasswordUseCase {
  private userRepo: UserRepository;
  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }
  async execute(password: Password): Promise<any | null> {
    const changePasswordResponse = await this.userRepo.changePassword(password);
    return changePasswordResponse;
  }
}
