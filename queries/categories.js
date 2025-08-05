import { Category } from "@/model/category-model";


export async function getCategories() {
    const categories = await Category.find({})
        .lean();

    return categories;
}

export async function getCategoryById(categoryId) {
    const category = await Category.findById(categoryId)
        .lean();

    return category;
}