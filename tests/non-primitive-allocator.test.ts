import { test, expect, mock } from "bun:test";
import NonPrimitiveAllocator from "../src/core/non-primitive-allocator";
import { testInterface, testType, type TestInterface, type TestType } from "./common";

const createNonPrimitiveAllocator = <T extends object>() => {
	return mock(() => {
		return new NonPrimitiveAllocator<T>();
	});
};

test("test custom type", () => {
	const allocator = createNonPrimitiveAllocator<TestType>()();

	for (let i = 0; i <= 32; ++i) {
		allocator.setData(i, testType);
	}

	for (let i = 0; i <= 32; ++i) {
		expect(allocator.getData(i)).toBe(testType);
	}
});

test("test custom interface", () => {
	const allocator = createNonPrimitiveAllocator<TestInterface>()();

	for (let i = 0; i <= 32; ++i) {
		allocator.setData(i, testInterface);
	}
	for (let i = 0; i <= 32; ++i) {
		expect(allocator.getData(i)).toBe(testInterface);
	}
});

// TODO: create out-of-bounds test cases
