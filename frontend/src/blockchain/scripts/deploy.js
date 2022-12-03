const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const NFTContract = await hre.ethers.getContractFactory("NFTContract");
  const nftContract = await NFTContract.deploy();
  await nftContract.deployed();

  console.log("NFTContract deployed to:", nftContract.address);

  const Bridge = await hre.ethers.getContractFactory("Bridge");
  const bridge = await Bridge.deploy(
    "0x0C70d6E9760DEE639aC761f3564a190220DF5E44"
  );
  await bridge.deployed();

  console.log("Bridge deployed to:", bridge.address);

  fs.writeFileSync(
    "./config.js",
    `export const nftAddress = "${nftContract.address}"; export const bridgeAddress = "${bridge.address}";`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
