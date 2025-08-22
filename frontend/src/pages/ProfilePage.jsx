import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {Camera, User, Mail, Pencil, Check} from "lucide-react";

const ProfilePage = () => {
  const {authUser, isUpdatingProfile, updateProfile, isUpdatingName, updateName} = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [nameUpdating, setNameUpdating] = useState(false);
  const [newName, setNewName] = useState(authUser?.name || "");
  const handleImageUpload = async(e) => {
    const file = e.target.files[0];
    if(!file) return; 

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({profilePic: base64Image});
    }
  };

  const handleNameUpdate = async() => {
    if (newName.trim() && newName !== authUser?.name) {
      await updateName({ name: newName });
    }
    setNameUpdating(false);
  }
  return (
    <div className="pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/**Profile icon*/}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
                onError={(e) => { e.target.onerror = null; e.target.src = "/avatar.png"; }}
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer 
                          transition-all duration-200 ${isUpdatingProfile?"animate-pulse pointer-events-none":""}`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input type="file"
                        id="avatar-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUpdatingProfile} />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile?"Uploading...":"Click the camera icon to update your profile"}
            </p>
          </div>
          {/**Name details*/}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="text-sm flex items-center gap-2">
                  <User className="w-4 h-4"/>
                  Full Name
                </div>
                {!nameUpdating && (
                  <button onClick={() => setNameUpdating(true)}>
                    <Pencil className="w-4 h-4"/>
                  </button>
                )}
                {nameUpdating && (
                  <button
                    onClick={handleNameUpdate}
                    disabled={isUpdatingName}
                  >
                    <Check className="w-4 h-4"/>
                  </button>
                )}
              </div>
              {!nameUpdating && (
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.name}</p>
              )}
              {nameUpdating && (
                <input
                  className="px-4 py-2.5 bg-base-200 rounded-lg border w-[100%]"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  autoFocus
                  onKeyDown={e => {
                    if(e.key === "Enter") handleNameUpdate();
                    }
                  }
                />
              )}
            </div>
            {/*Mail details*/}
            <div className="space-y-1.5">
              <div className="text-sm flex items-center gap-2">
                <Mail className="w-4 h-4"/>
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>
          {/**Other details */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage