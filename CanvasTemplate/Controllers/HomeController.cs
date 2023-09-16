﻿using CanvasTemplate.Models;
using Microsoft.Ajax.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Text.RegularExpressions;
using System.Web.Helpers;

namespace CanvasTemplate.Controllers
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
            string s = HEADER;

            foreach(Rectangle rectangle in data)
            {
                s += RectangleFunction(rectangle.x, rectangle.y, rectangle.w, rectangle.h, rectangle.id);
            }

            s += FOOTER;
            return Content(s);
        }
    }
}