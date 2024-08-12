'use client';

import {signOut, useSession} from "next-auth/react"
import Link from 'next/link';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Files, Home, Menu, Package2, Search, Settings, Users} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const Navbar = () => {
    const {data:session, status} = useSession();

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6"/>
                            <span className="sr-only">Flexwork</span>
                        </Link>
                        <Link
                            href="/"
                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                        >
                            <Home className="h-5 w-5"/>
                            Dashboard
                        </Link>
                        <Link
                            href="/files"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Files className="h-4 w-4"/>
                            Files
                        </Link>
                        <Link
                            href="/users"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Users className="h-4 w-4"/>
                            Users
                        </Link>
                        <Link
                            href="/settings"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Settings className="h-4 w-4"/>
                            Settings
                        </Link>
                    </nav>
                    <div className="mt-auto">
                        <Card>
                            <CardHeader>
                                <CardTitle>Upgrade to Pro</CardTitle>
                                <CardDescription>
                                    Unlock all features and get unlimited access to our
                                    support team.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button size="sm" className="w-full">
                                    Upgrade
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form>
            </div>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn'/>
                                        <AvatarFallback>BT</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{session?.user?.firstName}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>
                            My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <Link href='/portal/profile'>Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href='#' onClick={() => signOut()}>
                                Logout
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DialogTrigger asChild>
                            <DropdownMenuItem>
                                About
                            </DropdownMenuItem>
                        </DialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Flexwork</DialogTitle>
                        <DialogDescription>
                            Flexwork, the powerful toolkit for enterprises
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </header>
    );
}
export default Navbar;