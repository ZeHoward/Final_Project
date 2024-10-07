function initLogin() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const correctUsername = '123';
            const correctPassword = '123';

            if (username === correctUsername && password === correctPassword) {
                localStorage.setItem('adminLoggedIn', 'true');
                sessionStorage.setItem('adminLoggedIn', 'true'); // 添加這行
                console.log("correct");
                window.location.href = 'back.html';
            } else {
                console.log("wrong");
                alert('用戶名或密碼錯誤');
            }
        });
    } else {
        console.error('Login form not found');
    }
}

// 使用 window.onload 確保 DOM 完全加載
window.onload = initLogin;