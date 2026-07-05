import { test, expect } from '@playwright/test';

test('API GET Request', async ({ request }) => {

    const response = await request.get('https://dummyjson.com/quotes');
    expect(response.status()).toBe(200); // check whether the response returns a status code of 200

    const text = await response.text();
    expect(text).toContain("Albert Einstein"); // expect the API response to contain text

    console.log(await response.json()); // display the reponse in console
});

test('API POST Test', async ({ request }) => {

    const response = await request.post('https://dummyjson.com/users/add', {
        data: {
            "firstName": "Isaac",
            "lastName": "Newton",
            "age": 50
        }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toMatchObject({
        "firstName": "Isaac",
        "lastName": "Newton",
        "age": 50
    });
});

test('API PUT Test', async({ request }) => {

    const response = await request.put('https://dummyjson.com/recipes/1', {
        data: {
            "name": "Pizza",
            "ingredients": [
                "Pizza dough",
                "Tomato sauce",
                "Fresh mozzarella cheese",
                "Fresh basil leaves",
                "Olive oil",
                "Salt and pepper to taste"
            ],
        }
    });

    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain('Pizza');
});

test('API DEL Test', async ({ request }) => {

    const response = await request.delete('https://dummyjson.com/recipes/2');
    expect([200, 204]).toContain(response.status());

    const body = await response.json();
    expect(body.isDeleted).toBe(true);
});