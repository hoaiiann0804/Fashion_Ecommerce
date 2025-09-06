import React, { useState } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { 
  Settings as SettingsIcon,
  Save,
  Store,
  Mail,
  Phone,
  Globe,
  Facebook,
  Instagram,
  MapPin,
  CreditCard,
  Truck,
  Bell,
  Shield
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../../components/ui/Tabs";
import { Label } from "../../components/ui/Label";
import { Switch } from "../../components/ui/Switch";
import { Separator } from "../../components/ui/Separator";
import { toast } from "sonner";

const GeneralSettings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "My E-Commerce Store",
    siteDescription: "Cửa hàng trực tuyến với các sản phẩm chất lượng cao",
    email: "contact@mystore.com",
    phone: "+84 123 456 789",
    address: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    websiteUrl: "https://mystore.com",
    logo: "",
    favicon: ""
  });

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveGeneral = () => {
    // Here you would save the settings to the backend
    toast.success("Cài đặt chung đã được lưu");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="siteName">Tên cửa hàng</Label>
          <Input 
            id="siteName" 
            name="siteName"
            value={generalSettings.siteName} 
            onChange={handleGeneralChange} 
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="siteDescription">Mô tả</Label>
          <Textarea 
            id="siteDescription" 
            name="siteDescription"
            value={generalSettings.siteDescription} 
            onChange={handleGeneralChange} 
            rows={3}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email liên hệ</Label>
          <Input 
            id="email" 
            name="email"
            type="email"
            value={generalSettings.email} 
            onChange={handleGeneralChange} 
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input 
            id="phone" 
            name="phone"
            value={generalSettings.phone} 
            onChange={handleGeneralChange} 
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="address">Địa chỉ</Label>
          <Textarea 
            id="address" 
            name="address"
            value={generalSettings.address} 
            onChange={handleGeneralChange} 
            rows={2}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="websiteUrl">URL website</Label>
          <Input 
            id="websiteUrl" 
            name="websiteUrl"
            value={generalSettings.websiteUrl} 
            onChange={handleGeneralChange} 
          />
        </div>

        <div className="flex items-center justify-end">
          <Button className="flex items-center gap-2" onClick={handleSaveGeneral}>
            <Save size={16} />
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
};

const SocialSettings = () => {
  const [socialSettings, setSocialSettings] = useState({
    facebook: "https://facebook.com/mystore",
    instagram: "https://instagram.com/mystore",
    twitter: "https://twitter.com/mystore",
    youtube: "https://youtube.com/mystore",
    tiktok: "https://tiktok.com/@mystore"
  });

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSocialSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSocial = () => {
    // Here you would save the settings to the backend
    toast.success("Cài đặt mạng xã hội đã được lưu");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="facebook">Facebook</Label>
          <div className="flex items-center">
            <Facebook size={18} className="mr-2 text-blue-600" />
            <Input 
              id="facebook" 
              name="facebook"
              value={socialSettings.facebook} 
              onChange={handleSocialChange} 
            />
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="instagram">Instagram</Label>
          <div className="flex items-center">
            <Instagram size={18} className="mr-2 text-pink-600" />
            <Input 
              id="instagram" 
              name="instagram"
              value={socialSettings.instagram} 
              onChange={handleSocialChange} 
            />
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="twitter">Twitter</Label>
          <div className="flex items-center">
            <svg className="mr-2 h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
            <Input 
              id="twitter" 
              name="twitter"
              value={socialSettings.twitter} 
              onChange={handleSocialChange} 
            />
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="youtube">YouTube</Label>
          <div className="flex items-center">
            <svg className="mr-2 h-5 w-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
            </svg>
            <Input 
              id="youtube" 
              name="youtube"
              value={socialSettings.youtube} 
              onChange={handleSocialChange} 
            />
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="tiktok">TikTok</Label>
          <div className="flex items-center">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
            </svg>
            <Input 
              id="tiktok" 
              name="tiktok"
              value={socialSettings.tiktok} 
              onChange={handleSocialChange} 
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Button className="flex items-center gap-2" onClick={handleSaveSocial}>
            <Save size={16} />
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
};

const formatPrice = (amount, currencySymbol = "₫") => {
  if (typeof amount !== "number") return "";
  return amount.toLocaleString("vi-VN") + currencySymbol;
};

const PaymentSettings = () => {
  const [paymentSettings, setPaymentSettings] = useState({
    enableCOD: true,
    enableBankTransfer: true,
    enableCreditCard: false,
    bankDetails: "Ngân hàng: VCB\nSố tài khoản: 1234567890\nChủ tài khoản: Nguyễn Văn A",
    supportedCurrencies: "VND",
    priceFormat: "{{amount}}₫"
  });

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleToggle = (name) => {
    setPaymentSettings(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSavePayment = () => {
    toast.success("Cài đặt thanh toán đã được lưu");
  };

  // Ví dụ sử dụng hàm formatPrice
  // const examplePrice = 100000;
  // const formattedPrice = formatPrice(examplePrice);

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableCOD">Thanh toán khi nhận hàng (COD)</Label>
            <p className="text-sm text-muted-foreground">Cho phép khách hàng thanh toán khi nhận hàng</p>
          </div>
          <Switch
            checked={paymentSettings.enableCOD}
            onCheckedChange={() => handleToggle('enableCOD')}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableBankTransfer">Chuyển khoản ngân hàng</Label>
            <p className="text-sm text-muted-foreground">Cho phép thanh toán qua chuyển khoản ngân hàng</p>
          </div>
          <Switch
            checked={paymentSettings.enableBankTransfer}
            onCheckedChange={() => handleToggle('enableBankTransfer')}
          />
        </div>

        {paymentSettings.enableBankTransfer && (
          <div className="grid gap-3 ml-6">
            <Label htmlFor="bankDetails">Thông tin tài khoản ngân hàng</Label>
            <Textarea 
              id="bankDetails" 
              name="bankDetails"
              value={paymentSettings.bankDetails} 
              onChange={handlePaymentChange} 
              rows={4}
            />
          </div>
        )}

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableCreditCard">Thẻ tín dụng/Ví điện tử</Label>
            <p className="text-sm text-muted-foreground">Tích hợp cổng thanh toán trực tuyến</p>
          </div>
          <Switch
            checked={paymentSettings.enableCreditCard}
            onCheckedChange={() => handleToggle('enableCreditCard')}
          />
        </div>

        <Separator />

        <div className="grid gap-3">
          <Label htmlFor="supportedCurrencies">Tiền tệ hỗ trợ</Label>
          <Input 
            id="supportedCurrencies" 
            name="supportedCurrencies"
            value={paymentSettings.supportedCurrencies} 
            onChange={handlePaymentChange} 
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="priceFormat">Định dạng giá</Label>
          <Input 
            id="priceFormat" 
            name="priceFormat"
            value={paymentSettings.priceFormat} 
            onChange={handlePaymentChange} 
          />
          <p className="text-sm text-muted-foreground">Sử dụng {'{{amount}}'} để hiển thị số tiền</p>
        </div>

        <div className="flex items-center justify-end">
          <Button className="flex items-center gap-2" onClick={handleSavePayment}>
            <Save size={16} />
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
};

const ShippingSettings = () => {
  const [shippingSettings, setShippingSettings] = useState({
    enableShipping: true,
    defaultShippingFee: "30000",
    freeShippingThreshold: "500000",
    shippingNote: "Thời gian giao hàng từ 2-5 ngày làm việc tùy khu vực"
  });

  const handleShippingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShippingSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleToggle = (name) => {
    setShippingSettings(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSaveShipping = () => {
    toast.success("Cài đặt vận chuyển đã được lưu");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="enableShipping">Bật tính năng vận chuyển</Label>
            <p className="text-sm text-muted-foreground">Kích hoạt tính phí vận chuyển cho đơn hàng</p>
          </div>
          <Switch
            checked={shippingSettings.enableShipping}
            onCheckedChange={() => handleToggle('enableShipping')}
          />
        </div>

        {shippingSettings.enableShipping && (
          <>
            <div className="grid gap-3">
              <Label htmlFor="defaultShippingFee">Phí vận chuyển mặc định (VND)</Label>
              <Input 
                id="defaultShippingFee" 
                name="defaultShippingFee"
                type="number"
                value={shippingSettings.defaultShippingFee} 
                onChange={handleShippingChange} 
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="freeShippingThreshold">Mức miễn phí vận chuyển (VND)</Label>
              <Input 
                id="freeShippingThreshold" 
                name="freeShippingThreshold"
                type="number"
                value={shippingSettings.freeShippingThreshold} 
                onChange={handleShippingChange} 
              />
              <p className="text-sm text-muted-foreground">Đơn hàng từ mức này trở lên sẽ được miễn phí vận chuyển</p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="shippingNote">Ghi chú vận chuyển</Label>
              <Textarea 
                id="shippingNote" 
                name="shippingNote"
                value={shippingSettings.shippingNote} 
                onChange={handleShippingChange} 
                rows={3}
              />
            </div>
          </>
        )}

        <div className="flex items-center justify-end">
          <Button className="flex items-center gap-2" onClick={handleSaveShipping}>
            <Save size={16} />
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    notifyNewOrder: true,
    notifyLowStock: true,
    notifyProductReview: true,
    adminEmail: "admin@mystore.com",
    emailNotifications: true,
    browserNotifications: false
  });

  const handleNotificationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleToggle = (name) => {
    setNotificationSettings(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSaveNotifications = () => {
    toast.success("Cài đặt thông báo đã được lưu");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifyNewOrder">Thông báo đơn hàng mới</Label>
            <p className="text-sm text-muted-foreground">Nhận thông báo khi có đơn hàng mới</p>
          </div>
          <Switch
            checked={notificationSettings.notifyNewOrder}
            onCheckedChange={() => handleToggle('notifyNewOrder')}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifyLowStock">Thông báo hàng tồn kho thấp</Label>
            <p className="text-sm text-muted-foreground">Nhận thông báo khi sản phẩm sắp hết hàng</p>
          </div>
          <Switch
            checked={notificationSettings.notifyLowStock}
            onCheckedChange={() => handleToggle('notifyLowStock')}
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifyProductReview">Thông báo đánh giá mới</Label>
            <p className="text-sm text-muted-foreground">Nhận thông báo khi có đánh giá sản phẩm mới</p>
          </div>
          <Switch
            checked={notificationSettings.notifyProductReview}
            onCheckedChange={() => handleToggle('notifyProductReview')}
          />
        </div>

        <Separator />

        <div className="grid gap-3">
          <Label htmlFor="adminEmail">Email quản trị viên</Label>
          <Input 
            id="adminEmail" 
            name="adminEmail"
            type="email"
            value={notificationSettings.adminEmail} 
            onChange={handleNotificationChange} 
          />
          <p className="text-sm text-muted-foreground">Địa chỉ email nhận thông báo từ hệ thống</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="emailNotifications">Thông báo qua email</Label>
            <p className="text-sm text-muted-foreground">Gửi thông báo qua email</p>
          </div>
          <Switch
            checked={notificationSettings.emailNotifications}
            onCheckedChange={() => handleToggle('emailNotifications')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="browserNotifications">Thông báo trên trình duyệt</Label>
            <p className="text-sm text-muted-foreground">Hiển thị thông báo trên trình duyệt</p>
          </div>
          <Switch
            checked={notificationSettings.browserNotifications}
            onCheckedChange={() => handleToggle('browserNotifications')}
          />
        </div>

        <div className="flex items-center justify-end">
          <Button className="flex items-center gap-2" onClick={handleSaveNotifications}>
            <Save size={16} />
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  const [securitySettings, setSecuritySettings] = useState({
    requireStrongPassword: true,
    passwordExpiryDays: "90",
    twoFactorAuth: false,
    loginAttempts: "5",
    sessionTimeout: "30"
  });

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleToggle = (name) => {
    setSecuritySettings(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSaveSecurity = () => {
    toast.success("Cài đặt bảo mật đã được lưu");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="requireStrongPassword">Yêu cầu mật khẩu mạnh</Label>
            <p className="text-sm text-muted-foreground">Mật khẩu phải có ít nhất 8 ký tự, chứa chữ hoa, chữ thường, số và ký tự đặc biệt</p>
          </div>
          <Switch
            checked={securitySettings.requireStrongPassword}
            onCheckedChange={() => handleToggle('requireStrongPassword')}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="passwordExpiryDays">Thời hạn mật khẩu (ngày)</Label>
          <Input 
            id="passwordExpiryDays" 
            name="passwordExpiryDays"
            type="number"
            value={securitySettings.passwordExpiryDays} 
            onChange={handleSecurityChange} 
          />
          <p className="text-sm text-muted-foreground">Số ngày trước khi người dùng phải thay đổi mật khẩu (0 = không hết hạn)</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="twoFactorAuth">Xác thực hai yếu tố</Label>
            <p className="text-sm text-muted-foreground">Yêu cầu xác thực thêm khi đăng nhập</p>
          </div>
          <Switch
            checked={securitySettings.twoFactorAuth}
            onCheckedChange={() => handleToggle('twoFactorAuth')}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="loginAttempts">Số lần đăng nhập thất bại tối đa</Label>
          <Input 
            id="loginAttempts" 
            name="loginAttempts"
            type="number"
            value={securitySettings.loginAttempts} 
            onChange={handleSecurityChange} 
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="sessionTimeout">Thời gian phiên đăng nhập (phút)</Label>
          <Input 
            id="sessionTimeout" 
            name="sessionTimeout"
            type="number"
            value={securitySettings.sessionTimeout} 
            onChange={handleSecurityChange} 
          />
        </div>

        <div className="flex items-center justify-end">
          <Button className="flex items-center gap-2" onClick={handleSaveSecurity}>
            <Save size={16} />
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Cài đặt hệ thống</h1>
            <p className="text-muted-foreground">Quản lý các cài đặt cho cửa hàng của bạn</p>
          </div>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Store size={16} />
              <span className="hidden md:inline">Chung</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Globe size={16} />
              <span className="hidden md:inline">Mạng xã hội</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard size={16} />
              <span className="hidden md:inline">Thanh toán</span>
            </TabsTrigger>
            <TabsTrigger value="shipping" className="flex items-center gap-2">
              <Truck size={16} />
              <span className="hidden md:inline">Vận chuyển</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} />
              <span className="hidden md:inline">Thông báo</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield size={16} />
              <span className="hidden md:inline">Bảo mật</span>
            </TabsTrigger>
          </TabsList>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <SettingsIcon size={20} className="text-muted-foreground" />
                <TabsContent value="general">Cài đặt chung</TabsContent>
                <TabsContent value="social">Cài đặt mạng xã hội</TabsContent>
                <TabsContent value="payment">Cài đặt thanh toán</TabsContent>
                <TabsContent value="shipping">Cài đặt vận chuyển</TabsContent>
                <TabsContent value="notifications">Cài đặt thông báo</TabsContent>
                <TabsContent value="security">Cài đặt bảo mật</TabsContent>
              </CardTitle>
              <CardDescription>
                <TabsContent value="general">Cấu hình cửa hàng và thông tin liên hệ</TabsContent>
                <TabsContent value="social">Quản lý liên kết mạng xã hội của cửa hàng</TabsContent>
                <TabsContent value="payment">Cấu hình các phương thức thanh toán</TabsContent>
                <TabsContent value="shipping">Cấu hình vận chuyển và giao hàng</TabsContent>
                <TabsContent value="notifications">Tùy chỉnh thông báo hệ thống</TabsContent>
                <TabsContent value="security">Quản lý bảo mật và quyền truy cập</TabsContent>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="general">
                <GeneralSettings />
              </TabsContent>
              <TabsContent value="social">
                <SocialSettings />
              </TabsContent>
              <TabsContent value="payment">
                <PaymentSettings />
              </TabsContent>
              <TabsContent value="shipping">
                <ShippingSettings />
              </TabsContent>
              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>
              <TabsContent value="security">
                <SecuritySettings />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;