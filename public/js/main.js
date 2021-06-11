const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");
const dataHide = document.querySelector(".middle_layer");
const day = document.getElementById("day");
const date = document.getElementById("date");

const getInfo = async (event) => {
    event.preventDefault();
    let cityValue = cityName.value;
    if (cityValue === "") {
        city_name.innerText = "Cannot search empty place";
        dataHide.classList.add("data_hide");
    }
    else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&APPID=acc980e9e105c03a28c9399e6423ae8a`;
            const result = await fetch(url);
            const data = await result.json();
            const arrData = [data];
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempStatus = arrData[0].weather[0].main;

            if (tempStatus == "Sunny") {
                temp_status.innerHTML = '<i class="fas fa-sun" style="color: #eccc68;"></i>';
            }
            else if (tempStatus == "Clouds") {
                temp_status.innerHTML = '<i class="fas fa-cloud" style="color: #f1f2f6;"></i>';
            }
            else if (tempStatus == "Rainy") {
                temp_status.innerHTML = '<i class="fas fa-cloud-rain" style="color: #a4bobe;"></i>';
            }
            else if (tempStatus == "Clear") {
                temp_status.innerHTML = '<i class="fas fa-sun" style="color: #eccc68;"></i>';
            }
            else {
                temp_status.innerHTML = '<i class="fas fa-sun" style="color: #eccc68;"></i>';
            }

            dataHide.classList.remove("data_hide");
        }
        catch (error) {
            city_name.innerText = "Please enter a valid place";
            dataHide.classList.add("data_hide");
            console.log(error);
        }
    }
};

const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let currTime = new Date();
    let days = weekday[currTime.getDay()];
    day.innerText = days;
}
const getCurrTime = () => {
    var months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    var now = new Date();
    var month = months[now.getMonth()];
    var dates = now.getDate();
    date.innerText = `${dates} ${month} `;
}
getCurrTime();
getCurrentDay();

submitBtn.addEventListener("click", getInfo);