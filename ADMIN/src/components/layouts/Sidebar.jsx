import React from "react";
import { Link } from "react-router-dom";
import { SiAdidas } from "react-icons/si";
import { RiBillFill } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { MdOutlineReviews } from "react-icons/md";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  User, 
  BarChart, 
  Settings, 
  ListIcon,
  
} from "lucide-react";
import { FaCartArrowDown } from "react-icons/fa";
import { clsx } from "clsx";

export const Sidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Sản phẩm", href: "/products", icon: ShoppingBag },
    { name: "Danh mục", href: "/categories", icon: ListIcon },
    { name: "Thương hiệu", href: "/brands", icon: SiAdidas  },
    { name: "Đơn hàng ", href: "/orders", icon: RiBillFill },
    {name: "tồn kho", href: "/stock", icon: FaCartArrowDown},
    { name: "Khách hàng", href: "/users", icon: User },
    { name: "Phân quyền", href: "/permissions",icon: FaUserCheck},
    { name: "Đánh giá", href: "/reviews", icon: MdOutlineReviews  },
    { name: "Phân tích", href: "/analytics", icon: BarChart },
    { name: "Cài đặt", href: "/settings", icon: Settings },
  ];

  return (
<div className="h-screen w-96 border-r border-gray-200 bg-white flex flex-col">
<div className="p-6 border-b border-gray-200 flex items-center">
  <h1 className="text-3xl font-semibold text-black">Amethyst Word</h1>
  <ShoppingBag className="w-5 h-5 ml-2" />
</div>
      <nav className="flex-1 pt-4 pb-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={clsx(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-gray-100 text-black"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={16} />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">admin@fashion.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
