"use client";
import React, { createContext, useContext, useState } from 'react';

const ClaimRequestContext = createContext();

export const ClaimRequestProvider = ({ children }) => {
  const [claimRequests, setClaimRequests] = useState({});

  const addClaimRequest = (protocol, request) => {
    setClaimRequests((prevRequests) => ({
      ...prevRequests,
      [protocol]: request,
    }));
  };

  return (
    <ClaimRequestContext.Provider value={{ claimRequests, addClaimRequest }}>
      {children}
    </ClaimRequestContext.Provider>
  );
};

export const useClaimRequest = () => {
  return useContext(ClaimRequestContext);
};
