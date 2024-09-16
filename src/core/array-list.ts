import PrimitiveAllocator from "./primitive-allocator";
import NonPrimitiveAllocator from "./non-primitive-allocator";

export default class ArrayList<T extends SupportedPrimitives | SupportedNonPrimitives> {
	private data: Allocator<T>;

	constructor(config?: ArrayListConfig) {
		if (config && config.dataType) {
			this.data = new PrimitiveAllocator({ dataType: config.dataType }) as Allocator<T>;
		} else {
			this.data = new NonPrimitiveAllocator() as Allocator<T>;
		}
	}

	public getData(index: Index): SupportedPrimitives | SupportedNonPrimitives | null {
		return this.data.getData(index);
	}

	public setData(index: Index, item: T) {
		this.data.setData(index, item as never);
	}
}

