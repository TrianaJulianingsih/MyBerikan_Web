const users = JSON.parse(localStorage.getItem("users")) || [];
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const password = document.getElementById("password").value.trim();
    const foundUser = users.find(user => user.nama === nama && user.password === password);
    if (foundUser) {
        alert("Login berhasil! Selamat datang, " + nama + " 👋");
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        window.location.href = "../Dashboard/dashboard.html";
    } else {
        alert("Nama atau kata sandi salah!");
    }
});