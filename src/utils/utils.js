import { countries } from './countries-data';
import { baseUrl } from './url';

export const getAfricanCountries = () => {
    const africanCountries = countries.map(country => ({...country, Country_Name: country.country, Country_Code: country.country_code}));
    return africanCountries;
}

export const debounce = (callback, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => callback(...args), delay);
    }
}

export const getCodeByIp = async () => {
    //https://ipstack.com/dashboard for viewing dashboard
    const key = process.env.REACT_APP_IPSTACK_KEY
    let countryCode = '';
    await fetch(`https://api.ipstack.com/check?access_key=${key}`)
      .then((response) => response.json())
      .then((responseJSON) => {
        const { country_code } = responseJSON;
        countryCode = country_code
      });
     return countryCode;
}

export const generateCommoditiesUrl = ({export_code, import_code, category, order, sortBy, max, min }) => {
    let sortValue = "";
    switch (sortBy) {
      case "Commodities":
        sortValue = "commodity";
        break;
      case "Current Trade Value":
        sortValue = "export_value";
        break;
      default:
        return sortValue;
    }

    let qs = [];
    if (category) qs[qs.length] = `&category=${category}`;
    if (order) qs[qs.length] = `&order=${order}`;
    if (sortBy) qs[qs.length] = `&sort_by=${sortValue}`;
    if (max || min) qs[qs.length] = `&min=${min}&max=${max}`;

    const url = `${baseUrl}/trade/commodities?export_code=${export_code}&import_code=${import_code}${qs.join(
      ""
    )}`;

    return url;
  };


export const formatCategories = (arr) => {
  let categories = [];
  arr.forEach((item) => {
    const { category, size } = item;
    categories = [...categories, { name: category, size }];
  });

  return categories;
};

export const isValidEmail = email => {
  // eslint-disable-next-line
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  )
}

export const getFlag = (code) => {
  // `https://lipis.github.io/flag-icon-css/flags/4x3/${import_code}.svg`
  return `https://flagcdn.com/w160/${code}.png`
}