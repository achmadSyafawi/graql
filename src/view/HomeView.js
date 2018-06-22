import React, { Component } from "react";
import HomeQuery from "../query/HomeQuery";
class HomeView extends Component {
  render() {
    return (
      <div>
        <div>Home</div>
        <div>
          <HomeQuery />
        </div>
      </div>
    );
  }
}

export default HomeView;
