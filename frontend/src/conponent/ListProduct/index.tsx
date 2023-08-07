import React from "react";
import {useAppDispatch} from "../../app/hook";
import {useGetProductBySlugQuery, useGetProductsQuery} from "../../api/product";
import {Link} from "react-router-dom";

const ListProduct = () => {
    const dispatch = useAppDispatch();

    const {data, isLoading} = useGetProductsQuery()
    console.log(data?.data);
    // console.log(data);
    if (isLoading) return <>loading...</>
    return (
        <div>
            <div className="text-center my-4" >
                <h4>Product List</h4>
            </div>

            <section className="py-10 bg-gray-100" id="products">

                <div >
                    <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {data?.data?.map((item: any) => {
                            return (
                                <div >
                                    <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                                    <Link to={`/products/${item?.slug}`}>
                                            <div className="relative flex items-end overflow-hidden rounded-xl">
                                                <img src={item?.images} alt="Hotel Photo"  />

                                            </div>

                                            <div className="mt-1 p-2">
                                                <h3 className="text-zinc-700 font-normal">{item?.name}</h3>

                                                <div className="mt-1 flex items-end justify-between">
                                                    <p className="text-lg font-bold  text-blue-500  leading-[0.2rem]  ">${item?.price}</p>
                                                    <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                        </svg>

                                                        <button className="text-sm">Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </article>
                                </div>
                                // <div className="col-lg-4">
                                //     <div className="item">
                                //         <div className="thumb">
                                //             <div className="hover-content">
                                //                 <ul>
                                //                     <Link to={`/products/${item?.slug}`}>
                                //                         <li><a href="single-product.html"><i className="fa fa-eye"></i></a></li>
                                //                     </Link>

                                //                     <li><a href="single-product.html"><i className="fa fa-star"></i></a></li>
                                //                     <li><a href="single-product.html"><i className="fa fa-shopping-cart"></i></a></li>
                                //                 </ul>
                                //             </div>

                                //             <img src={item?.images?.[0]} alt="" className='w-[400px] h-[500px] object-cover' />

                                //         </div>


                                //         <div className="down-content">
                                //             <h4>{item?.name}</h4>
                                //             <h5>${item?.price}</h5>
                                //         </div>

                                //     </div>
                                // </div>

                            )
                        })}

                    </div>
                </div>
            </section>
        </div>


    );
};

export default ListProduct;