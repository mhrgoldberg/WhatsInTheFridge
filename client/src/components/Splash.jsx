import React from "react";
import Nav from "./Nav.jsx";
class Splash extends React.Component {
  render() {
    return (
      <div className="splash-container">
        <Nav />
        <a
          href="https://github.com/mitchellreiss/WhatsInTheFridge"
          target="_blank"
          rel="noopener noreferrer"
          className="git-link"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
    );
  }
}

export default Splash;
