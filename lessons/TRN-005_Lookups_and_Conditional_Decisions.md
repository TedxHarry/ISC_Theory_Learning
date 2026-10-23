# Are we translating a code or choosing an outcome?

Devi, employee `85005`, works in Finance. Her HR record stores the department as `"FIN"` and her worker type as `"Employee"`.

SailPoint Identity Security Cloud (ISC) needs two readable fields for an internal review screen. One should show the approved department label. The other should show which review category applies.

These sound like similar calculations. Both take text and return text. But they answer different questions.

“What does FIN mean?” needs an agreed translation.

“Does this worker type equal Employee?” needs a comparison and a choice.

Let's keep those questions separate. Otherwise, an unknown department can quietly become a real department, or a worker who is not an Employee can quietly be described as a Contractor.

## Give each output a meaning before choosing the operation

An **identity** is ISC's representation of a person or another managed entity. An **account** is that person's record in a connected system. An **attribute** is a named field on one of those records.

A **source** is ISC's configured representation of a system or collection of account data. Here, **PeopleMap Production** represents HR worker records.

The Employees **identity profile** is shared configuration governing employee identities, including how their identity attributes receive values. PeopleMap is authoritative for this population: its worker accounts establish identities through that profile.

Devi's account `pm-85005` has already been collected and correctly associated with her identity. We'll label that identity `I-85005`; this is a teaching label, not an actual ISC object ID. There is exactly one associated PeopleMap account in this example.

**Account aggregation** reads account data into ISC. We are using the already collected record, not asking a calculation to fetch a fresh HR response.

The organization has defined two custom identity attributes. “Custom” means the organization added them; their names do not create built-in ISC behavior.

| Identity field and internal name | Approved meaning |
|---|---|
| Department Review Label, `departmentReviewLabel` | Translate FIN to Finance, ENG to Engineering and OPS to Operations; use UNMAPPED for an unrecognized non-null code |
| Worker Review Label, `workerReviewLabel` | Use Standard review when workerType equals Employee exactly; use Manual review for other non-null strings |

HR owns the department-code agreement. The review-process owner approves the worker classification rule.

`"UNMAPPED"` is a visible data-quality marker, not a department. `"Manual review"` is a category label, not evidence that a review task was created or completed.

For this example, these fields are used only on the review screen. Neither controls access, employment status or account ownership. Other required identity attributes are already valid.

This restriction is deliberate. A marker that is acceptable for a review display is not automatically acceptable in a field used to decide who receives Finance access.

## A lookup translates a known key into its agreed value

A **transform** is a configurable ISC object that retrieves or manipulates data and returns a result. The supplied data is its **input**; the returned result is its **output**.

The `lookup` operation compares an incoming string against a configured **table** of key-value pairs. A **key** is the input code to recognize. Its paired **value** is the output text to return.

For our department field, `"FIN"` is the key and `"Finance"` is its value.

The table also contains `default`, the configured fallback result when an input string matches none of the listed codes. Here that result is `"UNMAPPED"`.

This is a translation table inside the definition. It is not a search through every employee, an account-ownership match, or a live query to an HR reference database.

An **identity attribute mapping** defines how an identity field receives its value. The mapping places this lookup's result in departmentReviewLabel.

The illustrative definition below uses **JSON**, a structured text format. Braces group named properties into objects. Quoted text represents strings.

The `accountAttribute` operation retrieves a named field from an associated source account. It explicitly supplies departmentCode as this lookup's input.

```json
{
  "name": "Department label for review",
  "type": "lookup",
  "attributes": {
    "input": {
      "type": "accountAttribute",
      "attributes": {
        "sourceName": "PeopleMap Production",
        "attributeName": "departmentCode",
        "accountReturnFirstLink": true
      }
    },
    "table": {
      "FIN": "Finance",
      "ENG": "Engineering",
      "OPS": "Operations",
      "default": "UNMAPPED"
    }
  }
}
```

This is a complete illustrative definition, not an actual tenant upload or a record of an executed calculation.

The root `type` chooses lookup behavior. Its `name` identifies the transform; it does not choose the destination identity field.

The `attributes` object contains the operation's settings. Inside input, sourceName and attributeName belong to accountAttribute, which obtains the data. Inside table, the keys and values describe the translation.

`accountReturnFirstLink: true` tells accountAttribute to return the first selected account's field even if it is null. Here there is only one associated account, so there is no competing-account choice. This setting does not convert a retrieval error into a value.

The main supplied retrieval returns `"FIN"`. Lookup finds the FIN entry and returns `"Finance"`. It does not return the key, the whole table or a boolean saying “matched.”

A **boolean** is a true/false value. The unquoted `true` in this JSON is a setting of that type. The returned department label is a string.

These arrows show conceptual value dependencies and branches, not private ISC services or a universal processing sequence:

```text
Identity I-85005 / account pm-85005
Read departmentCode from PeopleMap
                 |
      Supplied non-null string
                 |
       Match a configured key?
          /              \
        yes               no
         |                 |
Return paired value    Default present?
                         /       \
                       yes        no
                        |          |
                 Return default   Error

FIN -> Finance
ZZZ -> UNMAPPED with this default
```

A recognized code chooses its paired value. An unrecognized string chooses the configured default. Without a default, an unmatched input produces an error.

Do not add a default merely because an error looks inconvenient. Decide whether an unknown code should produce an approved marker or stop the calculation for investigation.

Also, the diagram starts with a supplied non-null string. It does not claim that null input, a failed account read or malformed configuration follows the ordinary unmatched-code path.

## A default cannot tell you why the code was unknown

Suppose the retrieved departmentCode is now `"ZZZ"`. The table has no ZZZ entry, so this definition returns `"UNMAPPED"`.

That result tells the review screen that no configured department translation was selected. It does not tell you whether HR introduced a new code, the integration read the wrong field, or the record contains an error.

Keep the original collected code available for investigation. The identity marker alone loses that detail.

Now suppose HR has approved a new code, `"RND"`, meaning Research. HR's approval does not edit this JSON table. The team must update the relevant configuration through its change process, check affected uses and verify reevaluation.

Until that happens, the old table still lacks RND.

A **consumer** is a configuration or system that uses a value. Before changing `"Finance"` to `"Financial Services"`, find consumers that depend on that exact output. A label correction can change comparisons elsewhere even though the original HR code is unchanged.

Representation needs an agreement too. If a producer starts sending `" FIN "` with surrounding spaces, inspect the actual input and test the configured operation. Do not assume lookup silently cleans it.

An operation called `trim` removes surrounding whitespace. A case-conversion operation changes letter case. Neither knows whether HR considers two differently represented codes equivalent.

If HR approves normalization, implement it explicitly before the translation and test the resulting code. Normalizing an unknown `"ZZZ"` still does not make it a known department.

## A conditional chooses a result after testing a statement

A **condition** is a statement that can evaluate to true or false. A **branch** is the outcome selected by that decision.

ISC's `conditional` transform uses an expression containing two **operands**, the values being compared. The supported comparison operator `eq` asks whether they are equal.

Our statement is: “Does workerType equal Employee?”

The two operands are the retrieved workerType string and the literal string `Employee`. An equal comparison chooses the **positiveCondition** output. A non-equal comparison chooses the **negativeCondition** output.

Positive and negative mean true and false branches here. They do not mean approved and denied access.

This second illustrative definition supplies the workerType value through its own accountAttribute operation:

```json
{
  "name": "Worker category for review",
  "type": "conditional",
  "attributes": {
    "workerType": {
      "type": "accountAttribute",
      "attributes": {
        "sourceName": "PeopleMap Production",
        "attributeName": "workerType",
        "accountReturnFirstLink": true
      }
    },
    "expression": "$workerType eq Employee",
    "positiveCondition": "Standard review",
    "negativeCondition": "Manual review"
  }
}
```

Here, `workerType` inside attributes is a **variable**, a named value available to the expression. Its nested transform retrieves the account field. `$workerType` refers to that returned value.

The same spelling appears as the variable name and as the account's attributeName because we chose it that way. The variable is not automatically an identity attribute, and giving it a name does not save an intermediate identity field.

The mapping places the final output in workerReviewLabel. It is a separate mapping from departmentReviewLabel. These definitions do not imply that the department calculation runs first or feeds this comparison.

For the supplied `"Employee"` input, the expression is true and the result is `"Standard review"`.

The result is not automatically the boolean true. It is the configured string from positiveCondition. Likewise, the false branch returns `"Manual review"`, not an inherent access denial.

## “Not Employee” does not mean “Contractor”

Let's change only the input to `"Contractor"`. It differs from Employee, so the negative branch returns Manual review.

Now use `"Intern"`. That also differs from Employee. It takes the same branch.

The expression tested equality with one value. It did not establish which other worker type applies.

If the negative output had been `"Contractor"`, the calculation would have described Intern as Contractor. It could return that string successfully while making a false business claim.

This is why our owner approved “Manual review” for all other non-null strings. The label says what treatment is needed, not what worker type has been proven.

The conditional comparison is case-sensitive. `"employee"` is different from `"Employee"`. With this exact definition, lowercase employee returns Manual review.

A successful calculation therefore does not prove the producer followed the expected format. If lowercase employee should mean Employee, obtain that agreement and implement the intended normalization. Do not quietly broaden the meaning yourself.

## A false comparison is not an error handler

**Null** means no value. It is different from the empty string `""`, which is text containing zero characters.

Conditional's operands cannot be null. A null operand produces an evaluation error rather than selecting negativeCondition.

An **evaluation error** means the operation could not produce its normal result. No value to compare is not the same fact as two available values being unequal.

This diagram traces the comparison boundary conceptually. It does not promise a particular internal validation order:

```text
Read workerType for identity I-85005
                 |
       Are operands non-null?
          /              \
         no              yes
          |               |
        Error     Compare with Employee
                    /           \
                  equal       unequal
                    |            |
             Standard review  Manual review

Employee -> Standard review
Intern   -> Manual review
null     -> Error, not the false branch
```

An empty string is different from null, but that distinction alone does not establish how a blank source field reaches and is handled by this expression. Inspect the retrieved value and verify the actual evaluation. Do not promise that every blank-looking input becomes a successful Manual review result.

The owner still needs to decide how absent, empty or whitespace-only worker types should be handled. Prepare those inputs through approved, supported logic or correct the producer's data. Neither an error nor a returned label repairs missing HR information.

A failed account retrieval is another problem. Do not use negativeCondition as if it were a general catch for failed reads or configuration errors.

The expression is also not arbitrary programming code. This conditional operation supports `eq`; replacing it with `gt` to compare “greater than,” or writing an imagined compound expression, is not a supported extension of this definition.

Choose a documented operation or composition that expresses the approved requirement. A date comparison needs date-aware reasoning; string equality does not establish whether employment has expired.

| Supplied situation | Meaning of the result |
|---|---|
| Lookup receives FIN with the shown table | Finance is the configured translation; correctness still depends on the input and approved table |
| Lookup receives ZZZ with the shown default | UNMAPPED is the approved review marker, not proof of any department |
| Lookup receives ZZZ with no default | No translation exists for that input; the operation returns an error |
| Conditional receives Employee | Equality is true; return Standard review |
| Conditional receives Intern | Equality is false; return Manual review without claiming Contractor |
| Conditional receives a null operand | Evaluation error; the negative branch is not selected as an ordinary false result |

## Follow the value to its destination, then check its use

The profile's **Preview** evaluates mappings for a selected identity using available data. For Devi's main inputs, the expected results are Finance and Standard review.

Preview answers a calculation question for the selected context. It does not prove that every employee has a recognized department or a non-null worker type.

**Identity processing** reevaluates identity data and related decisions against applicable configuration. Shared profile mappings can affect other identities in Employees, not only Devi.

Saving a definition is not evidence that the intended identity field has been updated. A source selector on a screen is also not enough to prove which input a transform used: our lookup contains an explicit input, and our conditional contains an explicit variable retrieval.

Inspect the saved definition and the mapping together.

For an unexpected label, work backward from the field you are observing:

- Establish the exact identity field and governing profile.
- Check the mapping and referenced definition, including its table, comparison and returned strings.
- Inspect the associated source account and exact field used by the retrieval.
- Compare available data and configuration with the context of the observed Preview or applied result.
- Check relevant processing and the current identity value before concluding that a new calculation was applied.

These are human evidence checks, not a claim that ISC automatically exposes a separate log for every key test or conditional branch.

In the fictional continuation, the team verifies both definitions, previews representative cases, reviews shared change impact and completes authorized processing. Current identity evidence then shows departmentReviewLabel `"Finance"` and workerReviewLabel `"Standard review"` for `I-85005`.

The collected PeopleMap account still contains FIN and Employee. These calculations did not rewrite HR.

**Provisioning** makes account or access changes in a connected system. Neither label establishes that a target write was configured, attempted or completed.

If a consumer later uses workerReviewLabel to create a task, that is additional configured behavior with its own evidence. The words “Manual review” do not create the task themselves.

If HR later changes the available workerType to Contractor, the same conditional can return Manual review on relevant reevaluation. It does not watch the live HR database continuously. Collection, reevaluation and the applied result each need evidence.

## Change one fact and follow the consequence

### 1. The department is recognized

**Facts:** The account retrieval returns FIN. The table pairs FIN with Finance. The mapping targets departmentReviewLabel.

What value does the lookup return, and what does it leave unchanged?

**Reasoning:** It returns Finance. The mapping supplies the destination; the transform's friendly name does not. The calculation does not change the collected FIN code or prove a write to HR.

### 2. A new code has not reached the table

**Facts:** Retrieval returns RND. HR has approved Research, but the saved table still contains only FIN, ENG, OPS and the UNMAPPED default.

Will approval alone make the result Research?

**Reasoning:** No. The evaluated configuration has no RND translation, so it returns UNMAPPED. Confirm the approved meaning, update the relevant table through change control, then verify calculation and application. HR approval is authority for a change, not evidence that configuration already changed.

### 3. The default was removed

**Facts:** Retrieval successfully returns ZZZ. No table key matches it, and no default is configured.

Should the result be ZZZ, empty text or Finance?

**Reasoning:** None follows. An unmatched lookup without a default returns an error. Choose a justified unknown-code policy; do not invent a result to hide the gap.

### 4. The wrong known code arrived

**Facts:** Devi's approved department is Finance, but the selected collected field incorrectly contains ENG. The table correctly maps ENG to Engineering.

Did lookup fail?

**Reasoning:** The lookup can succeed and return Engineering while the business result is wrong. Check why that account field contains ENG, including selection and collection evidence, and correct the responsible data or mapping defect. Changing ENG to mean Finance would break the valid translation for Engineering workers.

### 5. A new worker type takes the false branch

**Facts:** workerType returns Intern. The expression tests equality with Employee. The negative output is Manual review.

Does this prove Intern means Contractor or that a review task exists?

**Reasoning:** Neither. It proves the available strings are unequal and selects the configured label. Determining worker classification and creating a review task require their own approved information and configuration.

### 6. Only the letter case changed

**Facts:** workerType returns lowercase employee. The expression still compares with Employee, and no normalization is configured.

Which result follows?

**Reasoning:** Manual review, because the comparison is case-sensitive. Decide with the data owner whether those representations should be equivalent. A change to normalization is a design change, not a fact established by the false branch.

### 7. A blank screen hides the actual input

**Facts:** In one evaluation, retrieval successfully returns null. For a second worker, the screen looks blank, but no one has checked the actual retrieved value or evaluation result. The right operand is Employee in both.

Can you report that both workers take the false branch?

**Reasoning:** No. The confirmed null operand produces an error, not an ordinary false result. The second observation is insufficient: establish whether the input is null, empty text, spaces or a failed retrieval, then check its evaluation. Do not turn a visual blank into an assumed comparison result. The approved missing-data policy still needs implementation.

### 8. Preview changed, but current state was not checked

**Facts:** Updated collected data contains Contractor. Preview returns Manual review. The only checked current identity value is an earlier Standard review.

Can you report that the identity field and review screen now show Manual review?

**Reasoning:** Not from this evidence. Preview establishes a result in the selected calculation context. Verify relevant application and the current identity field, then the screen's displayed data. Do not treat an old observation as proof that new processing failed, either.

## Try the decision on a different field

A facilities team supplies site codes. Its approved table says NYC means New York and LON means London.

An engineer proposes defaulting every unknown code to New York because most workers are there. Another proposes a conditional: “If site equals NYC, return New York; otherwise return London.”

An account now contains the new code SGP. Its approved location has not yet been supplied to the team.

Would either proposal establish the right site?

Neither would. The default fabricates New York. The false branch fabricates London because “not NYC” does not mean LON.

Ask for SGP's approved meaning and decide how unrecognized codes should be represented until the mapping is updated. A review-only unknown marker can be acceptable if its consumers and correction process respect that meaning. A missing or failed retrieval still needs its own handling.

When you explain the design to another engineer, begin with what each output is allowed to mean. Then identify the actual input, the matching or comparison rule, the unknown and error paths, and the evidence needed after application.

A returned string tells you what the configured calculation selected. Its business meaning still needs to be true.
