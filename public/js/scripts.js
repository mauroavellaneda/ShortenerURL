const { response } = require("express");

const form = document.querySelector("#add-url");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const urlOriginal = document.querySelector("#urlOriginal").Value;

  const response = await fetch(e.target.action, {
    method: e.target.method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urlOriginal }),
  });
  const result = await response.json();

  const alerts = document.querySelector(".message-url");

  if (alerts) {
    document.querySelector(".message-url").remove();
  }

  if (result.code === 201) {
    const message = document.createElement("div");
    message.classList.add("message-url");
    message.innerHTML = `<p>URL it's been successfully shortened, visit: <a target="_blank" rel="noopener noreferrer" href="/${result.url}">Link here</a></p>`;

    const container = document.querySelector("main");
    container.appendChild(message);
  } else {
    const message = document.createElement("div");
    message.classList.add(",message-url", "error");
    message.innerHTML = `<p>${result.error}</p>`;

    const container = document.querySelector("main");
    container.appendChild(message);
  }
});
