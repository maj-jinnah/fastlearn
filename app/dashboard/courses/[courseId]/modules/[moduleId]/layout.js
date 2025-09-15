import React from 'react';

const ModulesLayout = ({children, lessons}) => {
    return (
        <>
            {lessons}
            {children}
        </>
    );
};

export default ModulesLayout;