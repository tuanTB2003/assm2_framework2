import mongoose from "mongoose";
import slug from 'mongoose-slug-updater'

mongoose.plugin(slug)

const Schema = mongoose.Schema;

const Product = new Schema ({
    name: {type: String , required: true},
    category:  {
        type: mongoose.Types.ObjectId,
        ref: 'Categories'
    },
    description: {type: String },
    discount: {type: Number, default: 0},
    images: {type: Array},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    rating: {type: Number},
    slug: {type: String, slug: 'name', unique: true}
},{
    versionKey: false,
    timestamps: true,
})

export default mongoose.model('Products', Product)