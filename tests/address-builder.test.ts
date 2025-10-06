import test from "@playwright/test";
import { AddressBuilder } from "tests/builders/address-builder";
import { Address } from "tests/models/address";

test("create Address without builder", async () => {
	const address: Address = {
		street: "Main St",
		houseNumber: 123,
		city: "Springfield",
		postalCode: "12345",
		countryCode: "US",
	};

	console.log(JSON.stringify(address, null, 2));
});

test("create Address with builder", async () => {
	const address = AddressBuilder.create()
		.street("Main St")
		.houseNumber(123)
		.city("Springfield")
		.postalCode("12345")
		.countryCode("US")
		.build();

	console.log(JSON.stringify(address, null, 2));
});

test("create Address with builder and defaults", async () => {
	const address = AddressBuilder.createWithDefaults().build();
	console.log(JSON.stringify(address, null, 2));
});

test("create Address with builder and defaults but force the house number", async () => {
	const address = AddressBuilder.createWithDefaults().houseNumber(9999).build();
	console.log(JSON.stringify(address, null, 2));
});
