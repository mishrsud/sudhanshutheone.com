Title: Programmer Interviews and the law of “Leaky Abstractions”
Lead: My thoughts after conducting 20 odd technical interviews, trying to correlate two seemingly divergent aspects of the tech life.
Published: 2015-03-02
Tags: 
- Interviews
- Programming
- Tech-interviews

---

---

## Prologue

I'm been involved in a lot of interviews lately and sometimes get asked by hiring managers why it is so hard for us to get good people. I try explaining (not very well I guess!) that to succeed as a software developer, one must have a certain level of in-depth knowledge and barring that, it will always be a struggle for both the new hire and the incumbent programmers on the team. This does not mean that I was perfect always, far from it, but you must feel that the interviewee has put in some rigor and feels that in-depth knowledge is necessary rather than just knowing how to drag a control and handle it's click event!

I read about the law of leaky abstractions and it sounded like the perfect alibi for what I've been trying to communicate - so in this post, I'll try and use Joel Spolsky's expertise to prove my point.

### The Law

For the uninitiated, [Joel Spolsky](http://www.joelonsoftware.com/AboutMe.html) is the CEO of Stackexchange, the company behind stackoverflow.com (I don't think I've to introduce stackoverflow to any programmer who's written more than her hello world programs!). He's also a much admired and widely respected thought leader in the programmer community. He's the one who coined the term "Leaky Abstraction" which reads like so:
> All non-trivial abstractions, to some degree, are leaky
My own inference from reading Joel's [musings on the subject](http://www.joelonsoftware.com/articles/LeakyAbstractions.html) is that to be an efficient programmer, one must know and understand the underpinnings of how things work under-the-hood. Beyond trivial proof of concept projects, unless one knows how the "magic" happens, there are bound to be times when your world would come to a grinding halt for you won't know why something that worked yesterday does not work today.

### So how are the law and interviews related?

Good question, here's how: When I'm interviewing someone, I try not to test whether they've memorized all the myriad ways of doing something in a particular technology. Instead, my focus is on testing whether they understand how things work under-the-hood, at least in sufficient detail so when stuff doesn't work, they know where to start looking. If that sounds too abstract, let me cite an example - when discussing a Dependency Injection container, like Unity, in a Web API project, I ask people how Web API knows which container it should use to resolve dependencies and at what stage are the dependencies wired up to the controllers requiring them. Tomorrow, when we are colleagues, I'd expect them to read the details of a TypeInitializationException and understand that a dependency is not yet mapped in the container rather than run around like headless chickens! Similarly, when talking about content-negotiation and Web API, I usually ask them how the server knows what MIME type has been requested and how a MediaTypeFormatter is selected.

### There's More

Turns out, the [Joel Test](http://www.joelonsoftware.com/articles/fog0000000043.html) devised by Mr. Spolsky matches exactly what I felt about how programmers must be hired. Joel says in point 11 that whether candidates write code or not during the interview process is an important test of whether the hiring process is doing things right. To add my 2 cents, I'd try and take candidates through a debugging session where they try and fix a bug or at least try and make sense of the intent of the code in front of them. In most places where I've worked, I've looked at more code written by others before I could get to write my own, so I feel it is important that the candidate can demonstrate that they can do this sort of thing without fretting too much. (not trying to be preachy here!

I also get disappointed (to put it mildly) when I feel that the candidate has not done his homework on his own resume - but that's another post maybe!

Until next time then,

Happy Coding!