import { ethers } from "ethers-ts"

export type CaptchaResponse = {
    data: string;
    id: number;
}

export type Proxy = {
    ip: string
    port: number
    login: string
    password: string
}


export type Account = {
    wallet: string
    key: string
    proxy: Proxy
}


export type SwapKind = number;

export interface Swap {
    poolId: string;
    assetIn: string;
    assetOut: string;
    amountIn: ethers.BigNumber;
    amountOut: number;
    userData: Uint8Array;
    gasLimit?: number
}
