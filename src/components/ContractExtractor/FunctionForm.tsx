"use client"
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';

const FunctionForm = ({
    functions,
    contractAddress,
    handleInputChange,
    handleSelect,
    functionInput,
    handleFunctionInput,
    getGasFees,
    loadingGas
}: any) => {

    return (
        <div>
            <p className=' text-[28px] mb-4 text-sky-500 text-center'>Prepare Your transaction</p>

            <FormControl className='flex flex-col gap-4'>

                <div>
                    <FormLabel>To Address</FormLabel>
                    <Input value={contractAddress} onChange={handleInputChange} />
                </div>

                <div>
                    <FormLabel>Contract Function Selection</FormLabel>
                    <Select placeholder='Select Function to Call' onChange={handleSelect}>
                        {Object.keys(functions).map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </Select>
                </div>

                {functionInput && (
                    // @ts-ignore
                    functionInput.map((item, index) => (
                        <div key={index}>
                            <FormLabel>{item?.name} ({item?.type})</FormLabel>
                            <Input placeholder={`Enter ${item?.name}`} onChange={(e) => handleFunctionInput(e, item.name)} />
                        </div>
                    ))
                )}
            </FormControl>

            <button onClick={getGasFees} className='border-2 p-2 my-4 w-fit rounded-lg border-transparent py-2 px-4 bg-[#1d4ed8]'>
                {!loadingGas ? (
                    'Get Gas Fees'
                ) : (
                    <Oval
                        height={25}
                        width={25}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={loadingGas ? true : false}
                        ariaLabel='oval-loading'
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                    />
                )}
            </button>

        </div>
    );
};

export default FunctionForm;