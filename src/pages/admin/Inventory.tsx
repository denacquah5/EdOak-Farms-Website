import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Package, Plus, Trash2, Edit, AlertCircle } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minThreshold: number;
  lastUpdated: any;
}

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'seeds',
    quantity: '',
    unit: 'kg',
    minThreshold: ''
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const q = query(collection(db, 'inventory'));
      const snapshot = await getDocs(q);
      const inventoryData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as InventoryItem[];
      setItems(inventoryData);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'inventory'), {
        name: formData.name,
        category: formData.category,
        quantity: Number(formData.quantity),
        unit: formData.unit,
        minThreshold: Number(formData.minThreshold),
        lastUpdated: serverTimestamp()
      });
      setIsCreating(false);
      setFormData({ name: '', category: 'seeds', quantity: '', unit: 'kg', minThreshold: '' });
      fetchInventory();
    } catch (error) {
      console.error("Error creating inventory item:", error);
      alert("Failed to add item.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDoc(doc(db, 'inventory', id));
      fetchInventory();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  const handleUpdateQuantity = async (id: string, currentQty: number, change: number) => {
    const newQty = Math.max(0, currentQty + change);
    try {
      await updateDoc(doc(db, 'inventory', id), {
        quantity: newQty,
        lastUpdated: serverTimestamp()
      });
      setItems(items.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity.");
    }
  };

  if (loading) return <div className="p-8">Loading inventory...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-500">Track seeds, fertilizers, equipment, and supplies.</p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)} className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          {isCreating ? 'Cancel' : 'Add Item'}
        </Button>
      </div>

      {isCreating && (
        <Card className="border-none shadow-sm bg-slate-50">
          <CardContent className="p-6">
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Item Name</label>
                  <Input 
                    required 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    placeholder="e.g., NPK 15-15-15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="seeds">Seeds</option>
                    <option value="fertilizer">Fertilizer</option>
                    <option value="chemicals">Chemicals</option>
                    <option value="equipment">Equipment</option>
                    <option value="packaging">Packaging</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                  <Input 
                    required 
                    type="number" 
                    min="0"
                    step="0.1"
                    value={formData.quantity} 
                    onChange={e => setFormData({...formData, quantity: e.target.value})} 
                    placeholder="e.g., 50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
                  <select 
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    value={formData.unit}
                    onChange={e => setFormData({...formData, unit: e.target.value})}
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="bags">Bags</option>
                    <option value="liters">Liters (L)</option>
                    <option value="pieces">Pieces</option>
                    <option value="tons">Tons</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Low Stock Alert Threshold</label>
                  <Input 
                    required 
                    type="number" 
                    min="0"
                    value={formData.minThreshold} 
                    onChange={e => setFormData({...formData, minThreshold: e.target.value})} 
                    placeholder="e.g., 10"
                  />
                </div>
              </div>
              <Button type="submit">Add to Inventory</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-6 py-3">Item</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Stock Level</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const isLowStock = item.quantity <= item.minThreshold;
                  return (
                    <tr key={item.id} className="bg-white border-b border-slate-100">
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center">
                        <Package className="w-4 h-4 mr-2 text-slate-400" />
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500 capitalize">
                        {item.category}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                            className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
                          >-</button>
                          <span className="font-medium w-16 text-center">
                            {item.quantity} {item.unit}
                          </span>
                          <button 
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                            className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
                          >+</button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {isLowStock ? (
                          <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800">
                            <AlertCircle className="w-3 h-3 mr-1" /> Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {items.length === 0 && !isCreating && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      No items in inventory. Add items to start tracking.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
