import mongoose from "mongoose";

const Schema = mongoose.Schema
const Users = new Schema({
    email: { type: String, required: true, unique: true },
    username: {type: String, require:true},
    password: {type: String , minLength: 8},
    role: {type: String, enum: ['admin', 'user'],  default: 'user'},
    avatar: { type: String, required: true, default: 'https://res.cloudinary.com/miki-shop-dev/image/upload/v1660383816/users/jnzskcdcgw64n3lorpro.jpg' },
    cart: [
        {
          _id: false,
          product: { type: Schema.Types.ObjectId, ref: "Products" },
          quantity: { type: Number, required: true },
          name: { type: String, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          discount: { type: Number, default: 0 },
        },
      ],
})
export default mongoose.model("Users", Users)