import {Injectable, Logger} from "@nestjs/common";
import {Cron} from "@nestjs/schedule";
import {WalletRepository} from "../../repositories/WalletRepository";
import {PromTokenService} from "./services/promToken.service";
import {TransferRepository} from "../../repositories/TransferRepository";
import {TransferEntity} from "../../entities/Transfer.entity";
import asyncForEach from '../../utils/asyncForEach';
import {TransferEnum} from "./enums/transfer.enum";
@Injectable()
export class TransferPendingCron {
    private readonly logger = new Logger(TransferPendingCron.name);

    constructor(
        private readonly walletRepository: WalletRepository,
        private readonly promTokenService: PromTokenService,
        private readonly transferRepository: TransferRepository,
    ) {}

    @Cron('* * * * *')
    public async handleCron() {
        try {
            this.logger.debug('Pending transfer processing start!');
            const master = await this.walletRepository.getMasterAccount();
            const balance = await this.promTokenService.getBalance(master.address);

            if(Number(balance) <= 0) {
                throw new Error('In master account balance less zero!');
            }

            const transfers = await this.transferRepository.allPendingTransactions();
            await asyncForEach(transfers, async (transfer: TransferEntity) => {
                await this.promTokenService.sendEther(
                    master,
                    transfer.from,
                    '0.01'
                );
                transfer.status = TransferEnum.GAS_ADD;
                await this.transferRepository.save(transfer);
            });
            this.logger.debug('Pending transfer processing complete!');
        } catch (e) {
            this.logger.error(e.code);
            this.logger.error(e.message);
        }
    }
}
