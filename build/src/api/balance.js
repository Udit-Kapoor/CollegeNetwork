import { tezos , CheckIfWalletConnected } from "./operations/wallet";

const getPackedKey = (tokenId, address, type) => {
    const accountHex = `0x${TezosMessageUtils.writeAddress(address)}`;
    let packedKey = null;
    if (type === 'FA2') {
      packedKey = TezosMessageUtils.encodeBigMapKey(
        // eslint-disable-next-line no-undef
        Buffer.from(
          TezosMessageUtils.writePackedData(
            `(Pair ${accountHex} ${tokenId})`,
            '',
            TezosParameterFormat.Michelson,
          ),
          'hex',
        ),
      );
    } else {
      packedKey = TezosMessageUtils.encodeBigMapKey(
        // eslint-disable-next-line no-undef
        Buffer.from(
          TezosMessageUtils.writePackedData(`${accountHex}`, '', TezosParameterFormat.Michelson),
          'hex',
        ),
      );
    }
    return packedKey;
  };

export const getUserBalanceByRpc = async (address) => {
    try {
      const mapId = 156082;
      const rpcNode = 'https://ghostnet.smartpy.io/'
      const packedKey = getPackedKey(0, address, 'FA1.2');
      const url = `${rpcNode}chains/main/blocks/head/context/big_maps/${mapId}/${packedKey}`;
      const response = await axios.get(url);
  
      let balance = response.data.int;
      balance = balance/6;
      return {
        success: true,
        balance,
      };
    } catch (error) {
      return {
        success: false,
        balance: 0,
        error: error,
      };
    }
  };


  export const getTezBalance =async (address)=> {
      
    try {
        const WALLET_RESP = await CheckIfWalletConnected();
        if (!WALLET_RESP.success) {
          throw new Error('Wallet connection failed');
        }
        const _balance = await tezos.tz.getBalance(address);
        const balance = _balance/6;
        return {
          success: true,
          balance,
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        balance : new BigNumber(0),
        error : error
      };
      
    }
    
  }