import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ArrowRight, CheckCircle2, Tractor, Sprout, Building2, LineChart, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[var(--color-primary-dark)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?q=80&w=2070&auto=format&fit=crop" 
            alt="Mechanized Farming" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Own a Farm Without Farming.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
              Invest in agriculture with confidence. EdOak Farms is a fully managed agribusiness platform allowing individuals and institutions to benefit from mechanized, irrigated farming and value-added processing.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white border-none">
                  Get Started
                </Button>
              </Link>
              <Link to="/farm-for-me">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-[var(--color-primary-dark)]">
                  Explore Farm For Me
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { icon: ShieldCheck, text: "Fully Managed Model" },
              { icon: Tractor, text: "Mechanized Operations" },
              { icon: Sprout, text: "Irrigation-Backed" },
              { icon: LineChart, text: "Real-Time Updates" },
              { icon: Building2, text: "Value-Added Processing" },
              { icon: CheckCircle2, text: "Transparent Allocation" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center justify-center space-y-2">
                <item.icon className="w-6 h-6 text-[var(--color-accent)]" />
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary-dark)] mb-4">
              A Fully Integrated Agricultural Platform
            </h2>
            <p className="text-slate-600 text-lg">
              Beyond our flagship Farm For Me program, EdOak Farms operates across the entire agricultural value chain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Farm For Me", desc: "Our flagship managed investment offering. Own farm production without the operational burden.", highlight: true },
              { title: "Commercial Farming", desc: "Large-scale crop production utilizing modern mechanization and irrigation systems." },
              { title: "Processing & Value Addition", desc: "Transforming raw crops like cassava into higher-value finished and semi-finished products." },
              { title: "Farm Management", desc: "Professional setup and management of agricultural assets for landowners and third-party investors." },
              { title: "Agricultural Consulting", desc: "Expert advisory services in farm strategy, irrigation planning, and agribusiness structuring." },
              { title: "Produce Supply & Logistics", desc: "Reliable sourcing, aggregation, and delivery of agricultural produce to institutional buyers." }
            ].map((service, i) => (
              <Card key={i} className={`h-full transition-shadow hover:shadow-md ${service.highlight ? 'border-[var(--color-accent)] shadow-sm' : ''}`}>
                <CardContent className="p-8 flex flex-col h-full">
                  {service.highlight && (
                    <span className="inline-block px-3 py-1 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full mb-4 w-fit">
                      FLAGSHIP OFFERING
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-6 flex-grow">{service.desc}</p>
                  <Link to="/services" className="text-[var(--color-primary)] font-medium flex items-center hover:text-[var(--color-primary-light)]">
                    Learn more <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Farm For Me Feature */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-primary-dark)] mb-6">
                How "Farm For Me" Works
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                A structured, transparent, and scalable way to participate in agriculture. We handle the land, the labor, and the logistics. You track the progress.
              </p>
              
              <div className="space-y-6">
                {[
                  { step: "01", title: "Select Your Package", desc: "Choose your desired acreage or investment option through our secure portal." },
                  { step: "02", title: "Farm Allocation", desc: "We assign a specific, mapped block of land to your portfolio." },
                  { step: "03", title: "Professional Execution", desc: "Our team handles land prep, planting, irrigation, and crop care." },
                  { step: "04", title: "Real-Time Updates", desc: "Track every stage of your farm's lifecycle via your investor dashboard." },
                  { step: "05", title: "Harvest & Returns", desc: "Produce is harvested, processed, or sold, and outcomes are delivered to you." }
                ].map((item, i) => (
                  <div key={i} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] text-white flex items-center justify-center font-bold font-serif">
                        {item.step}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <Link to="/farm-for-me">
                  <Button size="lg">Explore Packages</Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              {/* Mock Dashboard Preview */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs font-medium text-slate-500">Investor Dashboard Preview</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Block A-14 (Cassava)</h3>
                      <p className="text-sm text-slate-500">5 Acres â Assigned</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">ACTIVE</span>
                  </div>
                  
                  <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {/* Timeline Item */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-emerald-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-slate-900">Land Preparation</div>
                          <div className="text-xs text-slate-500">Oct 12</div>
                        </div>
                        <div className="text-sm text-slate-600">Clearing and ploughing completed.</div>
                      </div>
                    </div>
                    
                    {/* Timeline Item */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[var(--color-primary)] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <Sprout className="w-5 h-5" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-[var(--color-primary)] shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-[var(--color-primary-dark)]">Planting Ongoing</div>
                          <div className="text-xs text-[var(--color-primary)] font-medium">Today</div>
                        </div>
                        <div className="text-sm text-slate-600">Stem cuttings being planted across all 5 acres.</div>
                      </div>
                    </div>
                    
                    {/* Timeline Item */}
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <Tractor className="w-5 h-5" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 opacity-60">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-slate-700">Fertilizer Application</div>
                          <div className="text-xs text-slate-500">Scheduled</div>
                        </div>
                        <div className="text-sm text-slate-600">First round of NPK application.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--color-primary)] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Build Your Agricultural Portfolio?
          </h2>
          <p className="text-emerald-100 text-lg mb-10">
            Join hundreds of investors and institutions leveraging EdOak Farms' operational excellence for reliable agricultural returns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-[var(--color-primary-dark)] hover:bg-slate-100 w-full sm:w-auto">
                Create an Account
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--color-primary-dark)] w-full sm:w-auto">
                Request a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
