import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';

export default function CartCard({ productId, quantity, subtotal }) {
  
  const { user } = useContext(UserContext);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
      });
  }, [productId]);


  return (
    <tr>
      <td>{productName}</td>
      <td>{quantity}</td>
      <td>{subtotal}</td>
    </tr>
  );
}
