
/* REZ HUB - Contact Form */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
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
}


/* REZ HUB - Responsive Hamburger Menu */

const menuButton = document.querySelector(".nav-toggle");
const navigation = document.querySelector("#nav-links");

if (menuButton && navigation) {
    function closeMenu() {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }

    function toggleMenu() {
        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            navigation.classList.add("open");
            menuButton.setAttribute("aria-expanded", "true");
            menuButton.setAttribute(
                "aria-label",
                "Close navigation menu"
            );
        }
    }

    menuButton.addEventListener("click", toggleMenu);

    /* Close the menu after selecting a link */
    navigation.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", closeMenu);
    });

    /* Close the menu when Escape is pressed */
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeMenu();
            menuButton.focus();
        }
    });

    /* Close the menu when clicking outside */
    document.addEventListener("click", function(event) {
        if (
            !navigation.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            closeMenu();
        }
    });

    /* Close the menu when returning to desktop width */
    window.addEventListener("resize", function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}
