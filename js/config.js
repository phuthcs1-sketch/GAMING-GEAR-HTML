// =========================================
// GEARNEXUS — Site Configuration
// =========================================

const CONFIG = {
  site: {
    name:        "GearNexus",
    tagline:     "Ultimate Gaming Gear Elite",
    description: "Cung cấp gaming gear chính hãng, phụ kiện máy tính cao cấp cho game thủ chuyên nghiệp.",
    logo:        "assets/images/logo.png",
    url:         "https://gearnexus.com",
    language:    "vi",
  },

  contact: {
    ownerName:  "GearNexus Team",
    email:      "support@gearnexus.com",
    phone:      "1900 xxxx",
    city:       "Da Nang City",
    country:    "Vietnam",
    zalo:       "090 xxx xxxx",
    instagram:  "@gearnexus",
    facebook:   "GearNexusOfficial",
    tiktok:     "@gearnexus",
  },

  currency: {
    locale:    "vi-VN",
    suffix:    " đ",
    prefix:    "",
  },

  shipping: {
    freeThreshold: 2000000, // Đơn hàng > 2 triệu được free ship
    defaultFee:     50000,   // Phí ship mặc định 50k
    estimatedDays:  "1–3",
  },

  stats: {
    keychains:   "500+",
    happyBuyers: "10k+",
    avgRating:   "4.9★",
  },

  categories: [
    { name: "Keyboard",   emoji: "⌨️" },
    { name: "Mouse",      emoji: "🖱️" },
    { name: "Headset",    emoji: "🎧" },
    { name: "Mousepad",   emoji: "🗺️" },
    { name: "Controller", emoji: "🎮" },
  ],

  promoCodes: {
    "GEAR10":   { discount: 10, label: "Giảm 10% tổng đơn hàng" },
    "WELCOME":  { discount: 15, label: "Giảm 15% cho thành viên mới" },
    "PROGAMER": { discount: 20, label: "Ưu đãi Pro Gamer 20%" },
  },

  shop: {
    pageSize:       6,
    maxPriceFilter: 5000000, // Max 5 triệu VNĐ
    defaultSort:    "newest",
  },

  auth: {
    demoEmail:    "demo@gearnexus.com",
    demoPassword: "demo123",
    demoName:     "Pro Player",
    minPasswordLength: 6,
  },

  seo: {
    titleSuffix:  " – GearNexus",
    ogImage:      "assets/og-image.jpg",
    keywords:     "gaming gear, ban phim co, chuot gaming, tai nghe gaming, Da Nang",
  },

  footer: {
    copyrightYear: 2026,
    tagline:       "Hệ thống phân phối thiết bị Gaming cao cấp hàng đầu.",
  },

  features: {
    wishlist:     true,
    reviews:      true,
    stockBadge:   true,
    freeShipping: true,
    promoCodes:   true,
  },
};

function formatPrice(amount) {
  const formatted = amount.toLocaleString(CONFIG.currency.locale);
  return CONFIG.currency.prefix + formatted + CONFIG.currency.suffix;
}

function getCategoryEmoji(name) {
  const cat = CONFIG.categories.find(c => c.name === name);
  return cat ? cat.emoji : "📦";
}

function validatePromoCode(code) {
  const entry = CONFIG.promoCodes[code.toUpperCase()];
  if (!entry) return { valid: false };
  return { valid: true, ...entry };
}

function setPageTitle(pageTitle) {
  document.title = pageTitle ? pageTitle + CONFIG.seo.titleSuffix : CONFIG.site.name;
}