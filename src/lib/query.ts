type QueryFilter = {
  field: string; // Field name in the database
  operator: string; // Operator like 'equals', 'lt', 'gt', 'in', etc.
  value: any; // Value or array of values for comparison
};

type Query = {
  filters: QueryFilter[];
};
