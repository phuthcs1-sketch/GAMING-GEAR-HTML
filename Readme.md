# GearNexus 🎮⌨️🖱️

## Giới thiệu

**GearNexus** là một website thương mại điện tử mô phỏng chuyên kinh doanh các sản phẩm **Gaming Gear Second-hand (đã qua sử dụng)** chất lượng cao tại thành phố Đà Nẵng. Dự án cung cấp trải nghiệm mua sắm trực tuyến với các mặt hàng như bàn phím cơ, chuột gaming, tai nghe, lót chuột và nhiều phụ kiện dành cho game thủ.

Dự án được xây dựng hoàn toàn bằng **HTML, CSS và JavaScript thuần (Vanilla JavaScript)**, không sử dụng Backend hay cơ sở dữ liệu thực tế. Toàn bộ dữ liệu được mô phỏng và lưu trữ bằng **Local Storage** của trình duyệt.

---

# Công Nghệ Sử Dụng

* HTML5
* CSS3
* JavaScript (ES6+)
* Local Storage API

---

# Tính Năng Chính

### 🏠 Trang Chủ

* Banner giới thiệu thương hiệu.
* Hiển thị sản phẩm nổi bật.
* Danh mục Gaming Gear phổ biến.

### 🛍️ Cửa Hàng

* Danh sách toàn bộ sản phẩm.
* Tìm kiếm sản phẩm theo tên.
* Lọc theo thương hiệu.
* Lọc theo tình trạng sản phẩm.
* Sắp xếp theo giá và độ phổ biến.

### 📦 Chi Tiết Sản Phẩm

* Hình ảnh thực tế.
* Thông số kỹ thuật.
* Tình trạng sản phẩm.
* Mô tả chi tiết.

### 🛒 Giỏ Hàng

* Thêm/Xóa sản phẩm.
* Cập nhật số lượng.
* Tính tổng tiền tự động.
* Áp dụng mã giảm giá.

### 👤 Tài Khoản Người Dùng

* Đăng ký tài khoản.
* Đăng nhập / Đăng xuất.
* Lưu phiên đăng nhập bằng Local Storage.

### ❤️ Danh Sách Yêu Thích

* Lưu sản phẩm quan tâm.
* Quản lý Wishlist cá nhân.

### ℹ️ Giới Thiệu

* Thông tin thương hiệu GearNexus.
* Chính sách bảo hành.
* Chính sách đổi trả.
* Câu hỏi thường gặp (FAQ).

---

# Hướng Dẫn Chạy Dự Án

## Cách 1: Mở Trực Tiếp

1. Tải hoặc clone dự án về máy.
2. Mở thư mục GearNexus.
3. Nhấp đúp vào tệp `index.html`.

Website sẽ chạy trực tiếp trên trình duyệt.

> Lưu ý: Một số trình duyệt có thể hạn chế Local Storage khi chạy bằng giao thức `file://`.

---

## Cách 2: Sử Dụng Live Server (Khuyến Nghị)

1. Mở dự án bằng Visual Studio Code.
2. Cài đặt tiện ích **Live Server**.
3. Nhấp chuột phải vào `index.html`.
4. Chọn **Open with Live Server**.

Truy cập:

http://127.0.0.1:5500

---

## Cách 3: Python HTTP Server

Mở Terminal tại thư mục dự án:

```bash
python3 -m http.server 8080
```

Truy cập:

http://localhost:8080

---

## Cách 4: Node.js Serve

```bash
npx serve .
```

Truy cập địa chỉ được hiển thị trên Terminal (thường là):

http://localhost:3000

---

# Tài Khoản Demo

| Thông Tin | Giá Trị                                         |
| --------- | ----------------------------------------------- |
| Email     | [demo@gearnexus.com](mailto:demo@gearnexus.com) |
| Mật khẩu  | demo123                                         |

Người dùng cũng có thể đăng ký tài khoản mới. Thông tin sẽ được lưu cục bộ trên trình duyệt.

---

# Mã Giảm Giá Hỗ Trợ

| Mã      | Ưu Đãi                |
| ------- | --------------------- |
| GEAR10  | Giảm 10%              |
| WELCOME | Ưu đãi khách hàng mới |
| STUDENT | Ưu đãi sinh viên      |

---

# Cấu Trúc Thư Mục

```text
GearNexus/
├── index.html          # Trang chủ
├── shop.html           # Trang cửa hàng / danh mục sản phẩm
├── product.html        # Trang chi tiết sản phẩm (Thông số kỹ thuật, Switch, Mắt đọc...)
├── cart.html           # Trang giỏ hàng & thanh toán
├── about.html          # Trang giới thiệu về GearNexus & Chính sách bảo hành gear
├── login.html          # Trang đăng nhập
├── register.html       # Trang đăng ký
├── css/
│   ├── style.css       # Các biến CSS và phong cách giao diện toàn cục (màu sắc Gaming)
│   ├── components.css  # Các thành phần: Nút, thẻ sản phẩm, modal, thông báo (toasts)
│   └── animations.css  # Hiệu ứng chuyển động mượt mà (fade, reveal)
└── js/
    ├── config.js       # Cấu hình toàn hệ thống (tên website, loại tiền tệ, phí ship, v.v.)
    ├── data.js         # Cơ sở dữ liệu giả lập của các sản phẩm Gaming Gear (Keyboard, Mouse, Headset...)
    ├── auth.js         # Xử lý logic Đăng nhập / Đăng xuất / Phiên làm việc của user
    ├── cart.js         # Logic quản lý Giỏ hàng và Danh sách yêu thích
    ├── main.js         # Điều khiển thanh điều hướng (navbar), thông báo toast, bộ render thẻ gear
    ├── shop.js         # Xử lý bộ lọc hãng/giá, tìm kiếm và sắp xếp tại trang Shop
    └── product.js      # Xử lý hiển thị thông số chi tiết và chọn số lượng tại trang Product
```

Đà Nẵng, Việt Nam

© 2026 GearNexus
