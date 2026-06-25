'use client';

import { useState } from 'react';
import { Search, Send, Paperclip, Smile, Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';
import {
  liveChatConversations,
  liveChatActiveCount,
  liveChatStatusTabs,
  liveChatStatusBadgeStyles,
  quickReplySuggestions,
  type LiveChatStatus,
} from '@/lib/data';

const Page = () => {
  const [activeTab, setActiveTab] = useState<LiveChatStatus | 'All'>('All');
  const [selectedChatId, setSelectedChatId] = useState(
    liveChatConversations[0].id,
  );
  const [draft, setDraft] = useState('');
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);

  const filteredChats =
    activeTab === 'All'
      ? liveChatConversations
      : liveChatConversations.filter((c) => c.status === activeTab);

  const selectedChat =
    liveChatConversations.find((c) => c.id === selectedChatId) ??
    liveChatConversations[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Live Chat
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Respond to customers in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            {liveChatActiveCount} Active Chats
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr]">
          <div
            className={`${showChatOnMobile ? 'hidden' : 'flex'} lg:flex border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex-col h-[calc(100vh-220px)] min-h-125`}
          >
            {/* Search */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-2.5 text-slate-400"
                />
                <input
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1 px-3 pt-3 overflow-x-auto">
              {liveChatStatusTabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${activeTab === tab.status
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className="ml-1 opacity-70">{tab.count}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    setSelectedChatId(chat.id);
                    setShowChatOnMobile(true);
                  }}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition ${selectedChat.id === chat.id
                      ? 'bg-blue-50 dark:bg-blue-500/10'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={chat.customerAvatar}
                      alt={chat.customerName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {chat.status === 'Active' && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                        {chat.customerName}
                      </p>
                      <span className="text-xs text-slate-400 shrink-0">
                        {chat.timeAgo}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {chat.lastMessage}
                    </p>
                  </div>

                  {chat.unreadCount > 0 && (
                    <span className="shrink-0 mt-1 w-5 h-5 flex items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-semibold">
                      {chat.unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Conversation */}
          <div
            className={`${showChatOnMobile ? 'flex' : 'hidden'} lg:flex flex-col h-[calc(100vh-220px)] min-h-125`}
          >
            {/* Conversation Header */}
            <div className="flex items-center justify-between gap-3 p-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowChatOnMobile(false)}
                  className="lg:hidden p-2 -ml-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0"
                >
                  <ArrowLeft size={18} />
                </button>
                <img
                  src={selectedChat.customerAvatar}
                  alt={selectedChat.customerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {selectedChat.customerName}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${liveChatStatusBadgeStyles[selectedChat.status]}`}
                    >
                      {selectedChat.status}
                    </span>
                    <span className="text-xs text-slate-400">
                      {selectedChat.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition">
                  <Phone size={16} />
                </button>
                <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition">
                  <Video size={16} />
                </button>
                <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50 dark:bg-slate-950/30">
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender === 'agent'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-sm'
                      }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`text-[11px] mt-1 ${msg.sender === 'agent'
                          ? 'text-blue-100'
                          : 'text-slate-400'
                        }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="flex flex-wrap gap-2 px-5 pt-3">
              {quickReplySuggestions.map((reply) => (
                <button
                  key={reply}
                  onClick={() => setDraft(reply)}
                  className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition whitespace-nowrap"
                >
                  {reply.length > 32 ? reply.slice(0, 32) + '…' : reply}
                </button>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex items-center gap-2 p-4 border-t border-slate-200 dark:border-slate-800">
              <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0">
                <Paperclip size={18} />
              </button>

              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />

              <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0">
                <Smile size={18} />
              </button>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition shrink-0">
                <Send size={16} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;