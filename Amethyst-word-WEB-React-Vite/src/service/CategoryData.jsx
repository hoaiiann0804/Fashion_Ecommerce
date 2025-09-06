  /** @file src/data/categories.js */
  import React from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { FaGlasses, FaHatCowboy, FaShoePrints, FaShoppingBag, FaTshirt } from 'react-icons/fa';
  export const CategoryData = [
    {
      id: 1,
      name: "Thời trang Nam",
      icon: <FaTshirt />,
      subcategories: [
        {
          id: 101,
          name: "Áo sơ mi",
          subsubcategories: [
            { id: 1011, name: "Áo sơ mi nam trắng" },
            { id: 1012, name: "Áo sơ mi nam đen" },
            { id: 1013, name: "Áo sơ mi nam caro" }
          ]
        },
        {
          id: 102,
          name: "Quần jean",
          subsubcategories: [
            { id: 1021, name: "Quần jean slim" },
            { id: 1022, name: "Quần jean rách" },
            { id: 1023, name: "Quần jean ống đứng" }
          ]
        },
        {
          id: 103,
          name: "Áo khoác",
          subsubcategories: [
            { id: 1031, name: "Áo khoác dạ" },
            { id: 1032, name: "Áo khoác bomber" },
            { id: 1033, name: "Áo khoác gió" }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Thời trang Nữ",
      icon: <FaShoppingBag />,
      subcategories: [
        {
          id: 201,
          name: "Váy Đầm Nữ",
          subsubcategories: [
            { id: 2011, name: "Váy Chữ A" },
            { id: 2012, name: "Váy Babydoll" },
            { id: 2013, name: "Váy Suông" },
            { id: 2014, name: "Váy Maxi" },
            { id: 2015, name: "Váy Ôm" },
            { id: 2016, name: "Váy Oversize" }
          ]
        },
        {
          id: 202,
          name: "Áo Nữ",
          subsubcategories: [
            { id: 2021, name: "Áo Thun" },
            { id: 2022, name: "Áo Sơ Mi" },
            { id: 2023, name: "Áo Kiểu" },  
            { id: 2024, name: "Áo Croptop" },
            { id: 2025, name: "Áo Polo" },
            { id: 2026, name: "Áo Dệt Kim" },
            { id: 2027, name: "Áo Len" },
            { id: 2028, name: "Áo Dài" }
          ]
        },
        {
          id: 203,
          name: "Quần Nữ",
          subsubcategories: [
            { id: 2031, name: "Quần Jeans" },
            { id: 2032, name: "Quần Tây" },
            { id: 2033, name: "Quần Kaki" },
            { id: 2034, name: "Quần Short" },
            { id: 2035, name: "Quần Váy" },
            { id: 2036, name: "Quần Baggy" },
            { id: 2037, name: "Quần Legging" }
          ]
        },
        {
          id: 204,
          name: "Chân Váy Nữ",
          subsubcategories: [
            { id: 2041, name: "Chân Váy Chữ A" },
            { id: 2042, name: "Chân Váy Xếp Ly" },
            { id: 2043, name: "Chân Váy Dáng Suông" },
            { id: 2044, name: "Chân Váy Dáng Ôm" },
            { id: 2045, name: "Chân Váy Dáng Xòe" }
          ]
        },
        {
          id: 205,
          name: "Áo Khoác Nữ",
          subsubcategories: [
            { id: 2051, name: "Áo Khoác Jeans" },
            { id: 2052, name: "Áo Khoác Blazer" },
            { id: 2053, name: "Áo Khoác Nỉ" },
            { id: 2054, name: "Áo Khoác Kaki" },
            { id: 2055, name: "Áo Khoác Chống Nắng" },
            { id: 2056, name: "Áo Khoác Măng Tô" }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Giày dép",
      icon: <FaShoePrints />,
      subcategories: [
        {
          id: 301,
          name: "Giày thể thao",
          subsubcategories: [
            { id: 3011, name: "Giày thể thao nam" },
            { id: 3012, name: "Giày thể thao nữ" }
          ]
        },
        {
          id: 302,
          name: "Giày cao gót",
          subsubcategories: [
            { id: 3021, name: "Giày cao gót gót nhọn" },
            { id: 3022, name: "Giày cao gót gót vuông" }
          ]
        },
        {
          id: 303,
          name: "Dép sandal",
          subsubcategories: [
            { id: 3031, name: "Dép sandal nữ" },
            { id: 3032, name: "Dép sandal nam" }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Phụ kiện",
      icon: <FaHatCowboy />,
      subcategories: [
        {
          id: 401,
          name: "Nón",
          subsubcategories: [
            { id: 4011, name: "Nón lưỡi trai" },
            { id: 4012, name: "Nón kết" },
            { id: 4013, name: "Nón beret" }
          ]
        },
        {
          id: 402,
          name: "Khăn quàng",
          subsubcategories: [
            { id: 4021, name: "Khăn quàng len" },
            { id: 4022, name: "Khăn quàng cotton" }
          ]
        },
        {
          id: 403,
          name: "Túi xách",
          subsubcategories: [
            { id: 4031, name: "Túi xách nữ" },
            { id: 4032, name: "Túi xách nam" }
          ]
        }
      ]
    },
    {
      id: 5,
      name: "Trang sức ",
      icon: <BiTimeFive />,
      subcategories: [
        {
          id: 501,
          name: "Đồng hồ nam",
          subsubcategories: [
            { id: 5011, name: "Đồng hồ dây kim loại" },
            { id: 5012, name: "Đồng hồ dây da" }
          ]
        },
        {
          id: 502,
          name: "Đồng hồ nữ",
          subsubcategories: [
            { id: 5021, name: "Đồng hồ nữ sang trọng" },
            { id: 5022, name: "Đồng hồ nữ thể thao" }
          ]
        }
      ]
    },
    {
      id: 6,
      name: "Kính mát",
      icon: <FaGlasses />,
      subcategories: [
        {
          id: 601,
          name: "Kính thời trang",
          subsubcategories: [
            { id: 6011, name: "Kính mắt aviator" },
            { id: 6012, name: "Kính mắt tròn" }
          ]
        },
        {
          id: 602,
          name: "Kính bảo vệ mắt",
          subsubcategories: [
            { id: 6021, name: "Kính bảo vệ mắt thể thao" },
            { id: 6022, name: "Kính bảo vệ mắt chống UV" }
          ]
        }
      ]
    }
  ];
  
