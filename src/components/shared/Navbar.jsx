import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserSession } from "@/lib/core/session";

export default async function Navbar() {
  const user=await getUserSession()

  
  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>

          <Link href="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>

          <Link href="/contact" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>

          <Link href="/signIn">
            <Button>Sign In</Button>
          </Link>
        </nav>
      </div>
    </div>
  );
}