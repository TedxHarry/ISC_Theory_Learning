# The account arrived. Why is the identity incomplete?

Devi is joining as an employee, number `66006`. Human Resources (HR) has supplied her surname, her ISC username and her assigned work email. The account read into SailPoint Identity Security Cloud (ISC) has finished.

Yet Devi appears under **Incomplete Identities**.

Should HR resend the record? Should you run the read again? Or is ISC looking at the wrong part of the record?

Let's follow the value that is actually missing. A successful account read establishes that information reached one boundary. It doesn't establish that every required identity value was produced.

## First separate the worker account from the identity

An **account** is a record in a particular connected system. In an HR integration, that can be a worker record rather than a login.

A **source** is ISC's configured representation of a system or account-data collection. Its **connector** supplies the supported integration behavior. **Account aggregation** reads account information from that collection into ISC.

An **identity** is ISC's representation of a person or another managed entity. It holds person-level information and relationships to accounts.

An **authoritative source** supplies accounts used to establish identities through an **identity profile**. The profile is shared configuration for the identities it governs, including how their identity values are populated.

An **attribute** is a named piece of information. A source account's `familyName` and an identity's Last Name are attributes on different objects. An **identity attribute mapping** selects or calculates the value that goes on the identity.

That distinction is the starting point for Devi's problem. “HR has a surname” and “the ISC identity has its required Last Name” are not the same observation.

An **identity exception** is a reported identity-data problem, including a missing required value or a duplicate ISC username. It gives you a problem to investigate, not a diagnosis of which team caused it.

## What does ISC require?

**Null** means that no value is present. For each identity profile, ISC requires mappings for these identity attributes and non-null values for the identities:

| Required identity attribute | Requirement and meaning in Devi's example |
|---|---|
| User Name, `uid` | The ISC username. It must be unique across identities from all identity profiles. The approved value here is `person66006`. It is not automatically the account identifier of every connected system. |
| Work Email, `email` | A non-null identity value. The approved assigned address here is `devi66006@example.com`. ISC does not validate this required value as an email address merely by checking its presence. |
| Last Name, `lastname` | A non-null identity value. The approved surname here is `Rao`; the mapping must actually produce it. |

A configured mapping can still produce null for one person even when it works for everyone in a different sample.

There are therefore two questions:

- Is a mapping configured for each required identity attribute in this profile?
- Does that mapping produce an acceptable value for this particular identity?

A populated configuration screen answers the first question only partly. You still need to inspect its selected input and the resulting value.

The identity fields are the requirement. Their inputs can come from account attributes on different sources or from supported calculations. An authoritative HR source does not have to supply every identity field directly.

For this example, **WorkforceBook Production** is authoritative and **Employees** is the profile governing Devi's identity. We assume her worker account belongs to the intended identity, and that `person66006` is unique. The problem we are investigating is Last Name.

## Inspect what ISC has actually collected

Here is selected fictional account data for WorkforceBook account `wb-66006`. This is a readable extract of account attributes, not a complete connector response or an API request.

**JSON** is a way of representing named fields and their values. Quoted values below are text. The unquoted `null` represents no value.

```json
{
  "workerNumber": "66006",
  "loginName": "person66006",
  "workMail": "devi66006@example.com",
  "familyName": "Rao",
  "surname": null
}
```

The source's **account schema** defines the fields used to represent its accounts. In this fictional integration, both `familyName` and the retired field `surname` are still defined. HR now supplies the approved surname in `familyName`.

Employees currently maps:

- User Name from WorkforceBook `loginName`.
- Work Email from WorkforceBook `workMail`.
- Last Name from WorkforceBook `surname`.

Look at the last selection. The surname exists on the account as `familyName = Rao`, but the mapping reads `surname = null`.

The supplied observed identity has User Name `person66006`, Work Email `devi66006@example.com`, and no Last Name. It appears in Incomplete Identities, and the profile's exception evidence identifies the missing required value.

The collected account and the resulting identity are consistent with the faulty mapping. Reading the same unchanged input again does not make `surname` contain `Rao`.

```text
WorkforceBook account wb-66006 in ISC
  familyName = Rao
  surname = null
          |
          v
Employees Last Name mapping
  reads surname, not familyName
          |
          v
Required identity lastname has no value
          |
          v
Observed: Incomplete Identities
Evidence: missing required Last Name
```

The arrows trace an input choice to the missing output and the supplied observations. They do not show internal services or a guaranteed order in which screens update.

No HR surname correction is needed in this case: the approved value is already present in the collected account. The mapping is the defect.

If the collected `familyName` were also missing, that would be a different investigation. The **producer** is the system or process publishing the input; **extraction** selects data from that input for the integration. Compare the producer's record, the extraction and the represented account before deciding where to correct it.

## Missing, empty and broken are different conditions

A field that looks blank on a screen can conceal different evidence. Keep the distinctions visible when inspecting a record or calculation.

| Supplied condition | What it establishes, and what it does not |
|---|---|
| The field is absent from a JSON object | That extract does not contain the field. It does not establish whether the producer omitted it, extraction dropped it, or an existing ISC account retained an earlier value. Check the actual integration behavior and represented account. |
| The field is `null` | No value is supplied at that point. Follow how the selected mapping handles it. |
| The field is `""` | An empty text value is supplied. It is not the same JSON value as null. Don't assume every connector or mapping normalizes it identically. |
| The field is `"   "` | Text containing spaces is supplied. A visually blank result is not evidence of an approved surname or usable contact value. |
| The field is `"null"`, `"unknown"` or `"none"` | Literal text is supplied. It is not JSON null and does not become correct business information because it is populated. |
| The calculation returns an error | Evaluation failed. That is different from a successful calculation returning null or empty text. Inspect the error and its inputs. |

The published required-attribute rule establishes non-null values. Don't stretch that into an undocumented claim that every empty or whitespace representation is accepted, rejected or trimmed at every stage.

For a project, agree what counts as usable data: whether surrounding spaces are removed, which placeholder values are prohibited, who approves corrections and how exceptional names are handled. The integration should represent the person's approved information, not invent a surname to satisfy a screen.

A **transform** is a configured calculation or lookup used to produce a value. The **First Valid transform**, for example, returns the first non-null result from its ordered inputs.

Its name doesn't mean “first business-approved value.” An empty string differs from null. Error handling is also explicit: `ignoreErrors` defaults to false, so a failed input evaluation is not automatically a harmless missing value that falls through to the next input.

If a fallback suppresses an error and returns `unknown`, you have changed the output and hidden one symptom. You haven't established that the surname or email is correct.

## Incomplete is not a general name for every error

In the Identities view, **All Identities** includes incomplete identities and identities with errors. **Incomplete Identities** focuses on missing required identity values.

Those identities must be completed before they can sign in to ISC or be used in actions such as access requests and certifications. An **access request** asks for access to be assigned or removed through the configured request process. A **certification** is a review in which a reviewer decides whether access should remain.

A **provisioning** operation attempts a supported account or access change in a connected system. The **Identities with Errors** view covers other reported problems too, including email configuration, authentication source mismatches and provisioning issues. An error badge alone doesn't identify a missing Last Name.

For example, a profile can require ISC sign-in through a directory account, but the identity has no associated account on that authentication source. **Authentication** is verification of who is signing in. Supplying Last Name doesn't create the missing directory relationship or repair that sign-in configuration.

Likewise, a profile might send registration invitations only to an alternate email address that isn't available. Its required Work Email could be populated while the invitation configuration still has a problem.

Read the specific details. The word “email” in an error is not enough to conclude that required Work Email is null.

The profile's **Identity Exceptions** report and the identity's recorded status are related evidence, not interchangeable labels for every failure. A duplicate username is also an identity exception, but it isn't the same condition as a missing required value.

You can obtain exception evidence from the Identity Profiles view using its CSV or PDF download. **CSV** is a tabular text format; the CSV option downloads a zip file. Use the report to identify the affected records and attributes, then compare them with current data.

A downloaded report describes evidence available when it was produced. An old report isn't proof that a corrected identity is still incomplete.

## A username collision needs an ownership decision

Suppose a different intake record calculates `uid = person66006`, but that value already belongs to Devi's identity.

This is a **collision**: the proposed username conflicts with an existing identity's username. ISC requires uniqueness across identities from every profile. Moving the new record to another profile doesn't create a separate username namespace.

First ask whether the incoming record represents the same person or a different person.

Different source account identifiers do not guarantee different identity usernames. A calculation that builds a username from a person's name can produce the same result for two different people. Inspect the final mapped `uid`, not just the distinct worker numbers or account IDs used earlier in the path.

If it represents a different person, the naming design must produce a distinct approved username. Don't rename Devi merely because her record was easier to find.

If it represents the same person, investigate identity continuity and account ownership. **Account correlation** matches and associates source accounts with identities using configured account-to-identity comparisons. A matching or duplicate username is not, by itself, a supported instruction to merge two existing identities.

Compare stable person references, source account identifiers, existing associations and the intended rehire or conversion process. Repeatedly generating new usernames can conceal duplicate identities rather than repair the relationship.

An **object ID** identifies an ISC object. Changing the visible username does not make two identity objects become one, and deleting an identity to clear a collision can disrupt its relationships and history.

For new intake, prevent obvious collisions through the approved naming and uniqueness design. Still inspect the actual exception result; a successful preview for one person is not a reservation guaranteeing that no other identity can use the same proposed value.

## Correct the layer that is wrong

Devi's collected WorkforceBook account already contains `familyName = Rao`. The approved correction is to make Employees' Last Name mapping use that field.

**Preview** evaluates mapping results for a selected identity. It is useful for checking the proposed Last Name, alongside User Name and Work Email, before applying a shared configuration change.

Because the profile governs a population, test representative records too. An employee with only a single legal name, an existing employee whose field is still populated differently, or a record from a different integration path can expose an assumption that Devi's example doesn't.

Don't replace a legitimate naming exception with a fabricated family name. Agree its supported representation with the data owner.

**Identity processing** reevaluates identity values and configured access requirements. Profile configuration changes need to be applied through processing; saving a mapping or seeing the desired preview isn't the same as observing the changed identity.

**Apply Changes** on the identity profile initiates processing for identities associated with that profile. It isn't a fresh read of HR. If the source account data is stale, processing the existing data again doesn't fetch the missing producer correction.

The correction path depends on the cause:

```text
Human investigation: locate the defect
  |
  +-- Producer data is wrong
  |     Owner corrects approved source data
  |       -> collect corrected account data
  |
  +-- Collection/extraction is wrong
  |     Repair approved integration path
  |       -> collect and inspect the result
  |
  +-- Mapping/calculation is wrong
        Repair approved profile mapping
          -> preview and apply processing

Then verify the affected identity:
  expected required values and uniqueness?
  current exception/status evidence?
  separate downstream outcomes?
```

This is an engineering correction map, not an automatic ISC repair routine. Humans choose an approved correction based on evidence. The arrows show dependencies; exact read and processing actions depend on the defect and the supported integration.

After a source-data correction, manually aggregate the relevant source or use its approved scheduled aggregation, and confirm that the corrected record was collected. Identity changes during aggregation can initiate identity processing.

After a mapping correction, preview and apply the approved configuration with the right population scope. Don't change source data that was already correct just to match the old mapping.

If both input and mapping are wrong, both need attention. Running one operation more times is not a substitute for correcting both defects.

## What proves Devi's correction worked?

Here is the supplied fictional outcome after the approved mapping change and successful processing:

- WorkforceBook account `wb-66006` still has `familyName = Rao`; no HR surname was changed.
- Employees' Last Name mapping now uses `familyName`.
- The same intended identity has `uid = person66006`, `email = devi66006@example.com` and `lastname = Rao`.
- Current exception evidence no longer reports Devi's missing Last Name, and she no longer appears in Incomplete Identities.

Each observation supports a different part of the repair. A new report with fewer exceptions is not enough if you cannot show that Devi's own record is correct.

Recheck the other required fields as well. A shared change that fixes Last Name while breaking User Name isn't a completed correction.

Don't demand that every screen immediately show the same state. ISC synchronizes identity information with views such as Search, and updates can take time to appear there. Compare the affected identity's current data, processing evidence, view scope and report time before concluding that an old search result proves the correction failed.

At the same time, don't dismiss every disagreement as delay. A preview without applied processing, an older source account, a different identity with the same display name or a still-failing calculation needs a different response.

## Complete enough for ISC is not complete enough for every project task

Suppose Department, Manager or an approved contract end date is missing, but the required User Name, Work Email and Last Name are populated.

That missing field does not, by itself, meet the missing-required-attribute condition for Incomplete Identities. It can still be a serious project defect.

A **manager relationship** connects one identity to the identity of its manager. A manager-dependent approval process needs that relationship, not merely three required values. A department-based access decision needs the correct Department, not just a populated surname.

A **lifecycle state (LCS)** describes a stage such as active employment or termination, with configured access or account actions. A missing or wrong end date can affect its calculation even when the identity is technically complete.

Don't assume that a missing optional field automatically stops all access changes. Check the particular calculation, approval or access policy and its behavior when information is missing.

The same caution applies to literal `none` in Work Email. A non-null value is not evidence of a real mailbox, correct recipient or successful message delivery.

Fixing an identity value doesn't prove that provisioning succeeded, that an application account was renamed, or that old access was removed. Verify those outcomes separately in their configured process and **target system**, the external system receiving the attempted change.

An incomplete identity also doesn't prove that existing accounts and permissions in external applications were deleted. A restriction on using that identity in ISC is not the same event as an access-removal operation in another system.

## Try the evidence before choosing an action

### 1. The source value is already correct

**Facts:** `wb-66006` has `familyName = Rao` and `surname = null`. Employees maps Last Name from `surname`. No calculation changes the value.

Should HR change the surname?

**Reasoning:** No. The collected approved surname is correct. The wrong input selection produces the missing identity value. Correct and verify the approved mapping, including its effects on the profile's other identities.

### 2. The record exists only in the producer

**Facts:** HR corrected an employee's surname this morning. ISC's collected account still contains yesterday's missing value. The mapping reads the correct field.

Will processing that existing identity alone fetch HR's correction?

**Reasoning:** No. Identity processing evaluates the information available to ISC; it is not a source aggregation. Confirm the corrected record is published and collected through the supported read path, then verify the resulting identity and exception evidence.

### 3. A fallback sees empty text first

**Facts:** A First Valid transform evaluates `""` before the approved alternative `Rao`. The first input evaluates successfully as an empty string, not null.

Can you assume it will choose `Rao`?

**Reasoning:** No. First Valid selects the first non-null result. Empty text is a different value from null. Inspect the actual output and implement the approved empty-value handling; don't infer universal platform validation from the transform's name.

### 4. A calculation fails before a fallback

**Facts:** A First Valid input throws an error. `ignoreErrors` is not enabled. A later input contains a non-null value.

Is the error equivalent to a missing value?

**Reasoning:** No. The documented default does not automatically ignore the error. Investigate its cause and the calculation's evidence. An approved error-handling change needs justification; silently choosing a placeholder doesn't establish correct identity information.

### 5. Another profile already uses the username

**Facts:** A new identity would receive the same `uid` as an identity in a contractor profile. The people are confirmed to be different.

Will creating an employee profile with a different name solve the conflict?

**Reasoning:** No. Username uniqueness spans identities from all profiles. Produce a distinct approved username through the naming design and verify the result. Do not alter the existing person's identity or confuse this collision with account correlation.

### 6. Required values exist, but sign-in has an error

**Facts:** User Name, Work Email and Last Name are present. Error details say the profile uses directory-based authentication but the identity has no account on that authentication source.

Which configuration or relationship needs investigation?

**Reasoning:** Investigate the intended directory account and its association, or the approved sign-in configuration. The supplied problem is the missing authentication-source relationship, not a missing required surname. Correcting required values cannot create that relationship.

### 7. No incomplete flag, but no manager either

**Facts:** All required values are present. A manager-dependent access approval has no usable manager relationship.

Does the absence of an Incomplete flag establish that the request can be approved correctly?

**Reasoning:** No. Required-attribute completeness and the approval's data dependency are different checks. Inspect the manager input, relationship and approval configuration. Don't invent a manager or assume the process always fails safely.

### 8. The report improves but a group remains

**Facts:** Devi's current required values are correct, her missing Last Name exception has cleared, and an external application still shows a group that should be removed under a separate approved access policy.

Does the group prove the Last Name correction failed?

**Reasoning:** No. The supplied evidence establishes the required-value correction. Inspect the separate policy, processing, provisioning and target result for removal. Clearing an identity exception does not itself prove access delivery or removal.

## Apply the same reasoning to contractor intake

A contractor feed supplies stable usernames and legal names, but assigned work email arrives from a later directory-account process. The team proposes inserting `unknown` for every missing email and declaring intake complete.

What would you ask before accepting that proposal?

Establish the initial identity requirements and the approved source for the eventual work address. Identify which messages, invitations, approval processes or external systems can consume that email value before the real address arrives.

A technical placeholder needs an approved dependency and consumer-control design, plus a verified transition to the intended value. It isn't an email address simply because the required field is no longer null.

Then include changed conditions: a duplicate username, an error in the lookup, an empty rather than null value, and a source correction that hasn't been collected. Decide what evidence would distinguish each case and who owns the repair.

Explain the result back as an input-to-output trace: which account supplied which value, which mapping evaluated it, which specific requirement failed, what correction reached ISC and what current evidence confirms the outcome. That is a stronger diagnosis than “the aggregation was green” or “the incomplete count went down.”
