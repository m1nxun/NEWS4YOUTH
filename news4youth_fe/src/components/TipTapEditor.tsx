// components/TipTapEditor.tsx
"use client";

import React from "react";
import "./editor.css";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  content: string;
  onChange: (html: string) => void;
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  Image.configure({ inline: false, allowBase64: true }),
  StarterKit.configure({
    bulletList: { keepMarks: true },
    orderedList: { keepMarks: true },
  }),
];

const MenuBar: React.FC = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("이미지 URL을 입력하세요");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const headingLevels = [1, 2, 3, 4, 5, 6];

  return (
    <div className="menu-bar">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          볼드
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          기울기
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          취소선
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          코드
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Marks 지우기
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Nodes 지우기
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          단락
        </button>

        {headingLevels.map((level) => (
          <button
            key={level}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as any })
                .run()
            }
            className={editor.isActive("heading", { level }) ? "is-active" : ""}
          >
            H{level}
          </button>
        ))}

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          점 리스트
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          번호 리스트
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          코드 블록
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          인용
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          수평선
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          줄바꿈
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          Redo
        </button>

        <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "is-active"
              : ""
          }
        >
          보라색
        </button>

        <button onClick={addImage}>이미지</button>
      </div>
    </div>
  );
};

const TipTapEditorWithToolbar: React.FC<Props> = ({ content, onChange }) => {
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      immediatelyRender={false}
      onUpdate={({ editor }) => {
        onChange(editor.getHTML());
      }}
      slotBefore={<MenuBar />} // ✨ 이게 핵심
    />
  );
};

export default TipTapEditorWithToolbar;
