import { getTodos } from "./requests/getTodos";

const postsHtml = document.querySelector(".posts");
const appHtml = document.querySelector("#app");

const formHtml = document.querySelector(".form");
const formButton = document.querySelector(".form button");

function createTodo(title, body) {
  const todoHtmlLayout = `
  <div class="post">
  <h3>${title}</h3>
  <p>
    ${body}
  </p>
  </div>
  `;

  return todoHtmlLayout;
}

async function main() {
  let todos = JSON.parse(localStorage.getItem("todos")) || await getTodos() || [];

  console.log(todos);

  if (todos.length > 0) {
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];

      postsHtml.insertAdjacentHTML(
        "beforeend",
        createTodo(todo.title, todo.body)
      );
    }
  }
}

formButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const form = new FormData(formHtml);

  const title = form.get("title");
  const body = form.get("body");

  const data = { title, body };

  if (data.body && data.title) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    const newPost = await response.json();

    postsHtml.insertAdjacentHTML(
      "afterbegin",
      createTodo(data.title, data.body)
    );
  }
});


main();
