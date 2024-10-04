"use client";

import React from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import IdInputSelect from "@/components/shared/id_input_select";

type AccountFieldSelectProps = {
    label: string;
    value: string;
};

const AccountSelectField: React.FC<AccountFieldSelectProps> = ({ label, value }) => {
    return (
        <IdInputSelect name="sss" label="xz" />
    );
};

export default AccountSelectField;