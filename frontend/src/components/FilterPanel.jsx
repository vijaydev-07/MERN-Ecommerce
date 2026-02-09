// ...existing imports...

const FilterPanel = ({ open, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-300 ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
      style={{ background: open ? "rgba(0,0,0,0.4)" : "transparent" }}
      onClick={onClose}
    >
      <div
        className={`absolute left-0 top-0 h-full w-4/5 max-w-xs bg-white shadow-lg z-50 p-4 overflow-y-auto transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* filter content */}
      </div>
    </div>
  );
};

export default FilterPanel;
