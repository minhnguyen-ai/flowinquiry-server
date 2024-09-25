"use client";

import { z } from "zod";

import { toast } from "@/components/ui/use-toast";

export const validateForm = <T>(
  formDataObject: T,
  schema: z.ZodSchema<T>,
  form: any,
) => {
  form.clearErrors(); // Clear existing errors
  console.log(`Form data ${JSON.stringify(formDataObject)}`);
  // Validate against schema
  const validation = schema.safeParse(formDataObject);

  if (!validation.success) {
    // If validation fails, set errors on the form
    validation.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      console.log(`Error ${field} message ${issue.message}`);
      form.setError(field, { message: issue.message });
    });

    // Show error toast
    setTimeout(() => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid values. Please fix them before submitting again.",
      });
    }, 2000);

    return false; // Return false to indicate validation failure
  }

  return validation.data; // Return the validated data if successful
};
