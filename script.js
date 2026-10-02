const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;

    const response = document.getElementById("response");

    response.textContent =
        "Thank you, " + name +
        "! Your message has been received.";

    response.style.marginTop = "20px";

    contactForm.reset();

});