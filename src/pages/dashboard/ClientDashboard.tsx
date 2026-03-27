import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { Sprout, TrendingUp, Clock, FileText, CheckCircle2 } from 'lucide-react';

function Overview() {
  const { profile } = useAuth();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {profile?.displayName?.split(' ')[0]}</h1>
        <p className="text-slate-500">Here is an overview of your Farm For Me portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <Sprout className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Acreage</p>
              <h3 className="text-2xl font-bold text-slate-900">5 Acres</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Projects</p>
              <h3 className="text-2xl font-bold text-slate-900">1</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Est. Harvest</p>
              <h3 className="text-2xl font-bold text-slate-900">Oct 2026</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Active Farms</h2>
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="h-48 bg-slate-200 relative">
              <img 
                src="https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?q=80&w=2070&auto=format&fit=crop" 
                alt="Farm Block" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-emerald-700 shadow-sm">
                ACTIVE
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Block A-14</h3>
                  <p className="text-slate-500">Cassava Production â 5 Acres</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Current Stage</p>
                  <p className="font-medium text-slate-900">Crop Care (Month 3)</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Location</p>
                  <p className="font-medium text-slate-900">Eastern Region Site</p>
                </div>
              </div>
              
              <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
                <div className="bg-[var(--color-primary)] h-2.5 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <p className="text-xs text-slate-500 text-right">35% to Harvest</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Recent Updates</h2>
          <Card className="border-none shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {[
                  { title: "Fertilizer Application", date: "2 days ago", desc: "First round of NPK applied successfully.", icon: Sprout },
                  { title: "Weeding Completed", date: "1 week ago", desc: "Manual weeding completed across all 5 acres.", icon: CheckCircle2 },
                  { title: "Planting Finished", date: "3 weeks ago", desc: "Stem cuttings planted.", icon: Sprout },
                ].map((update, i) => (
                  <div key={i} className="p-4 flex items-start space-x-4 hover:bg-slate-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                      <update.icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{update.title}</h4>
                      <p className="text-xs text-slate-500 mb-1">{update.date}</p>
                      <p className="text-sm text-slate-600">{update.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-slate-100 text-center">
                <button className="text-sm font-medium text-[var(--color-primary)] hover:underline">
                  View all updates
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
        {/* Add more routes like /farms, /updates as needed */}
      </Routes>
    </DashboardLayout>
  );
}
