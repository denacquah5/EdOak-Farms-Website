import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[var(--color-primary-dark)] py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">About EdOak Farms</h1>
        <p className="text-lg text-emerald-100 max-w-2xl mx-auto px-4">
          Building the infrastructure for modern, scalable, and profitable agriculture in Ghana.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">Our Story & Vision</h2>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                EdOak Farms was founded on a simple premise: agriculture in Africa has immense potential, but it requires structure, capital, and professional management to truly scale.
              </p>
              <p>
                We are not just a farm; we are a fully integrated agricultural platform. By combining large-scale commercial farming, modern mechanization, year-round irrigation, and value-added processing, we have built a resilient agribusiness ecosystem.
              </p>
              <p>
                Our flagship offering, <strong>Farm For Me</strong>, was created to bridge the gap between capital and agricultural execution. We allow busy professionals, diaspora investors, and institutions to own and profit from farm production without the operational headaches of day-to-day management.
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop" 
              alt="EdOak Farms Operations" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-serif font-bold text-center text-slate-900 mb-12">The EdOak Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Mechanization", desc: "We utilize modern tractors and implements to ensure efficiency, scale, and precision in all field operations." },
              { title: "Irrigation", desc: "We don't rely solely on rain. Our irrigation systems ensure year-round production and mitigate climate risks." },
              { title: "Value Addition", desc: "We process raw crops into higher-value products, capturing more margin and stabilizing market demand." },
              { title: "Transparency", desc: "Through our investor portal, clients receive real-time updates, photos, and financial reports on their assets." }
            ].map((value, i) => (
              <Card key={i} className="bg-slate-50 border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center mb-4 text-white">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                  <p className="text-slate-600">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[var(--color-background)] rounded-3xl p-12 text-center border border-slate-200">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Partner With Us</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Whether you are looking to invest through Farm For Me, require commercial farm management, or need a reliable produce supplier, EdOak Farms is ready to deliver.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/contact">
              <Button size="lg">Contact Our Team</Button>
            </Link>
            <Link to="/farm-for-me">
              <Button size="lg" variant="outline">Explore Farm For Me</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
