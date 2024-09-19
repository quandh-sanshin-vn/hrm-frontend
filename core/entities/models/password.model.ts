import { PASSWORD_REGEX } from "@/utilities/validate";

export class Password {
  constructor(public currentPassword: string, public newPassword: string) {}

  public isValid(): boolean {
    return PASSWORD_REGEX.test(this.newPassword);
  }
}
