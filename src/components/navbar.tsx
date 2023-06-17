import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function TopBar() {
  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">InveConsultor</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              <NavDropdown title="Product" id="basic-nav-dropdown">
                <NavDropdown.Item href="/add-product">Add Product</NavDropdown.Item>
                <NavDropdown.Item href="/view-products">
                  View Product
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="SKU" id="basic-nav-dropdown">
                <NavDropdown.Item href="/add-sku">Add SKU</NavDropdown.Item>
                <NavDropdown.Item href="/view-skus">
                  View Product
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/mixmatch">Mix and Match</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;

{/* <Nav.Link href="/view-SKUs">View SKUs</Nav.Link> */}
{/* <NavDropdown.Item href="#action/3.3">
                  View Product
                </NavDropdown.Item> */}
                {/* <NavDropdown.Divider /> */}