import test from "@playwright/test";
import { ContactBuilder } from "tests/builders/contact-builder";

test("create contact with builder defaults", async () => {
	const contact = ContactBuilder.createWithDefaults().build();

	console.log(JSON.stringify(contact, null, 2));
});
