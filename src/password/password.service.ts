import { Injectable } from '@nestjs/common';
import bcrypt from "bcrypt"
@Injectable()
export class PasswordService {

    private readonly saltRounds = 10;
    
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
      }
    
      async comparePassword(plainPassword: string,hashedPassword: string,
      ): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
      }

}
