import React, { useState } from 'react'
import { Send, X, MessageSquare } from 'lucide-react'

const ChatPanel = ({ isOpen, onClose, messages = [], onSendMessage }) => {
  const [input, setInput] = useState('')

  if (!isOpen) return null

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    
    if (onSendMessage) {
      onSendMessage(input.trim())
    }
    setInput('')
  }

  return (
    <aside className="w-80 h-full bg-white border-l border-slate-200 flex flex-col z-20 shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
          <MessageSquare className="w-4 h-4 text-indigo-600" /> In-Call Messages
        </h3>
        <button 
          onClick={onClose} 
          className="p-1 hover:bg-slate-200/60 rounded-lg text-slate-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
            <MessageSquare className="w-8 h-8 opacity-30" />
            <p className="text-xs font-medium">No messages yet</p>
            <p className="text-[11px] text-slate-400 max-w-[180px]">
              Messages sent in call can be seen by everyone.
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[11px] text-slate-400">
                <span className="font-medium text-slate-600">{msg.isMe ? 'You' : msg.sender}</span>
                <span>•</span>
                <span>{msg.time || 'Just now'}</span>
              </div>
              <div 
                className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed break-words ${
                  msg.isMe 
                    ? 'bg-indigo-600 text-white rounded-br-xs' 
                    : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message..."
          className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </aside>
  )
}

export default ChatPanel