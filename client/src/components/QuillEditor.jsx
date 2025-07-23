// src/components/QuillEditor.js - Alternative approach
import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = ({ initialValue = '', onChange }) => {
    const containerRef = useRef(null);
    const quillRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false); // cleanup function to set mounted to false when component unmounts
    }, []);

    useEffect(() => {
        if (!mounted || !containerRef.current) return; // if not mounted or containerRef is not ready, return

        // Clean up any existing instance
        if (quillRef.current) {
            try {
                quillRef.current.off('text-change');
                containerRef.current.innerHTML = '';
                quillRef.current = null;
            } catch (e) {
                console.warn('Cleanup error:', e);
            }
        }

        // Force a clean slate
        containerRef.current.innerHTML = '';

        // Add a small delay to ensure cleanup is complete
        const initTimer = setTimeout(() => {
            if (!mounted || !containerRef.current) return;

            try {
                // Create Quill instance
                quillRef.current = new Quill(containerRef.current, {
                    theme: 'snow',
                    modules: {
                        toolbar: [
                            [{ header: [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                        ],
                    },
                });

                // Set initial content
                if (initialValue) {
                    quillRef.current.clipboard.dangerouslyPasteHTML(initialValue);
                }

                // Add event listener
                quillRef.current.on('text-change', () => {
                    if (quillRef.current && onChange && mounted) {
                        const content = quillRef.current.root.innerHTML;
                        onChange(content);
                    }
                });

                setIsReady(true);
            } catch (error) {
                console.error('Error creating Quill editor:', error);
            }
        }, 10);

        return () => {
            clearTimeout(initTimer);
            setIsReady(false);
            if (quillRef.current) {
                try {
                    quillRef.current.off('text-change');
                    quillRef.current = null;
                } catch (e) {
                    console.warn('Cleanup error:', e);
                }
            }
        };
    }, [mounted]); // Only depend on mounted state

    // Handle initialValue changes
    useEffect(() => {
        if (quillRef.current && isReady && mounted) {
            const currentContent = quillRef.current.root.innerHTML;
            if (initialValue !== currentContent) {
                quillRef.current.clipboard.dangerouslyPasteHTML(initialValue || '');
            }
        }
    }, [initialValue, isReady, mounted]);

    if (!mounted) {
        return <div className="w-full h-[100px] bg-gray-100 animate-pulse rounded"></div>;
    }

    return (
        <div className="w-full">
            <div
                ref={containerRef}
                className="bg-white border border-gray-300 min-h-[100px] rounded"
                style={{ fontSize: '14px' }}
            />
        </div>
    );
};

export default QuillEditor;