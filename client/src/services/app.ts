export default class CanvasApp {
  canvas: HTMLCanvasElement;
  colorsCollection: HTMLCollectionOf<Element>;
  range: HTMLInputElement;
  mode: HTMLButtonElement;
  saveButton: HTMLButtonElement;
  submitButton: HTMLButtonElement;
  c: CanvasRenderingContext2D | null;
  painting: boolean;
  modeType: string;

  constructor() {
    this.canvas = document.getElementById("jsCanvas") as HTMLCanvasElement;
    this.colorsCollection = document.getElementsByClassName("controls_color");
    this.range = document.getElementById("jsRange") as HTMLInputElement;
    this.mode = document.getElementById("mode") as HTMLButtonElement;
    this.saveButton = document.getElementById(
      "saveButton"
    ) as HTMLButtonElement;
    this.submitButton = document.getElementById(
      "submitButton"
    ) as HTMLButtonElement;
    this.c = null;
    this.painting = false;
    this.modeType = "draw";

    this.init();
  }

  init(): void {
    this.c = this.canvas.getContext("2d");
    if (this.c) {
      this.canvas.height = 500;
      this.canvas.width = 500;
      this.c.lineWidth = this.range.valueAsNumber;
      this.c.strokeStyle = "#000000";
    }

    this.addEventListeners();
  }

  stopPainting(): void {
    this.painting = false;
  }

  startPainting(): void {
    this.painting = true;
  }

  onMouseMove(e: MouseEvent): void {
    const x = e.offsetX;
    const y = e.offsetY;

    if (!this.c) return;

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
  }

  setColor(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (target && this.c) {
      this.c.strokeStyle = target.style.backgroundColor;
    }
  }

  handleChangeWeight(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (this.c) {
      this.c.lineWidth = target.valueAsNumber;
    }
  }

  handleMode(): void {
    this.modeType = this.modeType === "draw" ? "erase" : "draw";
    this.mode.textContent = this.modeType === "draw" ? "Erase" : "Draw";
  }

  saveImage(): void {
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = this.canvas.toDataURL("image/png");
    link.click();
  }

  submitImage(): void {
    const imageData = this.canvas.toDataURL("image/png");
    fetch("/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Image uploaded successfully") {
          alert("Image saved on server!");
        } else {
          alert("Failed to save image.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while saving the image.");
      });
  }

  addEventListeners(): void {
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.canvas.addEventListener("mousedown", this.startPainting.bind(this));
    this.canvas.addEventListener("mouseup", this.stopPainting.bind(this));
    this.canvas.addEventListener("mouseleave", this.stopPainting.bind(this));

    Array.from(this.colorsCollection).forEach((el) => {
      el.addEventListener("click", this.setColor.bind(this) as EventListener);
    });

    this.range.addEventListener("input", this.handleChangeWeight.bind(this));
    this.mode.addEventListener("click", this.handleMode.bind(this));
    this.saveButton.addEventListener("click", this.saveImage.bind(this));
    this.submitButton.addEventListener("click", this.submitImage.bind(this));
  }
}
