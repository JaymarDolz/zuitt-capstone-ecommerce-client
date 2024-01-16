import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import CartCard from './CartCard';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ViewCart({ productId, continueToCheckout }) {
  const [carts, setCarts] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/get-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCarts(data.cart.cartItems);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openCart = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/add-to-cart`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          quantity: 1,
        }),
      });

      if (response.ok) {
        fetchCartData();
        setShowCart(true);
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const closeCart = () => {
    setShowCart(false);
  };

  return (
    <>
     <Button className='link-btn' onClick={openCart}> Purchase </Button>
      <Modal show={showCart} onHide={closeCart}>
        <Form onSubmit={continueToCheckout}>
          <Modal.Header closeButton>
            <Modal.Title>My Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((cart) => (
                  <CartCard
                    key={cart.productId}
                    productId={cart.productId}
                    quantity={cart.quantity}
                    subtotal={cart.subtotal}
                  />
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeCart}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Continue to Checkout
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
