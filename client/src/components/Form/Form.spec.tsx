import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Form from "./Form";
import { Input } from "./Input";
import Button from "../Button";

describe("Form", () => {
    it("should render the form and match the snapshot", () => {
        const { container } = render(
            <Form>
                <Input id="name" name="name" />
                <Button type="submit">Submit</Button>
            </Form>
        );
        expect(container).toMatchSnapshot();
    });
});
