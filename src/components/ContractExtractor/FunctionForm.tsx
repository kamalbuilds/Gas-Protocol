"use client"
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import React, { useState } from 'react';

const FunctionForm = ({
    functions,
    contractAddress,
    handleInputChange,
    handleSelect,
    functionInput,
    handleFunctionInput
}: any) => {

    console.log("Functions", functions);


    return (
        <div>
            <FormControl>

                <FormLabel>To Address</FormLabel>
                <Input value={contractAddress} onChange={handleInputChange} />

                <FormLabel>Contract Function Selection</FormLabel>
                <Select placeholder='Select Function to Call' onChange={handleSelect}>
                    {Object.keys(functions).map((item, index) => (
                        <option key={index}>{item}</option>
                    ))}
                </Select>

                {functionInput && (
                    functionInput.map((item, index) => (
                        <div key={index}>
                            <FormLabel>{item?.name} ({item?.type})</FormLabel>
                            <Input placeholder={`Enter ${item?.name}`} onChange={(e) => handleFunctionInput(e, item.name)}  />
                        </div>
                    ))
                )}

            </FormControl>
        </div>
    );
};

export default FunctionForm;