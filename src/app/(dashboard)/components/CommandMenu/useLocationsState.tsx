"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getGeocode } from "use-places-autocomplete";

interface LocationsState {
  data:
    | Array<{
        placeId: string;
        address: string;
        geometry: google.maps.GeocoderGeometry | undefined;
      }>
    | undefined;
  loading: boolean;
}
const QUERY_PARAM = "placesIds";
interface Props {
  isGoogleMapsObjectReady: boolean;
}
const useLocationsState = ({ isGoogleMapsObjectReady }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [locations, setLocations] = useState<LocationsState>({
    data: undefined,
    loading: true,
  });

  // Update locations and query params
  function setNewLocations(
    getNewLocations: (
      prevState: LocationsState["data"],
    ) => LocationsState["data"],
  ) {
    setLocations((prev) => {
      const newUrlparams = new URLSearchParams(searchParams);
      const locations = getNewLocations(prev.data);
      const placesIds = locations?.map(({ placeId }) => placeId);
      !placesIds || placesIds.length === 0
        ? newUrlparams.delete(QUERY_PARAM)
        : newUrlparams.set(QUERY_PARAM, JSON.stringify(placesIds));
      router.push("?" + newUrlparams.toString());
      return {
        data: locations,
        loading: false,
      };
    });
  }

  const getLocationsWithGeometry = async () => {
    return await Promise.all(
      locations.data?.map(async (location) => {
        if (location.geometry) {
          return location;
        }
        const response = await getGeocode({ placeId: location.placeId });
        if (response[0]) {
          const { place_id, formatted_address, geometry } = response[0];
          return {
            placeId: place_id,
            address: formatted_address,
            geometry,
          };
        }
      }) ?? [],
    );
  };

  // Fill locations with initial data from query params
  useEffect(() => {
    if (!isGoogleMapsObjectReady) {
      return;
    }
    const initalPlacesIds = JSON.parse(
      searchParams.get(QUERY_PARAM) ?? "[]",
    ) as Array<string>;
    if (initalPlacesIds.length === 0) {
      return setLocations({
        data: [],
        loading: false,
      });
    }
    void (async () => {
      const initalLocations = await Promise.all(
        initalPlacesIds.map(async (placeId) => {
          const response = await getGeocode({ placeId });
          if (!response[0]) {
            throw new Error("No response from google maps api");
          }
          const { place_id, address_components, geometry } = response[0];
          return {
            placeId: place_id,
            address: address_components[0]?.long_name ?? "",
            geometry,
          };
        }),
      )
      setLocations({
        data: initalLocations,
        loading: false,
      });
    })();
  }, [isGoogleMapsObjectReady]);

  return {
    locations: locations.data,
    initalLoading: locations.loading,
    setLocations: setNewLocations,
    getLocationsWithGeometry,
  };
};

export default useLocationsState;
