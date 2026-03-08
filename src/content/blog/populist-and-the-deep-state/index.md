---
title: "The Populist and the Deep State"
description: "A 30-year history of how we govern code."
date: 2026-03-08
series: code-and-chaos
permalinkSlug: the-populist-and-the-deep-state
tags:
  - systems-architecture
  - ai
  - software-engineering
  - mcp
heroImage: ./populist-deep-state-hero.png
---

> **TL;DR:** _We spent twenty years running away from the suffocating bureaucracy of SOAP, only to hand the launch keys to the ultimate chaotic frontman: the Large Language Model. Here is why the tech industry's silent "Deep State" is quietly bringing back the strict rules of the early 2000s to save AI from itself—and why your 50-page system prompts are doomed to fail._

![The Populist and the Deep State](./populist-deep-state-hero.png)

If you want to understand why your brand-new AI agent might confidently hallucinate a command that can potentially wipe your production database, you have to look at how we govern our code and systems.

We have a bad habit of falling in love with charismatic frontmen who promise to cut the red tape.

Right now, by letting AI write and execute code based purely on natural-language "vibes," we are handing the launch keys to the ultimate smooth-talker. But to understand why this always ends in disaster, we have to look at the suffocating digital bureaucracy we burned down twenty years ago.

## Act I: The 4,000-Page Trade Deals

Let's rewind to 2003. The internet wasn't a playground yet; it was a corporate fortress.

Imagine you just want two computers to talk. A simple request: _"Hey, what's John's email?"_ Today, that's a quick digital handshake. Back then? You had to file paperwork with the swamp.

Before a single byte of data could cross the wire, the suits stepped in. They slammed a massive, rigid contract on your desk called a WSDL. Think of it as a 4,000-page international trade agreement, but for code.

This was the era of **SOAP**. It was the heavy-handed, old-guard bureaucracy of the early web. Architected by the gray-suited overlords at enterprise giants like IBM and Microsoft, it believed in one thing: absolute, mathematical law.

Every data type, every error code, and every payload had to be negotiated in advance and signed in triplicate.

There was no room to "move fast and break things." If a server was expecting a number, and you accidentally sent a word? The border guards seized your payload and killed your code on the spot. No exceptions. No flexibility.

It was perfectly secure. It was immune to surprises. And it was an absolute nightmare to live under.

You couldn't just build a simple app; you had to hold committee meetings. Just asking the server for the time required wrapping your request in layers of heavy, bloated XML "envelopes." It was a massive tax on your bandwidth and your sanity.

Then, Steve Jobs pulled the iPhone out of his pocket.

Overnight, the game changed. A million scrappy kids in garages were suddenly trying to stream data to mobile phones over terrible, spotty 3G networks.

They looked at those massive XML trade deals and realized they couldn't afford the tax. A tiny mobile battery couldn't survive unpacking a giant SOAP envelope. A fast-moving startup couldn't wait six months for a corporate tribunal to approve a new feature.

The gridlock became unbearable. The builders were exhausted.

They didn't want to reform the system. They didn't want friendlier treaties. They wanted someone to walk into the enterprise boardroom, rip up the rulebook on live television, and declare that the old laws were dead.

The web was begging for a wrecking ball.

## Act II: The Executive Order & The Era of "Vibes"

We fired the suits. We burned the 4,000-page XML treaties.

In their place, we installed the ultimate deregulation: **REST**. And its language of choice was JSON.

JSON didn't care about committees or strict border controls. It was the equivalent of governing by late-night executive orders.

You didn't need a pre-approved, mathematically verified schema to send data. You just packed whatever you felt like into a lightweight, human-readable payload—`{ "status": "active" }`—shoved it across the network, and forced the receiving server to deal with it.

It was the "Art of the Deal" in code format. And the honeymoon phase was spectacular.

Adoption skyrocketed. A whole generation of developers grew up in this golden era of total deregulation. You could build a massive app in a single weekend because there was absolutely no red tape. You just threw data at an endpoint and watched the magic happen.

It was pure freedom, blistering speed, and massive scale.

But unilateral "vibe coding" comes with a hidden cost. When you govern purely by executive order, you inevitably cause supply chain chaos.

Because there were no border guards checking the payloads anymore, the frontend would casually promise the backend a number, but hand it a word instead. The database, expecting to do math, would completely panic and crash.

We were living in a world of sudden, unannounced API changes. One developer tweaking a JSON key on a Friday afternoon was the equivalent of a surprise 25% global tariff—it brought down entire systems overnight.

The runtime environment—the supreme court of our code—was constantly striking down our apps with the ultimate constitutional crisis: `TypeError: undefined is not a function`.

The builders were moving fast, but they were breaking everything. We had won our freedom, but we were drowning in bugs.

We realized the hard way: a handshake doesn't mean anything if nobody enforces the terms.

## Act III: The Shadow Judiciary (TypeScript, OpenAPI, & The gRPC Deep State)

By 2015, the adults in the room had a massive problem.

The scrappy startups that championed the "vibe coding" of REST had grown into billion-dollar enterprises. The kids who wanted to "move fast and break things" were now the senior engineers getting woken up at 3 AM because a broken JSON payload just took down the payment gateway.

We desperately needed laws again. But we had a political crisis on our hands: we couldn't go back to SOAP.

If you handed a 4,000-page XML treaty to a developer raised on the freedom of JSON, they would quit on the spot. We couldn't kill the populist momentum, but we couldn't keep living in the Wild West either. We needed strict rules, but we needed them to _feel_ like freedom.

So, the industry did what any struggling government does to regain control. We installed a shadow judiciary.

We didn't take away the developer's favorite language. We let them keep writing in the friendly, flexible slang of JavaScript and JSON. To the naked eye, it looked like the same fast-paced, deregulated playground.

But behind the curtain, we brought the lawyers back.

Look closely at OpenAPI (formerly Swagger). What is it, really? It is literally just a SOAP WSDL wearing a Patagonia fleece. We fired the strict XML border guards, only to spend a decade and millions of dollars hiring "Type Safety Consultants" (like Zod, Joi, and GraphQL) to do the exact same job.

But this time, the architecture worked. Why? Because we learned how to _layer_ the government.

We didn't force the developer to speak legalese. We let the frontend "Diplomat" negotiate the adoption, while the backend "Lawyer" handled the execution. **TypeScript** became our new Supreme Court. Instead of waiting for your code to crash the database in production, the compiler checks the "constitutionality" of your payload right there in your editor.

And here is the ultimate reality check of how a layered government actually works.

On the surface, the JSON developers thought they had conquered the world. They were taking victory laps, writing endless blog posts, and demanding all the shiny "Developer Experience" awards. They thought their populist revolution had permanently killed the old enterprise rules.

But deep in the server racks, the Architects had a completely different, silent agenda.

The Architects knew that while JSON was great for humans, it was too bloated, too slow, and too fragile to run a massive microservice architecture. They were playing a much longer geopolitical game: the silent assassination of Network Latency.

Instead of fighting the loud populists in public, the Deep State just quietly bypassed them.

Let the frontend have their JSON APIs and their shiny awards. But for the _real_ internal government—when backend machines needed to talk strictly to other machines—the Architects deployed a classified, black-ops communication channel: **gRPC and Protobuf**.

Inside the backend, there was no human-readable JSON. There was no slang. There were no vibes. While the frontend was busy demanding the spotlight, the backend quietly brought back the absolute, ironclad strictness of SOAP, but compiled it into lightning-fast binary.

To enter the deep state, you had to sign a mathematically flawless `.proto` contract in advance, or the servers simply refused to speak to you. The populists got the glory, but the deep state quietly secured the infrastructure.

It was a masterstroke of engineering diplomacy.

We finally balanced the ticket. We used **Simplicity** (JSON/JS) to drive massive adoption on the frontlines, and we used hidden **Rules** (TypeScript/gRPC) to fix the shortcomings in the trenches.

The pendulum had stopped swinging. We had built a perfectly balanced suspension bridge between chaos and order. We thought the era of reckless, unpredictable tech was behind us.

And then, ChatGPT dropped.

## Act IV: The Hallucinator-in-Chief & The Ironclad Deep State

Suddenly, we handed the launch keys to the greatest populist in human history: The Large Language Model.

If JSON was a late-night executive order, natural language prompting is governing via stream-of-consciousness rally speeches. Human language is the loosest, most ambiguous API ever invented.

And the honeymoon phase was exactly the same. Adoption exploded. Overnight, everyone from your CEO to your grandmother could suddenly "code" because the barrier to entry was literally zero. _Tremendous vibes._ But the LLM is the Hallucinator-in-Chief. It is hyper-confident, incredibly persuasive, and frequently dead wrong.

When developers started letting AI agents directly query databases or trigger APIs based purely on natural language reasoning, we didn't just get `undefined is not a function`. We got: _"I successfully dropped the users table because the prompt implied we were starting fresh."_

At first, the industry panicked and tried to write laws using the populist's own language. We wrote massive `.mdc` files, "system instructions," and 50-page prompts begging the AI to behave. _"You are an expert developer. You will strictly output valid JSON. You will not hallucinate."_ It was like begging an unhinged executive to read a legal dictionary before taking the podium. It failed constantly. You cannot train a frontman to be a compliance officer.

So, the Architects went back to the playbook. They quietly deployed the Deep State.

Enter the **Model Context Protocol (MCP)** and strict structured outputs.

The adults in the room realized that to harness the chaos, you have to layer the government again.

Today, the pros don't let the LLM execute anything on its own. We let the AI be the Diplomat. It can chat with the user, brainstorm, and generate the vibes. It handles the adoption.

But the absolute second the AI needs to _act_—to read a local file, fetch a GitHub repo, or query a Postgres database—the Deep State steps in. The LLM isn't allowed to just guess the API. It is forced to submit a mathematically strict, schema-validated request to an MCP server.

Sound familiar? It's gRPC for AI.

Before the AI is allowed to touch the infrastructure, it has to sign a contract. If the AI hallucinates a parameter, the MCP border guards reject the payload and throw an error right back in its face.

The frontman gives the speech. The deep state executes the tools.

---

## The Final Sign-Off

If you zoom out, the last thirty years of software engineering aren't a story of a pendulum swinging endlessly between chaos and order. It is the story of us learning how to build a suspension bridge.

**Simplicity drives adoption, but rules fix shortcomings.** You cannot run a global system purely on strict, 4,000-page XML treaties, because the builders will revolt. And you cannot run it purely on unchecked JSON vibes or LLM hallucinations, because the system will collapse.

You have to layer them. You build the messy, vibrant, populist streets above ground so the users move in. And you bury the strict, unforgiving, binary pipes deep underground so the city doesn't burn down.

The tools change. The government remains the same.

But getting the AI to sign a strict MCP contract at the border is just the first step. Because once the frontman gets inside, you still have to control what he touches. Next time in #CodeAndChaos, we'll talk about the Secret Service of AI: LangGraph, OPA, and how we are building the internal shadow government to keep the agents in line.
