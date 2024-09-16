import { DEFAULT_CAPACITY } from "../constants";

const operandTable: Record<PrimitiveDataType, { get: string, set: string, array: new (buffer: ArrayBuffer) => TypedArray }> = {
	bool: { get: "getUint8", set: "setUint8", array: Uint8Array },
	i8: { get: "getInt8", set: "setInt8", array: Int8Array },
	u8: { get: "getUint8", set: "setUint8", array: Uint8Array },
	i16: { get: "getInt16", set: "setInt16", array: Int16Array },
	u16: { get: "getUint16", set: "setUint16", array: Uint16Array },
	i32: { get: "getInt32", set: "setInt32", array: Int32Array },
	u32: { get: "getUint32", set: "setUint32", array: Uint32Array },
	f32: { get: "getInt8", set: "setInt8", array: Float32Array },
	f64: { get: "getInt8", set: "setInt8", array: Float64Array },
	bigi64: { get: "getBigInt64", set: "setBigInt64", array: BigInt64Array },
	bigu64: { get: "getBigUint64", set: "setBigUint64", array: BigUint64Array },
}

export default class PrimitiveAllocator<T extends boolean | number | bigint> implements Allocator<T> {
	private dataType: PrimitiveDataType;
	private data: TypedArray;
	private capacity: number;

	constructor(config: PrimitiveAllocatorConfig) {
		this.dataType = config.dataType;
		this.capacity = DEFAULT_CAPACITY;

		this.data = new operandTable[this.dataType].array(this.generateArrayBuffer());
	}

	public getData(key: Key): T | null {
		const sig = operandTable[this.dataType].get as keyof DataView;

		return (new DataView(this.data.buffer)[sig] as Function)(key) as T;
	}

	public setData(key: Key, item: T): void {
		this.ensureCapacity(key);

		const sig = operandTable[this.dataType].set as keyof DataView;

		(new DataView(this.data.buffer)[sig] as Function)
			(key, (this.dataType === "bigu64" || this.dataType === "bigi64") ? item as bigint : item as number);
	}

	public ensureCapacity(key: Key): void {
		if (key < this.capacity) {
			return;
		}

		const tmp = Math.ceil((key + 1) / 4)
		const tmp2 = Math.floor(this.capacity / 4);
		const diff = (tmp - tmp2);

		this.capacity += (diff * 4);

		const newBuffer = this.generateArrayBuffer();

		const newData = new operandTable[this.dataType].array(newBuffer);
		newData.set(this.data.buffer as never);

		this.data = newData;
	}

	protected generateArrayBuffer() {
		let buffer: ArrayBuffer;

		switch (this.dataType.slice(-2)) {
			case "64":
				buffer = new ArrayBuffer(this.capacity * 8);
				break;
			case "32":
				buffer = new ArrayBuffer(this.capacity * 4);
				break;
			case "16":
				buffer = new ArrayBuffer(this.capacity * 2);
				break;
			case "8":
			default:
				buffer = new ArrayBuffer(this.capacity);
				break;
		}

		return buffer;
	}
}
