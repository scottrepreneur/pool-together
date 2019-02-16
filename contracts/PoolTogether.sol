pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';



contract PoolTogether {
  //States of Contract:
  //PoolOpen: Accepting
  //Saving: and Earning
  //PayOut: Withdraw
  enum State {
    PoolOpen,
    Saving,
    PayOut
  }

  uint min = 0.5;

  modifier atState(States _state) {
    require(
      state == _state,
      "Function cannot be called at this time."
    );
    _;
  }

  // Balances allowed to withdraw from contract
  mapping (address => uint) savings;
}


// Event emitted when a saver dives into the pool
  event Splash(address indexed saver, uint deposit);

// Event emitted when a saver withdraws
  event Withdraw(address indexed saver, uint savings);

//When a saver joins the pool
function splash(uint deposit) public payable atState(State.PoolOpen) {
  //For use w/ DAI Tokens: require(transferFrom(msg.sender, address(this), deposit), "DRAW_FAILED");
  require(msg.amount > min);

}


//View Status of contract State
function stateOfPool() public view returns (State) {
    return State;
  }

//View Status of pool

//View Status of pool potential return

//View Status of saver deposit




//Withdraw, only during PayOut period
//Question: Do we pull the funds from earning source each iteration?
// Or do we only pull funds that are requested (maximizing roll-over)?
function withdraw() public atState(State.PayOut) {
        uint amount = savings[msg.sender];
        // !re-entrancy : Zero the pending refund before
        savings[msg.sender] = 0;
        msg.sender.transfer(amount);
    }
