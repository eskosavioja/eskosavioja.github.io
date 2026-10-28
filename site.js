'use strict';
(() => {
  const c = window.SITE_CONFIG || {};
  const english = document.documentElement.lang === 'en';
  const tr = (fi, en) => english ? en : fi;
  const byId = (id) => document.getElementById(id);
  const form = byId('contact-form');
  const status = byId('form-status');
  const fields = byId('form-fields');
  byId('year').textContent = new Date().getFullYear();
  if (c.contactConfirmed) {
    byId('phone').textContent = english ? '+358 50 527 2060' : c.phoneDisplay;
    byId('phone').href = 'tel:' + c.phoneHref;
    byId('email').textContent = c.email;
    byId('email').href = 'mailto:' + c.email;
  }
  if (c.profileConfirmed && /^https:\/\/([\w-]+\.)?kuivinenlkv\.fi\//.test(c.profileUrl)) {
    byId('profile-link').href = c.profileUrl;
    byId('profile-link').textContent = tr('Tutustu Kuivinen LKV:hen ↗', 'Visit Kuivinen LKV ↗');
  }
  let photoLoaded = false;
  const privacyComplete = ['controller', 'legalBasis', 'retention', 'processors', 'contact'].every(k => typeof c.privacy?.[k] === 'string' && c.privacy[k].trim());
  const formConfigured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(c.formEndpoint || '');
  const approved = c.publicationReady && c.contactConfirmed && c.photoConfirmed && c.profileConfirmed && c.privacyConfirmed && c.formTested && privacyComplete && formConfigured;
  const localTest = c.localFormTest === true && (location.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) && c.contactConfirmed && formConfigured;
  const canSubmit = approved || localTest;
  let sending = false;
  if (c.privacyConfirmed && privacyComplete && !english) {
    byId('controller').textContent = c.privacy.controller;
    byId('legal-basis').textContent = c.privacy.legalBasis;
    byId('retention').textContent = c.privacy.retention;
    byId('processors').textContent = c.privacy.processors;
    byId('privacy-contact').textContent = c.privacy.contact;
    ['controller', 'legal-basis', 'retention', 'processors', 'privacy-contact'].forEach(id => { byId(id).hidden = false; });
    if (byId('privacy-draft')) byId('privacy-draft').hidden = true;
  }
  const activate = () => {
    if (!canSubmit || !photoLoaded) return;
    form.removeAttribute('inert');
    fields.disabled = false;
    form.action = c.formEndpoint;
    byId('form-note').textContent = localTest && !approved ? tr('Testilomake: viesti lähetetään oikeasti Formspreen kautta Eskon sähköpostiin. Käytä vain omia testitietojasi.', 'Test form: messages are sent to Esko via Formspree. Use only your own test details.') : tr('Lähetä viesti oheisella lomakkeella. Pakolliset kentät on merkitty.', 'Send a message using this form. Required fields are marked.');
    if (approved) document.querySelector('meta[name="robots"]').content = 'index, follow';
  };
  if (c.photoConfirmed && c.photoPath && !c.photoPath.includes('..') && !/^(https?:|\/\/|data:)/i.test(c.photoPath)) {
    const img = byId('portrait-photo') || new Image();
    img.alt = english ? 'Esko Savioja outside the Kuivinen LKV office' : c.photoAlt;
    img.width = 800; img.height = 1000;
    img.onload = () => { photoLoaded = true; activate(); };
    img.onerror = () => { img.remove(); };
    img.src = (english ? '../' : '') + c.photoPath;
    byId('portrait').insertBefore(img, byId('portrait').firstChild);
    if (img.complete && img.naturalWidth > 0) { photoLoaded = true; activate(); }
  }
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!canSubmit || !photoLoaded || sending || !form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get('_gotcha')) return;
    sending = true;
    fields.disabled = true;
    status.textContent = tr('Lähetetään viestiä…', 'Sending your message…');
    try {
      const response = await fetch(c.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      status.textContent = tr('Kiitos viestistäsi! Viestisi on lähetetty.', 'Thank you! Your message has been sent.');
    } catch {
      status.textContent = tr('Viestin lähetystä ei voitu vahvistaa. Tiedot ovat yhä lomakkeella. Voit yrittää uudelleen tai ottaa yhteyttä puhelimitse tai sähköpostilla.', 'We could not confirm that your message was sent. Your details are still in the form. Please try again or contact us by phone or email.');
    } finally {
      fields.disabled = false;
      sending = false;
    }
  });
})();
