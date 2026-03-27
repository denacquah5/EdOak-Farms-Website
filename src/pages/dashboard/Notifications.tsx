import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, doc, updateDoc, writeBatch } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Bell, Check, CheckCircle2, Circle } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: any;
  type?: string;
  relatedId?: string;
}

export function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs: Notification[] = [];
      snapshot.forEach((doc) => {
        notifs.push({ id: doc.id, ...doc.data() } as Notification);
      });
      setNotifications(notifs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'notifications', id), {
        read: true
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;
    try {
      const unreadNotifs = notifications.filter(n => !n.read);
      if (unreadNotifs.length === 0) return;

      const batch = writeBatch(db);
      unreadNotifs.forEach(notif => {
        const ref = doc(db, 'notifications', notif.id);
        batch.update(ref, { read: true });
      });
      await batch.commit();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 mt-1">Stay updated on your farm investments.</p>
        </div>
        {notifications.some(n => !n.read) && (
          <Button variant="outline" onClick={markAllAsRead} className="flex items-center">
            <Check className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="p-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No notifications yet</h3>
              <p className="text-slate-500 mt-1">When there are updates to your farms, they will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 sm:p-6 flex gap-4 transition-colors ${notification.read ? 'bg-white' : 'bg-slate-50'}`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {notification.read ? (
                      <CheckCircle2 className="w-5 h-5 text-slate-300" />
                    ) : (
                      <Circle className="w-5 h-5 text-[var(--color-primary)] fill-[var(--color-primary)]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className={`text-sm font-medium ${notification.read ? 'text-slate-700' : 'text-slate-900'}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {notification.createdAt ? format(notification.createdAt.toDate(), 'MMM d, h:mm a') : 'Just now'}
                      </span>
                    </div>
                    <p className={`mt-1 text-sm ${notification.read ? 'text-slate-500' : 'text-slate-700'}`}>
                      {notification.message}
                    </p>
                    
                    {!notification.read && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="mt-3 text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
