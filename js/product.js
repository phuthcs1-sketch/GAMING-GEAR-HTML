// =========================================
// GEARNEXUS — Product Details Page
// =========================================

const ProductDetail = {
  currentProduct: null,
  qty: 1,

  init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    this.currentProduct = getProductById(id);

    if (!this.currentProduct) {
      document.getElementById("product-detail-container").innerHTML = `<h2>Sản phẩm không tồn tại!</h2><a href="shop.html">Quay lại shop</a>`;
      return;
    }

    setPageTitle(this.currentProduct.name);
    this.renderDetail();
    this.renderRelated();
  },

  renderDetail() {
    const p = this.currentProduct;
    document.getElementById("product-main-img").src = p.images[0];
    document.getElementById("product-title").textContent = p.name;
    document.getElementById("product-category").textContent = p.category;
    document.getElementById("product-condition").textContent = p.condition;
    document.getElementById("product-condition").className = `badge ${getConditionClass(p.condition)}`;
    document.getElementById("product-desc").textContent = p.description;
    document.getElementById("product-price").textContent = formatPrice(p.price);
    document.getElementById("product-old-price").textContent = formatPrice(p.originalPrice);
    document.getElementById("product-stock").textContent = p.stock;
    document.getElementById("product-stars").innerHTML = renderStars(p.rating) + ` (${p.reviews} đánh giá)`;

    const qtyInput = document.getElementById("product-qty");
    qtyInput.value = this.qty;
    qtyInput.max = p.stock;

    // Actions
    document.getElementById("btn-increase-qty").onclick = () => {
      if (this.qty < p.stock) { this.qty++; qtyInput.value = this.qty; }
    };
    document.getElementById("btn-decrease-qty").onclick = () => {
      if (this.qty > 1) { this.qty--; qtyInput.value = this.qty; }
    };
    document.getElementById("btn-add-to-cart-detail").onclick = () => {
      Cart.addToCart(p.id, this.qty);
    };
  },

  renderRelated() {
    const related = getRelatedProducts(this.currentProduct);
    const container = document.getElementById("related-products-grid");
    if (container) {
      container.innerHTML = related.map(p => Main.createProductCard(p)).join('');
    }
  }
};

if (window.location.pathname.includes("product.html")) {
  document.addEventListener("DOMContentLoaded", () => ProductDetail.init());
}