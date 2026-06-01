"use strict";
const logout = document.querySelector("#logout");
logout.addEventListener("click", (event) => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
});
//# sourceMappingURL=logout.js.map