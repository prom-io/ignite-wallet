import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {TransferCommand} from "./transfer.command";
import {PromTokenService} from "../../services/promToken.service";
import {WalletRepository} from "../../../../repositories/WalletRepository";
import {ConfigService} from "../../../../config/config.service";
import {TransferRepository} from "../../../../repositories/TransferRepository";
import {TransferEntity} from "../../../../entities/Transfer.entity";
import {TransferEnum} from "../../enums/transfer.enum";

@Injectable()
export class TransferHandler {
    constructor(
        private readonly configService: ConfigService,
        private readonly promTokenService: PromTokenService,
        private readonly walletRepository: WalletRepository,
        private readonly transferRepository: TransferRepository,
    ) {}

    public async handle(command: TransferCommand): Promise<void> {

        if(!await this.walletRepository.existAccount(command.from)) {
            throw new NotFoundException(`${command.from} not registered`);
        }

        if(!await this.walletRepository.existAccount(command.to)) {
            throw new NotFoundException(`${command.to} not registered`);
        }

        if(command.from === command.to) {
            throw new BadRequestException('From and to should be different!')
        }

        const balance = await this.promTokenService.balanceOf(command.from);

        if(balance < command.value) {
            throw new BadRequestException('Not enough funds on the balance of the PromToken!')
        }

        const from = await this.walletRepository.getAccountByAddress(command.from);
        const to = await this.walletRepository.getAccountByAddress(command.to);

        const transfer = new TransferEntity();
        transfer.from = from.address;
        transfer.to = to.address;
        transfer.value = String(command.value);
        transfer.createdAt = new Date();
        transfer.status = TransferEnum.PENDING;
        await this.transferRepository.save(transfer);

        // await this.promTokenService.transfer(from, to, command.value);
    }

}
