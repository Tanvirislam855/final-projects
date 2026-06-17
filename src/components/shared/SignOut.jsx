'use client'
import { authClient } from '@/lib/auth-client';
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation';

export default function SignOut() {
    const router=useRouter();
    const handleSignOut = async () => {
        console.log('signout');
        
        await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/signIn"); // redirect to login page
    },
  },
});
    }
    return (
        <div className='flex'>
            <LogOut className="mr-2 h-4 w-4" />
            <button onClick={handleSignOut} >Log out</button>
        </div>
    )
}