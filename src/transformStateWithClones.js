'use strict';

/**
 * @param {Object} newState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = {
    ...state,
  };
  const actionsResult = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
      actionsResult.push({ ...newState });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        newState = { ...newState };

        if (key in newState) {
          delete newState[key];
        }
      }
      actionsResult.push({ ...newState });
    }

    if (action.type === 'clear') {
      newState = { ...newState };

      for (const i in newState) {
        delete newState[i];
      }
      actionsResult.push({ ...newState });
    }
  }

  return actionsResult;
}

module.exports = transformStateWithClones;
