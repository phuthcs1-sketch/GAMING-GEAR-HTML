// =========================================
// GEARNEXUS — Hệ Thống Cấu Hình Hệ Sinh Thái
// Chỉnh sửa tệp này để cập nhật dữ liệu toàn trang web.
// =========================================

const CONFIG = {

  // ---- Định danh Thương hiệu / Website ----
  site: {
    name:        "GearNexus",
    tagline:     "High-Performance Gaming Gear, Engineered for Champions",
    description: "Hệ sinh thái thiết bị ngoại vi gaming gear cao cấp — Bàn phím chuyên dụng, chuột gaming tốc độ cao, tai nghe tái tạo âm thanh chuẩn phòng thu và các phụ kiện custom tối tân.",
    logo:        "assets/images/logo.png",
    url:         "https://gearnexus.com",        // cập nhật khi triển khai thực tế
    language:    "vi",
  },

  // ---- Thông tin Liên hệ / Chủ sở hữu ----
  contact: {
    ownerName:  "GearNexus Co.",
    email:      "hello@gearnexus.com",
    phone:      "090 xxx xxxx",
    city:       "Da Nang City",
    country:    "Vietnam",
    zalo:       "090 xxx xxxx",
    instagram:  "@gearnexus_tech",
    facebook:   "GearNexus.Esports",
    tiktok:     "@gearnexus_gaming",
  },

  // ---- Đơn vị Tiền tệ & Định dạng vùng ----
  currency: {
    locale:    "vi-VN",     // sử dụng bởi hàm toLocaleString()
    suffix:    " đ",        // hiển thị ngay sau chuỗi số tiền đã định dạng
    prefix:    "",
  },

  // ---- Cấu hình Vận chuyển (Shipping) ----
  shipping: {
    freeThreshold: 1000000,  // Đơn hàng trên mức này sẽ được miễn phí vận chuyển (1.000.000đ)
    defaultFee:     40000,   // Phí ship đồng giá áp dụng khi dưới ngưỡng miễn phí (40.000đ)
    estimatedDays:  "1–3",   // Hiển thị ở trang chi tiết sản phẩm ("giao hàng trong vòng X ngày")
  },

  // ---- Số liệu thống kê hiển thị tại trang chủ Hero ----
  stats: {
    keychains:   "150+",    // Tổng số lượng thiết bị/mã hàng trong kho vũ khí
    happyBuyers: "10K+",    // Số lượng game thủ đã tin dùng thiết bị
    avgRating:   "4.9★",   // Điểm đánh giá trung bình hệ thống
  },

  // ---- Danh mục sản phẩm (Đồng bộ với Kho vũ khí GearNexus) ----
  categories: [
    { name: "Bàn phím",    emoji: "⌨️" },
    { name: "Chuột",       emoji: "🖱️" },
    { name: "Tai Nghe",       emoji: "🎧" },
  ],

  // ---- Mã giảm giá / Ưu đãi chiến binh ----
  promoCodes: {
    "NEXUS10":   { discount: 10, label: "Giảm 10% tổng giá trị đơn hàng" },
    "WELCOME":   { discount: 15, label: "Ưu đãi thành viên mới giảm 15%" },
    "GAMER5":    { discount:  5, label: "Mã giảm giá đặc quyền Gamer 5%"  },
  },

  // ---- Cấu hình Trang cửa hàng ----
  shop: {
    pageSize:       9,        // Số lượng sản phẩm hiển thị tối đa mỗi lần (Tải thêm)
    maxPriceFilter: 5000000,  // Giá trị tối đa của thanh trượt bộ lọc giá (5.000.000đ)
    defaultSort:    "newest", // Kiểu sắp xếp mặc định: "newest" | "price-asc" | "price-desc" | "rating" | "discount"
  },

  // ---- Tài khoản thử nghiệm (Mock Auth) ----
  auth: {
    demoEmail:    "demo@gearnexus.com",
    demoPassword: "demo123",
    demoName:     "Gamer Demo",
    minPasswordLength: 6,
  },

  // ---- Tối ưu hóa SEO / Thẻ Meta ----
  seo: {
    titleSuffix:  " – Hệ Sinh Thái Gaming Gear Cao Cấp", 
    ogImage:      "assets/og-image.jpg", 
    keywords:     "GearNexus, gaming gear, ban phim co, chuot gaming, tai nghe gaming, custom keyboard, switch gaming, Da Nang, Vietnam",
  },

  // ---- Chân trang (Footer) ----
  footer: {
    copyrightYear: 2026,
    tagline:       "Mọi trang bị đều được kiểm định hiệu năng nghiêm ngặt — Đạt chuẩn Esports chuyên nghiệp.",
  },

  // ---- Quản lý tính năng hệ thống (Feature Flags) ----
  features: {
    wishlist:     true,   // Cho phép lưu sản phẩm yêu thích
    reviews:      true,   // Bật tính năng đánh giá/phản hồi sản phẩm
    stockBadge:   true,   // Hiển thị trạng thái/số lượng hàng tồn kho
    freeShipping: true,   // Kích hoạt thanh thông báo tiến trình miễn phí giao hàng
    promoCodes:   true,   // Áp dụng hệ thống mã giảm giá tại trang thanh toán
  },
};

// =========================================
// Các hàm trợ giúp xử lý hệ thống — Không thay đổi cấu trúc bên dưới
// =========================================

function formatPrice(amount) {
  const formatted = amount.toLocaleString(CONFIG.currency.locale);
  return CONFIG.currency.prefix + formatted + CONFIG.currency.suffix;
}

function getCategoryEmoji(name) {
  const cat = CONFIG.categories.find(c => c.name === name);
  return cat ? cat.emoji : "⚙️";
}

function validatePromoCode(code) {
  const entry = CONFIG.promoCodes[code.toUpperCase()];
  if (!entry) return { valid: false };
  return { valid: true, ...entry };
}

function setPageTitle(pageTitle) {
  document.title = pageTitle
    ? pageTitle + CONFIG.seo.titleSuffix
    : CONFIG.site.name;
}