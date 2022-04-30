const hre = require("hardhat");
const fs = require('fs');

async function main() {
    const fc = fs.readFileSync('src/designNames.json', 'utf8');
    const designNames = JSON.parse(fc);

    Object.keys(designNames).forEach(tokenId => {
        const content = {
          "image": `https://pins4ukraine.com/assets/${tokenId}.png`,
          "name": designNames[tokenId],
          "description": "",
          "attributes": [
            {
              "trait_type": "Design",
              "value": tokenId,
            },
          ]
        }

        fs.writeFileSync(`static/assets/${tokenId}.json`, JSON.stringify(content));
    })

    console.log(`Generated metadata files`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
