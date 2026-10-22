# The account has no clear owner in ISC. What is actually missing?

Devi, employee `75005`, already has an employee identity in SailPoint Identity Security Cloud (ISC). A document-review application account intended for her has also been collected.

The account is not associated with her identity. Its person-reference field has no value.

Someone suggests using its email address instead. That sounds convenient until you inspect the identities: the address is a shared team contact appearing on two people.

We have different problems here. The configured comparison lacks its intended input. The proposed replacement doesn't identify one person.

Let's keep those problems separate so the correction solves the cause rather than just reducing a count.

## Establish the account and the person before changing anything

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system. An **attribute** is a named piece of information on one of those objects.

**Account correlation** matches and associates source accounts with identities. A **correlation criterion** pairs an account attribute with an identity attribute for comparison.

A **candidate identity** is an identity being considered as the possible account owner.

An **uncorrelated account** is a collected account not associated with an authoritative identity. That describes an ISC relationship, not whether the external account has a legitimate business owner.

A **source** is ISC's configured representation of a system or account-data collection.

In this fictional design, **BridgeHR Production** is authoritative for Employees: its worker accounts establish employee identities through the Employees **identity profile**. The profile is shared configuration governing those identities and how their attributes receive values.

BridgeHR account `bhr-75005` is already associated with Devi's identity. We'll call that identity `I-75005`, a teaching label rather than an actual ISC object ID.

**ReviewDesk Production** represents the document-review application. It does not establish employee identities in this design. Its existing account `rd-608` should belong to Devi.

**Null** means no value is present. Here it describes `ownerRef`, not the existence of the account.

Here is the supplied current evidence:

| Record or configuration | What is known |
|---|---|
| Devi's identity `I-75005` | Identification Number, `identificationNumber`, is text `P-75005`; identity `name` is `worker75005`; Work Email, `email`, contains the shared contact `review.team@learn.example`. |
| Other identity `I-75006` | Identification Number is text `P-75006`; identity name is `worker75006`; email contains the same shared contact. |
| ReviewDesk account `rd-608` | Account key `rd-608`; `userLogin = drao.rd`; `ownerRef = null`; `contactMail = review.team@learn.example`. |
| Saved correlation criterion | The complete configured list has one criterion: account `ownerRef` Equals identity `identificationNumber`. The identity attribute is already eligible and applied. Contact email is not a configured criterion. |
| Other matching evidence | No other configured match is supplied. No identity's name is `drao.rd`. No existing manual association applies. The account has been evaluated and is recorded as uncorrelated. |
| Approved owner evidence | Application records and the worker registry establish that `rd-608` belongs to Devi, whose approved person reference is `P-75005`. That reference uniquely identifies her among the candidate identities. |

An **identity attribute mapping** supplies an identity value from selected data or a calculation. Employees has already populated Devi's Identification Number from BridgeHR's approved person reference.

The account's **account schema** defines the represented account fields. Its Account ID designation uses the account key; its Account Name designation uses `userLogin`.

That distinction matters to the documented **default correlation** path. When configured correlation cannot establish an association, the default compares the account's designated Account Name with identity `name`, case-insensitively. The default is not configurable.

In this example, `drao.rd` supplies no default match. The current uncorrelated result is supplied alongside those configured/default conditions; it is not an assumption based only on one empty field.

## A blank-looking value can mean different things

If someone says “ownerRef is blank,” ask which observation supports that description.

Was the field absent from an application response? Present with null? Present as empty text? Hidden by the current view? Or replaced with a placeholder?

**JSON** represents named fields and their values. These compact fragments illustrate different data representations, not complete source records or API requests:

```json
{
  "fieldAbsent": {},
  "fieldNull": {
    "ownerRef": null
  },
  "fieldEmpty": {
    "ownerRef": ""
  },
  "fieldSpaces": {
    "ownerRef": "   "
  },
  "fieldPlaceholder": {
    "ownerRef": "UNKNOWN"
  }
}
```

The first object has no `ownerRef` member. Null explicitly represents no value. Empty text contains no characters. Spaces are characters even when the field looks blank. `UNKNOWN` is ordinary text, not a person reference.

The JSON string `"null"` would also be text, not the JSON null value.

These are not interchangeable evidence.

Nor does the illustration claim that every connector stores, clears or compares them identically. An omitted response field does not, by itself, prove ISC cleared a previously collected value. Inspect the actual source behavior and current ISC account record.

**Account aggregation** reads account information into ISC. If the application supplies a correct field but the represented account lacks it, follow the delivery and representation path before editing the person's identity.

Check whether the field was included in the read, whether the integration extracted the expected member, and whether the account schema represents the intended field and type. An observation from an application screen is not automatically the same data returned to the connector.

A **transform** calculates a value from inputs. If a calculation supplies a matching value, inspect its output and errors too. A failed calculation is not the same as a successful calculation returning null.

For the supplied main case, the recorded account value is null. It does not supply `P-75005`. Copying `UNKNOWN` into every missing reference would make those fields non-null without identifying their owners.

## Locate which side lacks the information

A criterion has an account side and an identity side.

If ReviewDesk has `ownerRef = P-75005` but the candidate identity's Identification Number is empty, the investigation is different from our main case.

Trace the identity's governing profile, selected mapping input and applied value. **Identity processing** evaluates identity data and configured requirements, including those mappings.

**Preview** evaluates a profile mapping for a selected identity. It can show that a proposed calculation would produce `P-75005`; it does not prove the current identity already holds it or that source correlation used it.

Likewise, a new **custom identity attribute**, an additional organization-defined identity field, is not ready for correlation merely because its definition exists. It must be configured as searchable for correlation, populated appropriately, and receive the documented manual processing for all identities before source aggregation.

The separate Search interface's ability to query a field is not proof of that correlation eligibility.

In the main evidence, the identity-side value is already applied and eligible. The missing input is on ReviewDesk's account side. Changing a correct identity mapping would repair the wrong layer.

## A value can be present and still find no intended identity

Consider a different collected account with `ownerRef = P-99999`. The value is present, but no candidate identity has that reference.

That is a no-candidate situation, not a missing account-side value.

“No match found” needs the actual selected field, value and candidate evidence behind it.

The reference could be wrong. The intended person might not have entered the approved authoritative population yet. Their identity might exist with a stale or incorrectly mapped value. Or the supplied reference might identify an employment contract rather than the person.

Those explanations require different corrections.

Check the approved business reference and worker intake before creating another identity or changing the application source to authoritative. Making an application authoritative changes its identity-establishment responsibility; it does not prove the account belongs to an existing person.

An account absent from ISC is another situation again. Investigate collection scope and execution before diagnosing its correlation.

“Missing account,” “missing reference,” and “missing intended identity” are not three names for the same defect.

## More than one candidate is not a better match

The team proposes adding ReviewDesk `contactMail` compared with identity `email`.

Both supplied identities contain `review.team@learn.example`. That shared contact does not distinguish Devi from the other person.

**Ambiguous matching data** means the available comparison evidence does not identify one intended candidate. It is a data and ownership problem to investigate, not an invitation to pick the first name displayed.

The proposed email pairing is not currently configured. Its ambiguity therefore does not explain why the current single person-reference criterion lacks an input.

That separation matters. Fix the proven current defect while reviewing whether the proposed change would introduce another.

Do not promise that ISC will always select the first candidate, select the newest identity, leave every duplicate uncorrelated, or continue to another criterion in exactly the same way for every ambiguous case. Establish the actual supported behavior and operation result for the configuration being investigated.

An ambiguous dataset is not itself a universal ISC status label or error code.

A recorded association also does not prove that the ambiguity was resolved correctly. Verify which identity was linked and whether approved ownership evidence supports it.

There is a different case where two fields on the same account point to different people. That is contradictory input, even if each field individually finds only one candidate.

Standard configured criteria are ordered alternatives; one criterion can establish an association. Adding another row does not automatically require every row to agree as an AND condition.

A weaker fallback can conceal a missing preferred reference while establishing a wrong person's relationship. Review each alternative's meaning, uniqueness and actual candidates rather than counting fields.

A **multi-valued attribute** holds a collection of values. One account field containing `["P-75005", "P-75006"]` is a different observation from two identities sharing one value. Check schema cardinality and supported comparison behavior; don't assume selecting the first list member or converting the list to text establishes its owner.

```text
Human investigation of an account:

Not collected?
  -> investigate the source read

Collected, reference unusable?
  -> trace missing input and origin

Usable reference, no candidate?
  -> verify value and intended identity

More than one possible person?
  -> resolve ownership and data evidence

Already linked to the wrong person?
  -> inspect link history and correction

After any approved correction:
  -> verify the actual relationship
```

The branches separate investigation responsibilities. They are not ISC's private matching algorithm, a prescribed execution order, or a guarantee about duplicate-candidate outcomes.

## A wrong link can be more serious than no link

Suppose `rd-608` is attached to `I-75006`, while approved application records establish Devi as its owner.

The account is correlated, but incorrectly.

It may no longer appear in an uncorrelated report. The smaller report is not proof of improved ownership quality.

A stale reference, reused email or incorrect manual assignment can contribute to a wrong relationship. Establish which cause is supported by the record and association history rather than assuming the current criterion created the link.

**Manual correlation** establishes a persistent explicit account-to-identity association. Later source-data changes and unoptimized aggregation do not automatically clear it. Accounts created through ISC can also have manual-correlation treatment.

Correcting the account's current `ownerRef` therefore does not establish that every existing wrong link has moved. Verify the relationship itself and use the approved supported correction process where necessary.

Do not change a correct person reference to imitate a wrong linked identity. Do not copy a guessed identity value into the account and then use that copied value as independent proof of ownership.

Keep the legitimate business reference separate from the correction you intend to perform.

## Correct the main case at the source of the defect

For the main uncorrelated account, the application owner verifies `rd-608` against the worker registry. The approved owner is Devi, with person reference `P-75005`.

The integration was supposed to deliver that reference in ReviewDesk `ownerRef`, but it did not.

The approved correction supplies `P-75005` in the application's data feed. It does not replace the shared contact email, rename the login or change the valid employee identity.

Once the corrected value is published, it must reach ISC and receive supported correlation evaluation.

Here are the supplied before-and-after facts:

```text
Before:
  ReviewDesk rd-608 ownerRef = null
  no configured or default match
    -> supplied result: uncorrelated

Approved owner and feed correction:
  same rd-608 ownerRef = P-75005
  collected and evaluated
    -> matches identificationNumber
    -> same identity I-75005

Human verification:
  correct source and account key?
  approved person reference and owner?
  resulting link and affected consumers?
```

The successful result assumes the corrected account is collected and evaluated, the identity-side value is current and eligible, the candidate is unique, and no persistent manual override applies.

It is not a promise that publishing an external value instantly updates every ISC view.

The account remains `rd-608`, the login remains `drao.rd`, and the identity remains `I-75005`. The missing input and the relationship changed.

The shared contact can still be unsuitable for identifying people. We have not made it unique by correcting a different field, and it is not added as a matching alternative.

## Different symptoms need different completion evidence

A **machine account** is a non-human account related to an application or service. Shared automation accounts need an appropriate classification and responsible-ownership design, not a guessed personal user. Use the features supported for the tenant and account type.

| Investigation finding | What would demonstrate the relevant correction |
|---|---|
| Field absent or unusable | Approved source input reaches the actual collected account with the intended meaning and representation; an empty-field count alone is insufficient. |
| Identity-side value unavailable | Correct profile mapping is applied to the intended existing identity, and correlation eligibility/preparation is established. |
| No intended candidate | The approved reference and identity population are reconciled; the intended identity actually exists with suitable values. |
| Multiple possible identities | Owner evidence and data resolve the identification gap; the actual recorded relationship is checked instead of guessing a tie-breaker. |
| Account linked to the wrong person | The intended association is confirmed after supported correction, with previous and dependent effects investigated. |
| Record not reevaluated | The relevant account receives supported evaluation; the new saved configuration alone is not completion evidence. |
| Shared or machine account | Its account type, responsible-ownership design and approved treatment fit its use; assigning a source administrator as the personal user is not automatic resolution. |

**Optimization** skips unchanged account data for relevant processing. When correlation configuration changes, the documented unoptimized aggregation approach allows unchanged accounts to be reexamined.

Choose the operation and scope for the actual cause. Do not repeatedly run broad reads just because the uncorrelated count remains the same.

A source-level or global Uncorrelated Accounts report helps locate missing relationships. Current account details, identity values, saved configured/default behavior, association history and ownership records explain individual cases.

Keep the exact source, environment, account key, candidate identity, actual values and observation times together. A correct value in an old file doesn't prove the current account has it.

## Fixing the relationship is not the same as approving access

An **entitlement** is a represented permission or membership. An uncorrelated account can still exist in an external application with permissions. Missing an ISC identity relationship does not automatically disable it.

**Provisioning** attempts supported account or access changes in an external system.

**Attribute synchronization** is a configured identity-to-account write path for existing correlated accounts. A new or corrected relationship can affect which identity data applies to the account when such synchronization is configured.

Before moving a real account, review configured consumers and any changes already made under the old relationship. Correcting a link does not automatically undo previous writes or establish that old access is still authorized.

The main fictional correction includes no attribute-sync write or requested access change. Its supplied successful outcome is the intended account-to-identity relationship.

Do not remove accounts, reset a source or delete candidate identities just to clear an exception list. Duplicate-looking identities need investigation; shared names or emails are not authority to merge or delete them.

For a legitimate service or shared account, identify its supported classification and responsibility model. The absence of a personal employee match does not by itself prove the account should be removed.

## Work through the changed evidence

### 1. The response omitted the field

**Facts:** An application response has no `ownerRef` member. There is no current ISC account-value evidence or verified rule for how this connector handles omission.

Can you conclude ISC cleared the previously stored reference?

**Reasoning:** No. The response's shape is evidence, but clearing the represented value is another outcome. Inspect the current account and documented connector behavior before choosing a correction.

### 2. Every blank received UNKNOWN

**Facts:** A feed replaces 40 missing references with `UNKNOWN`. The approved references should identify individual people.

Has a non-null count demonstrated ownership repair?

**Reasoning:** No. The placeholder still supplies no approved person identity and introduces a shared value. Correct the missing-reference cause and verify each intended relationship instead of treating field presence as identification.

### 3. The identity side is still empty

**Facts:** Account `ownerRef` is correct. A revised identity mapping previews the intended reference, but the current identity field is empty.

Should you overwrite the account to match the empty identity?

**Reasoning:** No. Check the identity's actual mapping application, input and eligibility. Preview is not applied-state evidence; repair the proven layer rather than damaging correct source data.

### 4. A reference finds no identity

**Facts:** A collected account contains `P-99999`, but no candidate identity has it. There is no verified employment or intake evidence yet.

Must you create a new identity immediately?

**Reasoning:** No. Verify what the reference identifies, whether it is correct and whether the intended person belongs in the approved authoritative population. A wrong value and a missing legitimate identity require different repairs.

### 5. Shared email fits two people

**Facts:** ReviewDesk's proposed contact-email criterion would match the shared email on `I-75005` and `I-75006`.

Should you pick the first displayed identity or assert every such account stays uncorrelated?

**Reasoning:** Neither follows from these facts. Resolve the ownership evidence and obtain supported result evidence. The shared contact is not a dependable person reference, and the proposed pairing does not explain the current configuration.

### 6. The count falls after a wrong link

**Facts:** An account is now linked to a different identity from its approved owner and disappears from the uncorrelated report.

Has the project resolved it correctly?

**Reasoning:** No. An association exists, but ownership is wrong. Investigate its origin, use the approved supported correction, check the actual new relationship and review affected consumers.

### 7. Corrected data meets a persistent manual link

**Facts:** An account was manually linked to the wrong identity. Its source reference is corrected and an unoptimized aggregation runs.

Does the corrected field prove the association moved?

**Reasoning:** No. Manual correlation persists through those changes. Verify and correct the explicit relationship through the approved supported path; data correction and relationship correction are separate evidence.

### 8. The account has no personal employee match

**Facts:** The application owner identifies a shared automation account. The team proposes assigning it to the source administrator as though it were that person's login.

Is that the automatic solution to the missing person match?

**Reasoning:** No. Establish the account's supported classification and responsibility design. Administration of a source is not proof that all its accounts are that administrator's personal accounts.

## Organize a project exception queue

A project has 100 investigation records, combining uncorrelated accounts and disputed existing links. Review finds 40 unusable references, 25 references without a verified intended identity, 20 ambiguous candidate cases, 10 wrong existing links and 5 shared or machine accounts needing classification review.

The team proposes assigning every record to one administrator to close the queue.

How would you organize the work instead?

Group records by the proven cause and assign the missing evidence to the responsible source, business or ISC team. Confirm these categories against individual records rather than assuming a spreadsheet label proves the diagnosis.

The 40 missing-reference cases need usable approved input. The 25 no-candidate cases need reference and population reconciliation. The 20 ambiguous cases need ownership and data clarification. The 10 wrong links need relationship/history and dependent-effect review. The 5 non-person cases need appropriate classification and responsibility.

Then verify supported evaluation and the correct resulting relationship or approved non-person treatment. Keep unresolved records visible with the evidence still needed.

Closing a queue means the intended outcome is demonstrated for each case. Assigning everything to one person only hides the distinctions that made the investigation necessary.
