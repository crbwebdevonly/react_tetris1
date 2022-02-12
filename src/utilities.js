export const NUM_COL_X = 12;
export const NUM_ROWS_Y = 20;

export const TETRO = [
	{ index: 0, shape: [[0]], color: "0, 0, 0" },
	{
		index: 1,
		shape: [
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
		],
		color: "80, 227, 230",
	},
	{
		index: 2,
		shape: [
			[0, 2, 0],
			[0, 2, 0],
			[2, 2, 0],
		],
		color: "36, 95, 223",
	},
	{
		index: 3,
		shape: [
			[0, 3, 0],
			[0, 3, 0],
			[0, 3, 3],
		],
		color: "223, 173, 36",
	},
	{
		index: 4,
		shape: [
			[4, 4],
			[4, 4],
		],
		color: "223, 217, 36",
	},
	{
		index: 5,
		shape: [
			[0, 5, 5],
			[5, 5, 0],
			[0, 0, 0],
		],
		color: "48, 211, 56",
	},
	{
		index: 6,
		shape: [
			[6, 6, 6],
			[0, 6, 0],
			[0, 0, 0],
		],
		color: "132, 61, 198",
	},
	{
		index: 7,
		shape: [
			[7, 7, 0],
			[0, 7, 7],
			[0, 0, 0],
		],
		color: "227, 78, 78",
	},
];

//============
//============
// export const generateInitialCellsArray = (NUM_ROWS_Y, NUM_COL_X) => {
export const generateInitialCellsArray = () => {
	// return Array.from(Array(NUM_ROWS_Y), () => "k");
	return Array.from(Array(NUM_ROWS_Y), (e, row) =>
		Array.from(Array(NUM_COL_X), (c, col) => ({
			cellIndex: { row, col },
			clear: true,
			color: "0,0,0",
			tetroIndex: 0,
			frozen: false,
		}))
	);
};
//============
//============
//============
export const getRandomTetro = () => {
	const index = Math.ceil(Math.random() * 7);
	const { shape, color } = TETRO[index];
	return { shape, color, tetroIndex: index };
};
//============
//============
//============
export const isValidPos = (row, col, player, allCellsArray) => {
	let playerMatrix = player.tetroMatrix;

	for (let mY = 0; mY < playerMatrix.length; mY++) {
		for (let mX = 0; mX < playerMatrix[mY].length; mX++) {
			console.log("reading isValidPosCELL", row + mY, col + mX);
			if (playerMatrix[mY][mX] !== 0) {
				const newRow = allCellsArray[row + mY];
				if (!newRow) return false;
				// const cell = allCellsArray[row + mY][col + mX];
				const cell = newRow[col + mX];
				// console.log(cell, "cellValid?");
				// console.log(cell?.cellIndex, "cellINDEXValid?");
				if (!cell || cell.frozen) return false;
			}
		}
	}
	return true;
};
//============
//============
//============
export const isMoveValid = (dir, player, allCellsArray) => {
	let { row, col } = player.pos;
	if (dir === "left") {
		--col;
	}
	if (dir === "right") {
		col += 1;
	}
	if (dir === "down") {
		row += 1;
	}

	let playerMatrix = player.tetroMatrix;

	for (let mY = 0; mY < playerMatrix.length; mY++) {
		for (let mX = 0; mX < playerMatrix[mY].length; mX++) {
			// console.log("reading isValidPosCELL", row + mY, col + mX);
			if (playerMatrix[mY][mX] !== 0) {
				const newRow = allCellsArray[row + mY];
				if (!newRow) return false;
				// const cell = allCellsArray[row + mY][col + mX];
				const cell = newRow[col + mX];
				// console.log(cell, "cellValid?");
				// console.log(cell?.cellIndex, "cellINDEXValid?");
				if (!cell || cell.frozen) return false;
			}
		}
	}
	return true;
};
//============
//============
export const isRotationValid = (rotatedMatrix, player, allCellsArray) => {
	let { row, col } = player.pos;

	// let playerMatrix = player.tetroMatrix;

	for (let mY = 0; mY < rotatedMatrix.length; mY++) {
		for (let mX = 0; mX < rotatedMatrix[mY].length; mX++) {
			// console.log("reading isValidPosCELL", row + mY, col + mX);
			if (rotatedMatrix[mY][mX] !== 0) {
				const newRow = allCellsArray[row + mY];
				if (!newRow) return false;
				// const cell = allCellsArray[row + mY][col + mX];
				const cell = newRow[col + mX];
				// console.log(cell, "cellValid?");
				// console.log(cell?.cellIndex, "cellINDEXValid?");
				if (!cell || cell.frozen) return false;
			}
		}
	}
	return true;
};

//============
//============
//============
//============
//============
//============
//============
//============
//============
//============
//============
//============
//============
//============
//============
