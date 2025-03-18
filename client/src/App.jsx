import React, { useState, useEffect } from "react";
import ConnectWallButton from "./components/ConnectWallButton";
import ContractInfo from "./components/ContractInfo";
import ConnectAct from "./components/ConnectAct";
import { requestAccount } from "./utils/contractServ";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchCurAccount = async () => {
      const account = await requestAccount();
      setAccount(account);
    };
    fetchCurAccount();
  }, []);

  useEffect(() => {
    const handleAccountChanged = (newAccounts) =>
      setAccount(newAccounts.length > 0 ? newAccounts[0] : null);
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChanged);
    };
  });

  return (
    <div className="app">
      <ToastContainer />
      {!account ? (
        <ConnectWallButton setAccount={setAccount} />
      ) : (
        <div className="contract-interactions">
          <ContractInfo account={account} />
          <ConnectAct />
        </div>
      )}
    </div>
  );
}

export default App;
