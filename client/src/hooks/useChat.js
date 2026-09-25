import { useState, useCallback } from 'react'

export const useChat = (_roomId, user) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'Sarah Chen',
      text: 'Hey everyone! Excited for this meeting.',
      time: '15:20',
      isMe: false,
    },
    {
      id: '2',
      sender: 'Marcus Vance',
      text: 'Can everyone hear me clearly?',
      time: '15:21',
      isMe: false,
    }
  ])

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      sender: user?.name || user?.userName || 'You',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    }

    setMessages((prev) => [...prev, newMessage])
  }, [user])

  return {
    messages,
    sendMessage
  }
}

export default useChat