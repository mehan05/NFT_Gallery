// eslint-disable-next-line react/prop-types
import axios from "axios";
import { useEffect, useState } from "react";
const NFTGrid = ({tokenURIS}) => {
  const {ownerOfNFT,tokenId,tokenURI} = tokenURIS;
  const [tokenURIdata,setTokenURIData] = useState({});

  const getdataFromURI = async()=>{
    try{
      const dataOfURI = await axios.get(tokenURI);
      setTokenURIData(dataOfURI.data);
    }catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    getdataFromURI();
  },[tokenURI])
  let imageURL="";
  if(tokenURIdata.image)
  {
    const imageHashArr = tokenURIdata.image.split('ipfs/');
    const imageHash = imageHashArr[1];
     imageURL = `https://${import.meta.env.VITE_GATEWAY}/ipfs/${imageHash}`;
  }
    
  return (
    <>  

        <div className="max-w-sm bg-black shadow-md shadow-red-500  rounded-lg  dark:border-gray-700 overflow-hidden">
        {imageURL&&
        
                <img className="rounded-t-lg w-full max-h-60 object-cover" src={imageURL} alt={tokenURIdata.name} />
        }
            <div className="p-5">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-red-500">Token_ID: {tokenId}</h2>
                    <h5  className="mb-2 text-1xl font-bold tracking-tight text-gray-900 text-red-600">Name: {tokenURIdata.name}</h5 >
                <p className="mb-3 font-normal text-gray-700 text-red-700">Description: {tokenURIdata.description}</p>
            
            </div>
        </div>
            
  </>
  )

}

export default NFTGrid