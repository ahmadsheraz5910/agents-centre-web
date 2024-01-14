import React, {
  type FocusEvent,
  type ReactNode,
} from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { GLOBAL_CONFIG } from "../config";
import { AutoComplete } from "./ui/autocomplete";

type Location = {
  description: string;
  placeId: string;
};
interface Props {
  name?: string;
  location?: Location;
  onLocationChange: (value: Location) => void;
  onBlur?: (e?: FocusEvent<HTMLInputElement, Element>) => void;
  placeholder?: string;
}

const GoogleAutoComplete = ({
  name,
  onBlur,
  location,
  onLocationChange,
  placeholder,
}: Props) => {

  const {
    suggestions: { data, loading },
    setValue,
    value,
    ready: isGoogleMapsObjectReady,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: "pk",
      },
    },
    callbackName: GLOBAL_CONFIG.googlePlacesAPI.callbackName,
  });

  return (
    <AutoComplete
      name={name}
      inputValue={value}
      setInputValue={v => setValue(v ??"")}
      selectedOption={
        location
          ? {
              label: location.description,
              description: location.description,
              placeId: location.placeId,
            }
          : undefined
      }
      onSelectedOptionChange={async (o) => {
        onLocationChange({
          description: o.description,
          placeId: o.placeId,
        });
      }}
      options={data.map(({ description, place_id, matched_substrings }) => {
        let lastOffsetEnd = 0;
        const elements: Array<ReactNode> = [];
        for (const m of matched_substrings) {
          elements.push(
            <>
              {description.slice(lastOffsetEnd, m.offset)}
              <span className="font-bold text-gray-800">
                {description.slice(m.offset, m.offset + m.length)}
              </span>
            </>,
          );
          lastOffsetEnd = m.offset + m.length;
        }
        if (lastOffsetEnd < description.length) {
          elements.push(description.slice(lastOffsetEnd, description.length));
        }
        return {
          value: {
            description,
            placeId: place_id,
          },
          label: description,
          displayLabel: (
            <div
              className="flex w-full items-baseline justify-between"
              key={description}
            >
              <span>{elements}</span>
            </div>
          ),
        };
      })}
      emptyMessage="No verified address found"
      placeholder={placeholder}
      isLoading={loading}
      disabled={!isGoogleMapsObjectReady}
      onBlur={onBlur}
    />
  );
};

export default GoogleAutoComplete;
