import React from "react";
import Header from "../components/header/Header";
import DashboardHeader from "../components/dashboard/header/DashboardHeader";
import { create, NxtpSdkConfig } from "@connext/nxtp-sdk";
import { ethers } from "ethers";

const privateKey =
  "01e05a44a91a8a23d78e3ba8c0e2d88a809745ebbfcbde4018db488e039af0fe";
let signer = new ethers.Wallet(privateKey);

const provider = new ethers.providers.JsonRpcProvider(
  "https://goerli.infura.io/v3/"
);
signer = signer.connect(provider);
const signerAddress = await signer.getAddress();

const nxtpConfig = {
  logLevel: "info",
  signerAddress: signerAddress,
  chains: {
    1735353714: {
      providers: ["https://goerli.infura.io/v3/"],
      assets: [
        {
          name: "TEST",
          symbol: "TEST",
          address: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
        },
      ],
    },
    9991: {
      providers: ["https://rpc-mumbai.maticvigil.com/"],
      assets: [
        {
          name: "TEST",
          symbol: "TEST",
          address: "0xeDb95D8037f769B72AAab41deeC92903A98C9E16",
        },
      ],
    },
  },
};

const { nxtpSdkBase } = await create(nxtpConfig);

const asset = "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1";

const amount = "1000000000000000000";

const xcallParams = {
  origin: "1735353714", 
  destination: "9991",
  to: signerAddress,
  asset: asset,
  delegate: signerAddress,
  amount: amount,
  slippage: "30",
  callData: "0x",
  relayerFee: "0",
};

const approveTxReq = await nxtpSdkBase.approveIfNeeded(
  xcallParams.origin,
  xcallParams.asset,
  xcallParams.amount
);
const approveTxReceipt = await signer.sendTransaction(approveTxReq);
await approveTxReceipt.wait();

const xcallTxReq = await nxtpSdkBase.xcall(xcallParams);
xcallTxReq.gasLimit = ethers.BigNumber.from("20000000");
const xcallTxReceipt = await signer.sendTransaction(xcallTxReq);
console.log(xcallTxReceipt);
const xcallResult = await xcallTxReceipt.wait();

function Bridge() {
  return (
    <div className="">
      <Header />
      <DashboardHeader />
      <div className="admin-wrapper  bg-slate-200">
        <div className="container w-full">
          <div className="row w-full g-12 space-y-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Bridge;
