import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from 'quill';
// import ImageResize from 'quill-image-resize-module';

// // Register the module
// Quill.register('modules/imageResize', ImageResize);
import "./forrte.css"
// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );
    //   const quill = new Quill(editorContainer, {
    //     theme: 'snow',
    //   });
const quill = new Quill(editorContainer, {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'], // ← this enables image upload
      ['clean'],
    ],
  },
});
// const quill = new Quill(editorContainer, {
//   theme: 'snow',
//   modules: {
//     toolbar: [
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ header: [1, 2, 3, false] }],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link', 'image'],
//       ['clean'],
//     ],
//     imageResize: {
//       // Optional: resize options
//       modules: ['Resize', 'DisplaySize'],
//     },
//   },
// });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  },
);

Editor.displayName = 'Editor';

export default Editor;