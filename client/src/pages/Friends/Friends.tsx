import Button from "../../components/Button";
import Card from "../../components/Card";

const FriendsSidebar = () => {
    return (
        <div className="hidden bg-white shadow-lg w-[400px] xl:block p-2">
            <div className="sticky top-2">
                <h1 className="text-2xl font-bold">Friends</h1>
                <ul className="flex flex-col">
                    <li className="text-lg rounded-md hover:bg-gray-100 p-2 cursor-pointer">
                        <a>Friend Requests</a>
                    </li>
                    <li className="text-lg rounded-md hover:bg-gray-100 p-2 cursor-pointer">
                        <a>All Friends</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const FriendsMain = () => {
    return (
        <div className="px-8 py-4 w-full">
            <h3 className="text-lg font-bold mb-4">Friends Requests</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <Card className="flex flex-col gap-2 overflow-hidden px-2 w-full">
                    <div className="mx-[-16px] mt-[-16px] h-[220px] cursor-pointer empty:animate-pulse empty:bg-gray-600">
                    </div>
                    <h4 className="text-md font-bold empty:animate-pulse empty:bg-gray-600 empty:h-4 empty:w-1/2 empty:rounded-full"></h4>
                    <Button>Confirm</Button>
                    <Button variant="none" text="danger">
                        Delete
                    </Button>
                </Card>
                <Card className="flex flex-col gap-2 overflow-hidden px-2">
                    <div className="mx-[-16px] mt-[-16px] cursor-pointer">
                        <img
                            src="https://picsum.photos/536/354"
                            alt=""
                            className="object-cover w-full h-[220px]"
                        />
                    </div>
                    <h4 className="text-md font-bold">John Doe</h4>
                    <Button>Confirm</Button>
                    <Button variant="none" text="danger">
                        Delete
                    </Button>
                </Card>
                <Card className="flex flex-col gap-2 overflow-hidden px-2">
                    <div className="mx-[-16px] mt-[-16px] cursor-pointer">
                        <img
                            src="https://picsum.photos/536/354"
                            alt=""
                            className="object-cover w-full h-[220px]"
                        />
                    </div>
                    <h4 className="text-md font-bold">John Doe</h4>
                    <Button>Confirm</Button>
                    <Button variant="none" text="danger">
                        Delete
                    </Button>
                </Card>
                <Card className="flex flex-col gap-2 overflow-hidden px-2">
                    <div className="mx-[-16px] mt-[-16px] cursor-pointer">
                        <img
                            src="https://picsum.photos/536/354"
                            alt=""
                            className="object-cover w-full h-[220px]"
                        />
                    </div>
                    <h4 className="text-md font-bold">John Doe</h4>
                    <Button>Confirm</Button>
                    <Button variant="none" text="danger">
                        Delete
                    </Button>
                </Card>
                <Card className="flex flex-col gap-2 overflow-hidden px-2">
                    <div className="mx-[-16px] mt-[-16px] cursor-pointer">
                        <img
                            src="https://picsum.photos/536/354"
                            alt=""
                            className="object-cover w-full h-[220px]"
                        />
                    </div>
                    <h4 className="text-md font-bold">John Doe</h4>
                    <Button>Confirm</Button>
                    <Button variant="none" text="danger">
                        Delete
                    </Button>
                </Card>
            </div>
        </div>
    );
};

const Friends = () => {
    return (
        <div className="flex">
            <FriendsSidebar />
            <FriendsMain />
        </div>
    );
};

export default Friends;
