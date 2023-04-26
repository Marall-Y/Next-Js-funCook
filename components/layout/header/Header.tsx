import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import Logo from "../../../public/images/logo.png"

const Header = () => {
  return (
    <header className="sticky flex justify-between p-4 border-b-2 top-0 bg-neutral-100 z-20">
        <div className="flex justify-center">
            <Link href="/">
                <div className="flex align-middle justify-center">
                    <Image src={Logo} width="150" height="150" alt="Logo"/>
                </div>
            </Link>
        </div>
        <div className="flex justify-center align-middle items-center">
            <SignedOut>
                <Link href="/sign-in">Sign In</Link>
            </SignedOut>
            <SignedIn>
                <div className="flex items-center justify-between w-80">
                    <div className="border-e-2 pr-3">
                        <Link href="/create">
                            <button
                            className="rounded-full bg-orange-400 hover:bg-orange-700 text-white px-4 py-3 font-bold tracking-widest transition ease-in-out hover:-translate-y-1 hover:scale-110">
                                Create Recipe 
                            </button>
                        </Link>
                    </div>
                    <Link href="/sign-in" className="font-bold">My Recipes</Link>
                    <UserButton
                        userProfileMode="modal"
                        afterSignOutUrl="/"
                    />
                </div>
            </SignedIn> 
        </div>
    </header>
  )
}

export default Header