import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@shadcn/ui';

type IdInputSelectProps = {
    name: string;
    label: string;
    placeholder?: string;
    buttonLabel?: string;
    readOnly?: boolean;
    onButtonClick: () => void;
};

const IdInputSelect: React.FC<IdInputSelectProps> = ({
                                                         name,
                                                         label,
                                                         placeholder = 'Enter value...',
                                                         buttonLabel = 'Submit',
                                                         readOnly = true,
                                                         onButtonClick,
                                                     }) => {
    const { control } = useFormContext(); // Get the form context from React Hook Form

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <div className="flex items-center space-x-4">
                        {/* Read-only or editable text field */}
                        <FormControl>
                            <input
                                type="text"
                                {...field} // Spread the React Hook Form field props
                                value={field.value}
                                placeholder={placeholder}
                                readOnly={readOnly}
                                className={`mt-1 block w-full px-3 py-2 ${
                                    readOnly ? 'bg-gray-200' : 'bg-white'
                                } border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                        </FormControl>

                        {/* Button with customizable label */}
                        <button
                            type="button"
                            onClick={onButtonClick}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {buttonLabel}
                        </button>
                    </div>
                    <FormMessage /> {/* Display error messages if any */}
                </FormItem>
            )}
        />
    );
};

export default IdInputSelect;