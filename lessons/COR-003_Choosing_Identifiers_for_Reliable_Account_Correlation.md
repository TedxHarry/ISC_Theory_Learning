# Which identifier will still point to the right person tomorrow?

Devi, employee `73003`, has an employee identity in SailPoint Identity Security Cloud (ISC). Her project-planning account is supposed to belong to that identity.

The project team can match the account using an email address or an approved person reference. Both values agree today.

Which one should the team choose?

Let's ask a harder question than “Does it match?” What happens when the address changes, someone returns after leaving, or another company joins the organization with overlapping employee numbers?

## First decide what the identifier identifies

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system. An **attribute** is a named piece of information on one of those objects.

An **identifier** is a value used to distinguish something. Its usefulness depends on what that something is and where the value is unique.

A **source** is ISC's configured representation of a system or account-data collection. In this fictional design, **AnchorHR Production** supplies employee records. It is authoritative: its worker accounts establish identities through the Employees **identity profile**, the shared configuration governing those identities and their attribute mappings.

AnchorHR worker account `hr-73003` is already attached to Devi's identity. We use `I-73003` as a teaching label for the identity, not an actual ISC object ID.

**TeamPlan Production** represents the project-planning application. Its account `tp-206` needs to be associated with the intended employee identity. TeamPlan does not establish employee identities in this design.

**Account correlation** matches and associates source accounts with identities. A **correlation criterion** pairs an account attribute with an identity attribute for comparison. The standard form uses the fixed **Equals** operation.

An **identity attribute mapping** supplies an identity value from selected data or a calculation. Employees maps AnchorHR's `personRef` to identity `identificationNumber`.

The business has approved `P-73003` as Devi's persistent person reference. Her employee number is `73003`; these values have different meanings even though they share digits.

Here are the supplied records and policies:

| Record or policy | Facts that matter to the decision |
|---|---|
| AnchorHR worker `hr-73003` | Employee number `73003`, person reference `P-73003`, work email `drao@learn.example`. |
| Identity `I-73003` | Applied Identification Number, `identificationNumber`, is text `P-73003`; Work Email, `email`, is `drao@learn.example`; identity `name` is `worker73003`. |
| TeamPlan account `tp-206` | Account key `tp-206`, login `drao.tp`, `ownerPersonRef = P-73003`, and `mail = drao@learn.example`. The application owner verifies that this account belongs to Devi. |
| Person-reference policy | AnchorHR's reference identifies a person across employment changes, is not reassigned to another person, and is supplied independently of TeamPlan account ownership. These are supplied project assumptions, not universal properties of HR identifiers. |
| Email policy | Addresses can change and can later be reassigned. An old application account can retain an earlier address. |
| Evaluation conditions | Identification Number is already eligible for correlation. The candidate person reference is unique; no existing manual link overrides the supplied case. No identity has the name `drao.tp`. |

An **account schema** defines the fields represented on a source account. For TeamPlan it selects the account key as **Account ID** and the login as **Account Name**.

The account key distinguishes `tp-206` from other TeamPlan accounts. It is not the reference that identifies Devi across systems.

Choosing a better person reference does not require changing the valid Account ID or Account Name. Changing those schema designations after aggregation can break references or create serious data problems.

## Uniqueness needs a population, not just a label

**Uniqueness** means a value distinguishes its intended subject within the population being considered.

A TeamPlan key can be unique among TeamPlan accounts without appearing on any employee identity. A local employee number can be unique within one company while another company uses the same number for a different person.

Ask, “Unique among which people, in which systems, and for how long?”

For correlation, examine the candidate identities relevant to the source's matching behavior, not only the small team used for a demonstration. An identity profile is not a reason to assume that a reused number in another profile cannot matter.

Do not invent a profile restriction that the actual correlation configuration does not provide.

There is another distinction. Devi could legitimately have a standard account and an administrator account. Both can carry the same person reference because they belong to one person.

That is different from two different identities carrying the same reference.

```text
TeamPlan account tp-206:
  ownerPersonRef = P-73003
    -> identity I-73003

TeamPlan account tp-admin-206:
  ownerPersonRef = P-73003
    -> same identity I-73003
       identificationNumber = P-73003

Different identities sharing P-73003:
  not proof of one intended candidate
  -> investigate duplicate person references

Human verification:
  legitimate accounts, intended owner and scope?
```

The two account-to-identity paths show a possible many-accounts-to-one-person relationship. They do not promise automatic account creation or permission assignment.

The second branch shows a data-quality concern, not ISC's undocumented choice between duplicate candidates. If the evidence doesn't establish one intended identity, investigate it rather than guessing which record the product will choose.

An **entitlement** is a represented permission or membership. Even when both accounts belong to Devi, they do not necessarily have the same entitlements or require identical treatment.

A shared service account is different again. Its administrator's employee number does not automatically make it a personal account. Confirm account type and the appropriate responsibility model before selecting a personal ownership reference.

## A reliable value must exist when matching needs it

**Availability** asks whether the value exists on both sides at the relevant time. **Coverage** asks how much of the intended population actually has it.

A reference populated for long-serving employees may be absent for contractors, acquisitions or new starters. “HR has a field for it” is not evidence that every account and candidate identity has a usable value.

**Account aggregation** reads account information into ISC. **Identity processing** evaluates identity data and configured requirements, including profile mappings.

The raw HR field, the current mapped identity value and the collected TeamPlan field are separate observations. Record what was published, collected and applied before comparing them.

For a first TeamPlan account, the identity-side reference must already be available without needing that missing account relationship. A mapping that can only read an already associated TeamPlan account cannot independently supply the value needed to discover that first account's owner.

This is a dependency problem, not a reason to keep rerunning the same read.

**Null** means no value is present. Empty text, `""`, has no characters. A shared placeholder such as `UNKNOWN` is text, but it does not identify an individual.

If 30 accounts lack their approved references, assigning all 30 the same placeholder does not repair person identification.

The appropriate response can include correcting an authorized feed, completing the intended population intake or handling a verified exception through an approved process. Do not fill the gap by borrowing a sponsor's reference or inventing a person identifier.

## Consistency means the same meaning and representation

**Consistency** asks whether the paired values identify the same thing and follow the agreed format across their producing and consuming systems.

An employee number, a contract number and a payroll assignment number can all be valid. They are not interchangeable.

For TeamPlan, `ownerPersonRef` must identify the account's person. A field containing that person's manager or sponsor would point at someone else, even if its value matched a real employee identity.

Representation also matters. Text `"0073003"` is different from `"73003"`. A feed that converts an identifier to a number can lose meaningful zeros.

A **transform** calculates a value from inputs. A normalization transform can make representations consistent, but it must preserve the distinctions the organization needs.

For example, removing a company prefix from `NORTH:73003` and `SOUTH:73003` would collapse two different references into `73003`.

That is not harmless cleanup.

The prefix is a **namespace**: it identifies the domain in which the remaining value has meaning. A qualified reference includes that domain so otherwise overlapping local values can be distinguished.

If a project adopts a qualified reference, both sides must contain or calculate the same approved qualified value. The identity attribute must be eligible for correlation and populated before evaluation.

Adding company and employee number as two separate correlation rows is not automatically a combined company-and-number comparison. Standard rows are not a declaration that every row must match the same candidate. Don't treat that as an implicit composite key.

A **composite key** uses multiple components together to identify something. An approved single qualified reference can represent those components; a particular technical implementation still needs supported mapping and comparison behavior.

Case is another part of the contract. Configured correlation is case-insensitive by default, with a supported `ignoreCase` setting for configured comparisons. If letter case distinguishes two business references, review that setting and the candidate data.

Do not assume Equals strips spaces, rewrites prefixes or resolves every type difference.

## Stability includes who receives the value next

**Stability** asks whether the reference continues to identify the intended person through the changes the design needs to handle.

A value that changes when someone marries, moves department or changes email domain creates additional coordination requirements. A value that is later given to a different person creates an ownership risk.

Consider this variation of Devi's email. The account is being evaluated for correlation; no persistent manual association overrides the variation.

```text
Earlier:
  Devi identity email = drao@learn.example
  TeamPlan mail       = drao@learn.example
  approved person reference = P-73003

Later supplied business facts:
  Devi's identity has a new email
  old address is reassigned to another person
  Devi's TeamPlan account keeps the old address

If evaluated using that stale email:
  account value equals the new holder's email
    -> equality no longer proves Devi's ownership

Person-reference path:
  account ownerPersonRef = P-73003
  Devi identificationNumber = P-73003
    -> same intended person reference
```

The arrows compare two possible identification paths under supplied facts. They do not claim an existing account automatically moves between identities after every email change.

The problem is deeper than “email sometimes changes.” At the later observation, the old address can be unique among current identities and still identify the wrong person for the old account.

Current uniqueness does not establish historical continuity.

An employee number also needs a policy check. Does it stay with the person during a contractor-to-employee conversion? Is a new number issued for each employment? Can the old number be reused?

A **rehire** is a person's return after an earlier period of employment. Establish whether the approved person reference persists and whether the intended ISC identity still exists. A stable business reference does not, by itself, restore a deleted identity, recreate an account or authorize restoration of old access.

If references must change, record the old-to-new ownership evidence, the effective change, feed readiness and how existing associations will be reviewed. Don't overwrite every identifier merely to make a new snapshot look consistent.

## Compare the candidates rather than voting for a familiar field

| Candidate | Questions that decide whether it fits |
|---|---|
| Full name or display name | Can names be shared or changed? Is the field intended to identify a person, or just display a readable label? |
| Email or login | Is it available before first association, unique in the actual candidate population, synchronized when it changes and protected against reassignment? |
| Local employee number | Does it identify a person or an employment, cover the intended worker types, survive conversions and remain distinct after acquisitions? |
| Approved persistent person reference | Is its meaning and non-reuse policy verified, is it present on both sides, and can the supplying teams maintain that contract? |
| Qualified company/person reference | Is the namespace stable, are all components available on both sides, and does the qualification preserve rather than invent ownership? |
| Application account key | Does it identify the source account rather than its person? What independently established identity value would legitimately correspond to it? |

There is no rule that email can never be used, or that a field called employee ID is always safe.

Choose from the organization's actual guarantees and data. If no candidate meets the required conditions, record the gap and correction plan. A source that cannot supply a dependable person reference needs design work, not a more optimistic description.

Do not spread additional sensitive personal information across applications just because it could distinguish people. Choose the approved reference and the necessary data scope.

## A higher matching percentage can hide a worse design

The team inspects a fictional population of 1,000 personal TeamPlan accounts.

All 1,000 have an email value equal to an identity's current email. Yet an ownership review confirms that one old account's address was reassigned: its email comparison identifies a different person from the account's legitimate owner.

The persistent person reference is present on 970 accounts. Supplied ownership checks confirm those 970 references identify their intended people. The remaining 30 require missing-data investigation.

Email has 100% value-match coverage in this comparison; the person reference has 97% availability on the accounts. Neither number is a complete measure of correct correlation.

One known wrong ownership relationship is not cancelled out by having more matches.

These are supplied comparison and ownership facts, not results claimed from a real tenant test. They also do not prove the other 999 email-based relationships are correct without checking them.

ISC's correlation Test feature evaluates a sample to estimate how many accounts will correlate. Where licensed recommendations are available, they can suggest pairings based on matching data.

Use those results to investigate candidates and gaps. They do not replace the business evidence that a particular account belongs to a particular person.

Test renamed and reused values, missing references, legitimate additional accounts, people outside the initial sample and cross-company collisions. Include cases that should not match, not just easy examples that should.

## Turn the choice into a maintained data contract

A **data contract** is an agreement about a field's meaning, format, producer and expected delivery. Here it should also state uniqueness scope, availability and reuse rules.

For the main example, the approved contract says AnchorHR supplies the persistent person reference, Employees maps it to identity Identification Number, and TeamPlan publishes that same person's reference as `ownerPersonRef`.

The application owner verifies account ownership; the integration team maintains delivery; the ISC team configures and verifies the comparison. These are illustrative responsibilities to assign explicitly, not mandatory SailPoint job titles.

Before deploying the criterion, verify the saved source configuration rather than relying on its name or a proposal. Identify any preset pairings supplied with the source type.

A **custom identity attribute** is an additional identity field defined for the organization. To appear in correlation's Identity Attribute list, it must be configured as searchable for correlation. The documented preparation then requires manual processing for all identities before source aggregation. Being usable in the separate Search interface is not proof of that correlation eligibility.

ISC also has a non-configurable default path when configured correlation cannot associate an account: designated Account Name is compared with identity `name`, case-insensitively.

For the supplied TeamPlan case, Account Name is `drao.tp`; Devi's identity name is `worker73003`, and no identity has the name `drao.tp`. That default therefore supplies no alternative match.

The saved configuration contains one criterion: TeamPlan `ownerPersonRef` Equals identity `identificationNumber`. With text `P-73003` on both sides, the verified unique owner and supported evaluation, the supplied result associates `tp-206` with `I-73003`.

That result establishes the intended relationship. It does not, by itself, grant a permission or change an external account field.

## Existing relationships need a controlled change

**Manual correlation** establishes a persistent explicit association. Changed source values and an unoptimized aggregation do not automatically clear that link. Accounts created through ISC can also have manual-correlation treatment.

**Optimization** skips unchanged accounts for relevant processing. If correlation configuration changes, the documented unoptimized aggregation approach allows unchanged accounts to be reexamined.

A better proposed identifier does not prove that every existing account was reevaluated or safely reassigned. Inspect current associations, affected scope and the supported correction path.

**Preview** evaluates an identity mapping for a selected person. It helps verify a proposed identity-side value, but it is not evidence that all identities hold that value or that source correlation has used it.

The Accounts view shows represented source accounts; identity details and associated accounts show person-level values and relationships. Keep the exact source, account key, identity, comparison values and observation times together.

**Provisioning** attempts supported account or access changes in an external system. **Attribute synchronization** is a configured identity-to-account write path for existing correlated accounts. Changing identity values or relationships can affect configured consumers, so review those dependencies before a real rollout.

Do not use synchronization to copy a guessed reference into an account and then cite that copied value as independent proof of its owner.

In our fictional main result, no attribute-sync write or requested access change is configured as part of the comparison. External access remains a separate outcome to establish.

## Try the identifier against changed conditions

### 1. A unique account key

**Facts:** TeamPlan key `tp-206` is unique among its accounts. No identity field carries that key or has an approved relationship to it.

Is uniqueness enough to make it the person-matching reference?

**Reasoning:** No. It distinguishes an account, not an independently identified person. Find the approved counterpart and ownership meaning rather than copying the key into a guessed identity.

### 2. Two accounts share one person reference

**Facts:** Devi legitimately owns `tp-206` and `tp-admin-206`. Both carry `P-73003`; only her identity has that approved reference.

Must one account receive a different person number?

**Reasoning:** No. The account keys distinguish the accounts; the shared reference identifies the same owner. Verify both uses and their access separately. This is not the same as two different identities sharing the reference.

### 3. Unique inside one company

**Facts:** North and South each use employee number `73003` for different people. A shared source contains both populations.

Can local uniqueness be treated as uniqueness for that matching population?

**Reasoning:** No. Establish a common global reference or an approved qualified value on both sides. Merely adding a company row and a number row does not establish a combined comparison.

### 4. The old email belongs to someone new

**Facts:** An old application account still belongs to its original user, but its email now matches a different person's current address.

Does a single current email match prove correct ownership?

**Reasoning:** No. Reassignment has broken the connection between value and original person. Use ownership history and an appropriate independent reference; don't infer which existing relationship automatically changes.

### 5. A reference exists only after association

**Facts:** The proposed identity field can only obtain a reference from an already associated application account. The first such account is not yet associated and no independent input exists.

Is the reference available for this first matching decision?

**Reasoning:** No, under the supplied dependency. Obtain an approved independent input or verified exception; another read doesn't supply evidence through a relationship that doesn't exist.

### 6. More complete, but less trustworthy

**Facts:** Email values match for all 1,000 accounts, with one confirmed wrong owner. Verified person references are available for 970; 30 are missing.

Should 100% automatically win over 97%?

**Reasoning:** No. The measurements describe different evidence, and a wrong owner is a known defect. Take the dependable reference and missing-data remediation forward as the candidate design, while investigating the full population and controlling exceptions.

### 7. Prefix removal creates a collision

**Facts:** `NORTH:73003` and `SOUTH:73003` identify different people. A proposed transform removes the prefix.

Has normalization improved matching?

**Reasoning:** It has discarded a necessary distinction. Preserve the approved qualification and verify both producing and mapped representations. Easier equality is not better ownership evidence.

### 8. A returning employee has a stable reference

**Facts:** A returning worker retains the approved person reference. The earlier ISC identity was deleted, and old application access has not been reviewed.

Does the reference alone restore that identity and justify the old access?

**Reasoning:** No. Establish the intended identity and continuity through the approved design, then review account association and authorized access separately. Stable person meaning is not automatic object recovery or access approval.

## Explain the choice for an acquired company

An acquired company supplies a local `staffNumber`. It overlaps existing employees' numbers. Contractors receive no staff number, and work email appears only after a downstream directory account is created.

The team proposes matching by email until the numbers are cleaned up, then removing company prefixes so all values look consistent.

What would you establish before accepting that plan?

Identify the intended people and account types, the meaning and reuse policy of each reference, and when each input exists. Email is not an available first-account input merely because a later directory account will receive it.

Preserve the company distinction where it identifies different people. Check whether an approved global person reference exists, or whether a qualified reference can be populated consistently on both sides. Treat missing contractor references as a coverage problem requiring an approved supplier or exception.

Then verify correlation eligibility, saved configured/default paths, affected existing associations and supported evaluation. Test correct owners and deliberate non-matches, including reused addresses and overlapping local numbers.

The design decision should explain why the chosen value continues to identify the intended person, who maintains that guarantee and how exceptions are resolved. A field name and a matching percentage cannot answer those questions for you.
