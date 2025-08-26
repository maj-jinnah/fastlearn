import { toPlainObject } from "@/lib/convert-data";
import { Category } from "@/model/category-model";


export async function getCategories() {
    const categories = await Category.find({})
        .lean();

    return toPlainObject(categories);
}

export async function getCategoryById(categoryId) {
    const category = await Category.findById(categoryId)
        .lean();

    return toPlainObject(category);
}