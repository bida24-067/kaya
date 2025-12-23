/**
 * popupcard.js
 * Handles the auto-showing and dismissal of the feedback popup card
 */

document.addEventListener("DOMContentLoaded", function () {
    const popupCard = document.getElementById("popup-card");
    if (!popupCard) return;

    const closeBtn = popupCard.querySelector(".btn-close");

    // Show the card
    popupCard.style.display = "block";

    // Auto-hide after 10 seconds (aligned with pricing.html logic)
    const autoHideTimeout = setTimeout(() => {
        fadeOutAndRemove(popupCard);
    }, 10000);

    // Manual dismiss
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            clearTimeout(autoHideTimeout);
            fadeOutAndRemove(popupCard);
        });
    }
});

/**
 * Utility to fade out element and then hide it
 */
function fadeOutAndRemove(element) {
    element.style.animation = "fadeOut 0.5s ease-in-out";
    element.addEventListener("animationend", () => {
        element.style.display = "none";
        element.style.animation = "";
    }, { once: true });
}