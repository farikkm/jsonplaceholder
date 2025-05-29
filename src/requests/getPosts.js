import { httpRequest } from "../helpers/httpRequest";

export async function getPosts() {
  try {
    const { data } = await httpRequest(
      import.meta.env.VITE_API_URL + "/posts?_limit=15",
      "GET",
      {
        "Content-Type": "application/json",
      }
    );

    localStorage.setItem("posts", JSON.stringify(data));

    return data;
  } catch (e) {
    throw new Error("Iternal server error!");
  }
}
