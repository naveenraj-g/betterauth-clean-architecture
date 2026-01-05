## 🧠 Architecture Decisions (ADR)

This repository documents key architectural decisions to make the design **explicit, intentional, and maintainable**.  
These are not accidental patterns — they are deliberate trade-offs.

---

### ADR-001: Use Clean Architecture for Authentication

**Decision**  
The authentication system is implemented using **Clean Architecture** principles.

**Rationale**

- Authentication logic is long-lived and business-critical
- Frameworks (Next.js) and providers (BetterAuth) are expected to change
- Business rules must remain testable and framework-agnostic

**Consequences**

- More files and layers than a typical Next.js app
- Clear separation of responsibilities
- Strong long-term maintainability and portability

---

### ADR-002: Treat BetterAuth as Infrastructure

**Decision**  
BetterAuth is treated strictly as an **infrastructure dependency**, not as business logic.

**Rationale**

- BetterAuth is a third-party SDK
- Business rules should not depend on vendor APIs
- Enables replacement or coexistence with other auth providers

**Consequences**

- BetterAuth is isolated behind an `AuthService` adapter
- Domain and use cases never import BetterAuth
- Provider-specific errors are translated before crossing boundaries

---

### ADR-003: Server Actions as Presentation / Transport Layer

**Decision**  
Next.js **Server Actions** are placed in the `presentation/` layer and treated as a transport boundary only.

**Rationale**

- Server Actions are framework-specific
- They exist to bridge client ↔ server communication
- Validation and business logic do not belong at this layer

**Consequences**

- Server Actions delegate immediately to controllers
- No business logic or validation in Server Actions
- Easy migration to REST APIs or other delivery mechanisms

---

### ADR-004: Controllers Own Input Validation

**Decision**  
All input validation is performed in **controllers**, not in Server Actions or use cases.

**Rationale**

- Controllers are responsible for request orchestration
- Validation is part of input adaptation, not business rules
- Prevents duplication across transport layers

**Consequences**

- Use cases assume valid input
- Validation logic is centralized and reusable
- Server Actions remain thin and consistent

---

### ADR-005: Presenters for Output Transformation

**Decision**  
**Presenters** are used to adapt use-case output into client-facing response models.

**Rationale**

- Output formatting (dates, currency, locale) is not business logic
- Prevents leaking domain models to the frontend
- Enables multiple response shapes for different consumers

**Strategy**

- Inline presenters for simple mappings
- Dedicated presenter files when complexity grows

**Consequences**

- Controllers remain readable
- Presentation logic is isolated
- API contracts can evolve without changing use cases

---

### ADR-006: Error Translation via Anti-Corruption Layer

**Decision**  
All BetterAuth and infrastructure errors are translated into **domain-level errors** before crossing boundaries.

**Rationale**

- Third-party errors are unstable and unsafe to expose
- Users should only see meaningful, controlled messages
- Keeps error semantics consistent across providers

**Consequences**

- Infrastructure errors never reach the UI directly
- Server Actions act as the serialization and sanitization boundary
- Error handling is predictable and user-safe

---

### ADR-007: Dependency Direction Is Strictly Enforced

**Decision**  
Dependencies always point **inward**, following Clean Architecture rules.

**Rationale**

- Prevents framework and SDK lock-in
- Makes business logic independently testable
- Keeps the domain as the system foundation

**Consequences**

- Domain never imports infrastructure or frameworks
- Application layer depends only on abstractions
- Infrastructure depends on everything — and nothing depends on it

---

> These decisions favor **clarity, safety, and longevity** over short-term convenience.
> This repository is intentionally designed as a **reference implementation**, not a shortcut.
