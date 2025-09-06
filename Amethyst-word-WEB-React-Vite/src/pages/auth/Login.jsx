import { GoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import bg1 from '../../assets/image/phoi-do-voi-mau-tim-pastel_672db6744d5545cfb058f353237dd4d4.webp';
import { login } from "../../service/User.Service";
const API_URL = import.meta.env.VITE_API_URL;
const Login = ()=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const response = await login(email, password);
      if(response.code === 200)
      {
        toast.success("Đăng nhập thành công!", {
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 2000);
      }
      else{
        toast.error("Đăng nhập thất bại!", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Sai tài khoản hoặc mật khẩu", {
        autoClose: 3000,
      });
      setError(error.message || "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const savedEmail = localStorage.getItem('registeredEmail');
    const savedPassword = localStorage.getItem('registeredPassword')

    if(savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
    
    localStorage.removeItem('registeredEmail');
    localStorage.removeItem('registeredPassword');
  },[])

  

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    alert("Đăng nhập bằng Google thành công!");
    fetch(`${API_URL}/api/User/GoogleResponse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ credential: credentialResponse.credential }),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Dữ liệu từ BE:", data);
    })
    .catch(error => console.error("Lỗi khi gửi dữ liệu:", error));
  };
  



  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
    setError("Đăng nhập bằng Google thất bại!");
  };
  return(
    <div className="flex justify-center items-center pt-16 ">
      <div className="w-1/2 h-screen hidden lg:block">
        <img src={bg1} alt="Placeholder Image" className="object-cover w-auto h-full" />
      </div>
      <div className="w-2/3 h-screen flex justify-center items-center">
        <div className="bg-white p-5 rounded-lg shadow-lg w-full sm:w-96  ">
          <h1 className="text-3xl font-semibold mb-6 text-center text-purple-600">ĐĂNG NHẬP</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}   >

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdEmail className="absolute left-3 top-3 text-purple-500" />
              </div>
            </div>


            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Mật khẩu</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLockPasswordFill className="absolute left-3 top-3 text-purple-500" />
              </div>
            </div>

          
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-blue-500"
              />
              <label htmlFor="remember" className="text-gray-700 ml-2">Remember Me</label>
            </div>
            <div className="mb-6 text-center">
              <a href="#" className="text-blue-500 hover:underline">Quên mật khẩu?</a>
            </div>

        
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300"
            >
              Đăng nhập
            </button>
          </form>
          <div className="mt-6 text-center">
                  <span className="text-gray-700">Hoặc đăng nhập bằng</span>
                  <div className="mt-4">
                    <GoogleLogin
                      onSuccess={handleGoogleLoginSuccess}
                      onError={handleGoogleLoginFailure}
                    />
                  </div>
                </div>

          <div className="mt-6 text-center">
            <span className="text-gray-700">Chưa có tài khoản? </span>
            <Link to="/register" className="text-blue-500 hover:underline">Đăng ký ngay</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login;
