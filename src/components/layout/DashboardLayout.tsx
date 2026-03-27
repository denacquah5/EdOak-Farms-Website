import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { 
  LayoutDashboard, 
  Tractor, 
  Sprout, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X,
  FileText,
  Package
} from 'lucide-react';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  isAdmin?: boolean;
}

export function DashboardLayout({ children, isAdmin = false }: DashboardLayoutProps) {
  const { profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const clientLinks = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Farms', path: '/dashboard/farms', icon: Sprout },
    { name: 'Updates', path: '/dashboard/updates', icon: FileText },
    { name: 'Documents', path: '/dashboard/documents', icon: FileText },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  const adminLinks = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Clients', path: '/admin/clients', icon: Users },
    { name: 'Projects', path: '/admin/projects', icon: Tractor },
    { name: 'Blocks', path: '/admin/blocks', icon: Sprout },
    { name: 'Inventory', path: '/admin/inventory', icon: Package },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const links = isAdmin ? adminLinks : clientLinks;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:block
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[var(--color-primary)] rounded flex items-center justify-center">
                <span className="text-white font-serif font-bold text-sm">EF</span>
              </div>
              <span className="font-serif font-bold text-lg text-[var(--color-primary-dark)]">
                {isAdmin ? 'Admin Portal' : 'Investor Portal'}
              </span>
            </Link>
            <button className="lg:hidden text-slate-500" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-slate-100">
            <p className="text-sm font-medium text-slate-900">{profile?.displayName || 'User'}</p>
            <p className="text-xs text-slate-500 truncate">{profile?.email}</p>
            <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              {isAdmin ? 'Administrator' : 'Farm For Me Client'}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[var(--color-primary)] text-white' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3 text-red-500" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center px-4 justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-500 focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-serif font-bold text-[var(--color-primary-dark)]">EdOak Farms</span>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
