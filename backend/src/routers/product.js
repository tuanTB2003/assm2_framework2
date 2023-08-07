import express from 'express';
import { DeleteProduct, addProduct, getProduct, getProducts, updateProduct } from '../api/products';

const routerApi = express.Router();

routerApi.get("/", getProducts)
routerApi.get("/:slug",getProduct)
routerApi.patch("/:id",updateProduct)
routerApi.delete("/:id",DeleteProduct)
routerApi.post("/",addProduct)

export default routerApi;
