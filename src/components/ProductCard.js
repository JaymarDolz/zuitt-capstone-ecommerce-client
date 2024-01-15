import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ productData }) {
  const { _id, name, description, price } = productData;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>{price}</Card.Text>
        <Link className="btn btn-primary" to={`/products/${_id}`}>
          Details
        </Link>
      </Card.Body>
    </Card>
  );
}
