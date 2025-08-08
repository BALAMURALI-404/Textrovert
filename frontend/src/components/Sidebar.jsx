import { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { User } from 'lucide-react';

function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const onlineUsers = [];

  useEffect(() => {
    getUsers();
  },[getUsers])

  if(isUsersLoading) return <div><SidebarSkeleton/></div>

  return (
    <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
      <div className='border-b border-base-300 w-full p-5'>
        <div className='flex items-center gap-2'>
          <User className='size-6'/>
          <span className='font-medium hidden lg:block'>Contacts</span>
        </div>
      </div>
      <div className='overflow-y-auto w-full py-3'>
        {users.map((user) => (
          <button  key={user._id} onClick={() => setSelectedUser(user)}
          className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
          ${selectedUser?._id === user._id?"bg-base-300 ring-1 ring-base-300":""}`}>
            <div className='relative mx-auto lg:mx-0'>
              <img src={user.profilePic || "/avatar.png"} alt={user.name} 
                   className='size-12 rounded-full object-cover' />
              {onlineUsers.includes(user._id) && (
                <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'/>
              )}
            </div>
            {/*User info for larger screens */}
            <div className='hidden lg:block text-left min-w-0'>
              <div className='font-medium truncate'>{user.name}</div>
              <div className='text-sm text-zinc-400'>
                {onlineUsers.includes(user._id)?"Online":"Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar