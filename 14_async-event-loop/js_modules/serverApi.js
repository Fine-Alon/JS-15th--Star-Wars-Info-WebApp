const starWarsURL = 'https://swapi.dev/api/';

const imgArrSW = [
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-New-Hope-IV-Poster_c217085b.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Empire-Strikes-Back-V-Poster_878f7fce.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Return-Jedi-VI-Poster_a10501d2.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Phantom-Menace-I-Poster_3c1ff9eb.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Attack-Clones-II-Poster_53baa2e7.jpeg',
  'https://lumiere-a.akamaihd.net/v1/images/Star-Wars-Revenge-Sith-III-Poster_646108ce.jpeg',
];

const SWApi = (endPoint) => {

  const lastCh = endPoint.slice(-1);

  if (!isNaN(lastCh)) {
    return fetch(`${starWarsURL}${endPoint}`)
      .then(res => res.json());

  } else {
    return fetch(`${starWarsURL}${endPoint}`)
      .then(res => res.json())
      .then(res => res.results);
  }
};

export { SWApi, starWarsURL, imgArrSW };
