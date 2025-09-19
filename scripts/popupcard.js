function dismissCard(button) {
 const card = button.closest('.card');
 card.remove();
}
document.addEventListener("DOMContentLoaded", function () {
       const popupCard = document.getElementById("popup-card");
       // Show the card
       popupCard.style.display = "block";
       // Set a timeout to hide the card after 5 seconds
       setTimeout(() => {
           popupCard.style.animation = "fadeOut 0.5s ease-in-out"; // Trigger fade-out animation
           popupCard.addEventListener("animationend", () => {
               popupCard.style.display = "none"; // Hide after animation ends
           });
       }, 5000); // 5 seconds
   });
   // Dismiss card manually with the "Close" button
   function dismissCard(button) {
       const card = button.closest(".card");
       card.style.animation = "fadeOut 0.5s ease-in-out"; // Trigger fade-out animation
       card.addEventListener("animationend", () => {
           card.remove(); // Remove card after animation ends
       });
   }