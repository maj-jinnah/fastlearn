import { getLoggedInUser } from "@/lib/loggedin-user";
import { Watch } from "@/model/watch-model";
import { getLesson } from "@/queries/lessons";
import { getModuleBySlug } from "@/queries/modules";
import { createWatchReport } from "@/queries/reports";
import { dbConnection } from "@/service/dbConnection";
import { NextResponse } from "next/server";

async function updateReport(userId, courseId, moduleId, lessonId) {
    try {
        await createWatchReport({ userId, courseId, moduleId, lessonId });
    } catch (error) {
        throw new Error(error)
    }
};

export async function POST(request) {
    try {
        const { courseId, lessonId, moduleSlug, state, lastTime } = await request.json();

        await dbConnection();
        const loggedInUser = await getLoggedInUser();
        const lesson = await getLesson(lessonId);
        const foundModule = await getModuleBySlug(moduleSlug);

        if (!loggedInUser) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (state !== 'started' && state !== 'completed') {
            return new NextResponse('Invalid state', { status: 400 });
        }

        if (!lesson) {
            return new NextResponse('Lesson not found', { status: 404 });
        }

        if (!foundModule) {
            return new NextResponse('Module not found', { status: 404 });
        }

        const watchData = {
            state,
            lesson: lessonId,
            user: loggedInUser._id,
            module: foundModule._id,
            lastTime
        }

        const watch = await Watch.findOne({
            lesson: lessonId,
            user: loggedInUser._id,
            module: foundModule._id
        }).lean();

        if (state === 'started') {
            if (!watch) {
                await Watch.create(watchData);
            }
        } else if (state === 'completed') {
            if (!watch) {
                await Watch.create(watchData);
                await updateReport(loggedInUser?._id, courseId, foundModule?._id, lessonId,);
            } else {
                if (watch.state === 'started') {
                    await Watch.findByIdAndUpdate(watch._id, {
                        state: "completed"
                    });
                    await updateReport(loggedInUser?._id, courseId, foundModule?._id, lessonId,);
                }
            }
        }

        return new NextResponse(JSON.stringify({ message: 'Watch state updated successfully' }), { status: 200 });
    } catch (error) {
        throw new Error(error)
    }
};