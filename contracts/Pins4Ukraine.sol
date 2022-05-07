//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Pins4Ukraine is ERC1155, IERC2981, Ownable {
    using Strings for uint256;
    using SafeERC20 for IERC20;

    address constant UKRAINE_ADDRESS = 0x165CD37b4C644C2921454429E7F9358d18A45e14;
    uint256 constant TOKEN_PRICE_INITIAL = 0.04 ether;
    uint256 constant TOKEN_PRICE_INCREASE = 0.01 ether;
    uint256 constant INCREASE_RATE = 259200; // 3 days
    uint256 constant ROYALTY = 5; // 5%

    uint256 public firstOpenDesign = 0;
    uint256 public lastOpenDesign = 0;
    uint256 public mintOpenSince = 0;
    uint256 public mintOpenUntil = 0;

    constructor() ERC1155("https://pins4ukraine.com/assets") {}

    function currentTokenPrice() public view returns (uint256) {
        require(block.timestamp >= mintOpenSince, "Minting not open yet");

        uint256 relativeTime = block.timestamp - mintOpenSince;
        uint256 increases = relativeTime / INCREASE_RATE;
        return increases * TOKEN_PRICE_INCREASE;
    }

    function mint(uint256 _tokenId) external payable {
        require(mintOpenSince > 0 && firstOpenDesign > 0 && lastOpenDesign > 0, "Mint not configured");
        require(block.timestamp >= mintOpenSince, "Minting not open yet");
        require(mintOpenUntil == 0 || block.timestamp < mintOpenUntil, "Minting was closed already");
        require(_tokenId >= firstOpenDesign, "This design isn't avalaible");
        require(_tokenId <= lastOpenDesign, "This design isn't avalaible");
        require(msg.value >= currentTokenPrice(), "Not enought value to mint, please use plain transfer");

        _mint(msg.sender, _tokenId, 1, "");
    }

    fallback() external payable {
        // allows to directly send funds to this contract
    }

    receive() external payable {
        // allows to directly send funds to this contract
    }

    function transferSupport() external {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to transfer");
        payable(UKRAINE_ADDRESS).transfer(balance);
    }

    function transferSupportERC20(IERC20 _token) external {
        uint256 balance = _token.balanceOf(address(this));
        require(balance > 0, "No balance to transfer");
        _token.safeTransfer(UKRAINE_ADDRESS, balance);
    }

    // Metadata

    function uri(uint256 _tokenId) public view virtual override returns (string memory) {
        return string(abi.encodePacked(super.uri(_tokenId), "/", _tokenId.toString(), ".json"));
    }

    // EIP2981 royalties

    function royaltyInfo(uint256 /*_tokenId*/, uint256 _salePrice) external pure override
        returns (address, uint256)
    {
        return (UKRAINE_ADDRESS, (_salePrice * ROYALTY) / 100);
    }

    function supportsInterface(bytes4 _interfaceId) public view virtual override(ERC1155, IERC165) returns (bool) {
        return (
            _interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(_interfaceId)
        );
    }

    // Admin

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
}
