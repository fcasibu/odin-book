import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProfileBodySidebar, ProfileHeader } from "./Profile";

const mockUser = {
    firstName: "John",
    lastName: "Doe",
    friends: [{ id: "2" }],
    bannerURL: "",
    avatarURL: "",
};

describe("Profile", () => {
    it("should render the banner, profile picture, name, friends, and navigation", () => {
        render(<ProfileHeader user={mockUser} />);
        screen.getByAltText("Banner");
        screen.getByAltText("Profile Picture");
        screen.getByText(mockUser.firstName);
        screen.getByText(`${mockUser.friends.length} friends`);
        expect(screen.getAllByRole("listitem")).toHaveLength(3);
    });

    it("should render the info, friends, and collections card in the sidebar", () => {
        render(<ProfileBodySidebar user={mockUser} />);
        screen.getByText("Intro")
        screen.getByText("Friends")
        screen.getByText("Collection");
    })
});
