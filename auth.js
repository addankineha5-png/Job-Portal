document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      localStorage.setItem(
        "user",
        JSON.stringify({ username, email, password })
      );
      alert("Registered successfully! Please login.");
      window.location.href = "login.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        // Save login state here
        localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
        alert("Login successful!");
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid credentials!");
      }
    });
  }
});
