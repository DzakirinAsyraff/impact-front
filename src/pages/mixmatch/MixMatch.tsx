import TopBar from "../../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Card, Button, Container, Offcanvas } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";

//chart
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      series: [
        {
          name: "Product A",
          data: [80, 50, 30, 40, 100, 70],
        },
        {
          name: "Product B",
          data: [20, 30, 40, 80, 20, 30],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "radar",
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1,
          },
        },
        title: {
          text: "Product C analysis",
        },
        stroke: {
          width: 2,
        },
        fill: {
          opacity: 0.1,
        },
        markers: {
          size: 0,
        },
        xaxis: {
          categories: [
            "Sales made per month",
            "Net",
            "Expected net",
            "Remaining quantity",
            "Revenue",
            "Demand (%)",
          ],
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="radar"
          height={500}
        />
      </div>
    );
  }
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
          <Offcanvas
            show={show}
            onHide={handleClose}
            className="custom-offcanvas bg-light text-dark"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Analysis Value</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ApexChart />
            </Offcanvas.Body>
          </Offcanvas>
        </Card>
      </Container>
    </>
  );
}

export default MixMatch;
