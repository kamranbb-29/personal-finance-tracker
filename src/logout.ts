const logout = document.querySelector("#logout") as HTMLButtonElement;

logout.addEventListener("click", (event) => {
  localStorage.removeItem("token");

  logout.innerText = "Logging Out";
  logout.disabled = true;

  setTimeout(() => {
    window.location.href = "login.html";
  }, 100);
});
