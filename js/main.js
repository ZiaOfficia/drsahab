/* =========================================================
   Dr. Farhan Orthocare — behaviour
   One job: turn the appointment form into a prefilled
   WhatsApp message. No tracking, nothing stored.
   ========================================================= */
(function () {
  "use strict";

  var PHONE = "919140693797";
  var GREETING = "Namaste Dr. Farhan Ahmad, I would like an appointment.";

  var fields = {
    name:  document.getElementById("f-name"),
    age:   document.getElementById("f-age"),
    day:   document.getElementById("f-day"),
    issue: document.getElementById("f-issue")
  };
  var sendLink = document.getElementById("waSend");

  function waLink(lines) {
    return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(lines.join("\n"));
  }

  function compose() {
    var lines = [GREETING];
    if (fields.name.value.trim())  lines.push("Patient: " + fields.name.value.trim());
    if (fields.age.value.trim())   lines.push("Age: " + fields.age.value.trim());
    if (fields.day.value)          lines.push("Preferred day: " + fields.day.value);
    if (fields.issue.value.trim()) lines.push("Problem: " + fields.issue.value.trim());
    sendLink.href = waLink(lines);
  }

  if (sendLink && fields.name && fields.age && fields.day && fields.issue) {
    Object.keys(fields).forEach(function (key) {
      fields[key].addEventListener("input", compose);
      fields[key].addEventListener("change", compose);
    });
    compose();
  }

  // The hero and dock buttons open WhatsApp with the greeting already written.
  ["heroWa", "dockWa"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = waLink([GREETING]);
  });

  // Video thumbnails load the YouTube player only when clicked.
  document.querySelectorAll(".yt[data-yt]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var frame = document.createElement("iframe");
      frame.src = "https://www.youtube-nocookie.com/embed/" + btn.getAttribute("data-yt") + "?autoplay=1&rel=0";
      frame.title = btn.getAttribute("aria-label").replace(/^Play video: /, "");
      frame.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      btn.replaceWith(frame);
      frame.focus();
    });
  });

  // Jumping to a section should also move keyboard focus there.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      var target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
})();
