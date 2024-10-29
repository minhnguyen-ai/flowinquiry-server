"use client";

import React from "react";

import IdInputSelect from "@/components/shared/id-input-select";

type AccountFieldSelectProps = {
  accountName: string | null;
};

const AccountSelectField: React.FC<AccountFieldSelectProps> = ({
  accountName,
}) => {
  const handleButtonClick = () => {
    alert("Button clicked");
  };

  return (
    <IdInputSelect
      name="accountId"
      label="Account"
      defaultValue={accountName}
      onButtonClick={handleButtonClick}
    />
  );
};

export default AccountSelectField;
