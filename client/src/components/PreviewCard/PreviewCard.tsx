import Button from "../Button";
import Card from "../Card";

// remove later
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

const PreviewCard = ({ user }: Props) => {
    return (
        <Card className="flex gap-2 items-center max-w-[310px]">
            <a className="rounded-full max-w-[80px] overflow-hidden cursor-pointer border-[5px] border-white self-center">
                <img src={user.avatarURL} alt="Profile Picture" className="object-cover" />
            </a>
            <div className="flex flex-col justify-between">
                <a className="text-lg font-semibold cursor-pointer">
                    {user.firstName} {user.lastName}
                </a>
                <div className="flex gap-2 text-xs">
                    <Button variant="none" text="default">
                        Friends
                    </Button>
                    <Button>Message</Button>
                </div>
            </div>
        </Card>
    );
};

export default PreviewCard;
