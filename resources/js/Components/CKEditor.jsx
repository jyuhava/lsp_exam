import { useRef, useEffect } from 'react';

// Custom upload adapter for CKEditor
class CustomUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('_token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));

                fetch('/upload-image', {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(result => {
                    if (result.url) {
                        resolve({
                            default: result.url
                        });
                    } else {
                        reject(result.error || 'Upload failed');
                    }
                })
                .catch(error => {
                    reject(error);
                });
            }));
    }

    abort() {
        // Reject the promise returned from the upload() method.
    }
}

function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new CustomUploadAdapter(loader);
    };
}

export default function CKEditor({ 
    value, 
    onChange, 
    placeholder = "Masukkan teks...", 
    style = { minHeight: '300px' }
}) {
    const editorRef = useRef(null);
    const editorInstanceRef = useRef(null);

    useEffect(() => {
        // Load CKEditor script if not already loaded
        if (!window.ClassicEditor) {
            const script = document.createElement('script');
            script.src = 'https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js';
            script.onload = initializeEditor;
            document.head.appendChild(script);
        } else {
            initializeEditor();
        }

        return () => {
            if (editorInstanceRef.current) {
                editorInstanceRef.current.destroy()
                    .catch(error => console.error('Error destroying editor:', error));
            }
        };
    }, []);

    useEffect(() => {
        if (editorInstanceRef.current && value !== editorInstanceRef.current.getData()) {
            editorInstanceRef.current.setData(value || '');
        }
    }, [value]);

    const initializeEditor = () => {
        if (editorRef.current && window.ClassicEditor) {
            window.ClassicEditor
                .create(editorRef.current, {
                    extraPlugins: [CustomUploadAdapterPlugin],
                    toolbar: {
                        items: [
                            'heading',
                            '|',
                            'bold',
                            'italic',
                            'underline',
                            'strikethrough',
                            '|',
                            'fontSize',
                            'fontColor',
                            'fontBackgroundColor',
                            '|',
                            'bulletedList',
                            'numberedList',
                            'outdent',
                            'indent',
                            '|',
                            'alignment',
                            '|',
                            'link',
                            'uploadImage',
                            'insertTable',
                            'blockQuote',
                            'codeBlock',
                            '|',
                            'undo',
                            'redo'
                        ]
                    },
                    image: {
                        toolbar: [
                            'imageTextAlternative',
                            'imageStyle:inline',
                            'imageStyle:block',
                            'imageStyle:side',
                            '|',
                            'imageStyle:alignLeft',
                            'imageStyle:alignCenter',
                            'imageStyle:alignRight'
                        ],
                        styles: [
                            'inline',
                            'block',
                            'side',
                            'alignLeft',
                            'alignCenter',
                            'alignRight'
                        ]
                    },
                    table: {
                        contentToolbar: [
                            'tableColumn',
                            'tableRow',
                            'mergeTableCells',
                            'tableCellProperties',
                            'tableProperties'
                        ]
                    },
                    placeholder: placeholder
                })
                .then(editor => {
                    editorInstanceRef.current = editor;
                    
                    // Set initial value
                    if (value) {
                        editor.setData(value);
                    }

                    // Listen for changes
                    editor.model.document.on('change:data', () => {
                        const data = editor.getData();
                        if (onChange) {
                            onChange(data);
                        }
                    });

                    // Apply custom styles
                    const editorElement = editor.ui.view.editable.element;
                    if (editorElement) {
                        Object.assign(editorElement.style, style);
                    }
                })
                .catch(error => {
                    console.error('Error initializing CKEditor:', error);
                });
        }
    };

    return (
        <div className="border border-gray-300 rounded-md ckeditor-wrapper">
            <div ref={editorRef}></div>
        </div>
    );
}
