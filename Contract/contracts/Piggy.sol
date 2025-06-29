// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PiggyBank is ReentrancyGuard {
    error Token_NOTExist();
    error Only_Owner();
    error AmountIsZero();
    error IS_Piggyback_NotActive();
    error Address_Zero();
    error Only_Admin();
    error Not_Yet_Time();
    error Already_Initialized();

    string public purpose;
    address public owner;
    uint256 public balance;
    bool public isActive;
    address public admin;
    uint256 public deadline;
    bool private initialized;

    // uint256 private 

    struct GiftCard {
        uint256 poolBalance;
        address owner;
        bool isRedeem;
        // address recipient;
    }

    mapping (bytes32=> GiftCard) public _giftCard;
    mapping (address => bytes32) public _giftCardSig;
    mapping(address => bool) public allowedTokens;
    mapping(address => uint256) public tokenBalances;

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

    modifier notInitialized() {
        if (initialized) revert Already_Initialized();
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

    modifier Is_Time() {
        if (block.timestamp < deadline) revert Not_Yet_Time();
        _;
    }

    event Deposited(
        address indexed from,
        address indexed token,
        uint256 amount
    );
    event Withdrawn(address indexed to, address indexed token, uint256 amount);
    event Initialized(string purpose, address owner, address admin);

    function initialize(
        string memory _purpose,
        address _admin,
        address _owner,
        address _token,
        address _token1
    ) external notInitialized AddressZero(_admin) AddressZero(_owner) {
        purpose = _purpose;
        owner = _owner;
        admin = _admin;
        allowedTokens[_token] = true;
        allowedTokens[_token1] = true;

        initialized = true;
        emit Initialized(_purpose, _owner, _admin);
    }

    function deposit(
        address token,
        uint256 amount,
        uint256 _days
    )
        external
        onlyOwner
        AmountISZero(amount)
        AddressZero(token)
        Token_Exist(token)
        nonReentrant
    {
        uint256 balanceBefore = IERC20(token).balanceOf(address(this));
        require(
            IERC20(token).transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );
        uint256 balanceAfter = IERC20(token).balanceOf(address(this));

        uint256 actualAmount = balanceAfter - balanceBefore;

        deadline = block.timestamp + (_days * 1 days);
        balance += actualAmount;
        tokenBalances[token] += actualAmount;

        isActive = true;
        emit Deposited(msg.sender, token, amount);
    }

    function calculateWithDeductionFee(
        uint256 _amount
    ) internal pure AmountISZero(_amount) returns (uint256) {
        uint256 fee = (_amount * 15) / 100;
        return fee;
    }

    function withdraw(
        address token
    )
        external
        onlyOwner
        Token_Exist(token)
        AmountISZero(balance)
        Is_Active
        Is_Time
        nonReentrant
    {
        uint256 amount = tokenBalances[token];
        if (amount == 0) revert AmountIsZero();

        tokenBalances[token] = 0;
        isActive = false;

        require(IERC20(token).transfer(owner, amount), "Token transfer failed");

        emit Withdrawn(owner, token, amount);
    }

    function emergencyWithdraw(
        address token
    ) external onlyOwner Token_Exist(token) Is_Active nonReentrant {
        uint256 amount = tokenBalances[token];
        if (amount == 0) revert AmountIsZero();

        uint256 fine = calculateWithDeductionFee(amount);
        uint256 remainingAmount = amount - fine;

        tokenBalances[token] = 0;
        isActive = false;

        if (fine > 0) {
            require(
                IERC20(token).transfer(admin, fine),
                "Admin fee transfer failed"
            );
        }

        require(
            IERC20(token).transfer(owner, remainingAmount),
            "Owner transfer failed"
        );

        emit Withdrawn(owner, token, amount);
    }

    function addToken(address token) external onlyAdmin {
        if (allowedTokens[token] == false) revert Token_NOTExist();
        allowedTokens[token] = true;
    }

        
    function getTotalTokenBalance(address token) external view Token_Exist(token) returns (uint256) {
        return tokenBalances[token];
    }
}
