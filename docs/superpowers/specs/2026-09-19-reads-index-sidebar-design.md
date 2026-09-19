# Reads Index Sidebar Design

## Goal

Make the generated Reads index use the same year-grouped presentation and VitePress “On this page” sidebar as the generated Notes index.

## Design

The section-index generator will treat `reads` like `notes` for date presentation. During `npm run docs:build` and `npm run docs:dev`, it will:

- read each Reads article's `date` frontmatter;
- sort articles in descending date order, as it already does;
- add a level-two heading whenever the publication year changes;
- show each article's formatted publication date.

VitePress derives the right-hand page outline from those level-two year headings, so no separate sidebar configuration or custom component is needed. The existing Reads article cards, titles, descriptions, and links remain unchanged.

## Error Handling

Reads entries without a valid date will be grouped under `Unknown`, matching the existing Notes behavior. Sections or files that are missing continue to use the generator's current handling.

## Verification

Add an automated test for the index generator that demonstrates Reads output contains year headings and formatted dates. Then run the documentation build and inspect the generated Reads HTML for the year-outline navigation.

## Scope

This change only affects generated Reads index formatting. It does not add a left-hand article navigation sidebar, change individual Reads pages, or alter global VitePress navigation.
