// =========================================
// GEARNEXUS — Product Detail Page Engine
// Logic điều khiển và hiển thị trang chi tiết trang bị gaming
// =========================================

let currentProduct = null;
let currentQty = 1;

function renderProductPage(product) {
  currentProduct = product;
  const discount = getDiscountPercent(product.price, product.originalPrice);
  const condClass = getConditionClass(product.condition);

  // Đổi tên phân khúc hiển thị phù hợp với thiết bị máy tính
  let displayCondition = product.condition;
  if (product.condition === 'Like New') displayCondition = 'Brand New';
  if (product.condition === 'Good') displayCondition = 'Refurbished';
  if (product.condition === 'Fair') displayCondition = 'Used';

  document.title = `${product.name} – GearNexus`;

  document.getElementById('product-container').innerHTML = `
    <div class="breadcrumb" style="margin-bottom:24px">
      <a href="index.html">Trang chủ</a>
      <span class="sep">/</span>
      <a href="shop.html">Kho vũ khí</a>
      <span class="sep">/</span>
      <a href="shop.html?cat=${product.category}">${getCategoryEmoji(product.category)} ${product.category}</a>
      <span class="sep">/</span>
      <span style="color:var(--text)">${product.name}</span>
    </div>

    <div class="product-layout">
      <div>
        <div class="gallery-main">
          <img id="main-img" src="${product.images[0]}" alt="${product.name}"
            onerror="this.src='https://picsum.photos/seed/gear${product.id}/600/600'">
        </div>
        ${product.images.length > 1 ? `
        <div class="gallery-thumbs">
          ${product.images.map((img, i) => `
            <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="switchImage('${img}', this)">
              <img src="${img}" alt="Góc nhìn ${i+1}"
                onerror="this.src='https://picsum.photos/seed/gear${product.id}v${i}/300/300'">
            </div>
          `).join('')}
        </div>` : ''}
      </div>

      <div>
        <div class="product-category">${getCategoryEmoji(product.category)} ${product.category}</div>
        <h1 class="product-title">${product.name}</h1>

        <div class="product-rating-row">
          <span class="stars">${'★'.repeat(Math.round(product.rating))}</span>
          <span style="font-weight:600">${product.rating}</span>
          <span style="color:var(--text-muted)">(${product.reviews} đánh giá thực tế)</span>
        </div>

        <div class="product-price-row">
          <span class="product-price-main">${formatPrice(product.price)}</span>
          <span class="product-price-orig">${formatPrice(product.originalPrice)}</span>
          <span class="product-save">Tiết kiệm ${discount}%</span>
        </div>

        <div class="product-meta">
          <span class="badge ${condClass}">${displayCondition}</span>
          ${product.stock <= 2 ? `<span class="badge badge-fair">Chỉ còn lại ${product.stock} trang bị</span>` : ''}
        </div>

        <p class="product-desc">${product.description}</p>

        <div class="product-stock ${product.stock <= 2 ? 'low' : ''}">
          ${product.stock <= 2
            ? `⚠️ Vũ khí giới hạn! Chỉ còn đúng ${product.stock} sản phẩm trong kho.`
            : `✅ Sẵn hàng đầy đủ (${product.stock} sản phẩm có sẵn tại chi nhánh)`}
        </div>

        <div class="add-row">
          <div class="qty-stepper">
            <button class="qty-btn" id="qty-minus" onclick="changeQty(-1)">−</button>
            <span class="qty-value" id="qty-display">1</span>
            <button class="qty-btn" id="qty-plus" onclick="changeQty(1)">+</button>
          </div>
          <button class="btn btn-primary" onclick="handleAddToCart()">🛒 Thêm vào giỏ hàng</button>
          <button class="btn btn-secondary" id="wishlist-btn" onclick="handleWishlistToggle()" style="padding:10px 14px">
            ${isWishlisted(product.id) ? '♥' : '♡'}
          </button>
        </div>

        <div class="tags-wrap" style="margin-bottom:20px">
          ${product.tags.map(t => `<span class="tag-chip">#${t}</span>`).join('')}
        </div>

        <div class="divider"></div>

        <div class="product-info-list">
          <div class="product-info-item"><span>📦</span> Đóng gói chống sốc chuyên nghiệp, giao hàng siêu tốc trong 1–3 ngày làm việc.</div>
          <div class="product-info-item"><span>↩️</span> Đổi mới 1 đổi 1 trong vòng 7 ngày đầu tiên nếu phát sinh lỗi kỹ thuật phần cứng.</div>
          <div class="product-info-item"><span>💬</span> Cần tư vấn tối ưu cấu hình? Liên hệ qua Zalo Hotline hoặc kênh Cộng đồng.</div>
        </div>
      </div>
    </div>
  `;

  // Tải danh sách trang bị liên quan
  const related = getRelatedProducts(product, 4);
  const relSection = document.getElementById('related-section');
  if (related.length > 0) {
    relSection.style.display = 'block';
    document.getElementById('related-grid').innerHTML = related.map(renderProductCard).join('');
    setTimeout(initScrollReveal, 50);
  }

  updateQtyButtons();
}

function switchImage(src, thumbEl) {
  const mainImg = document.getElementById('main-img');
  mainImg.style.opacity = '0';
  setTimeout(() => { mainImg.src = src; mainImg.style.opacity = '1'; }, 150);
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}

function changeQty(delta) {
  if (!currentProduct) return;
  currentQty = Math.max(1, Math.min(currentQty + delta, currentProduct.stock));
  document.getElementById('qty-display').textContent = currentQty;
  updateQtyButtons();
}

function updateQtyButtons() {
  if (!currentProduct) return;
  document.getElementById('qty-minus').disabled = currentQty <= 1;
  document.getElementById('qty-plus').disabled = currentQty >= currentProduct.stock;
}

function handleAddToCart() {
  if (currentProduct) addToCart(currentProduct.id, currentQty);
}

function handleWishlistToggle() {
  if (!currentProduct) return;
  const added = toggleWishlist(currentProduct.id);
  document.getElementById('wishlist-btn').textContent = added ? '♥' : '♡';
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get('id'));

  if (!product) {
    document.getElementById('product-container').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">😢</div>
        <h3>Không tìm thấy trang bị</h3>
        <p>Thiết bị này có thể đã hết hàng hoặc đã bị gỡ khỏi hệ thống kho vũ khí.</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top:16px">Quay lại Cửa hàng</a>
      </div>
    `;
    return;
  }

  renderProductPage(product);
});