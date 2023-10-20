// @ts-nocheck
"use client";

import { useState } from "react";
import { Database } from "@tableland/sdk";
import { ethers } from "ethers";
import { useEffect } from "react";

type TablelandProps = {
  protocol_name: string;
  encrypted_apikey: string;
  whitelisted_addresses: string;
  contract_address: string;
};

// A component with form inputs to create a table, write data to it, and read data from it
export function Tableland({
  protocol_name,
  encrypted_apikey,
  whitelisted_addresses,
  contract_address,
}: TablelandProps) {
  // Custom table prefix, used when creating the table and via form input
  const [prefix, setPrefix] = useState<string>("");
  // Tableland-generated table name in the form `prefix_chainId_tableId`
  const [tableName, setTableName] = useState<string | undefined>(
    "gaslessprotocols_80001_8204"
  );

  // Get the connected signer
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);

  // Function to initialize the signer
  async function initSigner() {
    if (window?.ethereum) {
      // Use Web3Modal or any other method to connect to a wallet
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      console.log(provider, "provider");
      try {
        await provider.send("eth_requestAccounts", []);
        const currentSigner = provider.getSigner();
        setSigner(currentSigner);
      } catch (error) {
        console.error("Error connecting to the wallet:", error);
      }
    }
  }

  // Initialize the signer when the component mounts
  useEffect(() => {
    initSigner();
  }, []);

  async function create() {
    try {
      const db = new Database({ signer });
      // Example table schema with an `id` and `val` column
      const schema = `id integer primary key, val text`;
      const { meta: create } = await db
        .prepare(`CREATE TABLE "${prefix}" (${schema});`)
        .run();
      await create.txn?.wait();
      const { name: tableName } = create.txn!;
      setTableName(tableName);
      console.log(`Created table: ${tableName}`);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  async function write() {
    try {
      const db = new Database({ signer });
      if (tableName !== undefined) {
        const { meta: write } = await db
          .prepare(
            `INSERT INTO ${tableName} (protocol_name, encrypted_apikey, whitelisted_addresses, contract_address) VALUES (?, ?, ?, ?);`
          )
          .bind(protocol_name, encrypted_apikey, whitelisted_addresses, contract_address)
          .run();
        await write.txn?.wait();
        console.log(`Successfully wrote data to table '${tableName}'`);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  }

  // async function read() {
  //   try {
  //     const db = new Database({ signer });
  //     if (tableName !== undefined) {
  //       const { results } = await db
  //         .prepare(
  //           `SELECT protocol_name, encrypted_apikey, whitelisted_addresses, contract_address FROM ${tableName}`
  //         )
  //         .all();
  //       console.log(`Read data from table '${tableName}':`);
  //       console.log(results);
  //       // You can set the retrieved data in the state or use it as needed.
  //     }
  //   } catch (err: any) {
  //     console.error(err.message);
  //   }
  // }

  async function read() {
    try {
      const db = new Database({ signer });
      if (tableName !== undefined) {
        const { results } = await db
          .prepare(
            `SELECT protocol_name, encrypted_apikey, whitelisted_addresses, contract_address FROM ${tableName} WHERE contract_address = ?;`
          )
          .bind("0xD8134205b0328F5676aaeFb3B2a0DC15f4029d8C")
          .all();
  
        if (results.length > 0) {
          const encryptedApiKey = results[0].encrypted_apikey;
          console.log(`Encrypted API Key for address 0x1234: ${encryptedApiKey}`);
        } else {
          console.log("No data found for address 0x1234");
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }
  

  // Handle button click actions
  async function handleClick(e: any) {
    e.preventDefault();
    switch (e.target.name) {
      case "create":
        await create();
        break;
      case "write":
        await write();
        break;
      case "read":
        await read();
        break;
      default:
        break;
    }
  }

  // Basic form and tabular view that renders table data
  return (
    <>
      <div className="w-full max-w-xs mx-6">
        <h2 className="text-xl font-bold mb-2">Store in TableLand</h2>
        <form className="shadow-md rounded px-2 pt-2 pb-2 mb-2 mr-2 flex flex-row justify-between">
          <div className=" flex flex-col justify-center mt-8 mb-2">
            <label className="block text-md font-bold mb-2">Write data</label>
            <button
              onClick={handleClick}
              name="write"
              className={
                "border-2 border-transparent rounded-lg py-2 px-4 bg-[#1d4ed8] shadow hover:bg-blue-800 focus:shadow-outline focus:outline-none font-bold"
              }
            >
              Write
            </button>
          </div>
          <div className="flex flex-col justify-center mt-8 mb-2">
            <label className="block text-md font-bold mb-2">Read data</label>
            <button
              type="button"
              onClick={handleClick}
              name="read"
              className={
                "border-2 border-transparent rounded-lg py-2 px-4 bg-[#1d4ed8] shadow hover:bg-blue-800 focus:shadow-outline focus:outline-none font-bold"
              }
            >
              Read
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
