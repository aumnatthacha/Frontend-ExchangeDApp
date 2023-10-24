"use client";
/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { ethers } from "ethers";
import { formatEther } from "@ethersproject/units";
import abi from "./abi.json";
import { styled } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const [metaMask, hooks] = initializeConnector(
  (actions) => new MetaMask({ actions })
);
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } =
  hooks;
const contractChain = 11155111;
const contractAddress = "0x79a56a164be8Da57691a460a5514D3D58bF67b6b";

export default function Page() {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActive = useIsActive();

  const provider = useProvider();
  const [error, setError] = useState(undefined);

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to MetaMask");
    });
  }, []);

  const handleConnect = () => {
    metaMask.activate(contractChain);
  };

  const handleDisconnect = () => {
    metaMask.resetState();
  };

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    "@media all": {
      minHeight: 128,
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          {" "}
          {/* Use StyledToolbar as a component */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, alignSelf: "flex-end" }}
          >
            MUI
          </Typography>
          {isActive ? (
            <Stack direction="row" spacing={1}>
              <Chip label= {accounts ? accounts[0] : ""} color="success" />
              <Button
                type="button"
                onClick={handleDisconnect}
                variant="contained"
                color="secondary"
              >
                Disconnect
              </Button>
            </Stack>
          ) : (
            <Button
              type="button"
              onClick={handleConnect}
              variant="contained"
              color="primary"
            >
              Connect
            </Button>
          )}
          <IconButton size="large" aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </StyledToolbar>
      </AppBar>
      <div>
        <p>chainId: {chainId}</p>
        <p>isActive: {isActive.toString()}</p>
        <p>accounts: {accounts ? accounts[0] : ""}</p>
      </div>
    </Box>
  );
}
