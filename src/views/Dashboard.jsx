import React from "react";
import MingcuteUserFollowFill from '~icons/mingcute/user-follow-fill';
import IconamoonDiscountFill from '~icons/iconamoon/discount-fill';
import MdiMessageText from '~icons/mdi/message-text';
import StreamlineBagDollarSolid from '~icons/streamline/bag-dollar-solid';
import { Chart, ChartType, ChartGuides } from "shared-utils";
import DataContainer from "./DataContainer";
import PercentContainer from "./PercentContainer";
const Dashboard = ({ info, charts }) => {
  console.log("info.percent_available");
  console.log(info.percent_available);
    return <>
      <h3 style={{ color: "#333", fontWeight: 600 }}>Dashboard</h3>
      <div className="row gy-4">
      <div className="row gy-4">
        <div className="col-xxl-8" style={{ width: "66.666%" }}>
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
            <DataContainer
              bgColor={"bg-gradient-end-4"}
              iconBgColor={"bg-purple"}
              Icon={MdiMessageText}
              title={'Unidades Disponibles'}
              data={info.available_units}
              chart={charts.availableUnitsChart}
              chartColor={'#8252e9'}
            />
            <DataContainer
              bgColor={"bg-gradient-end-5"}
              iconBgColor={"bg-pink"}
              Icon={StreamlineBagDollarSolid}
              title={'Unidades Disponibles Valor'}
              data={info.available_units_value}
            />
            <DataContainer
              bgColor={"bg-gradient-end-6"}
              iconBgColor={"bg-cyan-500"}
              Icon={StreamlineBagDollarSolid}
              title={'Unidades Disponibles Promedio'}
              data={info.available_units_avg}
            />
          </div>
        </div>
        <div className="col-xxl-4" style={{ width: "33.333%" }}>
          <div className="card h-100 radius-8 border">
              <div className="card-body p-24">
                  <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                      <div>
                          <h6 className="mb-2 fw-bold text-lg">Cotizaciones</h6>
                          <span className="text-sm fw-medium text-secondary-light">Mensuales</span>
                      </div>
                      <div className="text-end">
                          <h6 className="mb-2 fw-bold text-lg">
                          {info.total_quotes}
                          </h6>
                          <span className="bg-success-focus ps-12 pe-12 pt-2 pb-2 rounded-2 fw-medium text-success-main text-sm">
                              +{info.new_quotes}
                          </span>
                      </div>
                  </div>
              <Chart chart={charts.quotesChart} type={ChartType.LINE} gradient={true} guides={ChartGuides.XAXIS} height={162} />
              </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-8">
          <div className="card h-100 radius-8 border-0">
              <div className="card-body p-24">
                  <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                      <div>
                          <h6 className="mb-2 fw-bold text-lg">Ventas</h6>
                      </div>
                  </div>
                  <Chart chart={charts.salesChart} type={ChartType.BAR} guides = {ChartGuides.FULL}/>
              </div>
          </div>
      </div>
      <div class="col-xxl-4">
          <div class="row gy-4">
            <div className="col-xxl-12 col-sm-6">
              <div className="card h-100 radius-8 border-0">
                <div className="card-body p-24">
                  <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                    <h6 className="mb-2 fw-bold text-lg">Unidades</h6>
                  </div>
                  <div className="mt-3">
                    <PercentContainer title="Disponibles" bgColor="bg-orange" percent={info.percent_available}/>
                    <PercentContainer title="Apartadas" bgColor="bg-success-main" percent={info.percent_apartado}/>
                    <PercentContainer title="Vendidas" bgColor="bg-info-main" percent={info.percent_sold}/>
                  </div>
                </div>
              </div>
          </div>
        </div>
        </div>
      </div>
    </>;
};

export default Dashboard;
