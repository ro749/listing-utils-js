import React from "react";
import MingcuteUserFollowFill from '~icons/mingcute/user-follow-fill';
import IconamoonDiscountFill from '~icons/iconamoon/discount-fill';
import MdiMessageText from '~icons/mdi/message-text';
import StreamlineBagDollarSolid from '~icons/streamline/bag-dollar-solid';
import { Chart, ChartType, ChartGuides, Colors, Table } from "shared-utils";
import DataContainer from "./DataContainer";
import PercentContainer from "./PercentContainer";
const Dashboard = ({
  info,
  asesorsChart,
  clientsChart,
  soldUnitsChart,
  availableUnitsChart,
  quotesChart,
  salesChart,
  modelsChart,
  modelsQuotesChart,
  asesoresTable,
  asesorsQuotesChart
}) => {
  console.log(asesorsQuotesChart);
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
              chart={asesorsChart}
              />
              <DataContainer
              bgColor={"bg-gradient-end-2"}
              iconBgColor={"bg-success-main"}
              Icon={MingcuteUserFollowFill}
              title={'Clientes'}
              data={info.total_clients}
              chart={clientsChart}
              chartColor={'#45b369'}
              />
              <DataContainer
              bgColor={"bg-gradient-end-3"}
              iconBgColor={"bg-yellow"}
              Icon={IconamoonDiscountFill}
              title={'Unidades Vendidas'}
              data={info.sold_units}
              chart={soldUnitsChart}
              chartColor={'#f4941e'}
              />
              <DataContainer
              bgColor={"bg-gradient-end-4"}
              iconBgColor={"bg-purple"}
              Icon={MdiMessageText}
              title={'Unidades Disponibles'}
              data={info.available_units}
              chart={availableUnitsChart}
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
              <Chart chart={quotesChart} type={ChartType.LINE} gradient={true} guides={ChartGuides.XAXIS} height={162} />
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
              <Chart chart={salesChart} type={ChartType.BAR} guides = {ChartGuides.FULL}/>
            </div>
          </div>
        </div>
        <div className="col-xxl-4">
          <div className="row gy-4">
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
            <div className="col-xxl-12 col-sm-6">
              <div className="card h-100 radius-8 border-0 overflow-hidden">
                <div className="card-body p-24">
                  <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                    <h6 className="mb-2 fw-bold text-lg">Modelos Disponibles</h6>
                  </div>

                  <div className="d-flex align-items-center mt-3">
                    <ul className="flex-shrink-0">
                      {modelsChart.data.map((model, index) => (
                        <li key={index} className="d-flex align-items-center gap-2 mb-28">
                            <span className="w-12-px h-12-px rounded-circle" style={{backgroundColor: Colors[index%6]}}></span>
                            <span className="text-secondary-light text-sm fw-medium">{model.name}: {model.modelo_percent}</span>
                        </li>
                      ))}
                    </ul>
                    <Chart chart={modelsChart} type={ChartType.DONUT} width={300} height={242.7}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-4" style={{ width: "33.3333%" }} >
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                <h6 className="mb-2 fw-bold text-lg mb-0">Cotizaciones por Modelo</h6>
              </div>
              <div className="mt-32">
              {modelsChart.data.map((model, index) => (
                <div key={index} className="d-flex align-items-center justify-content-between gap-3 mb-32">
                  <div className="d-flex align-items-center">
                    <img src={model['image']} alt="" className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"/>
                    <div className="flex-grow-1">
                      <h6 className="text-md mb-0">{model['name']}</h6>
                      <span className="text-sm text-secondary-light fw-medium">Precio promedio: ${Intl.NumberFormat('es-MX', {style: 'currency',currency: 'MXN'}).format(model['price'])}</span>
                    </div>
                  </div>
                  <span className="text-primary-light text-md fw-medium">{model['quote_count']}</span>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-6" style={{ width: "66.6666%" }}>
          <div className="card h-100">
            <div className="card-header">
              <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                <h6 className="mb-2 fw-bold text-lg mb-0">Porcentaje de Cotizaciones por Modelo</h6>
              </div>
            </div>
          <div className="card-body p-24 d-flex align-items-center gap-16">
            <Chart chart={modelsQuotesChart} type={ChartType.RADIAL} height={665.3666666666667} />
              <ul className="d-flex flex-column gap-12">
                {modelsQuotesChart.data.map((model, index) => (
                  <li key={index} >
                      <span className="text-lg">{model.name}: <span className="fw-semibold" style={{color: Colors[index%6]}}>{model.quote_percent}%</span> </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="row gy-4">
          <div className="col-xxl-8">
            <div className="card h-100">
              <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                <h6 className="text-lg fw-semibold mb-0">Asesores</h6>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive scroll-sm">
                  <Table {...asesoresTable} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-6">
            <div className="card h-100">
              <div className="card-body p-24">
                <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                  <h6 className="mb-2 fw-bold text-lg mb-0">Cotizaciones por Tipo de Asesor</h6>
                  <Chart chart={asesorsQuotesChart} type={ChartType.BAR} guides={ChartGuides.FULL} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>;
};

export default Dashboard;
