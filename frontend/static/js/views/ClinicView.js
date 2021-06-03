import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.postId = params.id;
    this.setTitle("Viewing Clinics");
  }

  async getHtml() {
    return `
            <h1>Clinics</h1>
            <p>You are viewing clinic #${this.clinicId}.</p>
        `;
  }
}
