export async function httpRequest(url, method, headers, body) {
  let error = "";
  let data = null;

  const options = {
    method,
    headers: { ...headers },
  };

  if (body) {
    options.body = JSON.stringify(body);
    if (!options.headers["Content-Type"]) {
      options.headers["Content-Type"] = "application/json";
    }
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    data = await response.json();
  } catch (err) {
    error = err.message;
    console.error("Request failed:", error);
  }

  return { data, error }
}
