import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Clinics");
  }

  async getHtml() {
    return `
            <h1>Clinics</h1>
            <p>You are viewing the clinics!</p>
        `;
  }
}
