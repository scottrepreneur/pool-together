pragma solidity ^0.5.0;

//import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract PoolTogether {

  address public owner = msg.sender;
  uint public creationTime = now;

  //States of Contract:
  //PoolOpen: Accepting
  //Saving: and Earning
  //PayOut: Withdraw
  enum States {
    PoolOpen,  //0
    Saving,    //1
    PayOut     //2
  }

  States state = States.PoolOpen;
  uint pool = 0;
  uint min = 1 ether;


  modifier atState(States _state) {
    require(
      state == _state,
      "Function cannot be called at this time."
    );
    _;
  }

  // Balances allowed to withdraw from contract
  mapping (address => uint) savings;



// Event emitted when a saver dives into the pool
  event Splash(address indexed saver, uint deposit);

// Event emitted when a saver withdraws
  event Withdraw(address indexed saver, uint savings);

//When a saver joins the pool
function splash() public payable atState(States.PoolOpen) {
  //For use w/ DAI Tokens: require(transferFrom(msg.sender, address(this), deposit), "DRAW_FAILED");
  require(msg.value >= min);
  pool = pool + msg.value;
  savings[msg.sender] = msg.value;

}


//View Status of contract State
function stateOfPool() public view returns(States){
    return state;
  }

//View Status of pool
function poolSize() public view returns (uint){
    return pool;
}

//View Status of pool potential return in 100x percentage value
//So 300 = 3.00%
//Hardcoded now
function poolReturn() public view returns(uint){
    return(300);
}

//View Status of saver deposit
function myDeposit() public view returns(uint){
    return(savings[msg.sender]);
}


//Withdraw, only during PayOut period
//Question: Do we pull the funds from earning source each iteration?
// Or do we only pull funds that are requested (maximizing roll-over)?
function withdraw() public atState(States.PayOut) {
        uint amount = savings[msg.sender];
        pool = pool - amount;
        // !re-entrancy : Zero the pending refund before
        savings[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

// Only for testing
function setState(uint _stateVar) public {
    require(msg.sender == owner);
    state = States(_stateVar);
}

}
