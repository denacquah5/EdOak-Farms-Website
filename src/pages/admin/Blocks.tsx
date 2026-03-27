import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Sprout, Plus, Trash2, MapPin } from 'lucide-react';

interface Block {
  id: string;
  projectId: string;
  clientId: string;
  acreage: number;
  status: string;
  assignedAt: any;
}

interface Project {
  id: string;
  name: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
}

export default function Blocks() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    projectId: '',
    clientId: '',
    acreage: '',
    status: 'assigned'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Blocks
      const blocksQ = query(collection(db, 'blocks'));
      const blocksSnapshot = await getDocs(blocksQ);
      const blocksData = blocksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Block[];
      setBlocks(blocksData);

      // Fetch Projects
      const projectsQ = query(collection(db, 'projects'));
      const projectsSnapshot = await getDocs(projectsQ);
      const projectsData = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      })) as Project[];
      setProjects(projectsData);

      // Fetch Clients
      const clientsQ = query(collection(db, 'users')); // Assuming all users can be clients for now
      const clientsSnapshot = await getDocs(clientsQ);
      const clientsData = clientsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().displayName || 'Unknown',
        email: doc.data().email
      })) as Client[];
      setClients(clientsData);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'blocks'), {
        projectId: formData.projectId,
        clientId: formData.clientId,
        acreage: Number(formData.acreage),
        status: formData.status,
        assignedAt: serverTimestamp()
      });
      setIsCreating(false);
      setFormData({ projectId: '', clientId: '', acreage: '', status: 'assigned' });
      fetchData();
    } catch (error) {
      console.error("Error creating block:", error);
      alert("Failed to create block.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this block?")) return;
    try {
      await deleteDoc(doc(db, 'blocks', id));
      fetchData();
    } catch (error) {
      console.error("Error deleting block:", error);
      alert("Failed to delete block.");
    }
  };

  const getProjectName = (id: string) => projects.find(p => p.id === id)?.name || 'Unknown Project';
  const getClientName = (id: string) => clients.find(c => c.id === id)?.name || 'Unknown Client';

  if (loading) return <div className="p-8">Loading blocks...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Farm Blocks</h1>
          <p className="text-slate-500">Manage individual farm blocks assigned to clients.</p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)} className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          {isCreating ? 'Cancel' : 'Assign Block'}
        </Button>
      </div>

      {isCreating && (
        <Card className="border-none shadow-sm bg-slate-50">
          <CardContent className="p-6">
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Project</label>
                  <select 
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={formData.projectId}
                    onChange={e => setFormData({...formData, projectId: e.target.value})}
                  >
                    <option value="">-- Select Project --</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Client</label>
                  <select 
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={formData.clientId}
                    onChange={e => setFormData({...formData, clientId: e.target.value})}
                  >
                    <option value="">-- Select Client --</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Acreage</label>
                  <Input 
                    required 
                    type="number" 
                    min="0.1"
                    step="0.1"
                    value={formData.acreage} 
                    onChange={e => setFormData({...formData, acreage: e.target.value})} 
                    placeholder="e.g., 5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="assigned">Assigned</option>
                    <option value="active">Active</option>
                    <option value="harvested">Harvested</option>
                  </select>
                </div>
              </div>
              <Button type="submit">Assign Block</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blocks.map((block) => (
          <Card key={block.id} className="border-none shadow-sm overflow-hidden">
            <div className="h-32 w-full relative bg-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1595844730298-b960fad97301?q=80&w=800&auto=format&fit=crop" 
                alt="Farm Block" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full shadow-sm ${
                  block.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 
                  block.status === 'assigned' ? 'bg-blue-100 text-blue-800' : 
                  'bg-white text-slate-800'
                }`}>
                  {block.status.toUpperCase()}
                </span>
              </div>
            </div>
            <CardHeader className="pb-2 pt-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
                  Block {block.id.slice(0, 6)}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm mt-2">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Project:</span>
                  <span className="font-medium text-slate-900">{getProjectName(block.projectId)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500">Client:</span>
                  <span className="font-medium text-slate-900">{getClientName(block.clientId)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Acreage:</span>
                  <span className="font-medium text-[var(--color-primary)]">{block.acreage} acres</span>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleDelete(block.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {blocks.length === 0 && !isCreating && (
          <div className="col-span-full p-8 text-center text-slate-500 bg-white rounded-lg border border-dashed border-slate-300">
            No blocks assigned yet. Assign a block to a client to get started.
          </div>
        )}
      </div>
    </div>
  );
}
