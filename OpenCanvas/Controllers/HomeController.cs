using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OpenCanvas.Models;
using System.Diagnostics;

namespace OpenCanvas.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private string HEADER = @"<!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 4.01//EN""
   ""http://www.w3.org/TR/html4/strict.dtd"">
<html>
<head>
</head>
<body>
";

        private string FOOTER = @"</body>
</html>";
        
        private string RectangleFunction(double x, double y, double w, double h, int id)
        {
            return @"<div id=""" + id + @"""style=""background-color: black; position: absolute; margin-left: " + x + @"px; margin-top: " + y + @"px; width: " + w + @"px; height:" + h + @"px;""></div>";
        }

        private string SubmitFunction(double x, double y, double w, double h, int id)
        {
            return @"<input type=""button"" id=""" + id + @""" style=""position: absolute; left: " + x + @"px; top: " + y + @"px; width: " + w + @"px; height:" + h + @"px;""/>";
        }

        private string RadioFunction(double x, double y, double w, double h, int id)
        {
            return @"<input type=""radio"" name=""season"" value=""winter"" id=""" + id + @""" style=""position: absolute; left: " + x + @"px; top: " + y + @"px; width: " + w + @"px; height:" + h + @"px;"" checked />";
        }

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult Generate(string rectangles, string submits, string radios)
        {
            List<RectangleModel> rectanglesList = JsonConvert.DeserializeObject<List<RectangleModel>>(rectangles ?? String.Empty) ?? new List<RectangleModel>();
            List<ButtonModel> submitList = JsonConvert.DeserializeObject<List<ButtonModel>>(submits ?? String.Empty) ?? new List<ButtonModel>();
            List<RadioButtonModel> radioList = JsonConvert.DeserializeObject<List<RadioButtonModel>>(radios ?? String.Empty) ?? new List<RadioButtonModel>();

            string s = HEADER;

            foreach(RectangleModel rectangle in rectanglesList)
            {
                s += RectangleFunction(rectangle.x, rectangle.y, rectangle.w, rectangle.h, rectangle.id);
            }

            foreach(ButtonModel button in submitList)
            {
                s += SubmitFunction(button.x, button.y, button.w, button.h, button.id);
            }

            foreach(RadioButtonModel radio in radioList)
            {
                s += RadioFunction(radio.x, radio.y, radio.w, radio.h, radio.id);
            }

            s += FOOTER;
            return Content(s);
        }
    }
}