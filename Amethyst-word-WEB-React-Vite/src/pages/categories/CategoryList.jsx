import { useEffect, useRef, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CategoryService } from "../../service/Category.Service";

// Gộp tất cả icon lại như cũ
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as CgIcons from "react-icons/cg";
import * as CiIcons from "react-icons/ci";
import * as DiIcons from "react-icons/di";
import * as FcIcons from "react-icons/fc";
import * as FiIcons from "react-icons/fi";
import * as GiIcons from "react-icons/gi";
import * as GoIcons from "react-icons/go";
import * as GrIcons from "react-icons/gr";
import * as HiIcons from "react-icons/hi";
import * as ImIcons from "react-icons/im";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";

const iconMap = {
  ...AiIcons,
  ...BsIcons,
  ...BiIcons,
  ...CgIcons,
  ...CiIcons,
  ...DiIcons,
  ...FaIcons,
  ...FcIcons,
  ...FiIcons,
  ...GiIcons,
  ...GoIcons,
  ...GrIcons,
  ...HiIcons,
  ...ImIcons,
  ...IoIcons,
  ...Io5Icons,
  ...MdIcons,
  ...RiIcons,
  ...SiIcons,
};

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const scrollRef = useRef(0);
  const animationRef = useRef();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getAllCategories();
        // Gấp đôi mảng để tạo hiệu ứng cuộn vô tận
        setCategories([...data, ...data]);
      } catch (err) {
        console.error("Lỗi khi tải danh mục:", err);
      }
    };
    fetchCategories();
  }, []);

  // Auto-scroll giống BrandLogos
  useEffect(() => {
    const scrollSpeed = 0.5;

    const step = () => {
      if (containerRef.current) {
        scrollRef.current += scrollSpeed;
        const container = containerRef.current;

        if (scrollRef.current >= container.scrollWidth / 2) {
          scrollRef.current = 0;
        }

        container.scrollLeft = scrollRef.current;
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationRef.current);
  }, [categories]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/shop?categoryId=${categoryId}`);
  };

  return (
    <div className="bg-white p-3 max-w-8xl mx-auto overflow-hidden">
      <h2 className="py-3 text-3xl font-semibold text-purple-400">Danh mục</h2>
      <div
        ref={containerRef}
        className="flex space-x-6 overflow-hidden whitespace-nowrap"
        style={{ scrollBehavior: "auto" }}
      >
        {categories.map((category, index) => {
          const IconComponent = iconMap[category.icon] || FaIcons.FaShoppingBag;

          return (
            <div
              key={`${category.id}-${index}`}
              onClick={() => handleCategoryClick(category.id)}
              className="flex-shrink-0 w-32 h-40 rounded-lg flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              <div className="w-16 h-16 mb-2 rounded-full overflow-hidden flex items-center justify-center">
                <IconComponent className="text-3xl text-gray-700" color={category.color || "#444"} />
              </div>
              <span className="text-xs text-gray-700 text-center line-clamp-2">{category.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
