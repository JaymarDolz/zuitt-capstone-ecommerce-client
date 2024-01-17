import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import CartCard from './CartCard';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ViewCart({ fetchCartData, carts, total, cartItemCount }) {

  const [showCart, setShowCart] = useState(false);


  useEffect(() => {
    fetchCartData();
  }, []);



  const handleEditQuantity = (productId, newQuantity) => {
    // Make the API call to update the quantity
    fetch(`${process.env.REACT_APP_API_URL}/cart/update-cart-quantity`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: newQuantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the local state after a successful update
        if (data.message === 'Quantity updated successfully') {
          fetchCartData();
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Failed to update quantity'
          })
          console.error('Failed to update quantity');
        }
      })
      .catch((error) => {
        console.error('Error updating quantity:', error);
      });
  };

  const handleRemoveItem = (productId) => {
    // Make the API call to remove the item from the cart
    fetch(`${process.env.REACT_APP_API_URL}/cart/${productId}/remove-from-cart`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the local state after a successful removal
        if (data.message === 'Product removed from the cart') {
          Swal.fire({
            title: 'Deleted!',
            icon: 'success',
            text: 'Item has been deleted',
          });
          fetchCartData();
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'Failed to remove item from cart'
          })
          console.error('Failed to remove item from cart');
        }
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  };

  const handleCheckout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Checkout successful') {
          Swal.fire({
            title: 'Checkout Successful!',
            icon: 'success',
            text: 'Your order has been placed successfully.',
          });
          fetchCartData();
          setShowCart(false);
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: `Failed to checkout`
          })
          fetchCartData();
          console.error('Failed to checkout');
        }
      })
      .catch((error) => {
        console.error('Error during checkout:', error);
      });
  };

  
  const openCart = () => {
    fetchCartData();
    setShowCart(true);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  return (
    <>
      <Button className="cart-button" variant="text" onClick={openCart}>
        Cart <span className='carts-array'>{cartItemCount} </span>
      </Button>
      <Modal show={showCart} onHide={closeCart}>
        <Form>
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
                  <th>Edit Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((cart) => (
                  <CartCard
                    key={cart.productId}
                    cart={cart}
                    onEditQuantity={handleEditQuantity}
                    onRemoveItem={handleRemoveItem}
                  />
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <h4 className='ms-auto'>Total: {total.toLocaleString()}</h4>
            </div>
            <Button variant="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
