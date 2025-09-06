import { Edit2, Mail, MapPin, Phone, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GetAddress, UpdateInformation, createAddress, updateAddress } from '../../../service/User.Service';

export default function ProfileTab({ user }) {
  const token = localStorage.getItem("token");
  const [address, setAddress] = useState([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress]= useState({
    housE_NUMBER: '',
    street: '',
    city: '',
    postal_CODE: '',
    country: '',
    typE_ADDRESS: ''
  })
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: `${user?.USER_FIRST_NAME || ''} ${user?.USER_LAST_NAME || ''}`.trim(),
    email: user?.USER_EMAIL || '',
    phone: user?.USER_PHONE || '',
    selectedAddressId: null,
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [selectedEditAddressId, setSelectedEditAddressId] = useState('');

  const fetchAddress = async (newlyAddedId = null) => {
    try {
      if (token === null) {
        setAddress([]);
        setSelectedAddress(null);
        return;
      } else {
        const userInfo = await GetAddress(token);
        const normalizedList = (userInfo || []).map(normalizeAddress);
        const uniqueList = normalizedList.filter(
          (item, index, self) =>
            index === self.findIndex((t) => (t.id || t.USER_ADDRESS_ID) === (item.id || item.USER_ADDRESS_ID))
        );
        setAddress(uniqueList);
        // Lấy id mặc định từ localStorage
        const defaultAddressId = localStorage.getItem('defaultAddressId');
        let selected = null;
        if (newlyAddedId) {
          selected = normalizedList.find(item => (item.id || item.USER_ADDRESS_ID).toString() === newlyAddedId.toString());
        } else if (defaultAddressId) {
          selected = normalizedList.find(item => (item.id || item.USER_ADDRESS_ID).toString() === defaultAddressId);
        } else if (formData.selectedAddressId) {
          selected = normalizedList.find(item => (item.id || item.USER_ADDRESS_ID).toString() === formData.selectedAddressId.toString());
        }
        if (!selected && normalizedList.length > 0) selected = normalizedList[0];
        setSelectedAddress(selected);
        setFormData(prev => ({
          ...prev,
          selectedAddressId: selected ? selected.id : null
        }));
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  // Lưu địa chỉ giao hàng mặc định vào localStorage mỗi khi selectedAddress thay đổi
  useEffect(() => {
    if (selectedAddress) {
      // Chỉ lưu các trường cần thiết cho checkout
      const addressObj = {
        homeAddress: selectedAddress.housE_NUMBER || selectedAddress.HOUSE_NUMBER || '',
        street: selectedAddress.street || selectedAddress.STREET || '',
        city: selectedAddress.city || selectedAddress.CITY || '',
        country: selectedAddress.country || selectedAddress.COUNTRY || '',
        postalCode: selectedAddress.postaL_CODE || selectedAddress.POSTAL_CODE || selectedAddress.postal_CODE || '',
        type: selectedAddress.typE_ADDRESS || selectedAddress.TYPE_ADDRESS || '',
      };
      localStorage.setItem('userAddress', JSON.stringify(addressObj));
    }
  }, [selectedAddress]);

  useEffect(() => {
    if(user) {
      fetchAddress();
      setFormData({
        fullName: `${user.USER_FIRST_NAME || ''} ${user.USER_LAST_NAME || ''}`.trim(),
        email: user.USER_EMAIL || '',
        phone: user.USER_PHONE || '',
      });
    }
  }, [user]);

  const validateForm = ()=>{
    if(!formData.fullName.trim()){
      return 'Vui lòng nhập họ và tên '
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      return 'Email không hợp lệ';
    }
    if(!formData.phone.trim()){
      return 'Số điện thoại không hợp lệ '
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      return 'Số điện thoại không hợp lệ (phải có 10 chữ số)';
    }
    return null;
  }

  

  const handleEditClick = () => {
    setIsEditing(true);
    setSuccessMessage('');
    setError('');
  };

  const handleNewAddress = (e)=>{
    setNewAddress(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      fullName: `${user.USER_FIRST_NAME || ''} ${user.USER_LAST_NAME || ''}`.trim(),
      email: user.USER_EMAIL || '',
      phone: user.USER_PHONE || '',
    });
    setError('');
    setSuccessMessage('');
  };

  const handleSaveClick = async () => {
    setError('');
    setSuccessMessage('');
    const validationError = validateForm();
    if(validationError){
      setError(validationError);
      return;
    }
    try {
      const names = formData.fullName.trim().split(' ');
      if(names.length < 2)
      {
        setError('Vui lòng nhập họ và tên');
        return 
      }

      const firstName = names[0];
      const lastName = names.slice(1).join(' ');

      const response = await UpdateInformation(
        {
          id: user.USER_ID,
          firstName: firstName,
          lastName: lastName,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          gender: user.USER_GENDER || ''
        }
      )
      // Lưu id địa chỉ mặc định vào localStorage
      if (formData.selectedAddressId) {
        localStorage.setItem('defaultAddressId', formData.selectedAddressId);
      }
      if(response.code === 200)
      {
        setIsEditing(false);
        setSuccessMessage('Cập nhật thông tin thành công');
        // Cập nhật selectedAddress theo selectedAddressId
        const selected = address.find(item => (item.id || item.USER_ADDRESS_ID) === formData.selectedAddressId);
        setSelectedAddress(selected || null);
        await fetchAddress();
      }
      else{
        setError('Lỗi cập nhật thông tin');
      }
      
    } catch (err) {
      const errorMessage = err?.message || err?.data?.message || err?.response?.data?.message || 'Lỗi cập nhật thông tin';
      setError(errorMessage);
    }
  };

  // Thêm hàm chuẩn hóa địa chỉ
  const normalizeAddress = (addr) => ({
    id: addr.id || addr.USER_ADDRESS_ID,
    typE_ADDRESS: addr.TYPE_ADDRESS || addr.typE_ADDRESS,
    housE_NUMBER: addr.HOUSE_NUMBER || addr.housE_NUMBER,
    street: addr.STREET || addr.street,
    city: addr.CITY || addr.city,
    country: addr.COUNTRY || addr.country,
    postaL_CODE: addr.POSTAL_CODE || addr.postaL_CODE || addr.postal_CODE,
  });

  const handleSaveAddressClick = async()=> {
    try{
      const isDuplicate = address.some(addr =>
        addr.housE_NUMBER === newAddress.housE_NUMBER &&
        addr.street === newAddress.street &&
        addr.city === newAddress.city &&
        addr.country === newAddress.country &&
        addr.postaL_CODE === newAddress.postaL_CODE &&
        addr.typE_ADDRESS === newAddress.typE_ADDRESS
      );

      if (isDuplicate) {
        setError('Địa chỉ này đã tồn tại!');
        return;
      }

      await createAddress(token, newAddress);
      setSuccessMessage('Tạo địa điểm thành công');
      setIsAddingAddress(false);
      setNewAddress({
        housE_NUMBER: '',
        street: '',
        city: '',
        postal_CODE: '',
        country: '',
        typE_ADDRESS: ''
      });
      await fetchAddress();
    }
    catch(error){
      setError('Lỗi lưu thông tin');
    }
  }

  const handleSelectEditAddress = (e) => {
    const selectedId = e.target.value;
    setSelectedEditAddressId(selectedId);
    const addr = address.find(item => (item.id || item.USER_ADDRESS_ID).toString() === selectedId);
    setEditAddress(addr ? { ...addr } : null);
    setIsEditingAddress(true);
    setError('');
    setSuccessMessage('');
  };

  const handleEditAddressChange = (e) => {
    setEditAddress(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveEditAddress = async () => {
    try {
      await updateAddress(token, editAddress);
      setSuccessMessage('Cập nhật địa chỉ thành công');
      setIsEditingAddress(false);
      setEditAddress(null);
      setSelectedEditAddressId('');
      await fetchAddress();
    } catch (error) {
      setError(error?.message || 'Lỗi cập nhật địa chỉ');
    }
  };

  const handleCancelEditAddress = () => {
    setIsEditingAddress(false);
    setEditAddress(null);
    setError('');
    setSuccessMessage('');
  };

  const handleEditAddressClick = () => {
    setEditAddress(selectedAddress);
    setIsEditingAddress(true);
    setError('');
    setSuccessMessage('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Thông tin cá nhân</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="p-6 flex justify-between items-center border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Chi tiết tài khoản</h2>
          {!isEditing ? (
            <button onClick={handleEditClick} className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              <Edit2 size={16} className="mr-1" />
              <span>Chỉnh sửa</span>
            </button>
          ) : (
            <div>
              <button onClick={handleSaveClick} className="mr-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm font-medium">Lưu</button>
              <button onClick={handleCancelClick} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm font-medium">Hủy</button>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Họ và tên</label>
                {!isEditing ? (
                  <div className="flex items-center">
                    <User size={16} className="text-slate-400 mr-2" />
                    <p className="text-slate-700">{formData.fullName}</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <User size={16} className="text-slate-400 mr-2" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded px-3 py-2"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Email</label>
                <div className="flex items-center">
                  <Mail size={16} className="text-slate-400 mr-2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full border border-slate-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Số điện thoại</label>
                {!isEditing ? (
                  <div className="flex items-center">
                    <Phone size={16} className="text-slate-400 mr-2" />
                    <p className="text-slate-700">{formData.phone}</p>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Phone size={16} className="text-slate-400 mr-2" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-slate-300 rounded px-3 py-2"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Địa chỉ</label>
                {!isEditing ? (
                  <div className="flex items-center">
                    <MapPin size={16} className="text-slate-400 mr-2" />
                    {selectedAddress ? (
                      <p>
                        {(selectedAddress.typE_ADDRESS || selectedAddress.TYPE_ADDRESS)}: {(selectedAddress.housE_NUMBER || selectedAddress.HOUSE_NUMBER)}, {(selectedAddress.street || selectedAddress.STREET)}, {(selectedAddress.city || selectedAddress.CITY)}, {(selectedAddress.country || selectedAddress.COUNTRY)} ({selectedAddress.postaL_CODE || selectedAddress.POSTAL_CODE || selectedAddress.postal_CODE})
                      </p>
                    ) : (
                      <p>Chưa có địa chỉ</p>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <MapPin size={16} className="text-slate-400 mr-2" />
                    <select
                      className="border border-slate-300 rounded px-3 py-2 w-full"
                      value={formData.selectedAddressId || ''}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        setFormData(prev => ({
                          ...prev,
                          selectedAddressId: selectedId
                        }));
                        const selected = address.find(item => (item.id || item.USER_ADDRESS_ID).toString() === selectedId);
                        setSelectedAddress(selected || null);
                      }}
                    >
                      <option value="" disabled>Chọn địa chỉ</option>
                      {address.map((item) => (
                        <option key={item.id || item.USER_ADDRESS_ID} value={item.id || item.USER_ADDRESS_ID}>
                          {(item.typE_ADDRESS || item.TYPE_ADDRESS)}: {(item.housE_NUMBER || item.HOUSE_NUMBER)}, {(item.street || item.STREET)}, {(item.city || item.CITY)}, {(item.country || item.COUNTRY)} ({item.postaL_CODE || item.POSTAL_CODE || item.postal_CODE})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
          {error && <p className="text-red-600 mt-4">{error}</p>}
          {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Địa chỉ giao hàng</h2>
          <button onClick={()=>setIsAddingAddress(true)} className="flex items-center text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            <span className="text-lg mr-1">+</span>
            <span>Thêm địa chỉ</span>
          </button>
        </div>
        <div className="p-6">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-indigo-300 transition cursor-pointer mb-4">
            <div className="flex items-center mb-2">
              <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium mr-2">
                Mặc định
              </span>
              <p className="font-medium text-slate-800">{formData.fullName}</p>
              {!isEditingAddress && selectedAddress && (
                <button
                  onClick={handleEditAddressClick}
                  className="ml-4 text-indigo-600 hover:text-indigo-700 text-xs font-medium"
                >
                  Chỉnh sửa địa chỉ
                </button>
              )}
            </div>
            <p className="text-slate-600 text-sm mb-1">{user?.USER_PHONE || ''}</p>
            <div className="text-slate-600 text-sm">
              {selectedAddress ? (
                <p>
                  {(selectedAddress.typE_ADDRESS || selectedAddress.TYPE_ADDRESS)}: {(selectedAddress.housE_NUMBER || selectedAddress.HOUSE_NUMBER)}, {(selectedAddress.street || selectedAddress.STREET)}, {(selectedAddress.city || selectedAddress.CITY)}, {(selectedAddress.country || selectedAddress.COUNTRY)} ({selectedAddress.postaL_CODE || selectedAddress.POSTAL_CODE || selectedAddress.postal_CODE})
                </p>
              ) : (
                <p>Chưa có địa chỉ</p>
              )}
            </div>
          </div>
          {isEditingAddress && editAddress && (
            <div className='p-6 mt-2 bg-slate-100 rounded-lg border border-slate-300'>
              <h3 className='text-slate-800 font-semibold mb-4'>Chỉnh sửa địa chỉ</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <input
                  name='typE_ADDRESS'
                  placeholder='Loại địa chỉ (nhà, văn phòng ...)'
                  onChange={handleEditAddressChange}
                  value={editAddress.typE_ADDRESS || editAddress.TYPE_ADDRESS || ''}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name='housE_NUMBER'
                  placeholder='Số nhà'
                  onChange={handleEditAddressChange}
                  value={editAddress.housE_NUMBER || editAddress.HOUSE_NUMBER || ''}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name='street'
                  placeholder='Đường'
                  onChange={handleEditAddressChange}
                  value={editAddress.street || editAddress.STREET || ''}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name='city'
                  placeholder='Thành phố'
                  onChange={handleEditAddressChange}
                  value={editAddress.city || editAddress.CITY || ''}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name='country'
                  placeholder='Quốc gia'
                  onChange={handleEditAddressChange}
                  value={editAddress.country || editAddress.COUNTRY || ''}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name='postaL_CODE'
                  placeholder='Mã bưu điện'
                  onChange={handleEditAddressChange}
                  value={editAddress.postaL_CODE || editAddress.POSTAL_CODE || editAddress.postal_CODE || ''}
                  className="border px-3 py-2 rounded"
                />
              </div>
              <div className="flex gap-4">
                <button onClick={handleSaveEditAddress} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Lưu địa chỉ</button>
                <button onClick={handleCancelEditAddress} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Hủy</button>
              </div>
            </div>
          )}
          {isAddingAddress && (
            <div className='p-6 mt-4 bg-slate-100 rounded-lg border border-slate-300'>
              <h3 className='text-slate-800 font-semibold mb-4'>Nhập địa chỉ</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                <input
                  name='typE_ADDRESS'
                  placeholder='Loại địa chỉ (nhà, văn phòng ...)'
                  onChange={handleNewAddress}
                  value={newAddress.typE_ADDRESS}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name='housE_NUMBER'
                  placeholder='Số nhà'
                  onChange={handleNewAddress}
                  value={newAddress.housE_NUMBER}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name='street'
                  placeholder='Đường'
                  onChange={handleNewAddress}
                  value={newAddress.street}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name='city'
                  placeholder='Thành phố/tỉnh'
                  onChange={handleNewAddress}
                  value={newAddress.city}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name='country'
                  placeholder='Quốc gia'
                  onChange={handleNewAddress}
                  value={newAddress.country}
                  className="border px-3 py-2 rounded"
                />
                <input
                  name='postaL_CODE'
                  placeholder='Mã bưu điện'
                  onChange={handleNewAddress}
                  value={newAddress.postaL_CODE}
                  className="border px-3 py-2 rounded"
                />
              </div>
              <div className="flex gap-4">
                <button onClick={handleSaveAddressClick} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Lưu địa chỉ</button>
                <button onClick={() => setIsAddingAddress(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Hủy</button>
              </div>
            </div>
          )}
          {error && <p className="text-red-600 mt-4">{error}</p>}
          {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
}