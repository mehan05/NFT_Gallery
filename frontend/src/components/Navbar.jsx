import { useEffect, useState } from 'react';
import { connectWallet,accountChange,chainChange } from '../walletConnect';

const Navbar = ({setSigner}) => {
    const[currentAccount,setCurrentAccount] = useState("");
    const[connected,setConnected]  = useState(false);
    
    useEffect(()=>{
      handleconnectWallet();
        accountChange(handleChangeAccount);
        chainChange(()=>window.location.reload());
    },[])

    const handleChangeAccount = (accounts)=>{
          if(accounts.length>0){
            setCurrentAccount(accounts[0]);
            setConnected(true);
          }
          else{
            console.warn("MetaMask is locked or the user has not connected any accounts");
            setConnected(false)
            setCurrentAccount(null);
          }
    }

    const handleconnectWallet = async()=>{
      const {accounts,signer}  = await connectWallet();
      if(accounts.length>0)
      {
        setCurrentAccount(accounts[0]);
        setConnected(true);
      }
      if(signer)
        {
          setSigner(signer);
        }
      else{
        console.error("Problem with getting signer address");
      }
      
    } 

  return (
    <div className="flex justify-between items-center p-4 bg-black text-red-900 font-medium shadow-md shadow-red-500">
      <h1 className="text-3xl ml-3 mt-2">NFT_GALLERY</h1>
      {connected ? (
        <span className="mr-3">{currentAccount}</span>
      ) : (
        <button
          className="px-4 py-2 border border-red-900 rounded-md hover:bg-black hover:text-red-900 transition duration-300"
          onClick={() =>handleconnectWallet()}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Navbar;
