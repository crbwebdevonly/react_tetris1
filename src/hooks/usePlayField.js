import { useEffect } from "react";
import { useState } from "react";
import { generateInitialCellsArray, NUM_COL_X, NUM_ROWS_Y } from "../utilities";
// import React from "react";

export const usePlayField = (props) => {
	const { player } = props;
	// console.log(props);
	// console.log(player);
	const [allCellsArray, setAllCellsArray] = useState(
		generateInitialCellsArray()
	);
	//============
	//============
	useEffect(() => {
		//   first
		const updateField = () => {
			let updatedCellsArray = [...allCellsArray];
			//
			let playerMatrix = player.tetroMatrix || [];
			// console.log(playerMatrix, "pMat");
			//clear previous shape/non-frozen cells
			updatedCellsArray.forEach((row) => {
				row.forEach((cell) => {
					if (!cell.frozen) {
						// console.log(cell, "clear");
						cell.color = "0,0,0";
						cell.tetroIndex = 0;
					}
				});
			});
			//draw current shape
			playerMatrix.forEach((row, y) =>
				row.forEach((cell, x) => {
					// console.log(cell, "playercell");
					// if(cell === 0) continue
					// console.log(cell);
					if (cell !== 0) {
						// console.log(cell);
						const row = y + player.pos.row;
						const col = x + player.pos.col;
						// console.log("newPos", row, col);
						if (!updatedCellsArray[row]) {
							console.log("no row");
							return;
						}
						updatedCellsArray[row][col].color =
							cell === 0 ? "0,0,0" : player.color;
						updatedCellsArray[y][x].tetroIndex = player.index;
					}
				})
			);
			setAllCellsArray(updatedCellsArray);
		};
		//============
		//============
		updateField();
		//============

		return () => {
			//     second
		};
	}, [player]);

	//============
	//============
	//============
	const freezPlayer = () => {
		let { row, col } = player.pos;
		let playerMatrix = player.tetroMatrix;
		let updatedCellsArray = [...allCellsArray];

		for (let mY = 0; mY < playerMatrix.length; mY++) {
			for (let mX = 0; mX < playerMatrix[mY].length; mX++) {
				if (playerMatrix[mY][mX] !== 0) {
					updatedCellsArray[mY + row][mX + col].color =
						player.color;
					updatedCellsArray[mY + row][mX + col].tetroIndex =
						player.index;
					updatedCellsArray[mY + row][mX + col].frozen = true;
					updatedCellsArray[mY + row][mX + col].clear = false;
				}
			}
		}
		setAllCellsArray(updatedCellsArray);
	};
	//============
	//============
     const resetPlayField = ()=>{
          setAllCellsArray(generateInitialCellsArray())
     }
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
	return { allCellsArray, freezPlayer,resetPlayField ,setAllCellsArray};
};
