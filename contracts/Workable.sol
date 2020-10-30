//SPDX-License-Identifier: MIT
pragma solidity ^0.6.8;

contract Workable {
  bool internal needsWork = false;

  event Worked(address worker);

  function requestWork() external {
    needsWork = true;
  }

  function workable() public view returns (bool) {
    return needsWork;
  }

  function work() external {
    require(needsWork, "!workable()");
    needsWork = false;
    emit Worked(msg.sender);
  }
}