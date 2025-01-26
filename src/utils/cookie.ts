export const getCookie = (name: string): string => {
  let cookieName = name + "=";
  let cookies = document.cookie;
  let cookiesList = cookies.split(";");
  for (let i = 0; i < cookiesList.length; i++) {
    let cookie = cookiesList[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}`;
};
