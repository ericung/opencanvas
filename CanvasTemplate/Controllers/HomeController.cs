using CanvasTemplate.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Text;

namespace CanvasTemplate.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

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
        public IActionResult Generate(string rectangles)
        {
            List<Rectangle> data = JsonConvert.DeserializeObject<List<Rectangle>>(rectangles ?? String.Empty) ?? new List<Rectangle>();
            string s =
@"<!DOCTYPE HTML PUBLIC ""-//W3C//DTD HTML 4.01//EN""
   ""http://www.w3.org/TR/html4/strict.dtd"">
<html>
<head>
</head>
<body>
";
            foreach(Rectangle rectangle in data)
            {
                s += 
@"<div style=""background-color: black; position: absolute; margin-left: " + rectangle.x + @"px; margin-top: " + rectangle.y + @"px; width: " + rectangle.w + @"px; height:" + rectangle.h + @"px;""></div>
";
            }
            s += @"</body>
</html>";
            return Content(s);
        }
    }
}