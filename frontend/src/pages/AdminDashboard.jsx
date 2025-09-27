import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Navbar, Nav, Container, Card, Row, Col } from 'react-bootstrap';

const AdminDashboard = () => {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand>Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="admin-navbar" />
        <Navbar.Collapse id="admin-navbar" className="justify-content-end">
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="secondary" id="admin-dropdown">
                Management
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/admin/product">User Management</Dropdown.Item>
                <Dropdown.Item href="#/products">Product Management</Dropdown.Item>
                <Dropdown.Item href="#/discounts">Discount Management</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Dashboard Body */}
      <Container className="mt-4">
        <h3>Welcome, Admin 👋</h3>
        <p className="text-muted">Here is an overview of your platform status.</p>

        <Row className="mt-4">
          <Col md={4}>
            <Card bg="light" className="mb-4 shadow">
              <Card.Body>
                <Card.Title>Total Users</Card.Title>
                <Card.Text>20 Active Users</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card bg="light" className="mb-4 shadow">
              <Card.Body>
                <Card.Title>Products Listed</Card.Title>
                <Card.Text>11 Products available</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card bg="light" className="mb-4 shadow">
              <Card.Body>
                <Card.Title>Discounts Active</Card.Title>
                <Card.Text>2 Ongoing Discounts</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
