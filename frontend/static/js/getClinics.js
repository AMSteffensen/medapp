const url = "https://staging-core.api.drdropin.no/v1/clinics ";
const clinicName = document.querySelector("#name");
const clinicOpen = document.querySelector("#open");
const errorMsg = document.querySelector("#error");
const container = document.querySelector(".container");

const handleErrors = function (response) {
  if (!response.ok) {
    throw response.status + ": " + response.statusText;
  }
  return response.json();
};

const updateOpeningTimes = function (parsedData) {
  console.log(parsedData);
  clinicName.textContent = parsedData[0].name;

  let html = "";
  // check if clinic is open
  if (parsedData[0].isOpen) {
    clinicOpen.textContent = "It's open!";
  } else {
    clinicOpen.textContent = "Closed";
  }
};

const createRequest = function (url, succeed, fail) {
  fetch(url)
    .then((response) => handleErrors(response))
    .then((data) => {
      updateOpeningTimes(data);
    })
    .catch((error) => fail(error));
};

createRequest(url);

export { createRequest };
