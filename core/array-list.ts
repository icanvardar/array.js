import PrimitiveAllocator from "./primitive-allocator";
import NonPrimitiveAllocator from "./non-primitive-allocator";

type SupportedPrimitives = number | boolean | bigint;
type SupportedNonPrimitives = object;

type Allocator<T> = T extends SupportedPrimitives
	? PrimitiveAllocator<T>
	: T extends SupportedNonPrimitives
	? NonPrimitiveAllocator<T>
	: never;

type ArrayListConfig = {
	dataType?: PrimitiveDataType;
};

export default class ArrayList<T extends SupportedPrimitives | SupportedNonPrimitives> {
	private data: Allocator<T>;

	constructor(config?: ArrayListConfig) {
		if (config && config.dataType) {
			this.data = new PrimitiveAllocator({ dataType: config.dataType }) as Allocator<T>;
		} else {
			this.data = new NonPrimitiveAllocator() as Allocator<T>;
		}
	}

	public getData(key: Key): SupportedPrimitives | SupportedNonPrimitives | null {
		return this.data.getData(key);
	}

	public setData(key: Key, item: T) {
		this.data.setData(key, item as never);
	}
}

