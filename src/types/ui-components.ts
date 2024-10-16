import { FC } from "react";

// Define IconType
export type IconType = FC<React.SVGProps<SVGSVGElement>>;

export interface UiAttributes {
  required?: boolean;
}

export interface FormFieldProps extends UiAttributes {
  form: any;
}

export type FilterOption = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};
