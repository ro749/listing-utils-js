import React from "react";
import MingcuteUserFollowFill from '~icons/mingcute/user-follow-fill';
import IconamoonDiscountFill from '~icons/iconamoon/discount-fill';
import MdiMessageText from '~icons/mdi/message-text';
import StreamlineBagDollarSolid from '~icons/streamline/bag-dollar-solid';
import { Chart, ChartType } from "shared-utils";
import DataContainer from "./DataContainer";
const Dashboard = ({info, charts}) => {
    return <>
      <h3 style={{ color: "#333", fontWeight: 600 }}>Dashboard</h3>
      <div className="row gy-4">
        <DataContainer
          bgColor={"bg-gradient-end-1"}
          iconBgColor={"bg-primary-600"}
          Icon={MingcuteUserFollowFill}
          title={'Asesores'}
          data={info.total_asesores}
          chart={charts.asesorsChart}
        />
        <DataContainer
          bgColor={"bg-gradient-end-2"}
          iconBgColor={"bg-success-main"}
          Icon={MingcuteUserFollowFill}
          title={'Clientes'}
          data={info.total_clients}
          chart={charts.clientsChart}
          chartColor={'#45b369'}
        />
        <DataContainer
          bgColor={"bg-gradient-end-3"}
          iconBgColor={"bg-yellow"}
          Icon={IconamoonDiscountFill}
          title={'Unidades Vendidas'}
          data={info.sold_units}
          chart={charts.soldUnitsChart}
          chartColor={'#f4941e'}
        />
      </div>

    </>;
};

export default Dashboard;
