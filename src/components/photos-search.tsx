import { InputText } from "./input-text";
import SearchIcon from '../assets/icons/search.svg?react'
import React from "react";
import { debounce } from "../utils/debounce";

export function PhotosSearch() {
  const [inputValue, setInputValue] = React.useState<string>("")

  const debouncedSetValue = React.useCallback(
    debounce((value: string) => {
      console.log("Valor com debounced")
    }, 500),
    []
  )

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value
    console.log(value)
    setInputValue(value)
    debouncedSetValue(value)
  }

  return (
    <InputText
      icon={SearchIcon}
      value={inputValue}
      onChange={handleInputValue}
      placeholder="Busque suas fotos..."
      className="flex flex-1"
    />
  )
}