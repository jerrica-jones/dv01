import '@testing-library/jest-dom';

// Mock ResizeObserver
class ResizeObserver {
    observe() { };
    unobserve() { };
    disconnect() { };
}

(global as any).ResizeObserver = ResizeObserver;