'use strict';
(() => {
  const c = window.SITE_CONFIG || {};
  const byId = (id) => document.getElementById(id);
  const form = byId('contact-form');
  const status = byId('form-status');
  const fields = byId('form-fields');
  byId('year').textContent = new Date().getFullYear();
  if (c.contactConfirmed) {
    byId('phone').textContent = c.phoneDisplay;
    byId('phone').href = 'tel:' + c.phoneHref;
    byId('email').textContent = c.email;
    byId('email').href = 'mailto:' + c.email;
  }
  if (c.profileConfirmed && /^https:\/\/([\w-]+\.)?kuivinenlkv\.fi\//.test(c.profileUrl)) {
    byId('profile-link').href = c.profileUrl;
    byId('profile-link').textContent = 'Tutustu Kuivinen LKV:hen ↗';
  }
  let photoLoaded = false;
  const privacyComplete = ['controller', 'legalBasis', 'retention', 'processors', 'contact'].every(k => typeof c.privacy?.[k] === 'string' && c.privacy[k].trim());
  const formConfigured = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(c.formEndpoint || '');
  const approved = c.publicationReady && c.contactConfirmed && c.photoConfirmed && c.profileConfirmed && c.privacyConfirmed && c.formTested && privacyComplete && formConfigured;
  const localTest = c.localFormTest === true && (location.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) && c.contactConfirmed && formConfigured;
  const canSubmit = approved || localTest;
  let sending = false;
  if (c.privacyConfirmed && privacyComplete) {
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
    byId('form-note').textContent = localTest && !approved ? 'Testilomake: viesti lähetetään oikeasti Formspreen kautta Eskon sähköpostiin. Käytä vain omia testitietojasi.' : 'Lähetä viesti oheisella lomakkeella. Pakolliset kentät on merkitty.';
    if (approved) document.querySelector('meta[name="robots"]').content = 'index, follow';
  };
  if (c.photoConfirmed && c.photoPath && !c.photoPath.includes('..') && !/^(https?:|\/\/|data:)/i.test(c.photoPath)) {
    const img = byId('portrait-photo') || new Image();
    img.alt = c.photoAlt;
    img.width = 800; img.height = 1000;
    img.onload = () => { photoLoaded = true; activate(); };
    img.onerror = () => { img.remove(); };
    img.src = c.photoPath;
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
    status.textContent = 'Lähetetään viestiä…';
    try {
      const response = await fetch(c.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      status.textContent = 'Kiitos viestistäsi! Viestisi on lähetetty.';
    } catch {
      status.textContent = 'Viestin lähetystä ei voitu vahvistaa. Tiedot ovat yhä lomakkeella. Voit yrittää uudelleen tai ottaa yhteyttä puhelimitse tai sähköpostilla.';
    } finally {
      fields.disabled = false;
      sending = false;
    }
  });
})();
