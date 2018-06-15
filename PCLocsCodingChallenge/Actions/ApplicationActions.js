import Types from './Types';

export function setErrorState(isError) {
  return { type: Types.set_error, payload: isError };
}
