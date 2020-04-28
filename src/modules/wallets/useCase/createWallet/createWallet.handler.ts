import {WalletService} from "../../services/wallet.service";
import {WalletRepository} from "../../../../repositories/WalletRepository";
import {WalletFactory} from "../../factories/wallet.factory";
import {Injectable} from "@nestjs/common";
import {Wallets} from "../../../../entities/Wallets";

@Injectable()
export class CreateWalletHandler {
    constructor(
        private readonly walletService: WalletService,
        private readonly walletRepository: WalletRepository,
        private readonly walletFactory: WalletFactory,
    ) {}

    public async handle(): Promise<Wallets> {
        const walletDto: WalletDto = await this.walletService.generateWallet();
        const wallet = this.walletFactory.createWallet(walletDto);
        await this.walletRepository.save(wallet);
        return wallet;
    }
}
