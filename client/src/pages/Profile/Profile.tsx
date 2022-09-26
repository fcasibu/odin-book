import Button from "../../components/Button";

// Test types
type Friend = {
    id: string;
}
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

const Profile = ({ user }: Props) => {
    return (
        <>
            <div>
                <div>
                    <img src={user.bannerURL} alt="Banner" />
                </div>
                <div>
                    <div>
                        <img src={user.avatarURL} alt="Profile Picture" />
                    </div>
                    <div>
                        <h2>
                            {user.firstName}{" "}
                            <span>
                                ({user.firstName} {user.lastName})
                            </span>
                        </h2>
                        <span>{user.friends.length} friends</span>
                        <div>
                            {user.friends.map((friend, index) => (
                                <img src="" alt="" key={index} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <Button>Edit Profile</Button>
                        <Button>Friends</Button>
                        <Button>Message</Button>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a>Posts</a>
                        </li>
                        <li>
                            <a>Friends</a>
                        </li>
                        <li>
                            <a>Collection</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Profile;
