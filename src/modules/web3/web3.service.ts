import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class Web3Service {
    private config: ConfigService;

    constructor(config: ConfigService) {
        this.config = config;
    }

    public websocketInstance(): Web3 {
        return new Web3(
            new Web3.providers.WebsocketProvider(
                this.config.get('MAIN_NETWORK_WEBSOCKET_HOST')
            )
        );
    }
}
