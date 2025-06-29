// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract PiggyBankAccess  {

    error Token_NOTExist();
    error Only_Owner();
    error AmountIsZero();
    error IS_Piggyback_NotActive();
    error Address_Zero();
    error Only_Admin();

    string public purpose;
    address public owner;
    uint256 public balance;
    bool public isActive;
    address public admin;

    mapping(address => bool) public allowedTokens;

    modifier onlyAdmin() {
        if (msg.sender != admin) revert Only_Admin();
        _;
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert Only_Owner();
        _;
    }
    /////// reuse modifier
    modifier AmountISZero(uint256 amount) {
        if (amount == 0) revert AmountIsZero();
        _;
    }
    modifier AddressZero(address addressCheck) {
        if (addressCheck == address(0)) revert Address_Zero();
        _;
    }

    modifier Token_Exist(address token) {
        if (allowedTokens[token] == false) revert Token_NOTExist();
        _;
    }
    modifier Is_Active() {
        if (isActive == false) revert IS_Piggyback_NotActive();
        _;
    }

    // constructor(string memory _purpose, address _admin, address _owner) {
    //     purpose = _purpose;
    //     _setRoleAdmin(MANAGER_ROLE, DEFAULT_ADMIN_ROLE);
    //     _grantRole(DEFAULT_ADMIN_ROLE, admin);
    //     owner = _owner;
    //     admin = _admin;
    // }

    function initialize(string memory _purpose, address _admin, address _owner) external  {
        purpose = _purpose;
        // _setRoleAdmin(MANAGER_ROLE, DEFAULT_ADMIN_ROLE);
        // _grantRole(DEFAULT_ADMIN_ROLE, admin);
        owner = _owner;
        admin = _admin;
    }

    function deposit(
        address token,
        uint256 amount
    ) external onlyOwner AmountISZero(amount) AddressZero(token) {
        if (allowedTokens[token] == false) revert Token_NOTExist();
        require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        balance += amount;
        isActive = true;
    }

    function calculateWithDeductionFee(
        uint256 _amount
    ) internal pure AmountISZero(_amount) returns (uint256) {
        return (_amount * 15) / 100;
    }

    function withdraw(
        address token
    ) external onlyOwner Token_Exist(token) AmountISZero(balance) Is_Active {
    require(IERC20(token).transfer(msg.sender, balance), "Token transfer failed");
    balance = 0;
    isActive = false;
    }

    function emergencyWithdraw(
        address token
    ) external onlyOwner Token_Exist(token) AmountISZero(balance) Is_Active {
        if (allowedTokens[token] == false) revert Token_NOTExist();
        uint256 fine = calculateWithDeductionFee(balance);
        require(IERC20(token).transfer(msg.sender, (balance - fine)), "Token transfer failed");
        require(IERC20(token).transfer(admin, (fine)), "Token transfer failed");
        balance = 0;
        isActive = false;
    }

    function addToken(address token) external onlyAdmin {
        if (allowedTokens[token] == false) revert Token_NOTExist();
        allowedTokens[token] = true;
    }
}
