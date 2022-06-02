import React, { useEffect, useRef } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useGlobalContext } from './context';

const Modal = () => {
	const {
		gameInfo: {
			modalInfo: { modalText, isModalOpen },
		},
		closeModal,
	} = useGlobalContext();

	const modal = useRef(null);

	useEffect(() => {
		if (isModalOpen) {
			modal.current.showModal();
		}
	}, [isModalOpen]);

	return (
		<dialog ref={modal} className='modal'>
			<button className='close-modal' onClick={() => closeModal(modal)}>
				<FaRegTimesCircle />
			</button>
			<div className='modal-text'>{modalText}</div>
		</dialog>
	);
};

export default Modal;
