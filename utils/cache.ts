export default abstract class Cache<T, K extends object> {
	private memory: Map<T, WeakRef<K>>;

	constructor() {
		this.memory = new Map<T, WeakRef<K>>();
	}

	protected addItem(key: T, item: K) {
		this.memory.set(key, new WeakRef<K>(item));
	}

	protected getItem(key: T): K | null {
		const ref = this.memory.get(key);

		if (ref) {
			return ref.deref() || null;
		}

		return null;
	}

	protected remove(key: T) {
		this.memory.delete(key);
	}

	protected clear() {
		this.memory.clear();
	}
}
