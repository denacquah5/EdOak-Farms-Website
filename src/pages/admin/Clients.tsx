import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, Shield, ShieldAlert } from 'lucide-react';

interface User {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  role: string;
  createdAt: any;
}

export default function Clients() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const q = query(collection(db, 'users'));
      const snapshot = await getDocs(q);
      const userData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as User[];
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = async (userId: string, currentRole: string) => {
    try {
      const newRole = currentRole === 'admin' ? 'client' : 'admin';
      await updateDoc(doc(db, 'users', userId), {
        role: newRole
      });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role. Check permissions.");
    }
  };

  if (loading) return <div className="p-8">Loading clients...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Client Management</h1>
          <p className="text-slate-500">Manage users, clients, and administrators.</p>
        </div>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-[var(--color-primary)]" />
            All Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="bg-white border-b border-slate-100">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {user.displayName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {user.role || 'client'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleRole(user.id, user.role)}
                        className="flex items-center"
                      >
                        {user.role === 'admin' ? (
                          <><ShieldAlert className="w-4 h-4 mr-2" /> Revoke Admin</>
                        ) : (
                          <><Shield className="w-4 h-4 mr-2" /> Make Admin</>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-slate-500">
                      No users found.
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
