import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { CheckCircle2, ArrowRight, ShieldCheck, TrendingUp, Clock, FileText, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

export default function FarmForMe() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-[var(--color-primary-dark)] py-24 lg:py-32 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-30"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        >
          <img 
            src="https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?q=80&w=2070&auto=format&fit=crop" 
            alt="Farm For Me" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 bg-[var(--color-accent)] text-white text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
            Flagship Offering
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Farm For Me
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            A fully managed agricultural participation model. We handle the land, labor, and logistics. You track the progress and reap the returns.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/signup">
              <Button size="lg" className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white border-none">
                Join Farm For Me
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--color-primary-dark)]">
                Speak With Our Team
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* What is Farm For Me */}
        <div className="mb-24 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-[var(--color-primary-dark)] mb-6">What is Farm For Me?</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Farm For Me is EdOak Farms' premier managed investment and participation program. It is designed for busy professionals, diaspora investors, institutions, and landowners who want exposure to the lucrative agricultural sector but lack the time, technical expertise, or operational capacity to farm themselves.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: ShieldCheck, title: "Professionally Managed", desc: "Expert agronomists and farm managers handle every aspect of production, from land prep to harvest.", image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop" },
            { icon: Smartphone, title: "Transparent & Update-Driven", desc: "Monitor your farm's progress through our secure investor dashboard with real-time photos and reports.", image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop" },
            { icon: TrendingUp, title: "Scalable Returns", desc: "Benefit from economies of scale, mechanization, and our integrated value-addition processing.", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop" }
          ].map((benefit, i) => (
            <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 w-full relative">
                <img src={benefit.image} alt={benefit.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-24">
          <h2 className="text-3xl font-serif font-bold text-center text-[var(--color-primary-dark)] mb-16">How It Works</h2>
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Sign Up & Select", desc: "Create an account and choose your desired acreage or investment package." },
                { step: "2", title: "Allocation", desc: "EdOak assigns a specific, mapped farm block to your portfolio." },
                { step: "3", title: "Execution & Tracking", desc: "We execute operations while you receive regular updates via your dashboard." },
                { step: "4", title: "Harvest & Returns", desc: "Produce is sold or processed, and financial outcomes are delivered." }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-white rounded-full border-4 border-[var(--color-primary-light)] flex items-center justify-center mb-6 shadow-sm">
                    <span className="text-3xl font-serif font-bold text-[var(--color-primary)]">{item.step}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Investment Options (Placeholders) */}
        <div className="mb-24">
          <h2 className="text-3xl font-serif font-bold text-center text-[var(--color-primary-dark)] mb-12">Participation Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Starter Block", acres: "1 - 5 Acres", crop: "Cassava", duration: "12 Months", price: "Contact for pricing" },
              { name: "Commercial Block", acres: "10 - 50 Acres", crop: "Maize / Soy", duration: "6 Months", price: "Contact for pricing", highlight: true },
              { name: "Institutional Portfolio", acres: "100+ Acres", crop: "Mixed Portfolio", duration: "Custom", price: "Custom structuring" }
            ].map((pkg, i) => (
              <Card key={i} className={`relative overflow-hidden ${pkg.highlight ? 'border-[var(--color-accent)] shadow-lg scale-105 z-10' : 'border-slate-200 shadow-sm'}`}>
                {pkg.highlight && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-[var(--color-accent)]"></div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-serif font-bold text-[var(--color-primary)] mb-6">{pkg.acres}</div>
                  
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3" />
                      <span>Crop: <strong>{pkg.crop}</strong></span>
                    </li>
                    <li className="flex items-center text-slate-600">
                      <Clock className="w-5 h-5 text-emerald-500 mr-3" />
                      <span>Duration: <strong>{pkg.duration}</strong></span>
                    </li>
                    <li className="flex items-center text-slate-600">
                      <FileText className="w-5 h-5 text-emerald-500 mr-3" />
                      <span>Full Management & Reporting</span>
                    </li>
                  </ul>
                  
                  <div className="text-center mb-8 font-medium text-slate-900 border-t border-slate-100 pt-6">
                    {pkg.price}
                  </div>
                  
                  <Link to="/contact">
                    <Button className="w-full" variant={pkg.highlight ? 'default' : 'outline'}>
                      Request Information
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-serif font-bold text-center text-[var(--color-primary-dark)] mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How do I join Farm For Me?", a: "Simply create an account, browse available projects, and request an allocation. Our team will contact you to finalize the agreement." },
              { q: "Will I know where my farm is?", a: "Yes. Every client is assigned a specific, mapped block within our commercial farms. You will know exactly where your investment is located." },
              { q: "Can I get updates on my farm?", a: "Absolutely. Our investor dashboard provides real-time updates, photos, and reports on every stage of the farming cycle." },
              { q: "Is my farm professionally managed?", a: "Yes. EdOak Farms utilizes expert agronomists, modern mechanization, and irrigation to ensure optimal yields and mitigate risks." }
            ].map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h4 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
