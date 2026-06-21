// =========================================
// GEARNEXUS — Mock Product Data
// =========================================

const PRODUCTS = [
  {
    id: 1,
    name: "Bàn phím cơ Apex Pro TKL",
    category: "Keyboard",
    condition: "Like New",
    price: 3250000,
    originalPrice: 4500000,
    images: ["https://placehold.co/600x600/1a1a2e/ffffff?text=Apex+Pro+TKL"],
    description: "Bàn phím cơ nhanh nhất thế giới với switch OmniPoint 2.0 có thể điều chỉnh điểm nhận phím. Phím nguyên hộp, độ mới cao.",
    tags: ["keyboard", "mechanical", "rgb", "steelseries"],
    stock: 3,
    rating: 4.9,
    reviews: 142,
    dateAdded: "2026-01-10",
    featured: true
  },
  {
    id: 2,
    name: "Chuột Logitech G Pro X Superlight",
    category: "Mouse",
    condition: "Good",
    price: 2100000,
    originalPrice: 3190000,
    images: ["https://placehold.co/600x600/1a1a2e/ffffff?text=G+Pro+X+Superlight"],
    description: "Chuột gaming siêu nhẹ chỉ 63g danh tiếng từ Logitech. Mắt đọc HERO 25K chính xác tuyệt đối, chân chuột còn mượt.",
    tags: ["mouse", "wireless", "logitech", "fps"],
    stock: 5,
    rating: 4.8,
    reviews: 98,
    dateAdded: "2026-02-15",
    featured: true
  },
  {
    id: 3,
    name: "Tai nghe Razer BlackShark V2 Pro",
    category: "Headset",
    condition: "Like New",
    price: 2450000,
    originalPrice: 3800000,
    images: ["https://placehold.co/600x600/1a1a2e/ffffff?text=Razer+BlackShark+V2"],
    description: "Tai nghe Esports đỉnh cao kết nối không dây siêu tốc HyperSpeed. Âm thanh vòm THX Spatial Spatial Audio sắc nét.",
    tags: ["headset", "razer", "wireless", "audio"],
    stock: 2,
    rating: 4.7,
    reviews: 64,
    dateAdded: "2026-03-01",
    featured: true
  },
  {
    id: 4,
    name: "Tay cầm Xbox Series X Controller",
    category: "Controller",
    condition: "Good",
    price: 1150000,
    originalPrice: 1650000,
    images: ["https://placehold.co/600x600/1a1a2e/ffffff?text=Xbox+Controller"],
    description: "Tay cầm chơi game quốc dân hỗ trợ PC và Console hoàn hảo. Cảm giác cầm nắm công thái học nâng cấp.",
    tags: ["controller", "xbox", "microsoft", "pc"],
    stock: 8,
    rating: 4.6,
    reviews: 120,
    dateAdded: "2026-03-20",
    featured: false
  },
  {
    id: 5,
    name: "Lót chuột Artisan FX Hayate Otsu XL",
    category: "Mousepad",
    condition: "Like New",
    price: 950000,
    originalPrice: 1400000,
    images: ["https://placehold.co/600x600/1a1a2e/ffffff?text=Artisan+Hayate+Otsu"],
    description: "Lót chuột hi-end từ Nhật Bản dành cho game thủ hardcore. Bề mặt tối ưu cho cả tốc độ (glide) và dừng (control).",
    tags: ["mousepad", "artisan", "hi-end", "japan"],
    stock: 12,
    rating: 5.0,
    reviews: 35,
    dateAdded: "2026-04-05",
    featured: false
  }
];

const CATEGORIES = ["All", ...new Set(PRODUCTS.map(p => p.category))];

function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id)) || null;
}

function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

function getRelatedProducts(product, limit = 4) {
  return PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function getConditionClass(condition) {
  const map = { 'Like New': 'badge-like-new', 'Good': 'badge-good', 'Fair': 'badge-fair' };
  return map[condition] || 'badge-good';
}

function getDiscountPercent(price, original) {
  return Math.round((1 - price / original) * 100);
}