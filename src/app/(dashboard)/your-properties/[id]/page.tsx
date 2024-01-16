import React from "react";
import { api } from "@/trpc/server";
import omit from "lodash.omit";
import EditPropertyClient from "./EditPropertyClient";
const EditProperty = async (props: { params: { id: string } }) => {
  const property = await api.propertyRouter.getPropertyById.query(
    props.params.id,
  );
  console.log(property)
  return (
    <EditPropertyClient
      propertyId={props.params.id}
      initalValues={omit(property, [
        "id",
        "createdAt",
        "updatedAt",
        "deletedAt",
        "postedById",
        "thumbnail",
      ])}
    />
  );
};

export default EditProperty;
