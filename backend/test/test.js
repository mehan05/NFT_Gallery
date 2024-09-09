const {expect} = require("chai");
const {ethers}  = require("hardhat");
describe('Check NFT', () => {
    let NFT,addr1,addr2,nftdeploy;
    beforeEach(async()=>{
        NFT = await ethers.getContractFactory("NFT");
        [addr1,addr2] = await ethers.getSigners();
         nftdeploy = await NFT.deploy();
        await nftdeploy.waitForDeployment();

    });

    describe("checkOwner",()=>{
        it("Checking the owner of contract",async()=>{
            expect(await nftdeploy.owner()).to.be.equal(addr1.address);
        })
    })

    describe("Minting NFT",()=>{
        it("Check Minting token and tokenID",async()=>{
            const TokenURI = "https://gateway.pinata.cloud/ipfs/QmP5wFfHcJFxkQxUeFbBoX9bhQkHLZto9m2mf9sznHkM5P/1";
            
            let transaction = await nftdeploy.create(addr1.address,TokenURI);
            await transaction.wait();

            expect(await nftdeploy.getCurrentTokenId()).to.be.equal(1);

            let currentId = await nftdeploy.getCurrentTokenId();
            expect(await nftdeploy._tokenURIs(currentId)).to.equal(TokenURI);

        })
    })

    describe('Cross check the OnlyModifier', () => { 
        it("Checking if the onlyOwner is working or not",async()=>{
            const TokenURI = "https://gateway.pinata.cloud/ipfs/QmP5wFfHcJFxkQxUeFbBoX9bhQkHLZto9m2mf9sznHkM5P/1";
            
            await expect(nftdeploy.connect(addr2).create(addr2.address,TokenURI)).to.be.reverted;
            
        })
     })
})
