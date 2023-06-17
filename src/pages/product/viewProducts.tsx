import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { IProduct } from '../../types/product';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { productAPI } from '../../API/productAPI';
import { setAllProducts, updateSales, updateStock } from '../../redux/productSlice';
import { stockAPI } from '../../API/stockAPI';
import { salesAPI } from '../../API/salesAPI';

function ViewProducts() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product);

  useEffect(() => {
    productAPI
      .getAllProducts()
      .then((response) => {
        dispatch(setAllProducts(response));
        stockAPI
          .getAllStocks()
          .then((res_stock) => {
            dispatch(updateStock(res_stock));
          })
          .catch((err_stock) => {
            console.log(err_stock);
          });
        salesAPI
          .getAllSales()
          .then((res_sales) => {
            dispatch(updateSales(res_sales));
          })
          .catch((err_sales) => {
            console.log(err_sales);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <h1>View Products</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Barcode</th>
              <th>Category</th>
              <th>Price</th>
              <th>Amount Left in Stock</th>
              <th>Daily Sales</th>
            </tr>
          </thead>
          <tbody>
            {products.products.map((product: IProduct) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.barcode}</td>
                <td>{product.category}</td>
                <td>RM {product.sales?.price}</td>
                <td>{product.sales?.countInStock}</td>
                <td>
                  {product.sales?.dailySales?.map((sale) => (
                    <div key={sale.date.toISOString()}>
                      <p>Date: {sale.date.getDate()}</p>
                      <p>Quantity: {sale.quantity}</p>
                      <p>Total: {sale.total}</p>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div>
        <Link to="/add-product">
          <Button>Add Product</Button>
        </Link>
      </div>
    </>
  );
}

export default ViewProducts;