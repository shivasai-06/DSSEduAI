import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  User, 
  BarChart2, 
  Map, 
  MessageSquare, 
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Target,
  TrendingUp
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await signOut();
    navigate('/login');
  };
  
  const mainNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Skill Assessment', path: '/assessment', icon: <Target size={20} /> },
    { name: 'Skill Gaps', path: '/skill-gaps', icon: <BarChart2 size={20} /> },
    { name: 'Career Roadmap', path: '/roadmap', icon: <Map size={20} /> },
    { name: 'AI Mentor', path: '/mentor', icon: <MessageSquare size={20} /> },
    { name: 'Progress', path: '/progress', icon: <TrendingUp size={20} /> },
    { name: 'Resources', path: '/resources', icon: <BookOpen size={20} /> },
  ];

  const bottomNavItems = [
    { name: 'My Profile', path: '/profile', icon: <User size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const SidebarContent = () => (
    <>
      <div className={cn("flex items-center h-16 border-b border-gray-200 px-4", isDesktopCollapsed ? "justify-center" : "justify-between")}>
        <Link to="/" className={cn("flex items-center gap-2", isDesktopCollapsed && "hidden md:flex md:justify-center")}>
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
            DS
          </div>
          {!isDesktopCollapsed && <span className="text-xl font-bold text-primary-600 truncate">DSSEduAI</span>}
        </Link>
        {!isDesktopCollapsed && (
          <button 
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
        {mainNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              title={isDesktopCollapsed ? item.name : undefined}
              className={cn(
                "flex items-center py-2.5 px-3 text-sm font-medium rounded-lg transition-colors",
                isActive 
                  ? "bg-primary-50 text-primary-700" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                isDesktopCollapsed ? "justify-center" : ""
              )}
            >
              <span className={cn(isActive ? "text-primary-600" : "text-gray-400")}>
                {item.icon}
              </span>
              {!isDesktopCollapsed && <span className="ml-3 truncate">{item.name}</span>}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-200 space-y-1">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 hidden md:block">
          {!isDesktopCollapsed && "User Area"}
        </div>
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              title={isDesktopCollapsed ? item.name : undefined}
              className={cn(
                "flex items-center py-2.5 px-3 text-sm font-medium rounded-lg transition-colors",
                isActive 
                  ? "bg-primary-50 text-primary-700" 
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                isDesktopCollapsed ? "justify-center" : ""
              )}
            >
              <span className={cn(isActive ? "text-primary-600" : "text-gray-400")}>
                {item.icon}
              </span>
              {!isDesktopCollapsed && <span className="ml-3 truncate">{item.name}</span>}
            </Link>
          );
        })}
        <button 
          onClick={handleSignOut}
          title={isDesktopCollapsed ? "Logout" : undefined}
          className={cn(
            "flex items-center w-full py-2.5 px-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors",
            isDesktopCollapsed ? "justify-center" : ""
          )}
        >
          <span className="text-red-500">
            <LogOut size={20} />
          </span>
          {!isDesktopCollapsed && <span className="ml-3 truncate">Logout</span>}
        </button>
      </div>

      {/* Desktop Collapse Toggle */}
      <div className="hidden md:flex border-t border-gray-200 p-2 justify-end">
        <button
          onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          title={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isDesktopCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out md:relative md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0 w-64" : "-translate-x-full",
          !isMobileMenuOpen && isDesktopCollapsed ? "md:w-20" : "md:w-64"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Top Header */}
        <header className="md:hidden flex items-center h-16 px-4 bg-white border-b border-gray-200 shrink-0 gap-3">
          <button 
            className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2 text-primary-600 font-bold text-xl">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              DS
            </div>
            DSSEduAI
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
