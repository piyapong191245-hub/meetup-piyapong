import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  useCallStateHooks,
  useCall,
  SpeakerLayout,
} from '@stream-io/video-react-sdk'
import '@stream-io/video-react-sdk/dist/css/styles.css'

import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  MessageSquare, 
  Users, 
  PhoneOff,
  Check
} from 'lucide-react'

const apiKey = import.meta.env.VITE_STREAM_API_KEY

const MeetingRoom = () => {
  const { meetingId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isLoaded } = useUser()

  const [client, setClient] = useState(null)
  const [call, setCall] = useState(null)

  const [createdNotification, setCreatedNotification] = useState(
    location.state?.createdNotification || null
  )

  useEffect(() => {
    if (!isLoaded || !user || !meetingId) return

    // ดึง Token จาก Backend (Server)
    const fetchToken = async () => {
      const res = await fetch(`http://localhost:5000/api/token?userId=${user.id}`)
      const data = await res.json()
      return data.token
    }

    // สร้าง Stream Client ด้วยผู้ใช้จริงจาก Clerk
    const _client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.fullName || user.primaryEmailAddress?.emailAddress || 'User',
        image: user.imageUrl,
      },
      tokenProvider: fetchToken,
    })

    const _call = _client.call('default', meetingId)
    _call.join({ create: true })

    setClient(_client)
    setCall(_call)

    return () => {
      _call.leave()
      _client.disconnectUser()
    }
  }, [user, isLoaded, meetingId])

  if (!client || !call) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-900 text-white font-sans">
        กำลังเชื่อมต่อกล้องและไมค์...
      </div>
    )
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MeetingRoomUI 
          meetingId={meetingId}
          createdNotification={createdNotification}
          setCreatedNotification={setCreatedNotification}
          navigate={navigate}
        />
      </StreamCall>
    </StreamVideo>
  )
}

function MeetingRoomUI({ meetingId, createdNotification, setCreatedNotification, navigate }) {
  const call = useCall()
  const { useMicrophoneState, useCameraState, useParticipants } = useCallStateHooks()
  const { microphone, isMute: isMicMuted } = useMicrophoneState()
  const { camera, isMute: isCameraMuted } = useCameraState()
  const participants = useParticipants()

  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)

  useEffect(() => {
    if (createdNotification) {
      const timer = setTimeout(() => {
        setCreatedNotification(null)
        window.history.replaceState({}, document.title)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [createdNotification])

  const handleLeave = async () => {
    await call?.leave()
    navigate('/dashboard', { 
      state: { message: 'You have left the meeting' } 
    })
  }

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev)
    if (!isChatOpen) setIsParticipantsOpen(false)
  }

  const toggleParticipants = () => {
    setIsParticipantsOpen((prev) => !prev)
    if (!isParticipantsOpen) setIsChatOpen(false)
  }

  return (
    <div className='h-screen w-screen bg-slate-100 text-slate-900 flex flex-col overflow-hidden relative font-sans'>
      
      {/* Header */}
      <header className="w-full bg-white/90 backdrop-blur-md px-6 py-3 border-b border-slate-200 flex items-center justify-between z-30 shadow-xs relative">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-slate-900 tracking-tight">
            Meeting ({meetingId})
          </h2>
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {createdNotification && (
          <div className="absolute left-1/2 -translate-x-1/2 bg-white border border-slate-200/90 px-4 py-1.5 rounded-xl shadow-xs text-xs font-medium text-slate-700 flex items-center gap-2 animate-fade-in">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span>{createdNotification}</span>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* แสดงกล้องผู้ใช้จริงทั้งหมดผ่าน SpeakerLayout */}
        <div className="flex-1 h-full p-4 pb-20 overflow-hidden flex items-center justify-center bg-slate-900">
          <SpeakerLayout />
        </div>

        {/* Floating Controls */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-6 py-2.5 rounded-full flex items-center gap-4 shadow-2xl z-30">
          
          <button 
            onClick={() => microphone.toggle()}
            className={`p-3 rounded-full transition-all cursor-pointer ${
              !isMicMuted ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white hover:bg-rose-700'
            }`}
            title={!isMicMuted ? "Mute Mic" : "Unmute Mic"}
          >
            {!isMicMuted ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          <button 
            onClick={() => camera.toggle()}
            className={`p-3 rounded-full transition-all cursor-pointer ${
              !isCameraMuted ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-rose-600 text-white hover:bg-rose-700'
            }`}
            title={!isCameraMuted ? "Turn Off Camera" : "Turn On Camera"}
          >
            {!isCameraMuted ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          <div className="h-6 w-px bg-slate-700/60 my-auto" />

          <button 
            onClick={toggleParticipants}
            className={`relative p-3 rounded-full transition-all cursor-pointer ${
              isParticipantsOpen ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Participants"
          >
            <Users className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center border-2 border-slate-900">
              {participants.length}
            </span>
          </button>

          <button 
            onClick={toggleChat}
            className={`p-3 rounded-full transition-all cursor-pointer ${
              isChatOpen ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="In-Call Chat"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          <div className="h-6 w-px bg-slate-700/60 my-auto" />

          <button 
            onClick={handleLeave}
            className="p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full transition-all cursor-pointer"
            title="Leave Call"
          >
            <PhoneOff className="w-5 h-5" />
          </button>

        </div>

      </div>
    </div>
  )
}

export default MeetingRoom