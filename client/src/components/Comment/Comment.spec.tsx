import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Comment from "./Comment";

describe("Comment", () => {
    it("should render and match the snapshot", () => {
        const { container } = render(<Comment />);

        expect(container).toMatchSnapshot();
    })
})
