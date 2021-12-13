// create form
const form = document.createElement("form")
$("#main").append(form);

const dateLabel = document.createElement("label");
dateLabel.innerText = "Select date for which: ";
dateLabel.htmlFor = "date";

const dateInput = document.createElement("input");
dateInput.id = "date";
dateInput.name = "date";
dateInput.type = "date";
dateInput.required = true;
dateInput.classList.add("form-control");

const submit = document.createElement('input')
submit.type="submit"

form.appendChild(dateLabel);
form.appendChild(dateInput);
form.appendChild(submit)
