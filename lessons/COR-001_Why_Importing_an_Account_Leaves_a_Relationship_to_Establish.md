# The account was imported. Why isn't it on the person's identity?

Devi, employee number `71001`, already has an identity in SailPoint Identity Security Cloud (ISC). Her payroll application account also exists in ISC's account inventory.

Yet that account is not associated with Devi. It appears as uncorrelated.

The import succeeded. So what is missing?

Importing an account tells ISC that a particular system contains that account. Establishing which identity it belongs to is another responsibility. Let's separate those two results before choosing a correction.

## One record describes a person; another describes an application account

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a particular connected system.

Devi can have one identity with an HR worker account, a directory account and a payroll account attached to it. Those accounts do not need the same username or account identifier.

A **source** is ISC's configured representation of a system or account-data collection. Its **connector** supplies the supported integration behavior. **Account aggregation** reads account information into ISC.

An **attribute** is a named piece of information. An account attribute describes a source account; an identity attribute describes the ISC identity.

An **authoritative source** supplies accounts used to establish identities through an **identity profile**. The profile is shared configuration for the identities it governs, including how identity attributes are populated.

For this fictional example, **PeopleBook Production** is authoritative for Employees. Its worker account `p-71001` has already established the intended employee identity with the required values.

**LedgerPay Production** represents the existing payroll accounts. It is not authoritative for establishing employee identities in this design. Its collected account `lp-87` should be associated with Devi's existing identity.

We use `I-71001` as a short teaching label for that identity, not a real ISC object ID.

## Finding an account again is not finding its person

An **account identifier** distinguishes an account within the relevant source. It lets the integration recognize which account record it is handling.

For LedgerPay, the selected Account ID field is `accountKey`, containing `lp-87`. The selected **Account Name** field is `loginName`, containing `drao`.

These are schema designations: the **account schema** defines the fields and which ones identify and name accounts. Account Name here means the field selected for that purpose, not every field that looks like a person's name.

The account also has a friendly `displayName` of `Devi Rao`. That display label is not the selected Account Name in this example.

Recognizing `lp-87` during a later read can update the same ISC account record. It doesn't establish whether that account belongs to `I-71001`, another person, a shared service or someone no longer employed.

**Account correlation** is the process of matching and associating source accounts with identities. It answers, “Which identity should this account be attached to?”

That is a relationship between objects. It is not merely copying a field and not the same as recognizing an existing source account.

Here is the initial supplied evidence:

**Null** means no value is present. In this evidence it describes the payroll employee reference, not the account's existence.

| Object or configuration | Selected fictional facts |
|---|---|
| Identity `I-71001` | Employees governs it. Identification Number, `identificationNumber`, is text `71001`. Its identity `name` value used for default correlation is `worker71001`; its display name is `Devi Rao`. |
| PeopleBook worker account `p-71001` | Already attached to `I-71001`; the intended person and worker reference have been verified. |
| LedgerPay account `lp-87` | `loginName = drao`, friendly `displayName = Devi Rao`, and `employeeRef = null`. It is collected, but not attached to a managed person's identity. |
| LedgerPay configured correlation | One configured comparison pairs account `employeeRef` with identity `identificationNumber`. No other configured comparison supplies a match. |
| Other eligible identity data | No identity's relevant matching value identifies this account through that missing employee reference; no identity has the `name` value `drao`. |
| Recorded result | LedgerPay `lp-87` appears as uncorrelated. Devi's identity does not show it as her associated payroll account. |

The application account can exist and carry information even when ISC has not established its person relationship.

## Follow the matching responsibility

Correlation configuration pairs an account attribute with an identity attribute. The comparison must use information that means the same thing on both sides.

In this design, payroll `employeeRef` is supposed to contain the employee number. Identity `identificationNumber` contains that same approved person reference.

The account's technical key `lp-87` and its login `drao` are different identifiers serving different purposes. They are not incorrect merely because they differ from `71001`.

If `employeeRef` contained text `71001`, the configured comparison would have the intended matching value. In the initial evidence it is null, so this comparison does not establish the relationship.

Do not infer from that alone that ISC must leave every such account uncorrelated. Supported source types can have preset correlation configurations, and ISC also documents default correlation behavior when the source's correlation configuration cannot correlate an account.

That default compares the account attribute designated as Account Name with an identity's `name` attribute, using case-insensitive comparison. It is not a general comparison of any human-readable full-name field.

In the supplied evidence, Account Name is `drao`, while Devi's identity name is `worker71001`. No other identity has the name `drao`. The default path therefore supplies no match either.

That explains why the main example remains uncorrelated. A missing employee reference and a matching-looking display label do not, by themselves, explain every source's outcome; the applicable configured and default paths matter.

```text
Already established:
  PeopleBook p-71001 -> identity I-71001
  identificationNumber = "71001"
  identity name = worker71001

Collected LedgerPay account lp-87:
  selected Account Name = drao
  friendly displayName = Devi Rao
  employeeRef = null

Applicable correlation checks:
  configured employee reference: no match
  default drao versus identity name: no match
    -> supplied result: uncorrelated

Human check:
  correct account, person and matching data?
```

The first arrow shows an existing account relationship. The last arrow connects the supplied matching conditions to the recorded result. This is a logical evidence map, not a diagram of ISC's private services.

An aggregation can collect an account and evaluate correlation in one run. Separating the responsibilities here does not mean they always require separate jobs.

## Uncorrelated describes a missing relationship, not a deleted login

An **uncorrelated account** is a collected account not linked to an authoritative identity. In this human-account example, ISC hasn't attached it to the intended employee identity.

It isn't necessarily an account with no legitimate owner in the business. The payroll team may know exactly who uses `lp-87` even though the information or configuration available to ISC doesn't establish that relationship.

An **orphan account** is a business-risk description whose meaning should be agreed in the organization, such as an account with no valid accountable owner or no longer-needed access. It is not an automatic synonym for every uncorrelated account.

Don't conclude that an uncorrelated account has been disabled, deleted or stripped of permissions in the application. Those are separate account or access changes.

**Provisioning** attempts supported account or access changes in a connected system. The **target system** is the external system receiving such a change.

The supplied initial read and failed match do not include a provisioning operation to remove LedgerPay access. Whether the account can actually sign in and what it can do must be established from the application and relevant current evidence.

The reverse is also true: an account can be associated with the right identity while disabled in its source. Correct ownership and usable access are different states.

## Where will you see each piece of evidence?

The Accounts view lets you inspect collected accounts and their attributes, including uncorrelated accounts. The source's Uncorrelated Accounts view or report helps locate records that still need a relationship.

The identity's account and access information describes what ISC associates with that identity. If `lp-87` is uncorrelated, searching only Devi's identity is not a complete investigation of the source account inventory.

An **entitlement** is a represented permission or membership. A collected account can carry membership information while its relationship to a person remains unresolved. Do not assign that access to Devi in your analysis simply because the account displays her name.

ISC requires uncorrelated accounts to be resolved before they can be governed through the intended identity relationship. A source-level report listing a record is not the same evidence as a correct person-level access record.

An **access request** asks for access to be assigned or removed through a configured request process. A **certification** is a review of whether access should remain. Reliable account-to-identity relationships matter when such processes act on a person's accounts and access.

A **Source Owner** is a person assigned responsibilities for a source, such as manual fulfillment or access-review tasks. That assignment does not mean every account on the source is that person's own account.

Likewise, an account's administrative business owner, a machine account's responsible person and the human identity using a personal account are not interchangeable relationships.

When collecting evidence, record the exact source, account identifier, current relationship, matching fields and observation time. A total count or a familiar display name is not enough.

## Correct the missing information without changing the person's identity

In the main example, the payroll owner confirms from approved employment records that `lp-87` belongs to employee `71001`. The integration is supposed to supply that number in `employeeRef`.

The approved correction populates that field in the application's data feed. It doesn't rename the payroll login, change the valid employee number or make LedgerPay authoritative.

After the correction is published, the relevant source account must be collected and correlation evaluated through the supported path. Correcting data in the application without reading it into ISC leaves the old represented input in place.

Here are supplied fictional before-and-after facts:

```text
Before correction:
  same LedgerPay account lp-87
  employeeRef = null
    -> no applicable match
    -> uncorrelated

Approved data correction and collection:
  same LedgerPay account lp-87
  employeeRef = "71001"
    -> configured match to identificationNumber
    -> associated with same identity I-71001

Human verification:
  owner evidence supports the relationship?
  intended identity shows exact source/account?
  other dependent outcomes checked separately?
```

The arrows show the data dependency and supplied correlation outcome. The diagram assumes the account is reevaluated, the intended matching value is unique and the approved owner evidence is correct. It does not promise that editing one external field immediately changes every ISC screen.

In the successful result, the account identifier is still `lp-87`, the login is still `drao`, and the identity is still `I-71001`. What changed is the missing matching input and the established relationship.

No new employee identity was needed. No application permission was newly granted by the correlation statement itself.

## A configuration change and an existing association need extra care

If the correlation pairing itself is wrong, repairing data alone may not solve the problem. Inspect the actual source configuration, including preset and default behavior.

When correlation configuration changes after accounts have already been aggregated, the documented approach includes aggregation with optimization disabled so unchanged accounts can be reexamined. **Optimization** avoids unnecessary processing of unchanged account data; a successful optimized read does not prove every unchanged account was reevaluated under new criteria.

That is not a command to rerun every source broadly. Select the supported operation and scope for the actual defect, and verify its effect.

Nor does an unoptimized aggregation erase every existing relationship. **Manual correlation** creates an explicit persistent association; later source-value changes do not automatically move that manually linked account to someone else.

Accounts created through ISC can also carry manual-correlation treatment. Inspect how the association was established rather than assuming every link resulted from the current automatic comparison.

An approved manual correction can be appropriate for a verified exceptional account. It is not a substitute for repairing widespread missing references or incorrect matching configuration.

Do not remove accounts, reset a source or delete identities simply to improve an uncorrelated count. Those actions can affect other records and relationships. A link to the wrong identity needs evidence-based correction, not a cosmetic status change.

## A recorded match can still be wrong

Suppose `lp-87` contains another employee's number by mistake. A configured comparison can associate it with that employee's identity even though the business account belongs to Devi.

The result is correlated, but the ownership is incorrect.

This is why “100% correlated” is not a complete quality measure. It says that associations exist; it does not establish that every association is legitimate.

A loose match can also hide the missing reference. If the selected Account Name happens to match an unintended identity's name, a default path can produce a relationship even though your planned employee-number comparison did not.

Don't fix the main example by matching everyone named `Devi Rao`. Names can be shared, changed or entered inconsistently. Confirm the approved person reference and understand the actual comparison before accepting the association.

For a shared service account, do not force a personal-account relationship simply because someone administers it. Its classification and responsible-ownership design must fit the actual account use and supported features.

The aim is the correct relationship for the intended account type, not the largest possible correlated count.

## Follow the consequences without mixing them together

**Identity processing** reevaluates identity data and configured access requirements. Correlation changes can affect the account data available to a person's mappings and other configured decisions.

An **identity attribute mapping** selects or calculates an identity field's value. It can read a value from an associated application account without making that application authoritative for employee identity creation. Whether it does so depends on the profile's actual mapping.

A **role** groups access requirements and can use configured membership criteria. A **lifecycle state (LCS)** describes a business stage with configured access or account actions. Those consumers need their own data and configuration evidence.

**Attribute synchronization** is a configured identity-to-account write path for existing correlated accounts. A new or changed relationship can therefore have consequences beyond a screen label when such synchronization is configured.

Correlation is not a guarantee that every value is written, that every role changes or that all required provisioning succeeds. Identity processing and external delivery have distinct outcomes.

For the supplied LedgerPay example, no attribute-synchronization write is configured as part of the correction, and no access change is requested. The successful result establishes the intended account relationship.

If a real project configures downstream actions, review them before moving an account. Correcting a relationship can change which person's information or access requirements apply to it.

## Separate five observations during an investigation

| Observation | What it establishes, and what still needs checking |
|---|---|
| The application account exists | The application has a record. It does not prove ISC collected it or knows its person. |
| ISC has the source account | Collection and representation have occurred for that record. Check its current data and relationship. |
| The account is uncorrelated | The intended authoritative identity relationship is absent. Investigate input, identity availability and applicable matching paths; don't infer deletion. |
| The account is correlated | A relationship exists. Verify that it is the correct identity and understand how the link was established. |
| The identity shows the account and access | ISC associates that represented account/access with the identity. Verify business ownership, freshness and any required target outcomes separately. |

If the account is not present in ISC at all, investigate the source read and collection scope before diagnosing a correlation defect.

If the account is present but uncorrelated, investigate the relationship. If it is attached to the wrong identity, investigate incorrect ownership. If it is attached correctly but a particular permission is missing, investigate collected membership and the actual access process.

The same symptom, “I can't find the account under Devi,” can arise at different boundaries.

## Try the reasoning against changed records

### 1. The import finished, but the reference is missing

**Facts:** `lp-87` is collected with `employeeRef = null`. No configured or default path matches it to an identity.

Did the successful import establish Devi's ownership?

**Reasoning:** No. The account exists in ISC, but the supplied comparison evidence does not establish its identity relationship. Inspect the approved ownership and matching input rather than treating read success as a person match.

### 2. The display names are identical

**Facts:** Account friendly `displayName` and identity display name are both `Devi Rao`. The selected Account Name is `drao`; the identity's relevant name is `worker71001`. No configured comparison uses the friendly name.

Does the shared display label prove a default match?

**Reasoning:** No. The documented default uses the designated Account Name and identity name, not any full-name field. Inspect the actual designations, values and other applicable criteria. Identical display text is not ownership evidence by itself.

### 3. The default path does match

**Facts:** A source's configured employee-number comparison does not match. Its designated Account Name equals an identity's name, and no manual relationship overrides the supplied case.

Can you conclude that the account must remain uncorrelated?

**Reasoning:** No. The documented default correlation path can associate it using that name comparison. Verify the resulting identity and business ownership rather than assuming only the preferred configured comparison matters.

### 4. A matched employee number belongs to someone else

**Facts:** The account belongs to Devi according to approved application records, but its `employeeRef` contains another employee's number and it is attached to that employee's identity.

Is the account correct because it is correlated?

**Reasoning:** No. The input has produced a wrong person relationship. Confirm the intended owner, correct the actual data or association through the approved process, and review dependent effects. A higher correlation percentage would conceal this defect.

### 5. The intended identity is absent

**Facts:** An application account is collected, but the intended worker identity has not been established. No other legitimate identity matches.

Should you make the application authoritative just to clear the count?

**Reasoning:** No. Investigate why the intended population or identity is missing and use the approved authoritative-source design. Making the application authoritative changes its identity-establishment responsibility rather than proving which existing person owns the account.

### 6. Only the configuration changed

**Facts:** Correlation criteria were corrected. Existing account data did not change, and the next aggregation used optimization.

Does read success prove all those accounts used the new comparison?

**Reasoning:** No. Unchanged accounts may need reexamination through the documented unoptimized aggregation approach. Verify the affected records and operation; don't equate optimized collection success with universal relationship reevaluation.

### 7. A manual link remains after a field change

**Facts:** An account was manually associated with an identity. Its employee reference later changes.

Can you assume the next unoptimized aggregation will move it automatically?

**Reasoning:** No. Manual correlation is persistent. Inspect the association history, intended owner and supported correction path. A field change and an unoptimized read do not remove that explicit link by themselves.

### 8. The account is uncorrelated, but the application still permits use

**Facts:** ISC lists an account as uncorrelated. The application owner confirms it remains enabled and has existing permissions.

Do these observations contradict each other?

**Reasoning:** No. They describe an ISC identity relationship and the application's account state. No disable or access-removal operation has been supplied. Investigate whether access is legitimate and what action is approved; don't infer automatic removal from the missing link.

## Apply the distinction to a second application

A project imports 2,000 project-management accounts and finds 120 uncorrelated records. The team proposes assigning all 120 to the source administrator.

What would you establish before accepting that proposal?

Separate missing person identities, absent matching references, wrong field pairings, legitimate shared or service accounts and accounts that are no longer needed. Check preset/default paths and existing manual associations, not just the total count.

For sampled records, identify the exact source/account, intended owner evidence, candidate identity and the comparison that should establish the relationship. Check a similarly named different person and an account whose login differs from the employee number.

Choose corrections that fit the cause and account type. The source administrator's operational responsibility does not make every account their personal account.

Then verify the resulting relationships and any configured downstream effects. A useful completion statement names whose account was established and on what evidence, rather than saying only that the uncorrelated count reached zero.
