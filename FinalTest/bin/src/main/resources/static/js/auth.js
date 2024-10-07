function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true' && sessionStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) {
        localStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = 'backlogin.html';
    }
}

// 在所有頁面都執行此檢查
if (window.location.pathname.endsWith('back.html')) {
    checkAuth();
}