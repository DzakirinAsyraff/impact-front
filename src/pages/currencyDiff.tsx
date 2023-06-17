import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { IProduct } from '../types/product';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { productAPI } from '../API/productAPI';
import { setAllProducts, updateSales, updateStock } from '../redux/productSlice';
import { salesAPI } from '../API/salesAPI';
import axios from 'axios';
import TopBar from "../components/navbar";


const fetchExchangeRate = async () => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    return response.data.rates;
  } catch (error) {
    console.log(error);
    return null;
  }
};

function ViewProducts() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product);
  const [conversionRate, setConversionRate] = useState(1);

  useEffect(() => {
    productAPI
      .getAllProducts()
      .then((response) => {
        dispatch(setAllProducts(response));
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

  useEffect(() => {
    const fetchConversionRate = async () => {
      const rates = await fetchExchangeRate();
      if (rates && rates.MYR) {
        setConversionRate(rates.MYR);
      }
    };

    fetchConversionRate();
  }, []);

  const convertCurrency = (amount: number | undefined, isUsd: boolean): string => {
    if (amount === undefined) {
      return '';
    }
    
    const convertedAmount = isUsd ? amount / conversionRate : amount;
    return convertedAmount.toFixed(2);
  };
  

  return (
    <>
      <TopBar/>
      <div>
        <h1>Real Time Product Price Exchange Rate</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Barcode</th>
              <th>Category</th>
              <th>Price (MYR)</th>
              <th>Price (USD)</th>
   
            </tr>
          </thead>
          <tbody>
            {products.products.map((product: IProduct) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.barcode}</td>
                <td>{product.category}</td>
                <td>{convertCurrency(product.sales?.price, false)}</td>
                <td>{convertCurrency(product.sales?.price, true)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ViewProducts;
