import Comment from "../../components/Comment";
import { PostBody, PostCommentBox, PostHeader } from "../../components/Post";
import imagePlaceHolder from '../../assets/odin-lined.png'

const PostPopup = () => {
    return <div className="w-screen h-screen flex flex-col lg:flex-row relative">
        <span className="text-white font-bold text-lg absolute left-5 top-3 cursor-pointer">&#x2715;</span>
        <div className="bg-black w-full flex justify-center items-center">
            <img src={imagePlaceHolder} className="w-[150px] h-[180px] opacity-50 animate-bounce" />
        </div>
        <div className="bg-white flex flex-col gap-2 w-full lg:max-w-[360px] py-4 pl-4">
            <div className="scrollbar lg:overflow-y-scroll pr-4 flex flex-col gap-2">
                <PostHeader />
                <PostBody />
                <Comment>
                    <Comment isChild />
                    <Comment isChild />
                </Comment>
            </div>
            <div>
                <PostCommentBox />
            </div>
        </div>
    </div>;
};

export default PostPopup;
