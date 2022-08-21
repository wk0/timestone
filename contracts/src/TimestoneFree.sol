// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

import "solmate/tokens/ERC721.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";

error MintPriceNotPaid();
// error MaxSupply();
error NonExistentTokenURI();
error WithdrawTransfer();
error IpfsURINot59();

contract TimestoneFree is ERC721 {
    using Strings for uint256;
    uint256 public currentTokenId;

    mapping(uint256 => string) private tokenURIs;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    function mintTo(address recipient, string memory uri)
        public
        returns (uint256)
    {
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
        if (bytes(cid).length == 0) {
            revert NonExistentTokenURI();
        }
        return string.concat("ipfs://", cid);
    }
}
