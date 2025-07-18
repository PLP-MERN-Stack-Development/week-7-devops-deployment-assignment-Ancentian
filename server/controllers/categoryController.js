const Category = require('../models/Category');

//Create a new category
exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(400).json({ message: 'Error creating category', error: error.message });
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json({ message: 'Categories fetched successfully', categories });
    }catch (error) {
        res.status(400).json({ message: 'Error fetching categories', error: error.message });
    }
}

exports.getCategoryById =  async(req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {    
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category fetched successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error: error.message });
    }
}

exports.updateCategory = async(req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
        })
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(400).json({ message: 'Error updating category', error: error.message });
    }
}

exports.deleteCategory = async(req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
}