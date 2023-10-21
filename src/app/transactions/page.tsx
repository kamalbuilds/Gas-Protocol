"use client"
import FunctionForm from '@/components/ContractExtractor/FunctionForm';
import { AccountAbstractionContext } from '@/contexts/AccountAbstractionContext';
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, Select } from '@chakra-ui/react';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { GelatoRelayPack } from '@safe-global/relay-kit';
import React, { useContext, useState } from 'react';
import { Oval } from 'react-loader-spinner'
import { ethers, providers, utils } from "ethers";
import { MetaTransactionData, MetaTransactionOptions, OperationType } from '@safe-global/safe-core-sdk-types';
import AccountAbstraction, { AccountAbstractionConfig } from '@safe-global/account-abstraction-kit-poc';


const Page = () => {

    const [contractAddress, setContractAddress] = useState();
    const [contractABI, setContractABI] = useState({});

    const [functions, setFunctions] = useState<any>({});

    const [functionSelected, setFunctionSelected] = useState(null);

    const [functionInput, setFunctionInput] = useState(null);

    const [inputValues, setInputValues] = useState({});

    const handleSelect = (e) => {
        setFunctionSelected(e.target.value);
        setFunctionInput(functions[e.target.value]?.inputs);
    }

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: any) => {
        e.preventDefault();
        console.log("Change", e.target.value);
        setInputValues({});
        setContractAddress(e.target.value);
    }

    const handleContractAddress = async () => {
        setFunctionSelected(null);
        setFunctions({});
        setFunctionInput(null);
        setIsLoading(true);
        console.log("Contract Address", contractAddress);

        const ETHERSCAN_API = process.env.ETHERSCAN_API_KEY;

        console.log("API key", ETHERSCAN_API);
        if (contractAddress) {
            try {
                const url = `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${ETHERSCAN_API}`
                const res = await fetch(url);
                const response = await res.json();

                const abiresponse = JSON.parse(response.result);
                setContractABI(abiresponse);

                getFunctionsFromABI(abiresponse);
                setIsLoading(false);
            } catch (error) {
                console.log("Error", error);
                setIsLoading(false);
            }
        }
    }

    const getFunctionsFromABI = (abiresponse: any) => {
        if ((Object.keys(abiresponse).length !== 0)) {
            console.log("Contract ABI", abiresponse);
            const functionList = abiresponse.filter((element: any) => element.type === 'function' && element.stateMutability !== 'view');

            functionList?.map((item: any) => {
                console.log("Item", item, typeof (item));

                setFunctions((functions: any) => ({
                    ...functions,
                    [item.name]: { ...item }
                }));

            })

        }
    }

    // Update the handleFunctionInput function to store input values
    const handleFunctionInput = (e: any, name: any) => {
        const updatedInputValues = { ...inputValues };
        //@ts-ignore
        updatedInputValues[name] = e.target.value;
        setInputValues(updatedInputValues);
        console.log("Input Values", inputValues, updatedInputValues)
    }

    const {
        web3Provider,
        ownerAddress,
        safes
    } = useContext(AccountAbstractionContext)


    const handleTransaction = async () => {

        //TODO: Fixed the inputValues data type with the safeTransactionData.

        console.log("Input values", inputValues);

        if (web3Provider && contractABI && contractAddress && functionSelected) {
            try {

                const owner = ownerAddress;
                const safeAddress = safes[0];
                console.log("Owner and Safe Address ", owner, safeAddress, safes);

                const apiKey = 'DyZp_HnJ5pV5s3iCNCxiycSL1M8cM_Av7WzdYIUiobM_';

                const relayPack = new GelatoRelayPack(apiKey);

                console.log("API key and relay ", apiKey, relayPack);

                const signer = web3Provider.getSigner();
                console.log("Signer ", signer);
                let provider;

                // if (web3AuthModalPack) {
                //     provider = web3AuthModalPack.getProvider() as ethers.providers.ExternalProvider
                // }

                // console.log("Signer and Provider ", signer, provider);


                const ethAdapter = new EthersAdapter({
                    ethers,
                    signerOrProvider: signer || provider
                })

                console.log("Eth Adapter", ethAdapter);


                const safeSDK = await Safe.create({
                    ethAdapter,
                    safeAddress
                });

                console.log("safeSDK", safeSDK);


                // const apeCoin = '0x328507DC29C95c170B56a1b3A758eB7a9E73455c';

                const contract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer,//or provider check once
                )

                console.log("Contract Instance", contract);

                console.log("FUnction Details", functionSelected, functionInput, inputValues);

                const param = Object.values(inputValues);
                console.log("OAram", param)

                const safeTransactionData: MetaTransactionData = {
                    to: contract.address,
                    data: contract.interface.encodeFunctionData(functionSelected, param),
                    value: "0",
                    // operation: OperationType.Call,
                };

                console.log("safeTransactionData", safeTransactionData);

                const safeAccountAbstraction = new AccountAbstraction(signer);
                const sdkConfig: AccountAbstractionConfig = {
                    relayPack,
                };
                await safeAccountAbstraction.init(sdkConfig);
                const gasLimit = "1000000";
                const txConfig = {
                    TO: contractAddress,
                    DATA: safeTransactionData,
                    VALUE: "0",
                    // Options:
                    GAS_LIMIT: gasLimit,
                    GAS_TOKEN: ethers.constants.AddressZero,
                };

                console.log("Tx Config: ", txConfig);

                const predictedSafeAddress = await safeAccountAbstraction.getSafeAddress();
                console.log("PredictedSafeAddress:  ", { predictedSafeAddress });

                const isSafeDeployed = await safeAccountAbstraction.isSafeDeployed();
                console.log("is Safe Deployed: ", { isSafeDeployed });

                const safeBalance = await web3Provider.getBalance(predictedSafeAddress);

                console.log("Safe Balance", safeBalance.toString());

                const chainId = 5;

                const relayFee = await relayPack.getEstimateFee(
                    chainId,
                    txConfig.GAS_LIMIT,
                    txConfig.GAS_TOKEN
                );

                console.log("Relay Fee", relayFee.toString());

                const safeTransactions: MetaTransactionData[] = [
                    {
                        to: contract.address,
                        data: contract.interface.encodeFunctionData(functionSelected, param),
                        value: "0",
                        operation: OperationType.Call,
                    },
                ];

                console.log("Safe transaction data >>>>> ", safeTransactions);

                const options: MetaTransactionOptions = {
                    gasLimit: gasLimit,
                    gasToken: ethers.constants.AddressZero,
                    // isSponsored: false
                };

                const response = await safeAccountAbstraction.relayTransaction(
                    safeTransactions,
                    options
                );
                console.log("Response", response);
                console.log(`https://relay.gelato.digital/tasks/status/${response} `);



            } catch (error) {
                console.log("Error", error);
            }
        }
    }

    return (
        <div className='w-[90vw] m-[auto] '>

            <div className='flex flex-row gap-8 shadow-lg border-2 border-zinc-800 p-8 rounded-lg'>
                <FormControl className='w-[50%] flex flex-col'>

                    <FormLabel>Enter Contract Address</FormLabel>
                    <InputGroup>
                        <Input placeholder='Enter Contract Address' onChange={handleInputChange} />
                        <InputRightElement>
                            <Oval
                                height={25}
                                width={25}
                                color="#4fa94d"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={isLoading ? true : false}
                                ariaLabel='oval-loading'
                                secondaryColor="#4fa94d"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        </InputRightElement>
                    </InputGroup>

                    <button className='border-2 p-2 my-4 w-fit rounded-lg border-transparent py-2 px-4 bg-[#1d4ed8]'
                        onClick={handleContractAddress}> Get Functions </button>

                    {Object.keys(functions).length !== 0 && (
                        <FunctionForm
                            functions={functions}
                            contractAddress={contractAddress}
                            handleInputChange={handleInputChange}
                            handleSelect={handleSelect}
                            functionInput={functionInput}
                            handleFunctionInput={handleFunctionInput}
                        />
                    )}

                </FormControl>

                <div className='w-[4px] h-[auto] bg-zinc-800 mx-4'></div>

                <div className=' w-[50%]'>
                    {contractAddress ? (
                        <div className='flex flex-col '>
                            <div className='text-center text-[28px]'>Your transaction Batch</div>
                            <div className='text-[#7e7a7a]'>
                                <p className='text-[18px]'>&#123;</p>
                                <div className='ml-16'>
                                    <div className='flex flex-row gap-2'>
                                        <p>to: </p>
                                        <p>{contractAddress}</p>
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        <p>function: </p>
                                        <p>{functionSelected}</p>
                                    </div>

                                    {functionInput && (
                                        functionInput?.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    {item?.name}: {inputValues[item?.name]}
                                                </div>
                                            )
                                        })
                                    )}
                                </div>
                                <div>
                                    <p className='text-[18px]'>&#125;</p>
                                </div>
                            </div>

                            <div>
                                <button className='border-2 p-2 my-4 w-fit rounded-lg border-transparent py-2 px-4 bg-[#1d4ed8]' onClick={handleTransaction}>Create Transaction</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className='text-center text-[28px]'> Get Your transaction info</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Page;