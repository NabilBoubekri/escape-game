import "../index.css";
import { server } from "./server";
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach } from "vitest";

beforeEach(() => {  
	server.listen();
});
afterEach(() => {
	server.close();
});