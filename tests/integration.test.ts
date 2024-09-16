import { test, expect, mock } from "bun:test";
import ArrayList from "../src/core/array-list";
import { testType, type TestType } from "./common";

const createPrimitiveArrayList = <T extends SupportedPrimitives | SupportedNonPrimitives>(config?: ArrayListConfig) => {
	return mock(() => {
		return new ArrayList<T>(config);
	});
};

test("test primitive type", () => {
	const arrayList = createPrimitiveArrayList<number>({ dataType: "u8" })();

	let items: number[] = [];
	for (let i = 0; i <= 32; ++i) {
		const randNum = Math.floor(Math.random() * 256);
		arrayList.setData(i, randNum);
		items.push(randNum);
	}

	for (let i = 0; i <= items.length; ++i) {
		const data = arrayList.getData(i);
		if (data) {
			expect(data).toBe(items[i]);
		}
	}
});

test("test non-primitive type", () => {
	const arrayList = createPrimitiveArrayList<TestType>()();

	for (let i = 0; i <= 32; ++i) {
		arrayList.setData(i, testType);
	}

	for (let i = 0; i <= 32; ++i) {
		expect(arrayList.getData(i)).toBe(testType);
	}
});

// TODO: add negative cases
