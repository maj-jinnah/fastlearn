"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const LessonVideoPlayer = ({ courseId, lesson, module }) => {
    const [hasWindow, setHasWindow] = useState(false);
    const [started, setStarted] = useState(false);
    const [ended, setEnded] = useState(false);
    const [duration, setDuration] = useState(0);

    const router = useRouter()

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    useEffect(() => {
        async function updateLessonProgress() {
            const response = await fetch(`/api/lesson-watch`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    courseId,
                    lessonId: lesson?._id,
                    moduleSlug: module,
                    state:"completed",
                    lastTime: duration,
                }),
            });

            if(response.status === 200) {
                setEnded(false);
                router.refresh();
            }
        }

        if (ended) {
            updateLessonProgress();
        }
    }, [ended]);

    useEffect(() => {
        async function updateLessonProgress() {
            const response = await fetch(`/api/lesson-watch`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    courseId,
                    lessonId: lesson?._id,
                    moduleSlug: module,
                    state:"started",
                    lastTime: 0,
                }),
            });

            if(response.status === 200) {
                setStarted(false);
                router.refresh();
            }
        }

        if (started) {
            updateLessonProgress();
        }
    }, [started]);

    function handleOnStart() {
        // console.log("handleOnStart");
        setStarted(true);
    }

    function handleOnEnded() {
        console.log("handleOnEnded");
        setEnded(true);
    }

    function handleOnDuration(duration) {
        // console.log("handleOnDuration", duration);
        setDuration(duration);
    }

    function handleOnProgress(state) {
        //console.log("handleOnProgress", state);
    }

    return (
        <>
            {hasWindow && (
                <ReactPlayer
                    src={lesson.video_url}
                    width="100%"
                    height="470px"
                    controls
                    onStart={handleOnStart}
                    onDurationChange={handleOnDuration}
                    onProgress={handleOnProgress}
                    onEnded={handleOnEnded}
                />
            )}
        </>
    );
};

export default LessonVideoPlayer;
