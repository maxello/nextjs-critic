import { auth } from "@/auth";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProfileForm from "@/components/profile/ProfileForm";
import { fetchUserById } from "@/lib/actions";
import { redirect } from "next/navigation";
import React from 'react';

const ProfilePage = async () => {
  const session = await auth();
  
  if (!session?.user?.id) redirect("/sign-in");
  const user = await fetchUserById(session.user.id);
  const breadcrumbs = [
    { 
      label: 'Profile'
    }
  ]
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h2 className="font-bebas-neue leading-none text-[4rem] md:text-[6rem] text-primary uppercase py-3 md:py-5">Profile</h2>
      <div className="max-w-[500px]">
        <ProfileForm {...user} />
      </div>
    </>
  )
}

export default ProfilePage;