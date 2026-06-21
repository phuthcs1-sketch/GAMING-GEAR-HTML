// =========================================
// GEARNEXUS — Cart & Wishlist Logic
// =========================================

const Cart = {
  getCart() {
    return JSON.parse(localStorage.getItem("gn_cart")) || [];
  },

  saveCart(cart) {
    localStorage.setItem("gn_cart", JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent("cartUpdated"));
  },

  addToCart(productId, qty = 1) {
    const prod = getProductById(productId);
    if (!prod) return;
    
    let cart = this.getCart();
    let item = cart.find(i => i.id === prod.id);
    
    if (item) {
      if (item.qty + qty > prod.stock) {
        Main.showToast(`Chỉ còn ${prod.stock} sản phẩm trong kho!`, "error");
        return;
      }
      item.qty += qty;
    } else {
      cart.push({ id: prod.id, qty: qty });
    }
    this.saveCart(cart);
    Main.showToast(`Đã thêm ${prod.name} vào giỏ hàng!`);
  },

  updateQty(productId, qty) {
    let cart = this.getCart();
    let item = cart.find(i => i.id === productId);
    const prod = getProductById(productId);
    
    if (item && prod) {
      if (qty > prod.stock) return Main.showToast("Vượt quá số lượng kho!", "error");
      if (qty <= 0) return this.removeFromCart(productId);
      item.qty = qty;
      this.saveCart(cart);
    }
  },

  removeFromCart(productId) {
    let cart = this.getCart().filter(i => i.id !== productId);
    this.saveCart(cart);
    Main.showToast("Đã xóa sản phẩm khỏi giỏ hàng");
  },

  getTotals() {
    const cart = this.getCart();
    let subtotal = 0;
    let count = 0;
    
    cart.forEach(item => {
      const prod = getProductById(item.id);
      if (prod) {
        subtotal += prod.price * item.qty;
        count += item.qty;
      }
    });

    let promo = JSON.parse(localStorage.getItem("gn_active_promo")) || null;
    let discountAmount = 0;
    if (promo) {
      discountAmount = (subtotal * promo.discount) / 100;
    }

    let shippingFee = subtotal >= CONFIG.shipping.freeThreshold || subtotal === 0 ? 0 : CONFIG.shipping.defaultFee;
    let total = subtotal - discountAmount + shippingFee;

    return { count, subtotal, discountAmount, promo, shippingFee, total };
  },

  applyPromo(code) {
    const res = validatePromoCode(code);
    if (res.valid) {
      localStorage.setItem("gn_active_promo", JSON.stringify({ code: code.toUpperCase(), discount: res.discount, label: res.label }));
      this.saveCart(this.getCart());
      return { success: true, msg: "Áp dụng mã giảm giá thành công!" };
    }
    return { success: false, msg: "Mã giảm giá không hợp lệ!" };
  },

  removePromo() {
    localStorage.removeItem("gn_active_promo");
    this.saveCart(this.getCart());
  },

  // --- Wishlist Sync ---
  getWishlist() { return JSON.parse(localStorage.getItem("gn_wishlist")) || []; },
  toggleWishlist(id) {
    let wl = this.getWishlist();
    if (wl.includes(id)) {
      wl = wl.filter(x => x !== id);
      Main.showToast("Đã xóa khỏi danh sách yêu thích");
    } else {
      wl.push(id);
      Main.showToast("Đã thêm vào danh sách yêu thích!");
    }
    localStorage.setItem("gn_wishlist", JSON.stringify(wl));
    document.dispatchEvent(new CustomEvent("wishlistUpdated"));
  }
};