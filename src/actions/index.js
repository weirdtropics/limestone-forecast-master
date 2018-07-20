import fetch from 'isomorphic-fetch';
import { isUndefined } from 'lodash';


const receiveAPI = ({ endpoint, city, lat, lon, action }) => {
  console.log(`${endpoint} fetch made`);
  const cityZip = parseInt(city) ? `zip=${parseInt(city)}` : `q=${city}`; // eslint-disable-line
  return dispatch =>
    fetch(`http://api.openweathermap.org/data/2.5/${endpoint}?${!isUndefined(city) ? (cityZip) : ''}${!isUndefined(lat) ? ('lat=' + lat + '&lon=' + lon) : ''}&units=metric&APPID=bd5e378503939ddaee76f12ad7a97608`) // eslint-disable-line
    .then(response => response.json())
    .then(
      json => dispatch({ type: action, json }),
      err => dispatch({ type: `${action}_ERROR`, err }),
    );
};

export const fetchForecast = ({ lat, lon, city }) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING' });
    return Promise.all([
      dispatch(receiveAPI({ lat, lon, city, endpoint: 'weather', action: 'RECEIVE_WEATHER' })),
      dispatch(receiveAPI({ lat, lon, city, endpoint: 'forecast', action: 'RECEIVE_FORECAST' })),
      dispatch(receiveAPI({ lat, lon, city, endpoint: 'forecast/daily', action: 'RECEIVE_DAILY' })),
    ])
    .catch(error => (dispatch({ type: 'ERROR', error })));
  };
};

export const pinCity = (city) => {
  return {
    type: 'PIN_CITY',
    city,
  };
};

export const removeCity = (city) => {
  return {
    type: 'REMOVE_CITY',
    city,
  };
};

export const loadingAction = () => {
  return {
    type: 'LOADING',
  };
};
