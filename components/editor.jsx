"use client";
// import { useMemo } from "react";

// import dynamic from "next/dynamic";
// import 'react-quill-new/dist/quill.bubble.css';
// // import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

// export const Editor = ({ onChange, value }) => {
//   // const ReactQuill = useMemo(
//   //   () => dynamic(() => import("react-quill-new"), { ssr: false }),
//   //   []
//   // );
//   return (
//     <div className="bg-white">
//       <ReactQuill theme="snow" value={value} onChange={onChange} />
//     </div>
//   );
// };


// New Quill
// import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });


export function Editor({ onChange, value }) {
    return <ReactQuill theme="snow" value={value} onChange={onChange} />;
}
