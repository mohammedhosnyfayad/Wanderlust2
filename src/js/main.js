let global = document.querySelector(".dropdown-menu");
let destination = document.querySelector("#selected-destination");
let select = document.querySelector("#global-country");
let city = document.querySelector("#global-city");
let btn_exp = document.querySelector("#global-search-btn");
let global_year = document.querySelector("#global-year");
let banner = document.querySelector(".banner");
let toptext = document.querySelector(".view-header-selection");
let topWeekend = document.querySelector(".view-header-Weekend");
let holidaysContent = document.querySelector(".holidays-content");
let plansContent = document.querySelector("#plans-content");
let lwContent = document.querySelector("#lw-content");
let eventsContent = document.querySelector("#events-content");
let headernEvents = document.querySelector(".view-headernEvents");
let viewHeader = document.querySelector(".view_EVENTS");
let detailinfoweather = document.querySelector(".weather-details-grid");
let hourly = document.querySelector(".hourly-item");
let forecastList = document.querySelector(".forecast-list");
let convertBtn = document.querySelector("#convert-btn");
let currencyfrom = document.querySelector("#currency-from");
let currencyto = document.querySelector("#currency-to");
let currencyamount = document.querySelector("#currency-amount");
let currencyresult = document.querySelector("#currency-result");
let currencySwap = document.querySelector(".currency-swap-btn");
let popularCurrencies = document.querySelector("#popular-currencies");
let sundawn = document.querySelector(".dawn");
let cardsunrise = document.querySelector(".cardsunrise");
let noon = document.querySelector(".noon");
let sunsetElement = document.querySelector(".card_sunset");
let dusk = document.querySelector(".dusk");
let daylight = document.querySelector(".daylight");
let navItem = document.querySelectorAll(".nav-item");
let section = document.querySelectorAll(".section");
let das = document.querySelector("#dashboard-view");

console.log(section);

navItem.forEach((element) => {
  element.addEventListener("click", function (e) {
    e.preventDefault();

    // Active للـ Nav
    navItem.forEach((item) => {
      item.classList.remove("active");
    });

    e.currentTarget.classList.add("active");

    // إظهار وإخفاء الـ Sections
    let attsec = e.currentTarget.getAttribute("data-view");

    section.forEach((sectionFor) => {
      sectionFor.classList.add("view");

      if (attsec === sectionFor.getAttribute("data-view")) {
        sectionFor.classList.remove("view");
      }
    });
  });
});
console.log(noon);

let info = document.querySelector(".dashboard-country-info");
let Capital = "";
async function alldata() {
  try {
    let data = await fetch("https://date.nager.at/api/v3/AvailableCountries");

    let bigdata = await data.json();
    datatwo(bigdata);
    datathree(bigdata);
  } catch (error) {
    console.log(error);
  }
}
let lat = "";
let lng = "";

let text = "";
alldata();
let imgtwo = "";
let countryCodegoloblalelement = "";
function datatwo(bigdata) {
  let box = "";

  for (let i = 0; i < bigdata.length; i++) {
    let countryCode = bigdata[i].countryCode.toLowerCase();
    let dataimg = `https://flagcdn.com/w20/${countryCode}.png`;

    box += `                  
                 <li class="test" data-value="${bigdata[i].name} "><img data-value="" id="${bigdata[i].countryCode}" src="${dataimg}" alt="Egypt"> ${bigdata[i].name} <span>${bigdata[i].countryCode}</span></li>
    
`;
  }
  global.innerHTML = box;

  const dropdown1 = document.getElementById("countryDropdown");
  const selectedText1 = dropdown1.querySelector(".selected-text");
  const menuItems1 = dropdown1.querySelectorAll(".dropdown-menu li");
  const menuItems_img = dropdown1.querySelectorAll(".dropdown-menu li");
  let valuecapt = "";
  menuItems1.forEach((item) => {
    item.addEventListener("click", () => {
      selectedText1.textContent = item.getAttribute("data-value");

      selectedText1.classList.remove("disabledAdd");
      dropdown1.classList.remove("open");
      const img = item.closest("li").querySelector("img").src;
      countryCodegoloblalelement = item.closest("li").querySelector("img").id;
      console.log(countryCodegoloblalelement);
      imgtwo = img;
      text = item.closest("li").querySelector("span").textContent;

      fetch(
        `https://api.restcountries.com/countries/v5?q=${selectedText1.textContent}`,
        {
          headers: {
            Authorization: "Bearer rc_live_020a4fd67efa4cffb7bbc9427f42eb61",
          },
        },
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data1) {
          console.log(data1.data.objects[0].capitals[0].coordinates.lat);
          lat = data1.data.objects[0].capitals[0].coordinates.lat;
          lng = data1.data.objects[0].capitals[0].coordinates.lng;
          info.innerHTML = `
            
                        <div class="dashboard-country-header">
                <img src="${img}" alt="Egypt" class="dashboard-country-flag">
                <div class="dashboard-country-title">
                  <h3>${selectedText1.textContent}</h3>
                  <p class="official-name">${data1.data.objects[0].names.official}</p>
                  <span class="region"><i class="fa-solid fa-location-dot"></i> ${data1.data.objects[0].region} • ${data1.data.objects[0].subregion}</span>
                </div>
              </div>

              <div class="dashboard-local-time">
                <div class="local-time-display">
                  <i class="fa-solid fa-clock"></i>
                  <span class="local-time-value" id="country-local-time">08:30:45 AM</span>
                  <span class="local-time-zone">${data1.data.objects[0].timezones[0]}</span>
                </div>
              </div>

              <div class="dashboard-country-grid">
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-building-columns"></i>
                  <span class="label">Capital</span>
                  <span class="value">${data1.data.objects[0].capitals[0].name}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-users"></i>
                  <span class="label">Population</span>
                  <span class="value">${data1.data.objects[0].population.toLocaleString()}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-ruler-combined"></i>
                  <span class="label">Area</span>
                  <span class="value">${data1.data.objects[0].area.kilometers.toLocaleString()} km²</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-globe"></i>
                  <span class="label">Continent</span>
                  <span class="value">${data1.data.objects[0].continents}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-phone"></i>
                  <span class="label">Calling Code</span>
                  <span class="value">${data1.data.objects[0].calling_codes}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-car"></i>
                  <span class="label">Driving Side</span>
                  <span class="value">${data1.data.objects[0].cars.driving_side}</span>
                </div>
                <div class="dashboard-country-detail">
                  <i class="fa-solid fa-calendar-week"></i>
                  <span class="label">Week Starts</span>
                  <span class="value">${data1.data.objects[0].date.start_of_week}</span>
                </div>
              </div>

              <div class="dashboard-country-extras">
                <div class="dashboard-country-extra">
                  <h4><i class="fa-solid fa-coins"></i> Currency</h4>
                  <div class="extra-tags">
                    <span class="extra-tag">${data1.data.objects[0].currencies[0].name} (${data1.data.objects[0].currencies[0].code} ${data1.data.objects[0].currencies[0].symbol})</span>
                  </div>
                </div>
                <div class="dashboard-country-extra">
                  <h4><i class="fa-solid fa-language"></i> Languages</h4>
                  <div class="extra-tags">
                    <span class="extra-tag">${data1.data.objects[0].languages[0].name}</span>
                  </div>
                </div>
                <div class="dashboard-country-extra">
                  <h4><i class="fa-solid fa-map-location-dot"></i> Neighbors</h4>
                  <div class="extra-tags tags-span">
                     
                  </div>
                </div>
              </div>

              <div class="dashboard-country-actions">
                <a href="${data1.data.objects[0].links.google_maps}" target="_blank" class="btn-map-link">
                  <i class="fa-solid fa-map"></i> View on Google Maps
                </a>
              </div>

          `;
          let extraTags = document.querySelector(".tags-span");

          extraTags.innerHTML += `
          
          <span class="extra-tag border-tag">${data1.data.objects[0].borders}</span>
          
          `;

          let datarand = data1.data.objects;
          Capital = data1.data.objects[0].capitals[0].name;
          city.innerHTML = `
            
<option value="Cairo" selected>${data1.data.objects[0].capitals[0].name}</option>
          `;

          destination.innerHTML = `
                     <div class="selected-flag">
                  <img id="selected-country-flag" src="${img}" alt="Egypt">
                </div>
                <div class="selected-info">
                  <span class="selected-country-name" id="selected-country-name">${selectedText1.textContent}</span>
                  <span class="selected-city-name" id="selected-city-name">${datarand[0].capitals[0].name}</span>
                </div>
                <button class="clear-selection-btn" id="clear-selection-btn">
                  <i class="fa-solid fa-xmark"></i>
                </button> 
      `;
        });
    });
  });
}

const selectedTextTwo = document.querySelector(".selected-text");
let savedFavorites = JSON.parse(localStorage.getItem("element") || "[]");

savedFavorites.forEach((item) => {
  plansContent.innerHTML += `
    <div data-id="${item.id}" class="holiday-card">
      <div class="badge">Holiday</div>

      <h2 class="card-title">${item.localName}</h2>

      <div class="info-row">
        <span class="icon icon-calendar"></span>
        <span>${item.date}</span>
      </div>

      <div class="info-row">
        <span class="icon icon-info"></span>
        <span>${item.name}</span>
      </div>

      <button class="remove-btn">
        <span class="icon-trash">&#128465;</span>
        Remove
      </button>
    </div>
  `;
});
function datathree(bigdata) {
  let favorites = JSON.parse(localStorage.getItem("element") || "[]");

  btn_exp.addEventListener("click", function () {
    async function dataHolidays() {
      if (selectedTextTwo.innerHTML === "select Country") {
        banner.classList.remove("right");
        setTimeout(() => {
          banner.classList.add("right");
        }, 4000);
      } else {
        try {
          let data = await fetch(
            `https://date.nager.at/api/v3/PublicHolidays/${global_year.value}/${text}`,
          );

          let bigdataHolidays = await data.json();

          toptext.innerHTML = `
                        <div class="current-selection-badge">
                <img src="${imgtwo}" alt="Egypt" class="selection-flag">
                <span>${selectedTextTwo.innerHTML}</span>
                <span class="selection-year">${global_year.value}</span>
              </div>

          `;
          let boxHolidays = "";
          for (let x = 0; x < bigdataHolidays.length; x++) {
            const d = new Date(bigdataHolidays[x].date);
            let elementx = x;
            let datelong = d.toLocaleString("en-US", { month: "long" });
            let idunm =
              bigdataHolidays[x].localName +
              bigdataHolidays[x].name +
              bigdataHolidays[x].date;
            bigdataHolidays[x].id = idunm;

            boxHolidays += `
                        <div data-index="${x}" class="holiday-card">
              <div class="holiday-card-header">
                <div class="holiday-date-box"><span class="day">${d.getDate()}</span><span class="month">${d.toLocaleString("en-US", { month: "short" })}</span></div>
                <button class="holiday-action-btnheart"><i class="fa-regular fa-heart"></i></button>
              </div>
              <h3>${bigdataHolidays[x].localName}</h3>
              <p class="holiday-name">${bigdataHolidays[x].name}</p>
              <div class="holiday-card-footer">
                <span class="holiday-day-badge"><i class="fa-regular fa-calendar"></i> ${d.toLocaleString("en-US", { weekday: "long" })}</span>
                <span class="holiday-type-badge">Public</span>
              </div>
            </div>

            
            `;

            holidaysContent.innerHTML = boxHolidays;
            let haret = document.querySelectorAll(".holiday-action-btnheart");
            haret.forEach((element) => {
              element.addEventListener("click", function () {
                let index =
                  element.parentElement.parentElement.getAttribute(
                    "data-index",
                  );
                let isExist = favorites.some((element) => {
                  return element.id === bigdataHolidays[index].id;
                });
                if (!isExist) {
                  favorites.push(bigdataHolidays[index]);
                } else {
                  return false;
                }

                localStorage.setItem("element", JSON.stringify(favorites));

                let elementbig = element.parentElement.parentElement;
                let elementbigcloset =
                  elementbig.querySelector(".holiday-name");

                plansContent.innerHTML += `
                            <div data-id="${bigdataHolidays[index].id}" class="holiday-card">
              <div class="badge">Holiday</div>

              <h2 class="card-title">${bigdataHolidays[index].localName}</h2>

              <div class="info-row">
                <span class="icon icon-calendar"></span>
                <span>${bigdataHolidays[index].date}</span>
              </div>

              <div class="info-row">
                <span class="icon icon-info"></span>
                <span>${bigdataHolidays[index].name}</span>
              </div>

              <button class="remove-btn">
                <span class="icon-trash">&#128465;</span>
                Remove
              </button>
            </div>

                
                `;
              });
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto`,
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (meteo) {
        console.log(meteo);
        detailinfoweather.innerHTML = `
                      <div class="weather-detail-card">
                <div class="detail-icon humidity"><i class="fa-solid fa-droplet"></i></div>
                <div class="detail-info">
                   <span class="detail-label">Humidity</span>
                  <span class="detail-value">${meteo.current.relative_humidity_2m}%</span> 
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon wind"><i class="fa-solid fa-wind"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Wind</span>
                  <span class="detail-value">${meteo.current.wind_speed_10m} km/h</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon uv"><i class="fa-solid fa-sun"></i></div>
                <div class="detail-info">
                  <span class="detail-label">UV Index</span>
                  <span class="detail-value">${meteo.daily.uv_index_max[0]}</span>
                </div>
              </div>
              <div class="weather-detail-card">
                <div class="detail-icon precip"><i class="fa-solid fa-cloud-rain"></i></div>
                <div class="detail-info">
                  <span class="detail-label">Precipitation</span>
                  <span class="detail-value">${meteo.daily.precipitation_probability_max[0]}%</span>
                </div>
              </div>

        
        `;
        meteo.hourly.time.forEach((time, index) => {
          let hour = new Date(time).toLocaleTimeString("en-US", {
            hour: "numeric",
            hour12: true,
          });

          hourly.innerHTML += `
      <div class="hourly-card d-flex">
          <span class="hourly-time">${hour}</span>

          <div class="hourly-icon">
              <i class="fa-solid fa-sun"></i>
          </div>

          <span class="hourly-temp">
              ${Math.round(meteo.hourly.temperature_2m[index])}°
          </span>

          <span class="hourly-rain">
              ${meteo.hourly.precipitation_probability[index]}%
          </span>
      </div>
  `;
        });

        meteo.daily.time.forEach((date, index) => {
          let day = new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
          });

          forecastList.innerHTML += `
      <div class="forecast-card">

          <span class="forecast-day">${day}</span>

          <div class="forecast-icon">
              <i class="fa-solid fa-sun"></i>
          </div>

          <span class="forecast-temp">
              ${Math.round(meteo.daily.temperature_2m_max[index])}°
          </span>

          <span class="forecast-min">
              ${Math.round(meteo.daily.temperature_2m_min[index])}°
          </span>

      </div>
  `;
        });
      });

    dataHolidays();
    const selectedText3 = dropdown.querySelector(".selected-text");

    fetch(
      `https://date.nager.at/api/v3/LongWeekend/${global_year.value}/${countryCodegoloblalelement}`,
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (LongWeekend) {
        lwContent.innerHTML = "";
        LongWeekend.forEach((element, index) => {
          console.log(LongWeekend.length);

          lwContent.innerHTML += `
                      <div class="lw-card">
              <div class="lw-card-header">
                <span class="lw-badge"><i class="fa-solid fa-calendar-days"></i> ${element.dayCount} Days</span>
                <button class="holiday-action-btn"><i class="fa-regular fa-heart"></i></button>
              </div>
              <h3>Long Weekend #${index + 1}</h3>
              <div class="lw-dates"><i class="fa-regular fa-calendar"></i> ${element.startDate} - ${element.endDate} </div>
              <div class="">${
                element.needBridgeDay
                  ? `<p class="lw-info-box warning"> <i class="fa-solid fa-triangle-exclamation"></i>
 Requires taking a bridge day off</p>`
                  : `<p class="lw-info-box success"><i class="fa-solid fa-check-circle"></i> No extra days off needed!</p>`
              }</div>
              <div class="lw-days-visual">
                <div class="lw-day"><span class="name">Thu</span><span class="num">1</span></div>
                <div class="lw-day weekend"><span class="name">Fri</span><span class="num">2</span></div>
                <div class="lw-day weekend"><span class="name">Sat</span><span class="num">3</span></div>
                <div class="lw-day weekend"><span class="name">Sun</span><span class="num">4</span></div>
              </div>
            </div>

          `;
          topWeekend.innerHTML = `
                        <div class="current-selection-badge">
                <img src="${imgtwo}" alt="Egypt" class="selection-flag">
                <span>${selectedText3.textContent}</span>
                <span class="selection-year">${global_year.value}</span>
              </div>

          
          `;
        });
      });

    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=lfDmb6Zvrhb5sbnmHwW2wiHdV2zFtcTc&city=${Capital}&${countryCodegoloblalelement}=US&size=20`,
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (dataevent) {
        viewHeader.innerHTML = `
                      <h2>Events Explorer</h2>

                      <p>Discover concerts, sports, theatre and more in ${selectedText3.textContent}</p>

        `;
        headernEvents.innerHTML = `
                      <div class="current-selection-badge">
                <img src="${imgtwo}" alt="Egypt" class="selection-flag">
                <span>${selectedText3.textContent}</span>
                <span class="selection-city">${global_year.value}</span>
              </div>

        
        `;
        eventsContent.innerHTML = "";
        if (dataevent._embedded === undefined) {
          console.log("noevent");
          eventsContent.innerHTML = `
            <div class="NoCity">
                          <h3>No City Selected</h3>
              <p>Select a country and city from the dashboard to discover events</p>

            
            </div>
          `;
        } else {
          dataevent._embedded.events.forEach((element) => {
            console.log(element);

            eventsContent.innerHTML += `
                        <div class="event-card">
              <div class="event-card-image">
                <img src="${element.images[0].url}"
                  alt="Symphony">
                <span class="event-card-category">${element.classifications[0].segment.name}</span>
                <button class="event-card-save"><i class="fa-regular fa-heart"></i></button>
              </div>
              <div class="event-card-body">
                <h3>${element.name}</h3>
                <div class="event-card-info">
                  <div><i class="fa-regular fa-calendar"></i>${element.dates.start.localDate} at ${element.dates.start.localTime}</div>
                  <div><i class="fa-solid fa-location-dot"></i>${element._embedded.venues[0].name ? element._embedded.venues[0].name : "TBA, Berlin"}</div>
                </div>
                <div class="event-card-footer">
                  <button class="btn-event"><i class="fa-regular fa-heart"></i> Save</button>
                  <a href="${element.url}" class="btn-buy-ticket"><i class="fa-solid fa-ticket"></i> Buy Tickets</a>
                </div>
              </div>
            </div>

            
            `;
          });
        }
      });
    plansContent.addEventListener("click", function (e) {
      if (e.target.closest(".remove-btn")) {
        let card = e.target.closest(".holiday-card");
        let id = card.getAttribute("data-id");
        console.log(card);

        favorites = favorites.filter((element) => {
          return element.id !== id;
        });

        localStorage.setItem("element", JSON.stringify(favorites));

        card.remove();
      }
    });
    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const date = `${global_year.value}-${month}-${day}`;

    console.log(date);

    fetch(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}&formatted=0`,
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (sunset) {
        console.log(sunset);
        const dawn = new Date(sunset.results.civil_twilight_begin);

        const dawnTime = dawn.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        console.log(dawnTime);

        sundawn.innerHTML = `
                          <div class="icon"><i class="fa-solid fa-moon"></i></div>
                  <div class="label">Dawn</div>
                 <div class="time">${dawnTime}</div>
                  <div class="sub-label">Civil Twilight</div>
        `;

        const sunrise = new Date(sunset.results.sunrise);

        const sunriseTime = sunrise.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        cardsunrise.innerHTML = `
  <div class="icon"><i class="fa-solid fa-sun"></i></div>
  <div class="label">Sunrise</div>
  <div class="time">${sunriseTime}</div>
  <div class="sub-label">Sun Rise</div>
`;

        const sunnoon = new Date(sunset.results.solar_noon);

        const noonTime = sunnoon.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        console.log(noonTime);

        noon.innerHTML = `
             <div class="icon"><i class="fa-solid fa-sun"></i></div>
                  <div class="label">Solar Noon</div>
                  <div class="time">${noonTime}</div>
                  <div class="sub-label">Sun at Highest</div>
`;

        const sunsetTimeDate = new Date(sunset.results.sunset);

        const sunsetTime = sunsetTimeDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        sunsetElement.innerHTML = `
  <div class="icon"><i class="fa-solid fa-moon"></i></div>
  <div class="label">Sunset</div>
  <div class="time">${sunsetTime}</div>
  <div class="sub-label">Sun Set</div>
`;

        const duskbig = new Date(sunset.results.civil_twilight_end);

        const duskTime = duskbig.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        dusk.innerHTML = `
  <div class="icon"><i class="fa-solid fa-moon"></i></div>
  <div class="label">Dusk</div>
  <div class="time">${duskTime}</div>
  <div class="sub-label">Civil Twilight</div>
`;

        const dayLength = sunset.results.day_length;

        const hours = Math.floor(dayLength / 3600);
        const minutes = Math.floor((dayLength % 3600) / 60);

        daylight.innerHTML = `
  <div class="icon"><i class="fa-solid fa-sun"></i></div>
  <div class="label">Daylight</div>
  <div class="time">${hours}h ${minutes}m</div>
  <div class="sub-label">Day Length</div>
`;
      });
  });
}

convertBtn.addEventListener("click", function () {
  // console.log(currencyfrom.value);
  let currencyfromvb = currencyfrom.value;
  let currencytovb = currencyto.value;
  let currencyamountbv = currencyamount.value;
  console.log(currencyfromvb);
  console.log(currencytovb);
  console.log(currencyamountbv);

  fetch(
    `https://v6.exchangerate-api.com/v6/72ac1a741f5b2fe03dbb1b15/pair/${currencyfromvb}/${currencytovb}/${currencyamountbv}`,
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (currency) {
      console.log(currency);
      currencyresult.innerHTML = `
                    <div class="conversion-display">
                <div class="conversion-from">
                  <span class="amount">${currencyamountbv}</span>
                  <span class="currency-code">${currencyfromvb}</span>
                </div>
                <div class="conversion-equals"><i class="fa-solid fa-equals"></i></div>
                <div class="conversion-to">
                  <span class="amount">${currency.conversion_result}</span>
                  <span class="currency-code">${currencytovb}</span>
                </div>
              </div>
              <div class="exchange-rate-info">
                <p>1 USD = ${currency.conversion_rate} EGP</p>
                <small>Last updated: January 25, 2026</small>
              </div>

      
      `;
    });
  fetch(
    `https://v6.exchangerate-api.com/v6/72ac1a741f5b2fe03dbb1b15/latest/${currencyfromvb}`,
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (exchangerate) {
      console.log(exchangerate.conversion_rates.EUR);
      popularCurrencies.innerHTML = `
      
                    <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/eu.png" alt="EUR" class="flag">
                <div class="info">
                  <div class="code">EUR</div>
                  <div class="name">Euro</div>
                </div>
                <div class="rate">${exchangerate.conversion_rates.EUR}</div>
              </div>
              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/gb.png" alt="GBP" class="flag">
                <div class="info">
                  <div class="code">GBP</div>
                  <div class="name">British Pound</div>
                </div>
                <div class="rate">${exchangerate.conversion_rates.GBP}</div>
              </div>
              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/eg.png" alt="EGP" class="flag">
                <div class="info">
                  <div class="code">EGP</div>
                  <div class="name">Egyptian Pound</div>
                </div>
                <div class="rate">${exchangerate.conversion_rates.EGP}</div>
              </div>
              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/ae.png" alt="AED" class="flag">
                <div class="info">
                  <div class="code">AED</div>
                  <div class="name">UAE Dirham</div>
                </div>
                <div class="rate">${exchangerate.conversion_rates.AED}</div>
              </div>
              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/sa.png" alt="SAR" class="flag">
                <div class="info">
                  <div class="code">SAR</div>
                  <div class="name">Saudi Riyal</div>
                </div>
                <div class="rate">${exchangerate.conversion_rates.SAR}</div>
              </div>
              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/jp.png" alt="JPY" class="flag">
                <div class="info">
                  <div class="code">JPY</div>
                  <div class="name">Japanese Yen</div>
                </div>
                <div class="rate">${exchangerate.conversion_rates.JPY}</div>
              </div>
              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/ca.png" alt="CAD" class="flag">
                <div class="info">
                  <div class="code">CAD</div>
                  <div class="name">Canadian Dollar</div>
                </div>
                <div class="rate">${exchangerate.conversion_rates.CAD}</div>
              </div>
              <div class="popular-currency-card">
                <img src="https://flagcdn.com/w40/in.png" alt="INR" class="flag">
                <div class="info">
                  <div class="code">INR</div>
                  <div class="name">Indian Rupee</div>
                </div>
                <div class="rate">${exchangerate.conversion_rates.INR}</div>
              </div>

      
      `;
    });
});

const dropdown = document.getElementById("countryDropdown");
const selected = dropdown.querySelector(".dropdown-selected");
const selectedText = dropdown.querySelector(".selected-text");
const menuItems = dropdown.querySelectorAll(".dropdown-menu li");

// فتح وإغلاق القائمة عند الضغط على الحقل
selected.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("open");
});

// تغيير النص عند اختيار دولة وإغلاق القائمة
menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    selectedText.textContent = item.getAttribute("data-value");
    dropdown.classList.remove("open");
  });
});

// إغلاق القائمة لو ضغطت في أي مكان بره الحقل
document.addEventListener("click", () => {
  dropdown.classList.remove("open");
});
