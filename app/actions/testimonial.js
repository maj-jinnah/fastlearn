'use server';

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course } from "@/model/course-model";
import { Testimonial } from "@/model/testimonial-model";
import { dbConnection } from "@/service/dbConnection";

export async function createTestimonial(data) {
    try {
        if (!data?.rating || !data?.content || !data?.courseId) {
            throw new Error("All fields are required!");
        }
        
        await dbConnection();
        const loggedInUser = await getLoggedInUser();
        if (!loggedInUser) {
            throw new Error("You are not logged in!");
        }
        
        // Add user to data
        data.user = loggedInUser._id;

        // Check if user already has a testimonial
        const testimonialExists = await Testimonial.findOne({ user: loggedInUser._id, courseId: data.courseId });
        if (testimonialExists) {
            testimonialExists.rating = data.rating;
            testimonialExists.content = data.content;
            await testimonialExists.save();
            return;
        }
        
        // Create testimonial
        const testimonial = await Testimonial.create(data);
        
        // Update course with new testimonial
        const course = await Course.findById(data.courseId);
        if (!course) {
            throw new Error("Course not found!");
        }
        
        course?.testimonials.push(testimonial._id.toString());
        await course.save();
        
    } catch (error) {
        throw error;
    }
}