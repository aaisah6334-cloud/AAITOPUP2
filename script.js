const { ethers } = require("ethers");
const bip39 = require("bip39");

/**
 * Generates a Sidra-compatible HD Wallet
 */
async function createSidraHDWallet() {
    // 1. Generate a random 12-word mnemonic (BIP-39)
    const mnemonic = bip39.generateMnemonic();
    console.log("Your Mnemonic Phrase:", mnemonic);

    // 2. Create the HDNode from the mnemonic
    // Sidra typically uses the standard Ethereum derivation path (m/44'/60'/0'/0/x)
    // for EVM compatibility on its Mainnet.
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);

    console.log("\n--- Derived Accounts ---");

    // 3. Derive multiple addresses from the same seed
    for (let i = 0; i < 3; i++) {
        const derivationPath = `m/44'/60'/0'/0/${i}`;
        const wallet = hdNode.derivePath(derivationPath);

        console.log(`Account #${i}:`);
        console.log(`  Path:    ${derivationPath}`);
        console.log(`  Address: ${wallet.address}`);
        console.log(`  Private Key: ${wallet.privateKey}\n`);
    }
}

createSidraHDWallet().catch(console.error);
