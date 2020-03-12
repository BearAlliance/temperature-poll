const request = require('request-promise');

const hudsonCoordinates = {
  lat: '42.24964',
  long: '-73.789605'
};

function getForecast(lat, long) {
  return request
    .get(`https://api.weather.gov/points/${lat},${long}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15'
      },
      json: true
    })
    .then(res => res.properties.forecastHourly)
    .then(forecastUrl =>
      request.get(forecastUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Safari/605.1.15'
        },
        json: true
      })
    )
    .then(res => {
      return res.properties.periods[0].temperature;
    });
}

setInterval(
  () =>
    getForecast(hudsonCoordinates.lat, hudsonCoordinates.long).then(temp =>
      console.log(temp)
    ),
  5000
);
