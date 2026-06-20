"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function SearchBar({
  placeholder = "Search products...",
  className = "",
}) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    redirect(`/products?search=${value}`)
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <InputGroup className="max-w-xs">
        <InputGroupInput
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <InputGroupAddon>
          <Search className="h-4 w-4" />
        </InputGroupAddon>
      </InputGroup>

      <Button onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}