import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Post } from "./Post";

describe("Post", () => {
    it("should render and match the snapshot", () => {
        const { container } = render(<Post> </Post>);

        expect(container).toMatchSnapshot();
    });
})

