import { sendTransactionData } from "@developeruche/runtime-sdk/dist/utils/interfaces";
import { AxiosResponse } from "axios";
import { GasApiResponse, Magic } from "magic-sdk";
import { Dispatch, SetStateAction } from "react";

export interface MeProtocolProviderProps {
  children: React.ReactNode;
  email: string;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  OPEN_REWARD_IMPLEMENTATION: string;
  JSON_RPC_URL: string;
  ME_TOKEN: string;
  magicApiKey: string;
  CHAIN_ID: number;
  TREASURY: string;
  VAULT: string;
  debug?: boolean;
  costPayerId?: string;
}

// export interface MeRegisterProps {
//   setLoading: Dispatch<SetStateAction<boolean>>;
//   setError: Dispatch<SetStateAction<unknown>>;
//   meApiKey: string;
//   reqURL: string;
//   costPayerId?: string;
//   email: string; magic:any
//   brandName: string;
//   onlinePresence: string;
// }

export interface CreateRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  name: string;
  symbol: string;
  descriptionLink: string;
  totalSupply: string;
}

export interface OnBoardRewardsProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  email: string;
  magic: Magic;
  reward_address: string;
  brand_id: BigInt;
  persist: boolean;
  RUNTIME_URL: string;
}
export interface OnBoardBrandRuntimeProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  email: string;
  magic: Magic;
  main_acct: string;
  brand_reward: string;
  brand_id: BigInt;
  persist: boolean;
  RUNTIME_URL: string;
}

export interface DeployRewardAndPoolProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  TREASURY: string;
  VAULT: string;
  OPEN_REWARD_IMPLEMENTATION: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  brandId: string;
  name: string;
  symbol: string;
  descriptionLink: string;
  totalSupplyVault: number | BigInt;
  totalSupplyTreasury: number | BigInt;
  rOptimal: number | BigInt;
  maximumRLimit: number | BigInt;
  minimumRewardAmountForConversation: number | BigInt;
  minimumMeAmountForConversation: number | BigInt;
  notifyRewardAmount: number | BigInt;
  notifyMeAmount: number | BigInt;
  persist: boolean;
}
export interface OnboardBrandProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  OPEN_REWARD_IMPLEMENTATION: string;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  brandId: string;
  brandName: string;
  brandOnlinePresence: string;
  persist: boolean;
}

export interface AddLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  ME_TOKEN: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  currentBrandId: string;
  rewardAddress: string;
  rewardAmount: string;
  meAmount: string;
  persist: boolean;
}

export interface DistributeRewardsProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  email: string;
  magic: Magic;
  reward_address: string;
  reward_recipient: Array<string>;
  reward_amounts: Array<BigInt>;
  persist: boolean;
  RUNTIME_URL: string;
}
export interface MagicProps {
  key: string;
  CHAIN_ID: number;
  JSON_RPC_URL: string;
}

export interface spendRewardsOnIssuingBrandWithVaultPermitProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  setSpendLoading: Dispatch<SetStateAction<boolean>>;
  setSpendingSteps: Dispatch<SetStateAction<number>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  email: string;
  magic: Magic;
  reward_amount: BigInt;
  reward_address: string;
  rewardId: string;
  costPayerId?: string;
  RUNTIME_URL: string;
  orderId: string;
}

export interface ChangeOptimalOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  rewardName: string;
  newOptimalValue: number;
}

export interface SetUpOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  OPEN_REWARD_IMPLEMENTATION: string;
  ME_TOKEN: string;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  rewardAddress: string;
  rOptimal: number;
  maximumRLimit: number;
  minimumRewardAmountForConversation: number;
  minimumMeAmountForConversation: number;
  notifyRewardAmount: number;
  notifyMeAmount: number;
  defaultSlippageInPrecision: number;
  allowSwaps: boolean;
}
export interface SetUpWalletProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  persist: boolean;
}
export interface GetWalletFromEmailProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  userEmail: string;
  magic: Magic;
  persist: boolean;
}

export interface ChangeMainAccountProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  newMainAcctAddress: string;
}

export interface ActivateOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  rewardAddress: string;
}
export interface IntegrateRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  rewardAddress: string;
  descriptionLink: string;
  readTandC: boolean;
}
export interface TopUpOpenRewardLiquidityProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  ME_TOKEN: string;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  address: string;
  meAmount: string;
  rewardAmount: string;
}

export interface SpendRewardOnIssuingBrandProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  spendAddress: string;
  spendAmount: string;
}

export interface EditableRewardConfig {
  specificException: boolean;
  bountyEnables: boolean;
  caiEnabled: boolean;
  bountyTriggerLimit: number;
  bountyContributionInPrecision: number;
  payIncomingGasFee: boolean;
  payOutgoingGasFee: boolean;
}

export interface UpdateRewardConfigProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  address: string;
  brandId: string;
  ignoreDefault: boolean;
  rewardConfig: EditableRewardConfig;
}

export interface EditableRewardDetails {
  name: string;
  symbol: string;
  descriptionLink: string;
}

export interface UpdateRewardDetailsProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  rewardAddress: string;
  brandId: string;
  details: EditableRewardDetails;
  ignoreDefault: boolean;
}

export interface EditableBrandDetails {
  name: string;
  onlinePresence: string;
}

export interface UpdateBrandDetailsProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  brandId: string;
  brandDetails: EditableBrandDetails;
  ignoreDefault: boolean;
}

export interface EditableBrandConfig {
  enableBountyRewards: boolean;
  enableCais: boolean;
  payIncomingGasFees: boolean;
  payOutgoingGasFees: boolean;
}

export interface UpdateGeneralConfigProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  brandId: string;
  generalConfig: EditableBrandConfig;
  ignoreDefault: boolean;
}

export interface EditableConfigForTypeAOpenRewards {
  maximumRLimit: number;
  minimumRewardAmountForConversation: string;
  minimumMeAmountForConversation: string;
  notifyRewardAmount: number;
  notifyMeAmount: number;
  defaultSlippageInPrecision: number;
  allowSwaps: boolean;
}
export interface UpdateOpenRewardConfigProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  rewardAddress: string;
  config: EditableConfigForTypeAOpenRewards;
  ignoreDefault: boolean;
}

export interface ResumeOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  rewardAddress: string;
}

export interface PauseOpenRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  rewardAddress: string;
}

export interface BrandDetailsProps {
  brandId: string;
  [0]: string;
  [1]: string;
  [2]: string;
  [3]: string;
  [4]: { _hex: string; isBigNumber: boolean };
  dateJoined: { _hex: string; isBigNumber: boolean };
  mainAccount: string;
  onlinePresence: string;
}

export interface GetBrandDetailsProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  getOnlyId?: boolean;
}

export interface GetExpectedAmountOfTargetedRewardProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  inputRewardAddress: string;
  outPutRewardAddress: string;
  amount: string;
  returnAsFormatted?: boolean;
}

export interface GetUserRewardsRuntimeProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  rewardListFromBackend: RewardRuntime[];
  RUNTIME_URL: string;
  userData: UserProps;
}

export interface SpendingInfo {
  rewardAtHand: string;
  targettedReward: string;
  amountOfRewardAtHand: number | BigInt;
  expectedAmountOfTargetedReward: number | BigInt;
}

export interface SwapWithDiffBrandProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  spendInfo: SpendingInfo;
  email: string;
  magic: Magic;
}

export interface SpendRewardsOnAnotherBrandWithVaultPermitProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSpendLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  setSpendingSteps: Dispatch<SetStateAction<number>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  spendInfo: SpendingInfo;
  email: string;
  exchange_reward_address: string;
  exchange_reward_amount: number;
  magic: Magic;
  rewardId: string;
  RUNTIME_URL: string;
  orderId: string;
}

export interface AddRewardMagicProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSpendLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  setSpendingSteps: Dispatch<SetStateAction<number>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  brand_id: BigInt;
  // reward_address: string;
  reward_manager: string;
  RUNTIME_URL: string;
  role_id: BigInt;
  persist: boolean;
}

export interface RemoveRewardMagicProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSpendLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<unknown>>;
  setSpendingSteps: Dispatch<SetStateAction<number>>;
  meApiKey: string;
  reqURL: string;
  OPEN_REWARD_DIAMOND: string;
  JSON_RPC_URL: string;
  CHAIN_ID: number;
  debug?: boolean;
  costPayerId?: string;
  email: string;
  magic: Magic;
  brand_id: BigInt;
  // reward_address: string;
  reward_manager: string;
  role_id: BigInt;
  persist: boolean;
  RUNTIME_URL: string;
}

export interface RewardRuntime {
  id: string;
  createdAt: string;
  updatedAt: string;
  brandId: string;
  description: string;
  balance?: {
    balance: string;
    contractAddress: string;
  };
  slug: string;
  rewardImage: string;
  otherRewardType: any;
  rewardSymbol: string;
  rewardName: string;
  autoSyncEnabled: boolean;
  contractAddress: string;
  isBounty: boolean;
  blockchain: string;
  acceptedCustomerIdentitytypes: string[];
  syncData?: string[];
  redistributionPublicKey?: string;
  bountyPublicKey?: string;
  redistributionKeyIdentifierId?: string;
  bountyKeyIdentifierId?: string;
  status: string;
  brand: Brand;
}

export interface Reward {
  id: string;
  createdAt: string;
  updatedAt: string;
  brandId: string;
  description: string;
  slug: string;
  rewardImage: string;
  otherRewardType: any;
  rewardSymbol: string;
  rewardName: string;
  autoSyncEnabled: boolean;
  contractAddress: string;
  isBounty: boolean;
  blockchain: string;
  acceptedCustomerIdentitytypes: string[];
  syncData?: string[];
  redistributionPublicKey?: string;
  bountyPublicKey?: string;
  redistributionKeyIdentifierId?: string;
  bountyKeyIdentifierId?: string;
  status: string;
  brand: Brand;
}

export interface Brand {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  name: string;
  slug: string;
  website: string;
  description: string;
  slogan: string;
  socialMediaLinks: any;
  logo: string;
  logo_icon: any;
  logo_white: string;
  logo_white_icon: any;
  banners: string[];
  location: string;
  categoryId: string;
  revenueRange: any;
  vatTaxId: any;
  ecommercePlatform: any;
  loyaltyProgram: any;
  isVerified: boolean;
  followersCount: number;
  viewsCount: number;
  canPayCost: boolean;
  canPayCost_inApp: boolean;
  autoTopupAmount: string;
  subscribedServices: string[];
  enableAutoTopup: boolean;
  supportPhoneNumber: any;
  brandProtocolId: string;
  listOnStore: boolean;
  brandPrimaryColor: any;
  brandSecondaryColor: any;
  walletAddress: string;
  vaultPercentage: number;
  noOfCustomers: number;
  currency: any;
  countryCode: any;
  country: any;
  region: any;
  additionalAddress: any;
  city: any;
  postalCode: any;
}

export interface UserProps {
  id: string;
  email: string;
  phone: string;
  username: string;
  loginType: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  is2faEnabled: boolean;
  role: string;
  twoFAType: string;
  following_interests: any;
  userType: string;
  countryCode: string;
  countryName: string;
  user_category_interests: string[];
  language: any;
  timezone: any;
  region: any;
  currency: any;
  customer: Customer;
  brand: any;
  twitterUsername: string | null;
  brandMember: any;
  deviceToken: DeviceToken;
  referralCode: string;
  airdropPoints: number;
  totalReferred: number;
  rewardBalances?: RewardRuntime[];
}

export interface Customer {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  name: string;
  country: any;
  bio: string;
  location: string;
  weight: string;
  height: string;
  profilePicture: string;
  login_2fa: boolean;
  deposit_2fa: boolean;
  withdraw_2fa: boolean;
  sizes: any;
  news_notifications: string;
  offer_notifications: string;
  brand_notifications: string;
  expiring_notifications: string;
  point_notifications: string;
  order_notifications: string;
  other_notifications: string;
  walletAddress: string;
  totalRedeemed: number;
  totalRedemptionAmount: number;
  firstTimeLogin: boolean;
}

export interface DeviceToken {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: any;
  agent: string;
  ip: string;
  location: string;
  type: string;
  userId: string;
  device_token: any;
  timezone: string;
  lat_lng: string[];
  range: string[];
}

export interface Balance {
  [key: string]: string;
}

export interface Result {
  balance: Balance;
  nonce: string;
  storage_hash: string;
}

export interface JsonRpcResponse {
  jsonrpc: string;
  result: Result;
  id: number;
}

export type OmittedProps =
  | "setLoading"
  | "setSpendLoading"
  | "setSpendingSteps"
  | "email"
  | "setError"
  | "meApiKey"
  | "reqURL"
  | "costPayerId"
  | "JSON_RPC_URL"
  | "OPEN_REWARD_DIAMOND"
  | "OPEN_REWARD_IMPLEMENTATION"
  | "VAULT"
  | "TREASURY"
  | "ME_TOKEN"
  | "CHAIN_ID"
  | "magic";
export type GasApiPromise = Promise<GasApiResponse | undefined>;

export interface AllFnsProps {
  error: unknown;
  loading: boolean;
  spendLoading: boolean;
  spendingSteps: number;
  magic: Magic;
  updateGeneralConfig: ({
    generalConfig: { enableBountyRewards, enableCais, payIncomingGasFees, payOutgoingGasFees },
    ignoreDefault,
    brandId,
  }: Omit<UpdateGeneralConfigProps, OmittedProps>) => GasApiPromise;
  updateBrandDetails: ({
    brandId,
    brandDetails: { name, onlinePresence },
    ignoreDefault,
  }: Omit<UpdateBrandDetailsProps, OmittedProps>) => GasApiPromise;
  spendRewardOnIssuingBrand: ({ spendAddress, spendAmount }: Omit<SpendRewardOnIssuingBrandProps, OmittedProps>) => GasApiPromise;
  getExpectedAmountOfTargetedReward: ({
    inputRewardAddress,
    outPutRewardAddress,
    amount,
    returnAsFormatted,
  }: Omit<GetExpectedAmountOfTargetedRewardProps, OmittedProps>) => Promise<BigInt | string | undefined>;
  swapWithDiffBrand: ({
    spendInfo: { rewardAtHand, targettedReward, amountOfRewardAtHand, expectedAmountOfTargetedReward },
  }: Omit<SwapWithDiffBrandProps, OmittedProps>) => GasApiPromise;
  spendRewardsOnAnotherBrandWithVaultPermit: ({
    spendInfo: { rewardAtHand, targettedReward, amountOfRewardAtHand, expectedAmountOfTargetedReward },
    exchange_reward_address,
    exchange_reward_amount,
    rewardId,
    RUNTIME_URL,
    orderId,
  }: Omit<SpendRewardsOnAnotherBrandWithVaultPermitProps, OmittedProps>) => GasApiPromise;
  addRewardManager: ({
    brand_id,
    // reward_address,
    reward_manager,
    role_id,
    persist,
    RUNTIME_URL,
  }: Omit<AddRewardMagicProps, OmittedProps>) => Promise<any>;
  removeRewardManager: ({
    brand_id,
    // reward_address,
    reward_manager,
    role_id,
    persist,
    RUNTIME_URL,
  }: Omit<RemoveRewardMagicProps, OmittedProps>) => Promise<any>;
  onBoardRewards: ({
    brand_id,
    reward_address,
    persist,
    RUNTIME_URL,
  }: Omit<OnBoardRewardsProps, OmittedProps>) => Promise<sendTransactionData | undefined>;
  onBoardBrandRuntime: ({
    brand_id,
    brand_reward,
    main_acct,
    persist,
    RUNTIME_URL,
  }: Omit<OnBoardBrandRuntimeProps, OmittedProps>) => Promise<AxiosResponse<any, any> | undefined>;
  changeOptimalOpenReward: ({ rewardName, newOptimalValue }: Omit<ChangeOptimalOpenRewardProps, OmittedProps>) => GasApiPromise;
  integrateReward: ({ descriptionLink, readTandC }: Omit<IntegrateRewardProps, OmittedProps>) => GasApiPromise;
  topUpOpenRewardLiquidity: ({ rewardAmount, meAmount }: Omit<TopUpOpenRewardLiquidityProps, OmittedProps>) => GasApiPromise;
  updateRewardConfig: ({
    rewardConfig: {
      specificException,
      bountyEnables,
      caiEnabled,
      bountyTriggerLimit,
      bountyContributionInPrecision,
      payIncomingGasFee,
      payOutgoingGasFee,
    },
    ignoreDefault,
    brandId,
  }: Omit<UpdateRewardConfigProps, OmittedProps>) => GasApiPromise;
  updateRewardDetails: ({
    rewardAddress,
    details: { name, symbol, descriptionLink },
    ignoreDefault,
    brandId,
  }: Omit<UpdateRewardDetailsProps, OmittedProps>) => GasApiPromise;
  updateOpenRewardConfig: ({
    rewardAddress,
    config: {
      maximumRLimit,
      minimumRewardAmountForConversation,
      minimumMeAmountForConversation,
      notifyRewardAmount,
      notifyMeAmount,
      defaultSlippageInPrecision,
      allowSwaps,
    },
    ignoreDefault,
  }: Omit<UpdateOpenRewardConfigProps, OmittedProps>) => GasApiPromise;
  pauseOpenReward: ({ rewardAddress }: Omit<PauseOpenRewardProps, OmittedProps>) => GasApiPromise;
  createMoreRewardToTreasury: ({ rewardAddress }: Omit<PauseOpenRewardProps & { amount: string }, OmittedProps>) => GasApiPromise;
  createMoreRewardToVault: ({ rewardAddress }: Omit<PauseOpenRewardProps & { amount: string }, OmittedProps>) => GasApiPromise;
  changeROptimal: ({ rewardAddress }: Omit<PauseOpenRewardProps & { newROptimal: BigInt }, OmittedProps>) => GasApiPromise;
  resumeOpenReward: ({ rewardAddress }: Omit<ResumeOpenRewardProps, OmittedProps>) => GasApiPromise;
  activateOpenReward: ({ rewardAddress }: Omit<ActivateOpenRewardProps, OmittedProps>) => GasApiPromise;
  setUpOpenReward: ({
    rewardAddress,
    rOptimal,
    maximumRLimit,
    minimumRewardAmountForConversation,
    minimumMeAmountForConversation,
    notifyRewardAmount,
    notifyMeAmount,
    defaultSlippageInPrecision,
    allowSwaps,
  }: Omit<SetUpOpenRewardProps, OmittedProps>) => GasApiPromise;

  setUpWallet: ({ persist }: Omit<SetUpWalletProps, OmittedProps>) => Promise<{ publicAddress: string } | undefined>;
  getWalletFromEmail: ({ persist }: Omit<GetWalletFromEmailProps, OmittedProps>) => Promise<{ publicAddress: string } | undefined>;
  changeMainAccount: ({ newMainAcctAddress }: Omit<ChangeMainAccountProps, OmittedProps>) => GasApiPromise;
  createReward: ({ name, symbol, descriptionLink, totalSupply }: Omit<CreateRewardProps, OmittedProps>) => GasApiPromise;
  deployRewardAndPool: ({
    name,
    symbol,
    descriptionLink,
    totalSupplyVault,
    totalSupplyTreasury,
    brandId,
    rOptimal,
    maximumRLimit,
    minimumRewardAmountForConversation,
    minimumMeAmountForConversation,
    notifyRewardAmount,
    notifyMeAmount,
    persist,
  }: Omit<DeployRewardAndPoolProps, OmittedProps>) => GasApiPromise;
  onboardBrand: ({ brandId, brandName, brandOnlinePresence, persist }: Omit<OnboardBrandProps, OmittedProps>) => GasApiPromise;
  addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPool: ({
    meAmount,
    rewardAmount,
    rewardAddress,
    currentBrandId,
    persist,
  }: Omit<AddLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolProps, OmittedProps>) => GasApiPromise;
  addLiquidityForOpenRewardsWithTreasuryAndMeDispenser: ({
    meAmount,
    rewardAmount,
    rewardAddress,
    currentBrandId,
    persist,
  }: Omit<AddLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolProps, OmittedProps>) => GasApiPromise;
  addLiquidityForOpenRewardsWithTreasuryAndMeDispenserAutoTopup: ({
    meAmount,
    rewardAmount,
    rewardAddress,
    currentBrandId,
    persist,
  }: Omit<AddLiquidityForOpenRewardsWithTreasuryAndMeDispenserAndStartPoolProps, OmittedProps>) => GasApiPromise;
  getBrandDetails: ({
    getOnlyId,
  }: Omit<GetBrandDetailsProps, OmittedProps>) => Promise<{ brandId: string } | Promise<{ brandDetails: BrandDetailsProps }> | undefined>;
  // meRegister: ({ brandName, onlinePresence }: Omit<MeRegisterProps, OmittedProps>) => GasApiPromise;
  distributeRewards: ({
    reward_address,
    reward_recipient,
    reward_amounts,
    RUNTIME_URL,
    persist,
  }: Omit<DistributeRewardsProps, OmittedProps>) => Promise<sendTransactionData | undefined>;

  spendRewardsOnIssuingBrandWithVaultPermit: ({
    reward_address,
    reward_amount,
    rewardId,
    RUNTIME_URL,
    orderId,
  }: Omit<spendRewardsOnIssuingBrandWithVaultPermitProps, OmittedProps>) => Promise<string | undefined>;
  getUserRewardsRuntime: ({ rewardListFromBackend, userData, RUNTIME_URL }: Omit<GetUserRewardsRuntimeProps, OmittedProps>) => Promise<{
    rewardBalances: RewardRuntime[];
    userDataWithBalance: UserProps;
  }>;
  logOut: (clearCache?: boolean) => Promise<any>;
}
