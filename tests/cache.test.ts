import { test, expect, mock } from "bun:test";
import Cache from "../src/utils/cache";
import { testType, type TestType } from "./common";

const createCacheInheritant = mock(() => {
	class CacheInheritant extends Cache<string, TestType> {
		constructor() {
			super();
		}

		public get size(): number {
			return super.size;
		}

		public addItem(key: string, item: TestType) {
			super.addItem(key, item);
		}

		public getItem(key: string): TestType | null {
			return super.getItem(key);
		}

		public removeItem(key: string) {
			return super.removeItem(key);
		}

		public clearMemory() {
			return super.clearMemory();
		}
	}

	return new CacheInheritant();
});

test("test addItem & getItem", () => {
	const cache = createCacheInheritant();

	let items: TestType[] = [];
	for (let i = 0; i <= 32; ++i) {
		cache.addItem(i.toString(), testType);
		items.push(testType);
	}

	for (let i = 0; i <= items.length; ++i) {
		const data = cache.getItem(i.toString());
		if (data) {
			expect(data).toBe(items[i]);
		}
	}
});

test("test removeItem", () => {
	const cache = createCacheInheritant();
	const dataLocation: string = "0xABCDE";

	cache.addItem(dataLocation, testType);

	expect(cache.getItem(dataLocation)).toBe(testType);

	cache.removeItem(dataLocation);

	expect(cache.getItem(dataLocation)).toBeNull();
});

test("test clearMemory", () => {
	const cache = createCacheInheritant();

	let items: TestType[] = [];
	for (let i = 0; i < 32; ++i) {
		cache.addItem(i.toString(), testType);
		items.push(testType);
	}

	expect(cache.size).toBe(32);

	cache.clearMemory();

	expect(cache.size).toBe(0);
});
