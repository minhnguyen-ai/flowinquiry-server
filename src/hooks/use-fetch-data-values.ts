import React from "react";

import { ActionResult, EntityValueDefinition } from "@/types/commons";

// Generic hook to load data
export const useFetchData = (
  fetchData: () => Promise<ActionResult<Array<EntityValueDefinition>>>,
) => {
  const [items, setItems] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    const loadItems = async () => {
      const { ok, data } = await fetchData();
      if (ok && data) {
        // setItems(data.map((it) => it.value)); // Apply transformation to the fetched data
      }
    };

    loadItems();
  }, []);

  return items;
};
