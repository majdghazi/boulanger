import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';

export default function Footer() {
  const services = [
    {
      icon: Truck,
      title: 'Livraison',
      description: 'Livraison à domicile ou en magasin'
    },
    {
      icon: Shield,
      title: 'Garantie',
      description: 'Jusqu\'à 5 ans de garantie'
    },
    {
      icon: RefreshCw,
      title: 'Reprise',
      description: 'Reprise gratuite de l\'ancien appareil'
    },
    {
      icon: Headphones,
      title: 'SAV Expert',
      description: 'Assistance 7j/7 par nos experts'
    }
  ];

  return (
    <footer className="bg-[#003366] text-white">
      {/* Services banner */}
      <div className="border-b border-[#002244]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.title} className="flex items-center gap-3">
                <div className="p-3 bg-[#002244] rounded-lg">
                  <service.icon size={24} className="text-[#ff6600]" />
                </div>
                <div>
                  <div className="font-semibold">{service.title}</div>
                  <div className="text-sm text-gray-300">{service.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">BOULANGER</h3>
            <p className="text-sm text-gray-300">
              Expert en électroménager et multimédia depuis 1954.
              Notre mission : vous accompagner dans tous vos projets d&apos;équipement.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Nos services</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>Livraison & Installation</li>
              <li>Reprise ancien appareil</li>
              <li>Extension de garantie</li>
              <li>Financement</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Aide & Contact</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>Service client</li>
              <li>Suivi de commande</li>
              <li>Retours & Échanges</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shopping Agent IA</h4>
            <p className="text-sm text-gray-300">
              Notre assistant intelligent vous aide à trouver le produit parfait
              en quelques questions. Propulsé par l&apos;IA générative.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#ff6600] text-white px-4 py-2 rounded-lg text-sm">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Prototype POC
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#002244]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2024 Boulanger - POC Shopping Agent IA</p>
            <p className="text-[#ff6600]">Maquette interactive - Non officiel</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
