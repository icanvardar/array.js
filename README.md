# plaxis

`plaxis` is a powerful, type-safe array management library for JavaScript and TypeScript. It supports both primitive and non-primitive data types, offering efficient memory management through custom allocators.

## Features

- **Primitive & Non-Primitive Data Handling:** Supports all standard primitive data types (boolean, integers, floats, bigints) and complex non-primitive data types (objects).
- **Dynamic Array Capacity:** Automatically expands storage to accommodate large data sets.
- **Memory-Efficient Allocators:** Built-in allocators for both primitive and non-primitive data types, ensuring efficient memory usage and storage.
- **Type Safety:** Generic class design that ensures type safety for stored data.

## Installation Options

```bash
npm install plaxis
```

```bash
bun add plaxis
```

## Usage

### Importing

```typescript
import ArrayList from 'plaxis';
```

### Creating an ArrayList for Primitive Types

```typescript
const primitiveList = new ArrayList<number>({ dataType: 'i32' }); // Allocates memory for 32-bit signed integers
primitiveList.setData(0, 42);
console.log(primitiveList.getData(0)); // 42
```

### Creating an ArrayList for Non-Primitive Types

```typescript
class MyObject {
  constructor(public name: string, public age: number) {}
}

const objectList = new ArrayList<MyObject>();
objectList.setData(0, new MyObject('Alice', 30));
console.log(objectList.getData(0)); // MyObject { name: 'Alice', age: 30 }
```

### Supported Primitive Data Types

- `bool`: Boolean (`true` or `false`)
- `i8`, `u8`: 8-bit signed and unsigned integers
- `i16`, `u16`: 16-bit signed and unsigned integers
- `i32`, `u32`: 32-bit signed and unsigned integers
- `f32`, `f64`: 32-bit and 64-bit floating point numbers
- `bigi64`, `bigu64`: 64-bit signed and unsigned BigInt numbers

### Dynamic Array Expansion

The library dynamically allocates memory as needed when adding data beyond the current capacity. For instance:

```typescript
primitiveList.setData(1000, 12345); // Automatically expands the array capacity if needed
```

## API Reference

### ArrayList Class

#### `constructor(config?: ArrayListConfig)`

Creates a new ArrayList. Optionally, you can pass a configuration object.

- **config**: `ArrayListConfig`
  - `dataType`: (Optional) Defines the data type (for primitive types) stored in the list.

#### `getData(index: Index): T | null`

Gets the data stored at the specified index.

- **index**: The index of the data to retrieve.

#### `setData(index: Index, item: T): void`

Sets the data at the specified index.

- **index**: The index at which the data should be stored.
- **item**: The data to store at the index.

### PrimitiveAllocator Class

Manages the memory and storage for primitive data types.

#### `getData(index: Index): T | null`

Retrieves the data at the given index.

#### `setData(index: Index, item: T): void`

Stores the data at the specified index.

### NonPrimitiveAllocator Class

Manages memory for non-primitive (object) data types.

#### `getData(index: Index): T | null`

Retrieves the object at the given index.

#### `setData(index: Index, item: T): void`

Stores an object at the specified index.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/icanvardar/plaxis/blob/main/LICENSE) file for details.
