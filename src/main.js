import { createTodo } from "./helpers/createTodo";
import { getPosts } from "./requests/getPosts";
import { postTodo } from "./requests/postTodo";

const postsHtml = document.querySelector(".posts");
const appHtml = document.querySelector("#app");

const formHtml = document.querySelector(".form");
const formButton = document.querySelector(".form button");

async function main() {  
  // Get Todos
  let posts =
    JSON.parse(localStorage.getItem("posts")) || (await getPosts()) || [];

  if (posts.length > 0) {
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      postsHtml.insertAdjacentHTML(
        "beforeend",
        createTodo(post.title, post.body)
      );
    }
  }

  // Post Todos
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(formHtml);

    const title = form.get("title");
    const body = form.get("body");
    
    formButton.disabled = true;
    const newPost = await postTodo(title, body);
    formButton.disabled = false;
    
    posts.unshift(newPost)
    localStorage.setItem("posts", JSON.stringify(posts))

    postsHtml.insertAdjacentHTML(
      "afterbegin",
      createTodo(newPost.title, newPost.body)
    );
  };

  formButton.addEventListener("click", handlePostSubmit);
}

window.addEventListener("DOMContentLoaded", main);
