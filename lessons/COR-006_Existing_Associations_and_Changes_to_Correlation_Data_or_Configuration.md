# The matching rule changed. What happens to accounts that are already linked?

Devi, employee `76006`, already has an employee identity in SailPoint Identity Security Cloud (ISC). Her project application also has two legitimate accounts: a regular workspace login and a separate review login.

ISC has linked the workspace account to her identity. The review account is still unlinked.

The application team now supplies a dependable person reference on both accounts. You replace email-based matching with that reference and save the configuration.

Have both account relationships now been checked using the new reference?

No. Saving the configuration changes the instruction. It does not prove that the relevant records have been evaluated under it.

An existing relationship adds another question: how was that relationship established, and does it need an explicit relationship correction?

Let's keep the instruction, the account data and the relationship separate.

## Establish what already exists

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system. An **attribute** is a named piece of information on a record.

A **source** is ISC's configured representation of a system or account-data collection.

In this fictional design, **PeopleBridge Production** is authoritative for Employees. Its worker accounts establish employee identities through the Employees **identity profile**, the shared configuration governing those identities and their attribute mappings.

PeopleBridge account `pb-76006` is already associated with Devi's identity. We'll call the identity `I-76006`, a teaching label rather than an actual ISC object ID.

An **identity attribute mapping** supplies an identity field from selected account information or a calculation. The Employees mapping has already populated Devi's Identification Number, `identificationNumber`, with the approved person reference `P-76006`.

**FlowRoom Production** represents the project application. It is not authoritative for establishing employee identities in this design.

**Account correlation** matches and associates source accounts with identities. A **correlation criterion** pairs a selected account attribute with a selected identity attribute. The standard operation is **Equals**, which compares their values.

An **uncorrelated account** is a collected account not associated with an authoritative identity. It can still have an approved business owner and exist in the external application.

A **candidate identity** is an identity considered as the possible owner of an account. **Manual correlation** creates a persistent explicit account-to-identity link rather than relying only on later value comparisons.

Here is the supplied starting evidence:

| Record or configuration | State before the configuration change |
|---|---|
| Devi's identity `I-76006` | Applied `identificationNumber = P-76006`; `email = devi.rao@learn.example`; identity `name = worker76006`. The person-reference field is already eligible for correlation. |
| Other identity `I-76007` | `identificationNumber = P-76007`; `email = other.worker@learn.example`; `name = worker76007`. No other candidate has `P-76006`. |
| Workspace account `fr-306` | Login `drao.fr`; `mail = devi.rao@learn.example`; `personRef = P-76006`; already linked to `I-76006`. Supplied investigation evidence establishes automatic email-based correlation, not a manual link. |
| Review account `fr-307` | Login `drao.review`; `mail = obsolete.devi@learn.example`; `personRef = P-76006`; evaluated under the old configuration and recorded uncorrelated. |
| Old complete configured list | One criterion: account `mail` Equals identity `email`. |
| New complete configured list | One replacement criterion: account `personRef` Equals identity `identificationNumber`. No email alternative remains. |
| Ownership and other matching conditions | Application records and worker registry approve both accounts for Devi. Neither login matches any identity's `name`. No manual association applies to these two accounts. |

The approved reference identifies Devi uniquely among the supplied candidates.

The new reference is already present on both collected FlowRoom accounts before the configuration change. Their account records do not change during the comparison below. That lets us isolate a configuration change from a data change.

## A new instruction is not a new relationship

The source's **account schema** defines its represented fields and the attributes designated as Account ID and Account Name.

Here, Account ID uses the account key, such as `fr-306`. Account Name uses the login field, such as `drao.fr`.

Neither designation changes. Selecting `personRef` for correlation does not make it the account's identifier or rename the account. Removing a criterion removes a comparison, not the account or identity.

ISC also has a separate **default correlation** path: when configured correlation cannot establish an association, it compares the designated Account Name with identity `name`, case-insensitively. That default is not configurable.

Our supplied logins have no default match. Removing the configured email criterion does not disable the separate default path or turn it into a person-reference comparison.

After you save the replacement criterion, three observations remain distinct:

The configured comparison is now `personRef` to `identificationNumber`.

The accounts still hold their collected values.

The currently recorded relationships still need relevant evaluation and verification. The saved configuration is not proof of their origin or their new result.

A test of correlation configuration can estimate results against a sample. That estimate does not demonstrate that every existing account relationship has been updated.

## Why the next read can leave an unchanged account unevaluated

**Account aggregation** reads account information from a source into ISC.

In **optimized aggregation**, ISC retrieves records and checks for changes. When an existing account has no detected changes, it skips the record; account correlation and manager correlation are not evaluated for that unchanged record.

Manager correlation establishes which identity is a person's manager. It is a separate relationship, even though aggregation optimization can affect whether its logic is reevaluated.

This explains a common surprise: all the application accounts were read, the aggregation succeeded, and an uncorrelated account still appears uncorrelated.

A read occurred. The comparison you expected may not have occurred for that account.

In the supplied FlowRoom example, the next optimized aggregation finds no account-data changes for `fr-306` or `fr-307` and skips both for correlation evaluation. The workspace account remains linked to Devi, while the review account remains uncorrelated.

Neither observation demonstrates an evaluation under the replacement criterion.

For a source whose correlation configuration changed after earlier aggregation, the documented approach is an **unoptimized aggregation**. It scans source accounts and attributes and recalculates account and manager correlation logic even when the account data is unchanged.

That removes the unchanged-record skip from this explanation. It does not establish correct ownership, repair unsuitable input, or remove persistent manual correlation.

Here is the supplied sequence for our two accounts:

```text
Saved replacement criterion:
  personRef Equals identificationNumber
    -> instruction changed

Optimized read, records unchanged:
  fr-306 -> correlation skipped
  fr-307 -> correlation skipped
    -> old relationship states remain

Unoptimized read and evaluation:
  fr-306 -> same intended I-76006
  fr-307 -> now linked to I-76006
    -> verify each recorded relationship
```

The arrows follow this fictional change and its supplied outcomes. They do not describe private backend services or promise the same outcome for every existing account.

For this successful unoptimized result, both records are included, the person-reference inputs are current and usable, the identity field is applied and eligible, Devi is the unique intended candidate, and no persistent manual link applies.

The workspace account keeps the correct relationship. The review account gains the missing relationship. Both account keys and logins remain unchanged.

No person was created just because an application criterion changed.

An automatic association is not evidence of the persistent manual treatment described below. But reevaluation is not a universal promise that every formerly automatic link will move, disappear or become correct. Check the supported behavior for the actual change and the resulting account relationship. If an established link is wrong, use the supported correction appropriate to that account rather than assuming a broad reread must repair it.

## Ask which layer changed

A configuration change and a data correction can require different work.

If the application changes `fr-307.personRef` from an incorrect value to `P-76006`, the corrected value must first be published through the integration and collected into the actual ISC account.

The source screen showing the correction is not proof that ISC has received it.

If instead the identity's Identification Number is wrong, investigate the governing profile, its selected input and the applied identity value. **Identity processing** evaluates identity attributes and configured access requirements, including profile mappings.

A mapping **Preview** evaluates a selected identity against the mapping. It can show the intended value without proving that the current identity already holds it or that the application account was then evaluated against it.

Processing the identity and reevaluating the source account's correlation are not interchangeable evidence. An identity-side change does not necessarily make the application account data look changed to optimized aggregation.

For a newly introduced **custom identity attribute**, an additional organization-defined identity field, also establish correlation eligibility. It must be configured as searchable for correlation and receive the documented manual processing for all identities before source aggregation. Merely being queryable in the separate Search interface does not establish that preparation.

Our main example avoids that extra dependency: Identification Number was already populated and eligible.

You can locate the required work by asking what changed:

| What changed | What still needs to be established |
|---|---|
| Selected fields, criterion order or case behavior | The saved instruction is correct, suitable data exists, and the relevant accounts actually receive correlation evaluation. |
| An application account's matching value | The approved value reaches the represented account; the supported evaluation and actual association are checked. |
| An identity mapping or identity-side value | The correct identity has the applied, eligible value; source-account evaluation and its resulting link are separately verified. |
| An account's existing explicit association | Its origin and persistent treatment are understood; supported relationship correction is used when required. |
| A schema identifier or naming designation | This is a separate high-risk schema change, not an ordinary criterion replacement; existing references and documented constraints need review. |
| Configuration restored to an earlier version | Records, relationships and external changes already produced are assessed; restoration alone does not prove their reversal. |

Changing Account ID or Account Name after aggregation is strongly discouraged because it can cause serious reference or duplicate-record problems. Don't use an identifier change as a shortcut for correlation repair.

## Manual links do not become ordinary comparisons after a reread

For a manually correlated account, changed account attributes do not automatically move the account to another identity.

Consider a separate FlowRoom account, `fr-309`. Approved business evidence identifies Devi as its owner, but the account was manually attached to `I-76007`.

Its collected `personRef` is now the correct `P-76006`. The new configured comparison therefore points toward Devi.

An unoptimized aggregation still does not remove that manual association.

Here the data and matching instruction support the right person, but the explicit relationship remains wrong. Repeating the read does not substitute for the supported relationship correction.

ISC provides account-correlation update and manual-correlation correction capabilities. Select the supported path appropriate to the account and approved change; verify the actual resulting association and dependent effects.

Do not infer that every account currently linked to an identity is manual. Equally, do not assume a link is automatic simply because its values happen to satisfy today's criterion.

You need evidence of how the relationship was established and its current treatment.

## An account created through ISC can carry the same persistence

**Provisioning** attempts supported account or access changes in an external system. One provisioning operation can create an account for an identity.

For accounts created through ISC, the documentation identifies the account attribute `manuallyCorrelated=true`.

Here **true** is a Boolean value, a yes/no data type. The flag indicates manual-correlation treatment; it does not prove that an administrator uploaded a manual-correlation file.

Consider a separate account `fr-310` created through ISC for Devi. Its supplied account evidence has that flag set to true, but there is no manual file import.

Those facts are consistent. Account creation through ISC explains why this treatment can exist without a manual upload.

Unoptimized aggregation is not an override that removes it.

The flag also does not prove legitimate ownership or approval for current access. An account can have a persistent association that still needs investigation.

Changing the flag or association is a real relationship-management action, not a harmless diagnostic check. Establish the approved owner and supported correction before changing either.

## Current values do not tell you the whole history

Suppose the account currently has `personRef = P-76006`, the criterion selects that field, and the account is currently attached to Devi.

You can explain why those current facts are compatible.

You cannot conclude that the original link was created by that criterion. It could predate the configuration change or have persistent manual treatment.

Keep evidence from before and after the change:

Record the source and environment, exact account key, account values, linked identity, selected identity values and complete configured criteria. Record when each observation was taken.

Use aggregation history to establish the run's timing, status, scanned records and whether optimization was enabled. Manual Correlation history identifies manual file imports; available account and identity details establish current records. Relevant events can supply additional change evidence.

A source-level history entry is not automatically a complete per-account decision trace. Do not invent a screen showing every historical candidate and criterion if that evidence is unavailable.

Likewise, no manual file import does not prove there was no persistent association, as the ISC-created account variation shows.

A broad “completed successfully” badge must be connected to the actual account result. It cannot answer the ownership question on its own.

Search and other views can reflect updates on different schedules. Compare the exact objects and observation times before treating a different display as proof of a second relationship change.

## Review the effects before moving a real account

An **entitlement** represents a permission or membership. Correlation associates an account and its represented access with an identity; it does not, by itself, grant business approval for that access.

Moving a real account can also affect configured operations that depend on its associated identity.

**Attribute synchronization** is a configured identity-to-account write path for existing correlated accounts. The configuration specifies which eligible account attributes should follow mapped identity attributes.

A source account moved or correlated to a different identity with different values can trigger synchronization under that configuration.

So a correction that looks like “just move the link” can have external consequences.

For example, suppose a separate approved change moves an account from the wrong identity to Devi, and department synchronization is configured. The other identity has department `Operations`; Devi has department `Engineering`.

The move can cause the configured department value to be written to the account. Whether that write succeeds still needs provisioning and target-system evidence.

The FlowRoom main example supplies no attribute-sync write or access change. Its successful outcome is the correct account relationship, not a claim about external permissions or sign-in.

Before a real migration, review mappings that use the account, configured synchronization and other consumers of the association. Review both the old and intended identities.

Restoring the previous criterion does not automatically restore an earlier relationship or undo a completed target write.

A **corrective write** is a separately approved change to repair an external value. It cannot make an earlier wrong write never have happened.

```text
Human-approved change:
  record values and existing links
  check identity-dependent operations
    -> choose supported change scope

ISC evaluation or link correction:
  verify actual account association
    -> inspect resulting operations

If a target write occurred:
  verify actual external state
    -> approve any corrective write

Restoring an old criterion alone:
  does not prove these effects reversed
```

This is a change-review map, not a fixed ISC execution pipeline. The synchronization branch exists only when its configuration and triggering conditions apply.

## Work through the changed evidence

### 1. The configuration saved successfully

**Facts:** You replace mail-to-email with personRef-to-identificationNumber. No account evaluation or new relationship observation is supplied.

Can you say the existing accounts now use the new rule?

**Reasoning:** You can say which instruction is saved. You cannot claim the existing relationships were reevaluated or changed. Establish the relevant operation and actual account outcomes.

### 2. Only the identity value changed

**Facts:** The identity's new reference is applied. The application account is unchanged, and the next optimized aggregation skips it.

Does the new identity value prove the source account received correlation evaluation?

**Reasoning:** No. Applied identity data and source-account evaluation are different evidence. Check the appropriate supported reevaluation and its resulting relationship; do not treat identity processing as a universal source-account reassignment command.

### 3. The external reference is corrected

**Facts:** The application owner changes a reference on the application screen. ISC still displays the previous account value.

Should you immediately rewrite the identity to match that old value?

**Reasoning:** No. Trace publication, integration collection and the represented account before changing a correct identity. The external correction has not yet been demonstrated at the selected comparison input.

### 4. A manual link points to the wrong person

**Facts:** Account `fr-309` is manually attached to `I-76007`. Its reference now uniquely supports Devi. An unoptimized aggregation finishes.

Must the account have moved to `I-76006`?

**Reasoning:** No. Manual correlation persists through those changes. Use approved supported relationship correction and verify the actual association; more reads do not remove the explicit link.

### 5. There was no manual file upload

**Facts:** Account `fr-310` was created through ISC. Its supplied account evidence contains `manuallyCorrelated=true`; no manual correlation file was imported.

Does the flag contradict the history?

**Reasoning:** No. ISC-created accounts can have this treatment. The flag does not establish that a file upload occurred, and absence of that upload does not establish an ordinary automatic link.

### 6. The email row was removed

**Facts:** The configured list now contains only the person-reference comparison. One account's reference finds no candidate, but its designated Account Name uniquely matches an identity's `name`.

Has removing email disabled every other matching path?

**Reasoning:** No. The separate case-insensitive default naming path still exists. Verify the actual association and approved owner; changing the configured list does not redefine the default.

### 7. The old criterion is restored

**Facts:** A supported link correction moved an account to Devi. A configured department-sync write then succeeded externally. The team restores the old correlation criterion.

Have the relationship and department necessarily returned to their earlier states?

**Reasoning:** No. Restored configuration is not evidence of either reversal. Inspect the current link, actual external value and relevant activity, then approve any required relationship correction or corrective write.

### 8. The run succeeded and the link stayed the same

**Facts:** Account `fr-306` was correctly linked to Devi before the migration. An unoptimized run includes and evaluates it; current evidence still shows `I-76006`, consistent with the approved person reference.

Did the migration fail because the identity label did not change?

**Reasoning:** No. Preserving an already correct association is a valid outcome. Verify the new criterion, included record, suitable inputs and actual result. A migration does not need to move every account, and the unchanged relationship alone does not reconstruct its historical origin.

## Plan the migration without treating every account alike

A project has 400 application accounts: 360 with existing automatic associations, 25 uncorrelated, 10 manually linked and 5 created through ISC with manual-correlation treatment.

The team proposes replacing email matching with a worker-registry person reference, then declaring completion when an aggregation succeeds.

What would you require before accepting that plan?

First, preserve the existing relationships and their supported origin evidence. Verify the person reference's meaning, population coverage, uniqueness and identity-side preparation. Include incorrect, missing and ambiguous data in representative non-production checks rather than testing only the clean example.

The 360 existing automatic links need comparison against approved ownership, not an expectation that all must move. The 25 uncorrelated accounts need suitable candidates and verified resulting associations. The 15 persistent-link accounts need separate review; unoptimized aggregation is not their automatic release mechanism.

Select the supported production operation and scope deliberately. A source-wide unoptimized run can revisit more than the one account that prompted the change. Do not improvise collection filters or reset a source to manufacture a small test.

Before execution, review dependent writes, operational load, monitoring and the approved response to unexpected outcomes. In this theory exercise, none of those production changes is performed.

After execution, verify results by account and cause. Keep unresolved cases visible. Confirm any dependent target changes separately.

The completion question is not “Did every account move?” It is “Does each account have the approved relationship, and have the relevant effects been checked?”
