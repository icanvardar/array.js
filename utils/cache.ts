export default class Cache<T extends object> {
	private memory: Map<number, WeakRef<T>>;

	constructor() {
		this.memory = new Map<number, WeakRef<T>>();
	}

	public add(key: number, item: T) {
		this.memory.set(key, new WeakRef<T>(item));
	}

	public get(key: number): T | null {
		const ref = this.memory.get(key);

		if (ref) {
			return ref.deref() || null;
		}

		return null;
	}

	public remove(key: number) {
		this.memory.delete(key);
	}

	public clear() {
		this.memory.clear();
	}
}
