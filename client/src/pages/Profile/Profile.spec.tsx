import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "./Profile";

describe("Profile", () => {
    it("should render the banner, profile picture, name, friends, and navigation", () => {
        const mockUser = { firstName: "John", lastName: "Doe", friends: [{}], bannerURL: "", avatarURL: "" };
        render(<Profile user={mockUser} />);
        screen.getByAltText("Banner");
        screen.getByAltText("Profile Picture");
        screen.getByText(mockUser.firstName);
        screen.getByText(`${mockUser.friends.length} friends`);
        screen.getAllByRole("listitem");
    });
});
