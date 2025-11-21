import { useState, useMemo, useEffect } from "react";
import { Search, ChevronDown, Package, DollarSign, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import VehicleCard from "@/components/VehicleCard";
import { CATEGORIES, VehicleCategory, Vehicle } from "@/data/vehicles";
import { loadVehicles } from "@/lib/vehicleStorage";

const VEHICLES_PER_PAGE = 9;

export default function Catalog() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => loadVehicles());
  const [selectedCategory, setSelectedCategory] =
    useState<VehicleCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [minWeight, setMinWeight] = useState<number | null>(null);
  const [maxBudget, setMaxBudget] = useState<number>(15000000);
  const [displayedCount, setDisplayedCount] = useState(VEHICLES_PER_PAGE);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesCategory =
        !selectedCategory || vehicle.category === selectedCategory;
      const matchesSearch = vehicle.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesWeight = !minWeight || vehicle.trunkWeight >= minWeight;
      const matchesBudget = vehicle.price <= maxBudget;
      return matchesCategory && matchesSearch && matchesWeight && matchesBudget;
    });
  }, [vehicles, selectedCategory, searchQuery, minWeight, maxBudget]);

  const visibleVehicles = useMemo(() => {
    return filteredVehicles.slice(0, displayedCount);
  }, [filteredVehicles, displayedCount]);

  const hasMoreVehicles = displayedCount < filteredVehicles.length;

  const hasActiveFilters = selectedCategory || minWeight || maxBudget < 15000000;

  useEffect(() => {
    setDisplayedCount(VEHICLES_PER_PAGE);
  }, [selectedCategory, searchQuery, minWeight, maxBudget]);

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    setMinWeight(null);
    setMaxBudget(15000000);
    setDisplayedCount(VEHICLES_PER_PAGE);
  };

  const handleLoadMore = () => {
    setDisplayedCount(prev => prev + VEHICLES_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 via-black to-black py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Catalogue Véhicules
          </h1>
          <p className="text-xl text-gray-300">
            Explorez notre collection complète de véhicules premium
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8 sticky top-16 z-40 bg-black/95 backdrop-blur-md py-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un véhicule par nom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>
          </div>

          {/* Filters Section */}
          <div className="mb-8 space-y-6">
            {/* Weight and Budget Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weight Filter */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-amber-400" />
                  <label className="font-semibold text-white">
                    Poids Coffre Minimum
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setMinWeight(null)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                      minWeight === null
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                    }`}
                  >
                    Tous
                  </button>
                  <button
                    onClick={() => setMinWeight(100)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                      minWeight === 100
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                    }`}
                  >
                    100+ kg
                  </button>
                  <button
                    onClick={() => setMinWeight(500)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                      minWeight === 500
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                    }`}
                  >
                    500+ kg
                  </button>
                  <button
                    onClick={() => setMinWeight(1000)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                      minWeight === 1000
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                    }`}
                  >
                    1000+ kg
                  </button>
                </div>
              </div>

              {/* Budget Filter */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                  <label className="font-semibold text-white">
                    Budget Maximum: {maxBudget.toLocaleString()} $
                  </label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15000000"
                  step="25000"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(245, 158, 11) 0%, rgb(245, 158, 11) ${(maxBudget / 15000000) * 100}%, rgb(55, 65, 81) ${(maxBudget / 15000000) * 100}%, rgb(55, 65, 81) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>0 $</span>
                  <span>15M $</span>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-white mb-3">Catégories</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    selectedCategory === null
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/50"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                  }`}
                >
                  Tous ({vehicles.length})
                </button>
                {CATEGORIES.map((category) => {
                  const count = vehicles.filter(
                    (v) => v.category === category,
                  ).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/50"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700 hover:border-amber-500/30"
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-gray-400">
              {filteredVehicles.length} véhicule
              {filteredVehicles.length !== 1 ? "s" : ""} trouvé
              {filteredVehicles.length !== 1 ? "s" : ""}
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
              >
                <X className="w-4 h-4" />
                Réinitialiser tous les filtres
              </button>
            )}
          </div>

          {/* Vehicles Grid */}
          {filteredVehicles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>

              {hasMoreVehicles && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/50 hover:shadow-xl hover:shadow-amber-500/70"
                  >
                    Afficher plus de véhicules ({Math.min(VEHICLES_PER_PAGE, filteredVehicles.length - displayedCount)} de plus)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl font-semibold text-gray-300 mb-2">
                Aucun véhicule trouvé
              </p>
              <p className="text-gray-400 mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2 px-6 rounded-lg transition-all"
              >
                Voir tous les véhicules
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg text-amber-400 mb-4">
                ELITE Vinewood Auto
              </h3>
              <p className="text-gray-400">
                Votre destination premium pour tous vos besoins automobiles.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Accueil
                  </a>
                </li>
                <li>
                  <a
                    href="/catalog"
                    className="hover:text-amber-400 transition-colors"
                  >
                    Catalogue
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="hover:text-amber-400 transition-colors"
                  >
                    À Propos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <p className="text-gray-400">1115 Route 68, Vinewood Hills, Los Santos</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>
              © 2024 ELITE Vinewood Auto. Tous droits réservés. | GTA RP Server
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
