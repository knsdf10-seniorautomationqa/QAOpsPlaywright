const{request,expect,test}=require('@playwright/test');
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL  = 'https://api.eventhub.rahulshettyacademy.com/api'

const YAHOO_USER = {email : 'Sadaf1@Yahoo.com' , Password : 'Sadaf@123'};
const GMAIL_USER ={email :'Sadaf1@gmail.com' , Password : 'Sadaf@123'}
//login as a yahoo user via api

async function loginAs(page,user){
await page.goto (`${BASE_URL}/login`);
await page.getByPlaceholder('you@email.com').fill(user.email);
await page.locator('#password').fill(user.Password);
await page.locator('#login-btn').click();
await expect(page.getByText('Browse Events →')).toBeVisible();
}

test ('gmail user sees access denied when viewing yahoo users booking',async({page,request})=>{

  //login as yahoo user via api and get token then complete booking
  const loginResponse = await request.post(`${API_URL}/auth/login`, {
    data : {email: YAHOO_USER.email , password: YAHOO_USER.Password},
  });

  expect (loginResponse.ok).toBeTruthy();
  const {token} = loginResponse.json();

  //Step 2 — Fetch events via API to get a valid event ID

  const eventsResponse = await request.get(`${API_URL}/events`,{
    headers : {Authorization : `Bearer ${token}`}, })

   expect(eventsResponse.ok()).toBeTruthy();
  const eventsData = await eventsResponse.json();
  const eventId = eventsData.data[0].id;

 

  //Step 3 — Create a booking via API as Yahoo user
   const bookingResponse =  await request.post(`${API_URL}/bookings`,{
headers: { Authorization: `Bearer ${token}` },
      data : {
  "eventId": eventId,
  "customerName": "Sadaf test",
  "customerEmail": YAHOO_USER.email,
  "customerPhone": "+91-12341234",
  "quantity": 2
},
    });
await expect(bookingResponse.ok()).toBeTruthy();
const yahooBookingID = (await bookingResponse.json()).data.id ;
console.log (`Booking id created for yahoo user via API with ID : ${yahooBookingID}`);


// ── Step 4: Login as Gmail user via UI ────────────────────────────────────
  await loginAs(page, GMAIL_USER);

//Step 5 — Navigate to Yahoo's booking URL as Gmail user
await page.goto(`${BASE_URL}/bookings/${yahooBookingID}`), { waitUntil: 'networkidle' } ;



 // ── Step 6: Validate Access Denied ───────────────────────────────────────
  await expect(page.getByText('Access Denied')).toBeVisible();
  await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();

})