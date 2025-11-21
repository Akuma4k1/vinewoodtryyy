import { Vehicle } from "@/data/vehicles";
import { Package, DollarSign } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const formattedPrice = vehicle.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    .concat("$");

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 group">
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 bg-gray-900">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
          {vehicle.name}
        </h3>
        <p className="text-sm text-gray-400 mb-4">{vehicle.category}</p>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-3">
            <DollarSign className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Prix
              </p>
              <p className="text-lg font-bold text-amber-400">
                {formattedPrice}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-3">
            <Package className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Poids Coffre
              </p>
              <p className="text-lg font-bold text-blue-400">
                {vehicle.trunkWeight} kg
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
