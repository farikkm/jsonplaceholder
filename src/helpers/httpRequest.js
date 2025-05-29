export async function httpRequest(url, method, headers, body) {
  let loading = false;
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
    loading = true;    

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    data = await response.json();
  } catch (err) {
    error = err.message;
    console.error("Request failed:", error);
  } finally {
    loading = false;
  }

  return { data, error, loading }
}
