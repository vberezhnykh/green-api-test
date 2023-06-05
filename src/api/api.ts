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
