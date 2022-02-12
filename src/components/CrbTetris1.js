import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { usePlayer } from "../hooks/usePlayer";
import { usePlayField } from "../hooks/usePlayField";
import {
	isMoveValid,
	isRotationValid,
	isValidPos,
	NUM_COL_X,
	TETRO,
} from "../utilities";
import Cell from "./Cell";

const CrbTetris1 = () => {
	const { player, setPlayer, spawnPlayer, movePlayer, resetPlayer } =
		usePlayer();
	const { allCellsArray, setAllCellsArray, freezPlayer, resetPlayField } =
		usePlayField({
			player,
		});
	const inputRef = useRef();
	const [loading, setLoading] = useState(false);
	const [gameRunning, setGameRunning] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [rowsClearedCount, setRowsClearedCount] = useState(0);

	//============
	//============

	//============
	//============
	useEffect(() => {
		//   first
		const setMyInterval = () => {
			return setInterval(() => {
				// console.log("run");
				// dropPlayerUsingTimer(player, allCellsArray, freezPlayer);
				// dropPlayerUsingTimer();
				dropDown();
			}, 500);
		};
		let myInterval;
		if (gameRunning) {
			myInterval = setMyInterval();

			//============

			return () => {
				//     second
				clearInterval(myInterval);
			};
		}
	}, [gameRunning, player]);

	//============
	//============
	//============
	//============
	const handleStart = () => {
		setGameOver(false);
		setGameRunning(true);
		spawnPlayer();
	};
	//============
	//============
	//============
	const handleReset = () => {
		resetPlayField();
		resetPlayer();
		setGameRunning(false);
	};
	//============
	//============
	const handleGameOver = () => {
		// resetPlayField();
		// resetPlayer();
		setGameRunning(false);
		setGameOver(true);
	};
	//============

	//============
	const handleKeyDown = (e) => {
		if (gameOver) return;
		const { keyCode } = e;
		//left
		// console.log(keyCode);
		if (keyCode === 37) {
			if (!isMoveValid("left", player, allCellsArray)) return;
			movePlayer("left", player, allCellsArray);
			// setLoading(false);
		}
		// right
		if (keyCode === 39) {
			// console.log("right");
			if (!isMoveValid("right", player, allCellsArray)) return;
			movePlayer("right", player, allCellsArray);
		}
		// down
		if (keyCode === 40) {
			// console.log("down");
			// if (!isMoveValid("down", player, allCellsArray)) return;
			// movePlayer("down", player, allCellsArray);
			dropDown();
		}
		if (keyCode === 38) {
			handleRotate();
		}
	};
	//============
	//============
	const handleKeyUp = (e) => {
		const { keyCode } = e;

		if (keyCode === 40) {
			// console.log("downRELEASED");
		}
	};
	//============
	//============
	// const dropPlayerUsingTimer = (player, allCellsArray, freezPlayer) => {
	const dropPlayerUsingTimer = () => {
		// let { row, col } = player.pos;
		// console.log("drop currentPOS", row, col);
		// col += 1;
		// console.log("drop newPOS", row, col);
		// if (!isValidPos(row, col, player, allCellsArray)) {
		// 	console.log("drop--invalid");
		// 	freezPlayer();
		// } else {
		// 	console.log("move down");
		// 	movePlayer("down", player, allCellsArray);
		// }
		if (!isMoveValid("down", player, allCellsArray)) return;
		movePlayer("down", player, allCellsArray);

		// movePlayer("down");
	};
	//============
	//============
	const dropDown = () => {
		// console.log("BEFOREisMOVEVALIDplayer", player);
		if (!isMoveValid("down", player, allCellsArray)) {
			if (player.pos.row < 2) {
				handleGameOver();
				return;
			}
			freezPlayer();
			handleScoreCheck();
			spawnPlayer();
			return;
		}
		movePlayer("down", player, allCellsArray);
	};
	//============
	//============
	const handleScoreCheck = () => {
		let updatedCellsArray = [...allCellsArray];
		let clearRow = [];
		for (let y = 0; y < updatedCellsArray.length; y++) {
			const row = updatedCellsArray[y];
			let toClear = true;
			for (let x = 0; x < row.length; x++) {
				const cell = row[x];
				if (!cell.frozen) {
					toClear = false;
				}
			}
			if (toClear) {
				clearRow.push(y);
			}
		}
		//
		clearRow.forEach((y) => updatedCellsArray.splice(y, 1));
		clearRow.forEach((y) =>
			updatedCellsArray.unshift(
				Array.from(Array(NUM_COL_X), (c, col) => ({
					cellIndex: { row: "y", col },
					clear: true,
					color: "0,0,0",
					tetroIndex: 0,
					frozen: false,
				}))
			)
		);
		setRowsClearedCount((p) => p + clearRow.length);
		setAllCellsArray(updatedCellsArray);
	};
	//============
	//============
	const handleRotate = () => {
		let playerMatrix = player.tetroMatrix.map((e) => e);
		// console.log(playerMatrix, "BEFOREROTATE");
		let r1 = Array.from(Array(playerMatrix.length), (e, row) =>
			Array.from(Array(playerMatrix.length))
		);
		// console.log(r1, "initial");
		for (let y = 0; y < playerMatrix.length; y++) {
			for (let x = 0; x < playerMatrix[y].length; x++) {
				r1[y][x] = playerMatrix[x][y];
			}
		}
		r1.forEach((e) => e.reverse());
		if (isRotationValid(r1, player, allCellsArray)) {
			setPlayer((p) => ({ ...p, tetroMatrix: r1 }));
		}
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
	return (
		<StyledWrapper
			role={"button"}
			tabIndex={0}
			onKeyDown={handleKeyDown}
			onKeyUp={handleKeyUp}
		>
			<div className="play-field">
				{allCellsArray.map((rows, y) =>
					rows.map((cell, x) => (
						<Cell
							key={Math.random() + Math.random()}
							{...cell}
						/>
					))
				)}
			</div>
			<div className="controls">
				<button className="btn btn-primary " onClick={handleStart}>
					start
				</button>
				<button
					className="btn btn-primary "
					onClick={() => {
						setGameRunning(false);
					}}
				>
					stop
				</button>
				<button className="btn btn-primary " onClick={handleReset}>
					Reset
				</button>
				{gameOver && <h1>Game Over</h1>}
				<h1>Score:{rowsClearedCount}</h1>
			</div>
		</StyledWrapper>
	);
};

export default CrbTetris1;

const StyledWrapper = styled.div`
	border: 2px solid red;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	.play-field {
		border: 2px solid green;
		padding: 20px;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(20, 1fr);
		gap: 1px;
		width: max-content;
	}
	input {
		border: 2px solid green;
		opacity: o;
		display: none;
		visibility: none;
	}
	.controls {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		button {
			font-size: 2rem !important;
		}
	}
`;
