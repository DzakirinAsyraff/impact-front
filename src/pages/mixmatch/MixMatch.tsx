import TopBar from "../../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Card, Button, Container, Offcanvas } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";

//chart
import ReactApexChart from "react-apexcharts";
import { productAPI } from "../../API/productAPI";
import { setAProduct } from "../../redux/productSlice";
import { useAppDispatch } from "../../hooks/useRedux";

class ApexChart extends React.Component {
  constructor(props : any) {
    super(props);

    this.state = {
      series: [
        {
          name: "Apple Iphone 14",
          data: [80, 50, 30, 40, 100, 70],
        },
        {
          name: "Apple Iphone 13",
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
  const [productName, setProductName] = useState('');
  const [selectedProductA, setSelectedProductA] = useState<any>(null);
  const [selectedProductB, setSelectedProductB] = useState<any>(null);
  const dispatch = useAppDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //product A handle select
  const handleProductSelectA = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.value;
    setProductName(name);
    console.log(name);

    // Get the selected product information and update the selectedProduct state
    productAPI
      .getProductByName(name)
      .then((response) => {
        setSelectedProductA(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //product B handle select
  const handleProductSelectB = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.value;
    setProductName(name);

    // Get the selected product information and update the selectedProduct state
    productAPI
      .getProductByName(name)
      .then((response) => {
        setSelectedProductB(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (productName !== '') {
      productAPI
        .getProductByName(productName)
        .then((response) => {
          dispatch(setAProduct(response));
          setSelectedProductA(response);
          setSelectedProductB(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('No');
    }
  }, [productName, dispatch]);

  return (
    <>
      <TopBar />
      <h1 className="my-4">Mix and Match</h1>
      <Row>
        <Col md={4}>
          <h2>Product A</h2>
          <Card>
            <Card.Title>{selectedProductA?.name}</Card.Title>
            <p>Select your product</p>
            <select value={productName} onChange={handleProductSelectA}>
              <option value="">Select product</option>
              <option value="Apple Iphone 13">Apple Iphone 13</option>
              <option value="Apple Iphone 14">Apple Iphone 14</option>
            </select>
            <Button variant="dark" onClick={() => setSelectedProductA(selectedProductA)} className="my-4">
              Show Product Information
            </Button>
          </Card>
        </Col>
        <Col md={4} className="my-5">
          <FontAwesomeIcon className="my-3" icon={faPlus} size="3x" />
        </Col>
        <Col md={4}>
          <h2>Product B</h2>
          <Card>
            <Card.Title>{selectedProductB?.name}</Card.Title>
            <p>Select your product</p>
            <select value={productName} onChange={handleProductSelectB}>
              <option value="">Select product</option>
              <option value="Apple Iphone 13">Apple Iphone 13</option>
              <option value="Apple Iphone 14">Apple Iphone 14</option>
            </select>
            <Button variant="dark" onClick={() => setSelectedProductB(selectedProductB)} className="my-4">
              Show Product Information
            </Button>
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
              <ApexChart productName={productName} />
            </Offcanvas.Body>
          </Offcanvas>
        </Card>
      </Container>
    </>
  );
}

export default MixMatch;
