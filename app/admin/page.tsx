import React from 'react';
import Link from 'next/link'
import { Button } from '@/components/ui/button';
import { House } from 'lucide-react';
const AdminPage = () => {
  return (
    <>
      <h2 className="font-bebas-neue leading-none text-[2rem] md:text-[4rem] text-primary uppercase mb-3">Welcome to Dashboard</h2>
      <Button asChild>
        <Link href={'/'}><House className="mr-1" />Go to Home Page</Link>
      </Button>
    </>
  )
}

export default AdminPage;