import { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";
import Button from "./button";
import Box from "./box";
import ChevronDown from "./icons/chevron";
import Body from "./body";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "ethers";

export type Props = {
  balance?: number;
  profile?: string;
  address?: string;
};

const Eth = styled.div({
  gap: 4,
  background: "transparent",
  border: "1px solid var(--button-border)",
  height: 35,
  display: "none",
  alignItems: "center",
  padding: "8px 12px",
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
  "@media (min-width: 600px)": {
    display: "flex",
  },
});

const Address = styled.div({
  width: "8ch",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const LocalButton = styled(Button)({
  "@media (min-width: 600px)": {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: -1,
  },
});

const Wallet: FC<Props> = ({ profile }) => {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [userAddress, setUserAddress] = useState<string>("Not Connected");
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const connectWallet = async () => {
    if (provider) {
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        const account = accounts[0];
        setUserAddress(account);
        const balance = await provider.getBalance(account);
        setBalance(formatEther(balance as any));
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const handleClick = () => {
    connectWallet();
  };

  return (
    <Box localStyles={{ display: "flex", alignItems: "center" }}>
      <Eth>
        <Body>{balance} ETH</Body>
      </Eth>
      <LocalButton
        variant="SECONDARY"
        size="S"
        before={
          profile && <img width={17} height={17} src={profile} alt="Profile" />
        }
        after={<ChevronDown />}
        onClick={handleClick}
      >
        <Address>{userAddress}</Address>
      </LocalButton>
    </Box>
  );
};

export default Wallet;
