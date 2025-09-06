import { Grid, List } from 'lucide-react';

const ViewModeToggle = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
      <button
        className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
        onClick={() => onViewModeChange('grid')}
        aria-label="Chế độ xem lưới"
      >
        <Grid size={18} />
      </button>
      <button
        className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
        onClick={() => onViewModeChange('list')}
        aria-label="Chế độ xem danh sách"
      >
        <List size={18} />
      </button>
    </div>
  );
};

export default ViewModeToggle;