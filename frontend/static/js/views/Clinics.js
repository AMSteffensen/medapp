import AbstractView from "./AbstractView.js";

const API_URL = "https://staging-core.api.drdropin.no/v1/clinics ";

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById("clinics");

const fetchClinicData = async () => {
  fetch(API_URL)
    .then((resp) => resp.json())
    .then(function (data) {
      let clinics = data;
      console.log(data);
      return clinics.map(function (clinic) {
        console.log(clinic.name);
        console.log(clinic.openingHours);
        let li = createNode("li");

        const div = document.createElement("div");
        const h4 = document.createElement("h4");
        const a = document.createElement("a");

        const body = document.querySelector("body");
        body.append(div);
        h4.append(a);
        div.append(h4);

        // Set content and attributes
        a.innerHTML = clinic.name;
        a.setAttribute("href", clinic.name);
        //img.setAttribute("src", clinic.id);
        div.setAttribute("class", "card");

        // let span = createNode("span");
        // let a = createNode("a");
        // let linkText = document.createTextNode(`${clinic.name}`);
        // a.title = `${clinic.name}`;
        // a.href = `${clinic.id}`;
        // li.appendChild(a);

        //append(li, a);

        //a.innerHTML = `${clinic.name}`;
        //append(a, linkText);
        //append(l);
        //append(li, span);
        //append(ul, li);
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
