const configMap = CONFIG_MAP; // eslint-disable-line no-undef

const config = {
  placesUrl: configMap.placesUrl
};

export default function reducer(state = config) {
  return state;
}
