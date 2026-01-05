# Contributing Guide

Thanks for your interest in contributing 🎉  
This repository is a **Clean Architecture learning and reference project**, not a feature-driven product.

Please read this guide before making changes.

---

## 🎯 Purpose of This Repository

This project exists to:

- Explore **Clean Architecture** in real-world scenarios
- Integrate **BetterAuth** without leaking framework details
- Demonstrate **correct error boundaries**
- Prioritize **maintainability and clarity over speed**

Any contribution should **strengthen these goals**.

---

## 🧱 Architectural Rules (Strict)

### 1. Dependency Direction

Dependencies must always point **inward**.

❌ Forbidden:

- Use cases importing BetterAuth
- Controllers importing SDKs
- Domain logic importing Next.js / ZSA

✅ Allowed:

- Infrastructure importing SDKs
- Server Actions importing controllers
- Adapters translating third-party errors

---

### 2. Error Handling Rules

- Never throw raw third-party errors
- Never leak SDK error codes upward
- Always translate external errors into:
  - `AuthError` (business / user-actionable)
  - `InfrastructureError` (provider / system failure)

Server Actions are the **only place** where errors are serialized for the client.

---

### 3. No Business Logic in Server Actions

Server Actions:

- Call controllers
- Catch errors
- Sanitize responses

They must **never**:

- Contain business rules
- Perform validation logic
- Talk directly to infrastructure

---

## 🔐 Authentication Contributions

When working on auth-related features:

- Treat BetterAuth as **infrastructure**
- Add mappings only for **user-actionable errors**
- Collapse SDK errors into **stable domain errors**
- Prefer meaningful messages over exposing codes

---

## 🧪 Testing Philosophy

- Business logic should be testable without Next.js
- Auth adapters should be mockable
- Error translation should be deterministic

(Tests are welcome but not mandatory at early exploration stages.)

---

## 📦 Commit Guidelines

- Prefer small, focused commits
- Write clear commit messages
- Avoid mixing refactors and features

---

## 💬 Questions or Discussions

This repo encourages **architectural discussion**.

If something feels unclear or debatable:

- Open an issue
- Explain the reasoning
- Propose alternatives

Clean Architecture is about **intentional decisions**, not rigid rules.

---

## 📌 Final Note

> This repository values **clarity over cleverness**.

If a change makes the architecture harder to understand, it probably doesn’t belong.

Thank you for contributing 🙌
