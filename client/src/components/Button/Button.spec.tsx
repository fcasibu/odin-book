import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button", () => {
    it("should render and match the snapshot", () => {
        const { container } = render(
            <Button variant="success" size="sm">
                Hello World!
            </Button>
        );

        expect(container).toMatchSnapshot();
    });

    it("should render the correct sizes and colors", () => {
        const { rerender } = render(
            <Button variant="default" size="sm">
                Hello World!
            </Button>
        );

        const button = screen.getByRole("button");
        expect(button).toHaveClass("bg-sky-500 px-2 py-1");

        rerender(
            <Button variant="success" size="md">
                Hello World!
            </Button>
        );

        expect(button).toHaveClass("bg-green-500 px-4 py-2");

        rerender(
            <Button variant="default" size="lg">
                Hello World!
            </Button>
        );

        expect(button).toHaveClass("bg-sky-500 px-6 py-4");
    });
});
