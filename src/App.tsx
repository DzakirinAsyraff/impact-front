import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import './styles/App.css';

function App() {

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Select A View</h1> 
        </header>
        <div>
    </div>
        <div className="App-body">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Customer</Card.Title>
              <Card.Text>
                View the customer page.
              </Card.Text>
              <Link to="/customer">
                <Button variant="primary">Customer</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Management</Card.Title>
              <Card.Text>
                View the management page.
              </Card.Text>
              <Link to="/management">
                <Button variant="primary">Management</Button>
              </Link>
            </Card.Body>
          </Card>
      </div>
    </div>
    </>
  );
}

export default App;

