import { Card, CardContent } from '../components/ui/Card';
import { Tractor, Droplets, Sprout, PackageSearch, Truck, BarChart3 } from 'lucide-react';

export default function Operations() {
  const operations = [
    {
      icon: Tractor,
      title: "Mechanization",
      desc: "We deploy modern tractors, ploughs, harrows, and planters to ensure precision, speed, and scale in land preparation and planting. This reduces labor dependency and increases yield consistency."
    },
    {
      icon: Droplets,
      title: "Irrigation Systems",
      desc: "Agriculture shouldn't stop when the rain stops. We utilize advanced irrigation infrastructure to guarantee year-round production, mitigating climate risks and ensuring reliable supply."
    },
    {
      icon: Sprout,
      title: "Farm Operations",
      desc: "From seed selection and bed formation to crop care and fertilizer application, our agronomists manage every field operation with strict adherence to best practices and standard operating procedures."
    },
    {
      icon: PackageSearch,
      title: "Processing & Post-Harvest",
      desc: "Value addition is key to our model. We process raw crops into higher-value products, employing quality handling, sorting, and packaging to meet industrial and consumer standards."
    },
    {
      icon: Truck,
      title: "Supply Chain & Logistics",
      desc: "We manage the movement of produce from the farm gate to the processing line or final buyer. Our logistics network ensures timely delivery and minimal post-harvest losses."
    },
    {
      icon: BarChart3,
      title: "Monitoring & Reporting",
      desc: "Data drives our decisions. We track field activities, inventory usage, and crop health, providing real-time updates to our Farm For Me investors and management team via our digital platform."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[var(--color-primary-dark)] py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">How We Work</h1>
        <p className="text-lg text-emerald-100 max-w-2xl mx-auto px-4">
          An inside look at the operational intelligence and infrastructure powering EdOak Farms.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">Operational Excellence</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            At EdOak Farms, we treat agriculture as a precision industry. Our operations are structured, data-driven, and designed to maximize yield while minimizing risk. We control the entire value chain to ensure quality and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {operations.map((op, i) => (
            <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow bg-slate-50">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
                  <op.icon className="w-7 h-7 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{op.title}</h3>
                <p className="text-slate-600 leading-relaxed">{op.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-32">
          <h2 className="text-3xl font-serif font-bold text-center text-slate-900 mb-16">The Production Cycle</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { step: "01", title: "Land Prep", desc: "Clearing, ploughing, and harrowing." },
                { step: "02", title: "Planting", desc: "Precision seeding and bed formation." },
                { step: "03", title: "Crop Care", desc: "Irrigation, weeding, and fertilizing." },
                { step: "04", title: "Harvest", desc: "Mechanized and manual harvesting." },
                { step: "05", title: "Value Add", desc: "Processing, packaging, and sales." }
              ].map((phase, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center font-serif font-bold text-xl mb-4 shadow-lg ring-4 ring-white">
                    {phase.step}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{phase.title}</h4>
                  <p className="text-sm text-slate-600">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
