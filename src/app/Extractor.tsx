"use client"
import FunctionForm from '@/components/ContractExtractor/FunctionForm';
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner'


const Extractor = () => {

    const [contractAddress, setContractAddress] = useState();
    const [contractABI, setContractABI] = useState({});

    const [functions, setFunctions] = useState<any>({});

    const [functionSelected, setFunctionSelected] = useState(null);

    const [functionInput, setFunctionInput] = useState(null);

    console.log("Functions", functions);

    const handleSelect = (e) => {
        setFunctionSelected(e.target.value);
        setFunctionInput(functions[e.target.value]?.inputs);
    }

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: any) => {
        e.preventDefault();
        console.log("Change", e.target.value);
        setContractAddress(e.target.value);
    }

    const handleContractAddress = async () => {
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



    const handleFunctionInput = (e) => {
        console.log("Input data", e.target.value);
    }

    console.log("Function input", functionInput);

    return (
        <div className='w-9/12'>
            hey

            <div className='flex flex-row'>
                <FormControl className='flex-1'>
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

                    <button className='border-2 p-4' onClick={handleContractAddress}> Submit </button>

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

                <div className='flex-1'>
                    <div className='flex flex-col '>
                        <div className='text-center'>Your transaction Batch</div>
                        <div>
                            <p className='text-[18px]'>&#123;</p>
                            <div>
                                <div className='flex flex-row gap-2'>
                                    <p>To: </p>
                                    <p>{contractAddress}</p>
                                </div>
                                <div className='flex flex-row gap-2'>
                                    <p>Function: </p>
                                    <p>{functionSelected}</p>
                                </div>

                                {functionInput && (
                                    functionInput?.map((item, index) => {
                                        console.log("Item", item);
                                        return (
                                            <div key={index}>{item?.name}</div>
                                        )
                                    })
                                )}

                                <div className='flex flex-row gap-2'>
                                    <p></p>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Extractor;