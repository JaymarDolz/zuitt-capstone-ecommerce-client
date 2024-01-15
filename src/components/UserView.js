import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

import '../styles/UserView.css';

export default function UserView({ productsData, fetchDataFunc }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  useEffect(() => {
    fetchDataFunc();
  }, [fetchDataFunc]);

  console.log(productsData);

  return (
    <div>
      <div className="shop-hero">
        <div className="background-wrapper">
          <div className="background"></div>
          <div className="overlay"></div>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="stacked-intro">
                <h1 className="heading extra-large">Find the furfect fit</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4 gap-4">
              <ProductCard productData={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
