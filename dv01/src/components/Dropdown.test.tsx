import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "./Dropdown";

/** Dropdown component unit test */
describe("Dropdown", () => {
    it("Renders options and changes value on selection", () => {
        const options = ["fi", "fie", "fo"];
        const handleChange = jest.fn();
        const label = 'label';
        const dataTestId = 'testId';

        render(<Dropdown
            options={options}
            label={label}
            value="fi"
            onChange={handleChange}
            dataTestId={dataTestId}
        />);

        // Confirm it renders all options
        options.forEach((option) => {
            expect(screen.getByText(option)).toBeInTheDocument();
        });

        const select = screen.getByTestId(dataTestId);

        // Simulate changing the value
        fireEvent.change(select, { target: { value: "fo" } });

        expect(handleChange).toHaveBeenCalledWith("fo");
    });
})