// =========================================
// GEARNEXUS — Global Utilities (main.js)
// Hệ thống tiện ích toàn cục và hiển thị giao diện động GearNexus
// =========================================

// ---- Hiệu ứng cuộn và trạng thái Thanh Navbar ----
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Đánh dấu liên kết đang kích hoạt (Active Link)
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Điều khiển Menu Drawer trên thiết bị di động
  const menuBtn = document.querySelector('.nav-menu-btn');
  const drawer = document.querySelector('.nav-drawer');
  const overlay = document.querySelector('.nav-drawer-overlay');

  if (menuBtn && drawer && overlay) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      overlay.classList.add('visible');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      drawer.classList.remove('open');
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
    };

    overlay.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  }
}

// ---- Hệ thống thông báo Toast Notification ----
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${type === 'success' ? '✓' : '✕'}</div>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3000);
}

// ---- Hiệu ứng cuộn hiển thị phần tử (Scroll Reveal) ----
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

// ---- Khởi tạo và Render cấu trúc Thẻ sản phẩm (Product Card) ----
function renderProductCard(product) {
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const condClass = getConditionClass(product.condition);
  const wished = isWishlisted(product.id);

  // Áp dụng tên hiển thị tương ứng phân khúc gaming gear
  let displayCondition = product.condition;
  if (product.condition === 'Like New') displayCondition = 'Brand New';
  if (product.condition === 'Good') displayCondition = 'Refurbished';
  if (product.condition === 'Fair') displayCondition = 'Used';

  return `
    <div class="product-card reveal" data-product-id="${product.id}">
      <div class="card-image-wrap">
        <a href="product.html?id=${product.id}">
          <img
            src="${product.images[0]}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.src='https://picsum.photos/seed/gear${product.id}/400/400'"
          >
        </a>
        <div class="card-badges">
          <span class="badge ${condClass}">${displayCondition}</span>
          ${product.stock === 1 ? '<span class="badge badge-sold" style="background:rgba(251,146,60,.15);color:var(--orange);border-color:rgba(251,146,60,.25)">Chỉ còn 1!</span>' : ''}
        </div>
        <button
          class="card-wishlist ${wished ? 'active' : ''}"
          aria-label="Thêm vào mục yêu thích"
          onclick="handleWishlist(event, ${product.id}, this)"
        >
          ${wished ? '♥' : '♡'}
        </button>
        <div class="card-quick-add">
          <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id}); event.stopPropagation();">
            🛒 Thêm vào giỏ
          </button>
        </div>
      </div>
      <div class="card-body">
        <span class="card-category">${getCategoryEmoji(product.category)} ${product.category}</span>
        <a href="product.html?id=${product.id}" class="card-name">${product.name}</a>
        <div class="card-rating">
          <span class="stars">${'★'.repeat(Math.round(product.rating))}</span>
          <span style="color:var(--text); font-size:0.8rem; font-weight:600">${product.rating}</span>
          <span class="rating-count">(${product.reviews} đánh giá)</span>
        </div>
        <div class="card-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          <span class="price-original">${formatPrice(product.originalPrice)}</span>
          <span class="price-discount">-${discount}%</span>
        </div>
      </div>
    </div>
  `;
}

// ---- Xử lý tương tác Danh sách yêu thích ----
function handleWishlist(event, productId, btn) {
  event.preventDefault();
  const added = toggleWishlist(productId);
  btn.classList.toggle('active', added);
  btn.textContent = added ? '♥' : '♡';
}

// ---- Khởi chạy cấu hình khi trang tải hoàn tất ----
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  updateCartBadge();
});