type Method = "POST" | "GET" | "DELETE" | "PUT";

export const fetching = async (url: string, method: Method, body?: object) => {
  const baseUrl = "https://reqres.in";
  try {
    const response = await fetch(baseUrl + url, {
      method: method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response;
  } catch (error: any) {
    if (error.status === 404) {
      location.replace("/404");
    }
    console.error(error);
  }
};
