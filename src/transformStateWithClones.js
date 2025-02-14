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
    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        actionsResult.push({ ...newState });
        break;

      case 'removeProperties':
        newState = { ...newState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        actionsResult.push({ ...newState });
        break;

      case 'clear':
        for (const i in newState) {
          delete newState[i];
        }
        actionsResult.push({ ...newState });
        break;
    }
  }

  return actionsResult;
}

module.exports = transformStateWithClones;
