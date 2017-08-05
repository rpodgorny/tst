//ph: dělal bych to tady jinak viz. server.js
const configMap = CONFIG_MAP; // eslint-disable-line no-undef

const config = {
  placesUrl: configMap.placesUrl
};

//ph: Tahle část stavu aplikace zcela nedává smysl. Nedá se změnit, tím pádem patří někam do konfigurace a na místech kde si využívá se dá improtovat.
export default function reducer(state = config) {
  return state;
}
