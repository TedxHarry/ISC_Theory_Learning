# Which account field is ISC comparing with which identity field?

Devi is employee `0072002`. Her employee identity already exists in SailPoint Identity Security Cloud (ISC), and a project-management application has an account intended for her.

The application's account contains `workerRef = "0072002"`. Devi's identity contains `identificationNumber = "0072002"`.

The values agree. But that agreement only helps if ISC's correlation configuration actually compares those two fields.

Let's put the configuration beside the records. A field that happens to contain the right value is not necessarily the field ISC is using.

## There are two objects on the comparison

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system. Devi's employee identity and her application account are different objects.

An **attribute** is a named piece of information on an object. `workerRef` is an account attribute in this application; `identificationNumber` is an identity attribute in this example.

**Account correlation** matches and associates source accounts with identities. A **correlation criterion** pairs an account attribute with an identity attribute and specifies the comparison between their values.

The standard correlation form uses the **Equals** operation. It asks whether the selected account value matches the selected identity value, subject to the applicable comparison settings. The Operation field is fixed at Equals in this form; it is not a place to enter a contains or substring expression.

It does not ask whether the two fields have similar names.

A **source** is ISC's configured representation of a system or account-data collection.

For this fictional project, **HarborHR Production** represents the HR worker records. It is an **authoritative source**: its accounts establish employee identities through the Employees **identity profile**. That profile is shared configuration governing those identities, including how their identity attributes receive values.

**WorkTrack Production** represents the project-management application. It is not authoritative for establishing employee identities. Its existing accounts need to be associated with the right existing people.

HarborHR account `h-72002` is already attached to Devi's identity. We'll call the identity `I-72002`, a teaching label rather than an actual ISC object ID. WorkTrack account `wt-391` is the account whose relationship we're evaluating.

The approved design uses the employee reference, including its leading zeros, to identify the person. It does not use the application's login or payroll reference.

## Read the records before reading the result

Here is a compact representation of the supplied data. The labels group the teaching evidence; this is not an API request or a complete exported ISC response.

**JSON** represents named fields and their values. Quotation marks here mean a value is text. The zeros in `"0072002"` are part of that text.

```json
{
  "harborHRAccount": {
    "accountKey": "h-72002",
    "personNumber": "0072002",
    "payrollRef": "PAY-884"
  },
  "iscIdentity": {
    "teachingId": "I-72002",
    "identificationNumber": "0072002",
    "name": "worker72002",
    "displayName": "Devi Rao"
  },
  "workTrackAccount": {
    "accountKey": "wt-391",
    "loginName": "drao.wt",
    "workerRef": "0072002",
    "displayName": "Devi Rao"
  }
}
```

On WorkTrack, the **account schema** defines the represented account fields and their properties. It designates `accountKey` as **Account ID**, the identifier used to distinguish the source account, and `loginName` as **Account Name**, its selected naming field.

Neither designation means “employee number.” Here the account key is `wt-391`, the Account Name is `drao.wt`, and the employee reference is `0072002`.

The identity also has a `name` value, `worker72002`, and a display name, `Devi Rao`. Those are not interchangeable just because the interface displays a readable label.

The saved WorkTrack criterion pairs account `workerRef` with identity `identificationNumber`. Identification Number is already available for correlation in this supplied tenant configuration.

No other configured criterion establishes a different relationship. No identity has the name `drao.wt`, and no existing manual association, an explicitly assigned account-to-identity link, overrides this case. The approved employee reference uniquely identifies Devi among the candidate identities.

These conditions matter. They let us explain this one comparison without inventing how conflicting matches would be resolved.

## The identity side has its own history

How did `0072002` reach the identity?

An **identity attribute mapping** specifies the input or calculation used to populate an identity attribute. Employees maps HarborHR's `personNumber` to identity `identificationNumber`.

**Identity processing** evaluates identity data and configured requirements, including its attribute mappings. In the supplied evidence, that mapping has already been applied, so the current identity value is text `0072002`.

The WorkTrack correlation criterion does not directly compare the WorkTrack account with the HarborHR worker account. It compares WorkTrack's account value with the value on the identity.

HarborHR matters because it supplied the identity-side value. That is an input dependency, not an extra field selection on the WorkTrack correlation form.

```text
Already linked HarborHR account h-72002:
  personNumber = "0072002"
    -> Employees identity attribute mapping
    -> identity I-72002
       identificationNumber = "0072002"

Collected WorkTrack account wt-391:
  workerRef = "0072002"
    -> account side of saved criterion

ISC compares the selected values:
  workerRef Equals identificationNumber
  "0072002" matches "0072002"
    -> supplied association with I-72002

Human check:
  correct source, account, person and evidence?
```

The first arrows describe how the identity-side value was supplied. The WorkTrack arrow identifies the other comparison input. The final arrow is the supplied successful relationship after supported evaluation.

This is a data-dependency map, not a separate job for every arrow or a picture of private ISC services.

**Account aggregation** reads account data into ISC and can evaluate correlation as part of that work. Collecting WorkTrack data does not, by itself, prove the HarborHR-derived identity value is current. Each side has its own input and processing evidence.

In the successful example, ISC associates the same WorkTrack account with the same existing employee identity. Matching did not rename `drao.wt`, replace `wt-391`, or create another employee.

## “Mapping” can describe different work

You will hear people say “the mapping is wrong.” Ask which mapping they mean.

| Configuration or relationship | What it controls here |
|---|---|
| WorkTrack account schema | Which account fields ISC represents, their properties, and the selected Account ID and Account Name. |
| Employees identity attribute mapping | How the identity's `identificationNumber` receives its value from HarborHR `personNumber`. |
| WorkTrack account correlation criterion | Which WorkTrack account field is compared with which identity field to establish an association. |
| Recorded account association | Which identity ISC currently links to WorkTrack `wt-391`. It is an outcome or established relationship, not the mapping definition itself. |

These responsibilities connect, but changing one is not a substitute for checking the others.

Suppose the correlation criterion accidentally selects WorkTrack `accountKey` instead of `workerRef`. It compares `wt-391` with `0072002`. The correct employee number is present on the account, but the chosen field doesn't supply it to that comparison.

Now consider a different defect. The criterion selects `workerRef` correctly, but Employees maps identity Identification Number from HarborHR `payrollRef`. The identity holds `PAY-884` instead of `0072002`.

The correlation criterion can be correct while its identity-side input is wrong for the intended meaning.

Changing WorkTrack's valid login would repair neither defect. Trace the selected field on each object and then the origin of its actual value.

## Matching field names are neither required nor sufficient

`workerRef` and `identificationNumber` have different names. They are suitable counterparts in this project because both contain the same approved person reference.

The opposite can also happen. Two fields named `employeeId` can mean different things: a global person reference in one system and a local employment-contract reference in another.

A similarly named field can also identify the employee's manager rather than the account's user. Equality with a manager's employee number would be a wrong ownership match, even if the comparison technically succeeds.

Before accepting a pairing, say what each value identifies. Then check the business records supporting that meaning.

An **entitlement** is a represented permission or membership. A group identifier or membership list describes access, not necessarily the person using the account. The presence of an attribute in an account schema does not make it a sensible ownership reference.

This is why adding a convenient field to the form is not the same as designing a valid relationship.

## A visible identity attribute may not be eligible yet

ISC lets you define custom identity attributes. A **custom identity attribute** is an additional identity field defined for your organization.

The definition is available across identity profiles, but each profile can map it differently or leave it unused. Creating a field does not populate it for every person.

There is another requirement for account correlation. Identity attributes must be configured as **searchable** for inclusion in the correlation configuration's Identity Attribute list. A subset of predefined attributes already has that setting.

Here, “searchable” is a correlation eligibility setting. It is not the same as being able to use an attribute in the separate **Search** interface, where you query represented identity and access information.

Finding a contractor by a custom attribute in Search is therefore not proof that the attribute is ready to use in correlation.

For a new custom `externalWorkerRef`, distinguish its definition, its profile mapping, its populated values, and its searchable-for-correlation setting. After configuring a searchable identity attribute, the documented preparation requires manual processing for all identities before aggregating the source that will use it.

That preparation has a wider scope than previewing one person. Review the affected profiles and processing impact before carrying it out.

The standard correlation form doesn't offer an arbitrary raw field from another application's account as the Identity Attribute. The right side is an eligible identity attribute. If the needed business reference exists only on an already associated HR account, an appropriate identity mapping can make it available on the identity.

Do not create extra custom fields when an existing eligible identity attribute already carries the intended reference correctly. First establish the meaning and availability of what is already there.

## Equals is a comparison, not a cleanup instruction

The correlation form's Equals operation is not a request to strip prefixes, remove spaces, or convert every number-looking value into the same format.

Correlation is case-insensitive by default. Configured correlation supports a source/configuration-specific case setting through `ignoreCase`; inspect the actual setting when letter case affects identity.

That does not mean all differences are harmless. `"0072002"` and `"72002"` are different text representations. Converting the reference to a number discards zeros. Whether that conversion is legitimate is a business-data decision, not something to assume from the word Equals.

Likewise, record the difference between `"0072002"` and `"0072002 "`, including the trailing space. Do not assume an undocumented cleanup step before matching.

A **transform** calculates a value from inputs. For example, **Trim** removes whitespace at the beginning and end of a string. Applying it in an identity mapping changes that mapping's output; it does not automatically rewrite the incoming WorkTrack account field.

If the account side contains unwanted spaces, cleaning only the identity side doesn't establish that both actual comparison inputs are now suitable.

Choose a documented, approved correction at the layer that owns the defect. Preserve the original evidence, confirm the collected result and inspect what the comparison actually receives.

A **multi-valued attribute** holds a collection rather than one value. A list such as `["0072002", "0083003"]` is not the same input as the single person-reference string `"0072002"`. Check the supported field type and actual representation; don't assume Equals selects the intended person from a list or that converting the whole list to text repairs it.

**Null** means no value is present. Empty text, `""`, is a present string with no characters. A missing field is another observation again. Do not assume every connector represents these conditions identically.

None of them supplies the approved employee reference in this project. Filling missing references with a common value such as `UNKNOWN` may make a field non-null, but it does not identify a person.

## Check where the value comes from before relying on it

Consider a proposed custom identity attribute, `workTrackWorkerRef`. Its mapping reads `workerRef` from a WorkTrack account already associated with the identity.

An **Account Attribute transform** can look up an account on an identity and return one of its attributes. It is not a tenant-wide search that first discovers the owner of every uncorrelated account.

Suppose the proposal uses that derived identity field to correlate the person's first WorkTrack account. In the supplied variation there is no associated WorkTrack account, no other input or fallback, and no alternative matching path.

The proposal needs the relationship before it can obtain the value intended to establish that relationship.

```text
Proposed first-account design:

Correlate WorkTrack account
  needs identity workTrackWorkerRef
    needs an associated WorkTrack account
      needs correlation already established

No associated account or other input supplied:
  the proposed input path is unavailable

Independent reference design:

Already linked HR account
  -> approved identity person reference
WorkTrack account
  -> its person reference
Compare those available values
  -> evaluate intended relationship
```

The first path shows a circular data dependency. It does not claim ISC repeatedly loops or automatically invents a fallback.

The second path removes that dependency by using a reference already available independently of the missing application relationship. Its arrows describe value availability, not guaranteed ownership.

A different approved design could use another genuinely independent input or an evidence-based exception. Merely pointing the identity mapping back to the unassociated account does not supply that independence.

The same question applies to email matching. If the identity's work email comes only from the account you're trying to associate, check what value is actually available before that association. Do not substitute a placeholder email and call it verified ownership.

## The saved criterion is not the whole investigation

A **preset correlation configuration** is initial source-type configuration containing attribute pairings. Inspect the saved configuration; don't assume the preset is still present or suitable for the organization's data.

ISC also documents **default correlation** when the source's configured correlation cannot associate an account. That default compares the account's designated Account Name with the identity's `name`, case-insensitively. The default is not configurable.

For our WorkTrack example, that means `drao.wt` versus an identity name, not the account's friendly `displayName` versus a person's full name. The supplied candidate identity name is `worker72002`, and no identity has the name `drao.wt`.

A failed preferred employee-reference comparison would therefore have no default match in this example. Another source's values could produce a default match. State those facts before concluding that an account must be **uncorrelated**, meaning it is not associated with an authoritative identity.

Existing relationships need their own evidence. **Manual correlation** creates a persistent explicit link. Later value changes and an aggregation with optimization disabled do not, by themselves, clear that link. Accounts created through ISC can also have manual-correlation treatment.

**Optimization** skips unchanged accounts for relevant processing. After changing correlation configuration, the documented approach uses an unoptimized aggregation so unchanged accounts can be reexamined. An ordinary successful read is not proof that every unchanged account used the new pairing.

These boundaries explain why a screenshot of today's criterion is not historical proof of how an existing link was established.

## Put the comparison evidence together

| Evidence to inspect | Question it helps answer |
|---|---|
| Exact source and account key | Are we investigating WorkTrack Production `wt-391`, rather than another environment or another account? |
| Account schema and current collected fields | Which fields are designated Account ID/Name, and what does the selected correlation field actually contain? |
| Saved correlation configuration | Which account and identity attributes are paired, with what operation, order and case settings? |
| Current identity and governing profile | Does the candidate identity exist, and which applied mapping supplied the selected identity value? |
| Eligibility and preparation | Is the identity attribute available for correlation, with required processing completed? |
| Observation times and association history | Are both inputs current for the investigation, and is the relationship new, automatic or persistent manual? |
| Result and approved ownership records | Which identity is actually associated, and does that person legitimately own this account? |

**Preview** evaluates a profile mapping for a selected identity. It helps explain a proposed identity-side value. It does not prove that all identities hold that value, that WorkTrack was reevaluated, or that the recorded relationship is correct.

The Accounts view supplies collected account evidence; the identity's details and associated accounts supply person-level evidence. Search and reports support investigation, but record their observation times rather than assuming every view updates simultaneously.

**Provisioning** attempts supported account or access changes in an external system. Correlation establishes an association; it is not itself proof of successful provisioning.

**Attribute synchronization** is a configured identity-to-account write path for existing correlated accounts. Mapping or association corrections can affect such consumers, so inspect them before a real change.

Our fictional successful pairing includes no synchronization write or requested access change. The result established is that WorkTrack `wt-391` is associated with the intended identity `I-72002`.

## Try changing one part of the comparison

### 1. Different names, same person reference

**Facts:** WorkTrack `workerRef` and identity `identificationNumber` both contain text `0072002`. They are the saved pairing, eligible and evaluated; the approved reference uniquely identifies Devi.

Must the account field be renamed to `identificationNumber`?

**Reasoning:** No. The configured pairing relates differently named fields with the same intended meaning and value. Renaming a valid schema field adds risk without repairing a defect.

### 2. The right value is in the unselected field

**Facts:** The saved criterion selects WorkTrack `accountKey`, containing `wt-391`. The same account's unselected `workerRef` contains `0072002`.

Does the matching employee number make this criterion successful?

**Reasoning:** No. This comparison receives `wt-391`, not `0072002`. Inspect and correct the selected pairing through the approved change process, then verify supported reevaluation. Do not change the valid account key to imitate an employee number.

### 3. The identity copied a payroll reference

**Facts:** WorkTrack `workerRef` is correct. The selected identity attribute currently contains `PAY-884` because its applied mapping reads HarborHR `payrollRef`.

Which side needs investigation?

**Reasoning:** The identity-side mapping and meaning. The application account already contains the approved person reference. Correct the proven input selection, check the resulting identity value and then the relationship; do not overwrite correct application data merely to match the wrong identity value.

### 4. Search finds the custom field

**Facts:** A custom reference is populated and usable in Search, but is not configured as searchable for correlation and is absent from the correlation attribute list.

Has Search proved correlation readiness?

**Reasoning:** No. These are different capabilities. Verify the identity attribute's correlation eligibility and the documented all-identity processing preparation before source aggregation. One search result or Preview is not that preparation.

### 5. The source silently lost the zeros

**Facts:** The approved reference is text `0072002`. A file-producing integration converted it to a number and supplied `72002`.

Should you remove the zeros from every identity to clear the mismatch?

**Reasoning:** No. The supplied defect is a representation change in the feed. Preserve the approved reference, correct its production and confirm the collected comparison input. Broad identity changes could affect other consumers and conceal the actual cause.

### 6. Letter case carries meaning

**Facts:** A legacy system treats `abc7` and `ABC7` as references for different people. The correlation configuration uses case-insensitive comparison.

Is a matching-looking result enough?

**Reasoning:** No. The comparison policy conflicts with the reference's business meaning. Review the supported case setting and the candidate population before accepting results. Do not invent which person ISC would choose when the supplied information is ambiguous.

### 7. The first account must supply its own matching value

**Facts:** The selected identity field can only read an already associated WorkTrack account. No such account, independent input or other matching path exists.

Will repeating aggregation supply the missing identity value by itself?

**Reasoning:** The proposed data path cannot supply it under these facts. Establish a suitable independent reference or approved exception. Another read doesn't make an unassociated account available through a lookup requiring an existing association.

### 8. Preview is correct, but the link is unchanged

**Facts:** A revised mapping previews `0072002`. There is no evidence that the new identity value was applied, that the account was reevaluated, or how its existing association was established.

Can you conclude correlation ignored the corrected value?

**Reasoning:** No. Check the actual identity value, supported evaluation and association history. A Preview is not applied-state evidence; an unchanged account can require reexamination, and a manual link can persist. Identify the missing evidence before naming a product defect.

## Apply the comparison to a contractor application

A team wants to correlate contractor accounts using a field called `workerId`. On investigation, that field contains the sponsor employee's number. A different account field, `externalPersonRef`, identifies the contractor.

The contractor profile has a custom `contractorRef` populated from an independent, already associated contractor registry account. The values agree with `externalPersonRef`, but correlation eligibility and required processing have not yet been established.

Which proposal would you take forward, and what remains to verify?

Use the contractor reference pairing as the candidate design, not the misleading `workerId` field. Confirm actual account and identity values, approved person ownership, representation and candidate uniqueness. Check the custom attribute's eligibility and preparation, the saved criteria and default path, and any existing manual association.

Then verify supported evaluation and the resulting account-to-person relationship. Review configured downstream effects separately.

A useful explanation names both objects and both fields: “This application's external person reference is compared with the independently populated contractor identity reference.” That describes the mechanism. “We mapped workerId because it sounded right” does not.
