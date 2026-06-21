// =========================================
// GEARNEXUS — Mock Auth Manager
// =========================================

const Auth = {
  init() {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([
        { name: CONFIG.auth.demoName, email: CONFIG.auth.demoEmail, password: CONFIG.auth.demoPassword }
      ]));
    }
  },

  register(name, email, password) {
    if (password.length < CONFIG.auth.minPasswordLength) return { success: false, msg: `Mật khẩu phải từ ${CONFIG.auth.minPasswordLength} ký tự!` };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) return { success: false, msg: "Email này đã được đăng ký!" };
    
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true, msg: "Đăng ký thành công!" };
  },

  login(email, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify({ name: user.name, email: user.email }));
      return { success: true };
    }
    return { success: false, msg: "Sai tài khoản hoặc mật khẩu!" };
  },

  logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  }
};

Auth.init();