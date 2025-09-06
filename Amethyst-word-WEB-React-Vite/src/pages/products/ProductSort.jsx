
const ProductSort = ({ sortBy, onSortChange }) => {
  return (
    <div className="hidden md:flex items-center gap-2 text-sm">
      <span className="mx-2">|</span>
      <span>Sắp xếp:</span>
      <select 
        className="border-none bg-transparent font-medium focus:outline-none"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default">Theo giá tiền </option>
        <option value="price-asc">Từ thấp đến cao</option>
        <option value="price-desc">Từ cao đến thấp</option>
      </select>
    </div>
  );
};

export default ProductSort;
