let form2 = document.querySelector("form");

const email = document.querySelector("#email");

const password = document.querySelector("#password");

const AUTH_URL = "https://personal-finance-tracker-7r8z.onrender.com/login";

const message = document.querySelector("#message");

form2.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const data = await response.json();

    localStorage.setItem("token", data.token);
    if (response.ok) {
      message.innerText = "Logged In Successfully";
      email.value = "";
      password.value = "";
      window.location.href = "index.html";
    } else {
      message.innerText = data.msg;
    }
  } catch (err) {
    console.log(err.message);
  }
});
