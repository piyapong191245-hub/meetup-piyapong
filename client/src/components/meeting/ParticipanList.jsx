import React from 'react'
import { Users, X, Mic, MicOff, Video, VideoOff, Crown } from 'lucide-react'

const ParticipanList = ({ 
  isOpen, 
  onClose, 
  localUser, 
  remoteUsers = [], 
  audioEnabled = true, 
  videoEnabled = true 
}) => {
  if (!isOpen) return null

  const totalParticipants = (remoteUsers?.length || 0) + 1

  return (
    <aside className="w-80 h-full bg-white border-l border-slate-200 flex flex-col z-20 shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-indigo-600" /> 
          Participants ({totalParticipants})
        </h3>
        <button 
          onClick={onClose} 
          className="p-1 hover:bg-slate-200/60 rounded-lg text-slate-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Participants List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        
        {/* Local User (You / Host) */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center text-xs shrink-0">
              {localUser?.name?.charAt(0)?.toUpperCase() || 'Y'}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {localUser?.name || 'You'} <span className="text-slate-400 font-normal">(You)</span>
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] text-indigo-600 font-medium bg-indigo-50 px-1.5 py-0.5 rounded mt-0.5">
                <Crown className="w-2.5 h-2.5" /> Host
              </span>
            </div>
          </div>

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-slate-500 shrink-0">
            {audioEnabled ? (
              <Mic className="w-3.5 h-3.5 text-slate-600" />
            ) : (
              <MicOff className="w-3.5 h-3.5 text-rose-500" />
            )}
            {videoEnabled ? (
              <Video className="w-3.5 h-3.5 text-slate-600" />
            ) : (
              <VideoOff className="w-3.5 h-3.5 text-rose-500" />
            )}
          </div>
        </div>

        {/* Remote Users */}
        {remoteUsers.map((user, index) => {
          const name = user.userName || user.name || `User ${index + 1}`
          const isAudioOn = user.audioEnabled ?? true
          const isVideoOn = user.videoEnabled ?? true

          return (
            <div 
              key={user.id || user.socketId || index} 
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-semibold flex items-center justify-center text-xs shrink-0">
                  {name.charAt(0).toUpperCase()}
                </div>
                <p className="text-xs font-medium text-slate-700 truncate">
                  {name}
                </p>
              </div>

              {/* Status Icons */}
              <div className="flex items-center gap-1.5 text-slate-500 shrink-0">
                {isAudioOn ? (
                  <Mic className="w-3.5 h-3.5 text-slate-600" />
                ) : (
                  <MicOff className="w-3.5 h-3.5 text-rose-500" />
                )}
                {isVideoOn ? (
                  <Video className="w-3.5 h-3.5 text-slate-600" />
                ) : (
                  <VideoOff className="w-3.5 h-3.5 text-rose-500" />
                )}
              </div>
            </div>
          )
        })}

      </div>
    </aside>
  )
}

export default ParticipanList