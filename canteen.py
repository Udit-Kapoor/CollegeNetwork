import smartpy as sp

FA2 = sp.io.import_stored_contract("modifiedNFT")

class NFT(FA2.FA2):
    pass

class CanteenNFT(sp.Contract):
    FA2MintParam = sp.TRecord(
        address = sp.TAddress,
        amount = sp.TNat,
        metadata = sp.TMap(sp.TString, sp.TBytes),
        token_id = sp.TNat,
    )
    FoodMintParam = sp.TRecord(
        address = sp.TAddress,
        amount = sp.TNat,
        token_id = sp.TNat,
    )
    def __init__(self,_admin,_developer,_templateIPFSPath, ):   
        self.init(
            # contract's storage
            admin = _admin,
            developer = _developer,
            canteenWallet = _canteenWallet
            tokenAddress = _tokenAddress

            paused = sp.bool(False),

            prices = sp.big_map(
                tkey = sp.TNat,
                tvalue = sp.TNat,
            ),

            tokenId=sp.nat(0)

            #to store who has minted
            ledger = sp.big_map(
                tkey = sp.TAddress,
                tvalue = sp.TNat,
            ),


            fa2 = sp.none,

            metadata = sp.big_map({
            "": sp.utils.bytes_of_string("tezos-storage:content"),
            "content": sp.utils.bytes_of_string("""{"name": "Plenty Discord NFT" , "description : Crowdsale Contract that mints NFTs via Plenty Discord Bot" , "admin" : "tz1X7EJX7Q2oBjM2Hur53qmB6yCJmPxttT3h" , "author" : "pichkari&gamma" , "homepage" : "https://tarunsh.com/"}"""),
        })
        
        )

    def checkAdmin(self):
        sp.verify(sp.sender == self.data.admin, message = "Not Admin")

    def updateAdmin(self , params):
        sp.verify(sp.sender == self.data.admin, message = "Not Admin")
        self.data.admin = param.address

    def updateCanteen(self , params):
        sp.verify(sp.sender == self.data.admin, message = "Not Admin")
        self.data.admin = params.address
    
    def checkPaused(self):
        sp.verify(self.data.paused == False, message= "Minting is Paused")
    
    @sp.entry_point
    def registerFA2(self, fa2):
        self.checkAdmin()
        self.data.fa2 = sp.some(fa2)

    @sp.entry_point
    def togglePause(self):
        self.checkAdmin()
        self.data.paused = ~self.data.paused

    @sp.entry_point
    def addFood(self , params):
        sp.set_type(params, sp.TRecord(price = sp.TNat , metadata = sp.big_map(tkey = sp.Tstring , tvalue= sp.Tbytes)))
        #checks before we mint
        self.checkPaused()
        self.checkAdmin()

        #mint and send it to addy
        mintData = sp.record(
            address = sp.sender,
            amount = sp.nat(1),
            metadata = params.metadata,
            token_id = self.data.tokenId,
        )
        contract = sp.contract(
            self.FA2MintParam,
            self.data.fa2.open_some("NOT_A_VALID_FA2_CONTRACT"),
            'mint'
        ).open_some("WRONG_FA2_CONTRACT")

        sp.transfer(mintData, sp.mutez(0), contract)

        # update
        self.data.prices[tokenId] = params.price
        self.data.tokenId +=1
        

    @sp.entry_point
    def mintFood(self , params):
    sp.set_type(params, sp.TRecord(tokenId = sp.TNat))
        #checks before we mint
        self.checkPaused()

        # Deduct Cost
        self.TransferFATokens(sp.sender , self.data.canteenWallet , self.data.prices[params.tokenId] ,self.data.tokenAddress)

        #mint and send it to addy
        mintData = sp.record(
            address = sp.sender,
            amount = sp.nat(1),
            token_id = params.tokenId,
        )
        contract = sp.contract(
            self.FoodMintParam,
            self.data.fa2.open_some("NOT_A_VALID_FA2_CONTRACT"),
            'mint'
        ).open_some("WRONG_FA2_CONTRACT")

        sp.transfer(mintData, sp.mutez(0), contract)

    @sp.entry_point
    def burnFood(self , params):
        sp.set_type(params, sp.TRecord(tokenId = sp.TNat))
        #checks before we mint
        self.checkPaused()

        #mint and send it to addy
        burnData = sp.record(
            address = sp.sender,
            amount = sp.nat(1),
            token_id = params.tokenId,
        )
        contract = sp.contract(
            self.FoodMintParam,
            self.data.fa2.open_some("NOT_A_VALID_FA2_CONTRACT"),
            'burn'
        ).open_some("WRONG_FA2_CONTRACT")

        sp.transfer(burnData, sp.mutez(0), contract)    
    
    def TransferFATokens(sender,reciever,amount,tokenAddress): 
        """Transfers FA1.2 tokens
        
        Args:
            sender: sender address
            reciever: reciever address
            amount: amount of tokens to be transferred
            tokenAddress: address of the FA1.2 contract
        """

        TransferParam = sp.record(
            from_ = sender, 
            to_ = reciever, 
            value = amount
        )

        transferHandle = sp.contract(
            sp.TRecord(from_ = sp.TAddress, to_ = sp.TAddress, value = sp.TNat).layout(("from_ as from", ("to_ as to", "value"))),
            tokenAddress,
            "transfer"
            ).open_some()

        sp.transfer(TransferParam, sp.mutez(0), transferHandle)


@sp.add_test("PlentyNFT")
def test():

    #update ipfs
    baseIPFSUrl = "ipfs://QmSscmKnfMkYFKjrubbmrPUdkhATC4gZHktRRamCGyNN3G/"
    admin = sp.test_account("admin")
    bob = sp.test_account("bob")

    scenario = sp.test_scenario()

    plenty = PlentyNFT(
        _admin = admin.address,
        _developer = bob.address , 
        _templateIPFSPath = baseIPFSUrl,
        )



    token = NFT(
        config = FA2.FA2_config(
            non_fungible=True,
            assume_consecutive_token_ids = False
        ),
        admin = admin.address,
        crowdsale = plenty.address,
        metadata = sp.big_map({
            "": sp.utils.bytes_of_string("tezos-storage:content"),
            "content": sp.utils.bytes_of_string("""{"name": "Plenty NFT Contract", "description": "NFT contract for the Plenty Discord Bot"}"""),
        })
    )
    
    scenario += token
    scenario += plenty

    scenario.h2("Registering FA2 contract for our crowdsale.")
    plenty.registerFA2(token.address).run(sender=admin)

    params = sp.record(address = bob.address , discord="123identity")

    scenario += plenty.mintNFT(params).run(sender = admin)
    scenario += plenty.mintNFT(params).run(sender = admin , valid = False)


    #Compilation

    baseIPFSUrl = "ipfs://QmeTmDH6xXdEBGmMBjE15q6MUc33xDgmUec19ouBmqS327/"
    admin = sp.address("tz1X7EJX7Q2oBjM2Hur53qmB6yCJmPxttT3h")
    developer = sp.address("tz1X7EJX7Q2oBjM2Hur53qmB6yCJmPxttT3h")

    sp.add_compilation_target("Plenty", PlentyNFT(
    _admin = admin,
    _developer = developer,
    # _maxSupply = sp.nat(10000),
    _templateIPFSPath = baseIPFSUrl,))

    #update
    crowdsale = sp.address("KT1RPeo9eQ4inwmvPC6Ma3SWVe3rGeBuc4S4")

    sp.add_compilation_target("Token", NFT(
        config = FA2.FA2_config(
            non_fungible=True,
            assume_consecutive_token_ids = False
        ),
        admin = admin,
        crowdsale = crowdsale,
        metadata = sp.big_map({
            "": sp.utils.bytes_of_string("tezos-storage:content"),
            "content": sp.utils.bytes_of_string("""{"name": "Plenty Discord NFT" , "description : A FA2 Contract that stores the NFT's minted via Plenty Discord Bot" , "version" : "FA2" , "author" : "pichkari&gamma" , "homepage" : "https://tarunsh.com/" , "interfaces" : "https://gitlab.com/tezos/tzip/-/tree/master/proposals/tzip-16" }"""),
        })
    ))

