import PrimitiveAllocator from "./primitive-allocator";
import NonPrimitiveAllocator from "./non-primitive-allocator";
import type { ArrayListConfig, Index } from "../types";

type SupportedPrimitives = number | boolean | bigint;
type SupportedNonPrimitives = object;

type ArrayListAllocator<T> = T extends SupportedPrimitives
	? PrimitiveAllocator<T>
	: T extends SupportedNonPrimitives
	? NonPrimitiveAllocator<T>
	: never;

export default class ArrayList<T extends SupportedPrimitives | SupportedNonPrimitives> {
	private data: ArrayListAllocator<T>;

	constructor(config?: ArrayListConfig) {
		if (config && config.dataType) {
			this.data = new PrimitiveAllocator({ dataType: config.dataType }) as ArrayListAllocator<T>;
		} else {
			this.data = new NonPrimitiveAllocator() as ArrayListAllocator<T>;
		}
	}

	public getData(index: Index): SupportedPrimitives | SupportedNonPrimitives | null {
		return this.data.getData(index);
	}

	public setData(index: Index, item: T) {
		this.data.setData(index, item as never);
	}
}

