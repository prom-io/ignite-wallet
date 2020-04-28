import {Injectable, NotFoundException} from "@nestjs/common";
import {PromTokenService} from "../services/promToken.service";
import {WalletRepository} from "../../../repositories/WalletRepository";

@Injectable()
export class PromTokenFetcher {
    constructor(
        private readonly promTokenService: PromTokenService,
        private readonly walletRepository: WalletRepository,
    ) {}

    public async balanceOf(address: string) {
        // if(!await this.walletRepository.existAccount(address)) {
        //     throw new NotFoundException(`${address} address not registered!`);
        // }
        // const wallet = await this.walletRepository.getAccountByAddress(address);
        return await this.promTokenService.balanceOf(address);
    }
}
