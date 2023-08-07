import React, { useState } from 'react'

type Props = {}

const Cart = (props: Props) => {

    const [count, Setcount] = useState(1)
    const countId = count;
    const increment = () => {
        return Setcount(count + 1);
    }
    const decrement = () => {
        if (countId === 0) {
            confirm("Bạn có muốn xóa sản phẩm")
        } else {
            return Setcount(count - 1);
        }
    }
    return (
        <div>
            <div className="py-9 bg-gray-light">
                <div className="container">
                    <div className="grid grid-cols-12 gap-x-4">
                        <div className="col-span-12">
                            <nav>
                                <ul className="flex flex-wrap items-center justify-center">
                                    <li className="mr-5"><a href="index.html" className="text-dark font-medium text-base uppercase transition-all hover:text-orange relative before:w-5 before:h-1px before:empty before:absolute before:top-3 before:bg-dark before:transform before:rotate-115 before:-right-5">Home</a></li>
                                    <li className="text-dark font-medium text-base uppercase mr-5">Your Shopping Cart</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>




            <div className="py-24">

                <div className="container">
                    <div className="grid grid-cols-1 gap-x-5">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max">
                                <thead>
                                    <tr>
                                        <th className="bg-gray-300 p-3 border border-solid border-gray-600 text-center font-medium text-sm capitalize">Image</th>
                                        <th className="bg-gray-300 p-3 border border-solid border-gray-600 text-center font-medium text-sm capitalize">Product</th>
                                        <th className="bg-gray-300 p-3 border border-solid border-gray-600 text-center font-medium text-sm capitalize">Price</th>
                                        <th className="bg-gray-300 p-3 border border-solid border-gray-600 text-center font-medium text-sm capitalize">Quantity</th>
                                        <th className="bg-gray-300 p-3 border border-solid border-gray-600 text-center font-medium text-sm capitalize">Total</th>
                                        <th className="bg-gray-300 p-3 border border-solid border-gray-600 text-center font-medium text-sm capitalize">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td className="w-32 p-3 border border-solid border-gray-600 text-center">
                                            <a href="#">
                                                <img src="assets/images/single-product/sm/product1.webp" alt="product image" /></a>
                                        </td>
                                        <td className="p-3 border border-solid border-gray-600 text-center">
                                            <a href="#" className="transition-all hover:text-orange">Birpod product unsde</a><span>m / gold</span>
                                        </td>
                                        <td className="p-3 border border-solid border-gray-600 text-center"><span><span>$80.00</span></span></td>
                                        <td className="p-3 border border-solid border-gray-600 text-center">

                                            <div className="flex count border border-solid border-gray-300 p-2 h-11">
                                                <button  onClick={() => decrement()} className="decrement flex-auto w-5 leading-none" aria-label="button">-</button>
                                                <input type="number" min="1" max="100" step="1" value={countId} className="quantity__input flex-auto w-8 text-center focus:outline-none input-appearance-none" />
                                                <button onClick={() => increment()} className="increment flex-auto w-5 leading-none" aria-label="button">+</button>
                                            </div>
                                        </td>
                                        <td className="p-3 border border-solid border-gray-600 text-center"><span>$80.00</span></td>
                                        <td className="p-3 border border-solid border-gray-600 text-center">
                                           
                                            <a href="#" className="inline-block mx-1 hover:text-orange transition-all"><i className="icon-close"></i></a>
                                        </td>
                                    </tr>
                                 

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>



            <section className="pb-24">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
                        <div>
                            <div>
                                <h3 className="text-md font-semibold capitalize mb-8">calculate shipping</h3>
                                <form action="#">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                                        <div className="col-span-2 sm:col-span-1">
                                            <select className="border border-solid border-gray-300 bg-transparent w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base">
                                                <option>Select country</option>
                                                <option>Azerbaijan</option>
                                                <option>Bahamas</option>
                                                <option>Bahrain</option>
                                                <option>Bangladesh</option>
                                                <option>Barbados</option>
                                            </select>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <select className="border border-solid border-gray-300 bg-transparent w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base">
                                                <option>Select State</option>
                                                <option>Azerbaijan</option>
                                                <option>Bahamas</option>
                                                <option>Bahrain</option>
                                                <option>Bangladesh</option>
                                                <option>Barbados</option>
                                            </select>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <input className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" placeholder="Postcode / ZIP" type="text" />
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <a href="#" className="inline-block bg-dark leading-none py-4 px-5 md:px-8 text-sm text-white transition-all hover:bg-orange uppercase font-semibold hover:text-white mb-5 sm:mb-0">estimate</a>
                                        </div>

                                        <div className="col-span-2">
                                            <h3 className="text-md font-semibold capitalize mb-8">Discount coupon Code</h3>
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <input className="border border-solid border-gray-300 w-full py-1 px-5 mb-5 placeholder-current text-dark h-12 focus:outline-none text-base" placeholder="coupon Code" type="text" />
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <a href="#" className="inline-block bg-dark leading-none py-4 px-5 md:px-8 text-sm text-white transition-all hover:bg-orange uppercase font-semibold hover:text-white mb-8 sm:mb-0">apply
                                                code</a>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="mt-4 lg:mt-0">
                            <div className="tw-bg-gray-700 border p-10">
                                <ul className="flex flex-wrap items-center justify-between">
                                    <li className="text-base font-semibold">Product</li>
                                    <li className="text-base font-semibold">Total</li>
                                </ul>

                                <ul className="flex flex-wrap items-center justify-between">
                                    <li className="text-base font-semibold">Shipping</li>
                                    <li className="text-base font-semibold">Free shipping</li>
                                </ul>
                                <div className="border-t border-b border-gray-600 py-5 mt-5">
                                    <ul className="flex flex-wrap items-center justify-between">
                                        <li className="text-base font-semibold">Total</li>
                                        <li className="text-base font-semibold text-orange">$329</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-8">
                                <a href="#" className="inline-block bg-dark leading-none py-4 px-5 md:px-8 text-sm text-white transition-all hover:bg-orange uppercase font-semibold hover:text-white">Update Cart</a>
                                <a href="#" className="inline-block bg-dark leading-none py-4 px-5 md:px-8 text-sm text-white transition-all hover:bg-orange uppercase font-semibold hover:text-white ml-4">checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Cart