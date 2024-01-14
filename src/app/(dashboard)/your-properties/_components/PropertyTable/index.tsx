'use server';
import { api } from "@/trpc/server";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";



const PropertyTable = async () => {
  const properties = await api.propertyRouter.getMyProperties.query();
  return (
    <div>
      <DataTable columns={columns} data = {properties} />
    </div>
  );
};

export default PropertyTable;
