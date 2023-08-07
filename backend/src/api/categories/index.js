import connect from "../../config/db"
import Categories from "../../model/Categories"
import Products from "../../model/Products"
import { cateSchema } from "../../validate/Categories"


export const getAllCate = async function (req,res){
    await connect()
    const method = req.method
    const { page = 1, limit = 0, category } = req.query;
    switch (method) {
        case "GET":
            try {
                const pageInstance = page - 1;
                const totalItems = await Categories.countDocuments();
                const totalPages = Math.ceil(totalItems / +limit);
                if (page == 0 || page > totalPages) return res.status(404).json({ success: false, message: 'No page found' });
                if (page || limit) {
                    const findInstance = {};
                    console.log('đâs');
                    
                    const data = await Categories.find().limit(limit).skip(limit * pageInstance).populate({path: 'products'})
                    return res.status(200).json(
                        {
                            success: true,
                            data: data,
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
export const getCate = async function (req,res){
    await connect()
    const method = req.method
    const {id} = req.params
    switch (method) {
        case "GET":
            try {
                const data = await Categories.findOne({_id: id}).populate("products")
                if (!data) {
                    return res.status(400).json({
                        success:false,
                        message: 'Category not found',
                        data:[]
                    })
                }
                return res.status(200).json({
                    success:true,
                    message: "Get categories successfully",
                    data: data
                })
            } catch (error) {
                return res.status(500).send({ message: error })
            }
            break;
    
        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }

}

export const addCate = async function (req,res){
    await connect()
    const method = req.method
    const { name } = req.body;
    switch (method) {
        case "POST":
            try {
                const { error } = cateSchema.validate(req.body)
                if (error) {
                    return res.status(400).json({ message: error.details[0].message });
                }
                const isDeclared = await Categories.findOne({ name })
                if (isDeclared) {
                    return res.status(400).json({
                        message: "Category already exists",
                        data: []
                    })
                }
                const category = await Categories.create(req.body);
                if (!category) {
                    return res.status(400).json({
                        message: "Thêm danh muc thất bại",
                        datas: [],
                    });
                }
                return res.status(200).json({
                    message: "Thêm danh muc thành công",
                    data: category,
                });
            } catch (error) {
                return res.status(500).send({ message: error })
            }
            break;
    
        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }

}
export const deleteCate = async function (req,res){
    await connect()
    const method = req.method
    const {id} = req.params
    switch (method) {
        case "DELETE":
            try {
                const data = await Categories.findOne({_id: id})
                if (!data) {
                    return res.status(400).json({
                        message: 'Category not found'
                    })
                }
                await Products.updateMany({category:id},{$set:{category:'64ca34ed3dd995caf0f8d3cb'}})
                const updateProduct = await Products.find({ category: "64ca34ed3dd995caf0f8d3cb" });
                const updatedProductIds = updateProduct.map((product) => product._id.toString());
                await Categories.findByIdAndUpdate('64ca34ed3dd995caf0f8d3cb', {
                    $addToSet: {
                        products: updatedProductIds,
                    },
                });
                await Categories.deleteOne({_id: id})
                return res.status(200).json({
                    message: "Delete categories successfully",
                })
            } catch (error) {
                return res.status(500).send({ message: error })
            }
            break;
    
        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }

}

export const updateCate = async function (req,res){
    await connect()
    const method = req.method
    const dataReq = req.body
    const {id} = req.params
    switch (method) {
        case "PATCH":
            try {
                const { error } = cateSchema.validate(dataReq)
                if (error) {
                    return res.status(400).json({ message: error.message });
                }
                const { name } = dataReq
                const data = await Categories.findOne({ _id: id })
                if (!data) {
                    return res.status(400).json({
                        message: 'Category not found'
                    })
                }

                if(name !== data.name){
                    const isNameReady = await Categories.findOne({name})
                    if(isNameReady) {
                        return res.status(400).json({ message: "Categories is exists" })
                    }

                }

                const cateUpdate = await Categories.findOneAndUpdate({ _id: id }, { $set:dataReq }, { new: true, useFindAndModify: false })
                return res.status(200).json({
                    message: "Update categories successfully",
                    data: cateUpdate
                })
            } catch (error) {
                return res.status(500).send({ message: error })
            }
            break;
    
        default:
            return res.status(404).send({ message: "Method not found" })
            break;
    }

}