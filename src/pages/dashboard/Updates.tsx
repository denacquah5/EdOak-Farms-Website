import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '../../components/ui/Card';
import { Sprout, CheckCircle2, FileText, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Activity {
  id: string;
  title: string;
  description: string;
  createdAt: any;
  type: string;
}

export function Updates() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Fetch activities for the user
    // In a real app, we might query by blockId. For now, we query by clientId.
    const q = query(
      collection(db, 'activities'),
      where('clientId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const acts: Activity[] = [];
      snapshot.forEach((doc) => {
        acts.push({ id: doc.id, ...doc.data() } as Activity);
      });
      setActivities(acts);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching activities:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Fallback mock data if no real activities exist yet
  const displayActivities = activities.length > 0 ? activities : [
    {
      id: 'mock-1',
      title: 'Fertilizer Application',
      description: 'First round of NPK applied successfully across all blocks.',
      createdAt: { toDate: () => new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      type: 'update'
    },
    {
      id: 'mock-2',
      title: 'Weeding Completed',
      description: 'Manual weeding completed across all 5 acres.',
      createdAt: { toDate: () => new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      type: 'update'
    },
    {
      id: 'mock-3',
      title: 'Planting Finished',
      description: 'Stem cuttings planted successfully.',
      createdAt: { toDate: () => new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
      type: 'update'
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">Farm Updates</h1>
        <p className="text-slate-500 mt-1">A timeline of activities and progress on your farms.</p>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="relative border-l-2 border-slate-100 ml-3 md:ml-4 space-y-8">
            {displayActivities.map((activity, index) => (
              <div key={activity.id} className="relative pl-8 md:pl-10">
                {/* Timeline dot */}
                <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white border-4 border-[var(--color-primary)]"></div>
                
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{activity.title}</h3>
                    <span className="text-xs font-medium text-slate-500 flex items-center bg-white px-2 py-1 rounded-md border border-slate-200">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.createdAt ? format(activity.createdAt.toDate(), 'MMM d, yyyy') : 'Recently'}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
