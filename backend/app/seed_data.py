from sqlalchemy.orm import Session
from . import models
from .auth import get_password_hash

ARTICLES = [
    {
        "title": "How to Register a Private Limited Company in India",
        "category": "Company Registration",
        "summary": "Step-by-step process to incorporate a Pvt Ltd company via MCA's SPICe+ form.",
        "content": (
            "To register a Private Limited Company in India: 1) Obtain a Digital Signature "
            "Certificate (DSC) for all proposed directors. 2) Apply for Director Identification "
            "Number (DIN). 3) Reserve a unique company name via the RUN or SPICe+ Part A service "
            "on the MCA portal. 4) File SPICe+ Part B with MOA, AOA, and required declarations. "
            "5) Receive the Certificate of Incorporation along with PAN and TAN. The process "
            "typically takes 7-15 working days and costs vary based on authorized capital."
        ),
    },
    {
        "title": "Choosing the Right Business Structure",
        "category": "Company Registration",
        "summary": "Comparison of Sole Proprietorship, Partnership, LLP, and Private Limited Company.",
        "content": (
            "Sole Proprietorship suits solo founders testing an idea with minimal compliance but "
            "unlimited personal liability. Partnership Firms split ownership among 2+ people but "
            "also carry unlimited liability. LLPs (Limited Liability Partnership) offer liability "
            "protection with simpler compliance than a company, ideal for services businesses. "
            "Private Limited Companies are best for startups seeking external funding since VCs "
            "and angel investors typically require this structure for equity investment."
        ),
    },
    {
        "title": "Startup Funding Stages Explained",
        "category": "Funding",
        "summary": "From bootstrapping to Series A, B, C and IPO.",
        "content": (
            "Pre-seed funding usually comes from founders, friends and family, used to validate "
            "an idea. Seed funding (from angel investors or seed funds) helps build an MVP and "
            "find product-market fit. Series A focuses on scaling a proven business model, "
            "typically $2M-$15M. Series B and C fund market expansion and scaling operations. "
            "An IPO or acquisition is typically the final stage. Each round involves giving up "
            "equity in exchange for capital, so founders should plan dilution carefully."
        ),
    },
    {
        "title": "How to Pitch to Angel Investors",
        "category": "Fundraising",
        "summary": "Key elements of a winning pitch deck and investor conversation.",
        "content": (
            "A strong pitch deck includes: Problem, Solution, Market Size (TAM/SAM/SOM), Product "
            "Demo, Business Model, Traction, Competitive Landscape, Team, Financial Projections, "
            "and the Ask (how much you're raising and for what). Keep it to 10-15 slides. Angel "
            "investors care most about founder-market fit and early traction signals. Always "
            "follow up with a data room containing financials, cap table, and legal documents."
        ),
    },
    {
        "title": "Startup India Scheme Benefits",
        "category": "Funding",
        "summary": "Tax exemptions and benefits under the government's Startup India initiative.",
        "content": (
            "Startups recognized under DPIIT (Department for Promotion of Industry and Internal "
            "Trade) can avail a 3-year income tax holiday under Section 80-IAC, exemption from "
            "angel tax under Section 56, easier public procurement norms, fast-track patent "
            "examination with 80% fee rebate, and self-certification for labour and environment "
            "laws. To register, apply via the Startup India portal with incorporation certificate "
            "and a brief on innovation/scalability."
        ),
    },
    {
        "title": "Legal Compliance Checklist for New Startups",
        "category": "Legal Compliance",
        "summary": "Essential legal registrations and filings every startup needs.",
        "content": (
            "Beyond incorporation, startups typically need: GST registration (mandatory above "
            "turnover threshold or for interstate supply), Shops & Establishment license, "
            "Professional Tax registration, Trademark registration for brand protection, founder "
            "and employee agreements (with vesting clauses and NDAs), and Privacy Policy/Terms of "
            "Service if operating a website or app. Annual ROC filings (AOC-4, MGT-7) are mandatory "
            "for Private Limited Companies regardless of revenue."
        ),
    },
    {
        "title": "Drafting a Founders' Agreement",
        "category": "Legal Compliance",
        "summary": "Why every co-founder team needs a written agreement from day one.",
        "content": (
            "A Founders' Agreement should cover: equity split and vesting schedule (typically "
            "4-year vesting with a 1-year cliff), roles and decision-making authority, IP "
            "assignment to the company, what happens if a founder leaves (good leaver vs bad "
            "leaver clauses), dispute resolution mechanism, and non-compete terms. Having this in "
            "writing early prevents costly disputes later and is often required by investors "
            "before a funding round closes."
        ),
    },
    {
        "title": "Hiring Your First Employees",
        "category": "Hiring",
        "summary": "Practical guide to early-stage hiring, offer letters, and compliance.",
        "content": (
            "Early hires should be generalists who thrive in ambiguity. Define role clearly, "
            "offer a mix of salary and ESOPs (Employee Stock Ownership Plans) to conserve cash "
            "while aligning incentives. Issue a formal offer letter and employment agreement "
            "covering compensation, notice period, confidentiality, and IP assignment. Register "
            "for EPF (Employees' Provident Fund) once you cross 20 employees, and ESI if wages "
            "are below the threshold. Use structured interviews and reference checks even for "
            "early hires to reduce mis-hire risk."
        ),
    },
    {
        "title": "Building an Effective ESOP Pool",
        "category": "Hiring",
        "summary": "How much equity to allocate and how vesting typically works.",
        "content": (
            "Most startups reserve 8-15% of equity for an ESOP pool, expanded over time as "
            "needed for senior hires. Standard vesting is 4 years with a 1-year cliff (meaning "
            "no equity vests until the employee completes 12 months). Strike price is usually set "
            "at fair market value on grant date. Communicate ESOP value transparently -- explain "
            "vesting, exercise windows after departure, and potential dilution to avoid employee "
            "confusion later."
        ),
    },
    {
        "title": "Branding Basics for Early-Stage Startups",
        "category": "Branding",
        "summary": "Building a memorable brand identity on a limited budget.",
        "content": (
            "Start with a clear brand positioning statement: who you serve, what problem you "
            "solve, and why you're different. Choose 1-2 primary colors and a simple, legible "
            "typeface family. Invest in a professional logo even if budget is tight -- it's the "
            "most reused brand asset. Maintain consistent tone of voice across website, social "
            "media, and customer support. Document these choices in a simple one-page brand "
            "guideline so the whole team stays consistent as you scale."
        ),
    },
    {
        "title": "Digital Marketing Strategy for Startups",
        "category": "Marketing",
        "summary": "Low-cost, high-leverage marketing channels for early growth.",
        "content": (
            "Early-stage startups typically get the best ROI from: SEO-optimized content marketing "
            "(blog posts targeting long-tail keywords), community building on platforms like "
            "Reddit, Discord, or LinkedIn, referral programs incentivizing existing users, and "
            "targeted social media ads once you understand your CAC (Customer Acquisition Cost). "
            "Track key metrics -- CAC, LTV (Lifetime Value), conversion rate -- from day one so "
            "you know which channels to double down on."
        ),
    },
    {
        "title": "Understanding GST for Startups",
        "category": "Taxation",
        "summary": "When and how startups must register for and file GST.",
        "content": (
            "GST registration is mandatory once annual turnover exceeds Rs. 20 lakh for services "
            "(Rs. 40 lakh for goods, varies by state), or immediately if you sell across state "
            "lines or via e-commerce platforms. Startups must file GSTR-1 (outward supplies) and "
            "GSTR-3B (summary return) monthly or quarterly depending on the scheme chosen. "
            "Input Tax Credit lets you offset GST paid on business expenses against GST collected "
            "from customers, reducing net tax liability."
        ),
    },
    {
        "title": "Income Tax Planning for Startup Founders",
        "category": "Taxation",
        "summary": "Key tax considerations for founders and their companies.",
        "content": (
            "Companies recognized under DPIIT can claim a tax holiday on profits for 3 consecutive "
            "years out of their first 10 years (Section 80-IAC). Founders drawing a salary should "
            "plan TDS deductions properly. ESOPs are taxed at exercise (as perquisite) and again "
            "at sale (as capital gains) -- recent amendments allow deferral of TDS for eligible "
            "startup employees. Maintaining clean books from day one avoids costly issues during "
            "due diligence for future funding rounds."
        ),
    },
    {
        "title": "Using AI Tools to Build Faster with a Small Team",
        "category": "AI Tools",
        "summary": "Practical AI tools that help lean startup teams move faster.",
        "content": (
            "AI coding assistants (GitHub Copilot, Cursor, Claude Code) can significantly speed up "
            "MVP development. AI writing tools help draft marketing copy and support responses. "
            "AI-powered customer support chatbots (built with RAG over your knowledge base, like "
            "this app) reduce support headcount needs early on. For non-technical founders, "
            "no-code/AI builders like Lovable or Bolt.new can validate ideas before hiring "
            "engineers. Always keep a human in the loop for customer-facing AI outputs early on."
        ),
    },
    {
        "title": "Implementing RAG for Your Product",
        "category": "AI Tools",
        "summary": "A primer on Retrieval-Augmented Generation for founders building AI features.",
        "content": (
            "RAG (Retrieval-Augmented Generation) combines a knowledge retrieval step with an LLM "
            "generation step, letting an AI answer questions grounded in your own data instead of "
            "hallucinating. A simple RAG pipeline: 1) store your knowledge base as text chunks, "
            "2) at query time, retrieve the most relevant chunks (via keyword search, TF-IDF, or "
            "vector embeddings), 3) pass the retrieved chunks plus the user's question to an LLM "
            "as context, 4) return the grounded answer. This is cheaper and more accurate than "
            "fine-tuning for most startup use cases."
        ),
    },
    {
        "title": "Scaling Your Startup: From 10 to 100 Customers",
        "category": "Business Growth",
        "summary": "Common bottlenecks and how to fix them as you scale.",
        "content": (
            "Early growth bottlenecks are usually operational, not strategic: manual onboarding "
            "that doesn't scale, support tickets piling up, and founders becoming the bottleneck "
            "for every decision. Fixes include: documenting SOPs (Standard Operating Procedures) "
            "as you go, investing in self-serve onboarding, hiring a generalist ops person early, "
            "and setting up basic analytics dashboards to track activation, retention, and churn "
            "so growth decisions are data-driven rather than anecdotal."
        ),
    },
    {
        "title": "Product-Market Fit: How to Know You Have It",
        "category": "Business Growth",
        "summary": "Signals that indicate real product-market fit versus vanity metrics.",
        "content": (
            "Strong signals of product-market fit include: organic word-of-mouth growth, users "
            "expressing disappointment if the product disappeared (the 'Sean Ellis test' -- 40%+ "
            "saying 'very disappointed' is a good benchmark), high retention curves that flatten "
            "rather than decay to zero, and inbound demand outpacing your marketing spend. Vanity "
            "metrics like total signups or press mentions can mask a lack of real product-market "
            "fit, so always dig into retention and usage depth."
        ),
    },
    {
        "title": "Building a Cap Table That Investors Trust",
        "category": "Fundraising",
        "summary": "Cap table hygiene and common mistakes to avoid.",
        "content": (
            "A clean cap table clearly shows all shareholders, their percentage ownership, share "
            "class (common vs preferred), and any outstanding convertible instruments (SAFEs, "
            "convertible notes). Common mistakes include: over-promising equity verbally without "
            "documentation, forgetting to reserve an ESOP pool before a priced round (causing "
            "unexpected founder dilution), and not tracking option grants centrally. Use a cap "
            "table tool (like Carta or a well-maintained spreadsheet) and update it after every "
            "transaction."
        ),
    },
    {
        "title": "Employee Onboarding Best Practices for Startups",
        "category": "Hiring",
        "summary": "Setting up new hires for success in a fast-moving startup environment.",
        "content": (
            "A good startup onboarding process includes: a documented 30-60-90 day plan with "
            "clear milestones, pairing new hires with a buddy for their first few weeks, access to "
            "all necessary tools and credentials ready on day one, and a short welcome deck "
            "covering company mission, org structure, and current priorities. Because startups "
            "lack the structure of larger companies, over-communicating context is critical to "
            "avoid new hires feeling lost."
        ),
    },
]

DEFAULT_USERS = [
    {"name": "Admin User", "email": "admin@startupnavigator.com", "password": "Admin@123", "is_admin": True},
    {"name": "Demo User", "email": "user@startupnavigator.com", "password": "User@123", "is_admin": False},
]


def seed_database(db: Session):
    if db.query(models.Article).count() == 0:
        for a in ARTICLES:
            db.add(models.Article(**a))

    if db.query(models.User).count() == 0:
        for u in DEFAULT_USERS:
            db.add(
                models.User(
                    name=u["name"],
                    email=u["email"],
                    hashed_password=get_password_hash(u["password"]),
                    is_admin=u["is_admin"],
                )
            )

    db.commit()
