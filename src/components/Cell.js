import React, { memo } from "react";
import styled from "styled-components";
import { TETRO } from "../utilities";
const Cell = (props) => {
	// console.log(props, "cellProps");
	const { cellIndex, status, frozen, color } = props;
	// const color = 0// TETRO[status].color;
	const index = 1; //status;
	// const { color, index } = props;
	//============
	// console.log(index === 0, index);
	//============
	//============
	//============
	return (
		<StyledWrapper color={color} index={index}>
			<div className="cell">{}</div>
		</StyledWrapper>
	);
};

export default memo(Cell);

const StyledWrapper = styled.div`
	/* border: 2px solid red; */

	.cell {
		height: 40px;
		width: 40px;
		background: rgba(${(props) => props.color}, 0.8);
		border: ${(props) => (props.index === 0 ? "0px solid" : "5px solid")};
		border-bottom-color: rgba(${(props) => props.color}, 0.1);
		border-right-color: rgba(${(props) => props.color}, 1);
		border-top-color: rgba(${(props) => props.color}, 1);
		border-left-color: rgba(${(props) => props.color}, 0.3);
	}
`;
