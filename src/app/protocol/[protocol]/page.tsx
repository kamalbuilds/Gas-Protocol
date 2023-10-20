"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import  { useClaimRequest } from '@/contexts/ClaimRequestContext';

const ClaimRequestForm = () => {
  const [groupId, setGroupId] = useState('');
  const { addClaimRequest } = useClaimRequest();
  const [claimType, setClaimType] = useState('GTE');
  const [value, setValue] = useState('');
  const [isOptional, setIsOptional] = useState(false);
  const [isSelectableByUser, setIsSelectableByUser] = useState(false);
    const { protocol } = useParams();

  const handleClaimRequest = () => {
    // Create a claim request object with the form inputs
    const claimRequest = {
      groupId,
      claimType,
      value: parseInt(value),
      isOptional,
      isSelectableByUser,
    };

    // Do something with the claim request object
    addClaimRequest(protocol, claimRequest);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Custom zkproof Requests for {protocol} users</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-white-700">Group ID:</label>
          <input
            type="text"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="border text-black rounded-md py-2 px-3 w-full"
          />
        </div>
        <div>
          <label className="block text-white-700">Claim Type:</label>
          <select
            value={claimType}
            onChange={(e) => setClaimType(e.target.value)}
            className="border text-blue-700 rounded-md py-2 px-3 w-full"
          >
            <option value="GTE">Greater Than or Equal (GTE)</option>
            <option value="EQ">Equal (EQ)</option>
          </select>
        </div>
        <div>
          <label className="block text-white-700">Value:</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border text-black rounded-md py-2 px-3 w-full"
          />
        </div>
        <div>
          <label className="block text-white-700">Optional:</label>
          <input
            type="checkbox"
            checked={isOptional}
            onChange={() => setIsOptional(!isOptional)}
            className="form-checkbox text-blue-500"
          />
        </div>
        <div>
          <label className="block text-white-700">Selectable by User:</label>
          <input
            type="checkbox"
            checked={isSelectableByUser}
            onChange={() => setIsSelectableByUser(!isSelectableByUser)}
            className="form-checkbox text-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={handleClaimRequest}
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-700"
        >
          Request Claim
        </button>
      </form>
    </div>
  );
};

export default ClaimRequestForm;
