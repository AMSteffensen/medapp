import AbstractView from "./AbstractView.js";

// https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

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
        let count = -1;

        const weekdays = {
          monday: 1,
          tuesday: 5,
          wednesday: 6,
          thursday: 4,
          friday: 0,
          saturday: 2,
          sunday: 3,
        };
        //let periods = data.bookingHours.periods;

        Object.keys(bookingHours).map((item) => {
          let value = bookingHours[item];

          // loop through the periods
          for (let [key, val] of Object.entries(value.periods)) {
            //console.log(key, "--", val);

            const body = document.querySelector("body");
            const day = document.createElement("h2");
            const from = document.createElement("li");
            const to = document.createElement("li");

            body.append(day);
            body.append(from);
            body.append(to);

            // convert milliseconds to hours
            let from_val = msToTime(val.from).slice(0, -5);
            let to_val = msToTime(val.to).slice(0, -5);

            //current day
            let dayNames = Object.keys(weekdays);
            console.log(dayNames);
            count++;
            day.innerText = dayNames[count];

            // Set content and attributes
            from.innerHTML = from_val;
            to.innerHTML = to_val;
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
