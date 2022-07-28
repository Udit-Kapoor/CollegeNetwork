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

export const getUserBalanceByRpc = async (identifier, address) => {
    try {
      const token = CONFIG.AMM[CONFIG.NETWORK][identifier];
      const mapId = token.mapId;
      const type = token.READ_TYPE;
      const decimal = token.TOKEN_DECIMAL;
      const tokenId = token.TOKEN_ID;
      // const rpcNode = CONFIG.RPC_NODES[CONFIG.NETWORK];
      const rpcNode = localStorage.getItem(RPC_NODE) ?? CONFIG.RPC_NODES[CONFIG.NETWORK];
      const packedKey = getPackedKey(tokenId, address, type);
      const url = `${rpcNode}chains/main/blocks/head/context/big_maps/${mapId}/${packedKey}`;
      const response = await axios.get(url);
  
      const balance = (() => {
        // IIFE
        let _balance;
        if (type1MapIds.includes(mapId)) {
          _balance = response.data.args[0].args[1].int;
        } else if (type2MapIds.includes(mapId)) {
          _balance = response.data.args[1].int;
        } else if (type3MapIds.includes(mapId)) {
          _balance = response.data.args[0].int;
        } else if (type4MapIds.includes(mapId)) {
          _balance = response.data.int;
        } else if (type5MapIds.includes(mapId)) {
          _balance = response.data.args[0][0].args[1].int;
        } else {
          _balance = response.data.args[1].int;
        }
        _balance = new BigNumber(_balance);
        _balance = _balance.dividedBy(10 ** decimal);
        _balance = _balance.toFixed(decimal);
        return Number(_balance);
      })();
      return {
        success: true,
        balance,
        identifier,
      };
    } catch (error) {
      return {
        success: false,
        balance: 0,
        identifier,
        error: error,
      };
    }
  };

  export const fetchtzBTCBalance = async (addressOfUser) => {
    try {
      const tokenContractAddress = 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn';
      const connectedNetwork = CONFIG.NETWORK;
      // const rpcNode = CONFIG.RPC_NODES[connectedNetwork];
      const rpcNode = localStorage.getItem(RPC_NODE) ?? CONFIG.RPC_NODES[connectedNetwork];
      const Tezos = new TezosToolkit(rpcNode);
      Tezos.setProvider(rpcNode);
      const contract = await Tezos.contract.at(tokenContractAddress);
      const storage = await contract.storage();
      let userBalance = 0;
      const packedAddress = packDataBytes({ string: addressOfUser }, { prim: 'address' });
      const ledgerKey = {
        prim: 'Pair',
        args: [{ string: 'ledger' }, { bytes: packedAddress.bytes.slice(12) }],
      };
      const ledgerKeyBytes = packDataBytes(ledgerKey);
      const ledgerInstance = storage[Object.keys(storage)[0]];
      const bigmapVal = await ledgerInstance.get(ledgerKeyBytes.bytes);
      if (bigmapVal) {
        const bigmapValData = unpackDataBytes({ bytes: bigmapVal });
        if (
          Object.prototype.hasOwnProperty.call(bigmapValData, 'prim') &&
          bigmapValData.prim === 'Pair'
        ) {
          userBalance = +bigmapValData.args[0].int / Math.pow(10, 8);
        }
      }
      return {
        success: true,
        balance: userBalance,
        identifier: 'tzBTC',
      };
    } catch (e) {
      return {
        success: false,
        balance: 0,
        identifier: 'tzBTC',
      };
    }
  };

  const getTezBalance =async (address)=> {
      
    try {
      const {CheckIfWalletConnected}=dappClient();
        const WALLET_RESP = await CheckIfWalletConnected();
        if (!WALLET_RESP.success) {
          throw new Error('Wallet connection failed');
        }
        const tezos = await dappClient().tezos();
        const _balance = await tezos.tz.getBalance(address);
        const balance = _balance.dividedBy(new BigNumber(10).pow(6));
        return {
          success: true,
          balance,
          identifier : 'tez',
        };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        balance : new BigNumber(0),
        identifier : 'tez',
        error : error
      };
      
    }
    
  }