export interface RollRequest {
  clientSeed: string;
  nonce: number;
  betAmount: number;
}

export interface RollResponse {
  roll: number;
  hash: string;
  balanceAfter: number;
  won: boolean;
  winAmount: number;
}
