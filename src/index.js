import './styles.css';


const sideBarButton = document.querySelector("#hamburger-btn");
const sideBar = document.querySelector("#sidebar");

sideBarButton.addEventListener('click', () => {
    sideBar.classList.toggle("show");
})