const BASE = "https://restcountries.com/v3.1";
const FIELDS = "name,flags,capital,region,population,languages,currencies";

export const getAllCountries = () =>
  fetch(`${BASE}/all?fields=${FIELDS}`).then(res => res.json());

export const getCountryByName = (name) =>
  fetch(`${BASE}/name/${name}?fields=${FIELDS}`).then(res => res.json());

export const getByCurrency = (currency) =>
  fetch(`${BASE}/currency/${currency}?fields=${FIELDS}`).then(res => res.json());
