import express from 'express';
import { addCate, deleteCate, getAllCate, getCate, updateCate } from '../api/categories';

const route = express.Router()

route.get('/',getAllCate)
route.get('/:id',getCate)
route.patch('/:id',updateCate)
route.delete('/:id',deleteCate)
route.post('/',addCate)
export default route