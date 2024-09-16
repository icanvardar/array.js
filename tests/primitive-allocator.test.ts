import { test, expect, mock } from "bun:test";
import PrimitiveAllocator from "../core/primitive-allocator";

const DECIMAL_TOLERANCE_LEVEL = 1e-7;

const createPrimitiveAllocator = <T extends number | bigint | boolean>(dataType: PrimitiveDataType) => {
	return mock(() => {
		return new PrimitiveAllocator<T>({ dataType });
	});
};

test("test bool type", () => {
	const allocator = createPrimitiveAllocator<boolean>("bool")();

	for (let i = 0; i <= 32; ++i) {
		allocator.setData(i, true);
	}

	for (let i = 0; i <= 32; ++i) {
		expect(Boolean(allocator.getData(i))).toBeTrue();
	}
});

test("test i8 type", () => {
	const allocator = createPrimitiveAllocator<number>("i8")();

	let items: number[] = [];
	for (let i = 0; i <= 32; ++i) {
		const randNum = Math.floor(Math.random() * 256) - 128;
		allocator.setData(i, randNum);
		items.push(randNum);
	}

	for (let i = 0; i <= items.length; ++i) {
		const data = allocator.getData(i);
		if (data) {
			expect(data).toBe(items[i]);
		}
	}
});

test("test u8 type", () => {
	const allocator = createPrimitiveAllocator<number>("u8")();

	let items: number[] = [];
	for (let i = 0; i <= 32; ++i) {
		const randNum = Math.floor(Math.random() * 256);
		allocator.setData(i, randNum);
		items.push(randNum);
	}

	for (let i = 0; i <= items.length; ++i) {
		const data = allocator.getData(i);
		if (data) {
			expect(data).toBe(items[i]);
		}
	}
});

test("test i16 type", () => {
	const allocator = createPrimitiveAllocator<number>("i16")();

	let items: number[] = [];
	for (let i = 0; i <= 32; ++i) {
		const randNum = Math.floor(Math.random() * (32767 - (-32768) + 1)) + (-32768);
		allocator.setData(i, randNum);
		items.push(randNum);
	}

	for (let i = 0; i <= items.length; ++i) {
		const data = allocator.getData(i);
		if (data) {
			expect(data).toBe(items[i]);
		}
	}
});

test("test u16 type", () => {
	const allocator = createPrimitiveAllocator<number>("u16")();

	let items: number[] = [];
	for (let i = 0; i <= 32; ++i) {
		const randNum = Math.floor(Math.random() * 65536);
		allocator.setData(i, randNum);
		items.push(randNum);
	}


	for (let i = 0; i <= 32; ++i) {
		const data = allocator.getData(i);
		if (data) {
			expect(data).toBe(items[i]);
		}
	}
});

test("test i32 type", () => {
	const allocator = createPrimitiveAllocator<number>("i32")();

	let items: number[] = [];
	for (let i = 0; i <= 32; ++i) {
		const randNum = Math.floor(Math.random() * (2147483647 - (-2147483648) + 1)) + (-2147483648);
		allocator.setData(i, randNum);
		items.push(randNum);
	}


	for (let i = 0; i <= 32; ++i) {
		const data = allocator.getData(i);
		if (data) {
			expect(data).toBe(items[i]);
		}
	}
});

test("test u32 type", () => {
	const allocator = createPrimitiveAllocator<number>("u32")();

	let items: number[] = [];
	for (let i = 0; i <= 32; ++i) {
		const randNum = Math.floor(Math.random() * 4294967296);
		allocator.setData(i, randNum);
		items.push(randNum);
	}


	for (let i = 0; i <= 32; ++i) {
		const data = allocator.getData(i);
		if (data) {
			expect(data).toBe(items[i]);
		}
	}
});

test("test f32 type", () => {
	const allocator = createPrimitiveAllocator<number>("f32")();

	let items: number[] = [];
	for (let i = 0; i <= 32; ++i) {
		const randNum = (Math.random() * 2 - 1) * 3.4e-38;
		allocator.setData(i, randNum);
		items.push(randNum);
	}


	for (let i = 0; i <= 32; ++i) {
		const data = allocator.getData(i);
		if (data) {
			expect(Math.abs(data - items[i])).toBeLessThan(DECIMAL_TOLERANCE_LEVEL);
		}
	}
});

test("test f64 type", () => {
	const allocator = createPrimitiveAllocator<number>("f64")();

	let items: number[] = [];
	for (let i = 0; i <= 32; ++i) {
		const randNum = (Math.random() * 2 - 1) * 1.8e-308;
		allocator.setData(i, randNum);
		items.push(randNum);
	}


	for (let i = 0; i <= 32; ++i) {
		const data = allocator.getData(i);
		if (data) {
			expect(Math.abs(data - items[i])).toBeLessThan(DECIMAL_TOLERANCE_LEVEL);
		}
	}
});

test("test bigi64 type", () => {
	const allocator = createPrimitiveAllocator<bigint>("bigi64")();

	let items: bigint[] = [];
	for (let i = 0; i <= 32; ++i) {
		const randNum = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)) * (Math.random() > 0.5 ? 1n : -1n);
		allocator.setData(i, randNum);
		items.push(randNum);
	}


	for (let i = 0; i <= 32; ++i) {
		const data = allocator.getData(i);
		if (data) {
			expect(data).toBe(items[i]);
		}
	}
});

test("test bigu64 type", () => {
	const allocator = createPrimitiveAllocator<bigint>("bigu64")();

	let items: bigint[] = [];
	for (let i = 0; i <= 32; ++i) {
		const randNum = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
		allocator.setData(i, randNum);
		items.push(randNum);
	}

	for (let i = 0; i <= 32; ++i) {
		const data = allocator.getData(i);
		if (data) {
			expect(data).toBe(items[i]);
		}
	}
});

// TODO: create out-of-bounds test cases
