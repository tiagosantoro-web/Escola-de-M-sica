/*
  Music Ville Escola de Música — Solodev Studio
  Menu, WhatsApp, formulário de interesse e animações de entrada.
  Efeitos usam apenas transform e opacity e respeitam prefers-reduced-motion.
*/

/* INÍCIO - Configuração do cliente */
const sdConfig = {
  // PENDENTE: número com DDI e DDD, só dígitos. Ex.: '5511999999999'
  whatsappNumber: '',
  messages: {
    trial: 'Olá, Music Ville! Vi o site e gostaria de agendar uma aula experimental gratuita.',
    visit: 'Olá, Music Ville! Vi o site e gostaria de agendar uma visita à escola.',
    general: 'Olá, Music Ville! Vi o site e gostaria de mais informações sobre as aulas.',
    course: 'Olá, Music Ville! Vi o site e quero aprender {curso}. Gostaria de agendar uma aula experimental gratuita.',
  },
  // PENDENTE: link completo do Instagram. Vazio = item oculto.
  instagramUrl: '',
};
/* FIM - Configuração do cliente */

const sdReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const sdWhatsappUrl = (message) => `https://wa.me/${sdConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
const sdHasWhatsapp = () => /^\d{10,15}$/.test(sdConfig.whatsappNumber);
const sdScrollBehavior = () => (sdReducedMotion.matches ? 'auto' : 'smooth');

/* INÍCIO - Menu do celular e cabeçalho */
const initializeMenu = () => {
  const toggle = document.querySelector('.sd-menu-toggle');
  const menu = document.getElementById('sd-mobile-menu');
  const header = document.querySelector('.sd-header');
  if (!toggle || !menu || !header) return;

  const setOpen = (open) => {
    menu.hidden = !open;
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  toggle.addEventListener('click', () => setOpen(menu.hidden));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 64rem)').addEventListener('change', () => setOpen(false));

  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
};
/* FIM - Menu do celular e cabeçalho */

/* INÍCIO - Links de WhatsApp */
const initializeContactLinks = () => {
  // Sem número configurado, os botões levam ao formulário de interesse em vez de abrir um link inválido.
  document.querySelectorAll('[data-whatsapp-link]').forEach((link) => {
    if (!sdHasWhatsapp()) return;
    const { course, message } = link.dataset;
    const text = course ? sdConfig.messages.course.replace('{curso}', course) : sdConfig.messages[message || 'general'];
    link.href = sdWhatsappUrl(text);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  if (sdConfig.instagramUrl) {
    document.querySelectorAll('[data-instagram-link]').forEach((link) => { link.href = sdConfig.instagramUrl; });
    document.querySelectorAll('[data-instagram-block]').forEach((block) => { block.hidden = false; });
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
};
/* FIM - Links de WhatsApp */

/* INÍCIO - Formulário de interesse */
const initializeInterestForm = () => {
  const form = document.querySelector('[data-interest-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const fields = {
    name: form.elements.namedItem('name'),
    course: form.elements.namedItem('course'),
    notes: form.elements.namedItem('notes'),
  };
  const clean = (value) => value.replace(/[\u0000-\u001f<>]/g, ' ').replace(/\s+/g, ' ').trim();

  const rules = {
    name: () => (clean(fields.name.value).length >= 2 ? '' : 'Informe seu nome.'),
    course: () => (fields.course.value ? '' : 'Escolha um curso.'),
  };

  const showError = (name) => {
    const message = rules[name]();
    form.querySelector(`[data-error-for="${name}"]`).textContent = message;
    fields[name].setAttribute('aria-invalid', String(Boolean(message)));
    return message;
  };

  Object.keys(rules).forEach((name) => {
    fields[name].addEventListener('blur', () => showError(name));
    fields[name].addEventListener(name === 'course' ? 'change' : 'input', () => {
      if (fields[name].getAttribute('aria-invalid') === 'true') showError(name);
    });
  });

  const focusForm = () => {
    form.scrollIntoView({ behavior: sdScrollBehavior(), block: 'center' });
    form.classList.remove('is-highlighted');
    void form.offsetWidth;
    form.classList.add('is-highlighted');
    window.setTimeout(() => fields.name.focus({ preventScroll: true }), sdReducedMotion.matches ? 0 : 700);
  };

  // Sem WhatsApp configurado, os botões "Quero aprender" já deixam o curso escolhido no formulário.
  if (!sdHasWhatsapp()) {
    document.querySelectorAll('[data-whatsapp-link]').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        if (link.dataset.course) {
          fields.course.value = link.dataset.course;
          showError('course');
        }
        focusForm();
      });
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.className = 'sd-form__status';
    status.textContent = '';

    const invalid = Object.keys(rules).filter((name) => showError(name));
    if (invalid.length) {
      fields[invalid[0]].focus();
      status.classList.add('is-error');
      status.textContent = 'Confira os campos destacados.';
      return;
    }

    if (!sdHasWhatsapp()) {
      status.classList.add('is-error');
      status.textContent = 'O WhatsApp da Music Ville ainda não foi configurado neste site. Tente novamente mais tarde.';
      return;
    }

    const student = form.elements.namedItem('student').value;
    const notes = clean(fields.notes.value);
    const course = fields.course.value === 'Ainda não sei' ? 'ainda não escolhi o curso' : `curso: ${fields.course.value}`;
    const lines = [
      `Olá, Music Ville! Meu nome é ${clean(fields.name.value)}.`,
      `Gostaria de agendar uma aula experimental gratuita (${course}).`,
      `A aula é para ${student}.`,
    ];
    if (notes) lines.push(`Observações: ${notes}`);

    // Com 'noopener' o window.open sempre retorna null; por isso o opener é limpo depois.
    const opened = window.open(sdWhatsappUrl(lines.join('\n')), '_blank');
    if (opened) opened.opener = null;
    status.classList.add(opened ? 'is-success' : 'is-error');
    status.textContent = opened ? 'Abrimos o WhatsApp com sua mensagem pronta. É só enviar!' : 'Não foi possível abrir uma nova aba. Verifique se o navegador bloqueou pop-ups.';
  });
};
/* FIM - Formulário de interesse */

/* INÍCIO - Animações de entrada */
const initializeReveal = () => {
  const items = document.querySelectorAll('.sd-reveal');
  if (sdReducedMotion.matches || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
};
/* FIM - Animações de entrada */

/* INÍCIO - Fallback de imagens */
const initializeImageFallback = () => {
  document.querySelectorAll('.sd-page img').forEach((image) => {
    const markMissing = () => image.closest('figure, .sd-course, .sd-final')?.classList.add('is-missing');
    if (image.complete && image.naturalWidth === 0) markMissing();
    else image.addEventListener('error', markMissing, { once: true });
  });
};
/* FIM - Fallback de imagens */

document.addEventListener('DOMContentLoaded', () => {
  initializeMenu();
  initializeContactLinks();
  initializeInterestForm();
  initializeReveal();
  initializeImageFallback();
});
