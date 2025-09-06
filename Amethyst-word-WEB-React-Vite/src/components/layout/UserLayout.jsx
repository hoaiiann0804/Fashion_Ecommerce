import { useState, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import OTPForm from '../../pages/auth/OTPForm';
import { AuthContext } from '../../context/AuthContext';

const UserLayout = () => {
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otpData, setOtpData] = useState(null);
  // const { setUsername } = useContext(AuthContext);

  const openOtpModal = (data) => {
    setOtpData(data);
    setIsOtpOpen(true);
  };

  const closeOtpModal = () => {
    setIsOtpOpen(false);
    setOtpData(null);
  };

  // const handleLoginSuccess = (username) => {
  //   setUsername(username);
  //   closeOtpModal();
  // };

  return (
    <div>
      <Header />
      <main>
        <Outlet context={{ openOtpModal }} />
      </main>
      <Footer />
      {isOtpOpen && (
        <OTPForm
          email={otpData?.email}  
          userData={otpData?.userData}
          onClose={closeOtpModal}
          // onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  )
};

export default UserLayout;