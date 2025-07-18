//import React from "react";

import './style/bottomMenu.css'

export default function BottomMenu() {
  return (
    <div className="bottomMenu">
      <div className="menuItem">
        <img src="/icons/home.svg" alt="Home" />
        <span>Home</span>
      </div>
      <div className="menuItem">
        <img src="/icons/graph.svg" alt="Graph" />
        <span>Graph</span>
      </div>
      <div className="menuItem">
        <img src="/icons/settings.svg" alt="Settings" />
        <span>Settings</span>
      </div>
    </div>
  );
}

