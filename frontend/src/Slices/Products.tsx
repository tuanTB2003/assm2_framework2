import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loading: false,
    error: "",
    products: [],
    product: {},
    success: false
}


const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{}
})

export default productSlice.reducer