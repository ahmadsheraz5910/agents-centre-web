import { Button } from "@/core/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import PropertyTable from "./_components/PropertyTable";

const YourProperties = async () => {
  return (
    <div className="w-full space-y-4 px-12 py-8">
      <div className="space-y-8">
        <div className = "flex items-center justify-between ">
          <h2 className="text-2xl font-semibold">{"Your Properties"}</h2>
          <Link href="/your-properties/new" passHref>
            <Button>
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              {"Add Property"}
            </Button>
          </Link>
        </div>
        <PropertyTable />
      </div>
    </div>
  );
};

export default YourProperties;
