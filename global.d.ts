interface Allocator<T> {
	getData(key: Key): T | null;
	setData(key: Key, item: T): void;
	ensureCapacity(key: Key): void;
}

type Index = number;

type TypedArray =
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

type PrimitiveDataType =
	"bool" |
	"i8" |
	"u8" |
	"i16" |
	"u16" |
	"i32" |
	"u32" |
	"f32" |
	"f64" |
	"bigi64" |
	"bigu64";

type PrimitiveAllocatorConfig = {
	dataType: PrimitiveDataType;
};

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
