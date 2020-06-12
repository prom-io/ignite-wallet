import {ConflictException, Injectable} from "@nestjs/common";
import {ConfigService} from "../../../config/config.service";
import {PromTokenService} from "./promToken.service";
import {WalletRepository} from "../../../repositories/WalletRepository";
import {TransferRepository} from "../../../repositories/TransferRepository";
import {TransferEntity} from "../../../entities/Transfer.entity";

@Injectable()
export class TransferService {
    constructor(
        private readonly transferRepository: TransferRepository,
    ) {}

    public async checkActiveTransfer(from: string): Promise<boolean> {
        const pending = await this.transferRepository.findFromPendingTransfer(from);
        const gasAdded = await this.transferRepository.findFromGasAddTransfer(from);

        if(pending instanceof TransferEntity) {
            return true;
        }

        if(gasAdded instanceof TransferEntity) {
            return true;
        }
        return false;
    }
}
