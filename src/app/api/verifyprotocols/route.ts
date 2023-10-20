// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { SismoConnect, SismoConnectVerifiedResult } from "@sismo-core/sismo-connect-server";
import { NextResponse } from "next/server";
import  CLAIMS from "../../../components/createSismoConnectConfig";
import { CONFIG} from "../../../sismo-connect-config";
import SIGNATURE_REQUEST from "../../../components/createSismoConnectConfig";
import AUTHS  from "../../../components/createSismoConnectConfig";

const sismoConnect = SismoConnect({ config: CONFIG });

// this is the API route that is called by the SismoConnectButton
export async function POST(req: Request , claims : any , auths : any) {
  const sismoConnectResponse = await req.json();
  try {
    const result: SismoConnectVerifiedResult = await sismoConnect.verify(sismoConnectResponse, {
      auths,
      claims,
    });
    console.log(result,"verified result");
    return NextResponse.json(result, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(e.message, { status: 500 });
  }
}
