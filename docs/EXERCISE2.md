# Exercise 2: Create Missing Types - Building Your Own Blueprints

![](../images//exercise2.png)

In Exercise 1, you learned about the importance of having "blueprints" (types) for your data. Now it's time to create your own blueprints!

## The Mission
Looking at our [Person Schema](./PERSON_SCHEMA.md), we can see that a person can have **contacts** (like email addresses and phone numbers). However, we're missing two important blueprints:
- `ContactType` enum (defining what types of contact info we can store)
- `Contact` type (defining the structure of contact information)

## Step 1: Create the ContactType Enum
Think of an **enum** as a list of allowed choices, like a dropdown on a website.

1. **Create a new file:** `contact-type.ts` in the `tests/enums/` folder
2. **Use the existing [`Gender` enum](../tests/enums/gender.ts) as your template**
3. **Define these contact types** (from the Person Schema):
   - "email"
   - "phone"
   - "mobile-phone"

**💡 Tip:** Copy the Gender enum and modify it to create ContactType. Replace the gender values with the contact type values listed above.

## Step 2: Create the Contact Type
A **type** defines the shape of an object - what properties it must have and what kind of data each property should contain.

1. **Create a new file:** `contact.ts` in the `tests/models/` folder
2. **Use the existing [`Person` type](../tests/models/person.ts) as your reference**
3. **Define a Contact with these properties** (from the Person Schema):
   - `type`: ContactType (use the enum you just created!)
   - `value`: string (the actual email/phone number)
   - `isVerified`: boolean (true/false if the contact is confirmed)

**💡 Tips:**
- Don't forget to import the `ContactType` enum at the top of your file
- Look at how `Person` imports and uses the `Gender` enum for guidance

## Step 3: Update the Person Type
Once you've created both files, you'll need to add the `contacts` property to the Person type:

1. **Open [`Person`](../tests/models/person.ts)**
2. **Import your new Contact type** at the top
3. **Add the contacts property:** `contacts?: Contact[];`

The `?` makes it optional, and `Contact[]` means it's an array (list) of Contact objects.

## What You've Mastered
You've just learned how to:
- ✅ Create enums to define allowed values (like a controlled vocabulary)
- ✅ Create types to define object structures (like blueprints)
- ✅ Import and use types in other files
- ✅ Translate JSON schema documentation into TypeScript code

This skill is fundamental to building robust, type-safe test frameworks!

### [Go back to Exercises](../README.md#exercises)
