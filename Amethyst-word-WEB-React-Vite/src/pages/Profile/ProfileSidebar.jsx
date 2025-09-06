import { Camera, ChevronRight, Clock, CreditCard, Heart, LogOut, Settings, ShoppingBag, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { profileTabs } from '../../../src/service/profileService';


const iconComponents = {
  User: User,
  ShoppingBag: ShoppingBag,
  Clock: Clock,
  CreditCard: CreditCard,
  Settings: Settings
};


export default function ProfileSidebar({ user, activeTab, setActiveTab }) {
  const navigator = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigator('/');
    window.location.reload();
  }


  return (
    <div className="w-full md:w-72 bg-white border-r border-slate-200 md:min-h-screen">
      {/* <div className="flex flex-col items-center p-8 border-b border-slate-100">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 shadow-sm">
            <img 
              src={user.avatar} 
              alt="User avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-1.5 rounded-full shadow-md transition">
            <Camera size={14} />
          </button>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-slate-800">{user.name}</h2>
        <p className="text-slate-500 text-sm">{user.email}</p>
      </div> */}

      <nav className="p-4">
        <ul className="space-y-1">
          {profileTabs.map(tab => {
            const IconComponent = iconComponents[tab.icon];
            return (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left transition ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className={`mr-3 ${activeTab === tab.id ? 'text-indigo-700' : 'text-slate-400'}`}>
                      {IconComponent && <IconComponent size={18} />}
                    </span>
                    <span>{tab.label}</span>
                  </div>
                  <ChevronRight size={16} className={activeTab === tab.id ? 'text-indigo-500' : 'text-slate-400'} />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
   
        <button className="flex items-center text-slate-600 hover:text-red-500 px-4 py-2 rounded-lg w-full hover:bg-slate-100 transition"  onClick={handleLogout}>
          <LogOut size={18} className="mr-3"/>
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}
