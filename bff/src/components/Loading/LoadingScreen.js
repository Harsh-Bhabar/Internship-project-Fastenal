import React, { useState } from "react";
import LoadingIcon from "./LoadingIcon";

import "./LoadingScreen.css";

export default function LoadingScreen() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  setTimeout(() => {
    setShowLoadingScreen(false);
  }, 1500);
  
  return (
    <>
      {showLoadingScreen && (
        <div className="loading-screen">
          <div>
            <div className="loading-icon">
              <LoadingIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
