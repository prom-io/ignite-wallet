import {Controller, Request, Post, UseGuards, Get, Res} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import {Response} from "express";
import * as bcrypt from 'bcryptjs';

@Controller('/api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthenticationService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
