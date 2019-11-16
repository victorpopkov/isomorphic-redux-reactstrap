import { applyMiddleware, compose } from 'redux';
import { Iterable } from 'immutable';
import { createLogger } from 'redux-logger';
import { persistState } from 'redux-devtools';
import DevTools from '../app/common/dev-tools/DevTools'; // eslint-disable-line sort-imports

const devTools = (middlewares) => {
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
    stateTransformer: (state) => ((Iterable.isIterable(state)) ? state.toJS() : state),
  });

  middlewares.push(logger);

  return compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(), // DevTools
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  );
};

export default devTools;
