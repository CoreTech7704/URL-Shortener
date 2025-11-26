const container = document.getElementById("container");

// UI Buttons
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const backToLogin = document.getElementById("backToLogin");

// --- SIGN UP ---
if (signUpButton) {
  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
    container.classList.remove("forgot-active", "reset-active");
  });
}

// --- SIGN IN ---
if (signInButton) {
  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active", "forgot-active", "reset-active");
  });
}

// --- FORGOT PASSWORD ---
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener("click", () => {
    container.classList.add("forgot-active");
    container.classList.remove("right-panel-active", "reset-active");
  });
}

// --- BACK TO LOGIN ---
if (backToLogin) {
  backToLogin.addEventListener("click", () => {
    container.classList.remove("forgot-active", "reset-active");
  });
}

// --- SERVER MODE HANDLING ---
if (typeof mode !== "undefined") {

  // Reset password screen
  if (mode === "reset") {
    container.classList.add("reset-active");
    container.classList.remove("right-panel-active", "forgot-active");
  }

  // Signup screen
  if (mode === "signup") {
    container.classList.add("right-panel-active");
  }

  // Forgot password screen
  if (mode === "forgot") {
    container.classList.add("forgot-active");
  }
}
