import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import {useGetProductBySlugQuery} from '../../api/product'
import Item from 'antd/es/list/Item'

type Props = {}

const Product_detail = (props: Props) => {
    const {slug} = useParams()
    console.log(slug)
    const {data} = useGetProductBySlugQuery(slug)
    console.log(data);
    const item = data?.data

    const [count, Setcount] = useState(1)
    const countId = count;
    const increment = () => {
        return Setcount(count + 1);
    }
    const decrement = () => {
        if (countId === 1) {

        } else {
            return Setcount(count - 1); 
        }
    }
    return (
        <div className="tw-py-9 tw-bg-gray-light mt-[100px]">
            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={item?.images?.[0]} alt="..." /></div>
                        <div className="col-md-6">
                            {/* <div className="small mb-1">SKU: BST-498</div> */}
                            <h1 className="display-5 fw-bolder">{item?.name}</h1>
                            <div className="fs-5 mb-5">
                                {/* <span className="text-decoration-line-through">{item?.price}</span> */}
                                Price: 
                                <span className='text-red'>{item?.price  }</span>
                            </div>
                            <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni, accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?</p>
                            <div className="d-flex">
                                {/* <input className="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" /> */}
                                <button className="btn btn-outline-dark flex-shrink-0" type="button">
                                    <i className="bi-cart-fill me-1"></i>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
         
        </div>
    )
}

export default Product_detail