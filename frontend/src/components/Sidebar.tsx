import Link from "next/link";

import {
    LayoutDashboard,
    Folders,
    Settings,
    User
} from "lucide-react";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command';

const Sidebar = () => {
    return (
        <Command className='rounded-none bg-secondary'>
            <CommandInput placeholder='Type a command or search ...'/>
            <CommandList>
                <CommandEmpty>No results found</CommandEmpty>
                <CommandGroup heading='Suggestions'>
                    <CommandItem>
                        <LayoutDashboard className='mr-2 h-4 w-4' />
                        <Link href='/'>Dashboard</Link>
                    </CommandItem>
                    <CommandItem>
                        <Folders className='mr-2 h-4 w-4'/>
                        <Link href='/files'>Files</Link>
                    </CommandItem>
                    <CommandSeparator />
                    <CommandItem>
                        <User className='mr-2 h-4 w-4' />
                        <Link href='/users'>Users</Link>
                    </CommandItem>
                    <CommandItem>
                        <Settings className='mr-2 h-4 w-4' />
                        <Link href='/settings'>Settings</Link>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    );
}

export default Sidebar;