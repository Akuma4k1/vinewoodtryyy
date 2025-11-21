import { Users, Award, Handshake } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function About() {
  const teamMembers = [
    {
      name: "Gabriel",
      role: "Fondateur & Directeur Général",
      description: "Passionné d'automobiles d'exception et entrepreneur visionnaire, Gabriel a fondé ELITE Vinewood avec l'ambition d'offrir une expérience unique aux amateurs de véhicules de luxe de Los Santos.",
      image:
        "https://i.ibb.co/SD3CYD3C/image.png",
    },
    {
      name: "Nicolas",
      role: "Manager Général",
      description: "Passionné par l'univers automobile et le service haut de gamme, Nicolas occupe le poste de Manager Général chez ELITE Vinewood à Los Santos.",
      image:
        "https://i.ibb.co/FbpSqmXF/Nicolas.png",
    },
    {
      name: "Bryan",
      role: "Résponsable formation",
      description: "Expert en gestion des talents et passionné par le développement professionnel, Bryan occupe le poste de Responsable Formation chez ELITE Vinewood à Los Santos.",
      image:
        "https://i.ibb.co/TBMpdTH7/Bryan.png",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 via-black to-black py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            À Propos de <span className="text-amber-400">ELITE</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Découvrez l'histoire et la philosophie d'ELITE Vinewood Auto
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Company Story */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Notre Histoire
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  Fondée il y a plus d'une décennie, ELITE Vinewood Auto est
                  devenue le concessionnaire de référence à Vinewood. Notre
                  engagement envers l'excellence et la satisfaction client nous
                  a permis de bâtir une réputation solide dans l'industrie
                  automobile premium.
                </p>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  Nous croyons que chaque client mérite une expérience
                  exceptionnelle. C'est pourquoi nous proposons une large
                  sélection de véhicules de qualités, des prix compétitifs et un
                  service impeccable.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Notre équipe d'experts est toujours prête à vous aider à
                  trouver le véhicule parfait qui correspond à votre style de
                  vie et à vos besoins.
                </p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8 border border-gray-700">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-amber-400">
                        10+ Ans
                      </h3>
                      <p className="text-gray-400">
                        D'expérience dans le secteur automobile premium
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-blue-400">
                        1000+ Clients
                      </h3>
                      <p className="text-gray-400">
                        Satisfaits à travers Vinewood et au-delà
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Handshake className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-green-400">
                        200+ Véhicules
                      </h3>
                      <p className="text-gray-400">
                        Dans notre collection premium sélectionnée
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Notre Équipe
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Rencontrez les professionnels passionnés qui composent ELITE
              Vinewood Auto
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 group"
                >
                  <div className="relative overflow-hidden h-64 bg-gray-900">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-amber-400 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-400">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Intégrité",
                description:
                  "Transparence totale dans tous nos échanges et transactions",
              },
              {
                title: "Excellence",
                description:
                  "Qualité premium en chaque véhicule et chaque service",
              },
              {
                title: "Engagement",
                description:
                  "Dévouement total à la satisfaction de nos clients",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="text-center p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-amber-500/50 transition-all"
              >
                <h3 className="text-2xl font-bold text-amber-400 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-amber-950/50 to-gray-900/50 rounded-lg border border-amber-500/30 p-12">
          <h2 className="text-3xl font-bold mb-6">
            Vous Cherchez le Véhicule Parfait?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Notre équipe d'experts est prête à vous aider
          </p>
          <a
            href="/catalog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/50"
          >
            Explorer le Catalogue
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
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
