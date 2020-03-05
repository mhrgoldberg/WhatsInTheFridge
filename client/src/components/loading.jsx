import React from "react";
import { CircleLoader } from "react-spinners";
const Loading = () => {
		return (
			<div className="loading-spinner">
				<CircleLoader color={"#008000"} style={"{width: fit-content}"} />
			</div>
		);
};

export default Loading;
