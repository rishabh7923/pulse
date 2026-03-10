import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function Comment() {
    return (
        <div className='p-2'>
            <div className='flex gap-2 items-center'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='font-semibold'>notaprotagonist</span>
                <div className='text-muted-foreground'>
                    19 mins ago
                </div>
            </div>
            <p className='mt-1'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, optio.
            </p>
        </div>
    )
}

export default Comment