/* Helper function for fetching user data */

export const getData = async (
  url: string,
  endpoint: string,
  id: number | null = null
) => {
  try {
    let response;
    // conditional for handling having or not having an ID provided
    if (id === null) {
      response = await fetch(`${url}${endpoint}`, { credentials: "include" }); // 'credentials' passes cookies along with other fetched data
    } else {
      response = await fetch(`${url}${endpoint}/${id}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error getting data ", error);
  }
};

export const deleteData = async (
  url: string,
  endpoint: string,
  id: number | null = null
) => {
  try {
    const response = await fetch(`${url}${endpoint}/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting data ", error);
  }
};

export const postData = async (
  url: string,
  endpoint: string,
  objToPost: object,
  id: number | null = null,
  contentType: string = "application/json"
) => {
  try {
    let response;

    if (id === null) {
      response = await fetch(`${url}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": contentType },
        body: JSON.stringify(objToPost),
        credentials: "include",
      });
    } else {
      response = await fetch(`${url}${endpoint}/${id}`, {
        method: "POST",
        headers: { "Content-Type": contentType },
        body: JSON.stringify(objToPost),
      });
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error posting data ", error);
  }
};

export const fetchSpeechToText = async (url: string, body: object) => {
  try {
    // console.log(body);

    const response = await fetch(`${url}api/speechtotext`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return response;
  } catch (error) {
    console.error("Error getting data ", error);
  }
};

export const fetchTranslation = async (url: string, body: object) => {
  try {
    // console.log(body);

    const response = await fetch(`${url}api/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return response;
  } catch (error) {
    console.error("Error getting data ", error);
  }
};
