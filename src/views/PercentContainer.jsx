import React from "react";

const PercentContainer = ({ title, bgColor, percent }) => {
  return <>
  <div className="unit-row">
      <span className="text-primary-light fw-medium text-md ps-12">
          {title}
      </span>

      <div className="unit-bar">
        <div
          className="progress rounded-pill"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className={"progress-bar " + bgColor + " rounded-pill"}
            style={{width: percent}}
          >
          </div>
        </div>
    </div>

      <span className="unit-percent text-secondary-light font-xs fw-semibold">
        {percent}
      </span>
  </div >
  </>;
}

export default PercentContainer;
