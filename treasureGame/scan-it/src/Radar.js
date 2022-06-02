import React, { useState } from 'react';

const Radar = () => {
	const [value, setValue] = useState(5);
	return <div>{value}</div>;
};

export default Radar;
