import { useEffect, useState } from "react";
import { ISKU } from "../../types/sku";
import { IProduct } from "../../types/product";
import { skuAPI } from "../../API/SKUAPI";
import { productAPI } from "../../API/productAPI";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { setAllProducts } from "../../redux/productSlice";

import {Form, Button} from "react-bootstrap";
import TopBar from "../../components/navbar";

function addSKU() {
    const [sku, setSKU] = useState<ISKU>({
        product: "",
        sku: "",
        supplierPrice: 0,
        supplierPricePerUnit: 0,
        quantityProductInStock: 0,
        orderAt: new Date(),
        dispatchAt: new Date(),
        createdAt: new Date(),
        leadTime: 0,
        canDispatch: false,
    });

    // skuprefix+ "-" + hari + bulan + tahun + "-" + index

    const dispatch = useAppDispatch();
    const products = useAppSelector((state)=>state.product);

    useEffect(() => {
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
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setSKU({
            ...sku,
            [name]: value
        });
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setSKU({
            ...sku,
            [name]: checked
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        skuAPI.addSKU(sku)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <TopBar/>
            <h1 className="my-3">Add SKU</h1>
            <div style={{marginLeft: '30px', maxWidth: '400px', textAlign: 'left'}}>
                 <form onSubmit={handleSubmit}>
                <label>
                    Product:
                    <select name="product" onChange={handleChange}>
                        <option value="">--Please choose a product--</option>
                        {products.products.map((product:IProduct) => {
                            return (
                                <option value={product._id}>{product.name}</option>
                            )
                        })}
                    </select>
                </label>
                <label>
                    SKU:
                    <input type="text" name="sku" onChange={handleChange} />
                </label>
                <label>
                    Supplier Price:
                    <input type="number" name="supplierPrice" onChange={handleChange} />
                </label>
                <label>
                    Supplier Price Per Unit:
                    <input type="number" name="supplierPricePerUnit" onChange={handleChange} />
                </label>
                <label>
                    Quantity Product In Stock:
                    <input type="number" name="quantityProductInStock" onChange={handleChange} />
                </label>
                <label>
                    Order At:
                    <input type="date" name="orderAt" onChange={handleChange} />
                </label>
                <label>
                    Dispatch At:
                    <input type="date" name="dispatchAt" onChange={handleChange} />
                </label>
                <label>
                    Created At:
                    <input type="date" name="createdAt" onChange={handleChange} />
                </label>
                <label>
                    Lead Time:
                    <input type="number" name="leadTime" onChange={handleChange} />
                </label>
                <label>
                    Can Dispatch:
                    <input type="checkbox" name="canDispatch" onChange={handleCheckboxChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>
           

        </>
    )
    
}

export default addSKU