# 🛍️ Amethyst - Fashion E-commerce Platform

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Project Status](https://img.shields.io/badge/status-active_development-yellowgreen)](https://github.com/yourusername/Fashion_Ecommerce)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


🌟 Giới thiệu
Amethyst là một nền tảng thương mại điện tử thời trang hiện đại, sử dụng kiến trúc micro-frontend, mang đến trải nghiệm mua sắm trực tuyến mượt mà và hệ thống quản trị hiệu quả.
Điểm nổi bật:

Giao diện người dùng đẹp mắt, tương thích đa thiết bị.
Hệ thống quản trị mạnh mẽ với đầy đủ tính năng CRUD.
Tốc độ tải trang nhanh nhờ Vite và tối ưu hóa hiệu suất.
Bảo mật cao với xác thực JWT và phân quyền người dùng.

Vai trò của nhóm:

Nguyễn Hoài An: Phát triển frontend (React, TypeScript, Vite, Tailwind CSS) và tích hợp API.
Trần Xuân Hoàng: Phát triển backend (ASP.NET Core, SQL Server, Entity Framework Core).
Tối ưu hiệu suất và cấu hình triển khai trên Azure.


Lưu ý: Hiện tại dự án chỉ chạy trên môi trường local do lỗi triển khai frontend. Chúng tôi đang khắc phục và sẽ cập nhật hướng dẫn triển khai sớm.


📸 Hình ảnh demo

Trang chủ với danh sách sản phẩm nổi bật
Thông tin sản phẩm và bộ lọc
Quản lý sản phẩm trong giỏ hàng
Thanh toán an toàn (đang phát triển)
Giao diện quản trị với thống kê doanh thu

![Trang chủ](https://github.com/hoaiiann0804/Fashion_Ecommerce/raw/main/screenshots/homepage.png)
![Trang chủ](https://github.com/hoaiiann0804/Fashion_Ecommerce/raw/main/screenshots/ProductList_homepage.jpg)

*Trang chủ với danh sách sản phẩm và thanh tìm kiếm*

![Trang thông tin sản phẩm và bộ lọc](https://github.com/hoaiiann0804/Fashion_Ecommerce/raw/main/screenshots/Product_Fliter.jpg)

*Trang Thông tin sản phẩm và bộ lọc *

![chi tiết sản phẩm](https://github.com/hoaiiann0804/Fashion_Ecommerce/raw/main/screenshots/Product_Detail.jpg)

*Chi tiết sản phẩm*, variants*

![Giỏ hàng](https://github.com/hoaiiann0804/Fashion_Ecommerce/raw/main/screenshots/cart.jpg)

*Quản lý sản phẩm trong giỏ hàng*

![Thanh toán tích hợp mã QR từ Sepay](https://github.com/hoaiiann0804/Fashion_Ecommerce/raw/main/screenshots/checkout.jpg)

*Thanh toán với mã QR từ Sepay*

![Đơn hàng](https://github.com/hoaiiann0804/Fashion_Ecommerce/raw/main/screenshots/orderr.jpg)
![Chi tiết đơn hàng, cập nhật trạng thái, và thanh toán*](https://github.com/hoaiiann0804/Fashion_Ecommerce/raw/main/screenshots/order_detail.jpg)

*Xem chi tiết đơn hàng, cập nhật trạng thái, và thanh toán*

![Admin Dashboard](https://github.com/hoaiiann0804/Fashion_Ecommerce/raw/main/screenshots/admin_home.jpg)
*Dashboard quản trị với thống kê doanh thu*

![Admin Dashboard](https://github.com/hoaiiann0804/Fashion_Ecommerce/raw/main/screenshots/product_admin.jpg)

*Dashboard quản trị với danh sách sản phẩm*

![Admin Dashboard](https://github.com/hoaiiann0804/Fashion_Ecommerce/raw/main/screenshots/admin_categories.jpg)
*Dashboard quản trị với danh sách danh mục*

![Admin Dashboard](https://github.com/Fashion_Ecommerce/raw/main/screenshots/admin_order.jpg)
![Admin Dashboard](https://github.com/hoaiiann0804/Fashion_Ecommerce/raw/main/screenshots/admin_order_detail.jpg)

*Dashboard quản trị với danh sách đơn hàng*

![Admin Dashboard](https://github.com/hoaiiann0804/E-Commerce-Mini-with-AI-Chatbot/raw/main/screenshots/admin_user.png)

*Dashboard quản trị với danh sách ngườin dùng*

![Admin Dashboard](https://github.com/hoaiiann0804/E-Commerce-Mini-with-AI-Chatbot/raw/main/screenshots/admin_warranty.png)

🚀 Công nghệ sử dụng
Frontend (Client & Admin)

Framework: React 18.2.0
Ngôn ngữ: JavaScript, TypeScript
Build Tool: Vite 4.4.5
Styling: Tailwind CSS 3.3.3
State Management: React Context API
Form Handling: React Hook Form
Routing: React Router DOM

Backend (API)

Framework: ASP.NET Core 7.0
API Platform: RESTful API với Clean Architecture
Authentication: JWT với Identity Server
Database: Microsoft SQL Server 2022
ORM: Entity Framework Core 7.0
API Documentation: Swagger/OpenAPI

🛠️ Cài đặt
Yêu cầu hệ thống

Node.js >= 16.14.0
npm >= 8.3.1
.NET SDK 7.0
SQL Server 2022 hoặc Azure SQL
Git

Các bước cài đặt

Clone dự án
```
git clone [https://github.com/nguyenhoai-an/Amethyst.git](https://github.com/hoaiiann0804/Fashion_Ecommerce.git)
cd Fashion_Ecommerce
```


Cấu hình môi trường

Frontend: Tạo file .env trong thư mục client và admin:# client/.env
```
VITE_API_URL=https://localhost:5001
VITE_GOOGLE_ANALYTICS_ID=your-ga-id
```

# admin/.env
```
VITE_ADMIN_API_URL=https://localhost:5001/api/admin
VITE_ADMIN_TOKEN=your-admin-token
```

```
Backend: Cập nhật Amethyst.API/appsettings.json:{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=AmethystDB;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "JwtSettings": {
    "Secret": "your_jwt_secret_key_here",
    "ExpiryInMinutes": 60,
    "Issuer": "AmethystAPI",
    "Audience": "AmethystClient"
  }
}
```



Cài đặt frontend
```
cd client
npm install
npm run dev

Truy cập: http://localhost:5173
```
Cài đặt admin
cd ../admin
npm install
npm run dev

Truy cập: http://localhost:5173/admin
```

Cài đặt backend
```
cd ../Amethyst.API
dotnet restore
dotnet ef database update
dotnet run

Truy cập Swagger UI: https://localhost:5001/swagger
```

Tài khoản thử nghiệm
```
Khách hàng: user@example.com / password123
Admin: admin@example.com / admin123
```



🎯 Tính năng chính
Phía người dùng

🔍 Tìm kiếm và lọc sản phẩm theo giá, danh mục, kích thước.
🛒 Giỏ hàng thông minh với lưu trữ tạm thời.
💳 Thanh toán an toàn (đang phát triển).
👤 Quản lý tài khoản cá nhân (đăng ký, đăng nhập, cập nhật thông tin).
📱 Giao diện responsive cho mobile và desktop.

Phía quản trị

📊 Dashboard với biểu đồ doanh thu.
📦 Quản lý sản phẩm, danh mục, và kho hàng.
👥 Quản lý người dùng và phân quyền (admin, nhân viên).
📝 Theo dõi và xử lý đơn hàng.
📈 Báo cáo bán hàng chi tiết.


## 📂 Cấu trúc dự án

```plaintext
Amethyst/
├── client/                       # Giao diện người dùng (React + TypeScript + Vite)
│   ├── src/
│   │   ├── assets/             # Hình ảnh, fonts
│   │   ├── components/         # Component dùng chung
│   │   ├── features/           # Tính năng chính
│   │   └── pages/              # Các trang người dùng
│   └── public/                 # Tài nguyên tĩnh
├── admin/                        # Giao diện quản trị (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/         # Component dùng chung
│   │   ├── pages/              # Các trang quản trị
│   │   ├── services/           # Xử lý API
│   │   └── styles/             # File CSS/SCSS
│   └── public/                 # Tài nguyên tĩnh
├── Amethyst.API/                # Backend ASP.NET Core
│   ├── Controllers/            # API Controllers
│   ├── Models/                # Domain models và DTOs
│   ├── Data/                  # DbContext và Migrations
│   ├── Services/               # Business logic
│   ├── Middleware/            # Custom middleware
│   └── appsettings.json        # Cấu hình ứng dụng
├── screenshots/                 # Ảnh chụp màn hình
└── README.md                    # Tài liệu dự án
🚀 Triển khai

Lưu ý: Triển khai frontend hiện đang gặp lỗi. Hướng dẫn dưới đây áp dụng khi lỗi được khắc phục.

Triển khai Backend

Local Development
```
cd Amethyst.API
dotnet restore
dotnet ef database update
dotnet run
```

Truy cập Swagger UI: https://localhost:5001/swagger

Triển khai lên Azure

Tạo App Service và SQL Database trên Azure Portal.
Cấu hình Connection Strings trong Application Settings.
Triển khai qua GitHub Actions hoặc Azure DevOps.



Triển khai Frontend
```
Build productioncd client
npm run build
```


Triển khai thư mục dist lên Vercel hoặc IIS (khi lỗi triển khai được khắc phục).

🤝 Đóng góp
Chúng tôi hoan nghênh mọi đóng góp! Để tham gia:

Tạo Issue: Mô tả rõ vấn đề hoặc tính năng mới, kèm ảnh chụp màn hình nếu cần.

Tạo Pull Request:
```
git clone [https://github.com/nguyenhoai-an/Amethyst.git](https://github.com/hoaiiann0804/Fashion_Ecommerce.git)
git checkout -b feature/your-feature-name
git add .
git commit -m "feat: mô tả thay đổi"
git push origin feature/your-feature-name
```

Nguyên tắc code:
Tuân thủ coding style hiện có.
Viết unit test bằng Jest (frontend) hoặc xUnit (backend).
Cập nhật tài liệu nếu thay đổi giao diện hoặc API.



Xem CONTRIBUTING.md để biết thêm chi tiết.
📄 Giấy phép
Dự án được cấp phép theo MIT License.
🔍 Trạng thái dự án
Đang phát triển tích cực - Phiên bản hiện tại: v1.0.0-beta
Tính năng đang phát triển

 Hệ thống đánh giá sản phẩm
 Tích hợp thanh toán trực tuyến
 Hỗ trợ đa ngôn ngữ

🔧 Kết quả đạt được

Tải trang dưới 2 giây nhờ Vite và tối ưu hóa frontend.
Xử lý API an toàn với JWT và Identity Server.
Database tối ưu với Entity Framework Core và SQL Server.

📚 Bài học rút ra

Thành thạo kiến trúc micro-frontend và Clean Architecture.
Học cách tích hợp Swagger/OpenAPI và tối ưu hiệu suất backend.
Nâng cao kỹ năng debug trong môi trường full-stack.

📞 Liên hệ
```
Nhóm phát triển: Nguyễn Hoài An, Trần Xuân Hoàng
Email: hoaiiann0804@gmail.com
GitHub: [github.com/nguyenhoai-an](https://github.com/hoaiiann0804)
```


🛠️ Được phát triển bởi Nhóm 10 - Đồ án Tốt nghiệp CNTT - Đại học Công nghệ Thông tin
