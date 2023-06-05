const BASE_URL = "https://api.green-api.com";

export async function getAuthStatus(
  idInstance: string | FormDataEntryValue,
  apiTokenInstance: string | FormDataEntryValue
) {
  try {
    const res = await fetch(
      `${BASE_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
    );
    return res.status;
  } catch (error) {
    console.log(error);
  }
}

function getAuthData() {
  const auth = localStorage.getItem("auth");
  if (!auth) throw "Not properly authorized";
  return JSON.parse(auth);
}

export async function checkWhatsapp(tel: string) {
  try {
    const auth = localStorage.getItem("auth");
    if (!auth) throw "Not properly authorized";
    const { idInstance, apiTokenInstance } = getAuthData();
    const res = await fetch(
      `${BASE_URL}/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`,
      {
        method: "POST",
        body: JSON.stringify({
          phoneNumber: `${tel}`,
        }),
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function sendMessage(chatId: string, message: string) {
  try {
    const { idInstance, apiTokenInstance } = getAuthData();
    const res = await fetch(
      `${BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        method: "POST",
        body: JSON.stringify({
          chatId: `${chatId}@c.us`,
          message,
        }),
      }
    );
    return res.json();
  } catch (error) {}
}

export async function recieveNotification() {
  try {
    const { idInstance, apiTokenInstance } = getAuthData();
    const res = await fetch(
      `${BASE_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
    );
    return res.json();
  } catch (error) {}
}

export async function deleteNotification(id: number) {
  try {
    const { idInstance, apiTokenInstance } = getAuthData();
    const res = await fetch(
      `${BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${id}`,
      { method: "DELETE" }
    );
    return res.json();
  } catch (error) {}
}
