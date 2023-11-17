import { FC, useEffect, useState } from "react";
import Button from "../components/button";
import Stack from "../components/stack";
import Grid from "../components/grid";
import Banner from "../components/banner";
import PFP from "../assets/pfp/legends.png";
import Card from "../components/card";
import GenesisPFP from "../assets/pfp/genesis.png";
import DegenHoursPFP from "../assets/pfp/degenhours.png";
import FrogtoberPFP from "../assets/pfp/frogtober.png";
import LegendsPFP from "../assets/pfp/legends.png";
import MutantsPFP from "../assets/pfp/mutants.png";
import SerumPFP from "../assets/pfp/serum.png";
import ElementalsPFP from "../assets/pfp/elementals.png";
import Dialog from "../components/dialog";
import Body from "../components/body";
import DialogHeader from "../assets/dialog-header.png";
import AmountInput from "../components/amountInput";
import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { proxyContractAbi } from "../ABIs/proxyContract";
import { erc20Abi } from "../ABIs/erc20";
import { parseEther } from "viem";
import { ethers } from "ethers";
import Loader from "react-js-loader";
async function waitForConfirmation(txHash: any) {
  let provider = new ethers.JsonRpcProvider(
    "https://polygon-mumbai.infura.io/v3/685daa6fa7f94b4b89cdc6d7c5a8639e"
  );

  try {
    let _res = await provider.waitForTransaction(txHash);
    return true;
  } catch (error) {
    return false;
  }
}
export const Home: FC<{}> = () => {
  // ---------------wagmi----------------
  //const [isApproved, setisApproved] = useState(false);
  // const parseEther = ethers.utils.parseEther;
  const serumContractAddress = "";
  const proxyContractAddress = "";
  const [sheeshAmount, setSheeshAmount] = useState(0);
  const { address } = useAccount();
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  //---------------purchase serum--------------------
  // const { configPurchaseWrite } = usePrepareContractWrite({
  //   address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  //   abi: proxyContractAbi,
  //   functionName: 'purchaseSerum',
  // })
  const {
    data: purchaseData,
    isLoading: purchaseLoading,
    isSuccess: purchaseSuccess,
    write: purchaseWrite,
  } = useContractWrite({
    address: "0x8Af5D4C1b8623C62aED8C259895B21bF81036D3A",
    abi: proxyContractAbi,
    functionName: "purchaseSerum",
    onSuccess: async (tx: any) => {
      console.log(tx);
      await waitForConfirmation(tx.hash);

      alert("Sheesh Serum Purchased Successfully");
    },
    onError: () => {
      console.log("Errror in purchase");
    },
  });
  //------------------approval----------------------
  // const { configApproveWrite } = usePrepareContractWrite({
  //   address: '0x64c061c5bca63f017cd6ba3b26101965b6b0c0ac',
  //   abi: erc20Abi,
  //   functionName: 'approve',
  // })
  const {
    data: approvalData,
    isLoading: approvalLoading,
    isSuccess: approvalSuccess,
    write: approvalWrite,
  } = useContractWrite({
    address: "0x64c061c5bca63f017cd6ba3b26101965b6b0c0ac",
    abi: erc20Abi,
    functionName: "approve",
    onSuccess: async (tx: any) => {
      console.log({ tx });
      await waitForConfirmation(tx.hash);
      setIsApproveLoading(false);

      await handleBuy();
    },
    onError: () => {
      console.log("Errror in approval");
    },
  });
  //------------------handle approve------------------
  const handleApproval = async () => {
    try {
      setIsApproveLoading(true);
      setIsRevealed(!isRevealed);
      setTimeout(() => {
        let sheeshAmountInEth = 420000000 * serumAmount;
        // 420000000*2*10^18/
        let sheeshAmountInWei = parseEther(sheeshAmountInEth + "");
        const resApprove = approvalWrite({
          args: [
            //address,
            "0x8Af5D4C1b8623C62aED8C259895B21bF81036D3A",
            // sheeshAmount,
            sheeshAmountInWei,
          ],
        });
      }, 1000);
    } catch (error) {
      alert(error);
    }
  };
  //--------------------handle buy-------------------
  const handleBuy = () => {
    try {
      const resWrite = purchaseWrite({
        args: [1, serumAmount],
      });
    } catch (error) {
      alert(error);
    }
  };
  // useEffect(() => {
  //   if (approvalSuccess) {
  //     handleBuy();
  //   }
  // }, [approvalSuccess]);
  // useEffect(() => {
  //   if (purchaseSuccess) {
  //     const msg = "You successfully bought the serum";
  //     alert(msg);
  //   }
  // }, [approvalSuccess]);

  // -------------------------------------
  const [isRevealed, setIsRevealed] = useState(false);
  const [serumAmount, setSerumAmount] = useState(0);

  const decreaseAmount = () => {
    if (serumAmount > 1) {
      setSerumAmount(serumAmount - 1);
    }
  };

  const increaseAmount = () => {
    setSerumAmount(serumAmount + 1);
  };

  return (
    <>
      {/* <div className={"item"}>
        <Loader
          type="spinner-cub"
          bgColor={"black"}
          color={"white"}
          title={"spinner-cub"}
          size={100}
        />
      </div> */}
      {(isApproveLoading || purchaseLoading) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isApproveLoading ? (
            <p style={{ marginLeft: "10px", color: "#fff" }}>
              Approving Sheesh Token
            </p>
          ) : (
            <p style={{ marginLeft: "10px", color: "#fff" }}>
              Purchasing Serum
            </p>
          )}
        </div>
      )}

      <Stack
        direction="VERTICAL"
        localStyles={{
          marginTop: 86,
          marginBottom: 94,
          "@media (min-width: 1080px)": { marginBottom: 50 },
        }}
      >
        {/* -------------------------------Banner---------------------------------- */}
        <Banner
          pfp={PFP}
          heading="PAYC Legends"
          description="Elvis Presley via the Rockabilly Hall of Fame Museum"
        >
          <Button
            size="M"
            variant="PRIMARY"
            as="a"
            href="https://hub.auraexchange.org/collection/ethereum/0x0f4186a53774f4c73cb90f278d26094cce765720"
            target="_blank"
          >
            View Collection
          </Button>
        </Banner>

        <Grid
          columns={1}
          localStyles={{
            padding: "var(--scale-24)",
            gap: "var(--scale-24)",
            gridTemplateColumns: "1fr",
            "@media (min-width: 600px)": {
              padding: "var(--scale-48)",
              gap: "var(--scale-48)",
            },
            "@media (min-width: 800px)": {
              gridTemplateColumns: "1fr 1fr",
            },
            "@media (min-width: 1200px)": {
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
            },
            "@media (min-width: 2000px)": {
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            },
          }}
        >
          {/* -----------------------NFTS----------------------------- */}
          {/* ---------------------Genesis token---------------------- */}
          <Card
            heading="Genesis"
            description="Collection Size • 7,777"
            pfp={GenesisPFP}
            direction="VERTICAL"
          >
            <Button
              as="a"
              size="M"
              variant="SECONDARY"
              href="https://hub.auraexchange.org/collection/Ethereum/0x2d0d57d004f82e9f4471caa8b9f8b1965a814154"
              target="_blank"
            >
              View Collection
            </Button>
            <Button as="a" size="M" variant="PRIMARY" href="/portals">
              View Portals
            </Button>
          </Card>
          {/* -------------------Degen hours token------------------- */}
          <Card
            heading="Degen Hours"
            description={`Untransferrable & Secure`}
            pfp={DegenHoursPFP}
            direction="VERTICAL"
          >
            <Button
              as="a"
              size="M"
              variant="SECONDARY"
              href="https://hub.auraexchange.org/collection/ethereum/0x577c0379ba192c3293f207b40327f34d18f9e7e3"
              target="_blank"
            >
              View Collection
            </Button>
            <Button
              as="a"
              size="M"
              variant="PRIMARY"
              href="https://degen.pepeapeyachtclub.com"
              target="_blank"
            >
              Select Portal
            </Button>
          </Card>
          {/* -------------------Frogtober token---------------------- */}
          <Card
            heading="Frogtober"
            description="Chance to Pull a Rare"
            pfp={FrogtoberPFP}
            direction="VERTICAL"
          >
            <Button
              as="a"
              size="M"
              variant="SECONDARY"
              href="https://hub.auraexchange.org/collection/ethereum/0xea3a82c8fdd0f7e7fd36a58900ff9aa39995c9ce"
              target="_blank"
            >
              View Collection
            </Button>
            <Button
              as="a"
              size="M"
              variant="PRIMARY"
              href="https://frogtober.pepeapeyachtclub.com"
              target="_blank"
            >
              Select Portal
            </Button>
          </Card>
          {/* ------------------LegendsPFP token---------------------- */}
          <Card
            heading="Legends"
            description="Past &amp; Present Icons"
            pfp={LegendsPFP}
            direction="VERTICAL"
          >
            <Button
              as="a"
              size="M"
              variant="SECONDARY"
              href="https://hub.auraexchange.org/collection/ethereum/0x0f4186a53774f4c73cb90f278d26094cce765720"
              target="_blank"
            >
              View Collection
            </Button>
            <Button
              as="a"
              size="M"
              variant="SECONDARY"
              href="..."
              target="_blank"
              disabled
            >
              Portal Paused
            </Button>
          </Card>
          {/* ------------------Mutants token---------------------- */}
          <Card
            heading="Mutants"
            description="Community-Designed"
            pfp={MutantsPFP}
            direction="VERTICAL"
          >
            <Button
              as="a"
              size="M"
              variant="SECONDARY"
              href="https://hub.auraexchange.org/collection/ethereum/0x0802f7a7c48426e972a30aaab3c2f35c14a35bc8"
              target="_blank"
            >
              View Collection
            </Button>
            <Button
              size="M"
              variant="SECONDARY"
              href="..."
              target="_blank"
              disabled
            >
              Burn 5 Mutants 🔥
            </Button>
          </Card>
          {/* -------------------Serum token---------------------- */}
          {/* <p style={{ color: "white" }}>{JSON.stringify(SerumPFP)}</p> */}
          <Card
            heading="Serum"
            description="Coming soon"
            pfp={SerumPFP}
            direction="VERTICAL"
          >
            {/* <Button size='M' variant="SECONDARY" href='...' target="_blank" disabled>Buy with Sheesh</Button> */}
            <Button
              size="M"
              variant="SECONDARY"
              href="..."
              target="_blank"
              onClick={() => setIsRevealed(!isRevealed)}
            >
              Buy with Sheesh
            </Button>
            <Button
              size="M"
              variant="SECONDARY"
              href="..."
              target="_blank"
              disabled
              onClick={() => setIsRevealed(!isRevealed)}
            >
              Burn 5 Mutants 🔥
            </Button>
          </Card>
          {/* ----------------ElementsPFP token---------------------- */}
          <Card
            heading="Elementals"
            description="Coming soon"
            pfp={ElementalsPFP}
            direction="VERTICAL"
          >
            <Button
              size="M"
              variant="SECONDARY"
              href="..."
              target="_blank"
              disabled
            >
              View Collection
            </Button>
            <Button
              size="M"
              variant="SECONDARY"
              href="..."
              target="_blank"
              disabled
            >
              Apply Serum
            </Button>
          </Card>

          {/* SERUM DIALOG */}
          {isRevealed && (
            // When live replace the message of "Coming Soon" to "Purchase serums with $SHS".
            // When live uncomment the button.
            <Dialog
              backdropClose={() => setIsRevealed(!isRevealed)}
              image={DialogHeader}
            >
              <Body size="L">Coming Soon</Body>
              <AmountInput
                decrease={decreaseAmount}
                increase={increaseAmount}
                amount={serumAmount}
              />
              <Stack
                direction="HORIZONTAL"
                space={"var(--scale-12)"}
                localStyles={{ justifyContent: "center" }}
              >
                <Button
                  size="M"
                  variant="SECONDARY"
                  onClick={() => setIsRevealed(!isRevealed)}
                  localStyles={{ marginTop: "var(--scale-8)" }}
                >
                  Close
                </Button>
                <Button
                  size="M"
                  variant="PRIMARY"
                  onClick={() => handleApproval()}
                  localStyles={{ marginTop: "var(--scale-8)" }}
                >
                  Purchase {serumAmount} Serums{" "}
                </Button>
              </Stack>
            </Dialog>
          )}
        </Grid>
      </Stack>
    </>
  );
};

export default Home;
