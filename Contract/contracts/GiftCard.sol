// SPDX-License-Identifier: UNLICENSE-2.0

pragma solidity 0.8.29;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

// TODO implement a function that takes lists of addresses and pick an address to transfer certain amounts to it
contract GiftCardContract is ReentrancyGuard {
    error Address_Zero();
    error Card_Already_Claimed();
    error YOU_Are_Not_AUTHORIZED();
    error AmountIs_Zero();
    error Already_Initialized();
    error Insufficient_Funds();

    enum GiftCardStatus {
        PENDING,
        REDEEMED
    }

    struct GiftCardStruct {
        uint256 poolBalance;
        address owner;
        bool isRedeem;
        address recipient;
        string mail;
        GiftCardStatus status;
    }

    uint256 public giftCount;
    address public ownerAccount;
    bool private initialized;

    mapping(bytes32 => GiftCardStruct) public _giftCard;
    mapping(address => bytes32) public _giftCardSig;
    mapping(address => mapping(uint256 => bytes32)) public _bytes32;
    mapping(address => bytes32[]) private userGiftCards;

    event GiftCardCreated(
        bytes32 indexed cardId,
        address indexed creator,
        address indexed recipient,
        uint256 amount
    );
    event GiftCardRedeemed(
        bytes32 indexed cardId,
        address indexed recipient,
        uint256 amount
    );

    event RandomTransfer(
        address indexed sender,
        address indexed recipient,
        uint256 amount
    );
    event Refund(
        bytes32 indexed cardId,
        address indexed creator,
        uint256 amount
    );

    event FundsDistributed(
        address indexed sender,
        address[] recipients,
        uint256 totalAmount
    );

    modifier AddressZero(address addressCheck) {
        if (addressCheck == address(0)) revert Address_Zero();
        _;
    }

    modifier AmountISZero(uint256 amount) {
        if (amount == 0) revert AmountIs_Zero();
        _;
    }

    modifier notInitialized() {
        if (initialized) revert Already_Initialized();
        _;
    }

    constructor(address _owner) {
        ownerAccount = _owner;
    }

    function createGiftcard(
        address _recipient,
        string memory _mail
    )
        public
        payable
        AddressZero(_recipient)
        AmountISZero(msg.value)
        returns (bytes32 cardId)
    {
        cardId = keccak256(
            abi.encodePacked(msg.sender, _recipient, block.timestamp)
        );
        _giftCard[cardId] = GiftCardStruct({
            poolBalance: msg.value,
            owner: msg.sender,
            isRedeem: false,
            recipient: _recipient,
            mail: _mail,
            status: GiftCardStatus.PENDING
        });

        userGiftCards[msg.sender].push(cardId);
        userGiftCards[_recipient].push(cardId);

        emit GiftCardCreated(cardId, msg.sender, _recipient, msg.value);
        return cardId;
    }

    function redeemGiftCard(bytes32 _cardId) external nonReentrant {
        GiftCardStruct storage card = _giftCard[_cardId];
        if (card.isRedeem) revert Card_Already_Claimed();
        if (card.recipient != msg.sender) revert YOU_Are_Not_AUTHORIZED();

        // Get 5% of the pool balance
        uint256 amount = (card.poolBalance * 5) / 100;

        // Transfer CBTC to recipient
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) revert Insufficient_Funds();

        card.isRedeem = true;
        card.status = GiftCardStatus.REDEEMED;

        emit GiftCardRedeemed(_cardId, msg.sender, amount);
    }

    function transferRandom(address[] calldata recipients) external payable {
        require(recipients.length > 0, "No recipients provided");
        require(msg.value > 0, "Amount must be greater than zero");

        // Generate a random index
        uint256 randomIndex = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)
            )
        ) % recipients.length;
        address selectedRecipient = recipients[randomIndex];

        // Transfer the amount to the selected recipient
        (bool success, ) = payable(selectedRecipient).call{value: msg.value}(
            ""
        );
        if (!success) revert Insufficient_Funds();

        emit RandomTransfer(msg.sender, selectedRecipient, msg.value);
    }

    function refundGiftCard(bytes32 _cardId) external {
        GiftCardStruct storage card = _giftCard[_cardId];
        require(card.owner == msg.sender, "Only creator can refund");
        require(!card.isRedeem, "Card already redeemed");

        uint256 amount = (card.poolBalance * 10) / 100;
        card.poolBalance = 0;
        card.isRedeem = true;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) revert Insufficient_Funds();

        emit Refund(_cardId, msg.sender, amount);
    }

    function createBatchGiftCards(
        address[] calldata _recipients,
        string[] memory mail
    ) external payable {
        require(
            _recipients.length == mail.length,
            "Recipients and mail length mismatch"
        );
        require(msg.value > 0, "Amount must be greater than zero");

        uint256 amountPerCard = msg.value / _recipients.length;

        for (uint256 i = 0; i < _recipients.length; i++) {
            bytes32 cardId = keccak256(
                abi.encodePacked(msg.sender, _recipients[i], block.timestamp, i)
            );
            _giftCard[cardId] = GiftCardStruct({
                poolBalance: amountPerCard,
                owner: msg.sender,
                recipient: _recipients[i],
                isRedeem: false,
                mail: mail[i],
                status: GiftCardStatus.PENDING
            });
            emit GiftCardCreated(
                cardId,
                msg.sender,
                _recipients[i],
                amountPerCard
            );
        }
    }

    function distributeEqually(address[] calldata recipients) external payable {
        // Validate inputs
        require(recipients.length > 0, "No recipients provided");
        require(msg.value > 0, "Amount must be greater than zero");

        // Calculate amount per recipient
        uint256 amountPerRecipient = msg.value / recipients.length;

        // Distribute funds to each recipient
        for (uint256 i = 0; i < recipients.length; i++) {
            (bool success, ) = payable(recipients[i]).call{
                value: amountPerRecipient
            }("");
            if (!success) revert Insufficient_Funds();
        }

        emit FundsDistributed(msg.sender, recipients, msg.value);
    }

    //view functions
    function getGiftCardsForAddress(
        address user
    ) public view returns (bytes32[] memory) {
        return userGiftCards[user];
    }

    // Add a function to get details of a specific card
    function getGiftCardDetails(
        bytes32 cardId
    )
        public
        view
        returns (
            uint256 poolBalance,
            address owner,
            bool isRedeem,
            address recipient,
            string memory mail,
            GiftCardStatus status
        )
    {
        GiftCardStruct memory card = _giftCard[cardId];
        return (
            card.poolBalance,
            card.owner,
            card.isRedeem,
            card.recipient,
            card.mail,
            card.status
        );
    }

    // Function to withdraw contract balance (only owner)
    function withdrawBalance() external {
        require(msg.sender == ownerAccount, "Only owner can withdraw");
        (bool success, ) = payable(ownerAccount).call{
            value: address(this).balance
        }("");
        if (!success) revert Insufficient_Funds();
    }

    // Function to receive CBTC
    receive() external payable {}
}
