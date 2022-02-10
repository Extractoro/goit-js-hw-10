const BASIC_URL = 'https://restcountries.com/v3.1/name'
export function fetchCountries(name) {
    const url = `${BASIC_URL}/${name}?fields=name,capital,population,languages,flags`
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            return data;
        });
}