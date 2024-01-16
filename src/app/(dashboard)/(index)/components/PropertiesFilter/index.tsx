'use client';
import React, { useState } from "react";
import PriceTypeFilter from "./PriceTypeFilter";
import { HouseTypeFilter } from "./HouseTypeFilter";

const PropertiesFilter = () => {
  const [houseTypes, setHouseTypes] = useState<Array<string> | undefined>(undefined);
  const [priceFilter, setPriceFilter] = useState({
    maxPrice:undefined as number | undefined,
    minPrice:undefined as number | undefined
  })
  return (
    <div className="w-full border-b border-t flex items-center gap-2 flex-wrap bg-slate-100 px-5 py-4">
      <HouseTypeFilter
        selectedValues={houseTypes}
        setSelectedValues={setHouseTypes}
      />
      <PriceTypeFilter 
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />
    </div>
  );
};

export default PropertiesFilter;
