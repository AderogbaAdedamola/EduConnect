import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebarWidth } from '../hooks/UseSideBarWidth'
import { useAuth } from '../context/AuthContext'
import Icon from '../components/common/Icon'
import BottomNav from '../components/Layout/BottomNav'

// ─── Constants ────────────────────────────────────────────────────────────────
const TABS_STORAGE_KEY = 'ai_chat_tabs'
const ACTIVE_TAB_KEY   = 'ai_chat_active_tab'

const makeTab = (id) => ({
  id,
  title: 'New chat',
  messages: [],
  createdAt: new Date().toISOString(),
})

// ─── Message bubble ───────────────────────────────────────────────────────────
function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
        isUser
          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-bold'
          : 'bg-purple-100 dark:bg-purple-900/40'
      }`}>
        {isUser ? 'A' : <Icon name="sparkles" className="text-purple-600 dark:text-purple-400 text-xs" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
        isUser
          ? 'bg-blue-600 text-white rounded-tr-sm'
          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-sm'
      }`}>
        {message.content}
        {message.loading && (
          <span className="inline-flex gap-1 ml-1">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Tab pill ─────────────────────────────────────────────────────────────────
function TabPill({ tab, isActive, onClick, onClose, onRename }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(tab.title)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const commitRename = () => {
    setEditing(false)
    const trimmed = title.trim()
    if (trimmed && trimmed !== tab.title) onRename(trimmed)
    else setTitle(tab.title)
  }

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-xl cursor-pointer shrink-0
        transition-colors text-xs font-medium select-none
        ${isActive
          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm'
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
        }
      `}
    >
      <Icon name="message-square" className="shrink-0 text-xs" />

      {editing ? (
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={commitRename}
          onKeyDown={(e) => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') { setTitle(tab.title); setEditing(false) } }}
          onClick={(e) => e.stopPropagation()}
          className="w-24 bg-transparent outline-none border-b border-blue-500 text-xs"
        />
      ) : (
        <span
          className="max-w-[100px] truncate"
          onDoubleClick={(e) => { e.stopPropagation(); setEditing(true) }}
        >
          {tab.title}
        </span>
      )}

      {/* Close — don't show if it's the only tab */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose() }}
        aria-label={`Close ${tab.title}`}
        className="p-0.5 rounded hover:text-red-500 transition-colors"
      >
        <Icon name="x" className="text-xs" />
      </button>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyChat({ onSuggestion }) {
  const suggestions = [
    'Create a 5-question quiz on Python basics',
    'Generate questions for a Biology test on cell structure',
    'Make a short quiz about World War II causes',
    'Create flexible questions for a JavaScript interview',
  ]
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-4">
        <Icon name="sparkles" className="text-purple-600 dark:text-purple-400 text-2xl" />
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
        Create questions with AI
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
        Describe what you want and the AI will help you build a complete question set
      </p>
      <div className="w-full max-w-sm space-y-2">
        {suggestions.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSuggestion(s)}
            className="w-full text-left px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-600 dark:text-slate-400 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AIChatPage() {
  const navigate   = useNavigate()
  const { theme }  = useAuth()
  const sidebarMargin = useSidebarWidth()
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // ── Tab state ──────────────────────────────────────────────────────────────
  const [tabs, setTabs] = useState(() => {
    try {
      const saved = localStorage.getItem(TABS_STORAGE_KEY)
      return saved ? JSON.parse(saved) : [makeTab(Date.now())]
    } catch { return [makeTab(Date.now())] }
  })

  const [activeTabId, setActiveTabId] = useState(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_TAB_KEY)
      return saved ? Number(saved) : tabs[0]?.id
    } catch { return tabs[0]?.id }
  })

  const [input, setInput]   = useState('')
  const [loading, setLoading] = useState(false)

  const activeTab = tabs.find(t => t.id === activeTabId) ?? tabs[0]

  // Persist tabs
  useEffect(() => {
    try { localStorage.setItem(TABS_STORAGE_KEY, JSON.stringify(tabs)) } catch {}
  }, [tabs])

  useEffect(() => {
    try { localStorage.setItem(ACTIVE_TAB_KEY, String(activeTabId)) } catch {}
  }, [activeTabId])

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeTab?.messages])

  // ── Tab management ─────────────────────────────────────────────────────────
  const addTab = () => {
    const tab = makeTab(Date.now())
    setTabs(prev => [...prev, tab])
    setActiveTabId(tab.id)
  }

  const closeTab = (id) => {
    if (tabs.length === 1) { addTab(); }
    setTabs(prev => {
      const remaining = prev.filter(t => t.id !== id)
      if (activeTabId === id) setActiveTabId(remaining[remaining.length - 1]?.id)
      return remaining
    })
  }

  const renameTab = (id, title) => {
    setTabs(prev => prev.map(t => t.id === id ? { ...t, title } : t))
  }

  const updateMessages = (tabId, updater) => {
    setTabs(prev => prev.map(t => t.id === tabId ? { ...t, messages: updater(t.messages) } : t))
  }

  // Auto-title tab from first message
  const autoTitle = (tabId, text) => {
    const title = text.length > 30 ? text.slice(0, 30) + '…' : text
    setTabs(prev => prev.map(t =>
      t.id === tabId && t.title === 'New chat' ? { ...t, title } : t
    ))
  }

  // Send message 
  const sendMessage = async (text) => {
    const content = (text ?? input).trim()
    if (!content || loading) return
    setInput('')
    setLoading(true)

    const tabId = activeTabId
    autoTitle(tabId, content)

    // Add user message
    updateMessages(tabId, msgs => [...msgs, { id: Date.now(), role: 'user', content }])

    // Add loading bubble
    const loadingId = Date.now() + 1
    updateMessages(tabId, msgs => [...msgs, { id: loadingId, role: 'assistant', content: '', loading: true }])

    try {
      const history = (activeTab?.messages ?? []).map(m => ({
        role: m.role,
        content: m.content,
      }))

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are an expert educational content creator helping teachers and educators build question sets for EduConnect. 
When asked to create questions, respond with clear, well-structured questions. 
For each question set you generate, format your response like this:

TITLE: [Question set title]
DESCRIPTION: [Brief description]
QUESTIONS:
1. [Question text]
   Type: [short/paragraph/mcq/checkbox/dropdown]
   Options (if mcq/checkbox/dropdown): A) ... B) ... C) ... D) ...
   Correct answer: [answer]
   
Be conversational and helpful. Ask clarifying questions if needed (subject, difficulty level, number of questions, question types).`,
          messages: [
            ...history,
            { role: 'user', content },
          ],
        }),
      })

      const data = await response.json()
      const reply = data.content?.[0]?.text ?? 'Sorry, I could not generate a response. Please try again.'

      // Replace loading bubble with real response
      updateMessages(tabId, msgs =>
        msgs.map(m => m.id === loadingId ? { ...m, content: reply, loading: false } : m)
      )

      // Check if response contains a generated question set
      if (reply.includes('TITLE:') && reply.includes('QUESTIONS:')) {
        updateMessages(tabId, msgs => [...msgs, {
          id: Date.now() + 2,
          role: 'system',
          content: '__HAS_QUESTIONS__',
        }])
      }
    } catch (err) {
      updateMessages(tabId, msgs =>
        msgs.map(m => m.id === loadingId
          ? { ...m, content: 'Something went wrong. Please check your connection and try again.', loading: false }
          : m
        )
      )
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  // ── Parse and push to wizard ───────────────────────────────────────────────
  const handleGenerateQuestions = () => {
    const messages = activeTab?.messages ?? []
    // Find the last assistant message with a question set
    const lastAI = [...messages].reverse().find(m => m.role === 'assistant' && m.content.includes('TITLE:'))
    if (!lastAI) return

    // Store the raw AI response for the wizard to parse
    try {
      localStorage.setItem('ai_generated_questions', JSON.stringify({
        raw: lastAI.content,
        tabId: activeTabId,
        tabTitle: activeTab?.title,
      }))
    } catch {}

    navigate('/create-question?from=ai')
  }

  const hasGeneratedQuestions = (activeTab?.messages ?? []).some(
    m => m.role === 'assistant' && m.content.includes('TITLE:') && m.content.includes('QUESTIONS:')
  )

  // ── Clear chat ─────────────────────────────────────────────────────────────
  const clearChat = () => {
    updateMessages(activeTabId, () => [])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex flex-col lg:flex-row w-full">

        {/* Sidebar rendered by parent layout — just offset here */}
        <main className={`flex-1 ${sidebarMargin} flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900`}>

          {/* ── Top Bar ───────────────────────────────────────── */}
          <div className="shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              {/* Back + Title */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/create-question')}
                  aria-label="Back to create question"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <Icon name="arrow-left" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center">
                    <Icon name="sparkles" className="text-purple-600 dark:text-purple-400 text-sm" />
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Create with AI</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {(activeTab?.messages ?? []).length > 0 && (
                  <button
                    type="button"
                    onClick={clearChat}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    title="Clear this chat"
                  >
                    <Icon name="trash-2" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={addTab}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  title="New chat"
                >
                  <Icon name="plus" />
                </button>
              </div>
            </div>

            {/* ── Tabs ──────────────────────────────────────────── */}
            <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-0.5 custom-scrollbar">
              {tabs.map(tab => (
                <TabPill
                  key={tab.id}
                  tab={tab}
                  isActive={tab.id === activeTabId}
                  onClick={() => setActiveTabId(tab.id)}
                  onClose={() => closeTab(tab.id)}
                  onRename={(title) => renameTab(tab.id, title)}
                />
              ))}
            </div>
          </div>

          {/* ── Chat Area ─────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-4">
            {(activeTab?.messages ?? []).length === 0
              ? <EmptyChat onSuggestion={(s) => sendMessage(s)} />
              : (activeTab.messages
                  .filter(m => m.content !== '__HAS_QUESTIONS__')
                  .map(m => <MessageBubble key={m.id} message={m} />)
                )
            }
            <div ref={messagesEndRef} />
          </div>

          {/* ── Generate Questions Banner ──────────────────────── */}
          {hasGeneratedQuestions && (
            <div className="shrink-0 mx-4 mb-3 px-4 py-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Icon name="check-circle" className="text-purple-600 dark:text-purple-400 shrink-0" />
                <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                  Question set ready — push it to the wizard
                </p>
              </div>
              <button
                type="button"
                onClick={handleGenerateQuestions}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 shrink-0"
              >
                <Icon name="wand-2" className="text-xs" />
                Use these questions
              </button>
            </div>
          )}

          {/* ── Input Bar ─────────────────────────────────────── */}
          <div className="shrink-0 px-4 pb-4">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe the questions you want to create..."
                rows={3}
                aria-label="Message input"
                className="w-full bg-transparent px-4 pt-3 pb-1 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none resize-none"
              />
              <div className="flex items-center justify-between px-3 pb-2.5">
                <p className="text-xs text-slate-400">
                  Enter to send · Shift+Enter for new line
                </p>
                <button
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <Icon name="send" className="text-xs" />
                  Send
                </button>
              </div>
            </div>
          </div>

        </main>
        <BottomNav />
      </div>
    </div>
  )
}