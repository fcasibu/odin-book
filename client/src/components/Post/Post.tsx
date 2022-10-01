import Card from "../Card";
import Form, { TextArea } from "../Form";

type PostProps = {
    children: React.ReactNode;
};

type PostBodyProps = {
    postImage?: string;
};

export const PostHeader = () => {
    return (
        <div className="flex justify-between">
            <div className="flex gap-2">
                <div className="rounded-full max-w-[40px] overflow-hidden cursor-pointer">
                    <img
                        src="https://avatars.githubusercontent.com/u/75290989?s=400&v=4"
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col cursor-pointer">
                    <span className="font-semibold text-sm">John Doe</span>
                    <span className="text-slate-500 text-xs">September 18 at 4:44 PM</span>
                </div>
            </div>
            <button className="font-bold text-md self-start">...</button>
        </div>
    );
};

export const PostBody = ({ postImage }: PostBodyProps) => {
    return (
        <>
            <div>
                <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            {postImage && (
                <div className="mx-[-16px] cursor-pointer">
                    <img src={postImage} alt="" className="object-cover w-full" />
                </div>
            )}
            <div className="flex justify-between items-center text-sm text-slate-500">
                <span className="cursor-pointer">Carl, Mary, and 18 others</span>
                <span className="cursor-pointer">3 Comment</span>
            </div>
            <div className="flex justify-center items-center border-y-2 border-gray-100">
                <button className="text-sm w-full rounded-md p-2 hover:bg-slate-100 active:bg-slate-200">
                    Like
                </button>
                <button className="text-sm w-full rounded-md p-2 hover:bg-slate-100 active:bg-slate-200">
                    Comment
                </button>
            </div>
        </>
    );
};

export const PostCommentBox = () => {
    return (
        <div className="flex gap-2">
            <div className="rounded-full h-fit w-[40px] overflow-hidden cursor-pointer">
                <img
                    src="https://avatars.githubusercontent.com/u/75290989?s=400&v=4"
                    className="object-cover"
                />
            </div>
            <Form>
                <TextArea id="comment" name="comment" />
            </Form>
        </div>
    );
};

export const Post = ({ children }: PostProps) => {
    return (
        <Card className="flex flex-col gap-2">
            <PostHeader />
            <PostBody postImage="https://picsum.photos/536/354" />
            {children}
            <PostCommentBox />
        </Card>
    );
};
