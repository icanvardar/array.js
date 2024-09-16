import { DEFAULT_CAPACITY } from "../constants";
import Cache from "../utils/cache";

export default class NonPrimitiveAllocator<T extends object> extends Cache<string, T> implements Allocator<T> {
	public data: Uint8Array;
	private cap: number;

	constructor() {
		super();

		this.cap = DEFAULT_CAPACITY * 6;

		this.data = new Uint8Array(new ArrayBuffer(this.cap));
	}

	get length(): number {
		let length = this.cap;

		while (length > 0 && this.data[length - 1] === 0) {
			length--;
		}

		return length / 6;
	}

	get capacity(): number {
		return this.data.length / 6;
	}

	public getData(key: Key): T | null {
		const offset = this.data.slice(key * 6, (key + 1) * 6);

		return this.getItem(String.fromCharCode(...offset));
	}

	public setData(key: Key, item: T): void {
		this.ensureCapacity(key);

		const pointer = this.generatePointer();
		const encoder = new TextEncoder();

		this.data.set(encoder.encode(pointer), key * 6);

		super.addItem(pointer, item);
	}

	public ensureCapacity(key: Key): void {
		if ((key * 6) < this.cap) {
			return;
		}

		const tmp = Math.floor((key + 1) * 6 / 4)
		const tmp2 = Math.floor(this.cap / 4);
		const diff = (tmp - tmp2);

		this.cap += (diff * (4 * 6));

		const newBuffer = new ArrayBuffer(this.cap);

		const newData = new Uint8Array(newBuffer);
		newData.set(this.data.buffer as never);

		this.data = newData;
	}

	private generatePointer(): string {
		const pointer = Math.floor(Math.random() * 0xFFFFFF);

		return `${pointer.toString(16).padStart(6, '0').toUpperCase()}`;
	}
}
