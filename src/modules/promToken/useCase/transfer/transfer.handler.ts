import {Injectable, NotFoundException} from "@nestjs/common";
import {TransferCommand} from "./transfer.command";
import {PromTokenService} from "../../services/promToken.service";
import {WalletRepository} from "../../../../repositories/WalletRepository";
import {ConfigService} from "../../../../config/config.service";

@Injectable()
export class TransferHandler {
    constructor(
        private readonly configService: ConfigService,
        private readonly promTokenService: PromTokenService,
        private readonly walletRepository: WalletRepository,
    ) {}

    public async handle(command: TransferCommand): Promise<void> {

        if(!await this.walletRepository.existAccount(command.from)) {
            throw new NotFoundException(`${command.from} not registered`);
        }

        if(!await this.walletRepository.existAccount(command.to)) {
            throw new NotFoundException(`${command.to} not registered`);
        }

        const from = await this.walletRepository.getAccountByAddress(command.from);
        const to = await this.walletRepository.getAccountByAddress(command.to);

        const value = this.promTokenService.toWeiConvert(command.value);
        await this.promTokenService.transfer(from, to, value);
        console.log(222);
    }

}
