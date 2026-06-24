// =========================================
// GEARNEXUS — Auth Engine (mock, localStorage)
// Cổng xác thực tài khoản và quản lý phiên cấu hình GearNexus
// =========================================

const AUTH_KEY = 'gearnexus_user';

// ---- Auth helpers ----
function getUser() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY)) || null; }
  catch { return null; }
}

function saveUser(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = 'index.html';
}

function isLoggedIn() {
  return getUser() !== null;
}

// ---- Cập nhật khu vực tài khoản trên thanh Navbar ----
function updateAuthNav() {
  const user = getUser();
  const authArea = document.getElementById('auth-nav');
  if (!authArea) return;

  if (user) {
    authArea.innerHTML = `
      <div class="nav-user-wrap">
        <span class="nav-user-name">🎮 ${user.name}</span>
        <button class="btn btn-ghost btn-sm" onclick="logout()">Đăng xuất</button>
      </div>
    `;
  } else {
    authArea.innerHTML = `
      <a href="login.html" class="btn btn-ghost btn-sm">Đăng nhập</a>
      <a href="register.html" class="btn btn-primary btn-sm">Đăng ký</a>
    `;
  }
}

document.addEventListener('DOMContentLoaded', updateAuthNav);