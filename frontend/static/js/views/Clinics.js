import AbstractView from "./AbstractView.js";

const API_URL = "https://staging-core.api.drdropin.no/v1/clinics ";

const ul = document.getElementById("clinics");

const fetchClinicData = async () => {
  fetch(API_URL)
    .then((resp) => resp.json())
    .then(function (data) {
      let clinics = data;
      console.log(data);
      return clinics.map(function (clinic) {
        const div = document.createElement("div");
        const h4 = document.createElement("h4");
        const a = document.createElement("a");

        const body = document.querySelector("body");
        body.append(div);
        h4.append(a);
        div.append(h4);

        // Set content and attributes
        a.innerHTML = clinic.name;
        a.setAttribute("href", "/clinics/" + clinic.id);
        div.setAttribute("class", "card");
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Clinics");
    fetchClinicData();
  }

  async getHtml() {
    return `       
            <h1>Clinics</h1>
              
        `;
  }
}
