interface SidebarProps {
  sortRides: (option: string) => void;
  totalRides: number;
}

const Sidebar: React.FC<SidebarProps> = ({ sortRides, totalRides }) => {
  if (totalRides <= 1) {
    return (
      <div className="w-1/4 p-4 bg-gray-50">
        <div className="bg-white shadow-md p-5 py-8 font-medium rounded-md mt-8 ml-3">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Sort by</h3>
          <p className="text-gray-500">No sorting available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/4 p-4 bg-gray-50">
      <div className="bg-white shadow-md p-5 py-8 font-medium rounded-md mt-8 ml-3">
        <h3 className="text-lg font-semibold text-slate-700 mb-4">Sort by</h3>
        <ul className="space-y-4 text-gray-700">
          <li>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="sort"
                className="form-radio"
                onChange={() => sortRides("shortest_ride")}
              />
              <span>Shortest Ride</span>
            </label>
          </li>
          <li>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="sort"
                className="form-radio"
                onChange={() => sortRides("lowest_price")}
              />
              <span>Lowest price</span>
            </label>
          </li>
          <li>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="sort"
                className="form-radio"
                onChange={() => sortRides("departure_proximity")}
              />
              <span>Close to departure point</span>
            </label>
          </li>
          <li>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="sort"
                className="form-radio"
                onChange={() => sortRides("arrival_proximity")}
              />
              <span>Close to arrival point</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;