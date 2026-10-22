# The first comparison found no match. What happens next?

Devi is employee `74004`. Her employee identity already exists in SailPoint Identity Security Cloud (ISC), and a case-management account intended for her has been collected into ISC.

The account's employee reference doesn't match any candidate identity. Its email does match Devi's identity.

Should the account remain unassociated because the employee-reference comparison failed?

Not necessarily. Let's put the saved criteria beside the actual records and follow the result of each comparison. A failed comparison is not automatically a failed correlation process.

## Start with the account, the identities and the saved criteria

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system. An **attribute** is a named piece of information on either object.

**Account correlation** matches and associates source accounts with identities. A **correlation criterion** selects an account attribute and an identity attribute whose values will be compared.

A **candidate identity** is an identity being considered as the account's possible owner. Finding a matching value and confirming legitimate business ownership are related, but different, checks.

A **source** is ISC's configured representation of a system or account-data collection.

In this fictional design, **PeopleLedger Production** supplies worker records. It is an **authoritative source**: its worker accounts establish identities through the Employees **identity profile**, the shared configuration governing those identities and their attribute mappings.

PeopleLedger account `pl-74004` is already associated with Devi's identity. We use `I-74004` as its teaching label, not an actual ISC object ID.

An account is **uncorrelated** when it is not associated with an authoritative identity. For this human-account example, that means ISC hasn't established the account's relationship to an employee identity.

**CasePort Production** represents the case-management application. It does not establish employee identities in this design. Its account `cp-419` should be associated with Devi's existing identity.

The application owner confirms that this account belongs to Devi. That ownership evidence lets us check whether a resulting association is correct, rather than trusting a matching percentage.

Here is the supplied current evidence:

| Object or configuration | Values and conditions |
|---|---|
| Devi's identity `I-74004` | Identification Number, `identificationNumber`, is text `74004`; Work Email, `email`, is `devi.rao@learn.example`; identity `name` is `worker74004`. |
| Other identity `I-74005` | Identification Number is text `74005`; email is `other.worker@learn.example`; identity name is `worker74005`. |
| CasePort account `cp-419` | Account key `cp-419`; `loginName = drao.cp`; `employeeRef = OLD-74004`; `mail = DEVI.RAO@learn.example`; friendly display name `Devi Rao`. |
| Candidate evidence | No identity has Identification Number `OLD-74004`. Only Devi's identity has the matching email under the configured case-insensitive comparison. No identity has name `drao.cp`. |
| Evaluation conditions | The two listed criteria are the complete saved configured pairing list. Both identity attributes are eligible for correlation, current values are applied, the account is evaluated, and no existing manual association overrides the example. |

An **identity attribute mapping** supplies an identity value from selected source data or a calculation. **Identity processing** evaluates identity data and configured requirements, including those mappings.

The identity values above are already applied results, not only values shown in a proposed mapping preview.

The account's **account schema** defines its represented fields. Here it designates the account key as **Account ID** and `loginName` as **Account Name**.

Account ID recognizes the source account. Account Name is its selected naming field. Neither automatically means the person's employee number.

The saved configured criteria, in order, are:

1. Account `employeeRef` compared with identity `identificationNumber`.
2. Account `mail` compared with identity `email`.

Both use **Equals**, the fixed operation in the standard correlation form. Equals compares the selected values; it is not a contains expression or an instruction to interpret `OLD-74004` as `74004`.

Configured correlation is case-insensitive by default. The supplied configuration uses that setting.

## Trace the first criterion all the way to its conclusion

The first account-side value is `OLD-74004`.

Devi's selected identity value is `74004`. The other supplied identity's value is `74005`. The candidate evidence explicitly excludes another identity with `OLD-74004`.

This criterion therefore finds no matching identity under the supplied facts.

What has that established?

It has established that this configured comparison did not associate the account. It has not established that the account was missing, that aggregation failed, or that no other applicable comparison can work.

**Account aggregation** reads account information into ISC and can evaluate correlation as part of that work. Collection of `cp-419` succeeded in this example.

The old-looking reference needs investigation, but the name of a field or the presence of digits doesn't authorize the comparison to strip its prefix.

A **transform** calculates a value from inputs. A deliberate transformation or feed correction is separate from the Equals comparison. Don't invent a cleanup step to make the evidence fit the expected owner.

## Now follow the next configured comparison

ISC documents configured criteria as ordered comparisons: accounts are correlated one attribute pairing at a time, and meeting a criterion can establish the association.

These rows are alternatives, not a declaration that every row must match.

The second criterion compares CasePort `mail` with identity `email`.

Its input is `DEVI.RAO@learn.example`. Devi's identity email is `devi.rao@learn.example`. Under the supplied case-insensitive setting, the letter-case difference does not prevent the match.

Only the intended identity matches this criterion in the supplied candidate evidence. After the supported evaluation, the supplied result is that `cp-419` is associated with `I-74004`.

The first criterion found no match. The configured correlation still established a relationship through the second.

That association does not make `OLD-74004` the approved employee reference. Investigate its origin and any required correction rather than closing the data issue just because the account now has a link.

That is why saying “employee correlation failed” is too imprecise. Did one employee-reference criterion find no match, did configured correlation establish no association, or did the overall account remain uncorrelated? Those are different statements.

```text
Supplied cp-419 evaluation:

1. employeeRef = OLD-74004
   compare with identificationNumber
   -> no candidate matches
   -> consider configured criterion 2

2. mail = DEVI.RAO@learn.example
   compare with email
   -> unique intended match
   -> supplied link to I-74004

Only if configured matching
cannot establish the relationship:
   -> consider the default path

Human verification:
   intended owner and recorded link?
```

The arrows show the documented comparison responsibilities and the supplied straightforward unique-match result. They are not separate mandatory jobs or a diagram of ISC's private services.

The last branch does not say that the default path runs after a configured association and replaces it. It applies when configured correlation cannot establish the relationship.

Nor does the figure define what ISC does with ambiguous candidates or processing errors. Those require their own evidence; “continue to the next row” is not an assumed universal response to every abnormal condition.

## One successful criterion is not a vote from every field

Suppose a changed example has the correct `employeeRef = 74004`, but an outdated email that matches no identity.

The employee-reference comparison can establish the relationship under the supplied unique-match conditions. The second field's disagreement does not turn the standard configuration into an all-fields-must-agree test.

An **AND condition** requires all specified conditions to be satisfied together. An **OR condition** is satisfied when at least one alternative condition is satisfied.

For these standard configured pairings, think in terms of ordered alternatives rather than a combined AND check. That explains why adding a weaker second row can widen the ways an account becomes associated.

It is not automatically an additional safety requirement.

For example, adding a company comparison beside an employee-number comparison does not necessarily require the same candidate to match company and number together. If the design needs that combined meaning, use an approved supported design that actually represents it.

Do not describe separate rows as a combined check merely because they are displayed beside each other.

Order also belongs in the saved evidence. Inspect the actual order rather than assuming the strongest reference is first because that was the design proposal.

A clear unique match is not a weighted confidence score. Don't invent “one point for employee number, one point for email” or claim that ISC waits for a majority of attributes to agree.

## A different row can reveal conflicting ownership evidence

Now change the facts again.

An account's employee reference points to `I-74004`, but its email matches `I-74005`. The application owner's approved records say the account belongs to Devi.

The selected fields disagree about the person.

Do not use a possible correlation result to decide which business record must be true. First establish why the inputs disagree: stale email, incorrect employee reference, reused address, wrong field selection or another proven cause.

The documented ordering is relevant to tracing configured behavior. It does not make a wrong business value legitimate.

Moving a preferred row higher is not a complete repair for contradictory ownership evidence. A later alternative can still associate another account whose preferred reference is absent or doesn't match.

For a trace, preserve the actual order, each selected value, matching candidates and the recorded association. If multiple candidates or conflicting relationships are involved, don't guess that collection order, newest identity, another profile's priority or a hidden confidence score resolves them.

A trace should state what is supported and what still needs checking.

## If configured correlation finds nothing, inspect the default path

ISC documents a **default correlation** path when an account cannot be correlated using its source's configured correlation.

It compares the account attribute designated as Account Name with an identity's `name`, using case-insensitive comparison. This default is not configurable.

It is not a comparison of any friendly full-name field.

For the main account, Account Name is `drao.cp`. Devi's identity name is `worker74004`, and no identity has the name `drao.cp`.

If both configured comparisons failed for that account, the supplied default values would not produce a match either.

Consider an independent account variation, `cp-420`. It belongs to Devi according to approved owner evidence. Neither configured criterion finds a match, but its designated Account Name is `WORKER74004`.

That value matches identity name `worker74004` case-insensitively. The supplied supported evaluation therefore associates `cp-420` through the default path.

No schema designation is being changed in this variation. The same `loginName` field remains Account Name; a different account contains a different naming value.

Now consider `cp-421`, whose configured comparisons find no match and whose Account Name is `unmatched421`. No identity has that name. With no existing manual link or other supplied matching behavior, the recorded result is **uncorrelated**: the account is not associated with an authoritative identity.

Here is how the supplied outcomes differ:

| Supplied account or condition | What explains the result |
|---|---|
| `cp-419`: first criterion finds no match; second uniquely matches Devi | Configured correlation supplies the intended association. Failure of the first comparison is not the overall result. |
| `cp-420`: neither configured criterion matches; Account Name matches identity name | The default path supplies the intended association. It is not evidence that either configured pairing matched. |
| `cp-421`: neither configured criterion nor default matches | The supplied outcome is uncorrelated. The collected account still exists in ISC. |
| Unchanged account skipped by an optimized read | The read does not prove this account was reevaluated using new configured criteria. Don't label an unevaluated comparison a failed comparison. |
| Existing persistent manual association | The current link needs its association history; changing source values and rereading do not automatically erase it. |

A failed match is not a request to delete, disable or remove permissions from the external account. Those are separate changes.

Likewise, a recorded relationship is not proof that the associated person is its legitimate owner.

## Case behavior belongs to the comparison you are tracing

The main example uses case-insensitive configured comparison.

Configured correlation supports a source/configuration-specific `ignoreCase` setting. If a configured comparison is made case-sensitive, an uppercase and lowercase value must not be treated as matching merely because the default behavior normally ignores case.

Record the actual setting with the criterion.

That configured setting is different from the documented non-configurable default Account Name-to-identity-name path. Don't assume changing a configured row's case behavior also changes the default path.

Case handling also does not establish whitespace or type handling. `"74004"` and `"74004 "` contain different text; `"0074004"` preserves zeros that a numeric conversion could discard.

**Null** means no value is present. An empty string is text with no characters. Neither supplies the approved employee reference. An evaluation error is another condition again.

If the evidence shows an error or unavailable input, record it. Do not replace it with a successful equality or a guessed no-match result simply to finish a diagram.

## Was this account actually evaluated under these criteria?

A saved configuration tells you what is configured now. It does not, by itself, show what ran earlier or what every existing account used.

**Optimization** skips unchanged account records for relevant processing. After changing correlation configuration, the documented unoptimized aggregation approach allows unchanged accounts to be reexamined.

A successful optimized aggregation can therefore coexist with an unchanged account relationship. Check the operation's scope and mode before concluding that new criteria were ignored.

```text
Saved criteria corrected
  -> configuration is now different

Existing account data unchanged
  -> optimized read can skip it
  -> new comparison not established

Supported unoptimized reevaluation
  -> unchanged account can be examined

Persistent manual association?
  -> not cleared by that reread

Human verification:
  current inputs, history and link
```

The arrows separate configuration, evaluation eligibility and human verification. They do not prescribe a broad rerun or promise that every existing relationship moves.

**Manual correlation** creates a persistent explicit account-to-identity association. Later source-data changes and unoptimized aggregation do not automatically clear it. Accounts created through ISC can also carry manual-correlation treatment.

Inspect how the link was established before explaining it as the result of today's configured criteria.

Do not remove accounts, reset sources or delete identities merely to force a cleaner demonstration. Select an approved correction appropriate to the proven defect and assess the affected scope.

## What does the screen establish, and what does it leave open?

The source's Account Correlation page shows the saved attribute pairings and order. A source type can supply a **preset configuration**, meaning initial predefined pairings; inspect what is actually saved rather than assuming those defaults remain unchanged.

The Accounts view shows collected source records and their attributes. The identity's details and associated accounts show the values and relationships ISC currently represents for that person.

**Preview** evaluates profile mappings for a selected identity. It can help explain an identity-side value, but it does not prove that value has been applied to every identity or that an account was correlated using it.

A **custom identity attribute** is an additional identity field defined for the organization. Identity attributes must be configured as searchable to appear in correlation's Identity Attribute list. For a new eligible custom field, the documented preparation requires manual processing for all identities before source aggregation. Searchability for correlation is not the same capability as querying a field in the separate Search interface.

The correlation Test feature uses a sample to estimate correlation results. A successful estimate does not prove every existing account has been evaluated or belongs to the right person.

Keep evidence for the exact source, account key, candidate identity, applied identity values, saved criteria revision/order, case settings, execution and observation time, and recorded association.

If a product view does not expose a criterion-by-criterion execution trace, don't manufacture one. You can state that the current data and configuration explain a result, while separately stating that historical execution evidence is unavailable.

**Provisioning** attempts supported account or access changes in an external system. **Attribute synchronization** is a configured identity-to-account write path for existing correlated accounts.

Correcting a comparison or relationship can affect configured consumers, so review them before a real change. Our fictional main result supplies no synchronization write or requested access change. The result established is the intended account relationship, not successful target provisioning.

## Try the trace with changed facts

### 1. The first criterion finds no identity

**Facts:** `cp-419` has no employee-reference match. Its second configured email comparison uniquely matches the intended Devi identity under the supplied case-insensitive setting.

Must the account remain uncorrelated?

**Reasoning:** No. The ordered configured alternatives can establish the relationship through the email pairing. Distinguish the first criterion's result from the supplied overall association, and verify the actual owner.

### 2. One criterion matches, another doesn't

**Facts:** The employee-reference criterion uniquely matches the correct identity. A second configured email criterion would find no match.

Does the second row automatically veto the first match?

**Reasoning:** No. Standard pairings do not declare an all-rows AND condition. The additional row is not automatically an extra requirement that the selected candidate must satisfy.

### 3. Neither configured pairing matches

**Facts:** Neither configured criterion matches for `cp-420`. Its designated Account Name is `WORKER74004`; Devi's identity name is `worker74004`; no manual link overrides the case.

Can a default association still occur?

**Reasoning:** Yes, under the supplied unique candidate and evaluation conditions. The case-insensitive default compares these naming values. It does not require the account's friendly display name to match.

### 4. Case sensitivity was changed

**Facts:** Account mail is `DEVI.RAO@learn.example`, identity email is `devi.rao@learn.example`, and this configured email comparison is case-sensitive.

Can you reuse the main example's matching conclusion?

**Reasoning:** No. The comparison setting changed. Inspect that configured comparison separately from other configured and default paths; a difference in one criterion is not the overall outcome by itself.

### 5. Two identities have the same email

**Facts:** An email value matches two identity records. No verified evidence identifies a single intended candidate or an observed result.

Should you choose the first identity displayed and call that ISC's outcome?

**Reasoning:** No. The data no longer supports the straightforward unique-match trace. Investigate duplicate values and ownership, obtain supported operation/result evidence and avoid inventing collection-order or hidden tie-breaking rules.

### 6. Employee reference and email point at different people

**Facts:** The employee reference identifies Devi, the email identifies another person, and the approved application records establish Devi as owner.

Is moving the employee-reference row higher a complete data repair?

**Reasoning:** No. Preserve the actual configured order and result, but investigate the contradictory input. A later alternative can still affect other records. Ordering a preferred criterion does not make a wrong email correct.

### 7. A manual link doesn't move

**Facts:** An account was explicitly correlated to one identity. Its current fields now fit another identity, and an unoptimized aggregation has run.

Does that prove the comparison engine is broken?

**Reasoning:** No. Manual correlation is persistent; that reread doesn't automatically clear it. Verify association history, intended owner and the approved supported correction before diagnosing a product defect.

### 8. New criteria, unchanged account

**Facts:** Saved criteria changed. The account data is unchanged, and the next source read was optimized. The relationship remained unchanged.

Has the new configured trace been demonstrated?

**Reasoning:** No. The unchanged record can be skipped for relevant evaluation. Establish supported reevaluation and record-level results rather than treating the read's success as proof that every new comparison ran.

## Trace a contractor-source proposal

A contractor application is configured with sponsor number first and contractor email second. The team believes both values must match the contractor identity.

The sponsor number actually belongs to an employee identity. Contractor email is unavailable for new starters until another system creates their mailbox. The application owner has an independent contractor reference, but it is not yet configured on both sides.

What would you establish before accepting this configuration?

Explain that the two standard rows are alternatives, not the proposed combined requirement. Verify whose identifier the sponsor field contains, which identity each available value can match, and what the actual saved order and case settings are.

Do not predict a safe contractor association from a missing future email or use a successful sponsor match as proof of the contractor's ownership.

Evaluate the independently supplied contractor reference, its mapped identity value and correlation eligibility. Inspect the designated Account Name/default path, existing manual relationships and supported reevaluation requirements.

Then check the actual resulting association against the contractor's approved ownership records and review dependent actions separately.

A useful trace ends with a precise statement: which comparison can establish which relationship under the supplied conditions, what was actually observed, and what evidence remains missing.
