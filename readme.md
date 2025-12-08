# Website BookStore 
Trang web phục vụ cho việc bán sách 

## Installation
hướng dẫn cài đặt chạy dự án lần đầu 

bước 1: clone dự án từ gitHub  (cần cài đặt git trước git vào máy trước khi clone)
git clone https://github.com/NgThVinh20/CongNgheWeb.git (nếu bạn chưa có repo local)
git remote https://github.com/NgThVinh20/CongNgheWeb.git (nếu bạn đã có repo tại local và muốn kết nối tới repo online)

bước 2: cài đặt nodeJS vào máy(chỉ cài một lần duy nhất)
bước 3: Mở cmd cài yarn bằng câu lệnh npm install --global yarn (chỉ cài 1 lần duy nhất)
kiểm tra lại bằng câu lệnh yarn --version
bước 4: chạy câu lệnh yarn install để cài đặt toàn bộ thư viện trong dự án 
bước 5: chạy câu lệnh yarn start 

## các đường dẫn truy cập
1. localhost:1000 - truy cập vào trang chủ
2. localhost:1000/books truy cập vào trang danh sách sách
3. localhost:1000/books/details truy cập vào trang chi tiết sách
4. localhosst:1000/cart truy cập vào trang gio hàng

## các thư viện sử dụng trong dự án 
1. **Viewer.js** (Phiên bản 1.11.7)
   - Thư viện để xem ảnh với các tính năng như zoom, pan.
   - [Link tới CDN CSS](https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.7/viewer.css)
   - [Link tới CDN JS](https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.7/viewer.js)

2. **Swiper** (Phiên bản 12)
   - Thư viện tạo các slideshow/carousel với hiệu ứng mượt mà.
   - [Link tới CDN CSS](https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css)
   - [Link tới CDN JS](https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js)

3. **Font Awesome** (Phiên bản 7.0.0)
   - Thư viện cung cấp các biểu tượng (icons) sử dụng trong trang web.
   - [Link tới CDN CSS](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css)

4. **AOS (Animate On Scroll)** (Phiên bản 2.3.1)
   - Thư viện hỗ trợ hiệu ứng animation khi cuộn trang.
   - [Link tới CDN CSS](https://unpkg.com/aos@2.3.1/dist/aos.css)
   - [Link tới CDN JS](https://unpkg.com/aos@2.3.1/dist/aos.js)

5. **Just-Validate**
   - Thư viện giúp xác thực biểu mẫu (form validation).
   - [Link tới CDN JS](https://unpkg.com/just-validate@latest/dist/just-validate.production.min.js)

6. **Nodemon**
   - giúp tự động khởi động lại server khi phát hiện mã nguồn được thay đổi
   - cài đặt:yarn add nodemon
   -  "scripts": {
      "start": "nodemon --inspect index.js"
   }, thêm đoạn code này vào file package.json
7. **expressJs**
   - Express.js là một framework web nhẹ và nhanh dành cho Node.js, giúp xây dựng các ứng   dụng web và API một cách dễ dàng và hiệu quả.
   - cài đặt bằng yarn: yarn add express
   - nhúng thư viện vào trong dự án bằng câu lệnh "const express = require('express')"
8. **PUG**
   - yarn add pug
   - chạy câu lệnh yarn start để khởi động chương trình hoặc sau khi mã nguồn được thay đổi
9. **Mongoose**
   -- Kết nối tới MongoDB
10. **Notyf**
   -- Hiển thị ra câu thông báo đẹp hơn
11. **BcryptJS**
   --Mã hóa mật khẩu 
12. **Joi.dev**
   --validate dữ liệu bên backend
13. **JsonWebToken**
   --Lưu trạng thái đăng nhập bằng token
14. **JsonWebToken**
   --dùng để đọc (parse) dữ liệu cookie từ trình duyệt và đưa chúng vào req.cookies
15. **mailtrap**
   --Gửi mail tự động
16. **multer**
   --upload file từ FE lên BE
17. **cloudinary**
   --Luu trữ ảnh
18. **multer-storage-cloudinary**
   --up file từ multer lên cloudinary
19. **slug**
   --một chuỗi ký tự ngắn gọn, dễ đọc, dùng để đại diện cho một nội dung (bài viết, sản phẩm, danh mục…) trên URL