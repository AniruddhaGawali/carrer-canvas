"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
};

export const IsDetailSavedContext = React.createContext({
  isDetailSaved: false,
  setIsDetailSaved: (value: boolean) => {},
});

function IsDetailSavedProvider({ children }: Props) {
  const [isDetailSaved, setIsDetailSaved] = React.useState(false);
  return (
    <IsDetailSavedContext.Provider
      value={{
        isDetailSaved,
        setIsDetailSaved,
      }}
    >
      {children}
    </IsDetailSavedContext.Provider>
  );
}

export default IsDetailSavedProvider;
