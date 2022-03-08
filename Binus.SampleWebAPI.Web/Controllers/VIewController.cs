using System;
using Binus.WebAPI.REST;
using Binus.SampleWebAPI.Model.AppModel;
using Binus.SampleWebAPI.Web.Class;
using Binus.SampleWebAPI.Web.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Binus.SampleWebAPI.Web.Controllers
{
    public class VIewController : Controller
    {
        // GET: VIew
        public ActionResult Index()
        {
            if (Session["UserID"] == null)
            {
                return Redirect("Login");
            }
            try
            {
                //int UserID = int.Parse(Session["UserID"].ToString());
                RESTResult Result = (new REST(Global.WebAPIBaseURL, "/api/Training/BookDB/V1/App/Book/GetBorrowedBook?UserID=" + Session["UserID"], REST.Method.GET, REST.NeedOAuth.False)).Result;

                HomeViewModel hvm = new HomeViewModel();
                if (Result.Success)
                {
                    hvm.books = Result.Deserialize<List<BookModel>>();
                }
                else
                {
                    hvm.books = new List<BookModel>();
                }

                return View("ViewBorrow", hvm);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}