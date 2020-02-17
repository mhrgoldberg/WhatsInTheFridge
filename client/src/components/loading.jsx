import React from "react";
import { RotateLoader } from "react-spinners";
const Loading = () => {
		return (
			<div className="loading-spinner">
				<RotateLoader color={"#008000"} />
			</div>
		);
};

export default Loading;
