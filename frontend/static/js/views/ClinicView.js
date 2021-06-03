import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  API_URL = "";

  constructor(params) {
    super(params);
    this.clinicId = params.id;
    this.setTitle("Viewing clinic");

    fetch("https://staging-core.api.drdropin.no/v1/clinics/" + this.clinicId)
      .then((resp) => resp.json())
      .then(function (data) {
        let bookingHours = data.bookingHours;
        let periods = data.bookingHours.periods;

        Object.keys(bookingHours).map((item) => {
          var value = bookingHours[item];
          console.log(value.periods);
          // loop through the periods
          for (let [key, val] of Object.entries(value.periods)) {
            console.log(key, "--", val);
          }
        });
      });
  }

  async getHtml() {
    return `
            <h1>Clinics</h1>
            <p>You are viewing clinic #${this.clinicId}.</p>
        `;
  }
}
