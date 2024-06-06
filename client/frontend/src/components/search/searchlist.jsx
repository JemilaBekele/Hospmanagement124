import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [input, setInput] = useState("");

  return (
    <div>
      <header className="flex gap-5 px-8 py-6 bg-white border-b border-gray-200 border-solid max-w-[798px] max-md:flex-wrap max-md:px-5">
        <h1 className="flex-auto my-auto text-2xl font-semibold text-zinc-900">Dashboard</h1>
        <nav className="flex gap-5 text-xs text-neutral-400 max-md:flex-wrap">
          <form className="flex flex-auto gap-5 px-5 py-3 bg-white rounded-lg border border-gray-200 border-solid">
            <label className="sr-only">Search type of keywords</label>
            <input
              id="search"
              type="text"
              placeholder="Type to search..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-auto my-auto"
            />
            <Link to={`/Doctor/search/${input}`}>
              <button type="submit" aria-label="Search">
                <FaSearch id="search-icon" />
              </button>
            </Link>
          </form>
        </nav>
      </header>
    </div>
  );
};

export default SearchBar;
