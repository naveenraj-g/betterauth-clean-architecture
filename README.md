# betterauth-clean-architecture

A **Clean Architecture–based authentication system** built with **Next.js** and **BetterAuth**, focused on **separation of concerns**, **error boundaries**, and **long-term maintainability**.

This repository is **not a product** — it is a **learning lab / reference implementation** that explores how to integrate a third-party authentication provider (BetterAuth) into a clean, framework-agnostic backend design.

---

## 📚 Table of Contents

- [Goals of This Repository](#-goals-of-this-repository)
- [Architecture Overview](#-architecture-overview)
- [Authentication Design](#-authentication-design)
- [Error Handling Philosophy](#-error-handling-philosophy)
- [Error Translation (Anti-Corruption Layer)](#-error-translation-anti-corruption-layer)
- [Architecture Diagram](#-architecture-diagram)
- [Folder Structure](#-folder-structure)
- [How Data Flows](#-how-data-flows)
- [Presenter Strategy (Output Mapping)](#-presenter-strategy-output-mapping)
- [Error Flow](#-error-flow)
- [Why This Architecture Matters](#-why-this-architecture-matters)
- [When NOT to Use This Architecture](#-when-not-to-use-this-architecture)
- [When This Architecture Shines](#-when-this-architecture-shines)
- [FAQ (For Readers & Contributors)](#-faq-for-readers--contributors)

---

## 🎯 Goals of This Repository

- Demonstrate **Clean Architecture** applied to authentication
- Explore and implement **all major BetterAuth concepts**
- Keep **business logic independent** of frameworks and SDKs
- Design a **future-proof backend core** that can later be exposed as:
  - Server Actions (Next.js)
  - REST APIs
  - SDKs / packages
- Implement a **clear, safe error-handling strategy**

---

## 🧱 Architecture Overview

This project follows a **layered Clean Architecture** approach:

```
Infrastructure
└─ Repositories / Adapters (BetterAuth, DB, External services)
└─ Services
└─ Use Cases (Business logic)
└─ Controllers
└─ Presenters
└─ Server Actions (Next.js boundary)
```

### Key Principles

- **Frameworks are replaceable**
- **Business logic never depends on BetterAuth**
- **Third-party errors are translated, never leaked**
- **Only Server Actions talk to the frontend**
- **Messages cross the boundary, semantics stay backend**

---

## 🔐 Authentication Design

### Why BetterAuth?

BetterAuth is used as an **external authentication provider**, treated as **infrastructure**, not business logic.

This repository explores:

- Email/password signup & signin
- Session handling
- Token lifecycle
- Provider integration patterns
- Error translation strategies

BetterAuth is isolated behind an **AuthService adapter**, making it easy to replace later.

---

## 🚨 Error Handling Philosophy

This project uses a **strict error taxonomy**:

### Core Error Types

- `ApplicationError`  
  Base error for all application-level failures

- `AuthError`  
  Business / user-actionable authentication failures  
  (e.g. invalid credentials, email already exists)

- `InfrastructureError`  
  External system or provider failures  
  (e.g. BetterAuth outage, network issues)

### Important Rules

- Infrastructure errors **never reach the user directly**
- Users only see **safe, meaningful messages**
- Server Actions are the **serialization boundary**
- Error codes & status codes are kept **internal**
- Designed for **user-facing products**, not SDKs

---

## 🔁 Error Translation (Anti-Corruption Layer)

BetterAuth-specific errors are translated into domain-level errors using a reusable mapper.

Example:

```ts
mapBetterAuthError(error, "Auth provider failed during signup");
```

## 🏗 Architecture Diagram

The system is structured using **Clean Architecture**, with clear ownership of responsibilities and strict dependency direction.

```

                    ┌─────────────────────────────┐
                    │        Frontend (UI)        │
                    │  React / Next.js Components │
                    └──────────────▲──────────────┘
                                   │
                                   │ Messages only
                                   │
                    ┌──────────────┴───────────────-┐
                    │        Server Actions         │
                    │   (Serialization Boundary)    │
                    │  - ZSA                        │
                    │  - Error sanitization         │
                    └───────────────▲───────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │        Controllers            │
                    │  - Request orchestration      │
                    │  - Call use cases             │
                    └───────────────▲───────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │         Use Cases             │
                    │  - Business rules             │
                    │  - Auth flows                 │
                    └───────────────▲───────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │          Services             │
                    │  - Domain services            │
                    │  - Auth abstractions          │
                    └───────────────▲───────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │   Infrastructure / Adapters   │
                    │  - BetterAuth SDK             │
                    │  - Database                   │
                    │  - External APIs              │
                    └───────────────────────────────┘
```

### Dependency Rules

- Dependencies always point **inward**
- Business logic never imports:
  - BetterAuth
  - Next.js
  - ZSA
- Infrastructure errors are translated before crossing boundaries

## 📁 Folder Structure

This structure intentionally mirrors Clean Architecture layers amd the conceptual layers described above.

```
src/
└─ modules/
   ├─ server/
   │  ├─ auth/
   │  │  ├─ application/
   │  │  │  └─ usecases/
   │  │  │     └─ auth/
   │  │  │        └─ signup.usecase.ts
   │  │  ├─ di/
   │  │  │  ├─ modules/
   │  │  │  │  ├─ auth.module.ts
   │  │  │  │  └─ index.ts
   │  │  │  ├─ container.ts
   │  │  │  └─ types.ts
   │  │  ├─ domain/
   │  │  │  ├─ entities/
   │  │  │  │  └─ errors/
   │  │  │  └─ interfaces/
   │  │  │     ├─ auth.service.interface.ts
   │  │  │     └─ index.ts
   │  │  ├─ infrastructure/
   │  │  │  ├─ repositories/
   │  │  │  └─ services/
   │  │  │     ├─ auth.service.ts
   │  │  │     └─ index.ts
   │  │  ├─ interface-adapters/
   │  │  │  ├─ controllers/
   │  │  │  │  └─ auth/
   │  │  │  │     ├─ index.ts
   │  │  │  │     └─ signup.controller.ts
   │  │  │  └─ presenters/
   │  │  │     └─ auth/
   │  │  │        ├─ index.ts
   │  │  │        └─ signup.presenter.ts
   │  │  └─ presentation/
   │  │     └─ actions/
   │  │        └─ auth.actions.ts
   │  ├─ auth-provider/
   │  │  └─ auth.ts
   │  ├─ prisma/
   │  │  ├─ schema/
   │  │  │  └─ schema.prisma
   │  │  └─ db.ts
   │  └─ shared/
   │     └─ errors/
   │        ├─ auth/
   │        │  ├─ authError.ts
   │        │  └─ commonAuthErrors.ts
   │        ├─ mappers/
   │        │  └─ mapBetterAuthError.ts
   │        ├─ applicationError.ts
   │        ├─ commonErrors.ts
   │        └─ infrastructureError.ts
   └─ shared/
      ├─ components/
      ├─ entities/
      │  ├─ enums/
      │  ├─ errors/
      │  │  └─ schemaParseError.ts
      │  ├─ schema/
      │  │  └─ auth/
      │  │     └─ auth.schema.ts
      │  └─ types/
      └─ error/
         └─ parseZSAParseErrors.ts
```

## 🔀 How data flows

```
Client
  ↓
presentation/actions (server actions)
  ↓
interface-adapters/controllers
  ↓
application/usecases
  ↓
domain
  ↑
interface-adapters/presenters
  ↑
presentation/actions
  ↑
Client

```

---

### 📤 Presenter Strategy (Output Mapping)

This project uses **presenters** to transform use-case output into **client-facing response models**.

Presenters belong to the **Interface Adapters** layer and are responsible for:

- shaping response data
- formatting values (dates, currency, locale-specific output)
- hiding internal or sensitive fields
- adapting domain models to frontend contracts

#### Inline vs Dedicated Presenters

The project follows a **pragmatic presenter strategy**:

- **Inline presenters** are used when output mapping is minimal  
  (e.g. pass-through data, small field renames)

- **Dedicated presenter files** are created when:
  - output transformation becomes complex
  - formatting logic grows
  - multiple consumers require different response shapes
  - presentation logic risks bloating controllers

This approach avoids premature abstraction while keeping a **clear path for scaling**.

> Controllers orchestrate.  
> Presenters adapt output.  
> Use cases remain pure.

## 🔄 Error Flow

Errors flow **bottom → top**, but responsibility changes at each layer.

### Error Responsibility by Layer

```
| Layer           |   Responsibility                    |
|-----------------|-------------------------------------|
| Infrastructure  | Catch SDK / network errors          |
| Service         | Translate to domain or infra errors |
| Use Case        | Enforce business rules              |
| Controller      | Orchestrate                         |
| Server Action   | Sanitize & serialize                |
| UI              | Display message only                |
```

### Key Rule

> Infrastructure errors never reach the user directly.  
> Only safe messages cross the Server Action boundary.

## 🧩 Why This Architecture Matters

This repository proves that:

- You **can** use modern frameworks (Next.js)
- You **can** use third-party SDKs (BetterAuth)
- Without sacrificing:
  - testability
  - portability
  - long-term maintainability

## ⚠️ When NOT to Use This Architecture

This repository demonstrates **Clean Architecture applied rigorously**.
While powerful, this approach is **not always the right choice**.

Avoid using this architecture when:

---

### ❌ You are building a quick prototype or MVP

If your goal is:

- rapid experimentation
- validating an idea
- short-lived proof-of-concept

then the added layers will slow you down unnecessarily.

A simpler, framework-driven approach is often better at this stage.

---

### ❌ The application is very small and unlikely to grow

For:

- single-page apps
- internal dashboards
- hobby projects

the overhead of strict boundaries may not pay off.

---

### ❌ The team is unfamiliar with architectural patterns

Clean Architecture requires:

- discipline
- shared understanding
- consistent enforcement

Without team alignment, this structure can feel confusing rather than helpful.

---

### ❌ You don’t need portability or replaceability

If you are certain that:

- Next.js will never change
- BetterAuth will never be replaced
- the app lifecycle is short

then some of the abstractions here may be unnecessary.

---

### ❌ You are optimizing for speed over correctness

This architecture prioritizes:

- correctness
- safety
- maintainability

If your primary constraint is **delivery speed**, consider a lighter approach.

---

## ✅ When This Architecture Shines

This approach is a strong fit when:

- authentication is business-critical
- the system is long-lived
- multiple teams or contributors are involved
- vendor lock-in is a concern
- error handling must be precise and safe
- the backend may be reused across multiple interfaces

---

> Architecture is about trade-offs.  
> This repository intentionally chooses **clarity and longevity** over convenience.

## ❓ FAQ (For Readers & Contributors)

This section answers common questions for developers exploring this repository,
especially those coming from typical **Next.js + auth SDK** setups.

---

### Why is this architecture so layered?

This repository is **not optimized for speed of initial development**.  
It is optimized for:

- long-term maintainability
- replaceable frameworks and providers
- clear ownership of responsibilities
- safe error handling

Authentication is a **core business capability**.  
Mistakes here are expensive to fix later.

---

### Is this overkill for a small app?

Yes — **and that’s intentional**.

This project is a **learning lab / reference implementation**, not a starter template.

For:

- small prototypes
- internal tools
- throwaway projects

this architecture may be excessive.

For:

- SaaS products
- long-lived platforms
- multi-team codebases

this structure pays off quickly.

---

### Why not call BetterAuth directly from Server Actions?

Because that would:

- tightly couple business logic to a vendor SDK
- leak provider-specific errors
- make replacement or testing difficult

Instead:

- BetterAuth lives in `infrastructure/`
- Business logic depends only on abstractions
- Errors are translated before crossing boundaries

This keeps the **core independent and stable**.

---

### Why is input validation not done in Server Actions?

Server Actions are treated as a **transport layer only**.

Validation belongs to **controllers** because:

- validation is part of input adaptation
- controllers orchestrate requests
- use cases should assume valid input

This avoids duplication and keeps delivery mechanisms interchangeable.

---

### Why use presenters instead of returning use-case data directly?

Because:

- domain models should not be exposed to the UI
- formatting (dates, currency, locale) is not business logic
- different consumers may need different response shapes

Presenters act as **output adapters**, protecting the domain and API contracts.

---

### Why are some presenters inline and others separate files?

This is a **pragmatic decision**, not dogma.

- Inline presenters are used for simple mappings
- Dedicated presenter files are used when:
  - formatting logic grows
  - multiple consumers exist
  - controllers risk becoming bloated

The goal is **clarity over purity**.

---

### Why so much error handling?

Authentication errors are **user-facing and security-sensitive**.

This project enforces:

- strict error taxonomy
- safe messages crossing boundaries
- no leakage of infrastructure or SDK errors

This design is meant for **real user-facing products**, not demos.

---

### Can this architecture support REST APIs or SDKs later?

Yes — that is one of the core goals.

Only the **presentation layer** would change.

The same:

- controllers
- use cases
- domain
- error handling

can be reused for:

- REST APIs
- GraphQL
- SDK packages
- background workers

---

### Should I copy this architecture into my project?

You should **adapt**, not blindly copy.

Take:

- the dependency direction
- the error handling strategy
- the separation of concerns

Adjust:

- the number of layers
- folder depth
- abstractions

Architecture should serve the product — not the other way around.

---

### What is the main takeaway from this repo?

> Frameworks are tools — not foundations.  
> The foundation is your **domain**.

This repository demonstrates how to:

- use modern tools like Next.js
- integrate third-party providers
- without surrendering architectural control
