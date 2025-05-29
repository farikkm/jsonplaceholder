import { createTodo } from "./helpers/createTodo";
import { httpRequest } from "./helpers/httpRequest";
import { getPosts } from "./requests/getPosts";
import { postTodo } from "./requests/postTodo";

const postsHtml = document.querySelector(".posts");
const appHtml = document.querySelector("#app");

const formHtml = document.querySelector(".form");
const formButton = document.querySelector(".form button");

const updatePostModal = document.getElementById("update-modal");
const updatePostForm = document.querySelector("#update-modal form");
const updatePostInput = document.querySelector("#update-modal input");
const updatePostTextarea = document.querySelector("#update-modal textarea");
const updatePostButton = document.querySelector("#update-modal button");

async function main() {
  // Get Todos;
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

    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    postsHtml.insertAdjacentHTML(
      "afterbegin",
      createTodo(newPost.title, newPost.body)
    );
  };

  formButton.addEventListener("click", handlePostSubmit);

  [...postsHtml.children].forEach((elem, index) => {
    elem.addEventListener("click", (e) => {
      updatePostModal.classList.remove("hidden");

      updatePostModal.addEventListener("click", (e) => {
        if (!updatePostForm.contains(e.target)) {
          document.body.classList.remove("_lock");
          updatePostModal.classList.add("hidden");
        }
      });

      const clickedPost = posts[index];

      updatePostInput.value = clickedPost.title;
      updatePostTextarea.value = clickedPost.body;

      const updatedPost = {
        title: clickedPost.title,
        body: clickedPost.body,
      };

      updatePostButton.disabled = true;

      updatePostInput.addEventListener("input", (e) => {
        updatedPost.title = e.target.value;
        updatePostButton.disabled = false;
      });

      updatePostTextarea.addEventListener("input", (e) => {
        updatedPost.body = e.target.value;
        updatePostButton.disabled = false;
      });

      updatePostForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const { data } = await httpRequest(
          import.meta.env.VITE_API_URL + `/posts/1`,
          "PUT",
          {
            "Content-Type": "application/json",
          },
          updatedPost
        );

        if (data) {
          updatePostModal.classList.add("hidden");
        }

        posts[index].title = data.title;
        posts[index].body = data.body;

        elem.querySelector("h3").textContent = data.title;
        elem.querySelector("p").textContent = data.body;

        localStorage.setItem("posts", JSON.stringify(posts))
      });

      document.body.classList.add("_lock");
    });
  });
}

// Update Post

window.addEventListener("DOMContentLoaded", main);
