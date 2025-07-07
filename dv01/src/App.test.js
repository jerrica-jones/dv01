import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe("Test App with Dropdown", () => {
  it("Updates value when dropdown changes", () => {
    render(<App />);

    // Confirm initial value
    expect(screen.getByTestId("homeOwnershipFilterDropdown")).toHaveTextContent("All");
    expect(screen.getByTestId("quarterFilterDropdown")).toHaveTextContent("All");
    expect(screen.getByTestId("termFilterDropdown")).toHaveTextContent("All");
    expect(screen.getByTestId("yearFilterDropdown")).toHaveTextContent("All");

    const select = screen.getByTestId("homeOwnershipFilterDropdown");
    fireEvent.change(select, { target: { value: "Own" } });

    // The paragraph should update
    expect(screen.getByTestId("homeOwnershipFilterDropdown")).toHaveTextContent("Own");
  });
});