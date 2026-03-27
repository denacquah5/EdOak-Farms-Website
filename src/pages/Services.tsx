import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Tractor, Sprout, Building2, Briefcase, Truck, LineChart } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: "farm-for-me",
      icon: LineChart,
      title: "Farm For Me",
      overview: "Our flagship managed investment and participation offering. We allow individuals and institutions to own farm production without the operational burden.",
      benefits: ["Professionally managed", "Transparent reporting", "Scalable returns", "Asset-backed"],
      idealFor: "Busy professionals, diaspora investors, institutions.",
      highlight: true
    },
    {
      id: "commercial-farming",
      icon: Tractor,
      title: "Commercial Farming Operations",
      overview: "Large-scale crop production utilizing modern mechanization, precision agriculture, and year-round irrigation systems to ensure consistent yields.",
      benefits: ["High yield potential", "Mechanized efficiency", "Irrigation-backed", "Quality control"],
      idealFor: "Off-takers, processors, large-scale buyers."
    },
    {
      id: "processing",
      icon: Building2,
      title: "Processing & Value Addition",
      overview: "Transforming raw agricultural commodities (like cassava) into higher-value finished and semi-finished products to capture more margin and stabilize demand.",
      benefits: ["Extended shelf life", "Higher margins", "Market stability", "Quality assurance"],
      idealFor: "FMCG companies, industrial buyers, export markets."
    },
    {
      id: "farm-management",
      icon: Sprout,
      title: "Farm Development & Management",
      overview: "End-to-end setup and management of agricultural assets for landowners and third-party investors. We turn idle land into productive, profitable farms.",
      benefits: ["Turnkey solutions", "Expert agronomy", "Operational structure", "Yield optimization"],
      idealFor: "Landowners, corporate investors, government projects."
    },
    {
      id: "consulting",
      icon: Briefcase,
      title: "Agricultural Consulting",
      overview: "Expert advisory services in farm strategy, technical planning, irrigation design, and agribusiness structuring for new and existing ventures.",
      benefits: ["Strategic insight", "Risk mitigation", "Technical expertise", "Financial modeling"],
      idealFor: "New farmers, agribusiness startups, NGOs."
    },
    {
      id: "logistics",
      icon: Truck,
      title: "Produce Supply & Logistics",
      overview: "Reliable sourcing, aggregation, and delivery of agricultural produce. We bridge the gap between the farm gate and the factory or market.",
      benefits: ["Reliable supply", "Quality aggregation", "Efficient transport", "Traceability"],
      idealFor: "Processors, institutional buyers, markets."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[var(--color-primary-dark)] py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Our Services</h1>
        <p className="text-lg text-emerald-100 max-w-2xl mx-auto px-4">
          A fully integrated suite of agribusiness solutions designed for scale, efficiency, and profitability.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, i) => (
            <Card key={i} id={service.id} className={`overflow-hidden border-none shadow-md ${service.highlight ? 'ring-2 ring-[var(--color-accent)]' : ''}`}>
              <CardContent className="p-0">
                <div className={`p-8 ${service.highlight ? 'bg-[var(--color-primary-dark)] text-white' : 'bg-white'}`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${service.highlight ? 'bg-[var(--color-accent)]' : 'bg-emerald-50'}`}>
                      <service.icon className={`w-7 h-7 ${service.highlight ? 'text-white' : 'text-[var(--color-primary)]'}`} />
                    </div>
                    {service.highlight && (
                      <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                        Flagship
                      </span>
                    )}
                  </div>
                  
                  <h2 className={`text-2xl font-serif font-bold mb-4 ${service.highlight ? 'text-white' : 'text-slate-900'}`}>
                    {service.title}
                  </h2>
                  
                  <p className={`mb-8 leading-relaxed ${service.highlight ? 'text-slate-300' : 'text-slate-600'}`}>
                    {service.overview}
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className={`text-sm font-bold uppercase tracking-wider mb-3 ${service.highlight ? 'text-emerald-400' : 'text-slate-400'}`}>
                        Key Benefits
                      </h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {service.benefits.map((benefit, j) => (
                          <li key={j} className={`flex items-center text-sm ${service.highlight ? 'text-slate-200' : 'text-slate-700'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${service.highlight ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-primary)]'}`}></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${service.highlight ? 'text-emerald-400' : 'text-slate-400'}`}>
                        Ideal For
                      </h4>
                      <p className={`text-sm ${service.highlight ? 'text-slate-300' : 'text-slate-600'}`}>
                        {service.idealFor}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-opacity-20 border-slate-400">
                    <Link to={service.id === 'farm-for-me' ? '/farm-for-me' : '/contact'}>
                      <Button 
                        variant={service.highlight ? 'default' : 'outline'} 
                        className={service.highlight ? 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white border-none w-full' : 'w-full'}
                      >
                        {service.id === 'farm-for-me' ? 'Explore Farm For Me' : 'Inquire About Service'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
