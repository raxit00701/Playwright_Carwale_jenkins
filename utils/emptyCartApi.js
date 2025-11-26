// utils/emptyCartApi.js
export async function getEmptyCartToken(request, authToken) {
    const response = await request.get(
        'https://carwale-backend.onrender.com/api/car/braintree/token',
        {
            headers: {
                accept: 'application/json, text/plain, */*',
                authorization: `Bearer ${authToken}`, // attach token
            },
        }
    );

    if (!response.ok()) {
        throw new Error(`Empty cart API failed: ${response.status()}`);
    }

    const json = await response.json();
    console.log('Empty Cart API Response:', json);
    return json;
}