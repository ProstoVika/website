class MainController {
    constructor() {
        this.aboutContainer = document.getElementById('contact-container');
        this.line = document.getElementById('line');
        if (!this.aboutContainer || !this.line) {
            console.error('Required elements not found');
            return;
        }
        this.initCursor();
        this.progressBar();
        window.addEventListener('scroll', this.progressBar.bind(this));
        this.initListeners();
        this.setupScrollDownButtonListener();
    }




    initCursor() {
        this.cursor = document.createElement("div");
        this.cursor.id = "cursor";
        this.cursor.className = "cursor";
        document.body.appendChild(this.cursor);
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.top = `${e.clientY}px`;
            this.cursor.style.left = `${e.clientX}px`;
        });
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

class CanvasAnimation {
    constructor() {
        this.canvas = document.getElementById('canvas');
        if (typeof this.canvas.getContext === 'undefined') {
            return;
        }
        this.ctx = this.canvas.getContext("2d");
        this.fitCanvasSize();
        window.onresize = this.fitCanvasSize.bind(this);

        this.mouse = { x: undefined, y: undefined };
        this.maxRadius = window.matchMedia("(min-width: 400px)").matches ? 40 : 24;
        this.colorArray = ['#8f9190', '#cfd0d1', '#737777', '#a7aaab', '#505452'];
        this.circleArray = [];
        this.initCircles();
        this.animate();

        window.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    fitCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    onMouseMove(event) {
        this.mouse.x = event.x;
        this.mouse.y = event.y;
    }

    initCircles() {
        for (let i = 0; i < 800; i++) {
            let radius = Math.random() * 3 + 1;
            let x = Math.random() * (this.canvas.width - radius * 2) + radius;
            let dx = (Math.random() - 0.5);
            let y = Math.random() * (this.canvas.height - radius * 2) + radius;
            let dy = (Math.random() - 0.5);
            this.circleArray.push(new Circle(x, y, dx, dy, radius, this.ctx, this.maxRadius, this.mouse, this.colorArray));
        }
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let circle of this.circleArray) {
            circle.update();
        }
    }
}

class Circle {
    constructor(x, y, dx, dy, radius, ctx, maxRadius, mouse, colorArray) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.ctx = ctx;
        this.maxRadius = maxRadius;
        this.mouse = mouse;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update() {
        if (this.x + this.radius > this.ctx.canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > this.ctx.canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (this.mouse.x - this.x < 50 && this.mouse.x - this.x > -50 && this.mouse.y - this.y < 50 && this.mouse.y - this.y > -50) {
            if (this.radius < this.maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
}

window.addEventListener("load", () => {
    new MainController();
    if (window.location.pathname.includes('/pages/projects/')) {
        new CanvasAnimation();
    }
});