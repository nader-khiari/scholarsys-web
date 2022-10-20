import React from "react";

class Footer extends React.Component {
  render() {
    const exclusionArray = [
      "/",
      "/register",
      "/forgot-password",
      "/error",
      "/blank-page",
    ];
    if (exclusionArray.indexOf(this.props?.location?.pathname) >= 0) {
      return "";
    }
    return (
      <footer>
        <p>
          Copyright © 2022{" "}
          <a href="https://e-build.tn/" target={"_blank; rel=noreferrer"}>
            Ebuild
          </a>
          . All Rights Reserved.
        </p>
      </footer>
    );
  }
}

export { Footer };
