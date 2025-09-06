export default function OrdersFilter({
    searchId,
    setSearchId,
    filterStatus,
    setFilterStatus,
    filterDate,
    setFilterDate,
    setCurrentPage
  }) {
    return (
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm mã đơn hàng..."
          className="border border-slate-300 rounded-md px-4 py-2 w-full sm:w-64"
          value={searchId}
          onChange={(e) => {
            setSearchId(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="border border-slate-300 rounded-md px-4 py-2"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option>Tất cả</option>
          <option>Đang xử lý</option>
          <option>Đang giao</option>
          <option>Đã giao</option>
          <option>Đã huỷ</option>
        </select>
        <input
          type="date"
          className="border border-slate-300 rounded-md px-4 py-2"
          value={filterDate}
          onChange={(e) => {
            setFilterDate(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
    );
  }
  