import { Module } from "@/model/module.model";

export async function create(data) {
    try {
        const response = await Module.create(data);
        return JSON.parse(JSON.stringify(response));
    } catch (error) {
        throw new Error(error)
    }
}