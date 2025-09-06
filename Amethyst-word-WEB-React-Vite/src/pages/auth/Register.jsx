import {
  FaPhoneAlt,
  FaTransgenderAlt
} from "react-icons/fa";
import {
  MdEmail,
  MdOutlineDriveFileRenameOutline
} from "react-icons/md";
import {
  RiLockPasswordFill
} from "react-icons/ri";
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import React, { useState } from "react";
import bg1 from '../../assets/image/mau-tim-mac-voi-mau-gi-dep__18__fa7d6ebb66c840ac870291c9405730bc.webp';
const Register = () => {
  const {openOtpModal } = useOutletContext();
  const navigate = useNavigate();
  const [formData, setFormData] =useState({ 
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    confirmPassword: "",
    birthDate: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Vui lòng nhập họ";
    if (!formData.lastName.trim()) newErrors.lastName = "Vui lòng nhập tên";
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải có 10 chữ số";
    }
    if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính";
    if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
    else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải dài ít nhất 8 ký tự";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }
    if (!formData.birthDate) newErrors.birthDate = "Vui lòng nhập ngày sinh";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      openOtpModal({ email: formData.email, userData: formData, isRegistering: true });
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.",
      });
    }
  };
  return (
    <div className="flex justify-center items-center pt-16">
      <div className="w-1/2 hidden lg:block">
        <img src={bg1} alt="Placeholder" className="object-cover w-auto h-full"  />
      </div>
      <div className="w-2/3 flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg shadow-lg w-full sm:w-96">
          <h1 className="text-2xl font-semibold mb-4 text-purple-400 text-center">ĐĂNG KÝ</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-600">Họ</label>
              <div className="relative">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full p-2 pl-10 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-blue-500`}
                  autoComplete="off"
                />
                <MdOutlineDriveFileRenameOutline className="absolute left-2 top-3 text-purple-400" />
              </div>
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-600">Tên</label>
              <div className="relative">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full p-2 pl-10 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-blue-500`}
                  autoComplete="off"
                />
                <MdOutlineDriveFileRenameOutline className="absolute left-2 top-3 text-purple-400" />
              </div>
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 pl-10 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-blue-500`}
                  autoComplete="off"
                />
                <MdEmail className="absolute left-2 top-3 text-purple-400" />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-600">Số điện thoại</label>
              <div className="relative">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-2 pl-10 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-blue-500`}
                  autoComplete="off"
                />
                <FaPhoneAlt className="absolute left-2 top-3 text-purple-400" />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-600">Giới tính</label>
              <div className="relative">
                <FaTransgenderAlt className="absolute left-2 top-3 text-purple-400" />
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full p-2 pl-10 border ${errors.gender ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-blue-500`}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="birthDate" className="block text-gray-600">Ngày sinh</label>
              <div className="relative">
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={`w-full p-2 pl-10 border ${errors.birthDate ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-blue-500`}
                  autoComplete="off"
                />
                <MdOutlineDriveFileRenameOutline className="absolute left-2 top-3 text-purple-400" />
              </div>
              {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">Mật khẩu</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-2 pl-10 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-blue-500`}
                  autoComplete="off"
                />
                <RiLockPasswordFill className="absolute left-2 top-3 text-purple-400" />
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-600">Nhập lại mật khẩu</label>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full p-2 pl-10 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:border-blue-500`}
                  autoComplete="off"
                />
                <RiLockPasswordFill className="absolute left-2 top-3 text-purple-400" />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
              <label htmlFor="remember" className="text-gray-600 ml-2">Ghi nhớ đăng nhập</label>
            </div>
            {errors.submit && (
              <div className="mb-4 text-center text-red-500">{errors.submit}</div>
            )}
            <button
              type="submit"
              className="bg-[#6666e5] hover:bg-purple-400 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Đăng ký
            </button>
          </form>
          <div className="mt-6 text-blue-500 text-center">
            <Link to="/login" className="hover:underline">Đăng nhập tại đây</Link>
          </div>
        </div>
      </div>
    </div>
);
};
export default Register;
