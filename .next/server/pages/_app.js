(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 4024:
/***/ ((module) => {

"use strict";

const ETHAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
/****************** SEPOLIA TESTNET **********************/ // npx hardhat run scripts/deploy-sepolia.js --network sepolia
const DAITokenAddress = "0xF2e2C8A502657c37ad4d37F2BefaBEb308315152";
const LINKTokenAddress = "0x05332eF900c3B926ED013F66b64A85646Fd82092";
const USDCTokenAddress = "0x9603ed1F72C87d33d48a5e3A4A0915235BA46cFe";
const AddressToTokenMapAddress = "0x9Db7F3e9aeee7577a9CBb32378d28eB19347D50E";
const LendingConfigAddress = "0xDcd209294e7605D3123C3C2A5Da58Ce525C0E3DC";
const LendingHelperAddress = "0x5620bE39D5B89C5D8Ece7E1509B5eC5B6927Da98";
const LendingPoolAddress = "0xF5D9C5C8073D700696773bE0cD67FDfAaA9A8bD0";
const BTCTokenAddress = "0x516a289d80a592b2f968c8d361d533d261d0137c";
/********* PRICE FEED ADDRESSES ***********/ // Sepolia PF addresses
// https://docs.chain.link/data-feeds/price-feeds/addresses/#Sepolia%20Testnet
const ETH_USD_PF_ADDRESS = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
const DAI_USD_PF_ADDRESS = "0x14866185B1962B63C3Ea9E03Bc1da838bab34C19";
const USDC_USD_PF_ADDRESS = "0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E";
const LINK_USD_PF_ADDRESS = "0xc59E3633BAAC79493d908e63626716e204A45EdF";
const BTC_USD_PF_ADDRESS = "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43";
const account1 = "0x1c485a04648a101882b6a4473E31A786f8Ad7BFb";
const account2 = "0x021edEFA528293eB8ad9A2d9e0d71011f6297601";
const account3 = "0xc1f33e8c427fd4126A23A4a9B721BD97Fb11dDe6";
const account4 = "0x315F60449DaB3D321aF75821b576E7F436308635";
const account5 = "0x4B40f99E93A8814be7fDe5F6AaFA5e9823E13728";
const account6 = "0x3f39Ae58Cb1148ec1Ad903648319359Cfdc34a02";
module.exports = {
    ETHAddress,
    DAITokenAddress,
    LINKTokenAddress,
    USDCTokenAddress,
    BTCTokenAddress,
    AddressToTokenMapAddress,
    LendingConfigAddress,
    LendingHelperAddress,
    LendingPoolAddress,
    ETH_USD_PF_ADDRESS,
    DAI_USD_PF_ADDRESS,
    USDC_USD_PF_ADDRESS,
    LINK_USD_PF_ADDRESS,
    BTC_USD_PF_ADDRESS,
    account1,
    account2,
    account3,
    account4,
    account5,
    account6
};


/***/ }),

/***/ 3476:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./styles/globals.css
var globals = __webpack_require__(6764);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./context/lendContext.js
var lendContext = __webpack_require__(7224);
// EXTERNAL MODULE: external "ethers"
var external_ethers_ = __webpack_require__(1982);
// EXTERNAL MODULE: ./addresses.js
var addresses = __webpack_require__(4024);
;// CONCATENATED MODULE: ./context/LendState.js




const tokensList = __webpack_require__(7076);
// TODO : uncomment for sepolia
const TokenABI = __webpack_require__(9323);
const LendingPoolABI = __webpack_require__(9608);
const LendingHelperABI = __webpack_require__(2395);
// TODO : uncomment for localhost
// const TokenABI = require("../artifacts/contracts/DAIToken.sol/DAIToken.json");
// const LendingPoolABI = require("../artifacts/contracts/LendingPool.sol/LendingPool.json");
// const LendingHelperABI = require("../artifacts/contracts/LendingHelper.sol/LendingHelper.json");
// Importing Bank contract details

const numberToEthers = (number)=>{
    return external_ethers_.ethers.utils.parseEther(number.toString());
};
const LendState = (props)=>{
    //* Declaring all the states
    // Set metamask details
    const [metamaskDetails, setMetamaskDetails] = (0,external_react_.useState)({
        provider: null,
        networkName: null,
        signer: null,
        currentAccount: null
    });
    const [userAssets, setUserAssets] = (0,external_react_.useState)([]);
    const [supplyAssets, setSupplyAssets] = (0,external_react_.useState)([]);
    const [assetsToBorrow, setAssetsToBorrow] = (0,external_react_.useState)([]);
    const [yourBorrows, setYourBorrows] = (0,external_react_.useState)([]);
    //  contract details setting
    const [contract, setContract] = (0,external_react_.useState)({
        bankContract: null
    });
    // for storing user supply assets in the lending pool
    const [supplySummary, setSupplySummary] = (0,external_react_.useState)({
        totalUSDBalance: 0,
        weightedAvgAPY: 0,
        totalUSDCollateral: 0
    });
    const [borrowSummary, setBorrowSummary] = (0,external_react_.useState)({
        totalUSDBalance: 0,
        weightedAvgAPY: 0,
        totalBorrowPowerUsed: 0
    });
    const connectWallet = async ()=>{
        console.log("1. Connecting to wallet...");
        const { ethereum  } = window;
        const failMessage = "Please install Metamask & connect your Metamask";
        try {
            if (!ethereum) return; // console.log(failMessage);
            const account = await ethereum.request({
                method: "eth_requestAccounts"
            });
            window.ethereum.on("chainChanged", ()=>{
                window.location.reload();
            });
            window.ethereum.on("accountsChanged", ()=>{
                window.location.reload();
            });
            const provider = new external_ethers_.ethers.providers.Web3Provider(window.ethereum);
            const network = await provider.getNetwork();
            const networkName = network.name;
            const signer = provider.getSigner();
            if (networkName != "sepolia") {
                alert("Please switch your network to Sepolia Testnet");
                return;
            }
            if (account.length) {
                let currentAddress = account[0];
                setMetamaskDetails({
                    provider: provider,
                    networkName: networkName,
                    signer: signer,
                    currentAccount: currentAddress
                });
                console.log("Connected to wallet....");
            } else {
                alert(failMessage);
                return;
            }
        } catch (error) {
            reportError(error);
        }
    };
    const getUserAssets = async ()=>{
        console.log("2. Getting Assets to supply...");
        try {
            const assets = await Promise.all(tokensList.token.map(async (token)=>{
                let tok;
                if (token.name != "ETH") {
                    // TODO : getContract()
                    // 2. Toke
                    const tokenContract = new external_ethers_.ethers.Contract(token.address, TokenABI.abi, metamaskDetails.provider);
                    tok = await tokenContract.balanceOf(metamaskDetails.currentAccount);
                    tok = token ? external_ethers_.ethers.utils.formatUnits(tok, token.decimal) : 0;
                } else {
                    tok = await metamaskDetails.provider.getBalance(metamaskDetails.currentAccount);
                    tok = external_ethers_.ethers.utils.formatEther(tok);
                }
                let asset = {
                    image: token.image,
                    address: token.address,
                    name: token.name,
                    apy: token.apy,
                    isCollateral: token.isCollateral,
                    balance: tok
                };
                return asset;
            }));
            setUserAssets(assets);
            console.log("Got Assets to supply...");
            console.log(JSON.stringify(assets));
            return assets;
        } catch (error) {
            reportError(error);
        }
    };
    const supplyAssetsToPool = async (name, amount)=>{
    //   // console.log("supplyAssetsToPool starting....");
    //   // console.log("supply name : " + name);
    //   // console.log("supply amount : " + amount);
    //   //* connecting with contract
    //   const bankContract = new ethers.Contract(
    //     BankContractAddress,
    //     BankContractABI,
    //     metamaskDetails.signer
    //   );
    //   setContract({ bankContract: bankContract });
    //   const price = ethers.utils.parseUnits(amount, "ether");
    //   //* estimating gas price
    //   const gasLimit = await bankContract.estimateGas.depositAsset(name, {
    //     value: price,
    //   });
    //   let totalGas = (
    //     await metamaskDetails.provider.getFeeData()
    //   ).maxFeePerGas.mul(gasLimit);
    //   totalGas = ethers.utils.formatUnits(totalGas, "ether");
    //   // console.log("Total GAS : " + totalGas);
    //   // // console.log(estimateGas);
    //   // let gas = parseInt(Number(estimateGas._hex)).toString();
    //   // const gas2 = ethers.utils.parseUnits(gas, "ether");
    //   // // console.log(gas2);
    //   // //* Writing the contract
    //   const transcation = await bankContract.depositAsset(name, {
    //     value: price,
    //   });
    //   await transcation.wait();
    //   // console.log("Transaction done....");
    //   // //* Reading the contract
    //   // let contractBalance = await bankContract.getContactBalance();
    //   // contractBalance = contractBalance.toString();
    //   // // console.log(contractBalance);
    };
    const getContract = async (address, abi)=>{
        const contract = new external_ethers_.ethers.Contract(address, abi.abi, metamaskDetails.provider);
        return contract;
    };
    /**************************** APPROVE TOKENS ************************************/ const ApproveToContinue = async (tokenAddress, approveAmount)=>{
        const amount = numberToEthers(approveAmount);
        console.log("****Approving token : " + tokenAddress + "| supplyAmount : " + approveAmount);
        try {
            const contract = await getContract(tokenAddress, TokenABI);
            const transaction = await contract.connect(metamaskDetails.signer).approve(addresses.LendingPoolAddress, amount);
            await transaction.wait();
            console.log("Token Approved....");
            return {
                status: 200,
                message: "Transaction Successful..."
            };
        } catch (error) {
            reportError(error);
            return {
                status: 500,
                message: error.reason
            };
        }
    };
    /*************************** Lend Functionality ***************************/ const LendAsset = async (token, supplyAmount)=>{
        try {
            const amount = numberToEthers(supplyAmount);
            const valueOption = {
                value: amount
            };
            console.warn("***Lending token : " + token + "| supplyAmount : " + supplyAmount);
            const contract = await getContract(addresses.LendingPoolAddress, LendingPoolABI);
            console.log(contract);
            let transaction;
            if (token == addresses.ETHAddress) {
                transaction = await contract.connect(metamaskDetails.signer).lend(token, amount, valueOption);
            } else {
                transaction = await contract.connect(metamaskDetails.signer).lend(token, amount);
            }
            await transaction.wait();
            return {
                status: 200,
                message: "Transaction Successful.."
            };
        } catch (error) {
            reportError(error);
            return {
                status: 500,
                message: error.reason
            };
        }
    };
    /*************************** Withdraw Functionality ***************************/ const WithdrawAsset = async (tokenAddress, withdrawAmount)=>{
        try {
            const amount = numberToEthers(withdrawAmount);
            console.log("***Withdrawing token : " + tokenAddress + "| withdrawAmount : " + withdrawAmount);
            const contract = await getContract(addresses.LendingPoolAddress, LendingPoolABI);
            const transaction = await contract.connect(metamaskDetails.signer).withdraw(tokenAddress, amount);
            await transaction.wait();
            console.log("Token Withdrawn....");
            return {
                status: 200,
                message: "Transaction Successful.."
            };
        } catch (error) {
            reportError(error);
            return {
                status: 500,
                message: error.reason
            };
        }
    };
    const objectifySuppliedAssets = async (assets)=>{
        const assetsList = [];
        for(let i = 0; i < assets.length; i++){
            const token = assets[i].token;
            let lendQty = assets[i].lentQty;
            const amountInUSD = await getAmountInUSD(token, lendQty);
            lendQty = Number(assets[i].lentQty) / 1e18;
            const maxSupplyAmount = await getUserTotalAvailableBalance();
            const maxQty = await getTokensPerUSDAmount(token, maxSupplyAmount);
            const qty = lendQty <= maxQty ? lendQty : maxQty;
            console.log("lendQty" + lendQty);
            console.log("maxQty" + maxQty);
            console.log("maxSupplyAmount" + maxSupplyAmount);
            assetsList.push({
                token: assets[i].token,
                balance: lendQty,
                apy: Number(assets[i].lentApy),
                balanceInUSD: amountInUSD,
                maxSupply: qty
            });
        }
        console.log("**********objectifySuppliedAssets");
        console.log(assetsList);
        return assetsList;
    };
    const objectifyBorrowedAssets = async (assets)=>{
        // console.log("*** In objectifyBorrowedAssets ***");
        const borrowsList = [];
        // console.log(assets);
        for(let i = 0; i < assets.length; i++){
            const token = assets[i].token;
            const borrowQty = assets[i].borrowQty;
            const borrowApy = assets[i].borrowApy;
            const amountInUSD = await getAmountInUSD(token, borrowQty);
            borrowsList.push({
                token: token,
                borrowQty: Number(borrowQty),
                borrowApy: Number(borrowApy),
                borrowedBalInUSD: amountInUSD
            });
        }
        // console.log("**** objectifyBorrowedAssets");
        // console.log(borrowsList);
        return borrowsList;
    };
    const mergeObjectifiedAssets = (assets)=>{
        // console.log("*** In mergeObjectifiedAssets....");
        //  console.log(assets);
        var result = tokensList.token.filter((tokenList)=>{
            return assets.some((assetList)=>{
                return tokenList.address == assetList.token;
            });
        }).map((assetObj)=>({
                ...assets.find((item)=>item.token === assetObj.address && item),
                ...assetObj
            }));
        // console.log(result);
        return result;
    };
    const getAmountInUSD = async (address, amount)=>{
        // console.log("Getting amount in USD......");
        // console.log("amount" + amount);
        // console.log("AMOUNT" + AMOUNT);
        try {
            const AMOUNT = numberToEthers(amount);
            const contract = new external_ethers_.ethers.Contract(addresses.LendingHelperAddress, LendingHelperABI.abi, metamaskDetails.provider);
            const amountInUSD = Number(await contract.getAmountInUSD(address, AMOUNT)) / 1e18;
            // console.log("amountInUSD : " + amountInUSD);
            return amountInUSD;
        } catch (error) {
            reportError(error);
            return error;
        }
    };
    const getUserTotalAvailableBalance = async ()=>{
        try {
            const contract = new external_ethers_.ethers.Contract(addresses.LendingPoolAddress, LendingPoolABI.abi, metamaskDetails.provider);
            const maxAmount = await contract.getUserTotalAvailableBalanceInUSD(metamaskDetails.currentAccount, 1);
            return Number(maxAmount);
        } catch (error) {
            reportError(error);
            return error;
        }
    };
    const getTokensPerUSDAmount = async (token, amount)=>{
        try {
            const contract = new external_ethers_.ethers.Contract(addresses.LendingHelperAddress, LendingHelperABI.abi, metamaskDetails.provider);
            const maxQty = Number(await contract.getTokensPerUSDAmount(token, amount));
            return maxQty;
        } catch (error) {
            reportError(error);
            return error;
        }
    };
    /*************************** Component : Your Supplies ***************************/ const getYourSupplies = async ()=>{
        console.log("3. Getting your Supplies...");
        try {
            const contract = new external_ethers_.ethers.Contract(addresses.LendingPoolAddress, LendingPoolABI.abi, metamaskDetails.provider);
            // const contract = getContract(LendingPoolAddress, LendingPoolABI);
            const assets = await contract.getLenderAssets(metamaskDetails.currentAccount);
            const supplyAssets = await objectifySuppliedAssets(assets);
            console.log(supplyAssets);
            const supplyAsset2 = mergeObjectifiedAssets(supplyAssets);
            // console.log(JSON.stringify(supplyAsset2));
            const totalUSDBalance = supplyAssets.reduce((bal, item)=>{
                return bal + item.balanceInUSD;
            }, 0);
            const weightedAvgAPY = supplyAssets.reduce((bal, item)=>{
                return bal + item.apy;
            }, 0);
            const totalUSDCollateral = supplyAssets.filter((asset)=>asset.token == addresses.ETHAddress).reduce((bal, item)=>{
                return bal + item.balanceInUSD;
            }, 0);
            let summary = {
                totalUSDBalance: totalUSDBalance,
                weightedAvgAPY: weightedAvgAPY / supplyAssets.length,
                totalUSDCollateral: totalUSDCollateral
            };
            console.log("Got your supplies...");
            console.log(JSON.stringify(supplyAsset2));
            setSupplySummary(summary);
            setSupplyAssets(supplyAsset2);
        // // console.log("Got Supply assets.....");
        } catch (error) {
            reportError(error);
            return error;
        }
    };
    /************ Function to get Assets to Borrow ***********/ const getAssetsToBorrow = async ()=>{
        console.log("4. Getting assets to Borrow...");
        try {
            const contract = new external_ethers_.ethers.Contract(addresses.LendingPoolAddress, LendingPoolABI.abi, metamaskDetails.provider);
            // const contract = getContract(LendingPoolAddress, LendingPoolABI);
            const assetsToBorrow = await contract.getAssetsToBorrow(metamaskDetails.currentAccount);
            // console.log("*** calling objectifyBorrowedAssets from getAssetsToBorrow");
            const assetsToBorrowObject = await objectifyBorrowedAssets(assetsToBorrow);
            // console.log(JSON.stringify(assetsToBorrowObject));
            // console.log("*** calling mergeObjectifiedAssets from getAssetsToBorrow");
            const assetsToBorrowObjectMerged = mergeObjectifiedAssets(assetsToBorrowObject);
            console.log("Got assets to borow...");
            console.log(JSON.stringify(assetsToBorrowObjectMerged));
            setAssetsToBorrow(assetsToBorrowObjectMerged);
        } catch (error) {
            reportError(error);
            return error;
        }
    };
    /*************************** Borrow Functionality ***************************/ const borrowAsset = async (token, borrowAmount)=>{
        try {
            const amount = numberToEthers(borrowAmount);
            console.log("***Borrowing token : " + token + "| borrowAmount : " + borrowAmount);
            const contract = await getContract(addresses.LendingPoolAddress, LendingPoolABI);
            const transaction = await contract.connect(metamaskDetails.signer).borrow(token, amount);
            await transaction.wait();
            console.log("Token Borrowed...");
            return {
                status: 200,
                message: "Transaction Successful.."
            };
        } catch (error) {
            reportError(error);
            return {
                status: 500,
                message: error.reason
            };
        }
    };
    /*************************** Your Borrows ***************************/ const getYourBorrows = async ()=>{
        console.log("4. Getting Your Borrows");
        try {
            const contract = await getContract(addresses.LendingPoolAddress, LendingPoolABI);
            const yourBorrows = await contract.connect(metamaskDetails.signer).getBorrowerAssets(metamaskDetails.currentAccount);
            // console.log("*** calling objectifyBorrowedAssets from getYourBorrows");
            const yourBorrowsObject = await objectifyBorrowedAssets(yourBorrows);
            // console.log(yourBorrowsObject);
            // console.log("*** calling mergeObjectifiedAssets from getYourBorrows");
            const yourBorrowsObjectMerged = mergeObjectifiedAssets(yourBorrowsObject);
            console.log(JSON.stringify(yourBorrowsObjectMerged));
            const totalUSDBalanceBorrowed = yourBorrowsObjectMerged.reduce((bal, item)=>{
                return bal + item.borrowedBalInUSD;
            }, 0);
            const weightedAvgAPY = yourBorrowsObjectMerged.reduce((bal, item)=>{
                return bal + item.borrowApy;
            }, 0);
            const totalBorrowPowerUsed = totalUSDBalanceBorrowed;
            let summary = {
                totalUSDBalance: totalUSDBalanceBorrowed,
                weightedAvgAPY: weightedAvgAPY / yourBorrowsObjectMerged.length,
                totalBorrowPowerUsed: totalBorrowPowerUsed
            };
            setBorrowSummary(summary);
            setYourBorrows(yourBorrowsObjectMerged);
            console.log("***Got your borrows");
            console.log(JSON.stringify(yourBorrowsObjectMerged));
        } catch (error) {
            reportError(error);
            return error;
        }
    };
    /*************************** Functions for the borrow ***************************/ const repayAsset = async (tokenAddress, repayAmount)=>{
        try {
            const amount = numberToEthers(repayAmount);
            console.log("****Repaying token : " + tokenAddress + "| repayAmount : " + repayAmount);
            const contract = await getContract(addresses.LendingPoolAddress, LendingPoolABI);
            const transaction = await contract.connect(metamaskDetails.signer).repay(tokenAddress, amount);
            await transaction.wait();
            console.log("Token Repaid....");
            return {
                status: 200,
                message: "Transaction Successful.."
            };
        } catch (error) {
            reportError(error);
            return {
                status: 500,
                message: error.reason
            };
        }
    };
    const updateInterests = async ()=>{
        // console.error("Updating interests.....");
        try {
            // const account = metamaskDetails.currentAccount;
            // console.log("account : " + account);
            // const contract = await getContract(LendingPoolAddress, LendingPoolABI);
            // const updateEarnedInterest = await contract.interestEarned(account);
            // await updateEarnedInterest.wait();
            // console.log(updateEarnedInterest);
            // const updateAccruedInterestOnBorrow =
            //   await contract.updateAccruedInterestOnBorrow(account);
            // await updateAccruedInterestOnBorrow.wait();
            console.log("Updated interests.....");
        } catch (error) {
            reportError(error);
            return error;
        }
    };
    // ------------------
    const reportError = (error)=>{
        console.error(JSON.stringify(error));
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(lendContext/* default.Provider */.Z.Provider, {
        value: {
            metamaskDetails,
            connectWallet,
            getUserAssets,
            supplySummary,
            supplyAssetsToPool,
            ApproveToContinue,
            LendAsset,
            userAssets,
            getYourSupplies,
            supplyAssets,
            getAmountInUSD,
            numberToEthers,
            WithdrawAsset,
            getAssetsToBorrow,
            assetsToBorrow,
            borrowAsset,
            getYourBorrows,
            yourBorrows,
            repayAsset,
            borrowSummary,
            updateInterests
        },
        children: props.children
    });
};
/* harmony default export */ const context_LendState = (LendState);

;// CONCATENATED MODULE: ./pages/_app.tsx


// Applying Inter font
// import { Inter } from "@next/font/google";

// const inter = Inter({ subsets: ["latin"] });
function MyApp({ Component , pageProps  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("main", {
        className: "",
        children: /*#__PURE__*/ jsx_runtime_.jsx(context_LendState, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        })
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 7076:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "token": () => (/* binding */ token)
/* harmony export */ });
/* harmony import */ var _assets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6865);
/* harmony import */ var _addresses__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4024);
/* harmony import */ var _addresses__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_addresses__WEBPACK_IMPORTED_MODULE_1__);

// For localhost

const token = [
    {
        image: _assets__WEBPACK_IMPORTED_MODULE_0__/* .ethIcon */ .sR,
        name: "ETH",
        address: _addresses__WEBPACK_IMPORTED_MODULE_1__.ETHAddress,
        decimal: "18",
        apy: 3,
        isCollateral: true
    },
    {
        image: _assets__WEBPACK_IMPORTED_MODULE_0__/* .daiIcon */ .Oj,
        name: "DAI",
        address: _addresses__WEBPACK_IMPORTED_MODULE_1__.DAITokenAddress,
        decimal: "18",
        apy: 3,
        isCollateral: true
    },
    {
        image: _assets__WEBPACK_IMPORTED_MODULE_0__/* .usdcIcon */ .Ud,
        name: "USDC",
        address: _addresses__WEBPACK_IMPORTED_MODULE_1__.USDCTokenAddress,
        decimal: "18",
        apy: 3,
        isCollateral: true
    },
    {
        image: _assets__WEBPACK_IMPORTED_MODULE_0__/* .linkIcon */ .Nq,
        name: "LINK",
        address: _addresses__WEBPACK_IMPORTED_MODULE_1__.LINKTokenAddress,
        decimal: "18",
        apy: 3,
        isCollateral: true
    },
    {
        image: _assets__WEBPACK_IMPORTED_MODULE_0__/* .btcIcon */ .s4,
        name: "BTC",
        address: _addresses__WEBPACK_IMPORTED_MODULE_1__.BTCTokenAddress,
        decimal: "18",
        apy: 3,
        isCollateral: true
    }
];


/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 1982:
/***/ ((module) => {

"use strict";
module.exports = require("ethers");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9323:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"_format":"hh-sol-artifact-1","contractName":"DAIToken","sourceName":"contracts/DAIToken.sol","abi":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]}');

/***/ }),

/***/ 2395:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"_format":"hh-sol-artifact-1","contractName":"LendingHelper","sourceName":"contracts/LendingHelper.sol","abi":[{"inputs":[{"internalType":"address","name":"_addressToTokenMap","type":"address"},{"internalType":"address","name":"_lendingConfig","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"checkAddress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"getAmountInUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenAddress","type":"address"}],"name":"getCurrentTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"address","name":"_token","type":"address"}],"name":"getTokenBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_usdAmount","type":"uint256"}],"name":"getTokensPerUSDAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"max","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"}],"name":"min","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"startTimeStamp","type":"uint256"},{"internalType":"uint256","name":"totalTokenSupply","type":"uint256"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]}');

/***/ }),

/***/ 9608:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"_format":"hh-sol-artifact-1","contractName":"LendingPool","sourceName":"contracts/LendingPool.sol","abi":[{"inputs":[{"internalType":"address","name":"_addressToTokenMap","type":"address"},{"internalType":"address","name":"_lendingConfig","type":"address"},{"internalType":"address","name":"_lendingHelper","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"address","name":"_token","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Borrow","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"lender","type":"address"},{"indexed":true,"internalType":"address","name":"_token","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Lend","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"address","name":"_token","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Repay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"lender","type":"address"},{"indexed":false,"internalType":"address","name":"_token","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"TransferAsset","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"lender","type":"address"},{"indexed":true,"internalType":"address","name":"_token","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"borrow","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"borrowerAssets","outputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"lentQty","type":"uint256"},{"internalType":"uint256","name":"borrowQty","type":"uint256"},{"internalType":"uint256","name":"lentApy","type":"uint256"},{"internalType":"uint256","name":"borrowApy","type":"uint256"},{"internalType":"uint256","name":"lendStartTimeStamp","type":"uint256"},{"internalType":"uint256","name":"borrowStartTimeStamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"}],"name":"getAssetsToBorrow","outputs":[{"components":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"borrowQty","type":"uint256"},{"internalType":"uint256","name":"borrowApy","type":"uint256"}],"internalType":"struct LendingPool.BorrowAsset[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"},{"internalType":"address","name":"_token","type":"address"}],"name":"getBorrowerAssetQty","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"}],"name":"getBorrowerAssets","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"lentQty","type":"uint256"},{"internalType":"uint256","name":"borrowQty","type":"uint256"},{"internalType":"uint256","name":"lentApy","type":"uint256"},{"internalType":"uint256","name":"borrowApy","type":"uint256"},{"internalType":"uint256","name":"lendStartTimeStamp","type":"uint256"},{"internalType":"uint256","name":"borrowStartTimeStamp","type":"uint256"}],"internalType":"struct LendingPool.UserAsset[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lender","type":"address"},{"internalType":"address","name":"_token","type":"address"}],"name":"getLenderAssetQty","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lender","type":"address"}],"name":"getLenderAssets","outputs":[{"components":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"lentQty","type":"uint256"},{"internalType":"uint256","name":"borrowQty","type":"uint256"},{"internalType":"uint256","name":"lentApy","type":"uint256"},{"internalType":"uint256","name":"borrowApy","type":"uint256"},{"internalType":"uint256","name":"lendStartTimeStamp","type":"uint256"},{"internalType":"uint256","name":"borrowStartTimeStamp","type":"uint256"}],"internalType":"struct LendingPool.UserAsset[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getTotalTokenSupplyInReserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"enum LendingPool.TxMode","name":"_txmode","type":"uint8"}],"name":"getUserTotalAvailableBalanceInUSD","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"},{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"borrowStartTimeStamp","type":"uint256"}],"name":"interestAccrued","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lender","type":"address"},{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"lendStartTimeStamp","type":"uint256"}],"name":"interestEarned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_borrower","type":"address"},{"internalType":"address","name":"_token","type":"address"}],"name":"isTokenBorrowed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"isTokenInReserve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"lend","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"lenderAssets","outputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"lentQty","type":"uint256"},{"internalType":"uint256","name":"borrowQty","type":"uint256"},{"internalType":"uint256","name":"lentApy","type":"uint256"},{"internalType":"uint256","name":"borrowApy","type":"uint256"},{"internalType":"uint256","name":"lendStartTimeStamp","type":"uint256"},{"internalType":"uint256","name":"borrowStartTimeStamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"repay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"reserveAssets","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"reserves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]}');

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [492], () => (__webpack_exec__(3476)));
module.exports = __webpack_exports__;

})();