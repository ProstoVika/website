class MainController {
    aboutContainer;
    line;

    constructor() {
        this.aboutContainer = document.getElementById('contact-container');
        this.line = document.getElementById('line');
        if (!this.aboutContainer || !this.line) {
            console.error('Required elements not found');
            return;
        }

        this.progressBar();
        window.addEventListener('scroll', this.progressBar.bind(this));
        this.initListeners();
        this.setupScrollDownButtonListener();
    }

    progressBar() {
        let windowScroll = window.scrollY || document.documentElement.scrollTop;
        let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let width_progress_line = (windowScroll / windowHeight) * 100;
        this.line.style.width = width_progress_line + '%';
    }

    toggleContactContainer = () => {
        this.aboutContainer.style.display = this.aboutContainer.style.display === 'none' ? 'block' : 'none';
    }

    scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }

    initListeners = () => {
        document.getElementById("contact-btn").addEventListener("click", this.toggleContactContainer.bind(this));
        document.querySelector(".close-contact").addEventListener("click", this.toggleContactContainer.bind(this));
    }

    setupScrollDownButtonListener = () => {
        const scrollDownButton = document.getElementById("scroll-down-button");
        if (scrollDownButton) {
            scrollDownButton.addEventListener("click", this.scrollToBottom);
        }
    }
}

new MainController();
