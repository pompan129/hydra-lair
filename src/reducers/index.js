import { actionTypes } from "../actions";
import update from "immutability-helper";
import { combineReducers } from "redux";

//Game Board/Map  reducer
const boardInitialState = {
  entities: [[]],
  dungeonLevel: undefined,
  playerCoord: undefined,
  fog: true
};
const gameReducer = (state = boardInitialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CHANGE_ENTITY: {
      const [x, y] = payload.coords;
      const entities = update(state.entities, {
        [y]: {
          [x]: { $set: payload.entity }
        }
      });
      return { ...state, entities };
    }
    case actionTypes.CHANGE_PLAYER_POSITION:
      return { ...state, playerCoord: payload };
    case actionTypes.CREATE_LEVEL:
      return {
        ...state,
        playerCoord: payload.playerCoord,
        entities: payload.entities
      };
    case actionTypes.SET_DUNGEON_LEVEL:
      return { ...state, dungeonLevel: payload };
    case actionTypes.CHANGE_FOG:
      return { ...state, fog: payload };
    default:
      return state;
  }
};

//reducer for player stats
const playerInitialState = {
  type: "player",
  hp: 100, //todo
  maxHp: 100,
  weapon: {
    kind: "Fist",
    level: 0,
    damage: [0, 3]
  },
  exp: 0,
  level: 0,
  alive: true
};
const playerReducer = (state = playerInitialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CHANGE_PLAYER_HEALTH: {
      return { ...state, hp: payload };
    }
    case actionTypes.CHANGE_PLAYER_MAX_HEALTH: {
      return { ...state, maxHp: payload };
    }
    case actionTypes.CHANGE_WEAPON: {
      return { ...state, weapon: payload };
    }
    case actionTypes.CHANGE_EXP: {
      return { ...state, exp: payload };
    }
    case actionTypes.CHANGE_LEVEL: {
      return { ...state, level: payload };
    }
    case actionTypes.CHANGE_PLAYER_ALIVE: {
      return { ...state, alive: payload };
    }
    case actionTypes.RESET_PLAYER:
      return playerInitialState;
    default:
      return state;
  }
};

//reducer for info in marquee/sidebar
const marqueeInitialState = {
  msgs: [
    "You've entered the Lair of The Hydra! Kill the Hydra on level 4. Or die trying!!!",
    "Use 'WASD' or arrow keys to move the hero around the board"
  ]
};
const marqueeReducer = (state = marqueeInitialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SEND_MSG: {
      return { ...state, msgs: [...state.msgs, payload].slice(-4) };
    }
    case actionTypes.SEND_MSG: {
      return { ...state, msgs: [...state.msgs, payload].slice(-4) };
    }
    case actionTypes.RESET_MSGS: {
      return marqueeInitialState;
    }
    default:
      return state;
  }
};

//reducer for Sound & sfx
const soundInitialState = {
  step: undefined,
  swipe: undefined,
  punch: undefined,
  stab: undefined,
  axe: undefined,
  m_gun: undefined,
  bazooka: undefined,
  excal: undefined,
  orc: undefined,
  goblin: undefined,
  kobold: undefined,
  bugbear: undefined,
  ogre: undefined,
  troll: undefined,
  vampire: undefined,
  hydra: undefined,
  balrog: undefined,
  gulp: undefined,
  equip: undefined,
  monster_die: undefined,
  victory: undefined,
  hero_death: undefined
};
const soundReducer = (state = soundInitialState, { type, payload }) => {
  switch (type) {
    case actionTypes.LOAD_SOUNDS:
      /*return {...state,
                 step:payload.step,
                 stab:payload.stab,
                 m_gun:payload.m_gun,
                 excal:payload.excal,
                 bazooka:payload.bazooka,
                 axe:payload.axe,
                 swipe:payload.swipe,
                 punch:payload.punch,
                 hydra:payload.hydra,
                 balrog:payload.balrog
                 vampire:payload.vampire,
                 troll:payload.troll,
                 ogre:payload.ogre,
                 bugbear:payload.bugbear,
                 orc:payload.orc,
                 goblin:payload.goblin,
                 kobold:payload.kobold,
                 monster_die:payload.monster_die,
                 victory:payload.victory,
                 hero_death:payload.hero_death,
                 equip:payload.equip,
                 gulp:payload.gulp};*/
      return payload;
    default:
      return state;
  }
};

const modalInitialState = {
  modalVisible: false,
  msg: "",
  header: "",
  pic: undefined
};
const modalReducer = (state = modalInitialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_MODAL:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default combineReducers({
  game: gameReducer,
  player: playerReducer,
  marquee: marqueeReducer,
  sound: soundReducer,
  modal: modalReducer
});

export function enableBatching(reduce) {
  return function batchingReducer(state, action) {
    switch (action.type) {
      case actionTypes.BATCH_ACTIONS:
        return action.payload.reduce(batchingReducer, state);
      default:
        return reduce(state, action);
    }
  };
}
