# HR names a manager. How does ISC know which identity that means?

Devi, employee `78008`, already has an employee identity in SailPoint Identity Security Cloud (ISC). Her HR record contains a reference to her manager.

That reference is text. ISC needs to connect it to the correct manager identity before a process can use the relationship.

Those are different things: information saying who the manager should be, and an established relationship to that person.

A manager's name displayed somewhere in a record does not prove the relationship is correct. Nor does a corrected relationship prove that an earlier approval or certification has been reassigned.

Let's follow the reference before looking at the processes that depend on it.

## Start with the employee's record and the manager's identity

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system. An **attribute** is a named piece of information on a record.

A **source** is ISC's configured representation of a system or account-data collection.

In this fictional design, **RosterHR Production** is authoritative for Employees. Its worker accounts establish employee identities through the Employees **identity profile**, the shared configuration governing those identities and their attribute mappings.

Devi's RosterHR account `rh-78008` is already associated with her identity. We'll call that identity `I-78008`, a teaching label rather than an actual ISC object ID.

**Account correlation** establishes which identity an account belongs to. **Manager correlation** establishes which other identity is the employee's manager.

It does not move Devi's HR account under her manager's identity.

An **identity attribute mapping** supplies an identity field from selected information or a calculation. In our design, each person's own approved person reference supplies their Identification Number, `identificationNumber`.

A **candidate identity** is an identity considered as a possible match. Here we are considering candidates for Devi's manager, not candidates for ownership of her HR account.

Here is the supplied starting evidence:

| Record or configuration | What is established |
|---|---|
| Devi's HR account `rh-78008` | Own person reference `P-78008`; `managerRef = P-89008`. The approved worker registry confirms this manager. |
| Devi's identity `I-78008` | Already established from HR, with applied `identificationNumber = P-78008`. |
| Intended manager identity `I-89008` | Already established from HR account `rh-89008`, with applied `identificationNumber = P-89008`. |
| Another manager identity `I-89009` | Already established from HR account `rh-89009`, with applied `identificationNumber = P-89009`; used in a later approved-change variation. |
| Profile Manager Name mapping | Employees maps Manager Name from RosterHR Production's `managerRef` account field. No competing manager-mapping source applies in the main example. |
| Source manager-correlation configuration | Account attribute `managerRef` is compared with `identificationNumber` on potential manager identities. The selected identity field is eligible and populated. |
| Candidate and execution conditions | The manager references identify distinct people; no duplicate candidate or custom rule applies. Relevant collection and processing occur before the supplied relationship result is observed. |

The comparison is:

Devi's account `managerRef = P-89008` against a candidate manager identity's own `identificationNumber`.

It is not Devi's own person reference `P-78008`. It is not the candidate manager's reference to their manager, which would take us another step up the reporting chain.

Searching the selected field across identities finds `I-89008` in our supplied example. ISC establishes the manager relationship from Devi's identity to that identity.

## Two configurations cooperate to establish the relationship

The documented setup requires **Manager Name** to be mapped in each identity profile and a **Manager Correlation** configuration on the source containing the matching account data.

The mapping identifies the source information that supplies the employee's manager reference. The source configuration identifies which account field to compare with which field on manager identities.

The label Manager Name does not mean that the value must be a person's friendly display name. Our value is the approved person reference `P-89008`.

A human-readable name can be duplicated or changed. Choose a reference with the intended meaning and suitable uniqueness, and confirm that it exists on the manager's identity in the selected representation.

Mapping a manager reference without configuring how it resolves to a manager identity leaves part of the design missing.

Configuring the comparison while the profile has no suitable Manager Name mapping also leaves part missing.

The source's manager-correlation section appears within the account-correlation configuration area. Sharing a configuration page does not make the two relationships identical.

If you change account-owner correlation to compare an employee's manager reference with identity Identification Number, you risk assigning the employee's account to the manager. That is not how you establish a reporting relationship.

```text
Existing account ownership:
  rh-78008 -> Devi I-78008
    -> this relationship stays separate

Manager reference on employee account:
  rh-78008 managerRef = P-89008
    -> Manager Name mapping source
    -> manager comparison configuration

Candidate manager's own identity field:
  I-89008 identificationNumber = P-89008
    -> matching manager identity

Supplied manager relationship:
  Devi I-78008 -> manager I-89008
```

The arrows separate data selection, matching and the resulting identity relationship. They are a conceptual trace, not a private backend architecture or a promise about every operation's timing.

Both identities already exist. A manager reference does not create the missing manager identity or approve access for either person.

## Check which source actually supplies the manager

Do not assume that looking only at the employee's governing profile explains every manager result.

The documented manager-selection behavior considers identity profiles in priority order. **Profile priority** is their configured ordering; a lower priority number means higher priority.

**Null** means no value is present. For each profile's Manager Name mapping, ISC checks the corresponding source. The first source with a non-null manager attribute value supplies manager correlation.

Choosing the first non-null source is not the same as trying sources until one produces a successful manager match.

Consider a separate situation where both mapped account inputs are available for the employee:

Employees has priority `10` and maps RosterHR's manager reference. Contractors has priority `20` and maps **PartnerHR Production**'s manager reference.

RosterHR supplies `P-99999`, which is non-null but matches no manager identity. PartnerHR supplies the approved `P-89009`.

The higher-priority non-null RosterHR input is selected. You cannot assume ISC ignores it and tries PartnerHR merely because PartnerHR's value would match.

If the RosterHR input is instead null and PartnerHR supplies `P-89009`, the lower-priority non-null source can supply the manager lookup.

Our main example has no competing non-null mapped source, so `P-89008` from RosterHR supplies it.

This selection behavior is why “HR is correct” needs an exact source, profile mapping, input value and observation time behind it. Changing identity-establishment authority or shared profile priority to force one manager result can affect more than that one employee.

## The value must reach ISC and receive evaluation

**Account aggregation** reads account information into ISC. **Identity processing** evaluates identity data and configured requirements, including manager correlation.

Manager relationships are recalculated when source aggregation or identity processing evaluates the relevant changes.

A correct manager reference on an HR screen is not proof the integration published it, ISC collected it, or the relationship was reevaluated against current candidate identities.

A mapping **Preview** evaluates selected identity mappings. It can help inspect the input without proving the actual current manager relationship has changed.

In **optimized aggregation**, an unchanged account record is skipped and account correlation and manager correlation are not evaluated for that record.

**Unoptimized aggregation** recalculates those correlation processes even for unchanged account data. It does not repair missing candidates, unsuitable references or wrong source selection.

After a configuration or identity-data change, choose the supported processing scope for that cause and inspect the actual relationship. A saved mapping, a completed job and a manager displayed on the identity answer different questions.

If a **custom identity attribute**, an organization-defined identity field, is selected for manager matching, it must be marked searchable for that correlation purpose. Being queryable in the separate Search interface is not equivalent. Verify its preparation and populated values rather than assuming the field's existence makes it ready.

The main example uses an already eligible and applied Identification Number.

## A changed reference can clear, replace or preserve a relationship

Begin each variation below with Devi currently linked to manager `I-89008`.

Assume the stated input is actually selected, collected and evaluated; no other mapped source replaces it and no custom rule changes the behavior.

| Changed evidence | What follows for the manager relationship |
|---|---|
| Approved new reference `P-89009`, with the intended manager identity already available and uniquely matching | The relationship can resolve to `I-89009`; verify that actual result rather than inferring it from the new field alone. |
| Selected reference changes to null | The documented manager relationship changes to null. This is different from a non-null value failing to match. |
| Selected reference changes to non-null `P-99999`, which cannot correlate to a new manager | The documented behavior retains the existing manager relationship. A displayed old manager does not prove the new input matched. |
| New intended manager's identity is not available with the selected value | The lookup lacks its intended candidate. Verify identity establishment and mapped values; typing a reference does not create that identity. |
| A reference matches multiple possible manager identities | The data does not uniquely identify the intended person. Resolve approved reporting-line and representation evidence and inspect supported results; do not invent a first-candidate winner. |

The null behavior is scoped to the selected input and source conditions. If another mapped source supplies a non-null value, source selection must be traced before applying the null variation.

The non-null no-match behavior is especially easy to miss. A manager may remain visible precisely because the new reference could not resolve.

An employee with no earlier manager does not acquire a correct manager merely because the new reference is non-null. Establish the actual candidate and relationship rather than extending the retained-manager example beyond its conditions.

Also inspect references that point back to the employee or create a reporting cycle. Those are business-data and hierarchy concerns to investigate. Do not assume ISC's standard field comparison automatically repairs them.

## A manager relationship and an approval are different records

An **access request** asks for an access item for an identity. An **approval** records a review decision required by the configured request process.

An **entitlement** represents a permission or membership. An **access profile** groups related entitlements from one source; a **role** groups access profiles for a business access need. Their request configuration determines how review is handled.

When a standard role or access-profile request uses Manager as a reviewer, it means the manager of the identity receiving access.

The person submitting the request can be someone else.

Suppose a colleague submits a new request for Devi. If Manager review is configured, the relevant relationship is Devi's manager, not automatically the colleague's manager.

That still does not mean every request requires manager approval. The requested item's process and applicable approval configuration determine its reviewers.

If a reviewer cannot be resolved in the standard role/access-profile process, documented missing-reviewer handling can select another valid reviewer through its escalation, fallback or ownership paths. That is request-review behavior, not manager correlation inventing a manager relationship.

A request reaching another reviewer therefore does not prove Devi has a valid manager. Missing manager data does not mean the request is automatically approved.

After correcting a manager, inspect any existing approval's actual reviewer and state. Do not assume every already-created task is automatically reassigned from the current identity value.

## A certification uses its own point-in-time evidence

A **certification** is a review of whether existing access should be retained or removed. A **campaign** groups those reviews and their reviewers.

For a standard Manager Campaign, identities without a defined manager are excluded. The Identities Without Managers report helps locate them before campaign generation.

Campaigns are generated as a snapshot in time. Adding a manager after generation does not make that newly added manager appear in the existing campaign.

This is different from a current identity lookup.

If Devi lacked a manager when a Manager Campaign was generated, fixing her relationship afterward does not prove that campaign now includes her for that manager's review.

Review the campaign's actual population and assignments and use the approved certification-management process. Do not claim every certification type has the same missing-manager behavior.

A wrong retained manager can be harder to detect than a null relationship. The identity may not be in the no-manager report, while the business reporting line is still wrong.

Check manager correctness as well as manager presence.

## Updating a directory's manager is another operation

An ISC manager relationship is not an external directory's manager field.

**Provisioning** attempts supported account or access changes in an external system. **Attribute synchronization** is a configured identity-to-account write path for existing correlated accounts.

The built-in Manager identity attribute can be used in a Create Account definition, which describes values used when creating an account. It cannot be used directly for attribute synchronization.

For manager synchronization, the documented approach uses a custom identity attribute, such as `managerToSync`, with an appropriate mapping and source configuration.

The correct representation depends on the target. A directory can require a manager account reference rather than a friendly name or HR number. Confirm the connector-specific contract, selected manager account and supported operation before expecting a write.

An attribute named managerToSync is not itself a working integration. It still needs a correct calculated or mapped value and eligible provisioning/sync configuration.

A correct ISC manager can coexist with an unchanged or incorrect directory manager because delivery has not been configured or has failed.

Conversely, a correct directory field does not prove ISC resolved its own manager relationship correctly.

The main RosterHR example supplies no external manager write, access request or campaign execution. Its successful result is Devi's verified relationship to `I-89008`.

```text
Verified ISC manager relationship
    -> check each dependent process

Request review:
  configured reviewer and actual task
    -> not proof of access delivery

Manager Campaign:
  generation snapshot and assignments
    -> not a live identity lookup

External manager update:
  separate mapping and supported write
    -> verify actual target value
```

This map separates consumers of manager information. It does not promise that all three run after every manager change or in the order shown.

A corrected relationship does not automatically undo an earlier review decision, move every existing task or reverse an external write.

## Investigate the exact relationship, not just a name

Keep the employee identity, selected manager source account and actual manager reference together.

Then inspect the Manager Name mappings and profile priorities, the selected source's manager configuration, and the candidate manager's applied identity field.

Check that the candidate is the intended person, not merely a person with the same displayed name. A manager can have their identity established through a different profile; the configured lookup searches identities, not only a same-name HR account.

Use account details for collected values, identity details for applied identity information, available activity for processing, and the actual resulting manager relationship. Observation times matter when comparing them.

Aggregation history can show timing, status, scanned records and optimization. It is not automatically a complete per-identity transcript of every candidate checked.

Where the reference cannot be resolved, investigate whether the manager identity exists, its field is populated, the source was selected as expected and the relevant evaluation actually occurred.

A programmatic **manager correlation rule** can implement requirements more complex than a single field match. It is a separate extension, not an assumption hidden inside the standard example. Inspect its actual supported logic if one applies.

Do not delete identities, rewrite correct person references or change unrelated account-owner correlation merely to make a manager field look populated.

## Work through the changed evidence

### 1. The wrong person reference is compared

**Facts:** Devi's own reference is `P-78008`; her account's manager reference is `P-89008`. The intended manager identity's own Identification Number is `P-89008`.

Which values should the manager comparison connect?

**Reasoning:** The employee account's `managerRef = P-89008` and the candidate manager's own `identificationNumber = P-89008`. Comparing Devi's own reference answers the wrong question; comparing the manager's manager reference goes another level up.

### 2. Only the profile mapping exists

**Facts:** Manager Name maps to the correct HR field. No manager-correlation configuration exists on the selected source.

Is the design complete?

**Reasoning:** No. The profile mapping and source manager comparison are both required. Verify the selected account field and the field on candidate manager identities, then evaluate and inspect the relationship.

### 3. HR names a manager who has no identity yet

**Facts:** The approved manager reference is present, but its intended person has no established ISC identity with that selected value.

Does the reference itself create the manager identity?

**Reasoning:** No. Reconcile the approved identity-establishment population and mapped values first. Manager correlation needs a candidate identity; it does not create that person from the reference.

### 4. Null and no match are treated alike

**Facts:** Devi currently has manager `I-89008`. In separate evaluated variations, the only selected source supplies null, or supplies unmatched non-null `P-99999`.

Do both variations necessarily clear the old manager?

**Reasoning:** No. Under the supplied single-source conditions, null clears the relationship. The documented non-null no-match behavior retains the existing manager. Inspect both input and actual relationship before declaring the change correct.

### 5. The lower-priority value would match

**Facts:** Available profile mappings have priorities 10 and 20. The priority-10 source supplies non-null `P-99999`; priority 20 supplies valid `P-89009`.

Must ISC use priority 20 because its value matches?

**Reasoning:** No. Documented selection uses the first non-null source, not the first successful match. Trace the selected input and any retained existing relationship; do not assume a failed lookup causes source fallback.

### 6. A colleague submits Devi's request

**Facts:** A new role request is for Devi, submitted by a colleague. The configured reviewer is Manager and Devi has the verified manager relationship.

Whose manager does this reviewer option refer to?

**Reasoning:** The manager of Devi, the access recipient. The submitter's manager is not substituted merely because the colleague submitted it. Verify the actual approval configuration and task; routing is not provisioning success.

### 7. The campaign was generated yesterday

**Facts:** A standard Manager Campaign was generated while Devi had no manager. Her correct manager was added today.

Has today's change demonstrated her inclusion in yesterday's campaign?

**Reasoning:** No. Manager Campaigns exclude identities without a manager, and the generated campaign is a snapshot. Inspect the actual campaign and use approved remediation rather than assuming retroactive inclusion.

### 8. The built-in Manager field is selected for sync

**Facts:** ISC resolves the correct manager. The team expects the built-in Manager identity attribute to be used directly for attribute synchronization to a directory.

Is the relationship alone enough to make that design work?

**Reasoning:** No. The built-in Manager attribute is not eligible for direct attribute sync. Use the documented custom-attribute approach with the target's required representation and supported configuration, then verify actual delivery.

## Review a reporting-line change before calling it complete

A reorganization affects 120 employees. Review finds 70 with suitable current references and manager identities, 20 with wrong non-null references despite their intended managers already existing, 10 with missing manager input, 10 whose legitimate manager identities are not yet established, 5 with competing profile/source inputs and 5 with duplicate or invalid hierarchy references.

The team wants to start a Manager Campaign as soon as an aggregation succeeds.

What would you check first?

Separate the causes. The 70 prepared cases still need relevant processing and verified resulting relationships. The 20 wrong references need approved input repair; an old visible manager can survive a failed new lookup.

For the 10 missing inputs, check actual source selection and whether null or another mapped source applies. For the 10 absent manager identities, reconcile legitimate identity establishment rather than copying names into the employee record.

The 5 competing-source cases need profile/mapping/priority evidence. The 5 duplicate or hierarchy cases need approved person and reporting-line clarification, not arbitrary candidate selection.

Before campaign generation, verify manager presence and correctness against the approved reporting structure. Review existing requests and campaigns as their own records. Check external manager delivery separately if it is in scope.

A successful read is one piece of evidence. Completion means the intended relationship and each required dependent outcome are demonstrated.
