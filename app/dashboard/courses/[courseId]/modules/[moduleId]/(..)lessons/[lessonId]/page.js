import React from 'react';

const LessonPage = async ({params}) => {
    const { courseId, moduleId, lessonId } = await params;

    console.log('params id get', courseId, moduleId, lessonId)
    return (
        <div>
            <h1>Interceptor lesson router --- Hi, guys</h1>
        </div>
    );
};

export default LessonPage;