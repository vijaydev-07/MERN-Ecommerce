import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const Collection = () => {
  // page navigation ke liye
  const navigate = useNavigate();

  // products global context se
  const { products } = useContext(ShopContext);

  // mobile filter open/close
  const [showFilter, setShowFilter] = useState(false);

  // filtered products list
  const [filterProducts, setFilterProducts] = useState([]);

  // selected categories
  const [category, setCategory] = useState([]);

  // selected sub-categories
  const [subCategory, setSubCategory] = useState([]);

  // sorting type
  const [sortType, setSortType] = useState("relevant");

  // search input value
  const [search, setSearch] = useState("");

  // category checkbox toggle
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : [...prev, value]
    );
  };

  // sub-category checkbox toggle
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((i) => i !== value)
        : [...prev, value]
    );
  };

  // clear all filters
  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
  };

  // filter products based on search & checkboxes
  const applyFilter = () => {
    let list = [...products];

    // search filter
    if (search) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // category filter
    if (category.length) {
      list = list.filter((p) => category.includes(p.category));
    }

    // sub-category filter
    if (subCategory.length) {
      list = list.filter((p) => subCategory.includes(p.subCategory));
    }

    setFilterProducts(list);
  };

  // sort filtered products
  const sortProducts = () => {
    let list = [...filterProducts];

    if (sortType === "low-high") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      list.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(list);
  };

  // re-filter when filters or products change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, products]);

  // re-sort when sort option changes
  useEffect(() => {
    sortProducts();
  }, [sortType]);

  // check if any filter is active
  const isFiltering =
    category.length > 0 || subCategory.length > 0 || search.length > 0;

  // final products to show
  const displayProducts =
    filterProducts.length > 0 || isFiltering
      ? filterProducts
      : products;

  return (
    <div className="max-w-[1200px] mx-auto px-3 sm:px-6 md:px-8">
      <div className="flex flex-col md:flex-row gap-6 pt-10 border-t">

        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden md:block w-60 sticky top-24 self-start">
          <p className="text-lg font-semibold mb-4">FILTERS</p>

          {/* CATEGORY FILTER */}
          <div className="border p-4 mb-4">
            <p className="text-sm font-medium mb-2">CATEGORIES</p>
            {["Men", "Women", "Kids"].map((c) => (
              <label key={c} className="flex gap-2 text-sm mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={c}
                  checked={category.includes(c)}
                  onChange={toggleCategory}
                />
                {c}
              </label>
            ))}
          </div>

          {/* SUB-CATEGORY FILTER */}
          <div className="border p-4 mb-4">
            <p className="text-sm font-medium mb-2">TYPES</p>
            {["Topwear", "Bottomwear", "Winterwear"].map((t) => (
              <label key={t} className="flex gap-2 text-sm mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={t}
                  checked={subCategory.includes(t)}
                  onChange={toggleSubCategory}
                />
                {t}
              </label>
            ))}
          </div>

          <button
            onClick={clearFilters}
            className="w-full bg-black text-white py-2 rounded text-sm"
          >
            Clear Filters
          </button>
        </aside>

        {/* MOBILE FILTER BUTTON */}
        <button
          onClick={() => setShowFilter(true)}
          className="md:hidden flex items-center gap-2 border px-4 py-2 rounded shadow-sm w-fit"
        >
          FILTERS
          <img src={assets.dropdown_icon} className="h-3" />
        </button>

        {/* MOBILE FILTER DRAWER */}
        {showFilter && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowFilter(false)}
            />
            <div className="relative bg-white w-4/5 max-w-xs h-full p-4 overflow-y-auto">
              <p className="font-semibold mb-3">CATEGORIES</p>

              {["Men", "Women", "Kids"].map((c) => (
                <label key={c} className="flex gap-2 text-sm mb-2">
                  <input
                    type="checkbox"
                    value={c}
                    checked={category.includes(c)}
                    onChange={toggleCategory}
                  />
                  {c}
                </label>
              ))}

              <p className="font-semibold mt-4 mb-3">TYPES</p>

              {["Topwear", "Bottomwear", "Winterwear"].map((t) => (
                <label key={t} className="flex gap-2 text-sm mb-2">
                  <input
                    type="checkbox"
                    value={t}
                    checked={subCategory.includes(t)}
                    onChange={toggleSubCategory}
                  />
                  {t}
                </label>
              ))}

              <button
                onClick={() => {
                  clearFilters();
                  setShowFilter(false);
                }}
                className="w-full mt-4 bg-black text-white py-2 rounded text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* PRODUCTS LIST */}
        <main className="flex-1">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
              <Title text1="ALL" text2="COLLECTIONS" />

              {/* SORT DROPDOWN */}
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border px-3 py-2 rounded text-sm w-full sm:w-auto"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>

            {/* SEARCH INPUT */}
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded w-full sm:w-1/2"
            />
          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {displayProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
                className="cursor-pointer transition-transform duration-200 hover:scale-[1.04]"
              >
                {/* PRODUCT IMAGE */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* PRODUCT NAME & PRICE */}
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-sm text-gray-700 mt-1">
                    ₹ {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Collection;
