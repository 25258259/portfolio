import { boardScheme } from './utils/board';

// const defaultState = {
// 	gameStatus: '',
// 	board: boardScheme,
// 	treasures: [],
// 	radars: 0,
// 	amountOfRadars: 20,
// 	amountOfTreasures: 3,
// 	modalInfo: {
// 		isModalOpen: false,
// 		modalText: '',
// 	},
// };
export const getRandomTreasures = (howMany) => {
	const treasures = new Array(howMany);
	for (let i = 0; i < howMany; i++) {
		const x = Math.floor(Math.random() * 29);
		const y = Math.floor(Math.random() * 19);
		treasures[i] = { x, y, found: false };
	}
	return treasures;
};

export const reducer = (state, action) => {
	if (action.type === 'START_GAME') {
		const { amountOfTreasures, amountOfRadars } = action.payload;
		return {
			...state,
			gameStatus: 'PENDING',
			amountOfTreasures,
			amountOfRadars,
			radars: 0,
			board: boardScheme,
			treasures: getRandomTreasures(amountOfTreasures),
		};
	}
	if (action.type === 'OPEN_MODAL') {
		return {
			...state,
			modalInfo: action.payload,
		};
	}
	if (action.type === 'INCREASE_RADARS') {
		const newState = { ...state, radars: state.radars + 1 };
		if (
			newState.radars === newState.amountOfRadars &&
			newState.gameStatus === 'PENDING'
		) {
			return {
				...newState,
				gameStatus: 'NO_RADARS',
			};
		}
		return {
			...state,
			radars: state.radars + 1,
		};
	}
	if (action.type === 'CHANGE_GAME_STATUS') {
		return {
			...state,
			gameStatus: action.payload,
		};
	}
	if (action.type === 'CLOSE_MODAL') {
		return {
			...state,
			modalInfo: {
				isModalOpen: false,
				modalText: '',
			},
		};
	}
	if (action.type === 'FOUND_THE_TREASURE') {
		let founded = 0;
		const newTreasures = state.treasures.map((treasure, treasureIndex) => {
			if (treasure.found) {
				founded += 1;
			}
			if (action.payload === treasureIndex) {
				founded += 1;
				return { ...treasure, found: true };
			}
			return treasure;
		});

		if (founded === state.amountOfTreasures) {
			return { ...state, treasures: newTreasures, gameStatus: 'WON' };
		}

		return {
			...state,
			treasures: newTreasures,
		};
	}
	if (action.type === 'CHANGE_RADARS_AMOUNT') {
		return {
			...state,
			amountOfRadars: action.payload,
		};
	}
	if (action.type === 'CHANGE_TREASURES_AMOUNT') {
		return {
			...state,
			amountOfTreasures: action.payload,
		};
	}
	if (action.type === 'RESET_GAME') {
		const newTreasures = state.treasures.map((treasure) => {
			return { ...treasure, found: false };
		});
		return {
			...state,
			radars: 0,
			treasures: newTreasures,
		};
	}
	throw new Error('Cannot resolve state ' + action.type);
};
