// =========================================
// GEARNEXUS — General Shared Functions
// =========================================

const Main = {
  init() {
    this.renderHeaderFooter();
    this.updateNavbarUI();
    document.addEventListener("cartUpdated", () => this.updateNavbarUI());
    document.addEventListener("wishlistUpdated", () => this.updateNavbarUI());
  },

  renderHeaderFooter() {
    const header = document.getElementById("main-header");
    const footer = document.getElementById("main-footer");
    const user = Auth.getCurrentUser();

    if (header) {
      header.innerHTML = `
        <nav class="navbar container">
          <a href="index.html" class="logo">⚡ ${CONFIG.site.name}</a>
          <ul class="nav-links">
            <li><a href="index.html">Trang Chủ</a></li>
            <li><a href="shop.html">Cửa Hàng</a></li>
            <li><a href="about.html">Giới Thiệu</a></li>
          </ul>
          <div class="nav-actions">
            <a href="cart.html" class="cart-icon-btn">
              🛒 Giỏ Hàng <span id="cart-badge" class="badge">0</span>
            </a>
            ${user ? `<span class="user-name">👋 ${user.name}</span> <button onclick="Auth.logout()" class="btn btn-sm btn-outline">Đăng Xuất</button>` : `<a href="login.html" class="btn btn-sm btn-primary">Đăng Nhập</a>`}
          </div>
        </nav>
      `;
    }

    if (footer) {
      footer.innerHTML = `
        <div class="container footer-grid">
          <div><h3>${CONFIG.site.name}</h3><p>${CONFIG.footer.tagline}</p></div>
          <div><h3>Liên hệ</h3><p>Email: ${CONFIG.contact.email}<br>Hotline: ${CONFIG.contact.phone}</p></div>
          <div><h3>Mạng xã hội</h3><p>Facebook: ${CONFIG.contact.facebook} | Instagram: ${CONFIG.contact.instagram}</p></div>
        </div>
        <div class="footer-bottom text-center">© ${CONFIG.footer.copyrightYear} ${CONFIG.site.name}. All rights reserved.</div>
      `;
    }
  },

  updateNavbarUI() {
    const badge = document.getElementById("cart-badge");
    if (badge) {
      const totals = Cart.getTotals();
      badge.textContent = totals.count;
      badge.style.display = totals.count > 0 ? "inline-block" : "none";
    }
  },

  createProductCard(prod) {
    const disc = getDiscountPercent(prod.price, prod.originalPrice);
    const isWl = Cart.getWishlist().includes(prod.id);
    return `
      <div class="product-card card-fade">
        <div class="card-img-holder">
          <img src="${prod.images[0]}" alt="${prod.name}">
          ${disc > 0 ? `<span class="discount-tag">-${disc}%</span>` : ''}
          ${CONFIG.features.stockBadge && prod.stock <= 3 ? `<span class="stock-tag">Chỉ còn ${prod.stock}</span>` : ''}
        </div>
        <div class="card-body">
          <span class="card-category">${getCategoryEmoji(prod.category)} ${prod.category}</span>
          <h3 class="card-title"><a href="product.html?id=${prod.id}">${prod.name}</a></h3>
          <div class="card-rating">${renderStars(prod.rating)} <span>(${prod.reviews})</span></div>
          <div class="card-prices">
            <span class="price-current">${formatPrice(prod.price)}</span>
            <span class="price-old">${formatPrice(prod.originalPrice)}</span>
          </div>
          <div class="card-footer">
            <button onclick="Cart.addToCart(${prod.id})" class="btn btn-primary btn-sm btn-block">Thêm vào giỏ</button>
            ${CONFIG.features.wishlist ? `<button onclick="Cart.toggleWishlist(${prod.id})" class="btn btn-icon ${isWl ? 'active' : ''}">❤️</button>` : ''}
          </div>
        </div>
      </div>
    `;
  },

  showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
};

document.addEventListener("DOMContentLoaded", () => Main.init());