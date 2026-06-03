let form1 = document.querySelector("form");

const name = document.querySelector("#name");

const email = document.querySelector("#email");

const password = document.querySelector("#password");

const AUTH_URL = "https://personal-finance-tracker-7r8z.onrender.com/register";

const message = document.querySelector("#message");

form1.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      message.innerText = "User registered successfully. Redirecting to login...";
      name.value = "";
      email.value = "";
      password.value = "";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 900);
    } else {
      message.innerText = data.msg;
      password.value = "";
    }
  } catch (err) {
    message.innerText = "Registration failed. Please try again.";
    console.log(err);
  }
});
