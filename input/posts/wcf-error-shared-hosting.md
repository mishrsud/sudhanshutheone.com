
Title: WCF service startup error "This collection already contains an address with scheme http"
Lead: Fixing WCF Deployment issues on shared hosting
Published: 2016-07-31
Tags:
- WCF
- .NET
- Shared hosting
---

---

## What happened again?

Today, I was trying to setup a simple WCF service on my hosting service smarterasp.net (they are superb! I've been using them for about two weeks and it has been a breeze to setup websites and applications using their control panel. I came across them through a thread about hosting options for ASP.NET on Quora)

So, while setting up the service with basic HTTP binding, everything ran fine on my dev machine (it always does right?!) but when I deployed to the hosting site using VS Deploy, I ran into a YSOD (yellow screen of death for the uninitiated) that complained

"This collection already contains an address with scheme http".

## Getting out of this sticky wicket
To be fair, the error screen described the fix as well, but to be a 100% sure, I looked up the error and found this stackoverflow thread:

Source: [WCF service startup error "This collection already contains an address with scheme http"](http://stackoverflow.com/questions/561823/wcf-service-startup-error-this-collection-already-contains-an-address-with-sche)

I followed the configuration based solution described in the accepted answer and was able to get the service running absolutely fine.

In summary, I added this in the Web.config:

```
    <span class="tag"><system.serviceModel></span>
        <span class="tag"><serviceHostingEnvironment></span>
            <span class="tag"><baseAddressPrefixFilters></span>
                <span class="tag"><add</span> <span class="atn">prefix</span><span class="pun">=</span><span class="atv">"http://mydomain"</span><span class="tag">/></span>
            <span class="tag"></baseAddressPrefixFilters></span>
        <span class="tag"></serviceHostingEnvironment></span>
    <span class="tag"></system.serviceModel>
```

Hope this helps.

Happy Coding! 