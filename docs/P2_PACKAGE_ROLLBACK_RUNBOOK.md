# MTPL P2.0 — Package Migration Rollback Runbook

**Milestone:** Phase 2 — P2.0  
**Scope:** Reversible rollback of P2.0 migration inserts in local `mtpl_dev` **ONLY**  
**Script Command:** `npx tsx scripts/migrate-packages-to-mongodb.ts --rollback-local`

---

## 1. Rollback Design, Cohort Ownership & Safety Model

The P2.0 migration script distinguishes **Attempt 1..N per-run inserts** (`insertedPackageSlugs` / `insertedMediaKeys` and `migrated*Digests`) from **full migration-cycle ownership** (`ownedPackageSlugs` / `ownedMediaKeys` and `owned*Digests`) on the completing `"applied"` `MigrationLedger`:

- **Clean single-shot apply:** `owned*` equals that ledger's `inserted*` set (`93` packages, `186` media assets on an empty DB).
- **Recovery after partial failure:** The completing `"applied"` ledger stores `parentAttemptLedgerIds` pointing to all earlier `"failed"` / interrupted `"running"` ledgers in the same cycle, and `ownedPackageSlugs` / `ownedMediaKeys` (plus `ownedPackageDigests` / `ownedMediaDigests`) accumulates **every** document inserted across all attempts in the cycle.
- **Pre-existing documents preserved:** Any document already present before Attempt 1 (`preExistingPackageSlugs` / `preExistingMediaKeys`) is **never** added to `owned*` and is never deleted by rollback, even if skipped again during a retry.

When `--rollback-local` runs:
1. Validates local `mtpl_dev` target via `resolveLocalDatabaseTarget()`.
2. Selects the active target ledger: first checks for an interrupted `status: "rolling_back"` ledger to resume; otherwise selects the latest `status: "applied"` ledger.
3. **Cross-Attempt Digest Parity & Modification Guard (`INTEGRITY BLOCK` / `ROLLBACK BLOCKED`):** Before deleting **any** record:
   - Enforces exact 1:1 key-set parity between `ownedPackageSlugs`/`ownedMediaKeys` and `ownedPackageDigests`/`ownedMediaDigests`, and cross-checks all digests recorded on linked `parentAttemptLedgerIds`.
   - Recomputes canonical SHA-256 digests of every tracked `Package` and `MediaAsset` present in `mtpl_dev`.
   - If **any** owned document (whether inserted in the final apply OR an earlier failed attempt) was modified after migration, rollback **aborts immediately** with `ROLLBACK BLOCKED` and deletes zero records.
   - Missing owned documents trigger `ROLLBACK BLOCKED` when starting from `"applied"` (missing records are tolerated only as already-deleted items when resuming an interrupted `"rolling_back"` ledger).
4. **Resumable State Transition (`rolling_back`):** Transitions the active ledger to `status: "rolling_back"` (`rollbackStartedAt`) before performing the first deletion.
5. **Scoped Incremental Deletion & Checkpointing:** Deletes only documents in `ownedPackageSlugs` and `ownedMediaKeys` not yet in `rollbackDeletedPackageSlugs` / `rollbackDeletedMediaKeys`. Pre-existing matching records (`preExisting*`) and unrelated collections are untouched.
6. **Interrupted / Failed Rollback Resumption:** If a rollback crashes or fails partway through, `status: "rolling_back"` and the deleted keys recorded in `rollbackDeletedPackageSlugs` / `rollbackDeletedMediaKeys` remain persisted. Running `npx tsx scripts/migrate-packages-to-mongodb.ts --rollback-local` again automatically detects the `"rolling_back"` ledger, re-verifies SHA-256 digests on all remaining documents before touching them, skips already-deleted keys, completes the remaining deletions cleanly, and finishes transition to `"rolled_back"`.
7. **Full Audit Trail Preserved:** Marks the active ledger `"rolled_back"` (`rolledBackAt`), stamps `rolledBackByLedgerId` and `rolledBackAt` onto linked parent attempt ledgers without deleting any ledger documents, and leaves all physical files under `storage/media/public/` untouched.

---

## 2. Executing or Resuming Rollback (`mtpl_dev`)

```powershell
npx tsx scripts/migrate-packages-to-mongodb.ts --rollback-local
```

This same command both performs an initial guarded rollback from `"applied"` and safely resumes an interrupted `"rolling_back"` rollback. Note that `--apply-local` refuses to run while a ledger is in `"rolling_back"` state until `--rollback-local` finishes.

---

## 3. Handling `ROLLBACK BLOCKED`

If rollback reports that one or more owned documents (from any attempt in the cycle) were modified post-migration:
1. Inspect the modified package/media document(s) against the pre-migration snapshot in `storage/backups/pre-migration-snapshot-mtpl_dev-<timestamp>.json`.
2. Export or back up manual CMS/admin edits you wish to keep.
3. Revert the document manually or restore from snapshot only after preserving manual changes, then re-run `--rollback-local`.

