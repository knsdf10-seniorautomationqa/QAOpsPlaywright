class APIUtils{


apicontext: any;
loginPayload:String
constructor(apicontext:any,loginPayload:string){
    this.apicontext = apicontext
    this.loginPayload =loginPayload
}

async gettoken(){
const loginResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
  
    {
        data : this.loginPayload
    });
 const loginResponsejson = await loginResponse.json();
const token =  loginResponsejson.token;

return token;
}

async createOrder(orderpayload:String){

    let response= {token : String, orderId: String};
    response.token = await this.gettoken();
    const orderResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data : orderpayload,
      headers :{
        'Authorization': response.token,
        'Content-Type' : 'application/json'
      }
    },
    
)
const orderResponseJson = await orderResponse.json();
console.log(orderResponseJson);
const orderId = orderResponseJson.orders[0];
response.orderId = orderId;
return response;
}

}

module.exports= {APIUtils}