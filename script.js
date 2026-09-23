// ====== Update these with your own details ======
const WHATSAPP_NUMBER = "27000000000"; // country code + number, no "+" or spaces (e.g. 27821234567)
const EMAIL_ADDRESS = "hello@example.com";
// =================================================

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contact-form");
const errorEl = document.getElementById("form-error");

function buildMessage() {
  const data = new FormData(form);
  const name = (data.get("name") || "").trim();
  if (!name) {
    errorEl.hidden = false;
    form.elements.name.focus();
    return null;
  }
  errorEl.hidden = true;

  const lines = [
    `Hi! I'm ${name}.`,
    `I'm interested in: ${data.get("interest")}`,
    `Group size: ${data.get("group")}`,
  ];
  const dates = (data.get("dates") || "").trim();
  const message = (data.get("message") || "").trim();
  if (dates) lines.push(`Dates: ${dates}`);
  if (message) lines.push("", message);
  return lines.join("\n");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = buildMessage();
  if (!text) return;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

document.getElementById("email-btn").addEventListener("click", () => {
  const text = buildMessage();
  if (!text) return;
  const subject = encodeURIComponent("Cape Town boat & stay enquiry");
  window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${encodeURIComponent(text)}`;
});
