import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PreviewCard from "./PreviewCard";

const mockUser = {
    firstName: "John",
    lastName: "Doe",
    friends: [{ id: "2" }, { id: "3" }, { id: "1" }],
    bannerURL: "https://picsum.photos/536/354",
    avatarURL: "https://avatars.githubusercontent.com/u/75290989?s=400&v=4",
};

describe("PreviewCard", () => {
    it("should render the name, profile picture, buttons", () => {
        render(<PreviewCard user={mockUser} />);
        screen.getByAltText("Profile Picture");
        screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`);
        expect(screen.getAllByRole('button')).toHaveLength(2);
    })
})

