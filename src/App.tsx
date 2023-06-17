import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./styles/App.css";
import TopBar from "./components/navbar";
import Dashboard from "./pages/analytic/dashboard";

function App() {
  return (
    <>
      <TopBar />
      <div className="App my-4">
        <header className="App-header">
          <h1>Dashboard</h1>
        </header>
        <div></div>
        <div className="App-body">
          < Dashboard />
          {/* <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Customer</Card.Title>
              <Card.Text>View the customer page.</Card.Text>
              <Link to="/customer">
                <Button>Customer</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Management</Card.Title>
              <Card.Text>View the management page.</Card.Text>
              <Link to="/management">
                <Button>Management</Button>
              </Link>
              <Link to="/view-products">
                <Button>View Products</Button>
              </Link>
              <Link to="/view-skus">
                <Button>View SKUs</Button>
              </Link>
            </Card.Body>
          </Card> */}
        </div>
      </div>
    </>
  );
}

export default App;
