"use client";

import React from "react";

import IdInputSelect from "@/components/shared/id_input_select";

type AccountFieldSelectProps = {
  label: string;
  value: string;
};

const AccountSelectField: React.FC<AccountFieldSelectProps> = ({
  label,
  value,
}) => {
  const handleButtonClick = () => {
    alert("Button clicked");
  };

  return (
    <IdInputSelect
      name="accountId"
      label="Account"
      onButtonClick={handleButtonClick}
    />
  );
};

export default AccountSelectField;
