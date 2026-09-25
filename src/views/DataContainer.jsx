import React from "react";
import { Chart, ChartType } from "shared-utils";
const DataContainer = ({
  bgColor,
  iconBgColor,
  Icon,
  title,
  data,
  chart,
  chartColor
}) => {
  return <>
    <div className="col-xxl-4 col-sm-6">
      <div className={"data-container "+bgColor}>
        <div className="data-div">
          <div className={"icon-area "+iconBgColor}>
            <Icon/>
          </div>
          <div>
            <span className='data-title'>{title}</span>
            <h6 className='data-value'>{data}</h6>
          </div>
        </div>
        <Chart chart={chart} type={ChartType.LINE} width={80} height={42} color={chartColor} />
      </div>
    </div>
  </>;
}

export default DataContainer;
