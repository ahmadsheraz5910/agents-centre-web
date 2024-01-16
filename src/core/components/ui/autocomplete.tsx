"use client";
import {
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/core/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
  type ReactNode,
  type FocusEvent,
} from "react";
import { SearchIcon } from "lucide-react";
import { cn } from "@/core/helpers";
import { LoadingCircle } from "./loading-circle";

export type Option<T> = Record<"label", string> & Record<"value", T>;

type AutoCompleteProps<T extends object> = {
  inputValue?: string;
  setInputValue: (value?: string) => void;
  selectedOption?: T & { label: string };
  onSelectedOptionChange: (value: T & { label: string }) => void;
  options: Array<Option<T> & Record<"displayLabel", ReactNode>>;
  emptyMessage: string;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  onBlur?: (e?: FocusEvent<HTMLInputElement, Element>) => void;
};

export const AutoComplete = <T extends object>({
  options,
  placeholder,
  emptyMessage,
  setInputValue,
  onBlur,
  onSelectedOptionChange,
  disabled,
  name,
  isLoading = false,
  ...props
}: AutoCompleteProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);
  const inputValue = Boolean(props.inputValue) ? props.inputValue: (props.selectedOption?.label ?? "");

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }
      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true);
      }

      if (event.key === "Escape") {
        input.blur();
      }
    },
    [isOpen, options, onSelectedOptionChange],
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    // Reseting the input value when the user blurs the input
    setInputValue(undefined);
  }, []);

  const handleSelectOption = useCallback(
    (selectedOption: T & { label: string }) => {
      onSelectedOptionChange?.(selectedOption);
      setInputValue(undefined);
      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur();
        onBlur?.();
      }, 0);
    },
    [onSelectedOptionChange],
  );
  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div className="relative flex items-center" cmdk-input-wrapper="">
        <SearchIcon className="absolute ml-3 h-5 w-5 text-gray-600" />
        <CommandPrimitive.Input
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          name={name}
          onBlur={(e) => {
            handleBlur();
            onBlur?.(e);
          }}
          onFocus={(e) => {
            setOpen(true);
            onBlur?.(e);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="flex h-11 w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm placeholder:text-muted-foreground"
        />
      </div>
      <div className="relative mt-1">
        {isOpen ? (
          <div className="absolute top-0 z-10 w-full rounded-xl bg-white shadow-md outline-none animate-in fade-in-0 zoom-in-95">
            <CommandList className="rounded-lg border">
              {options.length > 0 ? (
                <CommandGroup>
                  {options.map((option, idx) => {
                    return (
                      <CommandItem
                        key={idx}
                        value={option.label}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        onSelect={() =>
                          handleSelectOption({
                            label: option.label,
                            ...option.value,
                          })
                        }
                        className={cn("flex w-full items-center gap-2")}
                      >
                        {option.displayLabel}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ) : null}
              {isLoading ? (
                <CommandPrimitive.Loading>
                  <div className="flex w-full items-center justify-center p-2">
                    <LoadingCircle className="h-6 w-6" />
                  </div>
                </CommandPrimitive.Loading>
              ) : null}
              {!isLoading ? (
                <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                  {emptyMessage}
                </CommandPrimitive.Empty>
              ) : null}
            </CommandList>
          </div>
        ) : null}
      </div>
    </CommandPrimitive>
  );
};
