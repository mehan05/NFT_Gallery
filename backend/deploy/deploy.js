const fs = require("fs");
module.exports = async({
    deployments,
    getNamedAccounts
})=>{
    const {deploy,log} = deployments;
    const {deployer} =await  getNamedAccounts();
    
    const nftDeploy =await  deploy("NFT",{
        from:deployer,
        log:true
    });
    
    log("Contract deployed at:",nftDeploy.address);
    const filePath  = "./config.json";
     fs.writeFileSync(filePath,JSON.stringify({CONTRACT_ADDRESS:nftDeploy.address},null,2));
}