// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Timestone.sol";

contract MintTimestone is Script {
    Timestone private timestone;

    function setUp() public {
        timestone = new Timestone();
    }

    function run() public {
        vm.broadcast();

        uint256 tokenId = timestone.mintTo{value: 0.0001 ether}(
            address(1),
            "bafyreiaazb62jwf5cctvbyf7gnjx2ckogdauk2anoqjeudjc4s7573asz4"
        );
        console.log("tokenId", tokenId);

        string memory tokenURI = timestone.tokenURI(tokenId);
        console.log("URI", tokenURI);
    }
}
