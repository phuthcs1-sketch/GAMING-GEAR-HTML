// =========================================
// GEARNEXUS — Central Product Database (data.js)
// Cơ sở dữ liệu thiết bị và các hàm truy xuất hệ thống
// =========================================

// =========================================
// GEARNEXUS — Central Product Database (data.js)
// Cơ sở dữ liệu 12 thiết bị Gaming Gear chuẩn hóa đường dẫn
// =========================================

const PRODUCTS = [
  {
    id: 1,
    name: "Bàn phím cơ AULA F87 Custom",
    category: "Bàn phím",
    price: 1250000,
    originalPrice: 1650000,
    condition: "Like New",
    stock: 5,
    rating: 4.8,
    reviews: 42,
    images: ["assets/images/Bàn phím cơ AULA F87 Custom.jpg"],
    description: "Bàn phím cơ layout TKL 87 phím gọn gàng, sở hữu bộ Keycap custom phối màu Cam - Đen - Trắng cực kỳ cá tính. Hỗ trợ hotswap toàn bàn phím, đã được lót foam tiêu âm đầy đủ mang lại cảm giác gõ cực mượt mượt mà và êm ái.",
    tags: ["aula", "f87", "mechanical", "hotswap", "tkl"],
    dateAdded: "2026-03-15T08:30:00Z"
  },
  {
    id: 2,
    name: "Bàn phím không dây Dell Alienware Pro Wireless Gaming",
    category: "Bàn phím",
    price: 3890000,
    originalPrice: 4500000,
    condition: "Like New",
    stock: 2,
    rating: 4.9,
    reviews: 18,
    images: ["assets/images/29582_ban_phim_gaming_khong_day_dell_alienware_pro_dark__2_.jpg"],
    description: "Siêu phẩm bàn phím gaming cao cấp từ Alienware với kết nối không dây siêu tốc CyberSync. Thiết kế layout 75% tối ưu không gian di chuột, hệ thống đèn nền RGB từng phím tùy biến vô hạn qua Alienware Command Center.",
    tags: ["alienware", "dell", "wireless", "rgb", "75percent"],
    dateAdded: "2026-05-10T14:22:00Z"
  },
  {
    id: 3,
    name: "Chuột không dây Logitech G Pro Wireless Gaming Mouse",
    category: "Chuột",
    price: 1850000,
    originalPrice: 2490000,
    condition: "Good",
    stock: 8,
    rating: 4.7,
    reviews: 124,
    images: ["assets/images/47527_mouse_logitech_g_pro_wireless_gaming_0001_1.jpg"],
    description: "Huyền thoại chuột gaming được các game thủ Esports chuyên nghiệp tin dùng. Trang bị mắt đọc HERO 25K siêu chính xác, trọng lượng siêu nhẹ chỉ 80g và công nghệ kết nối không dây Lightspeed độc quyền không độ trễ.",
    tags: ["logitech", "gpws", "lightspeed", "hero25k", "esports"],
    dateAdded: "2026-01-20T09:15:00Z"
  },
  {
    id: 4,
    name: "Tai nghe Logitech G733 Lightspeed Wireless 7.1 RGB (Black)",
    category: "Tai nghe",
    price: 2690000,
    originalPrice: 3390000,
    condition: "Like New",
    stock: 3,
    rating: 4.6,
    reviews: 56,
    images: ["assets/images/55855_tai_nghe_gaming_logitech_lightspeed_g733_wireless_7_1_rgb_0001_2.jpg"],
    description: "Tai nghe gaming không dây thế hệ mới với thiết kế headband dệt co giãn thể thao siêu êm ái. Âm thanh vòm DTS Headphone:X 2.0 chuẩn 7.1 kết hợp công nghệ lọc giọng nói Blue VO!CE qua micro cao cấp.",
    tags: ["logitech", "g733", "headset", "wireless", "7.1surround"],
    dateAdded: "2026-04-02T11:45:00Z"
  },
  {
    id: 5,
    name: "Tai nghe Logitech G733 Lightspeed Wireless 7.1 RGB (White Classic)",
    category: "Tai nghe",
    price: 2750000,
    originalPrice: 3390000,
    condition: "Like New",
    stock: 1,
    rating: 4.8,
    reviews: 68,
    images: ["assets/images/56482_tai_nghe_gaming_logitech_g733_lightspeed_wireless_7_1_rgb_white_0002_3.jpg"],
    description: "Phiên bản sắc trắng cá tính thanh lịch của dòng G733 Lightspeed. Trọng lượng siêu nhẹ chỉ 278g, dải LED RGB mặt trước thời thượng, thời lượng pin bền bỉ lên đến 29 giờ chơi game liên tục.",
    tags: ["logitech", "g733", "white-setup", "wireless", "rgb"],
    dateAdded: "2026-04-18T16:30:00Z"
  },
  {
    id: 6,
    name: "Chuột không dây Logitech G502 X Plus Lightspeed (White)",
    category: "Chuột",
    price: 3190000,
    originalPrice: 3890000,
    condition: "Like New",
    stock: 4,
    rating: 4.9,
    reviews: 37,
    images: ["assets/images/69519_chuot_game_khong_day_logitech_g502x_rgb_plus_lightspeed_trang_910_006148_usb_0004_5.jpg"],
    description: "Phiên bản nâng cấp tối thượng của dòng G502 huyền thoại. Sở hữu Switch lai cơ-quang học LIGHTFORCE mang lại tốc độ phản hồi siêu tốc, công nghệ hiển thị LED Lightsync RGB 8 vùng chạy mượt mà hiệu năng cao.",
    tags: ["logitech", "g502x", "plus", "lightforce", "wireless"],
    dateAdded: "2026-06-01T07:00:00Z"
  },
  {
    id: 7,
    name: "Chuột gaming Logitech Không dây G Pro X Superlight (Black Edition)",
    category: "Chuột",
    price: 2150000,
    originalPrice: 3100000,
    condition: "Like New",
    stock: 3,
    rating: 4.8,
    reviews: 142,
    images: ["assets/images/Chuột gaming Logitech Không dây G Pro X Superlight Black.jpg"],
    description: "Trọng lượng siêu nhẹ đột phá dưới 63g giúp các pha vẩy chuột mượt mà hơn bao giờ hết. Sở hữu cảm biến HERO 25K sắc nét cùng công nghệ kết nối không dây Lightspeed siêu ổn định.",
    tags: ["logitech", "superlight", "gpx", "black", "gaming-mouse"],
    dateAdded: "2026-06-25T01:00:00Z"
  },
  {
    id: 8,
    name: "Bàn phím cơ Bluetooth Dareu EK75 Pro Cloudy Aqua",
    category: "Bàn phím",
    price: 950000,
    originalPrice: 1290000,
    condition: "Like New",
    stock: 7,
    rating: 4.6,
    reviews: 29,
    images: ["assets/images/Bàn Phím Cơ Bluetooth Dareu EK75 Pro Cloudy Aqua.jpg"],
    description: "Vua phân khúc giá rẻ với layout 75% gọn gàng tích hợp núm xoay đa năng tiện lợi. Phối màu Cloudy Aqua cực bắt mắt kết hợp mạch xuôi và dải LED RGB hông đặc trưng.",
    tags: ["dareu", "ek75", "cloudy-aqua", "bluetooth", "mechanical"],
    dateAdded: "2026-06-25T01:15:00Z"
  },
  {
    id: 9,
    name: "Tai nghe Bluetooth True Wireless Gaming Asus Rog Cetra",
    category: "Tai nghe",
    price: 1590000,
    originalPrice: 2190000,
    condition: "Like New",
    stock: 4,
    rating: 4.7,
    reviews: 15,
    images: ["assets/images/Tai nghe Bluetooth True Wireless Gaming Asus Rog Cetra.jpg"],
    description: "Tai nghe gaming dạng Earbuds nhỏ gọn nhưng sở hữu tính năng chống ồn chủ động ANC đỉnh cao. Chế độ Gaming Mode tối ưu độ trễ siêu thấp hoàn hảo cho các tựa game FPS mobile.",
    tags: ["asus", "rog", "cetra", "tws", "earbuds"],
    dateAdded: "2026-06-25T01:20:00Z"
  },
  {
    id: 10,
    name: "Tai nghe Gaming Logitech G733 LIGHTSPEED Wireless 7.1 RGB (White New)",
    category: "Tai nghe",
    price: 2790000,
    originalPrice: 3490000,
    condition: "Good",
    stock: 3,
    rating: 4.9,
    reviews: 84,
    images: ["assets/images/Tai nghe Gaming Logitech G733 LIGHTSPEED Wireless 7.1 RGB.jpg"],
    description: "Tai nghe không dây siêu nhẹ thế hệ mới với sắc trắng tuyết nổi bật. Trang bị microphone cao cấp tích hợp công nghệ lọc âm Blue VO!CE và âm thanh vòm sống động chân thực.",
    tags: ["logitech", "g733", "wireless", "white", "rgb"],
    dateAdded: "2026-06-25T01:30:00Z"
  }
];
// Trích xuất danh mục tự động từ mảng dữ liệu
const CATEGORIES = ["All", ...new Set(PRODUCTS.map(p => p.category))];

// Tìm kiếm sản phẩm bằng Mã Định Danh (ID)
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id)) || null;
}

// Lấy danh sách sản phẩm nổi bật hiển thị trang chủ
function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

// Lấy danh sách sản phẩm liên quan (Cùng danh mục ngoại trừ sản phẩm hiện tại)
function getRelatedProducts(product, limit = 4) {
  return PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

// Xử lý Render số lượng ký tự ngôi sao đánh giá
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// Phân loại kiểu class của Badge Tình trạng / Phân khúc thiết bị
function getConditionClass(condition) {
  const map = {
    'Like New': 'badge-like-new', // Tương ứng Brand New
    'Good': 'badge-good',         // Tương ứng Refurbished
    'Fair': 'badge-fair'          // Tương ứng Used
  };
  return map[condition] || 'badge-good';
}

// Tính toán phần trăm chiết khấu ưu đãi giảm giá
function getDiscountPercent(price, original) {
  return Math.round((1 - price / original) * 100);
}