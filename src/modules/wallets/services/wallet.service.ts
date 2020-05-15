import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {ConfigService} from "../../../config/config.service";
import * as bip39 from 'bip39';
const HDNode = require('hdkey');

import * as ethUtil from 'ethereumjs-util'
import {WalletRepository} from "../../../repositories/WalletRepository";
import {WalletFactory} from "../factories/wallet.factory";
@Injectable()
export class WalletService implements OnModuleInit {
    private readonly logger = new Logger(WalletService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly walletFactory: WalletFactory,
        private readonly walletRepository: WalletRepository,
    ) {}

    async onModuleInit() {
        if(!await this.walletRepository.existMasterAccount()) {
            await this.generateMaster();
        }
    }

    public async generateWallet(): Promise<{address: string, publicKey: string, privateKey: string}> {
        const root = await this.getRoot();
        const index = await this.walletRepository.getAllWalletCount();
        const addrNode = root.derive(`m/44'/60'/0'/0/${index}`);

        const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
        const addr = ethUtil.publicToAddress(pubKey).toString('hex');
        const address = ethUtil.toChecksumAddress(addr);

        return {
            address,
            publicKey: addr,
            privateKey: addrNode.privateKey.toString('hex'),
        };
    }

    public async getRoot() {
        const mnemonic = this.configService.get('MNEMONIC');
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = HDNode.fromMasterSeed(seed);
        return root.derive(`m/44'/60'/0'/0/0`);
    }

    public async generateMaster(): Promise<void> {
        const mnemonic = this.configService.get('MNEMONIC');
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = HDNode.fromMasterSeed(seed);

        const addrNode = root.derive("m/44'/60'/0'/0/0");
        const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
        const addr = ethUtil.publicToAddress(pubKey).toString('hex');
        const address = ethUtil.toChecksumAddress(addr);

        const walletDto: WalletDto = {
            address,
            publicKey: addr,
            privateKey: addrNode.privateKey.toString('hex'),
        }
        const wallet = this.walletFactory.createMaster(walletDto);
        await this.walletRepository.save(wallet);
    }
}
