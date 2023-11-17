import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Web3Provider } from "@ethersproject/providers";
import { Container } from "./styles";
import { ScrollToTopOnRouteChange } from "./utility/scroll";
import Home from "./compositions/home";
import Portals from "./compositions/portals";
import Contact from "./compositions/contact";
import Navigation from "./components/navigation";
import Button from "./components/button";
import External from "./components/icons/external";
import styled from "@emotion/styled";
import Body from "./components/body";
import Twitter from "./components/icons/twitter";
import Youtube from "./components/icons/youtube";
import Discord from "./components/icons/discord";
import Footer from "./components/footer";
import Anchor from "./components/anchor";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
// ------------------------------------------------
declare global {
  interface Window {
    ethereum: any;
  }
}

const StyledLink = styled(Link)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  border: "1px solid transparent",
  borderRadius: 4,
  margin: 0,
  textDecoration: "none",
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
  fontFamily: "Inter, sans-serif",
  lineHeight: 1,
  cursor: "pointer",
  padding: "12px 16px",
  gap: 14,
}));

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    //connectWallet();
  }, []);

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        setWalletConnected(true);
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  }

  return (
    <>
      <Router>
        <Container>
          <Navigation
            localStyles={{ position: "fixed", top: 0 }}
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <StyledLink onClick={() => setIsMobileMenuOpen(false)} to="/">
              <Body
                theme="LIGHT"
                size="M"
                weight="BOLD"
                localStyles={{ lineHeight: 1 }}
              >
                Home
              </Body>
            </StyledLink>
            <StyledLink
              onClick={() => setIsMobileMenuOpen(false)}
              to="/portals"
            >
              <Body
                theme="LIGHT"
                size="M"
                weight="BOLD"
                localStyles={{ lineHeight: 1 }}
              >
                Portals
              </Body>
            </StyledLink>
            <StyledLink
              onClick={() => setIsMobileMenuOpen(false)}
              to="/contact"
            >
              <Body
                theme="LIGHT"
                size="M"
                weight="BOLD"
                localStyles={{ lineHeight: 1 }}
              >
                Contact
              </Body>
            </StyledLink>
            <Button
              onClick={() => setIsMobileMenuOpen(false)}
              as="a"
              variant="TERTIARY"
              size="M"
              after={<External />}
              href="https://hub.auraexchange.org/collection/ethereum/0x2d0d57d004f82e9f4471caa8b9f8b1965a814154"
              target="_blank"
            >
              Marketplace
            </Button>
            <Button
              onClick={() => setIsMobileMenuOpen(false)}
              as="a"
              variant="TERTIARY"
              size="M"
              after={<External />}
              href="https://payc.engagertool.app/"
              target="_blank"
            >
              EngageR
            </Button>
            {/* {address && (
              <div style={{ marginLeft: "auto" }}>
                <Button
                  onClick={() => {
                    //disconnectWallet();
                    // Handle logout logic here
                    // You might want to clear user session, etc.
                  }}
                  variant="TERTIARY"
                  size="M"
                >
                  Logout
                </Button>
              </div>
            )} */}
          </Navigation>

          <ScrollToTopOnRouteChange />

          {address ? (
            <Routes>
              <Route path="/portals" element={<Portals />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/" element={<Home />} />
            </Routes>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Set the height of the container to 100% of the viewport height
              }}
            >
              <ConnectButton />
              <h3 style={{ color: "white" }}>
                PAYC Platform
              </h3>
            </div>
          )}

          <Footer
            contactLink="/contact"
            localStyles={{ position: "fixed", bottom: 0, left: 0 }}
            socials={
              <>
                <Anchor
                  iconOnly
                  href="https://discord.com/invite/SXayyRHar2"
                  target="_blank"
                >
                  <Discord theme="LIGHT" size="S" />
                </Anchor>
                <Anchor
                  iconOnly
                  href="https://twitter.com/PepeApeYC"
                  target="_blank"
                >
                  <Twitter theme="LIGHT" size="S" />
                </Anchor>
                <Anchor
                  iconOnly
                  href="https://www.youtube.com/@pepeapeyachtclub2584"
                  target="_blank"
                >
                  <Youtube theme="LIGHT" size="S" />
                </Anchor>
              </>
            }
          />
        </Container>
      </Router>
    </>
  );
}

export default App;
