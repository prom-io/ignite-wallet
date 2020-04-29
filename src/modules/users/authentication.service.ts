import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {UserRepository} from "../../repositories/UserRepository";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOne(username);
        if (user && (await this.passwordsAreEqual(user.password, pass))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    private async passwordsAreEqual(
        hashedPassword: string,
        plainPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
}
