//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pin4Ukraine is ERC1155, Ownable {
    uint256 constant MINT_OPEN_WINDOW = 86460; // 24 hours 1 minute
    uint256 constant TOKEN_PRICE = 0.05 ether;
    uint256 public firstOpenDesign = 0;
    uint256 public lastOpenDesign = 0;
    uint256 public mintOpenSince = 0;

    constructor() ERC1155("https://pin4Ukraine.com/assets/{id}.json") {}

    function mint(uint256 id) external payable {
        require(mintOpenSince > 0 && firstOpenDesign > 0 && lastOpenDesign > 0, "MINT_NOT_CONFIGURED");
        require(block.timestamp > mintOpenSince, "MINT_NOT_OPEN");
        require(block.timestamp < mintOpenSince + MINT_OPEN_WINDOW, "MINT_CLOSED");
        require(id >= firstOpenDesign, "INCORRECT_DESIGN_ID");
        require(id <= lastOpenDesign, "INCORRECT_DESIGN_ID");
        if(msg.value >= TOKEN_PRICE) {
            _mint(msg.sender, id, 1, "");
        }
    }

    function setOpenDesigns(uint256 _firstOpenDesign, uint256 _lastOpenDesign) external onlyOwner {
        firstOpenDesign = _firstOpenDesign;
        lastOpenDesign = _lastOpenDesign;
    }

    function setMintOpenSince(uint256 _mintOpenSince) external onlyOwner {
        mintOpenSince = _mintOpenSince;
    }

    function support() external {
         uint256 currentBalance = address(this).balance;
         payable(0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa).transfer(currentBalance * 20 / 100);
         payable(0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa).transfer(currentBalance * 20 / 100);
         payable(0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa).transfer(currentBalance * 15 / 100);
         payable(0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa).transfer(address(this).balance);
    }
}
