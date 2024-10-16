$1000 Prize for AI Conference Organizer

When you’re collecting slides from many people for a conference, you need to _validate_ those slides.

1. The first check is format. Is this PDF, Google Slides, Keynote, Figma, Canva? Is it a file or a URL?

2. The second check is deterministic. What is the size of each deck, the number of slides, the fonts used? Is video present, and if so is there audio?

3. The third check is probabilistic. Does the deck fit the conference format? For example, does it have a title slide? Is it all bullet points (which we don’t want) or does it have images? Each of these kinds of checks can be expressed as AI prompts.

What I want: an open source AI-based slide validator, with all the code at replit.com, which sets up a form that implements these three checks.

The workflow is: first paste in URL or upload file. Then determine format and run deterministic checks. Finally, run each AI check as an individual prompt. The result is a list of ❌and ✅ for every unit test. @bountybot

More requirements

1. The user should get every unit test to green ✅ before being able to submit their deck.

2. The testing should run very fast. If there is any latency it should have a great UX which shows a loading symbol while each test is running.

3. The conference organizer should have an admin interface where they can configure all the checks. What files are accepted, what are the deterministic checks, and what are the probabilistic AI checks? And who submitted a deck so far, and which decks have which errors? How many decks are we away from complete?

4. Once a deck is all green it should be integrated into a master deck. If they are all PDF this can be done with something like joinPDF.py which is standard on Macs. If any deck contains video it is nontrivial to merge and Keynote is the likely output format.

This app is relatively simple to implement, but it would be useful for @vitalik.eth, @bryanjohnson, and me to help organize conferences. Make it open source and it’ll be huge.
