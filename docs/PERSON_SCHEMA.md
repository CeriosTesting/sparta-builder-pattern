# Person data model (Builder Workshop)

This project models a Person with required and optional fields. Use this as the contract your builders must satisfy.

## Person
Required properties:
- uuid: string (e.g., UUID v4)
- firstName: string
- lastName: string
- gender: Gender (see options below)
- dateOfBirth: string (ISO 8601, e.g., "1990-04-15T00:00:00.000Z")
- isActive: boolean
- address: Address

Optional properties:
- contacts?: Contact[]
- hobbies?: string[]
- notes?: string

## Address
- street: string
- houseNumber: number
- city: string
- postalCode: string (format should be ####?? e.g., "1234AB")
- countryCode: string

## Contact
- type: ContactType (see options below):
- value: string
- isVerified: boolean

## Options
Gender (string values):
- "male"
- "female"
- "other"

ContactType (string values):
- "email"
- "phone"
- "mobile-phone"

## Examples

Complete
```json
{
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "Logan",
  "lastName": "Veth",
  "gender": "male",
  "dateOfBirth": "1990-04-15T00:00:00.000Z",
  "isActive": true,
  "address": {
    "street": "Orteliuslaan",
    "houseNumber": "1000",
    "city": "Utrecht",
    "postalCode": "3528 BD",
    "countryCode": "NL"
  },
  "contacts": [
    { "type": "email", "value": "logan.veth@cerios.com", "isVerified": true },
    { "type": "phone", "value": "+31-612345678", "isVerified": false }
  ],
  "hobbies": ["Cycling", "Painting", "Cooking"],
  "notes": "Allergic to peanuts."
}
```

Minimal (required fields only)
```json
{
  "uuid": "123e4567-e89b-12d3-a456-426614174000",
  "firstName": "Logan",
  "lastName": "Veth",
  "gender": "male",
  "dateOfBirth": "1990-04-15T00:00:00.000Z",
  "isActive": true,
  "address": {
    "street": "Orteliuslaan",
    "houseNumber": "1000",
    "city": "Utrecht",
    "postalCode": "3528 BD",
    "countryCode": "NL"
  }
}
```

### [Go back to Home](../README.md)