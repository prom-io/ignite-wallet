import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {jwtConstants} from "./constants";
import {AuthenticationService} from "./authentication.service";
import {LocalStrategy} from "./local.strategy";
import {JwtStrategy} from "./jwt.strategy";
import {AuthController} from "./auth.controller";
import {UserRepository} from "../../repositories/UserRepository";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '7d' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthenticationService, LocalStrategy, JwtStrategy, UserRepository],
})
export class UserModule {}
