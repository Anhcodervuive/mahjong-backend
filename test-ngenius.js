async function test() {
  const apiKey = "MTNkNWUyNzQtOWM2OC00YWI0LTgzMWYtNGRhN2Q4NjAxZmJjOjI5NzhlODcyLTAwMzAtNGFiMi04MWY2LTMwMTEwZDI1Y2NjZg==";
  const outletId = "9db8b78b-eeb2-4025-b9cd-ca8bb763a5e2";
  const apiUrl = "https://api-gateway.sandbox.ngenius-payments.com";
  
  // 1. Get Token
  const tokenRes = await fetch(`${apiUrl}/identity/auth/access-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.ni-identity.v1+json',
      'Authorization': `Basic ${apiKey}`,
    },
  });
  const tokenData = await tokenRes.json();
  const token = tokenData.access_token;
  console.log('Token:', token ? 'OK' : 'FAIL');

  // 2. Create Order
  const payload = {
    action: 'SALE',
    amount: {
      currencyCode: 'AED',
      value: 5000,
    },
    merchantAttributes: {
      redirectUrl: "http://127.0.0.1:5174/payment/callback",
      skipConfirmationPage: true,
    },
    billingAddress: {
      firstName: "du",
      lastName: "do"
    }
  };

  console.log('Sending payload:', JSON.stringify(payload, null, 2));

  const orderRes = await fetch(`${apiUrl}/transactions/outlets/${outletId}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.ni-payment.v2+json',
      'Accept': 'application/vnd.ni-payment.v2+json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const orderData = await orderRes.json();
  console.log('Order Data:', JSON.stringify(orderData, null, 2));
}

test().catch(console.error);
