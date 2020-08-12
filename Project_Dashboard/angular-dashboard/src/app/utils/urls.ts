export const BACKEND_URL: string = "http://localhost:3000/widgets";
export const CURRENT_WIDGET_ID: string = new URL(window.location.href).search.split("?id=")[1];
export const CURRENT_URL:URL = new URL(window.location.href);