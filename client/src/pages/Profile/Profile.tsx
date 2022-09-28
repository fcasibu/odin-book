import Button from "../../components/Button";
import Card from "../../components/Card";

// Test types
type Friend = {
    id: string;
};
type User = {
    firstName: string;
    lastName: string;
    bannerURL: string;
    avatarURL: string;
    friends: Friend[];
};

type Props = {
    user: User;
};

export const ProfileHeader = ({ user }: Props) => {
    return (
        <div className="bg-white w-full h-fit shadow-md">
            <div className="max-w-[900px] mx-auto">
                <div className="overflow-hidden mx-[-8px] my-[-60px] cursor-pointer flex justify-center lg:my-[-20px]">
                    <img
                        src={user.bannerURL}
                        alt="Banner"
                        className="object-cover w-[900px] h-[300px] rounded-lg"
                    />
                </div>
                <div className="flex flex-col items-center lg:flex-row justify-between px-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="rounded-full max-w-[150px] overflow-hidden cursor-pointer border-[5px] border-white self-center">
                            <img
                                src={user.avatarURL}
                                alt="Profile Picture"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-2 items-center lg:justify-end lg:items-start">
                            <h2 className="text-3xl font-semibold">
                                {user.firstName}{" "}
                                <span className="text-xl font-normal">
                                    ({user.firstName} {user.lastName})
                                </span>
                            </h2>
                            <span className="text-md font-semibold text-gray-500 cursor-pointer">
                                {user.friends.length} friends
                            </span>
                            <div className="flex">
                                {user.friends.map((friend, index) => (
                                    <div
                                        className="rounded-full max-w-[30px] mx-[-4px] border-2 border-white overflow-hidden cursor-pointer"
                                        key={index}
                                    >
                                        <img
                                            src="https://avatars.githubusercontent.com/u/75290989?s=400&v=4"
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center my-4">
                        <Button variant="none" text="default">
                            Friends
                        </Button>
                        <Button>Message</Button>
                    </div>
                </div>
                <nav>
                    <ul className="flex justify-center gap-8 text-gray-500 font-bold">
                        <li className="p-4 border-sky-500 border-b-2 cursor-pointer text-sky-500 font-bold">
                            <a>Posts</a>
                        </li>
                        <li className="p-4 cursor-pointer">
                            <a>Friends</a>
                        </li>
                        <li className="p-4 cursor-pointer">
                            <a>Collection</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export const ProfileBodySidebar = ({ user }: { user: User }) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Card className="max-h-[300px]">
                <h3 className="font-bold text-lg">Intro</h3>
            </Card>
            <Card className="max-h-[300px]">
                <div className="flex justify-between">
                    <div>
                        <h3 className="font-bold text-lg">Friends</h3>
                        <span className="text-gray-600 text-sm">{user.friends.length} friends</span>
                    </div>
                    <a className="text-sky-600 text-sm">See All Friends</a>
                </div>
            </Card>
            <Card className="max-h-[300px]">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Collection</h3>
                    <a className="text-sky-600 text-sm">See All Collection</a>
                </div>
            </Card>
        </div>
    );
};

// Refactor
export const ProfileBodyPosts = ({ user }: { user: User }) => {
    return (
        <div>
            <Card>
                <div className="rounded-full max-w-[150px] overflow-hidden cursor-pointer border-[5px] border-white self-center">
                    <img src={user.avatarURL} alt="Profile Picture" className="object-cover" />
                </div>
                <button className="rounded-full bg-gray-200">What&apos;s on your mind?</button>
            </Card>
        </div>
    );
};

export const ProfileBody = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col gap-4 items-center">
            {children}
        </div>
    );
};

export const Profile = ({ user }: Props) => {
    return (
        <div className="flex flex-col gap-8">
            <ProfileHeader user={user} />
            <div className="px-4">
                <ProfileBody>
                    <ProfileBodySidebar user={user} />
                    <ProfileBodyPosts user={user} />
                </ProfileBody>
            </div>
        </div>
    );
};
