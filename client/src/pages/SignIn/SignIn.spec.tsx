import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn, { SignUp } from "./SignIn";

describe("SignIn", () => {
    it("should render and match the snapshot", () => {
        const { container } = render(<SignIn />);

        expect(container).toMatchSnapshot();
    })
})

describe("SignUp", () => {
    it("should render and match the snapshot", () => {
        const { container } = render(<SignUp />);

        expect(container).toMatchSnapshot();
    })
})
