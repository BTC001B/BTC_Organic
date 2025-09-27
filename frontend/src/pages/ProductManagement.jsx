import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Navbar, Dropdown, Modal, Form } from 'react-bootstrap';

const ProductManagement = () => {
  // Dummy product list
  const [products, setProducts] = useState([
    { id: 1, name: 'Tomato', price: 28, stock: 120 },
    { id: 2, name: 'Banana', price: 25, stock: 80 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

  const handleAddProduct = () => {
    setProducts([...products, { id: products.length + 1, ...newProduct }]);
    setShowAddModal(false);
    setNewProduct({ name: '', price: '', stock: '' });
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" className="px-4">
        <Navbar.Brand>Product Management</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Dropdown align="end">
            <Dropdown.Toggle variant="secondary" id="product-dropdown">
              Actions
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShowAddModal(true)}>Add Product</Dropdown.Item>
              <Dropdown.Item href="#/update">Update Product</Dropdown.Item>
              <Dropdown.Item href="#/delete">Delete Product</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>

      {/* Product Table */}
      <Container className="mt-4">
        <h4>Available Products</h4>
        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">No products found</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="productName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="productPrice" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
              />
            </Form.Group>
            <Form.Group controlId="productStock" className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock count"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductManagement;
