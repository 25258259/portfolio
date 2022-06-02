import React, { useContext, useEffect, useReducer } from 'react';
import { boardScheme } from './utils/board';
import { reducer, getRandomTreasures } from './reducer';

const AppContext = React.createContext();

const defaultState = {
	gameStatus: 'PENDING',
	board: boardScheme,
	treasures: getRandomTreasures(3),
	radars: 0,
	amountOfRadars: 20,
	amountOfTreasures: 3,
	modalInfo: {
		isModalOpen: false,
		modalText: '',
	},
};

const AppProvider = ({ children }) => {
	const [gameInfo, dispatchGame] = useReducer(reducer, defaultState);

	const resolveDistance = (index, tx, ty) => {
		const x = index % 30;
		const y = parseInt(index / 30);

		const xDistance = Math.abs(x - tx);
		const yDistance = Math.abs(y - ty);

		if (x === tx) {
			return yDistance;
		} else if (y === ty) {
			return xDistance;
		} else {
			return Math.max(xDistance, yDistance);
		}
	};

	const newRadar = () => {
		dispatchGame({ type: 'INCREASE_RADARS' });
	};

	const openModal = (text) => {
		const newModalInfo = {
			isModalOpen: true,
			modalText: text,
		};
		dispatchGame({ type: 'OPEN_MODAL', payload: newModalInfo });
	};

	const closeModal = (modal) => {
		modal.current.close();
		dispatchGame({ type: 'CLOSE_MODAL' });
	};

	const startGame = (e, amountOfTreasures, amountOfRadars) => {
		e.preventDefault();
		dispatchGame({
			type: 'START_GAME',
			payload: {
				amountOfTreasures,
				amountOfRadars: parseInt(amountOfRadars),
			},
		});
	};

	const resetGame = (e) => {
		e.preventDefault();
		dispatchGame({ type: 'RESET_GAME' });
	};

	const foundTheTreasure = (treasureId) => {
		dispatchGame({ type: 'FOUND_THE_TREASURE', payload: treasureId });
	};

	const resolveTreasures = (index) => {
		let treasuresNearby = [];
		let amITreasure = false;

		gameInfo.treasures.forEach((treasure, treasureId) => {
			const treasureDistance = resolveDistance(
				index,
				treasure.x,
				treasure.y
			);
			if (treasureDistance === 0) {
				foundTheTreasure(treasureId);
				amITreasure = true;
			}
			if (treasureDistance <= 4) {
				treasuresNearby.push({ treasureDistance, treasureId });
				treasuresNearby.sort(
					(a, b) => a.treasureDistance - b.treasureDistance
				);
			}
		});
		return [amITreasure, treasuresNearby];
	};

	useEffect(() => {
		if (gameInfo.gameStatus === 'WON') {
			openModal('Gratulacje znalazłeś wszystkie skarby');
		} else if (gameInfo.gameStatus === 'NO_RADARS') {
			openModal('Niestety wykorzystałeś wszystkie radary');
		} else if (gameInfo.gameStatus === 'LOST') {
			openModal('Przegrałeś');
		}
	}, [gameInfo.gameStatus]);

	return (
		<AppContext.Provider
			value={{
				closeModal,
				newRadar,
				resolveTreasures,
				startGame,
				gameInfo,
				dispatchGame,
				resetGame,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
