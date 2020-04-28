import {IsNotEmpty, Matches} from "class-validator";

export class TransferCommand {
    @IsNotEmpty()
    @Matches(
        new RegExp("^0x[a-fA-F0-9]{40}$"),
        {
            message: "From address must be valid Ethereum address"
        }
    )
    readonly from: string;

    @IsNotEmpty()
    @Matches(
        new RegExp("^0x[a-fA-F0-9]{40}$"),
        {
            message: "From address must be valid Ethereum address"
        }
    )
    readonly to: string;

    @IsNotEmpty()
    readonly value: string;
}
