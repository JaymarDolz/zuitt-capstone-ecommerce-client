import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import ViewCart from '../components/ViewCart';
import Swal from 'sweetalert2';
import '../styles/ItemView.css';

export default function ItemView() {
  const { productId } = useParams();
  const { user } = useContext(UserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
      });
  }, []);

  const addToCart = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === 'Item added to cart successfully') {
          Swal.fire({
            title: 'Added to Cart',
            icon: 'success',
            text: 'Item added to cart successfully',
          });
          // Fetch cart data again if needed
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Failed to add item to cart. Please try again.',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'An error occurred. Please try again later.',
        });
      });
  };

  const continueToCheckout = (event) => {
    event.preventDefault();
    // Add logic to handle continuing to checkout
  };

  return (
    <Container fluid className="p-0">
      <Row>
        <Col xs={12} lg={6} className="p-0">
          <div className="image-container"></div>
        </Col>

        <Col lg={6} className="p-0">
          <Card className="h-100">
            <Card.Body className="text-center d-flex flex-column h-100  card-container">
              <div>
                <div className="itemview-card-title">{name}</div>
                <Card.Subtitle className="mt-4 card-description">Description:</Card.Subtitle>
                <Card.Text className="mt-2 card-description">{description}</Card.Text>
              </div>
              <div>
                <Card.Subtitle className="mt-4 card-price-text">Price:</Card.Subtitle>
                <Card.Text className="card-price">
                  <span>&#8369;</span>
                  {Math.round(price / (1 - 0.8)).toLocaleString()}
                </Card.Text>
                <Card.Text className="card-price-final">
                  <span>&#8369;</span>
                  {price.toLocaleString()}
                </Card.Text>
                {user.id !== null ? (
                  <>
                    <Button
                      className="purchase-btn"
                      onClick={() => addToCart(productId)}
                    >
                      Add to Cart
                    </Button>
                  </>
                ) : (
                  <Link className="btn btn-danger btn-block" to="/login">
                    Log in to Purchase
                  </Link>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
