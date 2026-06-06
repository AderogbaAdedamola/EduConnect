import { useState } from 'react'
import Icon from '../common/Icon'

// Mock data — replace with real WebSocket data
const MOCK_RESPONDENTS = [
  { id: 1, name: 'Anonymous', questionSet: 'Python Fundamentals Quiz', progress: 70, status: 'chatting', lastMsg: 'Can you explain decorators?' },
  { id: 2, name: 'Fatima O.', questionSet: 'Biology – Cell Structure', progress: 40, status: 'idle', lastMsg: 'Waiting for next question...' },
  { id: 3, name: 'Anonymous', questionSet: 'Python Fundamentals Quiz', progress: 100, status: 'done', lastMsg: 'All done!' },
]

const MOCK_THREAD = [
  { id: 1, role: 'respondent', name: 'Anonymous', content: 'What are Python decorators used for?', time: '2:14 PM' },
  { id: 2, role: 'ai', name: 'AI Assistant', content: 'Great question! Decorators in Python are a way to modify or enhance functions without changing their source code. They are applied using the `@` syntax above a function definition.', time: '2:14 PM' },
  { id: 3, role: 'respondent', name: 'Anonymous', content: 'Can you give me an example?', time: '2:15 PM' },
  { id: 4, role: 'ai', name: 'AI Assistant', content: '⚡ Heads up to creator: This respondent is asking for deeper explanations. You may want to jump in here.', time: '2:15 PM', isAlert: true },
]

function RespondentRow({ respondent, isSelected, onSelect }) {
  const statusStyles = {
    chatting: 'bg-green-400',
    idle: 'bg-yellow-400',
    done: 'bg-slate-300 dark:bg-slate-600',
  }

  return (
    <button
      onClick={() => onSelect(respondent)}
      className={`w-full text-left px-4 py-3.5 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0 ${
        isSelected
          ? 'bg-blue-50 dark:bg-blue-900/20'
          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center text-white text-xs font-bold">
            {respondent.name[0]}
          </div>
          <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${statusStyles[respondent.status]}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{respondent.name}</p>
          <p className="text-xs text-slate-400 truncate">{respondent.lastMsg}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs font-bold text-slate-900 dark:text-white">{respondent.progress}%</p>
          <p className="text-[10px] text-slate-400">done</p>
        </div>
      </div>
    </button>
  )
}

function ChatBubble({ msg }) {
  const isRespondent = msg.role === 'respondent'
  const isAI = msg.role === 'ai'

  if (msg.isAlert) {
    return (
      <div className="flex justify-center">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl text-xs text-amber-700 dark:text-amber-400 max-w-sm text-center">
          <Icon name="alert-triangle" className="w-4 h-4 shrink-0" />
          <span>{msg.content}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex gap-2.5 ${isRespondent ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`w-7 h-7 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold ${
        isRespondent
          ? 'bg-gradient-to-br from-slate-400 to-slate-500 text-white'
          : 'bg-purple-100 dark:bg-purple-900/40'
      }`}>
        {isRespondent ? msg.name[0] : <Icon name="sparkles" className="text-purple-500 dark:text-purple-400 text-xs" />}
      </div>
      <div className={`max-w-[70%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
        isRespondent
          ? 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-sm'
          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tr-sm'
      }`}>
        <p className="text-[10px] font-bold text-slate-400 mb-1">{msg.name} · {msg.time}</p>
        {msg.content}
      </div>
    </div>
  )
}

export default function MessagingTab() {
  const [selected, setSelected] = useState(MOCK_RESPONDENTS[0])
  const [creatorInput, setCreatorInput] = useState('')
  const [isTakeover, setIsTakeover] = useState(false)

  return (
    <div className="flex-1 flex overflow-hidden">
      
      {/* Left: Respondent List */}
      <div className="w-72 shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="px-4 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Live Sessions</h3>
          <p className="text-xs text-slate-400 mt-0.5">{MOCK_RESPONDENTS.filter(r => r.status === 'chatting').length} active conversations</p>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {MOCK_RESPONDENTS.map(r => (
            <RespondentRow
              key={r.id}
              respondent={r}
              isSelected={selected?.id === r.id}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>

      {/* Right: Chat Thread */}
      <div className="flex-1 flex flex-col">

        {/* Thread Header */}
        <div className="shrink-0 px-5 py-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">{selected?.name}</h3>
            <p className="text-xs text-slate-400">{selected?.questionSet} · {selected?.progress}% complete</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Takeover toggle */}
            <button
              onClick={() => setIsTakeover(v => !v)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isTakeover
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Icon name={isTakeover ? 'mic' : 'mic-off'} className="w-3.5 h-3.5" />
              {isTakeover ? 'Takeover Active' : 'Take Over'}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4 space-y-3 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900/50 dark:to-slate-900">
          {/* AI monitoring banner */}
          {!isTakeover && (
            <div className="flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl px-3 py-2">
              <Icon name="sparkles" className="w-3.5 h-3.5 shrink-0" />
              <span>AI is handling this conversation. Click "Take Over" to message directly.</span>
            </div>
          )}
          {isTakeover && (
            <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl px-3 py-2">
              <Icon name="mic" className="w-3.5 h-3.5 shrink-0" />
              <span>You are now in control. The AI is paused for this respondent.</span>
            </div>
          )}
          {MOCK_THREAD.map(msg => <ChatBubble key={msg.id} msg={msg} />)}
        </div>

        {/* Creator Input — only visible during takeover */}
        {isTakeover && (
          <div className="shrink-0 px-4 pb-4 pt-2 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={creatorInput}
                onChange={e => setCreatorInput(e.target.value)}
                placeholder="Message respondent directly..."
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm px-4 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                disabled={!creatorInput.trim()}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
              >
                <Icon name="send" className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
