import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';
import { auth, db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { Users, Tractor, Sprout, Package, AlertCircle, Send } from 'lucide-react';
import Clients from './Clients';
import Projects from './Projects';
import Blocks from './Blocks';
import Inventory from './Inventory';

function Overview() {
  const { profile } = useAuth();
  const [clients, setClients] = useState<{id: string, name: string, email: string}[]>([]);
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDesc, setActivityDesc] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const q = query(collection(db, 'users'), where('role', '==', 'client'));
        const snapshot = await getDocs(q);
        const clientData = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().displayName || 'Unknown',
          email: doc.data().email
        }));
        setClients(clientData);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  const handleLogActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !activityTitle || !activityDesc) return;
    
    setIsSubmitting(true);
    setSuccessMsg('');
    
    try {
      // 1. Log the activity
      const activityRef = await addDoc(collection(db, 'activities'), {
        title: activityTitle,
        description: activityDesc,
        blockId: '', // Mocking global or client-specific without a real block
        clientId: selectedClient,
        createdBy: auth.currentUser?.uid,
        createdAt: serverTimestamp(),
        type: 'update'
      });

      // 2. Trigger Notification to the client
      await addDoc(collection(db, 'notifications'), {
        userId: selectedClient,
        title: `Farm Update: ${activityTitle}`,
        message: activityDesc,
        read: false,
        createdAt: serverTimestamp(),
        type: 'activity_update',
        relatedId: activityRef.id
      });

      // 3. Trigger Email (Firebase Extension 'Trigger Email' format)
      const client = clients.find(c => c.id === selectedClient);
      if (client) {
        await addDoc(collection(db, 'mail'), {
          to: [client.email],
          toUids: [selectedClient],
          message: {
            subject: `EdOak Farms Update: ${activityTitle}`,
            html: `
              <div style="font-family: sans-serif; color: #333;">
                <h2>Farm Update</h2>
                <p>Hello ${client.name},</p>
                <p>An update has been posted regarding your farm investment:</p>
                <div style="background: #f8fafc; padding: 16px; border-left: 4px solid #1B4332; margin: 16px 0;">
                  <h3 style="margin-top: 0;">${activityTitle}</h3>
                  <p>${activityDesc}</p>
                </div>
                <p>Log in to your investor portal to see more details.</p>
                <p>Best regards,<br/>EdOak Farms Team</p>
              </div>
            `
          }
        });
      }

      setSuccessMsg('Activity logged and notification sent successfully!');
      setActivityTitle('');
      setActivityDesc('');
      setSelectedClient('');
      
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (error) {
      console.error("Error logging activity:", error);
      alert("Failed to log activity. Check permissions.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-[var(--color-primary-dark)] h-48 flex items-center px-8 shadow-md">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?q=80&w=2070&auto=format&fit=crop" 
            alt="Farm Landscape" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-emerald-50 text-lg">Welcome back, {profile?.displayName}. Here's an overview of EdOak Farms operations.</p>
        </div>
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
            <h2 className="text-xl font-bold text-slate-900">Log Activity & Notify Client</h2>
          </div>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <form onSubmit={handleLogActivity} className="space-y-4">
                {successMsg && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-md text-sm font-medium">
                    {successMsg}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Client</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    required
                  >
                    <option value="">-- Select a Client --</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Activity Title</label>
                  <Input 
                    placeholder="e.g., Planting Completed for Block A" 
                    value={activityTitle}
                    onChange={(e) => setActivityTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent min-h-[100px]"
                    placeholder="Provide details about the activity..."
                    value={activityDesc}
                    onChange={(e) => setActivityDesc(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center">
                  {isSubmitting ? 'Processing...' : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Log Activity & Send Notification
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

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
                      <p className="text-xs text-slate-500">{inquiry.interest} • {inquiry.date}</p>
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
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <DashboardLayout isAdmin>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blocks" element={<Blocks />} />
        <Route path="/inventory" element={<Inventory />} />
        {/* Add more routes like /settings as needed */}
      </Routes>
    </DashboardLayout>
  );
}
