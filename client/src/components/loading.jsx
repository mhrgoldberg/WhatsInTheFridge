import React from "react";
import { RotateLoader } from "react-spinners";
const Loading = () => {
		return (
			<div className="loading-spinner">
				<RotateLoader color={"#008000"} style={"{width: fit-content}"} />
			</div>
		);
};

export default Loading;
