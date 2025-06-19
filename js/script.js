document.addEventListener("DOMContentLoaded", function () {

    // Smooth scrolling for navbar links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Hero Section Dynamic Image Swap
    const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
    let currentImageIndex = 0;

    function changeHeroImage() {
        const heroImage = document.getElementById("hero-image");
        heroImage.src = images[currentImageIndex];
        heroImage.style.opacity = 1;
        setTimeout(() => {
            heroImage.style.opacity = 0;
            currentImageIndex = (currentImageIndex + 1) % images.length;
            setTimeout(changeHeroImage, 1500); // Change every 1.5s
        }, 4000);
    }

    changeHeroImage();

    // Navbar Scroll Effect
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Contact Form Fade-In Effect on Scroll
    const contactForm = document.getElementById("contact-form");
    window.addEventListener("scroll", function () {
        const formPosition = contactForm.getBoundingClientRect().top;
        const screenHeight = window.innerHeight / 1.2;
        if (formPosition < screenHeight) {
            contactForm.classList.add("show");
        }
    });

    // Initialize EmailJS
    emailjs.init("fraZjeKccOwpnO8jc"); // Replace with actual Public Key

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Validate form inputs
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            showErrorAlert("❌ Error", "Please fill in all fields before sending.");
            return;
        }

        showLoading(); // Show loading indicator

       // ✅ Send the user's message to YOU (Tolulope)
emailjs.send("service_k0n400u", "template_xjs5vwr", {
    from_name: name,
    from_email: email,
    message: message,
    to_email: "tolulopeoginni90@gmail.com" // your email
}).then(() => {

    // ✅ Send auto-reply to the USER
    emailjs.send("service_k0n400u", "template_p8ig16n", {
        from_name: name,
        to_email: email // user's email
    }).then(() => {

        hideLoading(); // Hide loading after both succeed
        showSuccessAlert("✅ Message Sent!", "Thank you for reaching out. I'll get back to you soon!");
        document.getElementById("contact-form").reset();

    }).catch(error => {
        hideLoading();
        showErrorAlert("❌ Confirmation Failed", "Your message was sent, but confirmation email failed.");
        console.error(error);
    });

}).catch(error => {
    hideLoading();
    showErrorAlert("❌ Message Failed", "Something went wrong. Please try again later.");
    console.error(error);
});
    });

    // Loading Indicator for Email Sending
    function showLoading() {
        Swal.fire({
            title: "Sending Message...",
            text: "Please wait a moment.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }

    function hideLoading() {
        Swal.close();
    }

    // Success & Error Alerts with SweetAlert
    function showSuccessAlert(title, message) {
        Swal.fire({
            icon: "success",
            title: title,
            text: message,
            confirmButtonColor: "#0073E6"
        });
    }

    function showErrorAlert(title, message) {
        Swal.fire({
            icon: "error",
            title: title,
            text: message,
            confirmButtonColor: "#E60000"
        });
    }

    // Fade-in effect for elements on scroll
    const fadeElements = document.querySelectorAll(".fade-in");

    function checkVisibility() {
        fadeElements.forEach((element) => {
            const position = element.getBoundingClientRect().top;
            const screenHeight = window.innerHeight / 1.4; // Adjusted for smoother trigger
            
            if (position < screenHeight) {
                element.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility(); // Runs on load for smoother effect
});
