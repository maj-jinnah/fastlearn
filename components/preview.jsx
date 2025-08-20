"use client";
// import { useMemo } from "react";

// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.bubble.css";

// export const Preview = ({ value }) => {
//   const ReactQuill = useMemo(
//     () => dynamic(() => import("react-quill"), { ssr: false }),
//     []
//   );
//   return <ReactQuill theme="bubble" readOnly value={value} />;
// };

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.bubble.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export const Preview = ({ value }) => (
  <ReactQuill theme="bubble" readOnly value={value} />
);
