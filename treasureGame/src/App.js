import Modal from './Modal';
import Navbar from './Navbar';
import Board from './Board';
import Settings from './Settings';
import { useState } from 'react';

function App() {
	const [restart, setRestart] = useState(false);

	return (
		<>
			<div className='App'>
				<Modal />
				<Navbar />
				<main>
					<Board shouldRestart={restart} />
					<Settings toRestart={setRestart} />
				</main>
			</div>
		</>
	);
}

export default App;
