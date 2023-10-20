import {
    ClaimType,
    AuthType,
    SignatureRequest,
    AuthRequest,
    ClaimRequest,
    SismoConnectConfig,
  } from "@sismo-core/sismo-connect-client";
  

  export { ClaimType, AuthType };
  
  export function createSismoConnectConfig(authRequests = [], claimRequests = [], signatureRequest = null) {
    
    const CONFIG = {
    appId: "0xa536e3d9b19c6b6e662af29907ce279f",
      vault: {
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
  
    const AUTHS = authRequests;
    const CLAIMS = claimRequests;
    const SIGNATURE_REQUEST = signatureRequest;
  
    return {
      CONFIG,
      AUTHS,
      CLAIMS,
      SIGNATURE_REQUEST,
    };
  }
  
  export default createSismoConnectConfig;
  