// @ts-nocheck
"use client";

import { useState } from "react";
import { Database } from "@tableland/sdk";
import { ethers } from "ethers";
import { useEffect } from "react";

// Example table schema
interface TableData {
  id: number;
  val: string;
}

type TablelandProps = {
  protocol_name: string,
  encrypted_apikey: string,
  whitelisted_addresses: string,
  contract_address: string
}
// A component with form inputs to to create a table, write data to it, and read data from it
export function Tableland(protocol_name, encrypted_apikey, whitelisted_addresses, contract_address) : TablelandProps {
  // Custom table prefix, used when creating the table and via form input
  const [prefix, setPrefix] = useState<string>("");
  // Tableland-generated table name in the form `prefix_chainId_tableId`
  const [tableName, setTableName] = useState<string | undefined>("gaslessprotocols_80001_8204");
  // Form input for the table's value
  const [writeData, setWriteData] = useState<string>("");
  const [data, setData] = useState<TableData[]>([]);
  // Get the connected signer
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);

  // Function to initialize the signer
  async function initSigner() {
    if (window?.ethereum) {
      // Use Web3Modal or any other method to connect to a wallet
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      console.log(provider,"provider")
      try {
        await provider.send("eth_requestAccounts", []);
        const currentSigner = provider.getSigner();
        setSigner(currentSigner);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    }
  }
  // Initialize the signer when the component mounts
  useEffect(() => {
    initSigner();
  }, []);


  // Create a table with hardcoded prefix and schema
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
console.log(tableName,"tableName")
  // Write data to the table from a form input
  // async function write() {
  //   try {
  //     const db = new Database({ signer });
  //     if (tableName !== undefined) {
  //       const { meta: write } = await db
  //         .prepare(`INSERT INTO ${tableName} (val) VALUES (?);`)
  //         .bind(writeData)
  //         .run();
  //       await write.txn?.wait();
  //       console.log(`Successfully wrote data to table '${tableName}'`);
  //     }
  //   } catch (err: any) {
  //     console.error(err.message);
  //   }
  // }


  async function write() {
    try {
      const db = new Database({ signer });
      if (tableName !== undefined) {
        const { meta: write } = await db
          .prepare(`INSERT INTO ${tableName} (protocol_name, encrypted_apikey, whitelisted_addresses, contract_address) VALUES (?, ?, ?, ?);`)
          .bind(protocol_name, encrypted_apikey, whitelisted_addresses, contract_address)
          .run();
        await write.txn?.wait();
        console.log(`Successfully wrote data to table '${tableName}'`);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  }
  

  async function read() {
    try {
      const db = new Database({ signer });
      if (tableName !== undefined) {
        const { results } = await db
          .prepare(`SELECT protocol_name, encrypted_apikey, whitelisted_addresses, contract_address FROM ${tableName}`)
          .all();
        console.log(`Read data from table '${tableName}':`);
        console.log(results);
        // You can set the retrieved data in the state or use it as needed.
      }
    } catch (err: any) {
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

  // Handle form input changes for table prefix & writing data
  function handleChange(e: any) {
    switch (e.target.name) {
      case "create":
        setPrefix(e.target.value);
        break;
      case "write":
        setWriteData(e.target.value);
        break;
      default:
        break;
    }
  }

  // Basic form and tabular view that renders table data
  return (
    <>
      <div className="w-full max-w-xs mx-6">
        <h2 className="text-xl font-bold mb-2">Store in TableLand </h2>
        <form className="shadow-md rounded px-2 pt-2 pb-2 mb-2 mr-2">
          {/* <div className="mb-4">
            <label className="block text-md font-bold mb-2">
              Create your table
            </label>
            <input
              onChange={handleChange}
              name="create"
              placeholder="starter_table"
              disabled={signer ? false : true}
              className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
            ></input>
            <button
              onClick={handleClick}
              name="create"
              disabled={signer ? false : true}
              className={
                "shadow bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-non font-bold py-2 px-4 ml-2 rounded w-20"
              }
            >
              Create
            </button>
          </div>{" "} */}
          <div className="mb-4">
            <label className="block text-md font-bold mb-2">Write data</label>
            <button
              onClick={handleClick}
              name="write"
              className={
                "shadow bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none font-bold py-2 px-4 ml-2 rounded w-20" +
                (signer && tableName ? "" : " opacity-50 cursor-not-allowed")
              }
            >
              Write
            </button>
          </div>
          <div className="flex justify-center mt-8 mb-2">
            <button
              type="button"
              onClick={handleClick}
              name="read"
              className={
                "shadow bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded w-20" +
                (signer && tableName ? "" : " opacity-50 cursor-not-allowed")
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