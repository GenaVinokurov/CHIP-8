const CanvasApp = {
  canvas: document.getElementById("jsCanvas"),
  colorsCollection: document.getElementsByClassName("controls_color"),
  range: document.getElementById("jsRange"),
  mode: document.getElementById("mode"),
  saveButton: document.getElementById("saveButton"),
  c: null,
  painting: false,
  modeType: "draw",

  init() {
    this.c = this.canvas.getContext("2d");
    this.canvas.height = 500;
    this.canvas.width = 500;
    this.c.lineWidth = this.range.value;
    this.c.strokeStyle = "#000000";

    this.addEventListeners();
  },

  addEventListeners() {
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.canvas.addEventListener("mousedown", this.startPainting.bind(this));
    this.canvas.addEventListener("mouseup", this.stopPainting.bind(this));
    this.canvas.addEventListener("mouseleave", this.stopPainting.bind(this));

    Array.from(this.colorsCollection).forEach((el) => {
      el.addEventListener("click", this.setColor.bind(this));
    });

    this.range.addEventListener("input", this.handleChangeWeight.bind(this));
    this.mode.addEventListener("click", this.handleMode.bind(this));
    this.saveButton.addEventListener("click", this.saveImage.bind(this));
  },

  stopPainting() {
    this.painting = false;
  },

  startPainting() {
    this.painting = true;
  },

  onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if (!this.painting) {
      this.c.beginPath();
      this.c.moveTo(x, y);
    } else {
      if (this.modeType === "draw") {
        this.c.lineTo(x, y);
        this.c.stroke();
      } else if (this.modeType === "erase") {
        this.c.clearRect(
          x - this.c.lineWidth / 2,
          y - this.c.lineWidth / 2,
          this.c.lineWidth,
          this.c.lineWidth
        );
      }
    }
  },

  setColor(e) {
    this.c.strokeStyle = e.target.style.backgroundColor;
  },

  handleChangeWeight(e) {
    this.c.lineWidth = e.target.value;
  },

  handleMode() {
    this.modeType = this.modeType === "draw" ? "erase" : "draw";
    this.mode.textContent = this.modeType === "draw" ? "Erase" : "Draw";
  },
  saveImage() {
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = this.canvas.toDataURL("image/png");
    link.click();
  },
};

// Initialize the canvas application
CanvasApp.init();
