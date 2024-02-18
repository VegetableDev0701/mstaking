import {
  MsgSend,
  ChainRestAuthApi,
  ChainRestTendermintApi,
  BaseAccount,
  createTransaction,
  TxGrpcClient,
  BroadcastModeKeplr,
  getTxRawFromTxRawOrDirectSignResponse,
  MsgExecuteContractCompat,
  TxRestClient
} from "@injectivelabs/sdk-ts";
import {
  BigNumberInBase,
  getStdFee,
  DEFAULT_STD_FEE,
  DEFAULT_BLOCK_TIMEOUT_HEIGHT,
} from "@injectivelabs/utils";
import { ChainId } from "@injectivelabs/ts-types";
import { Network, getNetworkEndpoints, getNetworkInfo } from "@injectivelabs/networks";
import { CHAIN_ID, NETWORK } from '@/services/constants'
import { getAddresses } from "@/services/wallet";
const getKeplr = async (chainId: ChainId) => {
  await window.keplr.enable(chainId);

  const offlineSigner = window.keplr.getOfflineSigner(chainId);
  const accounts = await offlineSigner.getAccounts();
  const key = await window.keplr.getKey(chainId);

  return { offlineSigner, accounts, key };
};

const broadcastTx = async (chainId: ChainId, txRaw) => {
  const keplr = await getKeplr(ChainId.Mainnet);
  const result = await keplr.offlineSigner.keplr.sendTx(
    chainId,
    txRaw,
    BroadcastModeKeplr.Sync
  );

  if (!result || result.length === 0) {
    throw new TransactionException(
      new Error("Transaction failed to be broadcasted"),
      { contextModule: "Keplr" }
    );
  }

  return Buffer.from(result).toString("hex");
};

const DEFAULT_UNSTAKE_FEE = {
  amount: [{
    amount: "100000000000000000",
    denom: "inj",
  }],
  gas: "50000000"
};

export const StackHelper = async (
  contractAddress: string,
  executeMsg: any,
  fee: any,
  funds: any = undefined) => {
  const sender = (await getAddresses())[0]
  try {
    const network = getNetworkInfo(Network.TestnetSentry);
    const chainId = CHAIN_ID; /* ChainId.Mainnet */
    const { key } = await getKeplr(chainId);
    const pubKey = Buffer.from(key.pubKey).toString("base64");
    const injectiveAddress = key.bech32Address;
    const restEndpoint = getNetworkEndpoints(NETWORK).rest
    const msg = MsgExecuteContractCompat.fromJSON({
      contractAddress,
      sender: sender,
      msg: executeMsg,
      funds: fee
    });

    const msgs = Array.isArray(msg) ? msg : [msg];
    /** Account Details **/
    const chainRestAuthApi = new ChainRestAuthApi(restEndpoint);
    const accountDetailsResponse = await chainRestAuthApi.fetchAccount(
      sender
    );
    const baseAccount = BaseAccount.fromRestApi(accountDetailsResponse);
    const accountDetails = baseAccount.toAccountDetails();

    /** Block Details */
    const chainRestTendermintApi = new ChainRestTendermintApi(restEndpoint);
    const latestBlock = await chainRestTendermintApi.fetchLatestBlock();
    const latestHeight = latestBlock.header.height;
    const timeoutHeight = new BigNumberInBase(latestHeight).plus(
      DEFAULT_BLOCK_TIMEOUT_HEIGHT
    );

    /** Prepare the Transaction **/
    let { txRaw, signDoc } = createTransaction({
      pubKey,
      chainId,
      fee: DEFAULT_STD_FEE,
      message: msgs,
      sequence: baseAccount.sequence,
      timeoutHeight: timeoutHeight.toNumber(),
      accountNumber: baseAccount.accountNumber,
    });
    const { offlineSigner } = await getKeplr(chainId)
    const directSignResponse = await offlineSigner.signDirect(
      injectiveAddress,
      signDoc
    );
    txRaw = getTxRawFromTxRawOrDirectSignResponse(directSignResponse);

    const txService = new TxGrpcClient(network.grpc);
    const simulationResponse = await txService.simulate(txRaw);
    console.log(
      `Transaction simulation response: ${JSON.stringify(
        simulationResponse.gasInfo
      )}`
    );

    /** Broadcast transaction */
    const response = await txService.broadcast(txRaw);
    if (response.code == 0) {
      console.log('Execute success.');
      return true
    }
    else {
      console.error('Something went wrong.');
      return false
    }
  } catch (e) {
    console.error(e);
    return false
  }
}
export const unStakeHelper = async (
  contractAddress: string,
  executeMsg: any,
  unStakeFee: any,
  funds: any = undefined) => {
  const sender = (await getAddresses())[0]
  try {
    const network = getNetworkInfo(Network.TestnetSentry);
    const chainId = CHAIN_ID; /* ChainId.Mainnet */
    const { key } = await getKeplr(chainId);
    const pubKey = Buffer.from(key.pubKey).toString("base64");
    const injectiveAddress = key.bech32Address;
    const restEndpoint = getNetworkEndpoints(NETWORK).rest
    const msg = MsgExecuteContractCompat.fromJSON({
      contractAddress,
      sender: sender,
      msg: executeMsg,
      funds: [unStakeFee],
    });

    const msgs = Array.isArray(msg) ? msg : [msg];
    /** Account Details **/
    const chainRestAuthApi = new ChainRestAuthApi(restEndpoint);
    const accountDetailsResponse = await chainRestAuthApi.fetchAccount(
      sender
    );
    const baseAccount = BaseAccount.fromRestApi(accountDetailsResponse);
    const accountDetails = baseAccount.toAccountDetails();

    /** Block Details */
    const chainRestTendermintApi = new ChainRestTendermintApi(restEndpoint);
    const latestBlock = await chainRestTendermintApi.fetchLatestBlock();
    const latestHeight = latestBlock.header.height;
    const timeoutHeight = new BigNumberInBase(latestHeight).plus(
      DEFAULT_BLOCK_TIMEOUT_HEIGHT
    );

    console.log(DEFAULT_STD_FEE)
    /** Prepare the Transaction **/
    let { txRaw, signDoc } = createTransaction({
      pubKey,
      chainId,
      fee: DEFAULT_STD_FEE,
      // fee: {
      //   amount: [unStakeFee],
      //   gas: unStakeFee.amount
      // },
      message: msgs,
      sequence: baseAccount.sequence,
      timeoutHeight: timeoutHeight.toNumber(),
      accountNumber: baseAccount.accountNumber,
    });
    const { offlineSigner } = await getKeplr(chainId)
    const directSignResponse = await offlineSigner.signDirect(
      injectiveAddress,
      signDoc
    );
    txRaw = getTxRawFromTxRawOrDirectSignResponse(directSignResponse);

    const txService = new TxGrpcClient(network.grpc);
    const simulationResponse = await txService.simulate(txRaw);
    console.log('ret value: ', simulationResponse)
    console.log(
      `Transaction simulation response: ${JSON.stringify(
        simulationResponse.gasInfo
      )}`
    );

    /** Broadcast transaction */
    const response = await txService.broadcast(txRaw);

    if (response.code == 0) {
      console.log('Execute success.');
      return true
    }
    else {
      console.error('Something went wrong.');
      return false
    }
  } catch (e) {
    console.error(e);
    return false
  }
  return false
}

export const ClaimHelper = async (cAddress: string = '',executeMsg: any, funds: any = undefined) => {
  const sender = (await getAddresses())[0]
  try {
    const network = getNetworkInfo(Network.TestnetSentry);
    const chainId = CHAIN_ID; /* ChainId.Mainnet */
    const { key } = await getKeplr(chainId);
    const pubKey = Buffer.from(key.pubKey).toString("base64");
    const injectiveAddress = key.bech32Address;
    const restEndpoint = getNetworkEndpoints(NETWORK).rest
    const msg = MsgExecuteContractCompat.fromJSON({
      contractAddress: cAddress,
      sender: sender,
      msg: executeMsg,
      funds: DEFAULT_STD_FEE.amount,
    });

    const msgs = Array.isArray(msg) ? msg : [msg];
    /** Account Details **/
    const chainRestAuthApi = new ChainRestAuthApi(restEndpoint);
    const accountDetailsResponse = await chainRestAuthApi.fetchAccount(
      sender
    );
    const baseAccount = BaseAccount.fromRestApi(accountDetailsResponse);
    const accountDetails = baseAccount.toAccountDetails();

    /** Block Details */
    const chainRestTendermintApi = new ChainRestTendermintApi(restEndpoint);
    const latestBlock = await chainRestTendermintApi.fetchLatestBlock();
    const latestHeight = latestBlock.header.height;
    const timeoutHeight = new BigNumberInBase(latestHeight).plus(
      DEFAULT_BLOCK_TIMEOUT_HEIGHT
    );

    /** Prepare the Transaction **/
    let { txRaw, signDoc } = createTransaction({
      pubKey,
      chainId,
      fee: DEFAULT_STD_FEE,
      message: msgs,
      sequence: baseAccount.sequence,
      timeoutHeight: timeoutHeight.toNumber(),
      accountNumber: baseAccount.accountNumber,
    });
    const { offlineSigner } = await getKeplr(chainId)
    const directSignResponse = await offlineSigner.signDirect(
      injectiveAddress,
      signDoc
    );
    txRaw = getTxRawFromTxRawOrDirectSignResponse(directSignResponse);

    const txService = new TxGrpcClient(network.grpc);
    const simulationResponse = await txService.simulate(txRaw);
    console.log('ret value: ', simulationResponse)
    console.log(
      `Transaction simulation response: ${JSON.stringify(
        simulationResponse.gasInfo
      )}`
    );

    /** Broadcast transaction */
    const response = await txService.broadcast(txRaw);

    // const txHash = await broadcastTx(ChainId.Mainnet, txRaw);
    // const response = await new TxRestClient(restEndpoint).fetchTxPoll(txHash);
    if (response.code == 0) {
      console.log('Execute success.');
      return true
    }
    else {
      console.error('Something went wrong.');
      return false
    }
  } catch (e) {
    console.error(e);
    return false
  }
}
export const transactionHelper = async (
  contractAddress: string,
  executeMsg: any,
  funds: any = undefined) => {
  const sender = "inj1t35ykue5azt725d4aesd3z7en44j0jck8ap766"
  try {
    const network = getNetworkInfo(Network.TestnetSentry);
    const chainId = CHAIN_ID; /* ChainId.Mainnet */
    const { key } = await getKeplr(chainId);
    const pubKey = Buffer.from(key.pubKey).toString("base64");
    const injectiveAddress = key.bech32Address;
    const restEndpoint = getNetworkEndpoints(NETWORK).rest
    const msg = MsgExecuteContractCompat.fromJSON({
      contractAddress,
      sender: sender,
      msg: executeMsg,
      funds: DEFAULT_UNSTAKE_FEE.amount,
    });

    const msgs = Array.isArray(msg) ? msg : [msg];
    /** Account Details **/
    const chainRestAuthApi = new ChainRestAuthApi(restEndpoint);
    const accountDetailsResponse = await chainRestAuthApi.fetchAccount(
      sender
    );
    const baseAccount = BaseAccount.fromRestApi(accountDetailsResponse);
    const accountDetails = baseAccount.toAccountDetails();

    /** Block Details */
    const chainRestTendermintApi = new ChainRestTendermintApi(restEndpoint);
    const latestBlock = await chainRestTendermintApi.fetchLatestBlock();
    const latestHeight = latestBlock.header.height;
    const timeoutHeight = new BigNumberInBase(latestHeight).plus(
      DEFAULT_BLOCK_TIMEOUT_HEIGHT
    );

    /** Prepare the Transaction **/
    let { txRaw, signDoc } = createTransaction({
      pubKey,
      chainId,
      // fee: DEFAULT_STD_FEE,
      fee: DEFAULT_UNSTAKE_FEE,
      message: msgs,
      sequence: baseAccount.sequence,
      timeoutHeight: timeoutHeight.toNumber(),
      accountNumber: baseAccount.accountNumber,
    });
    const { offlineSigner } = await getKeplr(chainId)
    const directSignResponse = await offlineSigner.signDirect(
      injectiveAddress,
      signDoc
    );
    txRaw = getTxRawFromTxRawOrDirectSignResponse(directSignResponse);

    const txService = new TxGrpcClient(network.grpc);
    const simulationResponse = await txService.simulate(txRaw);
    console.log('ret value: ', simulationResponse)
    console.log(
      `Transaction simulation response: ${JSON.stringify(
        simulationResponse.gasInfo
      )}`
    );

    /** Broadcast transaction */
    const response = await txService.broadcast(txRaw);

    // const txHash = await broadcastTx(ChainId.Mainnet, txRaw);
    // const response = await new TxRestClient(restEndpoint).fetchTxPoll(txHash);
    if (response.code == 0) {
      console.log('Execute success.');
      return true
    }
    else {
      console.error('Something went wrong.');
      return false
    }
  } catch (e) {
    console.error(e);
    return false
  }
  return false
}
