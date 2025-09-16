import { toPlainObject } from "@/lib/convert-data";
import { Category } from "@/model/category-model";
import { dbConnection } from "@/service/dbConnection";


export async function getCategories() {
    try {
        await dbConnection();
        
        const categories = await Category.find({})
            .lean();

        return toPlainObject(categories);
    } catch (error) {
        throw new Error(error)
    }
}

export async function getCategoryById(categoryId) {
    try {
        await dbConnection();

        const category = await Category.findById(categoryId)
            .lean();

        return toPlainObject(category);
    } catch (error) {
        throw new Error(error)
    }
}