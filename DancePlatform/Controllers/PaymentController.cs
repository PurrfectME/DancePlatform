using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using DancePlatform.BL.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PayPalCheckoutSdk.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DancePlatform.API.Controllers
{
    [Route("payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IRegistrationService _service;

        public PaymentController(IRegistrationService registrationService)
        {
            _service = registrationService;
        }


        [HttpPost("createOrder")]
        public async Task<IActionResult> CreateOrder()
        {
            //var request = new OrdersCreateRequest();
            //request.Headers.Add("prefer", "return=representation");

            //var t = PayPalService.CreateOrder();
            PayPalHttp.HttpResponse response;

            var items = new List<Item>
            {
                new Item
                    {
                        Name = "TEST",
                        Description = "TEST_DESC",
                        Sku = "sku01",
                        UnitAmount = new Money
                        {
                            CurrencyCode = "RUB",
                            Value = "100",
                        },
                        Quantity = "1",
                    //Category = item.Product.Category.CategoryName,
                }
            };

            var orderRequest = new OrderRequest()
            {
                CheckoutPaymentIntent = "CAPTURE",
                ApplicationContext = new ApplicationContext
                {
                    //ReturnUrl = "https://api20200526110933.azurewebsites.net/success_page",
                    //CancelUrl = "https://api20200526110933.azurewebsites.net/cancel_page",
                    BrandName = "EFREMOV",
                    LandingPage = "BILLING",
                    UserAction = "CONTINUE",
                    ShippingPreference = "SET_PROVIDED_ADDRESS"
                },
                PurchaseUnits = new List<PurchaseUnitRequest>
                {
                    new PurchaseUnitRequest
                    {
                        ReferenceId =  "PUHF",
                        Description = "Sporting Goods",
                        CustomId = "CUST-HighFashions",
                        SoftDescriptor = "HighFashions",
                        AmountWithBreakdown = new AmountWithBreakdown
                        {
                            CurrencyCode = "RUB",
                            Value = "100",
                            AmountBreakdown = new AmountBreakdown
                            {
                            ItemTotal = new Money
                            {
                                CurrencyCode = "RUB",
                                Value = "100"
                            },
                            Shipping = new Money
                            {
                                CurrencyCode = "RUB",
                                Value = "00.00"
                            },
                            //Handling = new Money
                            //{
                            //    CurrencyCode = "USD",
                            //    Value = "10.00"
                            //},
                            //TaxTotal = new Money
                            //{
                            //    CurrencyCode = "RUB",
                            //    Value = Math.Round(currenctCart.TotalPrice * 0.13, 2).ToString(CultureInfo.InvariantCulture)
                            //},
                            //ShippingDiscount = new Money
                            //{
                            //    CurrencyCode = "USD",
                            //    Value = "10.00"
                            //}
                            }
                        },
                        Items = items,
                        ShippingDetail = new ShippingDetail
                        {
                            Name = new Name
                            {
                                FullName = "John Doe"
                            },
                            AddressPortable = new AddressPortable
                            {
                                AddressLine1 = "123 Townsend St",
                                AddressLine2 = "Floor 6",
                                AdminArea2 = "San Francisco",
                                AdminArea1 = "CA",
                                PostalCode = "94107",
                                CountryCode = "US"
                            }
                        }
                    }
                }
            };

            // Call API with your client and get a response for your call
            var request = new OrdersCreateRequest();
            request.Prefer("return=representation");
            request.RequestBody(orderRequest);
            request.Headers.Add("Authorization", "Bearer A21AAJjXx5Nota0Mt5hNpR9qiOMuz2cZhHPhQYrhZSphqULtFdU5Tl6UnJ1pWJcTxDKO5HBFXBMWZr-e30zkK8AU_H_BfWXXg");

            var client = PayPalService.GetClient();

            response = await client.Execute(request);
            var statusCode = response.StatusCode;
            Order result = response.Result<Order>();
            Console.WriteLine("Status: {0}", result.Status);
            Console.WriteLine("Order Id: {0}", result.Id);
            Console.WriteLine("Intent: {0}", result.CheckoutPaymentIntent);
            Console.WriteLine("Links:");
            foreach (LinkDescription link in result.Links)
            {
                Console.WriteLine("\t{0}: {1}\tCall Type: {2}", link.Rel, link.Href, link.Method);
            }

            return Ok(result);
        }

        //[HttpGet("verify")]
        //public async Task<object> VerifyOrder([FromQuery] int userId, [FromQuery] int workshopId)
        //{
            
        //}
    }
}
