import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

import '../styles/UserView.css';

export default function UserView({ productsData, fetchDataFunc }) {
  const [products, setProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  useEffect(() => {
    fetchDataFunc();
  }, [fetchDataFunc]);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="shop-hero" style={{ backgroundPositionY: `${scrollPosition * 0.5}px` }}>
        <div className="background-wrapper">
          <div className="background"></div>
          <div className="overlay"></div>
        </div>
        <Container>
          <div className="stacked-intro">
            <h1 className="heading">Find the furfect fit</h1>
          </div>
        </Container>
      </div>
      <div className="red-banner">
        <h1 className="off-sale">ALL ITEMS 80% OFF!</h1>
      </div>
      {/* Product grid section */}
      <div className='py-5 product-grid-section'>
        <Container fluid className='mt-5'>
          <Row>
            {products.map((product) => (
              <Col key={product._id} md={6} lg={4} className="mb-5">
                <ProductCard productData={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
