// components/Navbar.tsx

'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          SlideAI
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          {session ? (
            <>
              <Link href="/admin" className="hover:text-gray-300">
                Admin
              </Link>
              <button onClick={() => signOut()} className="hover:text-gray-300">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/auth/signin" className="hover:text-gray-300">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
