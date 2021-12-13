// create and append date input
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

// create and append button
const startBtn = document.createElement("button");
startBtn.id = "startBtn";
startBtn.classList.add("btn", "btn-success");
startBtn.innerText = "Click me!";

$("#main").append(startBtn);

// para to display when click on button
const forecastPara = document.createElement("p");
forecastPara.id = "forecastPara";

// get browser location using geolocation
// reference for these functions from: https://www.w3schools.com/html/html5_geolocation.asp
const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosn);
  } else {
    console.log("Eh... this ain't working dude...");
  }
};
const showPosn = async (posn) => {
  const latitude = await posn.coords.latitude;
  const longitude = await posn.coords.longitude;

// this first try block is to get hold the text adress using positionstack.com api, using  longitude, latitude obtained from geolocation above 
// positionstack.com api key: ca64bc5703a7d3e2e1506eafd18a45b4
  try {
    const locUrl = `http://api.positionstack.com/v1/reverse?access_key=ca64bc5703a7d3e2e1506eafd18a45b4&query=${latitude},${longitude}&limit=1&output=json`;
    const result = await axios.get(locUrl);
    console.log("This is location result", result);
    const region = result.data.data[0].region;
    // this nested try block is to use obtained latitude, longitude and region to get  weather from open-meteo and output forecastPara on the webpage
    try {
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FSingapore`;

      const result = await axios.get(weatherUrl);
      console.log("This is get request result", result);
      
      const indexWanted = result.data.daily.time.indexOf(dateInput.value);
      const todayMax = result.data.daily.temperature_2m_max[indexWanted];
      const todayMin = result.data.daily.temperature_2m_min[indexWanted];

      forecastPara.innerHTML = `${region}'s weather on ${dateInput.value}:<br> max temp -> ${todayMax} celsius <br> min temp -> ${todayMin} celsius`;
      $("#main").append(forecastPara);
      $("#forecastPara").toggle();
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

// button click functionality
$("#startBtn").click(async () => {
  // have to set para holding results display to none within button click func for toggle to work properly
  forecastPara.style.display = "none";
  // getLocation() calls showPosn() which does actual heavy lifting of calling apis and outputting content onto webpage
  getLocation();
});
