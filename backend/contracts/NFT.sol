// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    constructor() ERC721("MyNFT", "NF")  Ownable(msg.sender){}


    struct NFTdata{
        address ownerOfNFT;
        uint256 tokenId;
        string tokenURI;
    }
    NFTdata[] public nftdata;

    function create(address to, string memory tokenURI) public onlyOwner {
        _tokenIds++;
         uint256 currentTokenId = _tokenIds;
        nftdata.push(NFTdata(to,currentTokenId,tokenURI));
        _safeMint(to, currentTokenId);
        _setTokenURI(currentTokenId, tokenURI); 
    }

    function getTokenURI(uint256 tokenId) public  view returns (string memory) {
        return tokenURI(tokenId);
    }

    function getCurrentTokenId() public view returns(uint256)
    {
        return _tokenIds;
    }

    function getAllTokenURI() public view returns(NFTdata[] memory)
    {
        return nftdata;
    }

}
