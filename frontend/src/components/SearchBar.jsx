import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  // global search state
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  // local visibility state
  const [visible, setVisible] = useState(false);

  // current route info
  const location = useLocation();

  // show search only on collection page
  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location.pathname]);

  // hide component if not needed
  if (!showSearch || !visible) return null;

  return (
    <div className="text-center border-t border-b bg-gray-50">
      {/* search input */}
      <div className="inline-flex items-center justify-center w-3/4 px-5 py-2 mx-3 my-5 border border-gray-400 rounded-full sm:w-1/2">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 text-sm outline-none bg-inherit"
        />

        {/* search icon */}
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-4"
        />
      </div>

      {/* close search */}
      <img
        src={assets.cross_icon}
        alt="Close"
        className="inline w-3 cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
    </div>
  );
};

export default SearchBar;
