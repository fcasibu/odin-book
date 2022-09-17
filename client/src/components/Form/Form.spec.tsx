import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Form from "./Form";
import { Input } from "./Input";
import Button from "../Button";
import { TextArea } from "./TextArea";

// TODO: useForm
describe("Form", () => {
    it("should render the form and match the snapshot", () => {
        const { container } = render(
            <Form>
                <Input id="name" name="name" label="Name" />
                <Button type="submit">Submit</Button>
            </Form>
        );
        expect(container).toMatchSnapshot();
    });

    it("should render error message correctly", () => {
        const mockErrors = [{ message: "Invalid Name!" }, { message: "Invalid Post!" }];
        render(
            <>
                <Input id="name" name="name" error={mockErrors[0]} />
                <TextArea id="post" name="post" error={mockErrors[1]} />
            </>
        );

        const errorElements = screen.getAllByRole("alert");
        expect(errorElements[0]).toHaveTextContent(mockErrors[0].message);
        expect(errorElements[1]).toHaveTextContent(mockErrors[1].message);
    });
});
