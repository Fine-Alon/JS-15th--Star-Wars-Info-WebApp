const starWarsURL = 'https://swapi.dev/api/';

const imgArrSW = [
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Phantom-Menace-I-Poster_3c1ff9eb.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Attack-Clones-II-Poster_53baa2e7.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Revenge-Sith-III-Poster_646108ce.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/avco_payoff_1-sht_v7_lg_32e68793.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/5adfd0618fdfb900016b5ca6-image_64bc2f8e.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/sb_teaser2_1-sht_v3a_online_lg_86f89198.jpeg',
];

// getEpisodesArr: () => {
const SWApi = (endPoint) => {

  return fetch(`${starWarsURL}${endPoint}`)
    .then(res => res.json())
    .then(res => res.results);
};

export { SWApi, starWarsURL, imgArrSW };
