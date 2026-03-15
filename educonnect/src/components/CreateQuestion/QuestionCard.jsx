import { useEditor, EditorContent } from '@tiptap/react'
import { useState, useRef, useEffect } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import CodeBlock from '@tiptap/extension-code-block'
import Icon from '../common/Icon'

// ─── Question Types ───────────────────────────────────────────────────────────
export const QUESTION_TYPES = [
  { value: 'short',     label: 'Short Answer' },
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'mcq',       label: 'Multiple Choice' },
  { value: 'checkbox',  label: 'Checkboxes' },
  { value: 'dropdown',  label: 'Dropdown' },
  { value: 'file',      label: 'File Upload' },
]

const HAS_OPTIONS = ['mcq', 'checkbox', 'dropdown']
const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F']

// ─── 3-dot Dropdown Menu ──────────────────────────────────────────────────────
function ThreeDotMenu({ index, onDuplicate, onDelete }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={menuRef} className="relative md:hidden" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        aria-label="More options"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        className="p-1.5 rounded-lg text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Icon name="more-vertical" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden z-50"
        >
          {onDuplicate && (
            <button
              type="button"
              role="menuitem"
              onClick={() => { onDuplicate(index); setOpen(false) }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Icon name="copy" aria-hidden="true" className="text-slate-400" />
              Duplicate
            </button>
          )}
          <button
            type="button"
            role="menuitem"
            onClick={() => { onDelete(index); setOpen(false) }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Icon name="trash-2" aria-hidden="true" />
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Desktop Action Buttons ───────────────────────────────────────────────────
function DesktopActions({ index, onDuplicate, onDelete }) {
  return (
    <div className="hidden md:flex items-center gap-1">
      {onDuplicate && (
        <button
          type="button"
          onClick={() => onDuplicate(index)}
          aria-label={`Duplicate question ${index + 1}`}
          className="p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <Icon name="copy" aria-hidden="true" />
        </button>
      )}
      <button
        type="button"
        onClick={() => onDelete(index)}
        aria-label={`Delete question ${index + 1}`}
        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
      >
        <Icon name="trash-2" aria-hidden="true" />
      </button>
    </div>
  )
}

// ─── Toolbar Button ───────────────────────────────────────────────────────────
function ToolbarBtn({ onClick, active, title, children }) {
  return (
    <button
      type="button"
      aria-label={title}
      aria-pressed={active}
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      title={title}
      className={`
        w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1
        ${active
          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-700 dark:hover:text-slate-200'
        }
      `}
    >
      {children}
    </button>
  )
}

// ─── Rich Text Editor ─────────────────────────────────────────────────────────
function RichTextEditor({ value, onChange, placeholder }) {
  const [imageSelected, setImageSelected] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      CodeBlock,
      Image.configure({ inline: false, allowBase64: true }),
    ],
    content: value || '',
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    onSelectionUpdate({ editor }) {
      const { node } = editor.state.selection
      setImageSelected(!!node && node.type.name === 'image')
    },
    editorProps: {
      attributes: {
        role: 'textbox',
        'aria-multiline': 'true',
        'aria-label': 'Question text editor',
        class: 'outline-none min-h-[90px] px-3 py-2.5 text-slate-900 dark:text-white text-sm leading-relaxed',
      },
    },
  })

  if (!editor) return null

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }

  const removeSelectedImage = () => {
    editor.chain().focus().deleteSelection().run()
    setImageSelected(false)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
      <div
        role="toolbar"
        aria-label="Text formatting"
        className="flex items-center gap-0.5 px-2 py-1.5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 flex-wrap"
      >
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
          <span className="font-extrabold">B</span>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
          <span className="italic font-serif">I</span>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
          <span className="underline">U</span>
        </ToolbarBtn>

        <div aria-hidden="true" className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/>
            <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/>
            <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/>
          </svg>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/>
            <text x="1" y="8" fontSize="7" fill="currentColor" stroke="none" fontWeight="bold">1.</text>
            <text x="1" y="14" fontSize="7" fill="currentColor" stroke="none" fontWeight="bold">2.</text>
            <text x="1" y="20" fontSize="7" fill="currentColor" stroke="none" fontWeight="bold">3.</text>
          </svg>
        </ToolbarBtn>

        <div aria-hidden="true" className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />

        <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
        </ToolbarBtn>

        {imageSelected ? (
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); removeSelectedImage() }}
            aria-label="Remove selected image"
            title="Remove image"
            className="flex items-center gap-1.5 px-2.5 h-8 rounded-lg text-xs font-semibold bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
            Remove image
          </button>
        ) : (
          <ToolbarBtn onClick={addImage} active={false} title="Insert image">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </ToolbarBtn>
        )}

        <div aria-hidden="true" className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" />

        <ToolbarBtn onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} active={false} title="Clear formatting">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M12 5l-8 8 3 3 8-8"/><path d="M15 6l3 3"/><line x1="3" y1="21" x2="21" y2="21"/>
          </svg>
        </ToolbarBtn>
      </div>

      <div className="relative bg-white dark:bg-slate-800">
        {editor.isEmpty && (
          <p aria-hidden="true" className="absolute top-2.5 left-3 text-sm text-slate-400 dark:text-slate-500 pointer-events-none select-none">
            {placeholder || 'Enter your question here...'}
          </p>
        )}
        <EditorContent editor={editor} />
      </div>

      <style>{`
        .tiptap ul { list-style: disc; padding-left: 1.25rem; margin: 0.25rem 0; }
        .tiptap ol { list-style: decimal; padding-left: 1.25rem; margin: 0.25rem 0; }
        .tiptap pre { background: #1e293b; color: #e2e8f0; border-radius: 8px; padding: 10px 14px; font-size: 0.8rem; margin: 4px 0; overflow-x: auto; }
        .tiptap code { font-family: 'Fira Code', monospace; }
        .tiptap p { margin: 0; }
        .tiptap p + p { margin-top: 0.4rem; }
        .tiptap img { max-width: 100%; border-radius: 8px; margin: 4px 0; display: block; cursor: pointer; }
        .tiptap img.ProseMirror-selectednode { outline: none; }
      `}</style>
    </div>
  )
}

// ─── Options Editor ───────────────────────────────────────────────────────────
function OptionsEditor({ question, index, onUpdate }) {
  const isCheckbox = question.type === 'checkbox'

  const addOption = () => onUpdate(index, 'options', [...question.options, ''])

  const removeOption = (optIndex) => {
    if (question.options.length <= 2) { alert('Must have at least 2 options'); return }
    const newOptions = question.options.filter((_, i) => i !== optIndex)
    onUpdate(index, 'options', newOptions)
    if (!isCheckbox) {
      if (question.correctAnswer === optIndex) onUpdate(index, 'correctAnswer', null)
      else if (question.correctAnswer > optIndex) onUpdate(index, 'correctAnswer', question.correctAnswer - 1)
    } else {
      const updated = (question.correctAnswers ?? [])
        .filter(a => a !== optIndex)
        .map(a => a > optIndex ? a - 1 : a)
      onUpdate(index, 'correctAnswers', updated)
    }
  }

  const updateOption = (optIndex, value) => {
    const newOptions = [...question.options]
    newOptions[optIndex] = value
    onUpdate(index, 'options', newOptions)
  }

  const toggleCheckboxAnswer = (optIndex) => {
    const current = question.correctAnswers ?? []
    const updated = current.includes(optIndex)
      ? current.filter(a => a !== optIndex)
      : [...current, optIndex]
    onUpdate(index, 'correctAnswers', updated)
  }

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
          Options
        </label>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
          {isCheckbox ? 'tick all correct answers' : 'click circle to mark correct'}
        </span>
      </div>

      <div className="space-y-2.5" role="list" aria-label="Answer options">
        {question.options.map((option, optIndex) => {
          const isCorrect = isCheckbox
            ? (question.correctAnswers ?? []).includes(optIndex)
            : question.correctAnswer === optIndex

          return (
            <div key={optIndex} role="listitem" className="flex items-center gap-3">
              <button
                type="button"
                aria-label={`Mark option ${OPTION_LABELS[optIndex] ?? optIndex + 1} as correct${isCorrect ? ' (currently correct)' : ''}`}
                aria-pressed={isCorrect}
                onClick={() => isCheckbox ? toggleCheckboxAnswer(optIndex) : onUpdate(index, 'correctAnswer', optIndex)}
                className={`
                  shrink-0 flex items-center justify-center transition-all
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1
                  ${isCheckbox
                    ? `w-5 h-5 rounded border-2 ${isCorrect ? 'border-blue-500 bg-blue-500' : 'border-slate-300 dark:border-slate-600'}`
                    : `w-6 h-6 rounded-full border-2 ${isCorrect ? 'border-blue-500 bg-blue-500' : 'border-slate-300 dark:border-slate-600'}`
                  }
                `}
              >
                {isCorrect && (
                  isCheckbox
                    ? <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </button>

              <span aria-hidden="true" className="w-5 text-xs font-bold text-slate-400 shrink-0">
                {OPTION_LABELS[optIndex] ?? optIndex + 1}
              </span>

              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(optIndex, e.target.value)}
                placeholder={`Option ${OPTION_LABELS[optIndex] ?? optIndex + 1}`}
                aria-label={`Option ${OPTION_LABELS[optIndex] ?? optIndex + 1}${isCorrect ? ' — marked as correct' : ''}`}
                className={`
                  flex-1 border rounded-xl px-3 py-2 text-sm outline-none transition-all
                  text-slate-900 dark:text-white placeholder:text-slate-400
                  focus-visible:ring-2 focus-visible:ring-blue-500
                  ${isCorrect
                    ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-600'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-blue-400'
                  }
                `}
              />

              {question.options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(optIndex)}
                  aria-label={`Remove option ${OPTION_LABELS[optIndex] ?? optIndex + 1}`}
                  className="p-1.5 rounded-lg text-slate-300 dark:text-slate-600 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  <Icon name="x" aria-hidden="true" />
                </button>
              )}
            </div>
          )
        })}
      </div>

      <button
        type="button"
        onClick={addOption}
        className="mt-3 flex items-center gap-2 text-sm font-semibold text-blue-500 hover:text-blue-600 px-2 py-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Icon name="plus" aria-hidden="true" />
        Add option
      </button>
    </div>
  )
}

// ─── Collapsed Preview ────────────────────────────────────────────────────────
function CollapsedPreview({ question, index, onActivate, onDelete, onDuplicate }) {
  const typeLabel = QUESTION_TYPES.find(t => t.value === question.type)?.label ?? question.type
  const plainText = question.text ? question.text.replace(/<[^>]*>/g, '').trim() : ''
  const hasOptions = HAS_OPTIONS.includes(question.type)
  const optionCount = question.options?.filter(o => o.trim()).length ?? 0
  const answerSet = question.correctAnswer !== null || (question.correctAnswers ?? []).length > 0

  const subtitle = hasOptions
    ? `${optionCount} option${optionCount !== 1 ? 's' : ''}${answerSet ? ' · answer set' : ' · no answer set'}${question.required ? ' · Required' : ''}`
    : `${typeLabel}${question.required ? ' · Required' : ''}`

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Question ${index + 1}: ${plainText || 'Untitled question'}. Click to edit.`}
      onClick={onActivate}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate() } }}
      className="flex items-center gap-3 px-4 py-3.5 cursor-pointer rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {/* Number badge */}
      <span aria-hidden="true" className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-bold flex items-center justify-center shrink-0">
        {index + 1}
      </span>

      {/* Text + subtitle */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${plainText ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500 italic font-normal'}`}>
          {plainText || 'Untitled question'}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">{subtitle}</p>
      </div>

      {/* Type badge — desktop only */}
      <span className="hidden sm:inline text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 shrink-0">
        {typeLabel}
      </span>

      {/* Desktop: inline icon buttons */}
      <DesktopActions index={index} onDuplicate={onDuplicate} onDelete={onDelete} />

      {/* Mobile: 3-dot menu */}
      <ThreeDotMenu index={index} onDuplicate={onDuplicate} onDelete={onDelete} />
    </div>
  )
}

// ─── Active Card ──────────────────────────────────────────────────────────────
function ActiveCard({ question, index, questionType, onUpdate, onDelete, onDuplicate }) {
  const hasOptions = HAS_OPTIONS.includes(question.type)
  const requiredToggleId = `q${index}-required`
  const ptsInputId = `q${index}-points`

  return (
    <div
      role="region"
      aria-label={`Editing question ${index + 1}`}
      className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-blue-500 shadow-lg shadow-blue-100/40 dark:shadow-blue-900/20"
    >
      <div aria-hidden="true" className="h-1 bg-blue-500 rounded-t-2xl" />

      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center justify-center shrink-0">
              {index + 1}
            </span>
            <label htmlFor={`q${index}-type`} className="sr-only">Question type</label>
            <select
              id={`q${index}-type`}
              value={question.type}
              onChange={(e) => {
                const newType = e.target.value
                onUpdate(index, 'type', newType)
                if (HAS_OPTIONS.includes(newType) && (!question.options || question.options.length < 2)) {
                  onUpdate(index, 'options', ['', ''])
                }
              }}
              className="text-sm bg-slate-100 dark:bg-slate-700 border-none rounded-lg px-3 py-1.5 font-semibold text-slate-700 dark:text-slate-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
            >
              {QUESTION_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Desktop: inline buttons | Mobile: 3-dot menu */}
          <div className="flex items-center gap-1">
            <DesktopActions index={index} onDuplicate={onDuplicate} onDelete={onDelete} />
            <ThreeDotMenu index={index} onDuplicate={onDuplicate} onDelete={onDelete} />
          </div>
        </div>

        {/* Rich Text Editor */}
        <div className="mb-5">
          <p className="text-xs font-semibold mb-2 text-slate-400 dark:text-slate-500 uppercase tracking-wide">Question</p>
          <RichTextEditor
            value={question.text}
            onChange={(value) => onUpdate(index, 'text', value)}
            placeholder="Enter your question here..."
          />
        </div>

        {/* Options */}
        {hasOptions && <OptionsEditor question={question} index={index} onUpdate={onUpdate} />}

        {/* Suggested Answer */}
        {!hasOptions && question.type !== 'file' && (
          <div className="mb-4">
            <label htmlFor={`q${index}-suggested`} className="block text-xs font-semibold mb-2 text-slate-400 dark:text-slate-500 uppercase tracking-wide">
              Suggested Answer <span className="font-normal normal-case">(optional)</span>
            </label>
            <textarea
              id={`q${index}-suggested`}
              value={question.suggestedAnswer}
              onChange={(e) => onUpdate(index, 'suggestedAnswer', e.target.value)}
              placeholder="Provide a suggested answer or explanation for AI to reference..."
              rows="3"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-blue-400 resize-none text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
            />
          </div>
        )}

        {/* File Upload note */}
        {question.type === 'file' && (
          <div className="mb-4 flex items-start gap-2 px-3 py-2.5 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <Icon name="info" aria-hidden="true" className="text-slate-400 text-sm mt-0.5 shrink-0" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Respondents will see a file upload button. File type restrictions can be configured later.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
          {questionType === 'quiz' ? (
            <div className="flex items-center gap-2">
              <Icon name="star" aria-hidden="true" className="text-amber-400 text-sm" />
              <label htmlFor={ptsInputId} className="sr-only">Points for this question</label>
              <input
                id={ptsInputId}
                type="number"
                value={question.points ?? 10}
                min="1"
                onChange={(e) => onUpdate(index, 'points', Number(e.target.value))}
                className="w-16 text-sm bg-slate-100 dark:bg-slate-700 border-none rounded-lg px-2 py-1 text-center font-semibold text-slate-700 dark:text-slate-300 outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              />
              <span aria-hidden="true" className="text-xs text-slate-500">pts</span>
            </div>
          ) : <div />}

          <div className="flex items-center gap-2">
            <label htmlFor={requiredToggleId} className="text-sm font-semibold text-slate-500 dark:text-slate-400 cursor-pointer select-none">
              Required
            </label>
            <div className="relative">
              <input
                id={requiredToggleId}
                type="checkbox"
                checked={question.required ?? false}
                onChange={(e) => onUpdate(index, 'required', e.target.checked)}
                className="sr-only peer"
              />
              <div aria-hidden="true" className="w-9 h-5 bg-slate-300 dark:bg-slate-600 rounded-full peer-checked:bg-blue-500 transition-colors" />
              <div aria-hidden="true" className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function QuestionCard({ question, index, questionType, isActive, onActivate, onUpdate, onDelete, onDuplicate }) {
  if (isActive) {
    return <ActiveCard question={question} index={index} questionType={questionType} onUpdate={onUpdate} onDelete={onDelete} onDuplicate={onDuplicate} />
  }
  return <CollapsedPreview question={question} index={index} onActivate={onActivate} onDelete={onDelete} onDuplicate={onDuplicate} />
}