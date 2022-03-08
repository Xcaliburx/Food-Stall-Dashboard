using Binus.SampleWebAPI.Model.AppModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Binus.SampleWebAPI.Web.ViewModels
{
    public class HomeViewModel
    {
        public List<BookModel> books { get; set; }
    }
}