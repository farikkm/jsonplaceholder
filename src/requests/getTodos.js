export async function getTodos() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log(data);

    return data;
  } catch (e) {
    throw new Error("Iternal server error!")
  }
}
