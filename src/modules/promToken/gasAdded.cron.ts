import {Injectable, Logger} from "@nestjs/common";
import {Cron} from "@nestjs/schedule";
import {WalletRepository} from "../../repositories/WalletRepository";
import {PromTokenService} from "./services/promToken.service";
import {TransferRepository} from "../../repositories/TransferRepository";
import {TransferEntity} from "../../entities/Transfer.entity";
import asyncForEach from '../../utils/asyncForEach';
import {TransferEnum} from "./enums/transfer.enum";
import {ConfigService} from "../../config/config.service";

@Injectable()
export class GasAddedCron {
    private readonly logger = new Logger(GasAddedCron.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly walletRepository: WalletRepository,
        private readonly promTokenService: PromTokenService,
        private readonly transferRepository: TransferRepository,
    ) {}

    @Cron('* * * * *')
    public async handleCron() {
        try {
            this.logger.debug('Gas added processing start!');

            const transfers = await this.transferRepository.allGasAddedTransactions();
            await asyncForEach(transfers, async (transfer: TransferEntity) => {
                const from = await this.walletRepository.getAccountByAddress(transfer.from);
                const to = await this.walletRepository.getAccountByAddress(transfer.to);

                const promTokenDecimal = this.configService.getPromTokenDecimal();
                const transferValue = Number(transfer.value);
                const totalValue = transferValue * promTokenDecimal;
                await this.promTokenService.transfer(from, to, totalValue);
                transfer.status = TransferEnum.COMPLETE;
                await this.transferRepository.save(transfer);
            });

            this.logger.debug('Gas added processing complete!');
        } catch (e) {
            this.logger.error(e.code);
            this.logger.error(e.message);
        }
    }
}
