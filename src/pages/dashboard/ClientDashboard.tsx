import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { Sprout, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

// Import sub-pages
import { Notifications } from './Notifications';
import { MyFarms } from './MyFarms';
import { Updates } from './Updates';
import { Settings } from './Settings';

function Overview() {
  const { profile } = useAuth();
  
  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-[var(--color-primary-dark)] h-48 flex items-center px-8 shadow-md">
        <motion.div 
          className="absolute inset-0 opacity-40"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        >
          <img 
            src="https://images.unsplash.com/photo-1595844730298-b960fad97301?q=80&w=2070&auto=format&fit=crop" 
            alt="Farm Operations" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Welcome back, {profile?.displayName?.split(' ')[0] || 'Investor'}</h1>
          <p className="text-emerald-50 text-lg">Here is an overview of your Farm For Me portfolio.</p>
        </motion.div>
      </div>

      {/* Portfolio Summary */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Portfolio Summary</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500 mb-1">Amount Invested</p>
              <h3 className="text-2xl font-bold text-slate-900">GHS 25,000</h3>
              <div className="mt-2 flex items-center text-xs text-emerald-600 font-medium">
                <TrendingUp className="w-3 h-3 mr-1" /> Active Portfolio
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500 mb-1">Active Acreage</p>
              <h3 className="text-2xl font-bold text-slate-900">5 Acres</h3>
              <div className="mt-2 text-xs text-slate-500">
                Across 1 project
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-slate-500 mb-1">Projected Output</p>
              <h3 className="text-2xl font-bold text-slate-900">40 Tons</h3>
              <div className="mt-2 text-xs text-slate-500">
                Cassava yield
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-[var(--color-primary)] text-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <p className="text-sm font-medium text-emerald-100 mb-1">Returns / Outcomes</p>
              <h3 className="text-2xl font-bold text-white">Pending</h3>
              <div className="mt-2 text-xs text-emerald-50 font-medium flex items-center">
                <Clock className="w-3 h-3 mr-1" /> Est. Harvest Oct 2026
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Farm Allocation Details</h2>
          <Card className="border-none shadow-sm overflow-hidden group">
            <div className="h-56 bg-slate-200 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?q=80&w=2070&auto=format&fit=crop" 
                alt="Farm Block" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-md shadow-sm">
                      ACTIVE
                    </span>
                    <span className="px-2.5 py-1 bg-white/20 backdrop-blur text-white text-xs font-medium rounded-md">
                      Cassava
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Block A-14</h3>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 text-sm font-bold">5 Acres</p>
                  <p className="text-slate-200 text-sm">Eastern Region</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Package</p>
                  <p className="font-medium text-slate-900">Standard Cassava</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Stage</p>
                  <p className="font-medium text-slate-900">Crop Care (M3)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Planted</p>
                  <p className="font-medium text-slate-900">Jan 15, 2026</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Manager</p>
                  <p className="font-medium text-slate-900">K. Mensah</p>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-slate-700">Growth Progress</span>
                  <span className="text-sm font-bold text-[var(--color-primary)]">35%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 mb-2">
                  <div className="bg-[var(--color-primary)] h-2.5 rounded-full relative" style={{ width: '35%' }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-[var(--color-primary)] rounded-full shadow-sm"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>Planted</span>
                  <span>Harvest (Oct '26)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Recent Updates</h2>
          <Card className="border-none shadow-sm h-[calc(100%-2.5rem)] flex flex-col">
            <CardContent className="p-0 flex flex-col flex-grow">
              <div className="divide-y divide-slate-100 flex-grow">
                {[
                  { title: "Fertilizer Application", date: "2 days ago", desc: "First round of NPK applied successfully.", icon: Sprout },
                  { title: "Weeding Completed", date: "1 week ago", desc: "Manual weeding completed across all 5 acres.", icon: CheckCircle2 },
                  { title: "Planting Finished", date: "3 weeks ago", desc: "Stem cuttings planted.", icon: Sprout },
                ].map((update, i) => (
                  <div key={i} className="p-5 flex items-start space-x-4 hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <update.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{update.title}</h4>
                      <p className="text-xs text-[var(--color-primary)] font-medium mb-1">{update.date}</p>
                      <p className="text-sm text-slate-600 leading-relaxed">{update.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-slate-100 text-center bg-slate-50 rounded-b-xl mt-auto">
                <button className="text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors">
                  View all updates &rarr;
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function ClientDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/farms" element={<MyFarms />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
}
