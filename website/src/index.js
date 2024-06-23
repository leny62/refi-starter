import "./scss/styles.scss";
import $ from "jquery";
import "slick-carousel/slick/slick.scss";
import "slick-carousel";

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
  let contactForm = document.querySelector(".contact-form");
  let successMessage = document.querySelector(".success-message");
  let errorMessage = document.querySelector(".error-message");
  let closeIcon = document.querySelector(".close-icon");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let firstName = contactForm.elements["firstName"].value;
    let lastName = contactForm.elements["lastName"].value;
    let name = `${firstName} ${lastName}`;

    let formData = new FormData(contactForm);
    formData.append("name", name);

    let body = new URLSearchParams();
    for (let pair of formData) {
      body.append(pair[0], pair[1]);
    }

    fetch("/v1/brands/58/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          );
        }
        contactForm.style.display = "none";
        successMessage.style.display = "flex";
      })
      .catch((error) => {
        errorMessage.style.display = "flex";
        console.error(
          `There has been a problem with your fetch operation: ${error.message}`
        );
      });
  });

  closeIcon.addEventListener("click", () => {
    errorMessage.style.display = "none";
  });
};
