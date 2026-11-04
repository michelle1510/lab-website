'use client';

import {Profile} from '@/app/types/profile';
import Image from 'next/image';
import { imagePath } from '@/lib/paths';

interface ProfileCardProps {
    profile: Profile;
}

export default function ProfileCard({profile}: ProfileCardProps) {
  return (
    <div className="h-62 w-45 rounded-2xl border border-primary/10 bg-white px-4 pt-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <div className="flex flex-col items-center p-2">
        <Image
          src={imagePath(profile.img)}
          alt={profile.name}
          width={150}
          height={150}
          className="object-contain"
        />
        <div className="text-center pt-4">{profile.name}</div>
        <div className="text-center text-[12px] p-1 italic">{profile.role}</div>
      </div>
    </div>
  );
}
