import React, { useState, useEffect, useRef } from 'react';
import { MdWaves } from 'react-icons/md';
import { useGlobalContext } from './context';

const Tile = ({ id }) => {
	const radar = useRef(null);

	const {
		newRadar,
		resolveTreasures,
		gameInfo: { treasures, gameStatus },
	} = useGlobalContext();

	const [treasuresNearby, setTreasuresNearby] = useState([]);
	const [clicked, setClicked] = useState(false);
	const [value, setValue] = useState(<MdWaves />);

	const handlePlacingRadar = () => {
		if (!clicked) {
			if (gameStatus === 'PENDING') {
				radar.current.style.color = ' #ebebee';
				setClicked(true);
				const [amITreasure, treasuresNearbyList] = resolveTreasures(id);
				setTreasuresNearby(treasuresNearbyList);
				newRadar();
				if (amITreasure) {
					radar.current.style.backgroundColor = 'green';
				}
			}
		}
	};

	useEffect(() => {
		if (clicked && treasuresNearby) {
			setTreasuresNearby(
				treasuresNearby.filter((t) => !treasures[t.treasureId].found)
			);
			setValue(() => {
				if (clicked) {
					if (treasuresNearby && treasuresNearby.length > 0) {
						return treasuresNearby[0].treasureDistance;
					} else {
						return '0';
					}
				} else return <MdWaves />;
			});
		}
	}, [treasures, treasuresNearby, clicked]);

	return (
		<button
			type='button'
			ref={radar}
			className='game-object'
			onClick={handlePlacingRadar}>
			{value}
		</button>
	);
};

export default Tile;
