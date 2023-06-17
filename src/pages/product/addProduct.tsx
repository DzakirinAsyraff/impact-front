import { useEffect, useState } from "react";
import { IProduct } from "../../types/product";
import { IStock } from "../../types/stock";
import { ISales } from "../../types/sales";
import { productAPI } from "../../API/productAPI";
import { Form, Card, Col, Row, Button } from "react-bootstrap";
import TopBar from "../../components/navbar";

function AddProduct() {
  const [stock, setStock] = useState<IStock>({
    barcode: "",
    defaultSupplierPrice: 0,
    defaultQuantity: 0,
    description: "",
    category: "",
    skuPrefix: "",

    history: [
      {
        date: Date.now(),
        quantity: 0,
        safetyStock: 0,
        reservedStock: 0,
        reorderPoint: 0,
        reorderQuantity: 0,
        maximumLeadTime: 0,
        averageLeadTime: 0,
      },
    ],
  });

  const [sales, setSales] = useState<ISales>({
    price: 0,
    dailySales: [
      {
        date: Date.now(),
        quantity: 0,
        total: 0,
      },
    ],
  });

  const [product, setProduct] = useState<IProduct>({
    name: "",
    barcode: "",
    description: "",
    category: "",
    stock: {
      barcode: "",
      defaultSupplierPrice: 0,
      defaultQuantity: 0,
      description: "",
      category: "",
      skuPrefix: "",

      history: [
        {
          date: Date.now(),
          quantity: 0,
          safetyStock: 0,
          reservedStock: 0,
          reorderPoint: 0,
          reorderQuantity: 0,
          maximumLeadTime: 0,
          averageLeadTime: 0,
        },
      ],
    },
    sales: {
      price: 0,
      dailySales: [
        {
          date: Date.now(),
          quantity: 0,
          total: 0,
        },
      ],
    },
  });

  const handleChangeProduct = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleChangeSales = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setSales({
      ...sales,
      [name]: value,
    });
    setProduct({
      ...product,
      sales: sales,
    });
  };

  const handleChangeStock = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setStock({
      ...stock,
      [name]: value,
    });
    setProduct({
      ...product,
      stock: stock,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    productAPI
      .addProduct(product)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <TopBar />
      <h1 className="my-3">Add Product</h1>
      <div style={{ marginLeft: "30px", maxWidth: "400px", textAlign: "left" }}>
        <form onSubmit={handleSubmit}>
          <h2>Product Details</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChangeProduct}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="barcode">Barcode:</label>
            <input
              type="text"
              id="barcode"
              name="barcode"
              onChange={handleChangeProduct}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={handleChangeProduct}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              onChange={handleChangeProduct}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Sales Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              onChange={handleChangeSales}
              className="form-control"
            />
          </div>
          <h2 className="mt-5">Stock Details</h2>
          <div className="form-group">
            <label htmlFor="stockBarcode">Stock Barcode:</label>
            <input
              type="text"
              id="stockBarcode"
              name="barcode"
              onChange={handleChangeStock}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="defaultSupplierPrice">
              Default Supplier Price:
            </label>
            <input
              type="number"
              id="defaultSupplierPrice"
              name="defaultSupplierPrice"
              onChange={handleChangeStock}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="defaultQuantity">Default Quantity:</label>
            <input
              type="number"
              id="defaultQuantity"
              name="defaultQuantity"
              onChange={handleChangeStock}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="stockDescription">Description:</label>
            <input
              type="text"
              id="stockDescription"
              name="description"
              onChange={handleChangeStock}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="stockCategory">Category:</label>
            <input
              type="text"
              id="stockCategory"
              name="category"
              onChange={handleChangeStock}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="skuPrefix">SKU Prefix:</label>
            <input
              type="text"
              id="skuPrefix"
              name="skuPrefix"
              onChange={handleChangeStock}
              className="form-control"
            />
          </div>

          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    </>
  );
}

export default AddProduct;
