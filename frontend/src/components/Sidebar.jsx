import { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Search, User, X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading, searchUsers, searchUsersRes, clearSearch } = useChatStore();

  const {onlineUsers} = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchContent, setSearchContent] = useState("");

  const filteredUsers = showOnlineOnly? users.filter(user => onlineUsers.includes(user._id)): users;

  function handleSearchPress(){
    if(isSearching) {
      setSearchContent("");
      clearSearch();
    }
    else{
      if(searchContent.trim() === "") return;
      searchUsers(searchContent);
    }
    setIsSearching(!isSearching);
  }

  useEffect(() => {
    getUsers();
  },[getUsers])

  if(isUsersLoading) return <div><SidebarSkeleton/></div>
  console.log(users);
  return (
    <aside className={`h-full ${selectedUser?"w-20":"w-full"} md:w-60 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200`}>
      <div className='border-b border-base-300 w-full px-4 pt-5'>
        <div className='flex items-center gap-2'>
          <User className='size-6'/>
          <span className={`font-medium ${selectedUser? "hidden":"block"} md:block`}>Contacts</span>
        </div>
        <div className={`mt-3 ${selectedUser? "hidden":"flex"} md:flex items-center gap-2`}>
          <label className='cursor-pointer flex items-center gap-2'>
            <input 
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className='checkbox checkbox-sm'
             />
             <span className='text-sm'>Show online only</span>
          </label>
          <span className='text-xs text-zinc-500'>({onlineUsers.length-1} online)</span>
        </div>
        <div className='py-3 flex gap-2'>
          <input 
            type="text"
            placeholder="Search users..."
            className='input input-sm w-full'
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
            onKeyDown={(e) => {if(e.key === 'Enter') handleSearchPress()}}
          />
          <button type='submit' className=' p-1 btn btn-sm btn-circle' onClick={handleSearchPress}>
            {isSearching?<X/>:<Search/>}
          </button>
        </div>
      </div>
      <div className='overflow-y-auto w-full py-3'>
        {(isSearching?searchUsersRes:filteredUsers).map((user) => (
          <button  key={user._id} onClick={() => setSelectedUser(user)}
          className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
          ${selectedUser?._id === user._id?"bg-base-300 ring-1 ring-base-300":""}`}>
            <div className='relative lg:mx-0'>
              <img src={user.profilePic || "/avatar.png"} alt={user.name} 
                   className='size-12 rounded-full object-cover'
                   onError={(e) => { e.target.onerror = null; e.target.src = "/avatar.png"; }} />
              {onlineUsers.includes(user._id) && (
                <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'/>
              )}
            </div>
            <div className={`${selectedUser? "hidden":"block"} md:block text-left min-w-0`}>
              <div className='font-medium truncate'>{user.name}</div>
              <div className='text-sm text-zinc-400'>
                {onlineUsers.includes(user._id)?"Online":"Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className='text-center text-zinc-500 py-4'>No online users</div>
        )}
        {isSearching && searchUsersRes.length === 0 && (
          <div className='text-center text-zinc-500 py-4'>No users found</div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar