import TopBar from "../../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Card, Button, Container, Offcanvas } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";

//chart
import { IgrLegendModule, IgrDataChartCoreModule, IgrDataChartRadialModule, IgrDataChartRadialCoreModule, IgrDataChartInteractivityModule, IgrDataChartAnnotationModule } from 'igniteui-react-charts';
import { IgrLegend, IgrDataChart, IgrCategoryAngleAxis, IgrNumericRadiusAxis, IgrRadialAreaSeries, IgrDataToolTipLayer } from 'igniteui-react-charts';
import { FootballPlayerStatsItem, FootballPlayerStats } from './footballplayerstats';

const mods: any[] = [
  IgrLegendModule,
  IgrDataChartCoreModule,
  IgrDataChartRadialModule,
  IgrDataChartRadialCoreModule,
  IgrDataChartInteractivityModule,
  IgrDataChartAnnotationModule,
];
mods.forEach((m) => m.register());

function ChartComponent() {
  const chartRef = useRef<IgrDataChart>(null);
  const legendRef = useRef<IgrLegend>(null);
  const chartData = new FootballPlayerStats();

  useEffect(() => {
    const legend = legendRef.current;
    const chart = chartRef.current;
  
    if (chart && legend) {
      // Use the legend and chart references to perform any necessary operations
      // For example, you can set the legend reference in the chart:
      chart.legend = legend;
    }
  }, []);

  return (
    <div className="container sample">
      {/* <div className="legend-title">Ronaldo vs Messi Player Stats</div> */}

      <div className="legend">
        <IgrLegend ref={legendRef} orientation="Horizontal" />
      </div>

      <div className="container fill">
        <IgrDataChart
          ref={chartRef}
          isHorizontalZoomEnabled={false}
          isVerticalZoomEnabled={false}
        >
          <IgrCategoryAngleAxis name="angleAxis" dataSource={chartData} label="attribute" />
          <IgrNumericRadiusAxis
            name="radiusAxis"
            innerRadiusExtentScale={0.1}
            interval={2}
            minimumValue={0}
            maximumValue={10}
          />
          <IgrRadialAreaSeries
            name="RadialAreaSeries1"
            dataSource={chartData}
            angleAxisName="angleAxis"
            valueAxisName="radiusAxis"
            valueMemberPath="ronaldo"
            showDefaultTooltip={false}
            areaFillOpacity={0.5}
            thickness={3}
            title="Ronaldo"
            markerType="Circle"
          />
          <IgrRadialAreaSeries
            name="RadialAreaSeries2"
            dataSource={chartData}
            angleAxisName="angleAxis"
            valueAxisName="radiusAxis"
            valueMemberPath="messi"
            showDefaultTooltip={false}
            areaFillOpacity={0.5}
            thickness={3}
            title="Messi"
            markerType="Circle"
          />
          <IgrDataToolTipLayer name="DataToolTipLayer" />
        </IgrDataChart>
      </div>
    </div>
  );
}


function MixMatch() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <TopBar />
      <h1 className="my-4">Mix and Match</h1>
      <Row>
        <Col md={4}>
          <h2>Product A</h2>
          <Card>
            <Card.Title>Test</Card.Title>
            
            <p>RM 46</p>
            <Button variant="dark">Select product</Button>
          </Card>
        </Col>
        <Col md={4} className="my-5">
          <FontAwesomeIcon className="my-3" icon={faPlus} size="3x" />
        </Col>
        <Col md={4}>
          <h2>Product B</h2>
          <Card>
            <Card.Title>Test</Card.Title>
            <p>RM 50</p>
            <Button variant="dark">Select product</Button>
          </Card>
        </Col>
      </Row>
      <Container style={{ width: 450, marginTop: 150 }}>
        <Card className="my-4">
          <h2>Product C</h2>
          <p>Combine all product A and B</p>
          <p>RM 120</p>
          <Button variant="dark" onClick={handleShow}>
            Check Analysis
          </Button>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Analysis Value</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ChartComponent />
            </Offcanvas.Body>
          </Offcanvas>
        </Card>
        
      </Container>
    </>
  );
}

export default MixMatch;
