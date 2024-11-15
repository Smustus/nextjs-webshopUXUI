"use client";
import Image from "next/image";
import magGlass from "../assets/magnifyingGlassWhite.svg";
import { useEffect, useState } from "react";

const SearchField = () => {
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(searchInput);
  }, [searchInput]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      initiateSearch();
    }
  };

  const initiateSearch = () => {
    if (searchInput.trim()) {
      setMessage(`Searching for: ${searchInput}`);
      console.log(`Searching for: ${searchInput}`);
    }
  };

  return (
    <section className="mb-8">
      <article className="flex font-semibold text-gray-700 rounded-full shadow-lg focus-within:outline-1 focus-within:outline-slate-900 focus-visible:outline-none focus-visible:outline-slate-300 ">
        <label htmlFor="searchField" />
        <input
          name="searchField"
          id="searchField"
          type="text"
          placeholder="Search..."
          className="text-lg pl-5 rounded-s-full focus-visible:outline-none focus-visible:shadow-xl "
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={initiateSearch}>
          <Image
            src={magGlass}
            alt="Search"
            height={45}
            width={45}
            className="bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 rounded-e-full p-1 pl-0 hover:bg-gradient-to-tr hover:from-slate-700 hover:via-slate-500 hover:to-slate-700"
          />
        </button>
      </article>
      <p className="font-semibold text-center">{message}</p>
    </section>
  );
};

export default SearchField;
