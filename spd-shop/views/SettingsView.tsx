import React from 'react';
import { ClassicalCard, ClassicalButton, SectionHeading } from '../components/ClassicalUI';
import { User, Bell, Shield, Volume2, LogOut } from 'lucide-react';

export const SettingsView: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <SectionHeading title="Configurations" subtitle="Adjust your preferences" />

      <div className="space-y-6">
        <ClassicalCard title="Profile Settings">
          <div className="flex items-center justify-between py-4 border-b border-[#e5e0d0]">
            <div className="flex items-center gap-4">
              <div className="bg-[#f5e6d3] p-3 rounded-full text-[#8b5a2b]">
                <User size={24} />
              </div>
              <div>
                <p className="font-bold text-[#4a0404]">Username</p>
                <p className="text-sm text-[#5c4033]">NoblePlayerOne</p>
              </div>
            </div>
            <ClassicalButton variant="outline" className="text-xs py-1 px-3">Edit</ClassicalButton>
          </div>
          
          <div className="flex items-center justify-between py-4">
             <div className="flex items-center gap-4">
              <div className="bg-[#f5e6d3] p-3 rounded-full text-[#8b5a2b]">
                <Shield size={24} />
              </div>
              <div>
                <p className="font-bold text-[#4a0404]">Security</p>
                <p className="text-sm text-[#5c4033]">Password & Authentication</p>
              </div>
            </div>
            <ClassicalButton variant="outline" className="text-xs py-1 px-3">Manage</ClassicalButton>
          </div>
        </ClassicalCard>

        <ClassicalCard title="Preferences">
          <div className="flex items-center justify-between py-4 border-b border-[#e5e0d0]">
             <div className="flex items-center gap-4">
              <div className="bg-[#f5e6d3] p-3 rounded-full text-[#8b5a2b]">
                <Bell size={24} />
              </div>
              <div>
                <p className="font-bold text-[#4a0404]">Notifications</p>
                <p className="text-sm text-[#5c4033]">Receive daily quest alerts</p>
              </div>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-[#fdfbf7] border-4 border-[#8b5a2b] appearance-none cursor-pointer checked:right-0 right-6 transition-all duration-300" defaultChecked/>
                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-[#d4af37] cursor-pointer"></label>
            </div>
          </div>

           <div className="flex items-center justify-between py-4">
             <div className="flex items-center gap-4">
              <div className="bg-[#f5e6d3] p-3 rounded-full text-[#8b5a2b]">
                <Volume2 size={24} />
              </div>
              <div>
                <p className="font-bold text-[#4a0404]">Sound Effects</p>
                <p className="text-sm text-[#5c4033]">Classical ambience</p>
              </div>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle2" id="toggle2" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-[#fdfbf7] border-4 border-[#8b5a2b] appearance-none cursor-pointer right-6 checked:right-0 transition-all duration-300"/>
                <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-6 rounded-full bg-[#e5e0d0] cursor-pointer"></label>
            </div>
          </div>
        </ClassicalCard>

        <div className="flex justify-center mt-8">
          <ClassicalButton variant="outline" className="!border-red-800 !text-red-900 hover:!bg-red-900 hover:!text-white w-full md:w-auto" icon={<LogOut size={18}/>}>
            Sign Out
          </ClassicalButton>
        </div>
      </div>
    </div>
  );
};