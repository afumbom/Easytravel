const langSwitcher = document.getElementById('language-select');
const langElements = document.querySelectorAll('[data-lang-en], [data-lang-fr]');

langSwitcher.addEventListener('change', (event) => {
    const selectedLang = event.target.value;
    langElements.forEach(el => {
        el.textContent = el.getAttribute(`data-lang-${selectedLang}`);
    });
});
