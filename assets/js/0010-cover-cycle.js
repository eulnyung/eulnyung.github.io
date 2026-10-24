/* 0010 only: choose once before painting; save only explicit reader choices. */
(function () {
  'use strict';
  var key = 'aium-0010-cover-phase';
  var root = document.documentElement;
  var hour = new Date().getHours();
  var phase = hour >= 6 && hour < 18 ? 'day' : 'night';
  var button;

  function savedPhase() {
    try {
      var value = sessionStorage.getItem(key);
      return value === 'day' || value === 'night' ? value : null;
    } catch (error) { return null; }
  }

  function show(value) {
    phase = value;
    root.setAttribute('data-aium-0010-cover', phase);
    if (button) {
      button.setAttribute('aria-label', phase === 'day' ? '저작물 — 밤 표지로 전환' : '저작물 — 낮 표지로 전환');
      button.setAttribute('title', phase === 'day' ? '저작물 — 밤 표지로 전환' : '저작물 — 낮 표지로 전환');
      button.hidden = false;
    }
  }

  show(savedPhase() || phase);
  document.addEventListener('DOMContentLoaded', function () {
    button = document.querySelector('[data-cover-cycle-toggle="0010"]');
    show(phase);
    if (button) button.addEventListener('click', function () {
      var next = phase === 'day' ? 'night' : 'day';
      try { sessionStorage.setItem(key, next); } catch (error) { /* Keep this page usable. */ }
      show(next);
    });
  });
  // A restored page should reflect a manual choice made later in this same tab.
  window.addEventListener('pageshow', function () { show(savedPhase() || phase); });
}());
