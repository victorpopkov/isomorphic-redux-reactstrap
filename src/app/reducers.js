import { fromJS } from 'immutable';
import event from './event/reducers'; // eslint-disable-line sort-imports
import markdown from './markdown/duck/reducers';

const entities = (state = fromJS({}), action) => {
  if (action.result && action.result.entities) {
    return state.mergeDeep(action.result.entities);
  }

  return state;
};

export { entities, event, markdown };
