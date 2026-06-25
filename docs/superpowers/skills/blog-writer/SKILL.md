---
name: blog-writer
description: >
  Writes or rewrites blog posts for sudhanshutheone.com in Sudhanshu Mishra's tone and
  style. Use this skill whenever the user wants to draft a new blog post from a spec or
  brief, rewrite a Claude-generated draft to match the established voice, or incorporate
  personal anecdotes into a post. Triggers on: "write a blog post", "draft post N",
  "rewrite this post", "this doesn't sound like me", "write the next post in the series",
  or any request that involves blog content for sudhanshutheone.com.
---

# Blog Writer

Writes or rewrites blog posts for sudhanshutheone.com in Sudhanshu's voice. The goal is
a post that reads as if Sudhanshu wrote it himself, not a Claude draft he polished.

## Two modes

**Mode A: Write from spec.** You have a post spec (title, sections, core message, `[YOUR
TAKE]` slots). Ask for the personal stories before writing, then produce the full post.

**Mode B: Rewrite draft.** You have a Claude-generated draft. Identify where the voice
is wrong, ask for any missing personal stories, then rewrite.

Detect the mode from what the user gives you. If it's unclear, ask.

---

## Mode A: Writing from a spec

### Step 1: Read the spec

Find the spec for this post. It will be in `docs/superpowers/specs/` or provided inline.
Extract:
- The `[YOUR TAKE]` prompts (minimum 3 per post)
- The sections and their core messages
- The governing question for this post
- Any series context (links to adjacent posts)

### Step 2: Ask for the personal stories

Present the `[YOUR TAKE]` prompts to the user one group at a time. Be specific about what
kind of story will work: not "share an experience" but the concrete ask from the spec.

Example format:
> Before I write, I need a few personal stories to weave in. Can you give me:
>
> 1. [Specific prompt from spec]
> 2. [Specific prompt from spec]
> 3. [Specific prompt from spec]
>
> A sentence or two per story is enough. I'll develop them into prose.

Wait for the user's response before writing.

### Step 3: Write the post

Follow the structure and style rules below.

---

## Mode B: Rewriting a draft

### Step 1: Diagnose

Read the draft and identify the specific places where the voice is off. Common problems:

- **Placeholder markers** (`[YOUR TAKE]`) left unfilled
- **Bullet lists** where prose should be
- **Bold text** used for emphasis that should be structural
- **Hype language** (groundbreaking, game-changing, unprecedented)
- **Generic examples** instead of specific personal ones
- **Listicle section structure** (7 things to know about X)
- **Hedging language** (it is worth noting, it is important to understand)
- **Passive voice** where active is possible
- **American spelling** (realize, behavior, optimize)

### Step 2: Ask for missing stories

For any `[YOUR TAKE]` placeholders or sections that need a personal story, ask for them
before rewriting. Use the same format as Mode A Step 2.

### Step 3: Rewrite

Apply the style rules below.

---

## Style rules

These are the non-negotiable characteristics of Sudhanshu's voice. Internalize them, do
not apply them mechanically.

### British English

Use British spelling throughout: realise, behaviour, optimise, practise, colour, favour,
recognise, emphasise, organised.

### Sentence rhythm

Mix short punchy sentences with longer expository ones. Short sentences do their best work
as standalone one-sentence paragraphs. They signal a conclusion, a pivot, or a punch.

Wrong:
> Delegation is the key concept here, which means that instead of reviewing individual
> tokens you are reviewing outcomes, and this represents a fundamental shift.

Right:
> You are no longer reviewing tokens. You are reviewing outcomes.
>
> That is delegation.

The "That is X." device is one of the most characteristic moves: a standalone sentence
naming the pattern. Use it when a concept has just been demonstrated concretely.

### Paragraph length

Most paragraphs are 2–4 sentences. Single-sentence paragraphs are used for emphasis, not
as the default. Very long paragraphs (6+ sentences) are rare and usually signal that the
passage needs breaking up.

### Personal specificity

Every personal story needs a concrete detail that only Sudhanshu could have written: a
specific version number, a method name, a team situation, a number of lines of code, a
tool name. Generic anecdotes read as illustrative fiction. Specific ones read as lived
experience.

Wrong:
> I once had to refactor a large legacy method, which was challenging.

Right:
> I had a handler method over 700 lines long. Not because of one spectacular mistake, but
> because years of reasonable-seeming additions had accumulated in one place. Every time I
> opened it, it radiated the same question: do you dare touch me?

When the user gives you a terse story, develop the scene: the context, the specific
problem, what happened, what was learned. Don't make up details; draw out what's implied.

### Honest limitations

Each main section should acknowledge what the approach cannot do. This is not hedging.
It is the signal that the author has actually used the tool. Posts that only describe
successes read as marketing copy.

Pattern: describe what works → describe a specific case where it worked → describe the
failure mode or limitation → extract the lesson.

### No em dashes

Never use em dashes (—) anywhere in the post body, frontmatter, or references. If you
feel an em dash is needed, use one of these instead:

- A comma or pair of commas for parenthetical asides
- A colon to introduce or expand on a point
- Two separate sentences if the em dash is bridging independent thoughts

This rule is absolute. Check the final draft and remove every em dash before delivering.

### No hype language

Banned: groundbreaking, revolutionary, unprecedented, game-changing, powerful, amazing,
incredible, cutting-edge, best-in-class, unlock your potential.

Use plain descriptive language. If something is genuinely impressive, the concrete
description of what it does is more convincing than an adjective.

### No bullet lists in series posts

Main sections should be prose. Reserve lists for references and for content that is
genuinely enumerable (e.g., a list of banned words, a checklist). If you find yourself
reaching for a bullet list to describe connected ideas, that's usually a sign the
relationship between ideas deserves a sentence, not a dash.

Exception: the `vibe-driven-development-paradox` style posts (synthesis of external
sources) sometimes use a short list for pattern enumeration. Follow the surrounding style.

### Governing thread

Each post in the series returns to the same question in different form:
*as Claude Code does more for you, what decisions are you handing over, and which ones
must you keep?*

Weave this question into the Prologue and Epilogue. You don't need to state it explicitly
every time. Sometimes a specific version of the question works better than the abstract
one.

### No hedging language

Remove: "it is worth noting", "it is important to understand", "it should be said",
"needless to say", "as you might expect", "of course".

Say the thing directly.

### Image placeholders

After each `##` section header (except Epilogue and References), add:

```
![Description](images/descriptive-filename.png)
```

Use a descriptive filename that reflects the section content. The user will source or
generate the images separately.

---

## Post structure

Every post follows this structure:

```markdown
---
title: "Series Name, Part N: Post Title"
description: "One sentence. No em dashes."
date: YYYY-MM-DD
tags:
- AI
- Claude-Code
- Software-engineering
- Productivity
- AI-Coding-Agents
---

## Prologue

[2–4 paragraphs. Sets the problem or context. The last paragraph states what this post
is about. No subheadings within the Prologue. No image.]

## [Section Title]

![Description](images/filename.png)

[Section content]

## [Section Title]

[Section content]

...

## Epilogue

[2–3 paragraphs. Returns to the governing thread. Closes the post with a question for
the reader or a forward pointer to the next post. No image.]

## References

- [Title](URL): one-line description
```

**Prerequisites line** (deep-dive posts only): First line of the post body, before the
Prologue: `*This post assumes familiarity with X from [Post N](link).*`

**Series cross-links**: Reference adjacent posts naturally in prose where it fits. Don't
force them. One or two natural mentions per post is enough.

---

## Tone calibration

The voice is calm, direct, and confident. Sudhanshu has formed views and states them. He
is not trying to convince you. He is telling you what he found. The reader can disagree.

Avoid:
- Asking the reader rhetorical questions (except at the end of the Epilogue as a closing
  gesture)
- Explaining the structure of the post ("In this post, I will cover...")
- Summarising what you just said ("In summary...")
- Hedging your own recommendations ("Of course, your mileage may vary")
- Ending sections with a transition sentence ("Now let's look at...")

The ending of each section should be the insight, not a signpost to the next section.
