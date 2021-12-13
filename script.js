// create date input
const dateLabel = document.createElement("label");
dateLabel.innerText = "Select date for which: ";
dateLabel.htmlFor = "date";

const dateInput = document.createElement("input");
dateInput.id = "date";
dateInput.name = "date";
dateInput.type = "date";
dateInput.required = true;
dateInput.classList.add("form-control");

$("#main").append(dateLabel);
$("#main").append(dateInput);

// create button
const startBtn = document.createElement("button");
startBtn.id = "startBtn";
startBtn.classList.add("btn", "btn-success");
startBtn.innerText = "Click me!";

$("#main").append(startBtn);

const forecastPara = document.createElement("p");
forecastPara.id = "forecastPara";
forecastPara.style.display = "none";

$("#startBtn").click(async () => {
  
  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
 }
  
  const geo = navigator.geolocation
  const myLoc = geo.getCurrentPosition(success)
  console.log("This is myLoc", myLoc)
  
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=1.2894&longitude=103.8500&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore";

  try {
    const result = await axios.get(url);
    console.log("This is get request result", result);
    const indexWanted = result.data.daily.time.indexOf(dateInput.value);
    console.log("This is indexWanted", indexWanted);
    const todayMax = result.data.daily.temperature_2m_max[indexWanted];
    const todayMin = result.data.daily.temperature_2m_min[indexWanted];

    forecastPara.innerText = `This is Singapore's max weather and min weather on ${dateInput.value}: ${todayMax} celsius, ${todayMin} celsius`;
    $("#main").append(forecastPara);
    $("#forecastPara").toggle();
  } catch (err) {
    console.log(err);
  }
});

// $("#subBugBtn").click( () => {
//   console.log("This is bug data",bugData)
// try {
//   const result = await axios.post("/", bugData);
//   console.log("This is post request result", result);
//   window.location = "/";
// } catch (err) {
//   console.log(err);
// }
// });

// docs api
// const url =  `"https://www.metaweather.com/api/location/${woeID}/${wantedDate}`
// ra api
// const url =  `"https://www.metaweather-with-cors.now.sh/api/location/${woeID}/${wantedDate}`
