import './css/styles.css';
import Notiflix from 'notiflix';
import mainCard from './templates/main-card.hbs'
import smallCard from './templates/small-card.hbs'
import { fetchCountries } from './fetchCountries'
import debounce from 'lodash.debounce';

const inputEl = document.querySelector('#search-box')
const ulEl = document.querySelector('.country-list')
const infoDivEl = document.querySelector('.country-info')
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY))

Notiflix.Notify.init({
    position: 'center-top',
    width: '400px',
    fontSize: '18px',
});

let searchValue = ''

function onInputChange(e) {
    searchValue = e.target.value.trim();

    clearInput()
    setCountries(searchValue)

    function setCountries(searchValue) {
        fetchCountries(searchValue)
            .then(data => {
                const amount = data.length
                console.log(data);

                if (amount > 10) {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
                    return
                }

                if (amount >= 2 && amount <= 10) {
                    renderCountriesMarkup(data)
                } else {
                    renderCountriesInfoMarkup(data)
                }
            })
            .catch(onFetchError);
    }
}

function renderCountriesMarkup(data) {
    ulEl.insertAdjacentHTML('beforeend', smallCard(data));
}

function renderCountriesInfoMarkup(data) {
    infoDivEl.insertAdjacentHTML('beforeend', mainCard(data));
}

function onFetchError(error) {
    if (searchValue !== '') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
    }
}

function clearInput() {
    ulEl.innerHTML = '';
    infoDivEl.innerHTML = '';
}