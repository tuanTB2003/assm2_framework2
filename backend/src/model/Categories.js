import mongoose from "mongoose";
import slug from 'mongoose-slug-updater'

mongoose.plugin(slug)

const Schema = mongoose.Schema
const Categories = new Schema ({
    name: { type: String, required: true },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref:'Products'
        }
    ],
    slug: { type: String, slug:'name',unique:true}

},{
    timestamps: true,
    versionKey: false,
})

export default mongoose.model("Categories", Categories)