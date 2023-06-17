import TopBar from "../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Card, Button, Container, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import ReactDOM from 'react-dom/client';

//chart test
import { IgrLegendModule, IgrDataChartCoreModule, IgrDataChartRadialModule, IgrDataChartRadialCoreModule, IgrDataChartInteractivityModule, IgrDataChartAnnotationModule } from 'igniteui-react-charts';
import { IgrLegend, IgrDataChart, IgrCategoryAngleAxis, IgrNumericRadiusAxis, IgrRadialAreaSeries, IgrDataToolTipLayer } from 'igniteui-react-charts';
import { FootballPlayerStatsItem, FootballPlayerStats } from './FootballPlayerStats';

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
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
          </Offcanvas>
        </Card>
      </Container>
    </>
  );
}

export default MixMatch;
