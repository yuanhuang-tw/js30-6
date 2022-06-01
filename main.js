const search = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
let cities;

axios
  .get('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json')
  .then((res) => cities = res.data)
  .catch((err) => console.log(err));

search.addEventListener('keyup', output);

function output(e) {
  let input = e.target.value.toLowerCase();

  const matchCities = cities.filter((place) => {
    return place.city.toLowerCase().includes(input)
      || place.state.toLowerCase().includes(input);
  });

  suggestions.innerHTML = matchCities.reduce((acc, place) => {
    const cityIndexOf = place.city.toLowerCase().indexOf(input);
    const stateIndexOf = place.state.toLowerCase().indexOf(input);
    let cityName;
    let stateName;

    if (cityIndexOf > -1) {
      let matchString = place.city.substr(cityIndexOf, input.length);

      const regex = new RegExp(matchString);
      cityName = place.city.replace(regex, `<span class="hl">${matchString}</span>`);
    } else {
      cityName = place.city;
    }

    if (stateIndexOf > -1) {
      let matchString = place.state.substr(stateIndexOf, input.length);

      const regex = new RegExp(matchString);
      stateName = place.state.replace(regex, `<span class="hl">${matchString}</span>`);
    } else {
      stateName = place.state;
    }

    return acc += `<li>${cityName}, ${stateName} / ${(place.population)}</li>`;
  }, '');
}