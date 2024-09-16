import { test, expect, mock } from "bun:test";
import NonPrimitiveAllocator from "../core/non-primitive-allocator";
import type { TestInterface, TestType } from "./common";

const createNonPrimitiveAllocator = <T extends object>() => {
	return mock(() => {
		return new NonPrimitiveAllocator<T>();
	});
};

test("test custom type", () => {
	const allocator = createNonPrimitiveAllocator<TestType>()();

	const testType: TestType = {
		field1: 1,
		field2: "test",
		field3: {
			field31: 1,
			field32: true,
		},
	};

	for (let i = 0; i <= 32; ++i) {
		allocator.setData(i, testType);
	}

	for (let i = 0; i <= 32; ++i) {
		expect(allocator.getData(i)).toBe(testType);
	}
});

test("test custom interface", () => {
	const allocator = createNonPrimitiveAllocator<TestInterface>()();

	const testType: TestInterface = {
		field1: 1,
		field2: "test",
		field3: {
			field31: 1,
			field32: true,
		},
	};

	for (let i = 0; i <= 32; ++i) {
		allocator.setData(i, testType);
	}
	for (let i = 0; i <= 32; ++i) {
		expect(allocator.getData(i)).toBe(testType);
	}
});

// TODO: create out-of-bounds test cases
