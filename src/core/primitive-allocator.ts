import { DEFAULT_CAPACITY } from "../constants";
import type { Allocator, Index, PrimitiveDataType } from "../types";

export type TypedArray =
	Int8Array |
	Uint8Array |
	Int16Array |
	Uint16Array |
	Int32Array |
	Uint32Array |
	Float32Array |
	Float64Array |
	BigInt64Array |
	BigUint64Array;

const operandTable: Record<PrimitiveDataType, { get: string, set: string, array: new (buffer: ArrayBuffer) => TypedArray }> = {
	bool: { get: "getUint8", set: "setUint8", array: Uint8Array },
	i8: { get: "getInt8", set: "setInt8", array: Int8Array },
	u8: { get: "getUint8", set: "setUint8", array: Uint8Array },
	i16: { get: "getInt16", set: "setInt16", array: Int16Array },
	u16: { get: "getUint16", set: "setUint16", array: Uint16Array },
	i32: { get: "getInt32", set: "setInt32", array: Int32Array },
	u32: { get: "getUint32", set: "setUint32", array: Uint32Array },
	f32: { get: "getFloat32", set: "setFloat32", array: Float32Array },
	f64: { get: "getFloat64", set: "setFloat64", array: Float64Array },
	bigi64: { get: "getBigInt64", set: "setBigInt64", array: BigInt64Array },
	bigu64: { get: "getBigUint64", set: "setBigUint64", array: BigUint64Array },
}

export type PrimitiveAllocatorConfig = {
	dataType: PrimitiveDataType;
};

export default class PrimitiveAllocator<T extends boolean | number | bigint> implements Allocator<T> {
	private dataType: PrimitiveDataType;
	private data: TypedArray;
	private cap: number;

	constructor(config: PrimitiveAllocatorConfig) {
		this.dataType = config.dataType;
		this.cap = DEFAULT_CAPACITY * this.getBytesMultiplier();

		this.data = new operandTable[this.dataType].array(this.generateArrayBuffer());
	}

	get length(): number {
		let length = this.cap;

		while (length > 0 && this.data[length - 1] === 0) {
			length--;
		}

		return length;
	}

	get capacity(): number {
		return this.cap / this.getBytesMultiplier();
	}

	public getData(index: Index): T | null {
		const sig = operandTable[this.dataType].get as keyof DataView;

		return (new DataView(this.data.buffer)[sig] as Function)(index * this.getBytesMultiplier()) as T;
	}

	public setData(index: Index, item: T): void {
		this.ensureCapacity(index);

		const sig = operandTable[this.dataType].set as keyof DataView;

		(new DataView(this.data.buffer)[sig] as Function)
			(index * this.getBytesMultiplier(), (this.dataType === "bigu64" || this.dataType === "bigi64") ? item as bigint : item as number);
	}

	public ensureCapacity(index: Index): void {
		if (index * this.getBytesMultiplier() < this.cap) {
			return;
		}

		const tmp = Math.ceil((index + 1) * this.getBytesMultiplier() / 4);
		const tmp2 = Math.floor(this.cap / 4);
		const diff = (tmp - tmp2);

		this.cap += (diff * this.getBytesMultiplier() * 4);

		const newBuffer = this.generateArrayBuffer();

		const newData = new operandTable[this.dataType].array(newBuffer);

		if (this.isBigIntTypedArray(this.data) && this.isBigIntTypedArray(newData)) {
			newData.set(this.data.subarray(0, this.data.length) as ArrayLike<bigint>);
		} else if (!this.isBigIntTypedArray(this.data) && !this.isBigIntTypedArray(newData)) {
			newData.set(this.data.subarray(0, this.data.length) as ArrayLike<number>);
		} else {
			throw new Error("Mismatched data types between old and new array buffers.");
		}

		this.data = newData;
	}

	private isBigIntTypedArray(arr: TypedArray): arr is BigInt64Array | BigUint64Array {
		return arr instanceof BigInt64Array || arr instanceof BigUint64Array;
	}

	private generateArrayBuffer() {
		return new ArrayBuffer(this.cap * this.getBytesMultiplier());
	}

	private getBytesMultiplier() {
		switch (this.dataType) {
			case "f64":
			case "bigu64":
			case "bigi64":
				return 8;
			case "f32":
			case "u32":
			case "i32":
				return 4;
			case "u16":
			case "i16":
				return 2;
			case "bool":
			case "u8":
			case "i8":
			default:
				return 1;
		}

	}
}
