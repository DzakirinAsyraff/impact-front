import { useState, useEffect } from "react";
import { ISKU } from "../../types/sku";
import { skuAPI } from "../../API/SKUAPI";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { productAPI } from "../../API/productAPI";
import { setAllProducts } from "../../redux/productSlice";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

function ViewSKUs() {
    const [skus, setSKUs] = useState<ISKU[]>([]);

    const dispatch = useAppDispatch();
    const products = useAppSelector((state)=>state.product);

    useEffect(() => {
        skuAPI.getAllSKUs()
            .then((response) => {
                console.log(response);
                setSKUs(response)
            })
            .catch((error) => {
                console.log(error);
            });

            if (products.products.length === 0) {
                productAPI.getAllProducts()
                    .then((response) => {
                        dispatch(setAllProducts(response))
                    }
                    )
                    .catch((error) => {
                        console.log(error);
                    }
                    );
            }

    }
    , []);

    return (
        <>
        <div>
            <h1>View SKUs</h1>
            {skus.length > 0 ? skus.map((sku:ISKU) => {
                return (
                    <div key={sku._id}>
                        <h2>{sku.product}</h2>
                        <p>ID: {sku?._id}</p>
                        {/* display product name where product id same as sku.product.id */}
                        {products.products.map((product) => {
                            if (product._id === sku.product) {
                                return (
                                    <p>Name: {product.name}</p>
                                )
                            }
                        }
                        )}
                    </div>
                )
            }
            ) : <p>No SKUs</p>}
        </div>
        <div>
            <Link to="/add-sku">Add SKU</Link>
        </div>
        </>
    )
}

export default ViewSKUs
