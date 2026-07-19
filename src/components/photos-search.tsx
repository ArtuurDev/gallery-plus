import { InputText } from "./input-text";
import SearchIcon from '../assets/icons/search.svg?react'
import React from "react";
import { debounce } from "../utils/debounce";
import usePhotos from "../contexts/photos/hooks/use-photos";

export function PhotosSearch() {
  const [inputValue, setInputValue] = React.useState<string>("")
  const { filters } = usePhotos()

  const debouncedSetValue = React.useCallback(
    debounce((value: string) => {
      filters.setQ(value)
    }, 500),
    [filters.setQ]
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