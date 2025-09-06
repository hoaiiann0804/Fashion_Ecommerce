import { useEffect, useState } from 'react';
import OrdersTab from '../../pages/Profile/tabs/Order/OrdersTab';
import { userData } from '../../service/profileService';
import { GetInformation } from '../../service/User.Service';
import ProfileSidebar from './ProfileSidebar';
import { HistoryTab, PaymentTab } from './tabs/EmtyStateTabs';
import ProfileTab from './tabs/ProfileTab';
import SettingsTab from './tabs/SettingsTab';

export default function FashionUserProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(userData);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token === null) {
          setUser(null);
          return;
        }
        const userInfo = await GetInformation(token);
        setUser(userInfo.user_Inf);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }
  , []);
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab user={user} />;
      case 'orders':
        return <OrdersTab />;
      case 'history':
        return <HistoryTab />;
      case 'payment':
        return <PaymentTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <ProfileTab user={user} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 mt-20">
      <ProfileSidebar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
}