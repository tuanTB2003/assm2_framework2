import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface IProductApi {
    _id?: string,
    data: {
        name: string,
        category:string,
        description: string,
        images: string[],
        price: number,
        discount: number,
        quantity: number
    }
}

const productApi = createApi({
    reducerPath:'products',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("access_token");
            headers.set("authorization", `Bearer ${token}`)
            // modify header theo từng request
            return headers;
        },
    }),
    endpoints: (builder)=>({
        getProducts: builder.query<any , void>({
            query: ()=> `/products`,
            providesTags: ['Product']
        }),
        getProductBySlug: builder.query<any , any>({
            query: (slug)=> `/products/${slug}`,
            providesTags: ['Product']

        }),
        addProduct: builder.mutation({
            query: (data:IProductApi)=>({
                url: `/products`,
                method:"POST",
                body: data
            }), 
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation<any, any>({
            query: (data:IProductApi)=>({
                url: `/products/${data._id}`,
                method:"PATCH",
                body: data.data
            }),
            invalidatesTags: ['Product']
        }),
        removeProduct: builder.mutation<any, any>({
            query: (id)=>({
                url: `/products/${id}`,
                method:"DELETE",
                // body: data.data
            }),
            invalidatesTags: ['Product']
        }),
        uploadImage: builder.mutation<any, any>({
            query: (data:any)=>({
                url: `/upload/cloudinary-upload`,
                method:"POST",
                body: data
            }),
            invalidatesTags: ['Product']
        })
    })
})


export const {useGetProductsQuery, useGetProductBySlugQuery, useAddProductMutation, useUpdateProductMutation, useUploadImageMutation , useRemoveProductMutation} = productApi
export const productReducer = productApi.reducer
export default productApi