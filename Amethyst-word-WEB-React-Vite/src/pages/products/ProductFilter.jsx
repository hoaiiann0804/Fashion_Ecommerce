import React, { useEffect, useState, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";
import { CategoryService } from "../../service/Category.Service";
import { BrandService } from "../../service/Brand.Service";
import debounce from "lodash/debounce";

const ProductFilters = ({ onFilterChange, initialFilters }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandsError, setBrandsError] = useState(null);
  const [brandsLoading, setBrandsLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([
    initialFilters?.priceMin || 0,
    initialFilters?.pricaMax || 10000000,
  ]);
  const [selectedCategories, setSelectedCategories] = useState(initialFilters?.categoryId || []);
  const [selectedBrands, setSelectedBrands] = useState(initialFilters?.brandId || []);
  const [filters, setFilters] = useState({
    categoryId: initialFilters?.categoryId || [],
    brandId: initialFilters?.brandId || [],
    pageNumber: initialFilters?.pageNumber || 1,
    pageSize: initialFilters?.pageSize || 8,
    priceMin: initialFilters?.priceMin || 0,
    pricaMax: initialFilters?.pricaMax || 10000000,
  });
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brand: true,
    price: true,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await CategoryService.getAllCategories();
        setCategories(data);
        setCategoriesError(null);
      } catch (error) {
        setCategoriesError(error.message);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setBrandsLoading(true);
        const data = await BrandService.getBrands();
        setBrands(data);
        setBrandsError(null);
      } catch (error) {
        setBrandsError(error.message);
      } finally {
        setBrandsLoading(false);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const newFilters = {
      categoryId: initialFilters?.categoryId || [],
      brandId: initialFilters?.brandId || [],
      pageNumber: initialFilters?.pageNumber || 1,
      pageSize: initialFilters?.pageSize || 8,
      priceMin: initialFilters?.priceMin || 0,
      pricaMax: initialFilters?.pricaMax || 10000000,
    };
    setFilters(newFilters);
    setPriceRange([newFilters.priceMin, newFilters.pricaMax]);
    setSelectedCategories(newFilters.categoryId);
    setSelectedBrands(newFilters.brandId);
  }, [initialFilters]);

  const debouncedPriceChange = useCallback(
    debounce((newFilters) => {
      onFilterChange(newFilters);
    }, 300),
    [onFilterChange]
  );

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (categoryId) => {
    let newCategories;
    if (selectedCategories.includes(categoryId)) {
      newCategories = selectedCategories.filter(id => id !== categoryId);
    } else {
      newCategories = [...selectedCategories, categoryId];
    }
    setSelectedCategories(newCategories);
    const newFilters = {
      ...filters,
      categoryId: newCategories,
      pageNumber: 1,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBrandChange = (brandId) => {
    const idNum = Number(brandId);
    let newBrands;
    if (selectedBrands.includes(idNum)) {
      newBrands = selectedBrands.filter(id => id !== idNum);
    } else {
      newBrands = [...selectedBrands, idNum];
    }
    setSelectedBrands(newBrands);
    const newFilters = {
      ...filters,
      brandId: newBrands,
      pageNumber: 1,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = useCallback(
    (event, newValue) => {
      setPriceRange(newValue);
      const newFilters = {
        ...filters,
        priceMin: newValue[0],
        pricaMax: newValue[1],
        pageNumber: 1,
      };
      setFilters(newFilters);
      debouncedPriceChange(newFilters);
    },
    [filters, debouncedPriceChange]
  );

  const handleResetFilters = () => {
    const resetFilters = {
      categoryId: [],
      brandId: [],
      priceMin: 0,
      pricaMax: 10000000,
      pageNumber: 1,
      pageSize: filters.pageSize,
    };
    setFilters(resetFilters);
    setPriceRange([0, 10000000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    onFilterChange(resetFilters);
  };

  const renderFilterSection = (title, section, content) => (
    <div className="border-b border-gray-200 py-4">
      <div
        className="flex justify-between items-center cursor-pointer mb-2"
        onClick={() => toggleSection(section)}
      >
        <h3 className="font-medium">{title}</h3>
        {expandedSections[section] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      {expandedSections[section] && content}
    </div>
  );

  return (
    <div className="px-15 py-6">
      <div className="pr-4 bg-white rounded-lg shadow-md p-4 mb-4 mr-6">
        <h2 className="text-xl font-bold mb-4">Bộ lọc</h2>
        {renderFilterSection("Danh mục", "categories", (
          <div className="space-y-2">
            {categoriesLoading ? (
              <div className="text-center py-2">
                <span className="animate-spin mr-2">⌛</span>
                Đang tải danh mục...
              </div>
            ) : categoriesError ? (
              <div className="text-red-500 py-2">Lỗi: {categoriesError}</div>
            ) : (
              <ul className="space-y-2">
                {categories.map((category) => {
                  const id = category.id || category.categoryId;
                  const name = category.name || category.categoryName;
                  return (
                    <li key={id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(id)}
                        onChange={() => handleCategoryChange(id)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="text-sm">{name}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
        {renderFilterSection("Thương hiệu", "brand", (
          <div className="space-y-2">
            {brandsLoading ? (
              <div className="text-center py-2">
                <span className="animate-spin mr-2">⌛</span>
                Đang tải thương hiệu...
              </div>
            ) : brandsError ? (
              <div className="text-red-500 py-2">Lỗi: {brandsError}</div>
            ) : (
              <ul className="space-y-2">
                {brands.map((brand) => {
                  const id = Number(brand.id || brand.branD_ID);
                  const name = brand.name || brand.branD_NAME;
                  return (
                    <li key={id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(id)}
                        onChange={() => handleBrandChange(id)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="text-sm">{name}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
        {renderFilterSection("Giá", "price", (
          <>
            <div className="mb-4 mt-6 px-2">
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={10000000}
                step={100}
                sx={{ color: "#c034eb" }}
                valueLabelFormat={(value) => `${value.toLocaleString()}₫`}
              />
            </div>
            <div className="flex justify-between items-center text-sm px-2">
              <span className="font-medium">{priceRange[0].toLocaleString()}₫</span>
              <span className="font-medium">{priceRange[1].toLocaleString()}₫</span>
            </div>
          </>
        ))}
        {renderFilterSection("", "actions", (
          <button
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium"
            onClick={handleResetFilters}
          >
            Xóa tất cả bộ lọc
          </button>
        ))}
      </div>
    </div>
  );
};

ProductFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  initialFilters: PropTypes.shape({
    brandId: PropTypes.array,
    categoryId: PropTypes.array,
    pageNumber: PropTypes.number,
    pageSize: PropTypes.number,
    priceMin: PropTypes.number,
    pricaMax: PropTypes.number,
  }),
};

ProductFilters.defaultProps = {
  initialFilters: {
    categoryId: [],
    brandId: [],
    pageNumber: 1,
    pageSize: 8,
    priceMin: 0,
    pricaMax: 10000000,
  },
};

export default ProductFilters;
