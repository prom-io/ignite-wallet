import { Module, Global } from '@nestjs/common';
import {Web3Service} from "./web3.service";

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [Web3Service],
})
export class Web3Module {}
