import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import {CupSoda, Search } from 'lucide-react';
import { DropdownMenuAvatar } from './DropdownMenuAvatar';
import Test from './Test';

function Topbar() {
    return (
        <div className='h-16 fixed top-0 left-0 right-0 z-10 border-b bg-background px-2'>
            <div className='flex items-center gap-4 justify-around h-full'>
                <div className='flex items-center gap-1'>
                    <CupSoda />
                    <p className='hidden md:block font-semibold text-2xl'>
                        Spill
                    </p>
                </div>
                <InputGroup className='shrink grow max-w-3xl rounded-2xl'>
                    <InputGroupInput className='w-full' placeholder='Find anything' />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup>
                <div className='space-x-4 flex gap-2 items-center'>
                    <Test/>
                    <DropdownMenuAvatar />
                </div>
            </div>
        </div>)
}

export default Topbar