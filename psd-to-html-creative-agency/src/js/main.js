const btn = document.querySelector(".hamburger");
const navigation = document.querySelector(".navigation");
const navLinkNodes = document.querySelectorAll(".navigation__link");

const navLinks = Array.prototype.slice.call(navLinkNodes); // for IE support

btn.addEventListener("click", () => {
  navigation.classList.toggle("navigation--active");
});

navLinks.forEach((item) =>
  item.addEventListener("click", () => {
    navigation.classList.remove("navigation--active");
  })
);
