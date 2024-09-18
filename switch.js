document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('themeSwitcher');
    const themeStylesheet = document.getElementById('themeStylesheet');

    // Load theme preference from localStorage
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(`${currentTheme}-mode`);
    themeStylesheet.href = `${currentTheme}-theme.css`;

    // Toggle theme on button click
    themeSwitcher.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');
        themeStylesheet.href = `${newTheme}-theme.css`;
        localStorage.setItem('theme', newTheme);
    });
});
