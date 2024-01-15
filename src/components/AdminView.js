import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import ToggleProduct from './ToggleProduct';
import '../styles/AdminView.css';

export default function AdminView({ productsData, fetchDataFunc }) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);



  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  // Separate state variables for editing inputs
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState(0);

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  useEffect(() => {
    fetchDataFunc();
  }, []);

  const handleCreateProduct = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('access')}`
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (!data.error) {
          Swal.fire({
            title: "Successfully Created",
            icon: 'success',
            text: "You have successfully created this product"
          });
          fetchDataFunc();
          setName("");
          setDescription("");
          setPrice(0);
        } else {
          Swal.fire({
            title: "Product Creation Failed",
            icon: 'error',
            text: `${data.error}`
          });
        }
      })
  };

  const handleEditProduct = (productId) => {
    setEditProductId(productId);
    setIsEditing(true);

    const selectedProduct = products.find(product => product._id === productId);
    if (selectedProduct) {
      setEditName(selectedProduct.name);
      setEditDescription(selectedProduct.description);
      setEditPrice(selectedProduct.price);
    }
    console.log(editName)
    console.log(name)

  };

  const handleFinalizeEdit = (productId) => {

    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`
      },
      body: JSON.stringify({
        name: editName,
        description: editDescription,
        price: editPrice
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'Product Successfully Updated'
          });
          fetchDataFunc();
          setIsEditing(false);
          setEditProductId(null);
          
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: `${data.error}`
          })
        }
    });

  };

  return (
    <Container fluid className="admin-view-container">
      <div>
        <h1 className="text-center my-4">Admin Dashboard</h1>
        <table className="table table-striped table-bordered table-hover table-responsive">
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Availability</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* New row for creating a new product */}
            <tr>
              <td className='create-product-id'>Create A New Product</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Product Name"
                  disabled={isEditing}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Product Description"
                  disabled={isEditing}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="Product Price"
                  disabled={isEditing}
                />
              </td>
              <td>Default: Active</td>
              <td colSpan="2">
                {isEditing ? (
                <Button className="create-button" size="sm" disabled={true} variant="success" onClick={handleCreateProduct}>
                  Create
                </Button>
                ) : (
                <Button className="create-button" size="sm" variant="success" onClick={handleCreateProduct}>
                  Create
                </Button>
                )}
              </td>
            </tr>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  {isEditing && editProductId === product._id ? (
                    <input
                      type="text"
                      name="name"
                      value={editName}
                      onChange={(event) => setEditName(event.target.value)}
                      placeholder="Product Name"
                      className='input-edit'
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className='table-description'>
                  {isEditing && editProductId === product._id ? (
                    <input
                      type="text"
                      name="description"
                      value={editDescription}
                      onChange={(event) => setEditDescription(event.target.value)}
                      placeholder="Product Description"
                      className='input-edit'
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {isEditing && editProductId === product._id ? (
                    <input
                      type="text"
                      name="price"
                      value={editPrice}
                      onChange={(event) => setEditPrice(event.target.value)}
                      placeholder="Product Price"
                      className='input-edit'
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td>
                  <span className={`text-${product.isActive ? 'success' : 'danger'}`}>
                    {product.isActive ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td>
                  <ToggleProduct productId={product._id} isActive={product.isActive} fetchDataFunc={fetchDataFunc} />
                  {isEditing && editProductId === product._id ? (
                    <Button className="button" variant="primary" size="sm" onClick={() => handleFinalizeEdit(product._id)}>
                      Finalize Edit
                    </Button>
                  ) : (
                    <Button className="button" variant="primary" size="sm" onClick={() => handleEditProduct(product._id)}>
                      Edit Product
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}