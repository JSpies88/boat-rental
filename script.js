// ====== Update these with your own details ======
const WHATSAPP_NUMBER = "27826262701"; // country code + number, no "+" or spaces (e.g. 27821234567)
const EMAIL_ADDRESS = "jsjoubertspies7@gmail.com";
// =================================================

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Boat form: show/hide the end date when "Multiple days" is ticked
  const multiDay = document.getElementById("multi-day");
  const endWrap = document.getElementById("end-date-wrapper");
  if (multiDay && endWrap) {
    const endInput = endWrap.querySelector("input");
    multiDay.addEventListener("change", () => {
      endWrap.style.display = multiDay.checked ? "" : "none";
      endInput.required = multiDay.checked;
      if (!multiDay.checked) endInput.value = "";
    });
  }

  setupForm({
    formId: "rental-form",
    errorId: "rental-form-error",
    whatsappId: "contact-whatsapp",
    subject: "Cape Town Collection – boat enquiry",
    fields: [
      ["option", "Interested in"],
      ["boat", "Boat"],
      ["group", "Group size"],
      ["fullname", "Name"],
      ["phone", "Cellphone"],
      ["start_date", "Date"],
      ["end_date", "End date"],
      ["notes", "Notes"],
    ],
  });

  setupForm({
    formId: "stay-form",
    errorId: "stay-form-error",
    whatsappId: "stay-whatsapp",
    subject: "Cape Town Collection – stay enquiry",
    fields: [
      ["option", "Interested in"],
      ["fullname", "Name"],
      ["phone", "Cellphone"],
      ["checkin", "Check-in"],
      ["checkout", "Check-out"],
      ["notes", "Notes"],
    ],
  });
});

function setupForm({ formId, errorId, whatsappId, subject, fields }) {
  const form = document.getElementById(formId);
  if (!form) return; // this form isn't on the page
  const errorEl = document.getElementById(errorId);

  function buildMessage() {
    const missing = [...form.querySelectorAll("[required]")].find(
      (el) => !el.value.trim()
    );
    if (missing) {
      if (errorEl) errorEl.hidden = false;
      missing.focus();
      return null;
    }
    if (errorEl) errorEl.hidden = true;

    const data = new FormData(form);
    const lines = ["Hi! I'd like to make an enquiry:", ""];
    for (const [name, label] of fields) {
      const value = (data.get(name) || "").toString().trim();
      if (value) lines.push(`${label}: ${value}`);
    }
    return lines.join("\n");
  }

  // "Send enquiry" → opens the visitor's email app with the message filled in
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = buildMessage();
    if (!text) return;
    window.location.href =
      `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(text)}`;
  });

  // "Or send on WhatsApp"
  const waBtn = document.getElementById(whatsappId);
  if (waBtn) {
    waBtn.addEventListener("click", () => {
      const text = buildMessage();
      if (!text) return;
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener"
      );
    });
  }
}
