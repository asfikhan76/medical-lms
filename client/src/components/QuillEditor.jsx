// src/components/QuillEditor.js
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Snow theme CSS

const QuillEditor = ({ initialValue = '', onChange }) => {
    const quillRef = useRef(null);
    const editorRef = useRef(null);

    useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                    ],
                },
            });
            // Set initial value
            editorRef.current.root.innerHTML = initialValue;

            // Listen for changes
            editorRef.current.on('text-change', () => {
                const content = editorRef.current.root.innerHTML;
                console.log(content)
                if (onChange) onChange(content);
            });
        }

        // Set initial value if it changes
        if (editorRef.current && initialValue !== editorRef.current.root.innerHTML) {
            editorRef.current.root.innerHTML = initialValue;
        }

        // Cleanup
        return () => {
            if (editorRef.current) {
                editorRef.current = null;
            }
        };
    }, []);

    return (
        <div className="w-full">
            <div ref={quillRef} className="bg-white border border-gray-300 min-h-[100px]" />
        </div>
    );
};

export default QuillEditor;