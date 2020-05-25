import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {Web3Service} from "../../web3/web3.service";
import Web3 from 'web3';
import {ConfigService} from "../../../config/config.service";
import {WalletsEntity} from "../../../entities/Wallets.entity";
import {TransactionFactory} from "../factories/transaction.factory";
import {TransactionRepository} from "../../../repositories/TransactionRepository";
import {WalletRepository} from "../../../repositories/WalletRepository";
import {Transaction} from 'ethereumjs-tx';
@Injectable()
export class PromTokenService{
    private readonly logger = new Logger(PromTokenService.name);

    private web3: Web3;
    private contract: any;
    private config: ConfigService;
    private web3Service: Web3Service;
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
        this.web3Service = web3Service;
        this.config = configService;
        this.web3 = web3Service.websocketInstance();
        this.contract = this.getContract();
        this.transactionFactory = transactionFactory;
        this.transactionRepository = transactionRepository;
        this.walletRepository = walletRepository;
    }

    public async sendEther(from: WalletsEntity, to: string, value: string) {
        const nonce = await this.web3.eth.getTransactionCount(from.address);
        const amountToSend = this.toWeiConvert(value);
        const rawTransaction = {
            'nonce': nonce,
            'from': from.address,
            'gas': 200000,
            'to': to,
            'value': amountToSend,
            'chainId': Number(this.config.get('CHAIN_ID'))
        };
        const signedTx = await this.web3.eth.accounts.signTransaction(
            rawTransaction,
            from.privateKey,
        );

        return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    }

    public toWeiConvert(value: string) {
        return this.web3.utils.toWei(value, 'ether');
    }

    public async getBalance(address: string, toEtherConvert: boolean = false): Promise<string> {
        if(toEtherConvert) {
            const balance = await this.web3.eth.getBalance(address);
            return this.toWeiConvert(balance);
        }
        return this.web3.eth.getBalance(address);
    }

    public async balanceOf(address: string): Promise<any> {
        const web3 = this.web3Service.httpInstance();
        const contract = new web3.eth.Contract(
            this.config.getPromTokenAbi(),
            this.config.getPromTokenAddress()
        );
        return contract.methods.balanceOf(address).call();
    }

    public async transfer(from: WalletsEntity, to: WalletsEntity, value: string): Promise<any> {
        const transfer = await this.contract.methods.transfer(to.address, Number(value));
        const transferAbi = transfer.encodeABI();
        const count = await this.web3.eth.getTransactionCount(from.address);
        const signedTx = await this.web3.eth.accounts.signTransaction({
            nonce: count,
            from: from.address,
            to: this.config.getPromTokenAddress(),
            data: transferAbi,
            gas: 109973,
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
                console.log(event);
                const dto: TransactionDto = event.returnValues;
                const fromExist = await this.walletRepository.existAccount(dto.from);
                const toExist = await this.walletRepository.existAccount(dto.to);
                if(fromExist || toExist) {
                    const transaction = this.transactionFactory.createTransferTransaction(dto);
                    transaction.transactionHash = event.transactionHash;
                    transaction.rawTransaction = event;
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
