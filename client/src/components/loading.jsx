import React from "react";
import { RotateLoader } from "react-spinners";
const Loading = () => {
		return (
			<div className="loading-spinner">
				<RotateLoader color={"green"} />
			</div>
		);
};

export default Loading;
