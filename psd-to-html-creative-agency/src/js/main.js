//Detects if the user agent is IE
if (window.document.documentMode) {
  var msg = document.querySelector(".ie-message");
  msg.classList.add("ie-message--active");
} else {
  const btn = document.querySelector(".hamburger");
  const navigation = document.querySelector(".navigation");
  const navLinkNodes = document.querySelectorAll(".navigation__link");

  btn.addEventListener("click", () => {
    navigation.classList.toggle("navigation--active");
  });

  navLinkNodes.forEach((item) =>
    item.addEventListener("click", () => {
      navigation.classList.remove("navigation--active");
    })
  );
}
