export class AuthToken {
  constructor(
    public token: string, // JWT token hoặc session token
    public refreshToken: string, // JWT token hoặc session token
    public expiresAt: Date // Thời điểm token hết hạn
  ) {}

  // Phương thức để kiểm tra token còn hợp lệ hay không
  public isValid(): boolean {
    return new Date() < this.expiresAt;
  }
}
