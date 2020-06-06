import {Injectable, NotFoundException} from "@nestjs/common";
import {PromTokenService} from "../services/promToken.service";
import {WalletRepository} from "../../../repositories/WalletRepository";
import {ConfigService} from "../../../config/config.service";

@Injectable()
export class PromTokenFetcher {
    constructor(
        private readonly configService: ConfigService,
        private readonly promTokenService: PromTokenService,
        private readonly walletRepository: WalletRepository,
    ) {}

    public async balanceOf(address: string) {
        // if(!await this.walletRepository.existAccount(address)) {
        //     throw new NotFoundException(`${address} address not registered!`);
        // }
        // const wallet = await this.walletRepository.getAccountByAddress(address);
        const balance = await this.promTokenService.balanceOf(address);
        const promTokenDecimal = this.configService.getPromTokenDecimal();
        return balance / promTokenDecimal;
    }
}
