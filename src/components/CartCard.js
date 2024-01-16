import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';

export default function CartCard({ cart, onEditQuantity, onRemoveItem }) {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(cart.quantity);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${cart.productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
      });
  }, [cart.productId]);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      onEditQuantity(cart.productId, quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    onEditQuantity(cart.productId, quantity + 1);
  };

  const handleRemove = () => {
    onRemoveItem(cart.productId);
  };

  return (
    <tr>
      <td>{productName}</td>
      <td>{quantity}</td>
      <td><span>&#8369;</span>{(price * quantity).toLocaleString()}</td>
      <td>
        <Button variant="outline-primary" onClick={handleDecrease}>-</Button>
        <span className="mx-2">{quantity}</span>
        <Button variant="outline-primary" onClick={handleIncrease}>+</Button>
      </td>
      <td>
        <Button variant="danger" onClick={handleRemove}>Remove</Button>
      </td>
    </tr>
  );
}
