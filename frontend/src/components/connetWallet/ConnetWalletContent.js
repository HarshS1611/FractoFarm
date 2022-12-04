import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
//import { uauth } from '../../auth/Connectors.ts';
import UAuth from "@uauth/js";
import { WorldIDWidget,WidgetProps } from "@worldcoin/id";
//import ENSAddress from '@ensdomains/react-ens-address'


const uauth = new UAuth({
  clientID: "f1607235-63e9-4309-a5d3-7c0adda481ed",
  redirect_uri: "https://fracto-farm.netlify.app/",
  post_logout_redirect_uri: "https://fracto-farm.netlify.app/",
  scope: "openid wallet",
});

const ConnectWalletContent = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [domain, setDomain] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedin, setLoggedin] = useState(false);
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setIsConnected(true);
      localStorage.setItem("wallet_address", accounts[0]);
      console.log(isConnected);
      console.log(accountAddress);
      // CreateItem();
    } catch (error) {
      console.log(error);
    }
  };

  const WidgetProps = {
    actionId: "wid_staging_897fc908a76422db0fc65f9578cda7d6",
    signal: "user-id",
    enableTelemetry: true,
    signalDescription: "Receive initial airdrop April 2022",
    theme: "light",
    debug: true, // DO NOT SET TO `true` IN PRODUCTION
    onSuccess: (result) => console.log(result),
    onError: ({ code, detail }) => console.log({ code, detail }),
    onInitSuccess: () => console.log("Init successful"),
    onInitError: (error) => console.log("Error while initialization World ID", error),
  };

  useEffect(() => {
    if (isConnected || isLoggedin) {
      setAccountAddress(JSON.parse(localStorage.getItem("wallet_address")));
      setDomain(JSON.parse(localStorage.getItem("domain")));
    }

    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };

    checkMetamaskAvailability();
  }, []);

  return (
    <div className="connect-wallet-wrapper">
      <div className="container">
        <div className="text-center">
          <h2 className="mb-70">
            {" "}
            Connect with one of our available wallet providers.
          </h2>
          {domain ? (
            <>
              <h3> Your Wallet Domain : {domain}</h3>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="row g-4 g-xl-5 justify-content-center">
          <div className="col-12 col-md-9 col-lg-6 col-xl-5">
            <div className="card wallet-card shadow-sm">
              <div className="card-body px-4">
                <div className="d-flex align-items-center">
                  <div className="img-wrap">
                    <img
                      src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                      alt="Metamask"
                    />
                  </div>
                  <h4 className="mb-0 me-3">
                    {" "}
                    Metamask
                    <span className="badge bg-danger rounded-pill align-top fz-12 ms-1">
                      Hot
                    </span>
                  </h4>
                  <button
                    className={`btn btn-sm btn-warning rounded-pill ms-auto`}
                    onClick={connectWallet}
                  >
                    {isConnected
                      ? `0x...${accountAddress.slice(35, 42)}`
                      : "Connect"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-12 col-md-9 col-lg-6 col-xl-5" >
                        <div className="card wallet-card shadow-sm">
                            <div className="card-body px-4">
                                <div className="d-flex align-items-center">
                                    <div className="img-wrap">
                                        <img src="https://yt3.ggpht.com/WyxkwAFqNLrju2nv5w26Qtjwig3FWJwclmtlPmApxnjaWK-m6bd0pZPGmFIG2eHkwyqH46bQZw=s900-c-k-c0x00ffffff-no-rj"
                                            alt="Unstopabble Domains" />
                                    </div>
                                    <h4 className="mb-0 me-3">Login With Unstopable Domains
                                    </h4>
                                    {isLoggedin ? (<>
                                        <button className={`btn btn-sm btn-warning rounded-pill ms-auto`} onClick={handleLogout} >
                                            Logout
                                        </button>
                                    </>) : (<>
                                        <button className={`btn btn-sm btn-warning rounded-pill ms-auto`} onClick={handleLogin} >
                                            Login
                                        </button>
                                    </>)}

                                </div>
                            </div>
                        </div>
                    </div > */}
          <div className="col-12 col-md-9 col-lg-6 col-xl-5">
            <div className="card wallet-card shadow-sm">
              <div className="card-body px-4">
                <div className="d-flex align-items-center">
                  
                  <WorldIDWidget {...WidgetProps}   />
                </div>
              </div>
            </div>
          </div>
          {/* <ENSAddress provider={window.web3 || window.ethereum} /> */}
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletContent;
