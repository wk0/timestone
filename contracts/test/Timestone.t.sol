// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.16;

import "forge-std/Test.sol";
import "../src/Timestone.sol";

contract TimestoneTest is Test {
    using stdStorage for StdStorage;

    Timestone private nft;

    function setUp() public {
        // Deploy NFT contract
        nft = new Timestone("Timestone", "TMSTN");
    }

    function testFailNoMintPricePaid() public {
        nft.mintTo(
            address(1),
            "bafyreiaazb62jwf5cctvbyf7gnjx2ckogdauk2anoqjeudjc4s7573asz4"
        );
    }

    function testMintPricePaid() public {
        nft.mintTo{value: 0.0001 ether}(
            address(1),
            "bafyreiaazb62jwf5cctvbyf7gnjx2ckogdauk2anoqjeudjc4s7573asz4"
        );
    }

    // function testFailMaxSupplyReached() public {
    //     uint256 slot = stdstore
    //         .target(address(nft))
    //         .sig("currentTokenId()")
    //         .find();
    //     bytes32 loc = bytes32(slot);
    //     bytes32 mockedCurrentTokenId = bytes32(abi.encode(10000));
    //     vm.store(address(nft), loc, mockedCurrentTokenId);
    //     nft.mintTo{value: 0.0001 ether}(address(1));
    // }

    function testFailMintToZeroAddress() public {
        nft.mintTo{value: 0.0001 ether}(
            address(0),
            "bafyreiaazb62jwf5cctvbyf7gnjx2ckogdauk2anoqjeudjc4s7573asz4"
        );
    }

    function testNewMintOwnerRegistered() public {
        nft.mintTo{value: 0.0001 ether}(
            address(1),
            "bafyreiaazb62jwf5cctvbyf7gnjx2ckogdauk2anoqjeudjc4s7573asz4"
        );
        uint256 slotOfNewOwner = stdstore
            .target(address(nft))
            .sig(nft.ownerOf.selector)
            .with_key(1)
            .find();

        uint160 ownerOfTokenIdOne = uint160(
            uint256(
                (vm.load(address(nft), bytes32(abi.encode(slotOfNewOwner))))
            )
        );
        assertEq(address(ownerOfTokenIdOne), address(1));
    }

    function testBalanceIncremented() public {
        nft.mintTo{value: 0.0001 ether}(
            address(1),
            "bafyreiaazb62jwf5cctvbyf7gnjx2ckogdauk2anoqjeudjc4s7573asz4"
        );
        uint256 slotBalance = stdstore
            .target(address(nft))
            .sig(nft.balanceOf.selector)
            .with_key(address(1))
            .find();

        uint256 balanceFirstMint = uint256(
            vm.load(address(nft), bytes32(slotBalance))
        );
        assertEq(balanceFirstMint, 1);

        nft.mintTo{value: 0.0001 ether}(
            address(1),
            "bafyreiaazb62jwf5cctvbyf7gnjx2ckogdauk2anoqjeudjc4s7573asz4"
        );
        uint256 balanceSecondMint = uint256(
            vm.load(address(nft), bytes32(slotBalance))
        );
        assertEq(balanceSecondMint, 2);
    }

    function testSafeContractReceiver() public {
        Receiver receiver = new Receiver();
        nft.mintTo{value: 0.0001 ether}(
            address(receiver),
            "bafyreiaazb62jwf5cctvbyf7gnjx2ckogdauk2anoqjeudjc4s7573asz4"
        );
        uint256 slotBalance = stdstore
            .target(address(nft))
            .sig(nft.balanceOf.selector)
            .with_key(address(receiver))
            .find();

        uint256 balance = uint256(vm.load(address(nft), bytes32(slotBalance)));
        assertEq(balance, 1);
    }

    function testFailUnSafeContractReceiver() public {
        vm.etch(address(1), bytes("mock code"));
        nft.mintTo{value: 0.0001 ether}(
            address(1),
            "bafyreiaazb62jwf5cctvbyf7gnjx2ckogdauk2anoqjeudjc4s7573asz4"
        );
    }

    function testWithdrawalWorksAsOwner() public {
        // Mint an NFT, sending eth to the contract
        Receiver receiver = new Receiver();
        address payable payee = payable(address(0x1337));
        uint256 priorPayeeBalance = payee.balance;
        nft.mintTo{value: nft.MINT_PRICE()}(
            address(receiver),
            "bafyreiaazb62jwf5cctvbyf7gnjx2ckogdauk2anoqjeudjc4s7573asz4"
        );
        // Check that the balance of the contract is correct
        assertEq(address(nft).balance, nft.MINT_PRICE());
        uint256 nftBalance = address(nft).balance;
        // Withdraw the balance and assert it was transferred
        nft.withdrawPayments(payee);
        assertEq(payee.balance, priorPayeeBalance + nftBalance);
    }

    function testWithdrawalFailsAsNotOwner() public {
        // Mint an NFT, sending eth to the contract
        Receiver receiver = new Receiver();
        nft.mintTo{value: nft.MINT_PRICE()}(
            address(receiver),
            "bafyreiaazb62jwf5cctvbyf7gnjx2ckogdauk2anoqjeudjc4s7573asz4"
        );
        // Check that the balance of the contract is correct
        assertEq(address(nft).balance, nft.MINT_PRICE());
        // Confirm that a non-owner cannot withdraw
        vm.expectRevert("Ownable: caller is not the owner");
        vm.startPrank(address(0xd3ad));
        nft.withdrawPayments(payable(address(0xd3ad)));
        vm.stopPrank();
    }
}

contract Receiver {
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
