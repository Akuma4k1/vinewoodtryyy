import { useState, useEffect } from "react";
import { Lock, Plus, Edit2, Trash2, LogOut, X, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import {
  loadVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "@/lib/vehicleStorage";
import { Vehicle, VehicleCategory, CATEGORIES } from "@/data/vehicles";

const SECRET_CODE = "RhE9?E&#CY";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretInput, setSecretInput] = useState("");
  const [authError, setAuthError] = useState("");

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "SUVs" as VehicleCategory,
    price: 0,
    trunkWeight: 0,
    image: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      setVehicles(loadVehicles());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretInput === SECRET_CODE) {
      setIsAuthenticated(true);
      setSecretInput("");
      setAuthError("");
    } else {
      setAuthError("Code secret incorrect");
      setSecretInput("");
    }
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.image ||
      formData.price <= 0 ||
      formData.trunkWeight <= 0
    ) {
      alert("Veuillez remplir tous les champs correctement");
      return;
    }

    if (editingId) {
      const updated = updateVehicle(editingId, {
        ...formData,
        price: Number(formData.price),
        trunkWeight: Number(formData.trunkWeight),
      });
      if (updated) {
        setVehicles(loadVehicles());
        setEditingId(null);
        resetForm();
      }
    } else {
      const newVehicle = addVehicle({
        ...formData,
        price: Number(formData.price),
        trunkWeight: Number(formData.trunkWeight),
      });
      setVehicles([...vehicles, newVehicle]);
      resetForm();
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);
    setFormData({
      name: vehicle.name,
      category: vehicle.category,
      price: vehicle.price,
      trunkWeight: vehicle.trunkWeight,
      image: vehicle.image,
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule?")) {
      if (deleteVehicle(id)) {
        setVehicles(vehicles.filter((v) => v.id !== id));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Compacts",
      price: 0,
      trunkWeight: 0,
      image: "",
    });
    setEditingId(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <div className="w-full max-w-md">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>

              <h1 className="text-3xl font-bold text-center mb-2">
                Accès Administrateur
              </h1>
              <p className="text-gray-400 text-center mb-8">
                Entrez le code secret pour accéder à la gestion des véhicules
              </p>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Code Secret
                  </label>
                  <input
                    type="password"
                    value={secretInput}
                    onChange={(e) => {
                      setSecretInput(e.target.value);
                      setAuthError("");
                    }}
                    placeholder="Entrez le code secret"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                  {authError && (
                    <p className="text-red-400 text-sm mt-2">{authError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/50"
                >
                  Se Connecter
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-gray-400 text-xs text-center">
                  Page réservée aux administrateurs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Gestion Véhicules</h1>
              <p className="text-gray-400">
                Ajouter, modifier ou supprimer des véhicules du catalogue
              </p>
            </div>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                resetForm();
              }}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 p-6 sticky top-20">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Plus className="w-6 h-6 text-amber-400" />
                  {editingId ? "Modifier Véhicule" : "Ajouter Véhicule"}
                </h2>

                <form onSubmit={handleAddVehicle} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Nom du Véhicule
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Ex: Blista"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Catégorie
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as VehicleCategory,
                        })
                      }
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Prix ($)
                    </label>
                    <input
                      type="number"
                      value={formData.price || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="Ex: 5000"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Poids Coffre (kg)
                    </label>
                    <input
                      type="number"
                      value={formData.trunkWeight || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          trunkWeight: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="Ex: 150"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      URL Image
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="https://..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all text-sm"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold py-2 px-4 rounded-lg transition-all text-sm"
                    >
                      {editingId ? "Mettre à Jour" : "Ajouter"}
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300 font-semibold py-2 px-4 rounded-lg transition-all text-sm"
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Vehicles List Section */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un véhicule par nom..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>

                {/* Vehicles by Category */}
                <div className="max-h-[calc(100vh-280px)] overflow-y-auto pr-2 space-y-6">
                  {vehicles.length === 0 ? (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 p-8 text-center">
                      <p className="text-gray-400">
                        Aucun véhicule dans le catalogue
                      </p>
                    </div>
                  ) : (
                    CATEGORIES.map((category) => {
                      const categoryVehicles = vehicles
                        .filter((v) => v.category === category)
                        .filter((v) =>
                          v.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()),
                        );

                      if (categoryVehicles.length === 0) return null;

                      return (
                        <div key={category}>
                          <h3 className="text-lg font-bold text-amber-400 mb-3">
                            {category}
                          </h3>
                          <div className="space-y-2">
                            {categoryVehicles.map((vehicle) => (
                              <div
                                key={vehicle.id}
                                className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border p-4 flex items-center gap-4 transition-all ${
                                  editingId === vehicle.id
                                    ? "border-amber-500/50 shadow-lg shadow-amber-500/20"
                                    : "border-gray-700 hover:border-amber-500/30"
                                }`}
                              >
                                <img
                                  src={vehicle.image}
                                  alt={vehicle.name}
                                  className="w-16 h-16 rounded object-cover flex-shrink-0"
                                />

                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-lg text-white">
                                    {vehicle.name}
                                  </h3>
                                  <p className="text-sm text-gray-400">
                                    {vehicle.price
                                      .toString()
                                      .replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ".",
                                      )}{" "}
                                    $ • {vehicle.trunkWeight} kg
                                  </p>
                                </div>

                                <div className="flex gap-2 flex-shrink-0">
                                  <button
                                    onClick={() => handleEdit(vehicle)}
                                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded transition-all"
                                    title="Modifier"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(vehicle.id)}
                                    className="bg-red-600 hover:bg-red-500 text-white p-2 rounded transition-all"
                                    title="Supprimer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
