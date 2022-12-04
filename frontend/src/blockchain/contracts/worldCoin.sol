// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { ByteHasher } from './helpers/ByteHasher.sol';
import { IWorldID } from './interfaces/IWorldID.sol';

contract Contract {
    using ByteHasher for bytes;

  
    error InvalidNullifier();

    IWorldID internal immutable worldId;


    uint256 internal immutable actionId;

    uint256 internal immutable groupId = 1;

    mapping(uint256 => bool) internal nullifierHashes;

    constructor(IWorldID _worldId, string memory _actionId) {
        worldId = _worldId;
        actionId = abi.encodePacked(_actionId).hashToField();
    }

    function verifyAndExecute(
        address input,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
  
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(input).hashToField(),
            nullifierHash,
            actionId,
            proof
        );

        nullifierHashes[nullifierHash] = true;

    }
}