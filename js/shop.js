// =========================================
// GEARNEXUS — Shop Page Logic (Đã sửa lỗi)
// Hệ thống điều khiển bộ lọc, tìm kiếm và phân trang kho vũ khí
// =========================================

const PAGE_SIZE = (typeof CONFIG !== 'undefined') ? CONFIG.shop.pageSize : 9;
const MAX_PRICE_LIMIT = (typeof CONFIG !== 'undefined') ? CONFIG.shop.maxPriceFilter : 5000000;

let state = {
  search: '',
  categories: [],
  conditions: [],
  maxPrice: MAX_PRICE_LIMIT,
  sort: (typeof CONFIG !== 'undefined') ? CONFIG.shop.defaultSort : 'newest',
  activePill: 'All',
  page: 1
};

// Bản đồ ánh xạ danh mục từ HTML (Tiếng Anh) sang CSDL (Tiếng Việt) để sửa lỗi lệch chữ
const CATEGORY_MAP = {
  'Keyboard': 'Bàn phím',
  'Mouse': 'Chuột',
  'Audio': 'Tai nghe'
};

// ---- Logic Lọc & Sắp xếp sản phẩm ----
function getFilteredProducts() {
  let list = [...PRODUCTS];

  // 1. Lọc theo danh mục dạng Pill (Được ưu tiên hơn checkbox nếu kích hoạt)
  if (state.activePill !== 'All') {
    const dbCategory = CATEGORY_MAP[state.activePill] || state.activePill;
    list = list.filter(p => p.category === dbCategory);
  } else if (state.categories.length > 0) {
    const dbCategories = state.categories.map(c => CATEGORY_MAP[c] || c);
    list = list.filter(p => dbCategories.includes(p.category));
  }

  // 2. Lọc theo tình trạng thiết bị (Hỗ trợ đồng bộ Like New & Brand New)
  if (state.conditions.length > 0) {
    list = list.filter(p => {
      if (state.conditions.includes("Like New")) {
        return state.conditions.includes(p.condition) || p.condition === "Brand New";
      }
      return state.conditions.includes(p.condition);
    });
  }

  // 3. Lọc theo khoảng giá trần
  list = list.filter(p => p.price <= state.maxPrice);

  // 4. Lọc theo từ khóa tìm kiếm (Tên, Danh mục, thẻ Tag)
  if (state.search.trim()) {
    const q = state.search.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // 5. Thuật toán sắp xếp hiển thị
  switch (state.sort) {
    case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
    case 'price-desc': list.sort((a, b) => b.price - a.price); break;
    case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
    case 'discount':   list.sort((a, b) => (b.originalPrice - b.price) - (a.originalPrice - a.price)); break;
    default:           list.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }

  return list;
}

// ---- Render Giao diện danh sách ----
function render() {
  const filtered = getFilteredProducts();
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('result-count');
  const loadMoreWrap = document.getElementById('load-more-wrap');

  if (!grid || !countEl) return;

  const visible = filtered.slice(0, state.page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  countEl.textContent = `${filtered.length} trang bị`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column:1/-1; text-align:center; padding: 40px 20px;">
        <div class="no-results-emoji" style="font-size:3rem; margin-bottom:12px;">🔍</div>
        <h3>Không tìm thấy trang bị phù hợp</h3>
        <p>Hãy thử thay đổi tiêu chí bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
        <button class="btn btn-secondary" style="margin-top:16px" onclick="resetAll()">Xóa bộ lọc</button>
      </div>
    `;
    if (loadMoreWrap) loadMoreWrap.style.display = 'none';
    return;
  }

  grid.innerHTML = visible.map(renderProductCard).join('');
  if (loadMoreWrap) loadMoreWrap.style.display = hasMore ? 'block' : 'none';

  setTimeout(initScrollReveal, 50);
}

// ---- Đặt lại toàn bộ bộ lọc về mặc định ----
function resetAll() {
  state.search = '';
  state.categories = [];
  state.conditions = [];
  state.maxPrice = MAX_PRICE_LIMIT;
  state.sort = 'newest';
  state.activePill = 'All';
  state.page = 1;

  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const priceRange = document.getElementById('price-range');
  const priceVal = document.getElementById('price-range-val');

  if (searchInput) searchInput.value = '';
  if (sortSelect) sortSelect.value = 'newest';
  if (priceRange) {
    priceRange.value = MAX_PRICE_LIMIT;
    priceRange.style.background = 'linear-gradient(to right, var(--primary) 0%, var(--primary) 100%, #E5E7EB 100%)';
  }
  if (priceVal) priceVal.textContent = MAX_PRICE_LIMIT.toLocaleString('vi-VN') + ' đ';

  // Đặt lại trạng thái check cho cả giao diện desktop và mobile
  document.querySelectorAll('input[name="cat"], input[name="cond"], input[name="cat-m"], input[name="cond-m"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p.dataset.cat === 'All'));

  render();
}

// ---- Khởi tạo và liên kết sự kiện DOM ----
document.addEventListener('DOMContentLoaded', () => {
  // Kiểm tra tham số Danh mục từ URL thanh địa chỉ
  const params = new URLSearchParams(window.location.search);
  const urlCat = params.get('cat');
  if (urlCat) {
    state.activePill = urlCat;
    document.querySelectorAll('.cat-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.cat === urlCat);
    });
  }

  render();

  // Sự kiện ô tìm kiếm
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      state.search = searchInput.value;
      state.page = 1;
      render();
    });
  }

  // Sự kiện bộ chọn sắp xếp
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sort = e.target.value;
      state.page = 1;
      render();
    });
  }

  // Sự kiện thanh kéo chọn khoảng giá (Price Range Slider)
  const priceRange = document.getElementById('price-range');
  const priceVal = document.getElementById('price-range-val');
  if (priceRange && priceVal) {
    priceRange.addEventListener('input', () => {
      state.maxPrice = parseInt(priceRange.value);
      priceVal.textContent = parseInt(priceRange.value).toLocaleString('vi-VN') + ' đ';
      
      const pct = (state.maxPrice / MAX_PRICE_LIMIT) * 100;
      priceRange.style.background = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${pct}%, #E5E7EB ${pct}%)`;
      state.page = 1;
      render();
    });
  }

  // Checkbox chọn danh mục (Giao diện Desktop)
  document.querySelectorAll('input[name="cat"]').forEach(cb => {
    cb.addEventListener('change', () => {
      state.categories = [...document.querySelectorAll('input[name="cat"]:checked')].map(c => c.value);
      state.activePill = 'All';
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p.dataset.cat === 'All'));
      state.page = 1;
      render();
    });
  });

  // Checkbox chọn tình trạng thiết bị (Giao diện Desktop)
  document.querySelectorAll('input[name="cond"]').forEach(cb => {
    cb.addEventListener('change', () => {
      state.conditions = [...document.querySelectorAll('input[name="cond"]:checked')].map(c => c.value);
      state.page = 1;
      render();
    });
  });

  // Bộ chọn danh mục nhanh dạng thanh bấm (Category pills)
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      state.activePill = pill.dataset.cat;
      state.categories = [];
      document.querySelectorAll('input[name="cat"], input[name="cat-m"]').forEach(cb => cb.checked = false);
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.toggle('active', p === pill));
      state.page = 1;
      render();
    });
  });

  // Sự kiện nút Tải Thêm (Load more)
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      state.page++;
      render();
      const grid = document.getElementById('products-grid');
      const lastCard = grid ? grid.lastElementChild : null;
      if (lastCard) lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Nút đặt lại bộ lọc
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', resetAll);
  }

  // Điều khiển cấu trúc bộ lọc dạng trang trượt trên Mobile (Mobile filter drawer)
  const filterToggle = document.getElementById('filter-toggle-btn');
  const filterSheet = document.getElementById('filter-sheet');
  const filterOverlay = document.getElementById('filter-overlay');

  if (filterToggle && filterSheet && filterOverlay) {
    filterToggle.addEventListener('click', () => {
      filterSheet.classList.add('open');
      filterOverlay.classList.add('visible');
    });

    filterOverlay.addEventListener('click', () => {
      filterSheet.classList.remove('open');
      filterOverlay.classList.remove('visible');
    });

    document.getElementById('close-filter-sheet')?.addEventListener('click', () => {
      filterSheet.classList.remove('open');
      filterOverlay.classList.remove('visible');
    });

    document.getElementById('apply-filter-btn')?.addEventListener('click', () => {
      state.categories = [...document.querySelectorAll('input[name="cat-m"]:checked')].map(c => c.value);
      state.conditions = [...document.querySelectorAll('input[name="cond-m"]:checked')].map(c => c.value);
      state.page = 1;
      filterSheet.classList.remove('open');
      filterOverlay.classList.remove('visible');
      render();
    });
  }
});