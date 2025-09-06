
import { Camera } from 'lucide-react';

export default function Avatar({ user }) {
  return (
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
  );
}