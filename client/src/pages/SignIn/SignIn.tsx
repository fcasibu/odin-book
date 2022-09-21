import Button from "../../components/Button";
import Card from "../../components/Card";
import Form, { Input } from "../../components/Form";

const SignIn = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left md:mb-32">
                <h1 className="text-5xl text-sky-600 font-extrabold">odinbook</h1>
                <p className="text-xl md:text-2xl">Connect with friends and the world around you on Odin Book</p>
            </div>
            <Card className="max-w-[400px]">
                <Form>
                    <Input type="email" id="email" name="email" label="Email" />
                    <Input type="password" id="password" name="password" label="Password" />
                    <Button>Sign In</Button>
                </Form>
                <div className="mt-2 flex flex-col gap-2">
                    <Button variant="success">Create new account</Button>
                    <Button variant="none" text="default">Sign In as Guest</Button>
                    <Button variant="none" text="default">Sign In with Google</Button>
                </div>
            </Card>
        </div>
    );
};

export default SignIn;
