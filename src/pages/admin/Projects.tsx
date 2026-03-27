import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Tractor, Plus, Trash2, Edit } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  totalAcreage: number;
  availableAcreage: number;
  cropType: string;
  status: string;
  createdAt: any;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    totalAcreage: '',
    cropType: '',
    status: 'funding'
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, 'projects'));
      const snapshot = await getDocs(q);
      const projectData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const acreage = Number(formData.totalAcreage);
      await addDoc(collection(db, 'projects'), {
        name: formData.name,
        description: formData.description,
        totalAcreage: acreage,
        availableAcreage: acreage,
        cropType: formData.cropType,
        status: formData.status,
        createdAt: serverTimestamp()
      });
      setIsCreating(false);
      setFormData({ name: '', description: '', totalAcreage: '', cropType: '', status: 'funding' });
      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project.");
    }
  };

  if (loading) return <div className="p-8">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Farm Projects</h1>
          <p className="text-slate-500">Manage Farm For Me projects and acreage.</p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)} className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          {isCreating ? 'Cancel' : 'New Project'}
        </Button>
      </div>

      {isCreating && (
        <Card className="border-none shadow-sm bg-slate-50">
          <CardContent className="p-6">
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
                  <Input 
                    required 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    placeholder="e.g., Maize Farm 2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Crop Type</label>
                  <Input 
                    required 
                    value={formData.cropType} 
                    onChange={e => setFormData({...formData, cropType: e.target.value})} 
                    placeholder="e.g., Maize, Soybeans"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Total Acreage</label>
                  <Input 
                    required 
                    type="number" 
                    min="1"
                    value={formData.totalAcreage} 
                    onChange={e => setFormData({...formData, totalAcreage: e.target.value})} 
                    placeholder="e.g., 500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="funding">Funding Phase</option>
                    <option value="active">Active Farming</option>
                    <option value="harvested">Harvested</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] min-h-[80px]"
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  placeholder="Project details..."
                />
              </div>
              <Button type="submit">Create Project</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="border-none shadow-sm overflow-hidden">
            <div className="h-32 w-full relative bg-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1592982537447-6f2a6a0a3023?q=80&w=800&auto=format&fit=crop" 
                alt="Farm Project" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full shadow-sm ${
                  project.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 
                  project.status === 'funding' ? 'bg-amber-100 text-amber-800' : 
                  'bg-white text-slate-800'
                }`}>
                  {project.status.toUpperCase()}
                </span>
              </div>
            </div>
            <CardHeader className="pb-2 pt-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center">
                  <Tractor className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
                  {project.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Crop:</span>
                  <span className="font-medium text-slate-900">{project.cropType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Acreage:</span>
                  <span className="font-medium text-slate-900">{project.totalAcreage} acres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Available:</span>
                  <span className="font-medium text-[var(--color-primary)]">{project.availableAcreage} acres</span>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {projects.length === 0 && !isCreating && (
          <div className="col-span-full p-8 text-center text-slate-500 bg-white rounded-lg border border-dashed border-slate-300">
            No projects found. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );
}
