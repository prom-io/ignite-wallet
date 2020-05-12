import {WalletService} from "../../services/wallet.service";
import {WalletRepository} from "../../../../repositories/WalletRepository";
import {WalletFactory} from "../../factories/wallet.factory";
import {HttpService, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {Wallets} from "../../../../entities/Wallets";
import {ConfigService} from "../../../../config/config.service";
import {ClientProxy} from "@nestjs/microservices";
import {RedisService} from "nestjs-redis";
import {AuthService} from "../../services/igniteBackend/auth.service";

@Injectable()
export class CreateWalletHandler {
    constructor(
        private readonly walletService: WalletService,
        private readonly walletRepository: WalletRepository,
        private readonly walletFactory: WalletFactory,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly redisService: RedisService,
        private readonly authService: AuthService,
    ) {}

    public async handle(): Promise<Wallets> {
        const client = await this.redisService.getClient();
        try {
            const walletDto: WalletDto = await this.walletService.generateWallet();
            let accessToken = await client.get('ignite_backend_access_token');

            if(accessToken === '' || accessToken === null) {
                const result = await this.authService.auth();
                await client.set('ignite_backend_access_token', result.access_token);
                accessToken = await client.get('ignite_backend_access_token');
            }

            await this.httpService.post('/api/v1/accounts', {
                address: walletDto.address,
                privateKey: walletDto.privateKey,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).toPromise();
            const wallet = this.walletFactory.createWallet(walletDto);
            await this.walletRepository.save(wallet);
            return wallet;
        } catch (e) {
            console.log(1);
            console.log(e);
            if(e.response.status === 401) {
                const result = await this.authService.auth();
                await client.set('ignite_backend_access_token', result.access_token);
                return this.handle();
            }
            throw e;
        }
    }
}
