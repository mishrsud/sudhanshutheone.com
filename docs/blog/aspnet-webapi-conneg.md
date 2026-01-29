---
title: ASP.NET Web API - Content Negotiation, Content-Type, Accept and Accept-Charset in a nutshell
description: My take on content negotiation, REST, HTTP and how it all comes together in ASP.NET Web API
date: 2015-02-04
tags:

- .NET
- ASP.NET
- ASP.NET Web API
- CSharp
- Gloabalization
- HTTP
---

### Hello, Web API

ASP.NET Web API is now the standard, recommended way of building REST based HTTP services. As of writing this post, the latest stable version is Web API 2.2 ( [semantic version](http://semver.org/) 5.2.2) available from NuGet [here](https://www.nuget.org/packages/Microsoft.AspNet.WebApi/5.2.2 "Get Web API 2.2.").

One of the gazillion cool features that this awesome framework has is Content negotiation and for some strange reason, when I speak to newbies, it appears to either sound like magic or a complete black box! The fact is, if one cares to know, Content negotiation is straightforward and it isn't too hard to understand how it works. I will try to summarize and present my view on how the whole thing works and the moving parts that matter.

### First things first: The basics

If you are a client calling a Web API, the way you would tell the API your preferred format for responses is through the **Accept** HTTP header. [IETF](http://tools.ietf.org/html/draft-ietf-httpbis-p3-payload-19#section-6.1 "IETF") defines the header likes so:

```
Accept = #( media-range [ accept-params ] )
E.g. Accept: audio/*; q=0.2, audio/basic
```

This should be interpreted by the server as: "The client prefers MIME type audio/basic but would be fine with any audio type after an 80% mark-down in quality"

When the server responds, it will indicate the response MIME type in the **Content-Type** HTTP header defined like so:

```
Content-Type := type "/" subtype *[";" parameter]
E.g. Content-Type: audio/mp3
```

Which should mean that the server is sending back audio that is in MP3 format.

### What is Content-Negotiation and how does it work?

By definition, content negotiation (abbreviated as conneg in a few sources) is the mechanism that allows the same URL to serve content in different formats. It follows from one of the tenets of REST which suggests that meta data (such as HTTP headers) be used to represent different formats of the same resources - the URL representing the resource here.

I see this as a nice separation of concern from an architectural standpoint in general where the resource itself does not carry the burden of how it is serialized over the wire - it is rather another component (a [MediaTypeFormatter](http://www.asp.net/web-api/overview/formats-and-model-binding/media-formatters "ASP.NET Web API") in case of Web API) that handles that concern.

When an HTTP Client (e.g. a browser or any .NET application calling into the Web API) sends an "Accept" header, content negotiation kicks in. The value of this header can be read from several places in a request. Web API by default provides the following 4 media type mappings or places you can configure for the accept media types to be read:

1.  [QueryStringMapping](https://msdn.microsoft.com/en-us/library/system.net.http.formatting.querystringmapping%28v=vs.118%29.aspx): Read the media type header values from query string
2.  [UriPathExtensionMapping](<https://msdn.microsoft.com/en-us/library/system.net.http.formatting.uripathextensionmapping(v=vs.118).aspx>): Read the media type header values from Uri path extensions
3.  [RequestHeaderMapping](https://msdn.microsoft.com/en-us/library/system.net.http.formatting.requestheadermapping%28v=vs.118%29.aspx): Read the mapping from an arbitrary HTTP request header field to a media type header value
4.  MediaRangeMapping: Read the MediaTypeHeaderValues for a request or response from a media range.
    As an example, suppose I have a custom media type formatter that is used to return a CSV as the response stream and I want that the client indicate her preference of the format through a querystring parameter, the following line would have to be written in the bootstrap stage (i.e. the Global.asax.cs or WebApiConfig.Register method):

```
var config = GlobalConfiguration.Configuration;

//// Add the CSV MediaTypeFromatter to the available formatters .
config.Formatters.Add(new CsvMediaTypeFormatter(new QueryStringMapping("format", "csv", "text/csv")));
```

From the client, the request would now contain a querystring like so (assuming the API exposes this functionality through the URI /data/getdetails)

```
/data/getdetails?**format=csv**
```

NOTE: MediaTypeFormatter can also be defined at a controller level by creating a custom attribute that implements **IControllerConfiguration**. The controller can then be decorated with this attribute to invoke the custom MediaTypeFormatter:

```
// STEP 1: Create Custom Attribute
public class UseCsvFormatterAttribute : Attribute, IControllerConfiguration
 {
       public void Initialize(
                               HttpControllerSettings settings,
                               HttpControllerDescriptor descriptor)
       {
          // Clear the formatters list.
          settings.Formatters.Clear();

          // Add a custom media-type formatter.
          settings.Formatters.Add(new MyFormatter());
       }
 }

// STEP 2: Use the attribute on the ApiController
[UseCsvFromatter]
public class DataController : ApiController
{
    // action methods code goes here
}
```

(Code inspired from Web API [official site](http://www.asp.net/web-api/overview/advanced/configuring-aspnet-web-api))

### Accept-Charset and Accept-Encoding

The **Accept-Charset** header is intended to indicate to the server the character set that the client needs. A set of encodings is supported by each MediaTypeFormatter in the Web API pipeline. The default charset for the built-in formatters is UTF-8. What this means is that by default, Web API will use the default encoding for the MediaTypeFormatter that has been chosen based on content negotiation.

The default encoding can be seen and changed on a per-formatter basis like so:

```
// Code from Global.asax.cs
public class WebApiApplication : System.Web.HttpApplication
{
   protected void Application_Start()
   {
     // NOTE: SupportedEncodings is a mutable collection of character encodings
     // supported by this System.Net.Http.Formatting.MediaTypeFormatter
     // The following code makes UTF-16 as the default encoding for JsonFormatter
     System.Text.Encoding defaultJsonEncoding =
        GlobalConfiguration.Configuration.Formatters.JsonFormatter.SupportedEncodings[0];
     // Add the default at the last index of the SupportedEncodings collection
     GlobalConfiguration.Configuration.Formatters.JsonFormatter.SupportedEncodings.Add(defaultJsonEncoding);
     // Remove UTF-8 from the first index to make UTF-16 the default
     GlobalConfiguration.Configuration.Formatters.JsonFormatter.SupportedEncodings.RemoveAt(0);

     // Some code omitted for brevity
   }
```

As of this post, Web API does not have an out-of-the-box support for responding to **Accept-Encoding** header but it is easy to create a handler yourself that takes this header into account by implementing a class derived from _**System.Net.Http.DelegatingHandler**_.

### Step by step

Let us walk through creating a handler that would support compression using GZip - this is done in 3 steps:

#### STEP 1: Create an HttpContentType that represents compressed content

```
 /// <summary>
 /// Represents GZip compressed content
 /// </summary>
 public class CompressedContent : HttpContent
 {
 private HttpContent originalContent;
 private string encodingType;

 /// <summary>
 /// Initializes a new instance of the <see cref="CompressedContent"/> class.
 /// </summary>
 /// <param name="content">The content.</param>
 /// <param name="encodingType">Type of the encoding.</param>
 /// <exception cref="System.ArgumentNullException">
 /// content
 /// or
 /// encodingType
 /// </exception>
 /// <exception cref="System.InvalidOperationException"></exception>
 public CompressedContent(HttpContent content, string encodingType)
 {
     if (content == null)
     {
          throw new ArgumentNullException("content");
     }

     if (encodingType == null)
     {
         throw new ArgumentNullException("encodingType");
     }

     originalContent = content;
     this.encodingType = encodingType.ToLowerInvariant();

     if (this.encodingType != "gzip" && this.encodingType != "deflate")
     {
        throw new InvalidOperationException(string.Format("Encoding '{0}' is not supported. Only supports gzip or deflate encoding.", this.encodingType));
     }

     // copy the headers from the original content
     foreach (KeyValuePair<string, IEnumerable<string>> header in originalContent.Headers)
     {
         this.Headers.TryAddWithoutValidation(header.Key, header.Value);
     }

     this.Headers.ContentEncoding.Add(encodingType);
 }

 /// <summary>
 /// Determines whether the HTTP content has a valid length in bytes.
 /// </summary>
 /// <param name="length">The length in bytes of the HTTP content.</param>
 /// <returns>
 /// Returns <see cref="T:System.Boolean" />.true if <paramref name="length" /> is a valid length; otherwise, false.
 /// </returns>
 protected override bool TryComputeLength(out long length)
 {
     length = -1;
     return false;
 }

 /// <summary>
 /// Serialize the HTTP content to a stream as an asynchronous operation.
 /// </summary>
 /// <param name="stream">The target stream.</param>
 /// <param name="context">Information about the transport (channel binding token, for example). This parameter may be null.</param>
 /// <returns>
 /// Returns <see cref="T:System.Threading.Tasks.Task" />.The task object representing the asynchronous operation.
 /// </returns>
 protected override Task SerializeToStreamAsync(Stream stream, TransportContext context)
 {
     Stream compressedStream = null;

     if (encodingType == "gzip")
     {
        compressedStream = new GZipStream(stream, CompressionMode.Compress, leaveOpen: true);
     }
     else if (encodingType == "deflate")
     {
        compressedStream = new DeflateStream(stream, CompressionMode.Compress, leaveOpen: true);
     }

     return originalContent.CopyToAsync(compressedStream).ContinueWith(tsk =>
     {
         if (compressedStream != null)
         {
             compressedStream.Dispose();
         }
     });
   }
}
```

#### STEP 2: Create the handler

```
 /// <summary>
 /// A <see cref="DelegatingHandler"/> that handles encoding based on Accept-Encoding
 /// </summary>
 public class CompressionHandler : DelegatingHandler
 {
     /// <summary>
     /// Sends an HTTP request to the inner handler to send to the server as an asynchronous operation.
     /// </summary>
     /// <param name="request">The HTTP request message to send to the server.</param>
     /// <param name="cancellationToken">A cancellation token to cancel operation.</param>
     /// <returns>
     /// Returns <see cref="T:System.Threading.Tasks.Task`1" />. The task object representing the asynchronous operation.
     /// </returns>
 protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
 {
    return base.SendAsync(request, cancellationToken).ContinueWith<HttpResponseMessage>((responseToCompleteTask) =>
    {
        HttpResponseMessage response = responseToCompleteTask.Result;

        if (response.RequestMessage.Headers.AcceptEncoding != null &&
            response.RequestMessage.Headers.AcceptEncoding.Count > 0)
        {
           string encodingType = response.RequestMessage.Headers.AcceptEncoding.First().Value;

           response.Content = new CompressedContent(response.Content, encodingType);
        }

           return response;
     },
      TaskContinuationOptions.OnlyOnRanToCompletion);
    }
 }
```

#### STEP 3: Register the handler with the Web API pipeline:

```
 // In the Global.asax.cs or WebApiConfig.Register
 config.MessageHandlers.Add(new CompressionHandler());
```

### Resources:

See the complete Web API pipeline [here](http://www.asp.net/media/4071077/aspnet-web-api-poster.pdf "Web API Poster")

[1] A thorough introduction on content negotiation can be found on [Fillip W](https://twitter.com/filip_woj)'s blog: **[here](http://www.strathweb.com/2012/07/everything-you-want-to-know-about-asp-net-web-api-content-negotation/) **- Note that this was written in 2012 when Web API had just come out with an RC so there may be places wherein the most recent version behaves differently.

[2] Gunnar's blog on conneg: [**here**](http://weblogs.asp.net/gunnarpeipman/asp-net-web-api-how-content-negotiation-works) [Caveat: 2 years old!]

[3] Creating a custom MediaTypeFormatter in detail: [**here**](http://byterot.blogspot.in/2012/04/aspnet-web-api-series-part-5.html)

[4] Kiran Challa's blog on creating a Compression Handler based on Accept-Encoding header [**here**](http://blogs.msdn.com/b/kiranchalla/archive/2012/09/04/handling-compression-accept-encoding-sample.aspx "Kiran Challa")

Happy Coding!
