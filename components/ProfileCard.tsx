'use client';

import {Profile} from '@/app/types/profile';
import Image from 'next/image';

interface ProfileCardProps {
    profile: Profile;
}

export default function ProfileCard({profile}: ProfileCardProps) {
  return (
    <div className="items-center justify-center h-62 w-45 px-4 pt-4 rounded-md bg-gray-50 transition-all duration-200 hover:scale-[1.02]
            shadow-[0_0_10px_2px_color-mix(in_srgb,var(--accent)_50%,transparent)] hover:shadow-[0_0_15px_3px_color-mix(in_srgb,var(--accent)_65%,transparent)]">
      <div className="flex flex-col items-center p-2">
        <Image
          src={profile.img}
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
