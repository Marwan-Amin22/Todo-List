
export default function buildThemeSection() {
    const themeDiv = document.createElement('div');
    themeDiv.setAttribute("id", "theme-group");
    themeDiv.setAttribute("class", "nav-group");

    const h2 = document.createElement('h2');
    h2.innerText = "Theme";

    const themeBtn = document.createElement('button');
    themeBtn.setAttribute("id", "toggle-theme-btn");
    themeBtn.setAttribute("class", "text-button");
    themeBtn.innerText = "temp"

    themeDiv.append(h2, themeBtn);
    return themeDiv;

}