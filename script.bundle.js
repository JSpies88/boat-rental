// node_modules/@vercel/analytics/dist/index.mjs
var name = "@vercel/analytics";
var version = "1.6.1";
var initQueue = () => {
  if (window.va) return;
  window.va = function a(...params) {
    (window.vaq = window.vaq || []).push(params);
  };
};
function isBrowser() {
  return typeof window !== "undefined";
}
function detectEnvironment() {
  try {
    const env = "development";
    if (env === "development" || env === "test") {
      return "development";
    }
  } catch (e) {
  }
  return "production";
}
function setMode(mode = "auto") {
  if (mode === "auto") {
    window.vam = detectEnvironment();
    return;
  }
  window.vam = mode;
}
function getMode() {
  const mode = isBrowser() ? window.vam : detectEnvironment();
  return mode || "production";
}
function isDevelopment() {
  return getMode() === "development";
}
function getScriptSrc(props) {
  if (props.scriptSrc) {
    return props.scriptSrc;
  }
  if (isDevelopment()) {
    return "https://va.vercel-scripts.com/v1/script.debug.js";
  }
  if (props.basePath) {
    return `${props.basePath}/insights/script.js`;
  }
  return "/_vercel/insights/script.js";
}
function inject(props = {
  debug: true
}) {
  var _a;
  if (!isBrowser()) return;
  setMode(props.mode);
  initQueue();
  if (props.beforeSend) {
    (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
  }
  const src = getScriptSrc(props);
  if (document.head.querySelector(`script[src*="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
  script.dataset.sdkv = version;
  if (props.disableAutoTrack) {
    script.dataset.disableAutoTrack = "1";
  }
  if (props.endpoint) {
    script.dataset.endpoint = props.endpoint;
  } else if (props.basePath) {
    script.dataset.endpoint = `${props.basePath}/insights`;
  }
  if (props.dsn) {
    script.dataset.dsn = props.dsn;
  }
  script.onerror = () => {
    const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
    console.log(
      `[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`
    );
  };
  if (isDevelopment() && props.debug === false) {
    script.dataset.debug = "false";
  }
  document.head.appendChild(script);
}

// script.js
inject({
  mode: "production"
});
var WHATSAPP_NUMBER = "27826262701";
var EMAIL_ADDRESS = "jsjoubertspies7@gmail.com";
document.getElementById("year").textContent = (/* @__PURE__ */ new Date()).getFullYear();
var form = document.getElementById("contact-form");
var errorEl = document.getElementById("form-error");
function buildMessage() {
  const data = new FormData(form);
  const name2 = (data.get("name") || "").trim();
  if (!name2) {
    errorEl.hidden = false;
    form.elements.name.focus();
    return null;
  }
  errorEl.hidden = true;
  const lines = [
    `Hi! I'm ${name2}.`,
    `I'm interested in: ${data.get("interest")}`,
    `Group size: ${data.get("group")}`
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
  const subject = encodeURIComponent("Cape Town Collection enquiry");
  window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${encodeURIComponent(text)}`;
});
