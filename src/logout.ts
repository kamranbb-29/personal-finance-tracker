const logout = document.querySelector("#logout") as HTMLButtonElement;

logout.addEventListener("click", (event) => {
  localStorage.removeItem("token");

  window.location.href = "login.html";
});
