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

const fetchHistoricalExchangeRate = async () => {
  try {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const response = await axios.get(`https://v6.exchangerate-api.com/v6/fd0c5f233797328f5958f65e/history/USD/${year}/${month}/${day}/14`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

function ViewProducts() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product);
  const [conversionRate, setConversionRate] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [historicalData, setHistoricalData] = useState({});
  const [restockDecision, setRestockDecision] = useState<{ decision: string, rateDifference: number, description: string }>({ decision: '', rateDifference: 0, description: '' });

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
    const fetchData = async () => {
      const rates = await fetchExchangeRate();
      if (rates && rates.MYR) {
        setConversionRate(rates.MYR);
        setExchangeRate(rates.MYR.toFixed(2));
      }

      const historicalRates = await fetchHistoricalExchangeRate();
      if (historicalRates && historicalRates.rates && historicalRates.rates.MYR) {
        setHistoricalData(historicalRates.rates.MYR);
        calculateRestockDecision(rates.MYR, historicalRates.rates.MYR);
      }
    };

    fetchData();
  }, []);

  const convertCurrency = (amount: number | undefined, isUsd: boolean) => {
    if (amount === undefined) {
      return '';
    }

    const convertedAmount = isUsd ? amount / conversionRate : amount;
    return convertedAmount.toFixed(2);
  };

  const getPriceGapIndicator = (priceMyr: number, priceUsd: number) => {
    const priceDifference = priceMyr - priceUsd * conversionRate;
    const threshold = 10; // Example threshold value (you can adjust it according to your needs)

    if (priceDifference > threshold) {
      return { indicator: 'Benefits', isBeneficial: true };
    } else if (priceDifference < -threshold) {
      return { indicator: 'Not beneficial', isBeneficial: false };
    } else {
      return { indicator: 'Equal', isBeneficial: false };
    }
  };

  const calculateRestockDecision = (currentRate: number, historicalRates: { [x: string]: number }) => {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(endDate.getDate() - 14);
  
    const rateDifference = currentRate - historicalRates[startDate.toISOString().split('T')[0]];
    let decision = '';
    let description = '';
  
    if (rateDifference > 0) {
      decision = 'Restock';
      description = `The current exchange rate has increased by ${rateDifference.toFixed(2)} compared to the historical data. It is beneficial to restock now.`;
    } else if (rateDifference < 0) {
      decision = 'Hold off restocking';
      description = `The current exchange rate has decreased by ${Math.abs(rateDifference).toFixed(2)} compared to the historical data. It is not beneficial to restock at the moment.`;
    } else {
      decision = 'No change';
      description = 'The current exchange rate is the same as the historical data. There is no significant difference to consider for restocking.';
    }
  
    setRestockDecision({ decision, rateDifference, description });
  };
  
  const shouldRestock = (priceMyr: number, priceUsd: number) => {
    const { isBeneficial } = getPriceGapIndicator(priceMyr, priceUsd);
    return isBeneficial && priceMyr < priceUsd * conversionRate;
  };

  return (
    <>
      <TopBar />
      <div className="exchange-rate">
        <h2>Exchange Rate: 1 USD = {exchangeRate} MYR</h2>
        {restockDecision.decision && (
          <>
            <h3>Restocking Decision: {restockDecision.decision} ({restockDecision.rateDifference.toFixed(2)})</h3>
            <p>{restockDecision.description}</p>
          </>
        )}
      </div>
      <div>
        <h1>Real-Time Product Price Exchange Rate</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Barcode</th>
              <th>Category</th>
              <th>Price (MYR)</th>
              <th>Price (USD)</th>
              <th>Price Gap</th>
              <th>Restock</th>
            </tr>
          </thead>
          <tbody>
            {products.products.map((product) => {
              const priceMyr = parseFloat(convertCurrency(product.sales?.price, false));
              const priceUsd = parseFloat(convertCurrency(product.sales?.price, true));
              const { indicator } = getPriceGapIndicator(priceMyr, priceUsd);
              const shouldRestockProduct = shouldRestock(priceMyr, priceUsd);

              return (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.barcode}</td>
                  <td>{product.category}</td>
                  <td>{priceMyr.toFixed(2)}</td>
                  <td>{priceUsd.toFixed(2)}</td>
                  <td className={indicator === 'Benefits' ? 'beneficial' : indicator === 'Not beneficial' ? 'not-beneficial' : ''}>
                    {indicator}
                  </td>
                  <td>{shouldRestockProduct ? 'Yes' : 'No'}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ViewProducts;
