import Button from "../../components/Button";

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
                        <div className="rounded-full max-w-[150px] overflow-hidden cursor-pointer">
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
                    <ul className="flex justify-center gap-8">
                        <li className="p-4 border-sky-500 border-b-2 cursor-pointer">
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

const Profile = ({ user }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            <ProfileHeader user={user} />
        </div>
    );
};

export default Profile;
