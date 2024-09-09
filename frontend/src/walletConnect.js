import {ethers} from "ethers";
export const connectWallet =async ()=>{
    if(window.ethereum)
    {
        try {
            const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
            const provider = new ethers.BrowserProvider(window.ethereum);
             const signer = await provider.getSigner();
            return {accounts,provider,signer};
        } catch (error) {
            console.log(error);
            return {error};
        }   
    }
    else{
        console.error("metamask not installed");
        return {error:"Install Metamask"}
    }
}



export const accountChange = (handleAccountChanged)=>{
    window.ethereum.on("accountsChanged",handleAccountChanged);
}

export const chainChange = (handleChainChanged)=>{
    window.ethereum.on("chainChanged",handleChainChanged);
}

