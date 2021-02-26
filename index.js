const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')
const cities = [];

fetch(endpoint)
    .then(data => 
        data.json()
    )
    .then( data => 
        cities.push(...data) )
    .catch(e => {
        console.log(e.message)
    })


function findMatches(wordToMatch, citiesArray) {
    return cities.filter( place => {
        // need RegeExp instance to use variables
        const regex = new RegExp(wordToMatch, 'gi');
        // if regex match a city or state name reurn it
        return place.city.match(regex) || place.state.match(regex);
    })
}

function displayMatches(){
    // get the matches for current input, this.value is the search query
    const matchesArray = findMatches(this.value, cities);
    html = matchesArray.map(place => {

        // highlight the search term in the results by replacing the match with styled span
        const regex = new RegExp(this.value, 'gi')
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)

        // return template with data inserted
        return `
        <li>
            <span className="name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `
    }).join("")
    // insert template items in to suggestoin
    return suggestions.innerHTML = html
}
// add commas to numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// 
searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)
