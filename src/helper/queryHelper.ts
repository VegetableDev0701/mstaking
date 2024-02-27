import { chainGrpcWasmApi } from '@/services/services'
import { toBase64, fromBase64 } from '@injectivelabs/sdk-ts'
import { getAddresses } from '@/services/wallet';
import { Token } from '@/interface/token';
export const queryHelper = async (contractAddress: string, queryName: string, queryData: any) => {
  try {
    const response = await chainGrpcWasmApi.fetchSmartContractState(
      contractAddress,
      toBase64({
        [queryName]: queryData
      })
    );
    const data = fromBase64(Buffer.from(response.data).toString('base64'));
    return data;
  } catch (e) {
    console.error(e);
  }
  return null;
};

export const getSMNFT = async (contract: string, owner: string) => {
  const sTokens = await queryHelper(contract, "get_stakings_by_owner", {
      owner: owner
  })
  console.log(sTokens)
  if (sTokens && sTokens.length ) {
    const retVal = sTokens.filter((el: any) => parseInt(el.token_end_time) == 0)
    // return retVal
    // const retVal: Token[] = sTokens.filter((el: any) => true)
    return retVal
  } else {
    return []
  }
}

export const getCollectionNFT = async (contractAddress: string, owner: string) => {
  let total: Number[] = []
  let Tokens: Token[] = []
  try {
    let start_after = 0;
    let token_read_count = 10;
    while (token_read_count > 0) {
      const tokens = await queryHelper(contractAddress, "tokens", {
        owner: owner,
        start_after: start_after.toString(),
        limit: 10
      })
      if (tokens && tokens?.tokens.length > 0) {
        total.push(...tokens?.tokens)
        start_after = tokens.tokens.length ? tokens?.tokens[tokens?.tokens.length - 1] : 0
        token_read_count = tokens?.tokens.length ? tokens?.tokens.length : -1
      } else {
        token_read_count = -1
      }
    }
    for (let i = 0; i < total.length; i++) {
      Tokens.push({
        token_id: total[i].toString(),
        token_lock_time: 0,
        token_stake_time: 0,
        token_end_time: 0,
        token_reward: {
          amount: "0",
          denom: "0"
        }
      })
    }
    return Tokens
  } catch (e) {
    console.error('Token Error: ', e)
    return []
  }
}