import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {Web3Service} from "../../web3/web3.service";
import Web3 from 'web3';
import {ConfigService} from "../../../config/config.service";
import {Wallets} from "../../../entities/Wallets";
import {TransactionFactory} from "../factories/transaction.factory";
import {TransactionRepository} from "../../../repositories/TransactionRepository";
import {WalletRepository} from "../../../repositories/WalletRepository";

@Injectable()
export class PromTokenService{
    private readonly logger = new Logger(PromTokenService.name);

    private web3: Web3;
    private config: ConfigService;
    private contract: any;
    private transactionFactory: TransactionFactory;
    private transactionRepository: TransactionRepository;
    private walletRepository: WalletRepository;

    constructor(
        web3Service: Web3Service,
        configService: ConfigService,
        transactionFactory: TransactionFactory,
        transactionRepository: TransactionRepository,
        walletRepository: WalletRepository,
    ) {
        this.config = configService;
        this.web3 = web3Service.websocketInstance();
        this.contract = this.getContract();
        this.transactionFactory = transactionFactory;
        this.transactionRepository = transactionRepository;
        this.walletRepository = walletRepository;
    }

    public toWeiConvert(value: string) {
        return this.web3.utils.toWei(value, 'ether');
    }

    public async balanceOf(address: string): Promise<any> {
        return this.contract.methods.balanceOf(address).call();
    }

    public async transfer(from: Wallets, to: Wallets, value: string): Promise<any> {
        const transfer = await this.contract.methods.transfer(to.address, value);
        const transferAbi = transfer.encodeABI();

        const signedTx = await this.web3.eth.accounts.signTransaction({
            from: from.address, value, data: transferAbi, gas: 1e6, gasPrice: 8 * 1e9
        }, from.privateKey);

        return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    }

    public getContract() {
        return new this.web3.eth.Contract(
            this.config.getPromTokenAbi(),
            this.config.getPromTokenAddress()
        );
    }

    public transferListener() {
        this.contract.events.Transfer({}, (error, event) => {})
            .on('data', async (event) => {
                const dto: TransactionDto = event.returnValues;
                const fromExist = await this.walletRepository.existAccount(dto.from);
                const toExist = await this.walletRepository.existAccount(dto.to);
                if(fromExist || toExist) {
                    const transaction = this.transactionFactory.createTransferTransaction(dto);
                    await this.transactionRepository.save(transaction);
                    this.logger.debug('Transaction saved!');
                }
            })
            .on('error', (error) => {
                console.log(error);
            });
    }

    public approvalListener() {
        this.contract.events.Approval({}, (error, event) => {})
            .on('data', async (event) => {
                console.log(event);
            })
            .on('error', (error) => {
                console.log(error);
            });
    }
}
