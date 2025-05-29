import { httpRequest } from "../helpers/httpRequest";

export async function postTodo(title, body) {
  if (title && body) {
    const newPost = { title, body };

    const { data } = await httpRequest(
      import.meta.env.VITE_API_URL + "/posts",
      "POST",
      {
        "Content-Type": "application/json",
      },
      newPost
    );

    return data;
  } else {
    alert("Заполните все поля");
  }
}
