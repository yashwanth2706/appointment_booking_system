/**
 * Handles patient form submission and swaps to doctor form.
 *
 * @param {Event} e - Event object passed by addEventListener.
 */
document.addEventListener("DOMContentLoaded", () => {
  const patientForm = document.getElementById("patient-details-form");
  const doctorForm = document.getElementById("doctor-select-form");

  patientForm.addEventListener("submit", function(e) {
    /**
     * Prevent page reload.
     */
    e.preventDefault();

    // Optionally, collect patient data before hiding
    const formData = new FormData(patientForm);
    console.log("Patient data:", Object.fromEntries(formData.entries()));

    // Swap forms
    patientForm.style.display = "none";
    doctorForm.style.display = "block";
  });
});

/**
 * Handles doctor grid navigation.
 *
 * @param {Event} e - Event object passed by addEventListener.
 */
document.addEventListener("DOMContentLoaded", () => {
  const doctorGrid = document.getElementById("doctorGrid");
  const prevBtn = document.getElementById("prevDoctor");
  const nextBtn = document.getElementById("nextDoctor");

  let scrollAmount = 0;
  /**
   * Card width + gap.
   *
   * @constant {number}
   * @default 200
   */
  const cardWidth = 200;
  /**
   * How many cards are shown at once.
   *
   * @constant {number}
   * @default 4
   */
  const visibleCards = 4;

  /**
   * Handles next button click.
   *
   * @param {Event} e - Event object passed by addEventListener.
   */
  nextBtn.addEventListener("click", (e) => {
    const maxScroll = doctorGrid.children.length * cardWidth - visibleCards * cardWidth;
    if (scrollAmount < maxScroll) {
      scrollAmount += cardWidth;
      doctorGrid.style.transform = `translateX(-${scrollAmount}px)`;
    }
  });

  /**
   * Handles previous button click.
   *
   * @param {Event} e - Event object passed by addEventListener.
   */
  prevBtn.addEventListener("click", (e) => {
    if (scrollAmount > 0) {
      scrollAmount -= cardWidth;
      doctorGrid.style.transform = `translateX(-${scrollAmount}px)`;
    }
  });
});
