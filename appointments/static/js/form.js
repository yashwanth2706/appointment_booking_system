/**
 * Handles patient form submission and swaps to doctor form.
 * Adds color to navbar objects by replacing them with active class to show progress
 * @param {Event} e - Event object passed by addEventListener.
 */
document.addEventListener("DOMContentLoaded", () => {

    // form objects to swap after submit
    const patientForm = document.getElementById("patient-details-form");
    const doctorForm = document.getElementById("doctor-select-form");
    const selectDateAndTime = document.getElementById("select-date");
    const checkout = document.getElementById("payment");
    const bookingStatus = document.getElementById("status");

    // navbar object to change color (progress indicater) after form swap
    const navLinkDoctorSelect = document.getElementById("link-doctor-select");
    const navLinkDateAndTime = document.getElementById("link-date-and-time");
    const navLinkCheckout = document.getElementById("link-checkout");

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
        navLinkDoctorSelect.classList.replace('inactive', 'active');
    });

    doctorForm.addEventListener("submit", function(e) {
        e.preventDefault();
        doctorForm.style.display = "none";
        selectDateAndTime.style.display = "block";
        navLinkDateAndTime.classList.replace('inactive', 'active');
    });

    selectDateAndTime.addEventListener("submit", function(e){
        e.preventDefault();
        selectDateAndTime.style.display = "none";
        checkout.style.display = "block";
        navLinkCheckout.classList.replace('inactive', 'active');
    });

    checkout.addEventListener("submit", function(e){
        e.preventDefault();
        checkout.style.display = "none";
        bookingStatus.style.display = "block";
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


/**
 * Handels date picking upto next two weeks
 * Makes unavailable dates visible blur
 * 
*/

const today = new Date();
const day = today.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

  // --- Calculate min date ---
  let minDate = new Date(today);
  if (day === 6) minDate.setDate(today.getDate() + 2); // Saturday → next Monday
  else if (day === 0) minDate.setDate(today.getDate() + 1); // Sunday → next Monday

  // --- Calculate max date (Friday of week after next) ---
  const daysUntilThisFriday = (day <= 5) ? (5 - day) : (5 + (7 - day));
  const thisFriday = new Date(today);
  thisFriday.setDate(today.getDate() + daysUntilThisFriday);
  const maxFriday = new Date(thisFriday);
  maxFriday.setDate(thisFriday.getDate() + 14);

  // --- Init Flatpickr ---
  flatpickr("#dateInput", {
    inline: true,
    minDate: minDate,
    maxDate: maxFriday,
    dateFormat: "Y-m-d",
    disable: [date => (date.getDay() === 0 || date.getDay() === 6)],
    locale: { firstDayOfWeek: 1 },
    onChange: function(selectedDates) {
      const label = document.getElementById("selected-date");
      if (selectedDates && selectedDates[0]) {
        // Friendly format like "5 September 2025"
        label.textContent = selectedDates[0].toLocaleDateString(undefined, {
          day: 'numeric', month: 'long', year: 'numeric'
        });
        setSlotsEnabled(true);
      } else {
        label.textContent = "No date selected";
        setSlotsEnabled(false);
      }
    }
  });

  // --- Slot selection ---
  const slotButtons = Array.from(document.querySelectorAll(".slot-btn"));
  function setSlotsEnabled(on) {
    slotButtons.forEach(b => b.disabled = !on);
  }
  setSlotsEnabled(false); // disabled until a date is picked

  slotButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      slotButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });
