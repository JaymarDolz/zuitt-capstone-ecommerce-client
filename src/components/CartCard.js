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
      <td className='text-center'>{productName}</td>
      <td className='text-center'>{quantity}</td>
      <td className='text-center'><span>&#8369;</span>{(price * quantity).toLocaleString()}</td>
      <td className='text-center'>
        <Button variant="outline-primary" onClick={handleDecrease}>-</Button>
        <span className="mx-2">{quantity}</span>
        <Button variant="outline-primary" onClick={handleIncrease}>+</Button>
      </td>
      <td className='text-center'>
        <Button variant="danger" onClick={handleRemove}>Remove</Button>
      </td>
    </tr>
  );
}
