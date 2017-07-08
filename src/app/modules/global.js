const LOADING = 'places/global/LOADING';
const ERROR = 'places/global/ERROR';
const SUCCESS = 'places/global/SUCCESS';

export const types = { LOADING, ERROR, SUCCESS };

export default function(state = { loading: false, error: false }, action) {
  switch (action.type) {
  case LOADING:
    return { loading: true, error: false };
  case ERROR:
    return { loading: false, error: true };
  case SUCCESS:
    return { loading: false, error: false };
  default:
    return state;
  }
}
