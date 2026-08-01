---
status: accepted
---

# Asset Lifecycle and Canonical Ownership

The repository treats every asset as **Reference → Working → Verified → Canonical**. Reference material guides creation, Working material is disposable, Verified material has passed the checks for its intended use, and Canonical material is the adopted source of truth. Operational procedures stay in skill documentation; asset-specific decisions and durable evidence belong in ADRs rather than inside canonical asset directories.

This keeps the generation workspace separate from adopted assets and prevents a generated asset folder from becoming a second documentation system.
