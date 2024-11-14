'use client';
import JoditEditor from 'jodit-react';
import React, { useMemo } from 'react';

import { KEYPAIR } from '@/types/interfaces';

interface MarkdownEditorProps {
  config?: KEYPAIR;
  content: string;
  onChange?: (newContent: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  config = { askBeforePasteFromWord: false, askBeforePasteHTML: false },
  content,
  onChange,
}) => {
  const editorConfig = useMemo(() => {
    return {
      ...config,
    };
  }, [config]);

  const handleBlur = (newContent: string) => {
    if (onChange) onChange(newContent);
  };

  return <JoditEditor value={content} config={editorConfig} onBlur={handleBlur} />;
};

export default MarkdownEditor;
