import React, { useEffect, useRef } from 'react';
import { useGlobalContext } from './context';

import Tile from './Tile';

const Board = ({ shouldRestart }) => {
	const boardRef = useRef(null);
	const {
		gameInfo: { board, gameStatus, treasures },
	} = useGlobalContext();

	const checkIndex = () => {
		let newTreasures = [];
		treasures.map((treasure) => {
			if (!treasure.found) {
				newTreasures.push(treasure.x + treasure.y * 30);
			}
			return treasure;
		});
		return newTreasures;
	};

	useEffect(() => {
		if (gameStatus !== 'PENDING') {
			const distanceToTreasures = checkIndex();
			console.log(distanceToTreasures);
			const children = boardRef.current.children;
			let counter = 0;
			for (let button of children) {
				if (distanceToTreasures.indexOf(counter) > -1) {
					button.style.backgroundColor = '#B82009';
					button.style.color = 'white';
					button.innerHTML = 'T';
					console.log(counter);
				}
				counter += 1;
			}
		}
	}, [gameStatus]);

	return (
		<div className='board' ref={boardRef} key={shouldRestart}>
			{board.map((item, index) => {
				return <Tile key={index} id={index} />;
			})}
		</div>
	);
};

export default Board;
