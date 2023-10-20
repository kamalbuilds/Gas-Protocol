import {
    ClaimType,
    AuthType,
    SignatureRequest,
    AuthRequest,
    ClaimRequest,
    SismoConnectConfig,
  } from "@sismo-core/sismo-connect-client";
  
  export { ClaimType, AuthType };
  export const CONFIG: SismoConnectConfig = {
    appId: "0xa536e3d9b19c6b6e662af29907ce279f",
    vault: {
      // For development purposes insert the Data Sources that you want to impersonate
      impersonate: [
        // EVM Data Sources
        "dhadrien.sismo.eth",
        "0xA4C94A6091545e40fc9c3E0982AEc8942E282F38",
        "0x1b9424ed517f7700e7368e34a9743295a225d889",
        "0x82fbed074f62386ed43bb816f748e8817bf46ff7",
        "0xc281bd4db5bf94f02a8525dca954db3895685700",
        // Github Data Source
        "github:kamalbuilds",
        // Twitter Data Source
        "twitter:0xkamal7",
        // Telegram Data Source
        "telegram:kamalthedev",
      ],
    },
  };
  
  // Request users to prove ownership of a Data Source (Wallet, Twitter, Github, Telegram, etc.)
  export const AUTHS: AuthRequest[] = [
    { authType: AuthType.VAULT },
    { authType: AuthType.EVM_ACCOUNT },
    { authType: AuthType.GITHUB, isOptional: true },
  ];
  
  // Request users to prove membership in a Data Group (e.g I own a wallet that is part of a DAO, owns an NFT, etc.)
  export const CLAIMS: ClaimRequest[] = [
    {
      groupId: "0xda1c3726426d5639f4c6352c2c976b87", // impersonated github:dhadrien has 1 contribution, eligible
    },
    {
      // claim ENS DAO Voters Data Group membership: https://factory.sismo.io/groups-explorer?search=0x85c7ee90829de70d0d51f52336ea4722
      // Data Group members          = voters in ENS DAO
      // value for each group member = number of votes in ENS DAO
      // request user to prove membership in the group with value >= 17
      groupId: "0x85c7ee90829de70d0d51f52336ea4722",
      claimType: ClaimType.GTE,
      value: 4, // impersonated dhadrien.sismo.eth has 17 votes, eligible
      isSelectableByUser: true,
    },
    {
      groupId: "0xfae674b6cba3ff2f8ce2114defb200b1",
      claimType: ClaimType.EQ,
      value: 10, // dhadrin.sismo.eth minted exactly 10, eligible
      isOptional: true,
    },
  ];
  
  export const SIGNATURE_REQUEST: SignatureRequest = {
    message: "I love Gas Protocol!",
    isSelectableByUser: false,
  };
  