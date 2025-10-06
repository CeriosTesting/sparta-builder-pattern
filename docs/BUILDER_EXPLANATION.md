# How does the builder work?
For reference we are using the [AddressBuilder](../tests/builders/address-builder.ts)

## Initialization
- You cannot do new AddressBuilder() because the constructor is private.
- Instead, you start with one of the static factories:
    - AddressBuilder.create() → gives you a completely empty builder.
    - AddressBuilder.createWithDefaults() → gives you a builder already prefilled with faker values.

This enforces controlled entry points.

## Chaining setters
- Each setter (street(), city(), etc.) updates the internal address object.
- Each method returns this (the same builder instance).
- Because of this, you can chain calls:

```typescript
AddressBuilder.create()
  .street("Baker Street")
  .houseNumber(221)
  .city("London");
```

That’s fluent chaining: you never “lose” the builder in between calls.

## Finalizing with build()
- `build()` ends the process: it returns the constructed Address object.
- After calling `build()`, you now have a plain Address, not a builder.
- You cannot call `.street()` or `.city()` on the built object, because those methods exist only on the builder, not on the Address.

That’s why chaining stops at `build()`.

## Why you can’t go back to create

- `create()` or `createWithDefaults()` always starts a new instance.
- If you called it again mid-chain, you’d throw away what you’ve built so far, because each create() starts with a new AddressBuilder.

That’s why create is only at the beginning.

## Builder diagram

                ┌──────────────────────────────────────┐
                │   AddressBuilder.create()            │
                │   AddressBuilder.createWithDefaults()│
                └───────────────┬──────────────────────┘
                                │ (returns new builder)
                                ▼
                 ┌────────────────────────────────────┐
                 │        AddressBuilder (chain)      │
                 │                                    │
                 │ .street("Main St")                 │
                 │ .houseNumber(123)                  │
                 │ .city("New York")                  │
                 │ ...                                │
                 └────────────────┬───────────────────┘
                                  │
                                  ▼
                       ┌───────────────────┐
                       │  .build()         │
                       │  returns Address  │
                       └─────────┬─────────┘
                                 │
                                 ▼
                   ┌─────────────────────────┐
                   │ Address {               │
                   │   street: "Main St",    │
                   │   houseNumber: 123,     │
                   │   city: "New York",     │
                   │   ...                   │
                   │   }                     │
                   └─────────────────────────┘