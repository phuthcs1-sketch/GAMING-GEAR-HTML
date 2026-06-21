// =========================================
// GEARNEXUS — Shop Page Management
// =========================================

const Shop = {
  currentCategory: "All",
  searchQuery: "",
  maxPrice: CONFIG.shop.maxPriceFilter,
  sortBy: CONFIG.shop.defaultSort,

  init() {
    this.renderFilters();
    this.bindEvents();
    this.applyFiltersAndRender();
  },

  renderFilters() {
    const catContainer = document.getElementById("category-filters");
    if (catContainer) {
      catContainer.innerHTML = CATEGORIES.map(cat => 
        `<button class="btn btn-sm ${this.currentCategory === cat ? 'btn-primary' : 'btn-outline'}" data-category="${cat}">
          ${cat === 'All' ? '📌 Tất Cả' : getCategoryEmoji(cat) + ' ' + cat}
        </button>`
      ).join('');
    }
    const slider = document.getElementById("price-slider");
    if (slider) {
      slider.max = CONFIG.shop.maxPriceFilter;
      slider.value = CONFIG.shop.maxPrice;
      document.getElementById("price-slider-val").textContent = formatPrice(parseInt(slider.value));
    }
  },

  bindEvents() {
    document.getElementById("category-filters")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-category]");
      if (btn) {
        this.currentCategory = btn.dataset.category;
        this.renderFilters();
        this.applyFiltersAndRender();
      }
    });

    document.getElementById("search-input")?.addEventListener("input", (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.applyFiltersAndRender();
    });

    document.getElementById("price-slider")?.addEventListener("input", (e) => {
      this.maxPrice = parseInt(e.target.value);
      document.getElementById("price-slider-val").textContent = formatPrice(this.maxPrice);
      this.applyFiltersAndRender();
    });

    document.getElementById("sort-select")?.addEventListener("change", (e) => {
      this.sortBy = e.target.value;
      this.applyFiltersAndRender();
    });
  },

  applyFiltersAndRender() {
    let filtered = PRODUCTS.filter(p => {
      const matchCat = this.currentCategory === "All" || p.category === this.currentCategory;
      const matchSearch = p.name.toLowerCase().includes(this.searchQuery) || p.tags.some(t => t.includes(this.searchQuery));
      const matchPrice = p.price <= this.maxPrice;
      return matchCat && matchSearch && matchPrice;
    });

    // Sorting
    if (this.sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
    else if (this.sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
    else if (this.sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
    else if (this.sortBy === "discount") filtered.sort((a, b) => getDiscountPercent(b.price, b.originalPrice) - getDiscountPercent(a.price, a.originalPrice));
    else filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); // newest

    const grid = document.getElementById("product-grid");
    if (grid) {
      if (filtered.length === 0) {
        grid.innerHTML = `<div class="no-products text-center">❌ Không tìm thấy sản phẩm phù hợp.</div>`;
      } else {
        grid.innerHTML = filtered.map(p => Main.createProductCard(p)).join('');
      }
    }
  }
};

if (window.location.pathname.includes("shop.html")) {
  document.addEventListener("DOMContentLoaded", () => Shop.init());
}