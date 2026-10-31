// Shared by the theme switch and the root layout (kept out of the client
// component so the server layout gets the real string).
export const THEME_KEY = "fixmyhips:theme";

/** Runs in <head> before first paint so a saved choice never flashes. */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
