export type CaptchaResponse = {
  data: string;
  id: number;
};

export type Proxy = {
  ip: string;
  port: number;
  login: string;
  password: string;
};

export type Account = {
  wallet: string;
  key: string;
  proxy: Proxy;
};

export type SwapKind = number;

export interface Swap {
  poolIdx: string;
  base: string;
  quote: string;
  isBuy: boolean;
}

export type StationContract =
  | "0x2E8410239bB4b099EE2d5683e3EF9d6f04E321CC"
  | "0xC5Cb3459723B828B3974f7E58899249C2be3B33d"
  | "0xAD57d7d39a487C04a44D3522b910421888Fb9C6d";
