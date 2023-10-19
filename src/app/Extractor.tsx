"use client"
import { FormControl, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner'


const Extractor = () => {

    const [contractAddress, setContractAddress] = useState();
    const [contractABI, setContractABI] = useState({});

    const handleInputChange = (e: any) => {
        e.preventDefault();
        console.log("Change", e.target.value);
        setContractAddress(e.target.value);
    }

    const handleContractAddress = async () => {
        console.log("Contract Address", contractAddress);

        const ETHERSCAN_API = process.env.ETHERSCAN_API_KEY;

        console.log("API key", ETHERSCAN_API);
        if (contractAddress) {
            try {
                const url = `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${ETHERSCAN_API}`
                const res = await fetch(url);
                const response = await res.json();

                console.log("Response", response);
                setContractABI(response);
            } catch (error) {
                console.log("Error", error);
            }
        }
    }

    const getFunctionsFromABI = () => {
        if (contractABI) {
            console.log("Contract ABI", contractABI);


        }
    }

    return (
        <div className='w-9/12'>
            hey

            <div>
                <p>Enter the Contract Details</p>

                <FormControl >
                    <FormLabel>Enter Contract Address</FormLabel>
                    <InputGroup>
                        <Input placeholder='Enter amount' onChange={handleInputChange} />
                        <InputRightElement>
                            <Oval
                                height={25}
                                width={25}
                                color="#4fa94d"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                                ariaLabel='oval-loading'
                                secondaryColor="#4fa94d"
                                strokeWidth={2}
                                strokeWidthSecondary={2}
                            />
                        </InputRightElement>
                    </InputGroup>

                    <button className='border-2 p-4' onClick={handleContractAddress}> Submit </button>
                    <button className='border-2 p-4' onClick={getFunctionsFromABI}> Get Functions </button>

                    {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                </FormControl>

            </div>
        </div>
    );
};

export default Extractor;