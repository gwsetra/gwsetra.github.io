# Project Instructions

## Superpowers Methodology Enforcement

You MUST strictly follow the **Superpowers development methodology and skills** for all coding, design, and debugging tasks in this workspace.

### Core Superpowers Rules & Skills

1. **Skill Invocation & Process First (`using-superpowers`):**
   - Invoke relevant or requested skills **before** any response or action — including clarifying questions, exploring the codebase, or checking files.
   - Always announce: `Using [skill-name] to [purpose]`.
   - Never rationalize skipping a skill ("this is simple", "I need context first", "I'll do this one thing first"). If a skill exists for the task, use it.

2. **Creative Work & Design (`brainstorming`):**
   - Do NOT jump directly into coding or scaffolding.
   - Explore requirements and user intent one question at a time.
   - Propose 2–3 approaches with trade-offs.
   - Present the design in bite-sized sections and wait for explicit approval before implementing.
   - **Zero Rushing & No Transition Nagging:** Never treat brainstorming as a checklist to race through. Do NOT proactively ask, nudge, or prompt to exit brainstorming, install tools, or start scaffolding at the end of turns.
   - **Human-Initiated Phase Transitions Only:** The transition out of `brainstorming` into planning, tooling setup, or implementation can ONLY be initiated by the human partner explicitly (e.g., "I'm ready to move forward", "let's set up the tools"). Until the user explicitly gives that command, remain entirely within discovery and exploration.

3. **Workspace Isolation (`using-git-worktrees`):**
   - Use when starting feature work that needs isolation or before executing implementation plans.
   - Create an isolated worktree/workspace on a new feature branch, verify a clean test baseline, and manage integration upon completion.

4. **Multi-Step Implementation Plans (`writing-plans`):**
   - For multi-step tasks, create detailed plans with granular (2–5 min) tasks, file paths, and verification steps before touching code.

5. **Subagent Execution (`subagent-driven-development`):**
   - Use when executing implementation plans with independent tasks in the current session.
   - Dispatch a fresh subagent per task with two-stage review (spec compliance, then code quality) before proceeding.

6. **Batch Plan Execution (`executing-plans`):**
   - Use when executing written implementation plans with structured checkpoints.
   - Execute in batches, verify progress, and review work at human checkpoints between phases.

7. **Parallel Agent Execution (`dispatching-parallel-agents`):**
   - Use when facing 2+ independent tasks that have no shared state, file collisions, or sequential dependencies.
   - Dispatch concurrent subagents to work in parallel, aggregate results, and review them before proceeding.

8. **Test-Driven Development (`test-driven-development`):**
   - Follow strict RED-GREEN-REFACTOR: write a failing test first, verify failure, write minimal code to pass, then refactor.
   - Never write production code before tests.

9. **Systematic Debugging (`systematic-debugging`):**
   - Never guess or speculate on fixes.
   - Follow the 4-phase root-cause analysis: Reproduce → Trace → Hypothesize → Fix & Verify.

10. **/v (`verification-before-completion`):**
    - Evidence before assertions always.
    - NEVER claim work is complete, passing, or fixed without running verification commands (tests, builds, linters) and confirming real terminal output.

---

### Spec-Driven Development Architecture (Spec-Kit + OpenSpec)

11. **Three-Tier Artifact Hierarchy:**
    - `docs/brainstorm/`: Working discovery notes, raw research, inspirations, and wireframe drafts. Nothing here is a binding requirement.
    - `.specify/constitution.md`: Non-negotiable project-wide governance, architecture guardrails, performance budgets, and testing rules.
    - `openspec/specs/`: Canonical ground-truth specifications for validated features. This is the single source of truth for implementation.
    - `openspec/changes/`: Scoped delta proposals (`ADDED`, `MODIFIED`, `REMOVED` requirements) for brownfield changes, preventing monolithic spec regeneration.

12. **Greenfield vs. Brownfield Calibration:**
    - **Greenfield (0-to-1):** Follow the full discovery flow in `docs/brainstorm/` → compile approved spec into `openspec/specs/` → technical plan (`/speckit.plan`) → TDD implementation.
    - **Brownfield (Modifications & Bug Fixes):** Create a concise delta file in `openspec/changes/<slug>/proposal.md` → implement only the delta tasks → audit via `/speckit.converge` → merge into `openspec/specs/` and archive. Never regenerate full specs for small tweaks.

13. **Anti-Hallucination & Clarifying Questions Gate:**
    - Never guess or extrapolate user intent on underspecified requirements.
    - Ask clarifying questions **one at a time** whenever ambiguity arises regarding data models, external APIs, styling, or scope.
    - Ground every technical claim in real files, real tool outputs, or explicit user confirmation. Speculative implementation without evidence is strictly prohibited.

14. **Hard Refusal Gate:**
    - If prompted to write production code or scaffold project directories before an approved specification exists in `openspec/specs/` (or an active delta in `openspec/changes/`), REFUSE execution and redirect to `brainstorming`.

---

### Operational Discipline & Hygiene

15. **Tool Preflight Verification:**
    - Never assume external CLI tools, compilers, or packages are installed.
    - Verify tool availability (`which <cmd>` or checking package manifests) before running or referencing them. If missing, flag it immediately and guide the user through installation first.

16. **Atomic Commits & State Hygiene:**
    - Commit each completed task in an approved plan as an atomic git commit with conventional commit format (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`).
    - Commit ONLY after tests and verification pass. Never commit failing tests, broken builds, temporary debug logs, or unignored secrets/`.env` files.
