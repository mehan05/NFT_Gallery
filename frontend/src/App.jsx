/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { ethers } from "ethers";
import abi from "../../backend/artifacts/contracts/NFT.sol/NFT.json";
import contractAddr from "../../backend/config.json";  
import NFTGrid from "./components/NFTGrid";

import axios from "axios";
const App = () => {
  const[contract,setContract] = useState("");
  const[flag,setFlag] = useState(false);
  const [signer,setSigner] = useState("");
  const[alltokenURI,setAllTokenURI] = useState([]);
  useEffect(()=>{
    fetchDetails(); 
    const setupContract = async()=>{
      console.log("signer:",signer);

      if(signer)
      {
        const Contract = new ethers.Contract(contractAddr.CONTRACT_ADDRESS,abi.abi,signer);
        setContract(Contract);
      }

      }
      setupContract();      
  },[signer])

  const fetchDetails = async () => {
    if (contract) {
      try {
        const uris = await contract.getAllTokenURI();
        const getURIs = uris.map((item)=>{
          const[ownerOfNFT,tokenId,tokenURI] = item;
          return {
            ownerOfNFT,
            tokenId:tokenId.toString(),
            tokenURI
          }
        });
        setAllTokenURI(getURIs);
      } catch (error) {
        console.error("Fetch details error:", error);
      }
    }
  };

 

  const[loading,setLoading] = useState(false);
  // const[tokenURI,setTokenURI] = useState("");
  const[image,setImage] = useState(null);
  const[loadingForCard,setLoadingCard] = useState(false);
  // const[state  ]
  const [metadata,setMetadata] = useState({
    name:"",
    description:""
  })
  const handleFile = (e)=>{
    setImage(e.target.files[0]);
    console.log("image:",e.target.files[0]);
  }
  
  const handleOnchange = (e)=>{
    const{name,value} = e.target;
    setMetadata({...metadata,[name]:value});
  };
  
  const handleUpload = async()=>{
    const formdata = new FormData();
    if(!image)
    {
      alert("Upload Image");
      return;
    }
    formdata.append('file',image);
    setLoading(true);
    try {
      
      const imageUpload = await axios({
          method:"post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data:formdata,
          headers:{
            pinata_api_key:import.meta.env.VITE_API,
            pinata_secret_api_key:import.meta.env.VITE_SECRET,
          },
        } )
        const imghash = imageUpload.data.IpfsHash;
        console.log(imghash);
        const nftmetadata = {
          name:metadata.name,
          description:metadata.description,
          image:`https://${import.meta.env.VITE_GATEWAY}/ipfs/${imghash}`
        }

        const metadataUpload = await axios({
          method:"post",
          url:"https://api.pinata.cloud/pinning/pinJSONToIPFS",
          data:nftmetadata,
          headers:{
            pinata_api_key:import.meta.env.VITE_API,
            pinata_secret_api_key:import.meta.env.VITE_SECRET,
          }
        })

        const metadatahash = metadataUpload.data.IpfsHash;
        const tokenURIs = `https://${import.meta.env.VITE_GATEWAY}/ipfs/${metadatahash}`;

          const transaction = await contract.create(signer,tokenURIs);
          await transaction.wait();
          setFlag(flag?false:true);       
          fetchDetails(); 

        console.log(tokenURIs.tokenURI);
        setLoadingCard(true);
  }
    catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

 console.log("All TokenURI:",alltokenURI);
//  console.log("SignerAddress:",signer); 

  
  return (
    <div className="bg-gray-550 min-h-screen" >
            <Navbar setSigner={setSigner}/>
       <div className="mx-auto px-4 py-12" >
        <div className="bg-black text-red-900 p-8 rounded-lg shadow-md shadow-red-500 border border-red-500">
          <h1 className="text-3xl font-bold text-red-800 text-center mb-5" >UPLOAD NFT TO IPFS AND MINT IT </h1>
          <input type="text" name="name" placeholder='Name' onChange={handleOnchange} className="w-full p-2 rounded-lg shadow-red-500 shadow-md focus:outline-none focus:border-red-500     m-2" />
          <input type="textarea" placeholder='Description' name="description" onChange={handleOnchange} className="w-full p-2 rounded-lg shadow-red-500 shadow-md  focus:outline-none focus:border-red-500 m-2"/>
          <input type="file" onChange={handleFile} accept='image/*' className="flex flex-col m-3 rounded-lg shadow-md shadow-red-500" />

          <button className="shadow shadow-red-900 pt-3 pb-3 w-full rounded-lg hover:bg-red-500 hover:text-black font-semibold  text-lg m-5"  disabled={loading} onClick={handleUpload}>
            {loading ? "Uploading..." : "Upload NFT"}
          </button>
        </div>
        </div>
        <div className="mt-12 mx-5 p-10 shadow-lg shadow-red-600 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-8  border border-red-500">
          {alltokenURI.map((item,index)=> (
            <NFTGrid key={index}  tokenURIS={item}  />
          ))
        }
        </div>
        
    </div>
  )
}

export default App