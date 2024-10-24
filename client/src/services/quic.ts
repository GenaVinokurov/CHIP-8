export default class Quic {
  quicButton: HTMLButtonElement;

  constructor() {
    this.quicButton = document.getElementById("getImgBtn") as HTMLButtonElement;
    this.addEventListeners();
  }

  sendMessage(): void {
    const imageData = "Hello from client";

    fetch("http://localhost:1234/send-to-quic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: imageData }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Data sent to QUIC") {
          console.log("Image sent to QUIC server!");
        } else {
          console.log("Failed to send image.");
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("An error occurred while sending the image.", err);
      });
  }

  addEventListeners(): void {
    this.quicButton.addEventListener("click", this.sendMessage.bind(this));
  }
}
