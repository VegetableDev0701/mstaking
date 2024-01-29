import { MsgExecuteContractCompat } from '@injectivelabs/sdk-ts'
import { msgBroadcastClient } from '@/services/services'

export const actionHelper = async (contractAddress: string, senderAddress: string, actionName: string, actionParams: any) => {
  const msg = MsgExecuteContractCompat.fromJSON({
    contractAddress: contractAddress,
    sender: senderAddress,
    msg: {
      [actionName]: actionParams,
    },
  });

  await msgBroadcastClient.broadcast({
    msgs: msg,
    injectiveAddress: senderAddress,
  });
}

