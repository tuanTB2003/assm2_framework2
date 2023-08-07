import Products from "../../model/Products";
import { v2 as cloudinary } from 'cloudinary';
import SchemaProduct from "../../validate/Product";
import Categories from "../../model/Categories";
import connect from "../../config/db";

export const getProducts = async (req, res) => {
    await connect()
    const { method } = req

    const { page = 1, limit = 0, category } = req.query;

    switch (method) {
        case "GET":
            try {
                const pageInstance = page - 1;
                const totalItems = await Products.countDocuments();
                const totalPages = Math.ceil(totalItems / +limit);
                if (page == 0 || page > totalPages) return res.status(404).json({ success: false, message: 'No page found' });
                if (page || limit) {
                    const findInstance = {};


                    const product = await Products.find(findInstance, {
                        name: 1,
                        discount: 1,
                        slug: 1,
                        category: 1,
                        price: 1,
                        quantity: 1,
                        images: 1,
                    }).limit(limit).skip(limit * pageInstance).populate("category")

                    return res.status(200).json(
                        {
                            success: true,
                            data: product,
                            perPage: +limit,
                            totalItems,
                            totalPages
                        }
                    )
                }
            } catch (error) {
                return res.status(500).send({ message: error })
            }
            break;

        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}
export const getProduct = async (req, res) => {
    await connect()

    const { slug } = req.params
    const method = req.method

    switch (method) {
        case "GET":
            try {
                const product = await Products.findOne({ slug: slug }).populate("category");
                if (!product) {
                    return res.status(404).send({ message: "Product not found" })
                }
                return res.status(200).send({ message: "Get product successfully", data: product })
            } catch (error) {
                return res.status(500).send({ message: error })
            }
            break;

        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}


export const DeleteProduct = async (req, res) => {
    await connect()

    const method = req.method
    const { id } = req.params

    switch (method) {
        case "DELETE":
            try {
                const product = await Products.findOne({ _id: id })
                // const arrayImg = product.imgs.map(item => {
                //     const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
                //     return "products/" + fileName
                // })
                // cloudinary.api.delete_resources(arrayImg)
                await Categories.findOneAndUpdate(
                    { _id: product.category },
                    { $pull: { products: product._id } },
                    { new: true },
                );
                const deleteProdcut = await Products.deleteOne({_id:id})
                return res.status(200).send({success:true,message: "Delete product successfully"})
            } catch (error) {
                return res.status(500).send({ message: error })
            }
            break;

        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}

export const addProduct = async (req, res) => {
    await connect()

    const method = req.method
    const data = req.body

    switch (method) {
        case "POST":
            try {                
                let { error } = SchemaProduct.validate(data)
                

                if (error) {
                    // if(data?.images && data.images.length){
                    //     const arrayImg = data.images.map(item=>{
                    //         const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
                    //         return "products/"+fileName
                    //     })
                    //     cloudinary.api.delete_resources(arrayImg)   
                    // }
                    return res.status(400).send({ message: error.message });

                }
                
                const { name, category } = data
                
                const product = await Products.findOne({ name })
                console.log('đá');

                if (product) {
                    // if(data?.images && data.images.length){
                    //     const arrayImg = data.images.map(item=>{
                    //         const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
                    //         return "products/"+fileName
                    //     })
                    //     cloudinary.api.delete_resources(arrayImg)   
                    // }
                    return res.status(400).send({ message: 'Product is exists' })
                }
                const isCate = await Categories.findOne({ _id: category })

                if (!isCate) {
                    // if(data?.images && data.images.length){
                    //     const arrayImg = data.images.map(item=>{
                    //         const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
                    //         return "products/"+fileName
                    //     })
                    //     cloudinary.api.delete_resources(arrayImg)   
                    // }
                    return res.status(400).send({ message: 'Cate not found' })
                }

                const item = await Products.create(data)
                await Categories.findByIdAndUpdate(item.category, {
                    $addToSet: {
                        products: item._id,
                    },
                });
                return res.status(200).send({ message: "Add product successfully", data: data })
            } catch (error) {
                if(data?.images && data.images.length){
                    const arrayImg = data.images.map(item=>{
                        const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
                        return "products/"+fileName
                    })
                    cloudinary.api.delete_resources(arrayImg)   
                }
                return res.status(500).send({ message: error })
            }
            break;

        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}


export const updateProduct = async (req, res) => {
    await connect()

    const method = req.method
    const { id } = req.params
    const data = req.body
    const { category } = data
    switch (method) {
        case "PATCH":
            try {
                let { error } = SchemaProduct.validate(data)
                

                if (error) {
                    // if(data?.images && data.images.length){
                    //     const arrayImg = data.images.map(item=>{
                    //         const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
                    //         return "products/"+fileName
                    //     })
                    //     cloudinary.api.delete_resources(arrayImg)   
                    // }
                    return res.status(400).send({ message: error.message });

                }
                const product = await Products.findOne({ _id: id })

                if (!product) {
                    // if(data?.images && data.images.length){
                    //     const arrayImg = data.images.map(item=>{
                    //         const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
                    //         return "products/"+fileName
                    //     })
                    //     cloudinary.api.delete_resources(arrayImg)   
                    // }
                    return res.status(400).send({ message: 'Product not found' })
                }
                const isCate = await Categories.findOne({ _id: category })

                if (!isCate) {
                    if (imgs.length) {
                        const arrayImg = imgs.map(item => {
                            const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
                            return "products/" + fileName
                        })
                        cloudinary.api.delete_resources(arrayImg)
                    }
                    return res.status(404).send({ message: "Categories not found" });
                }
                const productUpdate = await Products.findOneAndUpdate({ _id: id }, { $set: data }, { new: true, useFindAndModify: false })
                await Categories.findByIdAndUpdate(category, {
                    $addToSet: {
                        products: id,
                    },
                });
                await Categories.findByIdAndUpdate(product.category, {
                    $pull: {
                        products: id,
                    },
                });
                return res.status(200).send({ message: "Update product successfully", data: productUpdate })
                
            } catch (error) {
                if(data?.images && data.images.length){
                    const arrayImg = data.images.map(item=>{
                        const fileName = item.split('/').pop().replace(/\.[^/.]+$/, '');
                        return "products/"+fileName
                    })
                    cloudinary.api.delete_resources(arrayImg)   
                }
                return res.status(500).send({ message: error })
            }
            break;

        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }
}