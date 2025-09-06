import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaHeart, FaShoppingBag, FaUser } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishListContext";
import CartDrawer from "../../pages/carts/CartDrawer";
import { getVisitorId } from "../../service/Device.Service";
import { MenuNavBarService } from "../../service/MenuNavBar.Service";
import { ProductSearch } from "../../service/Product.Service";
import { GetInformation } from "../../service/User.Service";
import SearchBar from "../SearchBar";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchProduct, setSearchProduct] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const { username, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const {wishlistCount} = useWishlist();
  const {cartCount} = useCart();

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  
  useEffect(() => {
    const fecthVisitorId = async () => {
      const visitorId = await getVisitorId();
      console.log("visitorId", visitorId);
    };
    fecthVisitorId();
  }, []);
  


  const fetchUserData = async () => {
    try {
      if (!token) {
        setUsername(null);
        return;
      }
      const userInfo = await GetInformation(token);
      if (userInfo?.user_Inf?.USER_LAST_NAME) {
        setUsername(userInfo.user_Inf.USER_LAST_NAME);
      } else {
        setUsername(null);
      }
    } catch (error) {
      setUsername(null);
    }
  };

  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!searchProduct.trim()) {
      setSearchError("Vui lòng nhập từ khóa tìm kiếm.");
      return;
    }
    
    setSearchError("");
    setSearchLoading(true);
    
    try {
      const response = await ProductSearch(searchProduct);
      setSearchOpen(false);
      navigate(`/search?query=${encodeURIComponent(searchProduct)}`, { state: { results: response.data } });
    } catch (error) {
      setSearchError("Lỗi tìm kiếm sản phẩm. Vui lòng thử lại.");
    } finally {
      setSearchLoading(false);
    }
  };



  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const fetchMenuList = async () => {
    try {
      const data = await MenuNavBarService.getMenuList();
      if (Array.isArray(data)) {
        setMenuList(data);
      } else {
        setMenuList([]);
      }
    } catch (error) {
      setMenuList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuList();
    fetchUserData();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [token]);

  const menuSpacing = useMemo(() => {
    const spacingMap = {
      3: "space-x-12",
      5: "space-x-8",
      7: "space-x-6",
      default: "space-x-4",
    };
    return spacingMap[Math.min(menuList.length, 7)] || spacingMap.default;
  }, [menuList.length]);

  const menuFontSize = useMemo(() => {
    if (windowWidth >= 1280) return "text-sm";
    if (windowWidth >= 1024) {
      return menuList.length > 5 ? "text-xs" : "text-sm";
    }
    return "text-xs";
  }, [windowWidth, menuList.length]); 

  return (
    <>
      <nav className="bg-gradient-to-r from-[#905eb4] to-[#9966cc] text-white p-3 md:p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-2">
          <div className="flex items-center flex-grow-0 flex-shrink-0">
            <Link to="/" className="flex items-center space-x-1 group">
              <span className="text-purple-400 text-2xl md:text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300">💎</span>
              <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent group-hover:blur-[0.3px] transition duration-300">
                AmethystWorld
              </h1>
            </Link>
          </div>
          <div className={`hidden md:flex flex-grow justify-center items-center mx-2 lg:mx-6 ${menuSpacing} ${menuFontSize} font-medium uppercase`}>
            {loading ? (
              <span className="text-white">Loading...</span>
            ) : (
              menuList.map((item, index) => (
                <Link
                  key={index}
                  to={item.menU_LINK}
                  onClick={() => document.title = `${item.menU_NAME} | AmethystWorld`}
                  className="text-white hover:text-black whitespace-nowrap px-1 transition-all duration-200 hover:scale-105"
                >
                  {item.menU_NAME}
                </Link>
              ))
            )}
          </div>
          <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 flex-grow-0 flex-shrink-0">
            {/* Phần Search */}
            <div className='overflow-hidden'>
          <SearchBar/>
        </div>

            
            <Link to="/wishlist" className="relative">
              <FaHeart className="h-6 w-6 text-white"  />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button onClick={toggleCartDrawer} className="relative">
                <FaShoppingBag className='h-6 w-6 text-white'/>
                {cartCount > 0 && (
                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                        {cartCount}
                    </span>
                )}
            </button>
            <button onClick={toggleNavDrawer} className="md:hidden text-white">
              {navDrawerOpen ? <IoMdClose className="text-xl" /> : <HiBars3BottomRight className="text-xl" />}
            </button>
<div className="relative">
              <Link
                to={token ? "/profile" : "/login"}
                className="text-white hover:text-black flex items-center"
              >
                <FaUser className="text-lg" />
                <span className="hidden lg:inline ml-1 text-xs lg:text-sm">
                  {username || "Đăng nhập"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      {navDrawerOpen && (
        <>
          <div onClick={toggleNavDrawer} className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>
          <div className="fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={toggleNavDrawer}>
                <IoMdClose className="text-2xl text-gray-600" />
              </button>
            </div>
            <div className="flex flex-col p-4 space-y-4">
              {loading ? (
                <span className="text-gray-500">Đang tải...</span>
              ) : (
                menuList.map((item, index) => (
                  <Link
                    key={index}
                    to={item.menU_LINK}
                    onClick={() => document.title = `${item.menU_NAME} | AmethystWorld`}
                    className="text-gray-800 hover:text-purple-600 text-base"
                  >
                    {item.menU_NAME}
                  </Link>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;