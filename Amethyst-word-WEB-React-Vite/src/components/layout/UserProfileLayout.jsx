import Sidebar from './SideBar';

export default function UserProfileLayout({ user, activeTab, setActiveTab, children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 mt-20">
      <Sidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}