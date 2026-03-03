# Exercise 10: Use the `@cerios/cerios-builder` Package

You’ve built custom builders in this workshop.
Now let’s try an external package approach with **type-safe required fields**.

Package: [@cerios/cerios-builder](https://www.npmjs.com/package/@cerios/cerios-builder)

---

## Goal

- Use a package-based builder with **TypeScript type safety**
- Verify that **required fields must be set before build**

---

## Part 1: Install the package

Run:

```bash
npm i -D @cerios/cerios-builder
```

---

## Part 2: Create a small demo test

- Open the package page and README: [@cerios/cerios-builder](https://www.npmjs.com/package/@cerios/cerios-builder)
- Read through the documentation and **try all TypeScript type-based examples** from the README
- Recreate those examples in a local test file, for example: `tests/bonus-cerios-builder.test.ts`
- For each example, verify the behavior in your editor (TypeScript checks) and by running tests where applicable

### Mandatory check (most important)

When using the **type version** of the builder:

- `build()` must only succeed when **all required fields of the type** are set via the builder
- If one required field is missing, `build()` should be blocked by TypeScript (compile-time)
- Add one explicit "missing required field" attempt to confirm this behavior

---

## Done

If this works, you now have a clean demo showing how `@cerios/cerios-builder` helps enforce required fields with TypeScript types.
That is exactly the kind of reliability we want in test-data creation.

### [Go to the next exercise](./EXERCISE11.md)
