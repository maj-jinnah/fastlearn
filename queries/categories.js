import { Category } from "@/model/category-model";


export async function getCategories() {
    const categories = await Category.find({})
        .lean();

    return categories;
}