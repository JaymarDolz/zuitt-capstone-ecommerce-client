import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import testimage1 from '../images/testimage1.png';

export default function ProductCard({ productData }) {
  const { _id, name, description, price } = productData;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsTruncated(
        descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight
      );
    }
  }, [description]);

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="py-3 px-2 m-3 d-flex flex-column h-100">
      <Card.Body style={{ flex: '1' }}>
        <img src={testimage1} alt="product" className="w-100 mb-2"/>
        <Card.Title className='mt-3 text-center'>{name}</Card.Title>
        <Card.Subtitle className='mt-2 card-description'>Description:</Card.Subtitle>
        <Card.Text
          className={`product-card-description description ${isExpanded ? 'expanded' : 'product-card-description'}`}
          ref={descriptionRef}
        >
          {description}
        </Card.Text>
        {isTruncated && (
          <div className="show-more" onClick={handleToggleDescription}>
            {isExpanded ? 'Show Less' : 'Show More'}
          </div>
        )}
      </Card.Body>

      <div className="mt-auto text-center">
        <Card.Subtitle className="card-title">Price:</Card.Subtitle>
        <Card.Text className="card-price price-content">
          <span>&#8369;</span>
          {Math.round(price / (1 - 0.8)).toLocaleString()} {/* Format price with separators for hundreds */}
        </Card.Text>
        <Card.Text className="card-price-final price-content">
          <span>&#8369;</span>
          {price.toLocaleString()} {/* Format price with separators for hundreds */}
        </Card.Text>

        <Link className="details-btn" to={`/products/${_id}`}>
          Details
        </Link>
      </div>
    </Card>
  );
}
