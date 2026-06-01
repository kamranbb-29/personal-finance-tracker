let form1 = document.querySelector("form");

const name = document.querySelector("#name");

const email = document.querySelector("#email");

const password = document.querySelector("#password");

const AUTH_URL = "http://localhost:3000/register";

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
      message.innerText = "User Registered Successfully";
      window.location.href = "login.html";
    } else {
      message.innerText = data.msg;
    }

    name.value = "";
    email.value = "";
    password.value = "";
  } catch (err) {
    console.log(err);
  }
});
