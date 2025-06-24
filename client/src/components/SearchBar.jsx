import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ onSearch, searchTerm }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    onSearch("");
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <div
          className={`flex items-center bg-white rounded-xl shadow-md border-2 transition-all duration-300 ${
            isFocused
              ? "border-blue-400 shadow-lg"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <Search
            className={`ml-4 h-5 w-5 transition-colors duration-300 ${
              isFocused ? "text-blue-500" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            placeholder="Buscar tareas por título..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="mr-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
