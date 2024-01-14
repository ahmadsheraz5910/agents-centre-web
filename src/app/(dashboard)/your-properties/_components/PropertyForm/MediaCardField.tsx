import { Card, CardHeader, CardContent } from "@/core/components/ui/card";
import React from "react";

const MediaCardField = () => {
  return (
    <Card>
      <CardHeader className="space-y-0.5 border-b px-5 py-3">
        <p className="text-base font-semibold">{"Media"}</p>
        <p className="text-sm text-muted-foreground">
          {"Add images, pdfs or videos to show property details and features."}
        </p>
      </CardHeader>
      <CardContent className="space-y-4 p-5">
        <div className="h-40 w-full rounded-md border-2 border-dashed"></div>
      </CardContent>
    </Card>
  );
};

export default MediaCardField;
