import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface ILogin {
    email: string,
    password: string
}
interface IRegister {
    email: string,
    password: string,
    confirmPassword:string,
    username: string
}

const authApi = createApi({
    reducerPath:'auth',
    tagTypes: ['Auth'],
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
        login: builder.mutation({
            query: (data:ILogin)=>({
                url: `/auth/login`,
                method:"POST",
                body: data
            }),
            invalidatesTags: ['Auth']
        }),
        register: builder.mutation<any, any>({
            query: (data:IRegister)=>({
                url: `/auth/register`,
                method:"PATCH",
                body: data
            }),
            invalidatesTags: ['Auth']
        })
    })
})


export const {useLoginMutation, useRegisterMutation} = authApi
export const authReducer = authApi.reducer
export default authApi