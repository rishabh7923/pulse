import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import MobileScreenComments from "./CommentsDrawer";
import useMediaQuery from "@/hooks/useMediaQuery";
const PostDialog = lazy(() => import("../PostDialog"));

function PostComments() {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const navigate = useNavigate();
    return (
        <div>
            {isDesktop ? <Dialog defaultOpen onOpenChange={() => navigate(-1)}>
                <DialogContent className="w-screen h-screen max-w-none sm:max-w-none bg-transparent">
                    <Suspense fallback={<div>loading...</div>}>
                        <PostDialog />
                    </Suspense>
                </DialogContent>
            </Dialog> : <Drawer defaultOpen onOpenChange={() => navigate(-1)}>
                <DrawerContent>
                    <MobileScreenComments />
                </DrawerContent>
            </Drawer>}
        </div>
    )
}

export default PostComments