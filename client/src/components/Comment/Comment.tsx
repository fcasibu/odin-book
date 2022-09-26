import * as React from "react";
import Button from "../Button";

type Props = {
    children?: React.ReactNode;
    isChild?: boolean;
};

const Comment = ({ children, isChild }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <div
                    className={`rounded-full h-fit ${isChild ? "max-w-[20px] md:max-w-[30px]" : "max-w-[30px] md:max-w-[40px]"
                        } overflow-hidden cursor-pointer`}
                >
                    <img
                        src="https://avatars.githubusercontent.com/u/75290989?s=400&v=4"
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="bg-gray-100 px-3 py-2 rounded-lg text-xs md:text-sm w-fit relative">
                        <h4 className="font-bold">John Doe</h4>
                        <p className="leading-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </p>
                        <div className="absolute right-2 bottom-[-10px] bg-white rounded-full px-1 shadow-md text-gray-600">X 8</div>
                    </div>
                    {!isChild && (
                        <div className="flex gap-2 pl-2 text-xs text-gray-600">
                            <Button variant="none" text="default" size="none">
                                Like
                            </Button>
                            <Button variant="none" text="default" size="none">
                                Reply
                            </Button>
                            <span className="text-gray-600">1h</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="pl-14">{children && children}</div>
        </div>
    );
};

export default Comment;
