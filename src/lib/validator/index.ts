import { z } from 'zod';

export const signUpFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email' }),
	username: z.string().min(3, { message: 'Please enter a valid username' }),
	password: z.string().min(6, { message: 'Password must be 6 characters long' }),
	firstName: z.string().min(2, { message: 'Please enter first name' }),
	lastName: z.string().min(2, { message: 'Please enter last name' }),
	city: z.string().min(2, { message: 'Please enter city' }),
	street: z.string().min(2, { message: 'Please enter street' }),
	number: z.string().min(1, { message: 'Please enter street number' }),
	zipcode: z.string().min(5, { message: 'Please enter zipcode' }),
	lat: z.string().min(2, { message: 'Please enter latitude' }),
	lon: z.string().min(2, { message: 'Please enter longitude' }),
	phone: z.string().min(5, { message: 'Please enter phone number' })
});
