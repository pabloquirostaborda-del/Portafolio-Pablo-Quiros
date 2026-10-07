/* =========================================
   SLIDERS (cada sección es independiente)
========================================= */

document.querySelectorAll(".graphic-showcase").forEach(initSlider);


function initSlider(section) {

    const slider  = section.querySelector(".slider");
    const slides  = section.querySelectorAll(".slide");
    const dots    = section.querySelectorAll(".dot");
    const counter = section.querySelector(".slide-counter");
    const prev    = section.querySelector(".slider-button.prev");
    const next    = section.querySelector(".slider-button.next");

    if (!slider || slides.length === 0) {
        return;
    }

    let current = 0;


    function show(index) {

        if (index >= slides.length) {
            current = 0;
        }
        else if (index < 0) {
            current = slides.length - 1;
        }
        else {
            current = index;
        }

        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        slides[current].classList.add("active");

        if (dots[current]) {
            dots[current].classList.add("active");
        }

        if (counter) {
            counter.textContent =
                String(current + 1).padStart(2, "0")
                + " / "
                + String(slides.length).padStart(2, "0");
        }
    }


    /* Botones */

    if (prev) prev.addEventListener("click", () => show(current - 1));
    if (next) next.addEventListener("click", () => show(current + 1));


    /* Puntos */

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => show(i));
    });


    /* Swipe */

    let touchStartX = 0;

    slider.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].screenX;
    });

    slider.addEventListener("touchend", event => {
        const difference = touchStartX - event.changedTouches[0].screenX;

        if (difference > 50) {
            show(current + 1);
        }
        else if (difference < -50) {
            show(current - 1);
        }
    });


    show(0);
}