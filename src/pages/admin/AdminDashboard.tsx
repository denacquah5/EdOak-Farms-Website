import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { Users, Tractor, Sprout, Package, AlertCircle } from 'lucide-react';

function Overview() {
  const { profile } = useAuth();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500">Welcome back, {profile?.displayName}. Here's an overview of EdOak Farms operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Clients</p>
              <h3 className="text-2xl font-bold text-slate-900">124</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <Sprout className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Acres</p>
              <h3 className="text-2xl font-bold text-slate-900">1,450</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Tractor className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Projects</p>
              <h3 className="text-2xl font-bold text-slate-900">8</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Inquiries</p>
              <h3 className="text-2xl font-bold text-slate-900">12</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Inquiries</h2>
            <button className="text-sm font-medium text-[var(--color-primary)] hover:underline">View all</button>
          </div>
          <Card className="border-none shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {[
                  { name: "Kwame Mensah", interest: "Farm For Me", date: "2 hours ago", status: "New" },
                  { name: "Sarah Jenkins", interest: "Commercial Farming", date: "5 hours ago", status: "New" },
                  { name: "AgriCorp Ltd", interest: "Produce Supply", date: "1 day ago", status: "Contacted" },
                ].map((inquiry, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{inquiry.name}</h4>
                      <p className="text-xs text-slate-500">{inquiry.interest} â {inquiry.date}</p>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                      inquiry.status === 'New' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Active Projects</h2>
            <button className="text-sm font-medium text-[var(--color-primary)] hover:underline">Manage</button>
          </div>
          <Card className="border-none shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {[
                  { name: "Eastern Region Cassava", acres: "500", clients: 45, progress: 35 },
                  { name: "Northern Maize Hub", acres: "800", clients: 72, progress: 60 },
                  { name: "Volta Soy Project", acres: "150", clients: 7, progress: 10 },
                ].map((project, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-bold text-slate-900">{project.name}</h4>
                      <span className="text-xs font-medium text-slate-500">{project.acres} Acres</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-500">{project.clients} Clients Assigned</span>
                      <span className="text-xs font-medium text-[var(--color-primary)]">{project.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-[var(--color-primary)] h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <DashboardLayout isAdmin>
      <Routes>
        <Route path="/" element={<Overview />} />
        {/* Add more routes like /clients, /projects, /inventory as needed */}
      </Routes>
    </DashboardLayout>
  );
}
