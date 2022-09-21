import Button from "../../components/Button";
import Card from "../../components/Card";
import Form, { Input } from "../../components/Form";

// TODO: useModal && useForm
export const SignUp = () => {
    return (
        <>
            <Card className="h-fit md:w-[500px] fixed z-10">
                <div className="mb-4">
                    <h2>Sign Up</h2>
                    <p>It&apos;s quick and easy.</p>
                </div>
                <div className="absolute top-4 right-4 font-bold text-xl cursor-pointer">X</div>
                <Form>
                    <div className="flex flex-col md:flex-row gap-2 w-full">
                        <Input id="firstName" name="firstName" label="First Name" />
                        <Input id="lastName" name="lastName" label="Last Name" />
                    </div>
                    <Input type="email" id="email" name="email" label="Email Address" />
                    <Input type="password" id="password" name="password" label="Password" />
                    <Input
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        label="Confirm Password"
                    />
                    <Button variant="success">Sign Up</Button>
                </Form>
            </Card>
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-screen"></div>
        </>
    );
};

const SignIn = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left md:mb-32">
                <h1 className="text-5xl text-sky-600 font-extrabold">odinbook</h1>
                <p className="text-xl md:text-2xl">
                    Connect with friends and the world around you on Odin Book
                </p>
            </div>
            <Card className="max-w-[400px]">
                <Form>
                    <Input type="email" id="email" name="email" label="Email Address" />
                    <Input type="password" id="password" name="password" label="Password" />
                    <Button>Sign In</Button>
                </Form>
                <div className="mt-2 flex flex-col gap-2">
                    <Button variant="success">Create new account</Button>
                    <Button variant="none" text="default">
                        Sign In as Guest
                    </Button>
                    <Button variant="none" text="default">
                        Sign In with Google
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default SignIn;
