//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pins4Ukraine is ERC1155, Ownable {
    uint256 constant TOKEN_PRICE_INITIAL = 0.04 ether;
    uint256 constant TOKEN_PRICE_INCREASE = 0.01 ether;
    uint256 constant INCREASE_RATE = 259200; // 3 days
    uint256 public firstOpenDesign = 0;
    uint256 public lastOpenDesign = 0;
    uint256 public mintOpenSince = 0;
    uint256 public mintOpenUntil = 0;

    constructor() ERC1155("https://pins4ukraine.com/assets/{id}.json") {}

    function mint(uint256 id) external payable {
        require(mintOpenSince > 0 && firstOpenDesign > 0 && lastOpenDesign > 0, "Mint not configured");
        require(block.timestamp >= mintOpenSince, "Minting not open yet");
        require(mintOpenUntil == 0 || block.timestamp < mintOpenUntil, "Minting was closed already");
        require(id >= firstOpenDesign, "This design isn't avalaible");
        require(id <= lastOpenDesign, "This design isn't avalaible");
        require(msg.value >= currentTokenPrice(), "Not enought value to mint, please use plain transfer");

        _mint(msg.sender, id, 1, "");
    }

    function currentTokenPrice() public view returns (uint256) {
        require(block.timestamp >= mintOpenSince, "Minting not open yet");

        uint256 relativeTime = block.timestamp - mintOpenSince;
        uint256 increases = relativeTime / INCREASE_RATE;
        return increases * TOKEN_PRICE_INCREASE;
    }

    function sendSupport() external {
        uint256 currentBalance = address(this).balance;
        payable(0x02f1c4C93AFEd946Cce5Ad7D34354A150bEfCFcF).transfer(currentBalance * 30 / 100);
        payable(0x02f1c4C93AFEd946Cce5Ad7D34354A150bEfCFcF).transfer(currentBalance * 20 / 100);
        payable(0x02f1c4C93AFEd946Cce5Ad7D34354A150bEfCFcF).transfer(address(this).balance);
    }

    function setOpenDesigns(uint256 _firstOpenDesign, uint256 _lastOpenDesign) external onlyOwner {
        firstOpenDesign = _firstOpenDesign;
        lastOpenDesign = _lastOpenDesign;
    }

    function setMintOpenSince(uint256 _mintOpenSince) external onlyOwner {
        mintOpenSince = _mintOpenSince;
    }

    function setMintOpenUntil(uint256 _mintOpenUntil) external onlyOwner {
        mintOpenUntil = _mintOpenUntil;
    }

    fallback() external payable {
        // allows to send funds to this contract
    }

    receive() external payable {
        // allows to send funds to this contract
    }
}
