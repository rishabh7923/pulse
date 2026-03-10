import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function PostCardSkeleton() {
    return (
        <Card className="w-full bg-transparent shadow-none border-0">
            <CardHeader>
                <Skeleton className="h-4 w-2/3"/>
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="aspect-video w-full" />
            </CardContent>
        </Card>
    )
}

export default PostCardSkeleton