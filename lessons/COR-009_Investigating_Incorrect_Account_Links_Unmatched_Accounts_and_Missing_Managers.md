# The account or manager looks wrong. Where would you start the investigation?

Devi, employee `79009`, already has an employee identity in SailPoint Identity Security Cloud (ISC).

Support receives three complaints. One application account appears under another person. A second account is absent from Devi's account list. Her manager is also missing.

“Run the aggregation again” sounds like one answer to all three.

Before choosing that action, we need to establish which records exist, which relationships are wrong and which input or instruction needs attention.

The same visible symptom can lead to different investigations. An account absent from an identity's page may be uncollected, uncorrelated or attached to someone else.

Let's separate those possibilities using actual records.

## Establish what each complaint is about

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system. An **attribute** is a named piece of information on a record.

A **source** is ISC's configured representation of a system or account-data collection. Keep its environment with its name: a test source is not the production source.

In this fictional design, **TeamLedger Production** is authoritative for Employees. Its worker accounts establish employee identities through the Employees **identity profile**, the shared configuration governing those identities and their attribute mappings.

Devi's TeamLedger account `tl-79009` already belongs to her identity. We'll call that identity `I-79009`, a teaching label rather than an actual ISC object ID.

An **identity attribute mapping** supplies an identity field from selected data or a calculation. Employees has already populated Devi's Identification Number, `identificationNumber`, with approved person reference `P-79009`.

**WorkspaceDesk Production** represents the application. It does not establish employee identities in this design.

**Account correlation** establishes which identity a source account belongs to. An **uncorrelated account** is a collected account not associated with an authoritative identity.

**Manual correlation** is a persistent explicit account-to-identity link. Changed data or another read does not automatically release it.

**Manager correlation** establishes a relationship from the employee's identity to the manager's identity. It is not an instruction to move the employee's account under their manager.

A **candidate identity** is an identity considered as a possible match. For account correlation, that means a possible account owner; for manager correlation, a possible manager.

**Equals** compares the selected attribute values. A correct value somewhere else in the account does not help if the configured comparison selects another field.

Here is the supplied investigation evidence, not output from a real tenant:

| Record or configuration | Current evidence |
|---|---|
| Devi's identity `I-79009` | Exists with applied, correlation-eligible `identificationNumber = P-79009` and identity `name = worker79009`. |
| Other identity `I-79010` | Different person; `identificationNumber = P-79010`; `name = worker79010`. |
| Intended manager `I-89909` | Already exists with applied, eligible `identificationNumber = P-89909`. The approved worker registry identifies this person as Devi's manager. |
| WorkspaceDesk account `wd-601` | Login `drao.wd`; collected `personRef = P-79009`; linked to `I-79010`. Retained investigation evidence establishes an incorrect manual assignment. |
| WorkspaceDesk account `wd-602` | Login `drao.review`; collected `personRef = null`; already evaluated and recorded uncorrelated. No manual association applies. Null means no value is present in that field. |
| WorkspaceDesk matching configuration | Complete configured list: account `personRef` Equals identity `identificationNumber`. No additional criterion or identity-name match for either login applies. Intended candidate `P-79009` is unique. |
| Approved application ownership | Application records and the worker registry confirm that both accounts belong to Devi. Account keys and logins are legitimate and should remain unchanged. |
| Manager inputs and configuration | TeamLedger `tl-79009.managerRef = P-89909` is collected. Source manager configuration compares `managerRef` with the manager identity's `identificationNumber`, but Employees has no Manager Name mapping. No competing mapped source or custom rule applies. |
| Reported manager result | Devi has no resolved manager relationship. No external manager write or dependent access change is supplied. |

The source's **account schema** defines its represented fields and its Account ID and Account Name designations. WorkspaceDesk uses the account key as Account ID and the login field as Account Name.

The separate **default correlation** path compares the designated Account Name with identity `name`, case-insensitively, when configured correlation cannot establish an association. It is not configurable.

Our supplied logins have no default match. That matters when explaining the overall uncorrelated result; one failed configured comparison alone would not establish every possible relationship outcome.

## First find the record, then investigate its relationship

**Account aggregation** reads account information into ISC.

If an account does not appear on Devi's identity, begin by checking whether that exact source account exists elsewhere in ISC.

The account's source and stable key are more dependable than its displayed name for this question.

In the supplied evidence, both WorkspaceDesk accounts already exist. Recollecting them as though neither has ever arrived would not explain their different relationships.

`wd-601` is attached to the wrong identity. `wd-602` is collected but uncorrelated.

If a different account really is absent from ISC, investigate the source read first: scope and filters, the actual returned record, field extraction and relevant execution issues.

A completed source-level run does not prove every expected record was included. An account absent from a collection response also does not, by itself, prove the external account was deleted.

Next confirm that the intended identity exists. If it does not, investigate the approved authoritative population, required identity data and profile processing rather than treating an application correlation change as identity creation.

In the main case, Devi and her intended manager already exist. That lets us rule out missing identity establishment as the cause of these three complaints.

```text
Human investigation:

Exact source account exists in ISC?
  no -> investigate collection
  yes -> inspect actual association

Intended identity exists and is usable?
  no -> investigate identity intake
  yes -> inspect selected matching data

Existing link is wrong?
  -> check link origin and persistence

Account is uncorrelated?
  -> check inputs, criteria, evaluation

Manager relationship is missing?
  -> check manager mapping, comparison

After approved correction:
  -> verify each actual relationship
```

These branches organize evidence. They are not ISC's private execution algorithm or a requirement to run every operation in that order.

Keep the external account's existence, ISC's account representation, the intended identity and the relationship between them separate.

## Why wd-601 needs relationship correction

The account contains the approved reference `P-79009`. The intended identity contains the same reference. The current configured comparison selects those fields.

Yet the account is linked to `I-79010`.

That does not mean the values should be changed to make the old link look consistent. It means we must investigate the existing association.

Here retained evidence identifies a mistaken manual assignment. The current source data and current criterion did not create that mistaken instruction.

A manual association persists after source-data changes. **Unoptimized aggregation**, which recalculates correlation logic even for unchanged account data, does not remove manual correlation.

The supported account-management capability **Update Correlation** can correct an account associated with the wrong identity. An approved manual-correlation correction is another documented relationship-management path.

The instruction must identify this exact production account and the verified intended identity. A display name or guessed file identifier is not enough.

After approved correction, inspect both the old and intended identity contexts and the account's actual association.

If the origin evidence were unavailable, record that uncertainty. Today's matching fields cannot reconstruct the old assignment history on their own.

Accounts created through ISC can also have `manuallyCorrelated=true`, a Boolean yes/no flag indicating manual-correlation treatment. No manual file import does not prove the account has an ordinary automatic link.

Do not change a real flag or association merely to test a theory. Establish the supported correction and its consequences first.

## Why wd-602 needs an input repaired

The second account has no usable value on the selected account side: `personRef` is null.

The intended identity's value is already applied and eligible. Changing a correct identity mapping would repair the wrong layer.

The application owner confirms that the approved reference should be `P-79009`. The integration feed omitted it.

That diagnosis requires more than a blank-looking screen. Inspect the actual collected field and the feed's relevant output. A missing field, null, empty text, spaces and a placeholder are not interchangeable representations.

Do not assume every connector clears a previous value when a response omits a field. In this supplied case, the current collected value is explicitly null.

The approved feed correction must supply the intended reference, reach the represented account and receive supported correlation evaluation.

**Optimized aggregation** skips an unchanged account for account and manager correlation. Therefore a successful read of unchanged records is not proof those relationships were reevaluated.

Choose the supported operation and scope for the actual defect. A saved criterion or mapping is not an evaluated record. An unoptimized run can revisit more than this one account, so it also needs an approved scope and dependency review.

A single-account reload has a limited scope. It does not establish that identity values were recalculated or that an external account change was delivered. Check what the selected operation actually updates.

For the main successful outcome, we supply that the corrected `wd-602.personRef = P-79009` is collected and evaluated, the candidate remains unique and eligible, and no persistent manual link applies to that account.

Its resulting association is then checked directly.

If multiple identities shared that reference, or the reference found no intended candidate, that would require different evidence and correction. Do not invent a first-candidate winner or create another identity merely because matching failed.

## Why the manager needs its own mapping and evaluation

Devi's collected HR account already has `managerRef = P-89909`. The intended manager identity also exists with that value in its own Identification Number.

But the Manager Name mapping is missing.

Manager correlation requires both the profile's **Manager Name** mapping and the selected source's manager-correlation configuration.

The mapping identifies the source information supplying the manager reference. The source configuration identifies the employee account field and the field on potential manager identities.

The label Manager Name does not require a friendly personal name. This design uses `P-89909`.

For the main correction, the approved mapping selects TeamLedger's `managerRef`. **Identity processing** evaluates mapped identity data and configured requirements, including manager correlation. The relevant supported evaluation and its resulting manager relationship must be checked.

A mapping **Preview** evaluates a selected identity's mappings; it does not demonstrate that the current manager relationship is already correct.

If multiple manager mappings can apply, inspect **profile priority**, the configured ordering in which a lower number means higher priority. Documented manager selection uses the first mapped source with a non-null manager value, not the first source whose value successfully matches.

Do not assume a bad non-null higher-priority reference will be ignored in favor of a lower-priority source.

Also distinguish a missing manager from an incorrect retained manager. When an evaluated manager reference changes to unmatched non-null text, documented behavior retains an existing manager. When the selected reference changes to null, the relationship changes to null, subject to the actual source-selection conditions.

Those changed-input variations do not describe our main missing-mapping case. They are reasons to inspect the actual relationship rather than trusting either a populated or empty display.

A **custom identity attribute** is an organization-defined identity field. If one is selected for matching, verify its correlation-searchable eligibility, populated values and documented processing preparation. Search query visibility is not proof of that eligibility. A custom manager rule, if configured, needs its own logic inspected; none applies here.

## Review effects before making the correction

An **entitlement** represents a permission or membership. Correcting an account owner can change whose represented account and access ISC shows.

It does not automatically approve those permissions.

**Provisioning** attempts supported account or access changes in an external system. **Attribute synchronization** is a configured identity-to-account write path for existing correlated accounts.

Moving an account to an identity with different values can trigger configured synchronization. Review relevant identity mappings and dependent operations before moving `wd-601`.

A corrected link does not demonstrate that a resulting target write succeeded, and restoring an earlier criterion does not automatically reverse a completed write.

An **access request** asks for an access item for an identity. Its actual review task is another record to inspect after a manager correction; do not assume every existing approval moved automatically.

A **certification** reviews whether existing access should be retained or removed. A **campaign** groups those reviews.

Standard Manager Campaigns exclude identities without managers and are generated as snapshots. A manager added later does not retroactively establish inclusion in an existing campaign.

For the main successful correction below, no attribute-sync write, access request or campaign execution is supplied. The outcomes are account associations and the manager relationship only.

If an external directory manager must also change, treat that as separately configured delivery. The built-in Manager attribute cannot be used directly for attribute synchronization. The documented approach uses a mapped custom identity field with eligible sync configuration and the manager value required by the target; the relationship alone does not establish that delivery path.

Do not reset the source or delete accounts or identities to clear these complaints. Removing an ISC account record is also different from deleting an external account, and neither is merely a synonym for selecting a new relationship.

## Verify three results, not one completed job

Here are the supplied results after the approved, supported corrections and relevant evaluation:

```text
Wrong account relationship:
  wd-601 -> I-79010 before correction
  wd-601 -> I-79009 after correction
    -> old and new contexts checked

Missing account input:
  wd-602 personRef null -> P-79009
  collected and evaluated
    -> wd-602 linked to I-79009

Missing manager mapping:
  Manager Name selects managerRef
  relevant processing completed
    -> I-79009 manager is I-89909

Same account keys and logins
No external write result supplied
```

This is a before-and-after evidence summary, not a promise that one aggregation performs every correction. Human approvals, relationship correction, feed repair and manager configuration are different work.

The workspace account remains `wd-601` with login `drao.wd`. The review account remains `wd-602` with login `drao.review`. Devi remains `I-79009`.

The fields and relationships that needed correction have changed; unrelated object identities have not been replaced.

Use different evidence for each acceptance condition:

| Acceptance condition | Evidence that establishes it |
|---|---|
| The wrong link is corrected | Exact source/account now points to the approved identity and is no longer associated with the wrong one; supported change and dependent effects are reviewed. |
| The unmatched account is resolved | Approved reference is on the actual collected account, relevant evaluation occurred and the intended resulting association is observed. |
| The manager relationship is correct | Selected mapping/source/input and manager's own applied field support the approved reporting line; actual manager relationship is verified. |
| A data defect is closed | The approved upstream correction is delivered through the integration and confirmed in represented data; a manual link alone is insufficient. |
| A dependent task or write is complete | Its actual reviewer, campaign population or target state is verified independently of relationship success. |
| The cause is understood | Current facts, retained history and remaining uncertainty are separated; no unsupported historical trace is claimed. |

Use aggregation history for the relevant run's timing, status, scope clues and optimization. Manual Correlation history concerns file imports, not every possible account-level correction.

Use current account and identity records for current values and relationships. Available events can help establish changes, but they do not guarantee a complete candidate-by-candidate explanation of a past match.

Keep observation times together. A Search result and a newer account detail view can describe different observations without proving another relationship change.

If evidence is missing, say what is missing and leave that acceptance condition open. Do not turn an incomplete investigation into a confident diagnosis by repeating the same read.

## Work through the changed evidence

### 1. The account is absent from Devi's page

**Facts:** Global account evidence finds `wd-601` under `I-79010`; approved ownership identifies Devi.

Is this primarily an account that was never collected?

**Reasoning:** No. The represented account exists. Investigate its incorrect association and origin, then choose the approved correction. Absence from one identity's page is not absence from ISC.

### 2. A correct value is in the wrong selected field

**Facts:** A variation has `personRef = P-79009`, but its saved criterion selects account key `wd-602` against Identification Number.

Should you replace the person's reference with the account key?

**Reasoning:** No. Verify the criterion's selected fields and their meaning. Correct a proven configuration error rather than damaging valid person data to satisfy an unsuitable comparison.

### 3. The instruction changed but the record was skipped

**Facts:** A correct replacement criterion is saved. The account is unchanged and skipped during an optimized aggregation. No later evaluation evidence is supplied.

Does the new configuration prove the old relationship was reconsidered?

**Reasoning:** No. Establish relevant supported evaluation and the actual result. A save and a read are not that evidence, and persistent manual treatment still needs separate review.

### 4. The wrong link survives a broad reread

**Facts:** `wd-601` has correct input but an incorrect manual link. An unoptimized aggregation runs.

Must it now belong to Devi?

**Reasoning:** No. Unoptimized aggregation does not remove manual correlation. Use the supported approved relationship correction and verify old/new identity contexts and dependent effects.

### 5. The HR field and manager identity both exist

**Facts:** TeamLedger contains `P-89909`, and manager `I-89909` exists. Employees has no Manager Name mapping.

Do those two facts alone complete manager setup?

**Reasoning:** No. Both profile mapping and source manager configuration are required. Add only the approved missing configuration, evaluate the relevant identity and inspect the relationship.

### 6. A manager is still displayed after a bad reference

**Facts:** In a separate variation, an employee has an existing manager. Its selected, evaluated reference changes to unmatched non-null `P-99999`; no competing source or custom rule applies.

Does the displayed old manager prove the new reference matched?

**Reasoning:** No. Documented behavior retains the existing manager when the new non-null reference cannot correlate. Investigate the input and approved reporting line; presence is not correctness.

### 7. The count improved after assigning everything

**Facts:** A team manually assigns all unmatched accounts to the source administrator without verified owner evidence. The uncorrelated count falls.

Has the project demonstrated correct ownership?

**Reasoning:** No. The associations may conceal wrong owners. Verify individual business ownership and supported classification; administrative responsibility is not proof of personal account ownership.

### 8. The relationships are right but delivery failed

**Facts:** A separate approved account move establishes the right association. A configured synchronization write fails, leaving the previous value externally.

Must the relationship task and delivery task have the same outcome?

**Reasoning:** No. Retain the verified association result while keeping delivery unresolved. Investigate the actual write failure and verify any approved recovery against the target; repeating correlation is not automatic delivery repair.

## Turn a mixed exception queue into separate investigations

A project has 90 investigation records: 20 absent source accounts, 20 collected accounts without usable selected references, 15 accounts with wrong persistent links, 10 whose legitimate intended identities are not established, 10 missing or incorrect manager relationships, 10 ambiguous or contradictory identity candidates and 5 non-person accounts needing classification review.

The project manager asks whether one new matching rule and another aggregation can close the queue.

How would you explain the work?

The 20 absent records need collection-scope and execution evidence. The next 20 need approved input delivery. The 15 wrong persistent links need supported relationship correction and consequence review, not a promise that a broad reread releases them.

The 10 missing-identity cases need approved identity-establishment investigation. The 10 manager cases need manager-specific mapping, source selection, candidate and processing evidence.

The 10 ambiguous cases need person-reference and ownership clarification without guessing a winner. The 5 non-person accounts need a supported responsibility and classification design rather than arbitrary personal assignment.

Preserve the exact account and identity references, proposed correction, scope and acceptance evidence for each record. Review shared causes when many records have the same defect.

Then report which outcomes are confirmed and which still need evidence. You are not trying to make every symptom disappear through one operation; you are demonstrating the intended result for each relationship.
