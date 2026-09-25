import React from 'react'
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  MessageSquare, 
  Users, 
  PhoneOff 
} from 'lucide-react'

const ControlBar = ({
  participantCount = 1, // เพิ่ม prop รับจำนวนผู้เข้าร่วม
  audioEnabled = true,
  videoEnabled = true,
  isChatOpen = false,
  isParticipantsOpen = false,
  isHost = false,
  onToggleAudio,
  onToggleVideo,
  onToggleChat,
  onToggleParticipants,
  onEndMeeting,
  onLeave
}) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-6 py-3 rounded-full flex items-center gap-4 shadow-2xl z-30">
      
      {/* Microphone Button */}
      <button 
        onClick={onToggleAudio}
        className={`p-3 rounded-full transition-all cursor-pointer ${
          audioEnabled 
            ? 'bg-slate-800 text-white hover:bg-slate-700' 
            : 'bg-rose-600 text-white hover:bg-rose-700'
        }`}
        title={audioEnabled ? "Mute Mic" : "Unmute Mic"}
      >
        {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
      </button>

      {/* Camera Button */}
      <button 
        onClick={onToggleVideo}
        className={`p-3 rounded-full transition-all cursor-pointer ${
          videoEnabled 
            ? 'bg-slate-800 text-white hover:bg-slate-700' 
            : 'bg-rose-600 text-white hover:bg-rose-700'
        }`}
        title={videoEnabled ? "Turn Off Camera" : "Turn On Camera"}
      >
        {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
      </button>

      <div className="h-6 w-px bg-slate-700/60 my-auto" />

      {/* Participants Button + ตัวเลขจำนวนคน */}
      <button 
        onClick={onToggleParticipants}
        className={`relative p-3 rounded-full transition-all cursor-pointer ${
          isParticipantsOpen 
            ? 'bg-indigo-600 text-white' 
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        }`}
        title="Participants"
      >
        <Users className="w-5 h-5" />

        {/* Badge แสดงตัวเลข */}
        <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center border-2 border-slate-900">
          {participantCount}
        </span>
      </button>

      {/* Chat Button */}
      <button 
        onClick={onToggleChat}
        className={`p-3 rounded-full transition-all cursor-pointer ${
          isChatOpen 
            ? 'bg-indigo-600 text-white' 
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        }`}
        title="In-Call Chat"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      <div className="h-6 w-px bg-slate-700/60 my-auto" />

      {/* End / Leave Meeting Button */}
      <button 
        onClick={isHost ? onEndMeeting : onLeave}
        className="p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full transition-all cursor-pointer"
        title={isHost ? "End Meeting" : "Leave Call"}
      >
        <PhoneOff className="w-5 h-5" />
      </button>

    </div>
  )
}

export default ControlBar