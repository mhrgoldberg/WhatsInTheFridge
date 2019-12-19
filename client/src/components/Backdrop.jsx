import React from 'react';

const backdrop = props => <div className="backdrop">
  {props.canCancel && <button className="btn" onClick={props.onCancel}></button>}
</div>;

export default backdrop;