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

    it("should render the correct sizes", () => {
        const { rerender } = render(
            <Button variant="default">
                Hello World!
            </Button>
        );

        const button = screen.getByRole("button");
        expect(button).toHaveClass("bg-sky-500");

        rerender(
            <Button variant="success">
                Hello World!
            </Button>
        );
        expect(button).toHaveClass("bg-green-500");

        rerender(
            <Button variant="danger">
                Hello World!
            </Button>
        );
        expect(button).toHaveClass("bg-red-500");

        rerender(
            <Button variant="none">
                Hello World!
            </Button>
        );
        expect(button).toHaveClass("bg-none");
    });

    it("should render the correct sizes", () => {
        const { rerender } = render(
            <Button size="sm">
                Hello World!
            </Button>
        );

        const button = screen.getByRole("button");
        expect(button).toHaveClass("px-3 py-1");

        rerender(
            <Button size="md">
                Hello World!
            </Button>
        );
        expect(button).toHaveClass("px-4 py-2");

        rerender(
            <Button size="lg">
                Hello World!
            </Button>
        );
        expect(button).toHaveClass("px-8 py-4");

        rerender(
            <Button size="none">
                Hello World!
            </Button>
        );
        expect(button).toHaveClass("p-0");
    })

    it("should render the correct text colors", () => {
        const { rerender } = render(
            <Button text="white">
                Hello World!
            </Button>
        );

        const button = screen.getByRole("button");
        expect(button).toHaveClass("text-white");

        rerender(
            <Button text="default">
                Hello World!
            </Button>
        );
        expect(button).toHaveClass("text-sky-700");

        rerender(
            <Button text="danger">
                Hello World!
            </Button>
        );
        expect(button).toHaveClass("text-red-700");

        rerender(
            <Button text="success">
                Hello World!
            </Button>
        );
        expect(button).toHaveClass("text-green-700");
    })
});
