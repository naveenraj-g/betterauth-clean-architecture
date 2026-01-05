# betterauth-clean-architecture

A **Clean Architecture–based authentication system** built with **Next.js** and **BetterAuth**, focused on **separation of concerns**, **error boundaries**, and **long-term maintainability**.

This repository is **not a product** — it is a **learning lab / reference implementation** that explores how to integrate a third-party authentication provider (BetterAuth) into a clean, framework-agnostic backend design.

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
                    │        Frontend (UI)         │
                    │  React / Next.js Components  │
                    └──────────────▲──────────────┘
                                   │
                                   │ Messages only
                                   │
                    ┌───────────────┴───────────────┐
                    │        Server Actions          │
                    │   (Serialization Boundary)    │
                    │  - ZSA                         │
                    │  - Error sanitization          │
                    └───────────────▲───────────────┘
                                   │
                    ┌───────────────┴───────────────┐
                    │        Controllers             │
                    │  - Request orchestration       │
                    │  - Call use cases              │
                    └───────────────▲───────────────┘
                                   │
                    ┌───────────────┴───────────────┐
                    │         Use Cases              │
                    │  - Business rules              │
                    │  - Auth flows                  │
                    └───────────────▲───────────────┘
                                   │
                    ┌───────────────┴───────────────┐
                    │          Services              │
                    │  - Domain services             │
                    │  - Auth abstractions           │
                    └───────────────▲───────────────┘
                                   │
                    ┌───────────────┴───────────────┐
                    │   Infrastructure / Adapters   │
                    │  - BetterAuth SDK              │
                    │  - Database                    │
                    │  - External APIs               │
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

This structure intentionally mirrors Clean Architecture layers.

```
├─ src/
│  └─ modules/
│     ├─ server/
│     │  ├─ auth/
│     │  │  ├─ application/
│     │  │  │  └─ usecases/
│     │  │  │     └─ auth/
│     │  │  │        └─ signup.usecase.ts
│     │  │  ├─ di/
│     │  │  │  ├─ modules/
│     │  │  │  │  ├─ auth.module.ts
│     │  │  │  │  └─ index.ts
│     │  │  │  ├─ container.ts
│     │  │  │  └─ types.ts
│     │  │  ├─ domain/
│     │  │  │  ├─ entities/
│     │  │  │  │  └─ errors/
│     │  │  │  └─ interfaces/
│     │  │  │     ├─ auth.service.interface.ts
│     │  │  │     └─ index.ts
│     │  │  ├─ infrastructure/
│     │  │  │  ├─ repositories/
│     │  │  │  └─ services/
│     │  │  │     ├─ auth.service.ts
│     │  │  │     └─ index.ts
│     │  │  └─ presentation/
│     │  │     ├─ actions/
│     │  │     │  └─ auth.actions.ts
│     │  │     └─ controller/
│     │  │        └─ auth/
│     │  │           ├─ index.ts
│     │  │           └─ signup.controller.ts
│     │  ├─ auth-provider/
│     │  │  └─ auth.ts
│     │  ├─ prisma/
│     │  │  ├─ schema/
│     │  │  │  └─ schema.prisma
│     │  │  └─ db.ts
│     │  └─ shared/
│     │     └─ errors/
│     │        ├─ auth/
│     │        │  ├─ authError.ts
│     │        │  └─ commonAuthErrors.ts
│     │        ├─ mappers/
│     │        │  └─ mapBetterAuthError.ts
│     │        ├─ applicationError.ts
│     │        ├─ commonErrors.ts
│     │        └─ infrastructureError.ts
│     └─ shared/
│        ├─ components/
│        ├─ entities/
│        │  ├─ enums/
│        │  ├─ errors/
│        │  │  └─ schemaParseError.ts
│        │  ├─ schema/
│        │  │  └─ auth/
│        │  │     └─ signup.schema.ts
│        │  └─ types/
│        └─ error/
│           └─ parseZSAParseErrors.ts

```

## 🔄 Error Flow

Errors flow **bottom → top**, but responsibility changes at each layer.

### Error Responsibility by Layer

```
| Layer        |   Responsibility |
|--------------|------------------|
| Infrastructure | Catch SDK / network errors |
| Service | Translate to domain or infra errors |
| Use Case | Enforce business rules |
| Controller | Orchestrate |
| Server Action | Sanitize & serialize |
| UI | Display message only |
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

Frameworks are tools — not foundations.

The foundation is **your domain**.
