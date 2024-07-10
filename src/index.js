import "./scss/styles.scss";
import $ from "jquery";


$(() => {
  document.querySelectorAll(".nav__link").forEach((link) => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });

  if (window.location.pathname.includes("/home")) {
    $("#nav-home").addClass("nav-links--active");
    $("#mobile--nav-home").addClass("nav-link--active");
  } else {
    $("#nav-home").removeClass("nav-links--active");
    $("#mobile--nav-home").removeClass("nav-link--active");
  }

  //Mobile Header Menu
  $(".menu").on("click", () => {
    $(".menu").addClass("menu--close");
    $(".close").addClass("close--open");
    $(".mobile-links").addClass("mobile-links--open");
    $("body").css("overflow", "auto");
  });

  $(".nav-link, .mobile--nav-service, .close").on("click", () => {
    $(".close").removeClass("close--open");
    $(".menu").removeClass("menu--close");
    $(".mobile-links").removeClass("mobile-links--open");
    $(".mobile--nav-services-list").removeClass(
      "mobile--nav-services-list--open"
    );
  });

  $(".mobile--nav-services-head").on("click", () => {
    $(".mobile--nav-services-list").toggleClass(
      "mobile--nav-services-list--open"
    );
    $(".mobile--nav-services-head").toggleClass(
      "mobile--nav-services-head--open"
    );
  });

  // faq section

  const faqQuestions = document.querySelectorAll(".question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const pElement = question.querySelector("p");

      question.classList.toggle("active");
      pElement.classList.toggle("active");

      answer.style.display = answer.style.display === "flex" ? "none" : "flex";
    });
  });
});

window.onload = function () {
  const toggleButtons = document.querySelectorAll('.toggle-button');
  toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
          const content = this.nextElementSibling;
          content.classList.toggle('hidden');
          
          const toggleSymbol = this.querySelector('.symbol');
          if (toggleSymbol.textContent === '+') {
              toggleSymbol.textContent = '-';
          } else {
              toggleSymbol.textContent = '+';
          }
      });
  });
};
