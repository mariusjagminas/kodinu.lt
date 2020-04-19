const btn = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigation");
const navLinks = document.querySelectorAll(".navigation__link");

btn.addEventListener("click", () => {
  navigation.classList.toggle("navigation--active")
});

navLinks.forEach(item => item.addEventListener("click", () => {
  navigation.classList.remove("navigation--active")
}))