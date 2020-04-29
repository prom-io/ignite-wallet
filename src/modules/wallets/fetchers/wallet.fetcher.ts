import {Injectable, NotFoundException} from "@nestjs/common";
import {WalletRepository} from "../../../repositories/WalletRepository";

@Injectable()
export class WalletFetcher {
    constructor(
        private readonly walletRepository: WalletRepository,
    ) {}

    public async all() {
        return this.walletRepository.all();
    }
}
