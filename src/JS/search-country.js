import createCountryList from '../templates/country-list.hbs';
import createResultList from '../templates/result-list.hbs';
import { error } from '@pnotify/core';
var debounce = require('lodash.debounce');

const countryInputRef = document.querySelector('.search-form__input');
const resultRef = document.querySelector('.result');
const countryAPItoFetch = 'https://restcountries.eu/rest/v2/name/';
const fullName = '?fullText=true';
let countryNameAPItoFetch;

function getRestData(countryName, full = false) {
  resultRef.textContent = 'SEARCHING...  ' + countryName;
  resultRef.classList.add('anim');
  countryNameAPItoFetch = full
    ? countryAPItoFetch + countryName + fullName
    : countryAPItoFetch + countryName;
  return fetch(countryNameAPItoFetch, {
    headers: {
      Accept: 'application/json',
    },
  }).then(response => {
    if (response.ok || response.status === 404) return response.json();
    throw new Error('Error fetching data');
  });
}

function createData(event) {
  removeError();
  const countryName = event.target.value.trim();
  if (countryName.length === 0) return clearResult();
  fetchData(countryName);
}

function operateData(data) {
  clearResult();
  if (data.message) return pushError(data.message);
  if (data.length > 10)
    return pushError('To many matches found. Please enter more specific query');
  if (data.length === 1) return (resultRef.innerHTML = createResultList(data));
  if (data.length > 1) enableResultListListner(data);
}

function clearResult() {
  resultRef.innerHTML = '';
  resultRef.classList.remove('anim');
  removeError();
}

function removeError() {
  const errorRef = document.querySelector('.error');
  if (errorRef) errorRef.remove();
}

function pushError(err = 'Error') {
  error({
    text: `${err}`,
  });
}

function enableResultListListner(data) {
  resultRef.innerHTML = createCountryList(data);
  const listRef = document.querySelector('.country-list');
  listRef.addEventListener('click', resultListenToFetch, { once: true });
}

function resultListenToFetch(event) {
  countryInputRef.value = event.target.textContent;
  fetchData(countryInputRef.value, true);
}

function fetchData(countryName, atOnce = false) {
  return getRestData(countryName, atOnce)
    .then(operateData)
    .catch(err => {
      error({
        text: `${err}`,
        type: 'error',
      });
    });
}

countryInputRef.addEventListener('input', debounce(createData, 500));