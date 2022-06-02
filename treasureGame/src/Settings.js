import React from 'react';
import { useGlobalContext } from './context';

const Settings = ({ toRestart }) => {
	const {
		gameInfo: { amountOfRadars, amountOfTreasures },
		dispatchGame,
		resetGame,
		startGame,
	} = useGlobalContext();

	return (
		<aside className='settings'>
			<h2>Settings</h2>
			<form>
				{/* <label htmlFor='amountOfRadars'>Amount of radars: </label>
				<input
					id='amountOfRadars'
					type='text'
					className='input'
					value={amountOfRadars}
					onChange={(e) =>
						dispatchGame({
							type: 'CHANGE_RADARS_AMOUNT',
							payload: parseInt(e.target.value),
						})
					}
				/>
				<br />
				<label htmlFor='amountOfTreasures'>Amount of treasures: </label>
				<input
					id='amountOfTreasures'
					type='text'
					className='input'
					onChange={(e) =>
						dispatchGame({
							type: 'CHANGE_TREASURES_AMOUNT',
							payload: parseInt(e.target.value),
						})
					}
					value={amountOfTreasures}
				/>
				<br /> */}
				<div className='buttons'>
					<button
						className='submit-btn'
						onClick={(e) => {
							startGame(e, amountOfTreasures, amountOfRadars);
							toRestart((oldRestart) => {
								if (oldRestart === 1) return 0;
								return 1;
							});
						}}
						type='submit'>
						Start
					</button>
					<button
						className='reset-btn'
						type='reset'
						onClick={(e) => {
							resetGame(e);
							toRestart((oldRestart) => {
								if (oldRestart === 1) return 0;
								return 1;
							});
						}}>
						Reset
					</button>
				</div>
			</form>
		</aside>
	);
};

export default Settings;
