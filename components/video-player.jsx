// "use client";

// export const VideoPlayer = ({ url }) => {
//     return (
//         <div className="relative aspect-video">
//             <iframe
//                 className="w-full h-full"
//                 src={url || "https://www.youtube.com/watch?v=Sklc_fQBmcs"}
//                 title="YouTube video player"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 referrerPolicy="strict-origin-when-cross-origin"
//                 allowFullScreen
//             ></iframe>
//         </div>
//     );
// };

"use client";

export const VideoPlayer = ({ url }) => {
    // Convert watch link to embed link if it's a YouTube URL
    const getEmbedUrl = (url) => {
        if (!url) return "https://www.youtube.com/embed/Sklc_fQBmcs";
        return url.replace("watch?v=", "embed/");
    };

    return (
        <div className="relative aspect-video">
            {/* {url ? ( */}
                <iframe
                    className="w-full h-full"
                    src={getEmbedUrl(url)}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            {/* ) : (
                <div className="w-full h-full flex justify-center items-center">
                    You need to add your YouTube video url
                </div>
            )} */}
        </div>
    );
};
