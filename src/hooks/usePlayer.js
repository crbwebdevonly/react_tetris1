import React from "react";
import { useState } from "react";
import { getRandomTetro, isValidPos } from "../utilities";

export const usePlayer = () => {
     const initialPlayer = {
		tetroMatrix: [],
		color: 0,
		pos: { row: 0, col: 6 },
		falling: true,
	}
	const [player, setPlayer] = useState(initialPlayer);

	//============
	// console.log(player, "PLAYER");
	//============
	const spawnPlayer = () => {
		const { shape, color, tetroIndex } = getRandomTetro();
		setPlayer({
			tetroMatrix: shape,
			tetroIndex,
			color,
			pos: { row: 0, col: 4 },
		});
	};
	//============
	//============
	const movePlayer = (dir) => {
		// console.log(allCellsArray, "move");

		//

		// let { row, col } = player.pos;
		// if (!isValidPos(row, col, player, allCellsArray)) return;
		// setPlayer({ ...player, pos: { row: row + 1, col } });
		setPlayer((prev) => {
			let { row, col } = prev.pos;
			if (dir === "left") {
				--col;
			}
			if (dir === "right") {
				col += 1;
			}
			if (dir === "down") {
				row += 1;
			}
			return { ...prev, pos: { row, col } };
		});
	};
	//============

	//============
     const resetPlayer = ()=>{
          setPlayer(initialPlayer)
     }
	//============
	//============

	return { player, spawnPlayer, movePlayer,resetPlayer ,setPlayer};
};
