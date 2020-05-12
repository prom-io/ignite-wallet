import {HttpService, Injectable} from "@nestjs/common";
import {ConfigService} from "../../../../config/config.service";
import {RedisService} from "nestjs-redis";

@Injectable()
export class AuthService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    public async auth(): Promise<any> {
        const result = await this.httpService.post('/api/v3/auth/login', {
            username: this.configService.get('IGNITE_USERNAME'),
            password: this.configService.get('IGNITE_PASSWORD')
        }).toPromise();
        if(result.status !== 201) {
            throw new Error('Not authorized!');
        }
        return result.data;
    }
}
