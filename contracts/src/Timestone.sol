// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

import "solmate/tokens/ERC721.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

error MintPriceNotPaid();
// error MaxSupply();
error NonExistentTokenURI();
error WithdrawTransfer();
error IpfsURINot59();

contract NFT is ERC721, Ownable {
    using Strings for uint256;
    uint256 public currentTokenId;

    uint256 public constant MINT_PRICE = 0.0001 ether;

    mapping(uint256 => string) private tokenURIs;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    function mintTo(string memory uri) public payable returns (uint256) {
        if (msg.value != MINT_PRICE) {
            revert MintPriceNotPaid();
        }
        if (uri.length != 59) {
            revert IpfsURINot59();
        }
        uint256 newTokenId = ++currentTokenId;
        tokenURIs[newTokenId] = uri;
        _safeMint(recipient, newTokenId);
        return newTokenId;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (ownerOf(tokenId) == address(0)) {
            revert NonExistentTokenURI();
        }

        string memory cid = tokenURIs[tokenId];
        if (!cid) {
            revert NonExistentTokenURI();
        }

        return string.concat("ipfs://", cid);
    }

    function withdrawPayments(address payable payee) external onlyOwner {
        uint256 balance = address(this).balance;
        (bool transferTx, ) = payee.call{value: balance}("");
        if (!transferTx) {
            revert WithdrawTransfer();
        }
    }
}
