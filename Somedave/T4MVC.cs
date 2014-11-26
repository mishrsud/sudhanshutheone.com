﻿// <auto-generated />
// This file was generated by a T4 template.
// Don't change it directly as your change would get overwritten.  Instead, make changes
// to the .tt file (i.e. the T4 template) and save it to regenerate this file.

// Make sure the compiler doesn't complain about missing Xml comments
#pragma warning disable 1591
#region T4MVC

using System;
using System.Diagnostics;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Mvc.Ajax;
using System.Web.Mvc.Html;
using System.Web.Routing;
using T4MVC;

[GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
public static partial class MVC
{
    public static Somedave.Controllers.BackendController Backend = new Somedave.Controllers.T4MVC_BackendController();
    public static Somedave.Controllers.BlogController Blog = new Somedave.Controllers.T4MVC_BlogController();
    public static Somedave.Controllers.ErrorController Error = new Somedave.Controllers.T4MVC_ErrorController();
    public static Somedave.Controllers.HomeController Home = new Somedave.Controllers.T4MVC_HomeController();
    public static Somedave.Controllers.ProjectsController Projects = new Somedave.Controllers.T4MVC_ProjectsController();
    public static Somedave.Controllers.WordPressRedirectsController WordPressRedirects = new Somedave.Controllers.T4MVC_WordPressRedirectsController();
    public static T4MVC.SharedController Shared = new T4MVC.SharedController();
}

namespace T4MVC
{
}

namespace T4MVC
{
    [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
    public class Dummy
    {
        private Dummy() { }
        public static Dummy Instance = new Dummy();
    }
}

[GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
internal partial class T4MVC_System_Web_Mvc_ActionResult : System.Web.Mvc.ActionResult, IT4MVCActionResult
{
    public T4MVC_System_Web_Mvc_ActionResult(string area, string controller, string action, string protocol = null): base()
    {
        this.InitMVCT4Result(area, controller, action, protocol);
    }
     
    public override void ExecuteResult(System.Web.Mvc.ControllerContext context) { }
    
    public string Controller { get; set; }
    public string Action { get; set; }
    public string Protocol { get; set; }
    public RouteValueDictionary RouteValueDictionary { get; set; }
}



namespace Links
{
    [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
    public static class Scripts {
        private const string URLPATH = "~/Scripts";
        public static string Url() { return T4MVCHelpers.ProcessVirtualPath(URLPATH); }
        public static string Url(string fileName) { return T4MVCHelpers.ProcessVirtualPath(URLPATH + "/" + fileName); }
        public static readonly string bootstrap_js = T4MVCHelpers.IsProduction() && T4Extensions.FileExists(URLPATH + "/bootstrap.min.js") ? Url("bootstrap.min.js") : Url("bootstrap.js");
        public static readonly string bootstrap_min_js = Url("bootstrap.min.js");
        public static readonly string jquery_1_9_0_intellisense_js = T4MVCHelpers.IsProduction() && T4Extensions.FileExists(URLPATH + "/jquery-1.9.0.intellisense.min.js") ? Url("jquery-1.9.0.intellisense.min.js") : Url("jquery-1.9.0.intellisense.js");
        public static readonly string jquery_1_9_0_js = T4MVCHelpers.IsProduction() && T4Extensions.FileExists(URLPATH + "/jquery-1.9.0.min.js") ? Url("jquery-1.9.0.min.js") : Url("jquery-1.9.0.js");
        public static readonly string jquery_1_9_0_min_js = Url("jquery-1.9.0.min.js");
        public static readonly string jquery_1_9_0_min_map = Url("jquery-1.9.0.min.map");
        public static readonly string prism_js = T4MVCHelpers.IsProduction() && T4Extensions.FileExists(URLPATH + "/prism.min.js") ? Url("prism.min.js") : Url("prism.js");
    }

    [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
    public static class Content {
        private const string URLPATH = "~/Content";
        public static string Url() { return T4MVCHelpers.ProcessVirtualPath(URLPATH); }
        public static string Url(string fileName) { return T4MVCHelpers.ProcessVirtualPath(URLPATH + "/" + fileName); }
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public static class bootstrap {
            private const string URLPATH = "~/Content/bootstrap";
            public static string Url() { return T4MVCHelpers.ProcessVirtualPath(URLPATH); }
            public static string Url(string fileName) { return T4MVCHelpers.ProcessVirtualPath(URLPATH + "/" + fileName); }
            public static readonly string alerts_less = Url("alerts.less");
            public static readonly string badges_less = Url("badges.less");
            public static readonly string bootstrap_less = Url("bootstrap.less");
            public static readonly string breadcrumbs_less = Url("breadcrumbs.less");
            public static readonly string button_groups_less = Url("button-groups.less");
            public static readonly string buttons_less = Url("buttons.less");
            public static readonly string carousel_less = Url("carousel.less");
            public static readonly string close_less = Url("close.less");
            public static readonly string code_less = Url("code.less");
            public static readonly string component_animations_less = Url("component-animations.less");
            public static readonly string dropdowns_less = Url("dropdowns.less");
            public static readonly string forms_less = Url("forms.less");
            public static readonly string glyphicons_less = Url("glyphicons.less");
            public static readonly string grid_less = Url("grid.less");
            public static readonly string input_groups_less = Url("input-groups.less");
            public static readonly string jumbotron_less = Url("jumbotron.less");
            public static readonly string labels_less = Url("labels.less");
            public static readonly string list_group_less = Url("list-group.less");
            public static readonly string media_less = Url("media.less");
            [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
            public static class mixins {
                private const string URLPATH = "~/Content/bootstrap/mixins";
                public static string Url() { return T4MVCHelpers.ProcessVirtualPath(URLPATH); }
                public static string Url(string fileName) { return T4MVCHelpers.ProcessVirtualPath(URLPATH + "/" + fileName); }
                public static readonly string alerts_less = Url("alerts.less");
                public static readonly string background_variant_less = Url("background-variant.less");
                public static readonly string border_radius_less = Url("border-radius.less");
                public static readonly string buttons_less = Url("buttons.less");
                public static readonly string center_block_less = Url("center-block.less");
                public static readonly string clearfix_less = Url("clearfix.less");
                public static readonly string forms_less = Url("forms.less");
                public static readonly string gradients_less = Url("gradients.less");
                public static readonly string grid_framework_less = Url("grid-framework.less");
                public static readonly string grid_less = Url("grid.less");
                public static readonly string hide_text_less = Url("hide-text.less");
                public static readonly string image_less = Url("image.less");
                public static readonly string labels_less = Url("labels.less");
                public static readonly string list_group_less = Url("list-group.less");
                public static readonly string nav_divider_less = Url("nav-divider.less");
                public static readonly string nav_vertical_align_less = Url("nav-vertical-align.less");
                public static readonly string opacity_less = Url("opacity.less");
                public static readonly string pagination_less = Url("pagination.less");
                public static readonly string panels_less = Url("panels.less");
                public static readonly string progress_bar_less = Url("progress-bar.less");
                public static readonly string reset_filter_less = Url("reset-filter.less");
                public static readonly string resize_less = Url("resize.less");
                public static readonly string responsive_visibility_less = Url("responsive-visibility.less");
                public static readonly string size_less = Url("size.less");
                public static readonly string tab_focus_less = Url("tab-focus.less");
                public static readonly string table_row_less = Url("table-row.less");
                public static readonly string text_emphasis_less = Url("text-emphasis.less");
                public static readonly string text_overflow_less = Url("text-overflow.less");
                public static readonly string vendor_prefixes_less = Url("vendor-prefixes.less");
            }
        
            public static readonly string mixins_less = Url("mixins.less");
            public static readonly string modals_less = Url("modals.less");
            public static readonly string navbar_less = Url("navbar.less");
            public static readonly string navs_less = Url("navs.less");
            public static readonly string normalize_less = Url("normalize.less");
            public static readonly string pager_less = Url("pager.less");
            public static readonly string pagination_less = Url("pagination.less");
            public static readonly string panels_less = Url("panels.less");
            public static readonly string popovers_less = Url("popovers.less");
            public static readonly string print_less = Url("print.less");
            public static readonly string progress_bars_less = Url("progress-bars.less");
            public static readonly string responsive_embed_less = Url("responsive-embed.less");
            public static readonly string responsive_utilities_less = Url("responsive-utilities.less");
            public static readonly string scaffolding_less = Url("scaffolding.less");
            public static readonly string tables_less = Url("tables.less");
            public static readonly string theme_less = Url("theme.less");
            public static readonly string thumbnails_less = Url("thumbnails.less");
            public static readonly string tooltip_less = Url("tooltip.less");
            public static readonly string type_less = Url("type.less");
            public static readonly string utilities_less = Url("utilities.less");
            public static readonly string variables_less = Url("variables.less");
            public static readonly string wells_less = Url("wells.less");
        }
    
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public static class fonts {
            private const string URLPATH = "~/Content/fonts";
            public static string Url() { return T4MVCHelpers.ProcessVirtualPath(URLPATH); }
            public static string Url(string fileName) { return T4MVCHelpers.ProcessVirtualPath(URLPATH + "/" + fileName); }
            public static readonly string glyphicons_halflings_regular_eot = Url("glyphicons-halflings-regular.eot");
            public static readonly string glyphicons_halflings_regular_svg = Url("glyphicons-halflings-regular.svg");
            public static readonly string glyphicons_halflings_regular_ttf = Url("glyphicons-halflings-regular.ttf");
            public static readonly string glyphicons_halflings_regular_woff = Url("glyphicons-halflings-regular.woff");
        }
    
        public static readonly string master_less = Url("master.less");
        public static readonly string me_jpg = Url("me.jpg");
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public static class posts {
            private const string URLPATH = "~/Content/posts";
            public static string Url() { return T4MVCHelpers.ProcessVirtualPath(URLPATH); }
            public static string Url(string fileName) { return T4MVCHelpers.ProcessVirtualPath(URLPATH + "/" + fileName); }
            public static readonly string appveyor_artifacts_png = Url("appveyor-artifacts.png");
            public static readonly string appveyor_assemblyinfo_patching_png = Url("appveyor-assemblyinfo-patching.png");
            public static readonly string appveyor_build_png = Url("appveyor-build.png");
            public static readonly string appveyor_deployment_png = Url("appveyor-deployment.png");
            public static readonly string appveyor_nuget_package_png = Url("appveyor-nuget-package.png");
            public static readonly string github_new_repo_png = Url("github-new-repo.png");
            public static readonly string nuget_apikey_png = Url("nuget-apikey.png");
            public static readonly string open_source_participants_png = Url("open-source-participants.png");
            public static readonly string pdf_process_png = Url("pdf-process.png");
            public static readonly string persistenceprocess1_png = Url("persistenceprocess1.png");
        }
    
        public static readonly string prism_css = T4MVCHelpers.IsProduction() && T4Extensions.FileExists(URLPATH + "/prism.min.css") ? Url("prism.min.css") : Url("prism.css");
             
    }

    [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
    public static partial class Bundles
    {
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public static partial class Scripts {}
        [GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
        public static partial class Styles {}
    }
}

[GeneratedCode("T4MVC", "2.0"), DebuggerNonUserCode]
internal static class T4MVCHelpers {
    // You can change the ProcessVirtualPath method to modify the path that gets returned to the client.
    // e.g. you can prepend a domain, or append a query string:
    //      return "http://localhost" + path + "?foo=bar";
    private static string ProcessVirtualPathDefault(string virtualPath) {
        // The path that comes in starts with ~/ and must first be made absolute
        string path = VirtualPathUtility.ToAbsolute(virtualPath);
        
        // Add your own modifications here before returning the path
        return path;
    }

    // Calling ProcessVirtualPath through delegate to allow it to be replaced for unit testing
    public static Func<string, string> ProcessVirtualPath = ProcessVirtualPathDefault;

    // Calling T4Extension.TimestampString through delegate to allow it to be replaced for unit testing and other purposes
    public static Func<string, string> TimestampString = System.Web.Mvc.T4Extensions.TimestampString;

    // Logic to determine if the app is running in production or dev environment
    public static bool IsProduction() { 
        return (HttpContext.Current != null && !HttpContext.Current.IsDebuggingEnabled); 
    }
}





#endregion T4MVC
#pragma warning restore 1591


