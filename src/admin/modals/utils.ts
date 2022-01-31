enum EStates {
  ACTIVE = 'ACTIVE',
  NOT_ACTIVE = 'NOT_ACTIVE',
  REMOVED = 'REMOVED'
}

const isActive = state => {
  return state == EStates.ACTIVE;
}

const isNotActive = state => {
  return state == EStates.NOT_ACTIVE;
}

function getStateParam(isActive: boolean) {
  const {ACTIVE, NOT_ACTIVE} = EStates;
  return isActive ? [ACTIVE, NOT_ACTIVE] : [ACTIVE]
}

function getStateValue(isActive: boolean) {
  const {ACTIVE, NOT_ACTIVE} = EStates;
  return isActive ? ACTIVE : NOT_ACTIVE
}

export {EStates, isActive, isNotActive, getStateParam, getStateValue}