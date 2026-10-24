# Her department changed. Why does she still have the role?

HR has moved Devi to a new team. An administrator opens SailPoint Identity Security Cloud, or ISC, and still sees her old role.

Should you remove it manually, run another aggregation, process the identity, or investigate the application?

Before choosing an action, we need to establish **which change has actually reached which record**. “Her department changed” could mean HR approved a move, ISC collected the new value, or ISC has already evaluated access using it. Those are different facts.

There is also a second question hiding inside the first: even if the role disappears in ISC, has the old access actually disappeared from the application?

## Start with the assignment that exists

Devi, employee **120505**, reviews archived records for RecordsOps. Her ISC identity represents her as a person. It is linked to her HR employee record and her existing **ArchiveGate Production** account, **ag-120505**.

Those links are account correlation: ISC associates source accounts with the identity they belong to. A **source** is ISC's configured representation of a managed system and its account data. The connector supplies the integration used to read or change that system.

Devi holds the enabled standard role **R-1205, Archive reviewer** through automatic membership criteria. A role groups the access needed for a responsibility. Here it contains one enabled access profile, a bundle of rights from ArchiveGate Production:

- **AG-8501, ArchiveReaders**, permits reading North archive records.
- **AG-8502, ArchiveAnnotations**, permits adding annotations to North records, but only when ArchiveReaders is also held.

These group memberships are entitlements: access rights represented in ISC for the source. Neither group permits export, deletion, or administration.

Her account is enabled, she can sign in, and its resource scope is North. Both groups are already present and the review task works. No other role, lifecycle assignment, request, or native grant requires either group in this main example.

The automatic criteria require all three current identity values:

- Department equals `RecordsOps`.
- Job code equals `ARCHIVE-REVIEW`.
- Lifecycle state equals `working`.

A lifecycle state represents a stage such as working or departed. Here `working` is the configured technical name; its associated identity state is Active, so the ordinary processing routes discussed below include Devi.

All systems, records, permission rules, configurations, times, and outcomes in this example are fictional. Assume the integration supports the required group additions and removals. We are following ordinary standing access, not session-by-session activation.

## Which department does the role actually read?

The role's department condition is an **Identity Attribute** condition. It reads the department on Devi's ISC identity, not every field called department across her accounts.

An **identity profile** defines how identity attributes are populated. In this example, its mapping takes department and job code directly from the collected HR employee record. A mapping connects an input field to the identity value ISC uses. A transform, when configured, calculates or changes that input before producing the identity value; there is no department transform in our main setup.

Now HR changes Devi's department to `Quality` and her job code to `QUALITY-PLAN`.

That correct HR record does not, by itself, prove ISC is already using those values. **Aggregation** reads account data from a source into ISC. Until the HR record has been collected and the identity data updated, the role may still be evaluated against older information.

Be precise about the records:

- The HR system has the producer's current work information.
- The HR source account in ISC contains what ISC collected.
- The ISC identity contains the values produced by its applied mappings.
- The role assignment reflects the membership decision that was applied.
- The ArchiveGate account contains the rights actually present in the application.

They describe the same person, but they are not one shared, instantly updated record.

```text
HR: approved current work changes
                |
Aggregation reads employee record
                |
ISC stores collected account data
                |
Identity processing uses mapping
                |
Current identity values
                |
Evaluate enabled role's selector
                |
Match gained / retained / lost
                |
Compare access requirements
                |
Source operations if required

These are dependencies, not a promise
that every stage succeeds immediately.
```

The arrows describe information and processing dependencies. They do not promise an exact private engine sequence, a fixed delay, or that all source writes succeed.

## A different value matters only if the selector uses it

Before the move, the three required comparisons are true. After the new HR values become Devi's current identity values, the department and job comparisons are false while the working comparison remains true.

With AND between these conditions, the complete selector no longer matches.

| Current identity values or change | Result for this role's stated criteria |
|---|---|
| RecordsOps, ARCHIVE-REVIEW, working | Match: all three conditions pass. |
| Quality, QUALITY-PLAN, working | No match: department and job differ. Being employed is not enough. |
| RecordsOps, ARCHIVE-REVIEW, working; telephone number changed | Still a match. Telephone is not an input to this selector. |
| Quality, ARCHIVE-REVIEW, working | No match: the department condition fails even though the old job value remains. |
| RecordsOps, ARCHIVE-REVIEW, prehire | No match: the lifecycle condition fails. |
| Department or job value is missing or its calculation failed | Investigate the actual current value, mapping result, and evaluation. Do not invent a universal missing-value outcome. |

The important test is not “did anything on the identity change?” It is “what does the complete role selector decide with these current inputs?”

A new manager might change who reviews future requests without affecting this role at all, because manager is not among its criteria. A location change has the same limitation unless location participates in the selector or another relevant control.

Equally, losing one matching branch does not guarantee loss of membership. Suppose a different role has two complete groups joined by OR: RecordsOps archive reviewers **or** Quality investigation reviewers. A move into the second approved group can preserve a match. Inspect the entire expression rather than stopping at the first failed row.

## When does ISC apply that decision?

**Identity processing** recalculates identity information and access requirements using the applicable configuration. It connects current data to decisions such as automatic role membership.

When aggregation or provisioning modifies an identity, event-based processing can follow. Scheduled processing covers eligible identities under its configured conditions. Administrators also have manual processing routes, including processing selected identities.

These routes do not replace one another indiscriminately:

- Reprocessing an identity cannot fetch an HR change that has not been collected.
- Collecting a new HR record does not prove every downstream source operation completed.
- Saving a changed mapping is not the same as applying it.
- A scheduled run's expected start is not evidence that Devi was included and evaluated.

Our main case changes input data, not the role definition. You do not need to edit a correct role every time a worker moves. What you need is the correct data, the correct mapping, and a relevant evaluation.

If you do change a shared mapping or role definition, review and apply that configuration through the appropriate processing route. Do not assume an unchanged source record will independently prove your configuration change was applied.

Also keep **identity processing** separate from **attribute synchronization**. Attribute synchronization writes configured identity values into corresponding source-account fields. Updating a target's department text is not itself proof that ISC withdrew the role's group entitlements.

## Follow the move through supplied observations

The move is effective on **October 27, 2026, at 09:00 UTC**. These are example observation times, not service guarantees.

| Supplied observation | What it establishes, and the next question |
|---|---|
| 09:00: HR now records Quality and QUALITY-PLAN | The producer has changed. Has ISC collected that employee record? |
| 09:20: ISC's collected HR account still contains RecordsOps and ARCHIVE-REVIEW | ISC still has old input for the stated mapping. Processing that input is not a way to discover the unseen HR update. |
| 09:30: aggregation has collected Quality and QUALITY-PLAN for employee 120505 | The new input has reached ISC. Check the current identity values and relevant processing, not only the aggregation's overall result. |
| 09:35: supplied identity and assignment evidence shows Quality, QUALITY-PLAN, working, and withdrawal of the automatic Archive reviewer assignment | The applied membership decision reflects the new inputs. This does not establish native group removal. |
| 09:40: the Annotations removal reports success; the Readers removal reports a target permission error | The removal attempt is partial. Investigate the failed operation against ag-120505. |
| 09:50: native account inspection shows Readers only; reading North works, annotation fails | Some old capability remains despite the withdrawn role. The observed task matches the residual rights. |

At 09:20, an old role is consistent with old ISC input. At 09:50, remaining access has a different explanation: membership withdrawal happened, but a source operation failed.

Those situations need different corrections. Repeating the same action for both wastes time and can obscure the real problem.

At 09:40, inspect why the integration lacks permission for the Readers removal. A connector supporting a removal operation does not prove its current credential is authorized to perform that operation on this target. Correct the verified cause under the organization's change controls, use a supported recovery path, and check the actual result.

Do not assume every failed removal is retryable or that another routine identity-processing run will repair it. The operation's status and error determine what recovery is available.

```text
BEFORE: automatic match
RecordsOps + ARCHIVE-REVIEW + working
                |
        Archive reviewer role
                |
       Readers + Annotations

AFTER: no automatic match
Quality + QUALITY-PLAN + working
                |
     Role assignment withdrawn
                |
      Source removals attempted
           /            \
Annotations removed   Readers rejected
           \            /
     Native account: Readers remains
                |
     Can read; cannot annotate

Role gone does not prove rights gone.
```

Here, no retained requirement protects Readers. Its presence is a supplied delivery failure, not a justified entitlement retained by another role.

The account itself remains. Removing a role's entitlements is not an instruction to delete the account or disable its sign-in.

## Losing the role is different from editing its contents

In the move, the role still contains Readers and Annotations for people who remain eligible. Devi stops qualifying for the role.

That is an **assignment change**: the relationship between a person and a role changes.

Removing Annotations from the role's shared definition is a different operation. That is an **access-content change** affecting what the role represents for its members. ISC's role access-removal propagation setting matters for specified definition changes.

Do not use that setting as a blanket explanation for every mover problem. First establish whether the event was loss of membership, a shared definition edit, a requested-assignment revocation, or a failed source removal. The same visible group can be involved in each, but the governing mechanism differs.

There is another legitimate reason for residual access. In a separate variation, Devi still holds another assigned role requiring ArchiveReaders. Ending Archive reviewer would not eliminate the remaining role's requirement for Readers. You would investigate the retained role's justification, rather than repeatedly trying to remove a right ISC is still supposed to maintain.

This does not establish a universal reference-counting rule for every possible grant origin. Trace the specific assignment mechanisms involved.

## What if the role came from a list or a request?

The main example uses data-driven Standard Criteria. Do not transfer its conclusion unchanged to every assignment.

With **Identity List** membership, the role's automatic selector is a maintained list of ISC identities. A department change does not remove Devi from that list merely because a former department rule would fail. Check the selected identities and the approved maintenance process.

With a **requested role**, the basis is a particular access request, potentially with approvals and dates. An access request asks for specified access for a recipient; it is not evidence that the recipient matched automatic membership criteria.

A job change alone does not establish that every requested assignment has expired or been revoked. Inspect that assignment's conditions, dates, history, and applicable lifecycle controls. Choose the correct assignment and account targets before using a supported revocation route.

Conversely, an ordinary removal request is not an override for a continuing automatic membership requirement. If a currently valid criterion keeps selecting Devi, the design or its input needs an authorized correction. Falsifying her source record to force a mismatch is not a sound access-removal procedure.

## Effective dates and incomplete inputs need deliberate reasoning

A project move can be approved today but become effective next month. If HR publishes the future department early and the mapping simply copies it, the department criterion has no hidden knowledge that it should wait.

The design must provide the appropriate current value, or deliberately calculate it from approved effective-date information. Where time-dependent calculation is used, reevaluation also needs an appropriate configured trigger. Adding a date field that no mapping or selector reads does not create a time gate.

The same care applies to partial updates. Suppose department arrives as Quality while job code remains ARCHIVE-REVIEW. Our AND selector is already false. If the business needs an atomic effective record, the data contract must address that. ISC cannot infer an unpublished business intention from two inconsistent fields.

Do not repair incomplete data with an unconditional fallback to the old privileged job. A fallback can hide a broken feed and preserve access that should be reconsidered. Establish the approved policy for incomplete records, the calculation's actual output, and the access consequences before applying a correction.

These are reasons to test realistic transitions, not only neat final records.

## Use the screens as evidence, not as substitutes for the flow

The source's aggregation history helps establish whether a collection ran and what its scope and outcome were. It is not a per-person certificate that the correct role decision and all native removals finished.

The collected HR account lets you inspect the input record. The identity's current details and profile mapping connect that input to the values the role uses. Preview can help check a proposed mapping against selected data, but a preview result is not the applied identity or delivered access.

The role's assignment configuration explains the selection logic. Assignment information establishes which role relationships currently exist. Provisioning activity supplies evidence about particular source changes. Finally, native account and task checks show what ArchiveGate permits.

Search and other views can also have different observation or synchronization times. If one view still shows an older state, compare the underlying records and timestamps before rerunning a write. A delayed display and an unsuccessful removal are different defects.

If processing seems absent, also verify the identity's processing scope. Inactive (long-term) identities are excluded from ordinary scheduled processing and list-page Apply Changes for roles, profiles, and applications; selected-identity and identity-profile processing have different inclusion rules. A processing action existing in the UI does not prove it covered the identity you are investigating.

## Work through the evidence

### Case 1: HR is correct, but ISC still has the old record

**Facts:** HR says Quality. The HR source account in ISC still says RecordsOps, and the identity maps department from that account.

**Reasoning:** The known gap is collection of the new input. Verify the correct employee, source scope, collected record, and aggregation outcome. Reprocessing the old record cannot supply the unseen HR value.

### Case 2: The new record arrived, but department stayed unchanged

**Facts:** ISC collected Quality from HR. Inspection shows the identity's department mapping actually selects a directory field that still says RecordsOps.

**Reasoning:** The changed HR field is not the selected input. Compare the mapping with the approved data contract. If HR should govern this field, correct and apply the mapping under change control, then inspect the resulting identity and role decision. Do not rewrite correct HR data to imitate the directory.

### Case 3: The identity changed, but membership did not

**Facts:** Only Devi's phone number changed. Her department, job code, and lifecycle values still satisfy all three main criteria.

**Reasoning:** A relevant evaluation still has a valid match. A changed identity is not automatically an ineligible identity. No role removal follows from the stated policy merely because some field changed.

### Case 4: One criteria group failed

**Facts:** A different role has RecordsOps archive-review criteria OR Quality investigation-review criteria. The move makes the first complete group false and the second complete group true.

**Reasoning:** The role still matches through the second alternative. Check the entire approved expression. Deleting a valid assignment because one branch failed would misread OR.

### Case 5: A future move took access away early

**Facts:** HR publishes Quality today with an effective date next month. The mapping copies department without considering that date, and the role tests department directly.

**Reasoning:** The calculation has no time gate. Establish the approved current/effective data contract and any required time-based calculation and processing. The mere presence of an effective-date field does not tell this selector to wait.

### Case 6: Her name remains in an explicit list

**Facts:** A separate role uses Identity List. Devi is still selected after her department changes.

**Reasoning:** Department is not the stated membership test. Investigate whether list maintenance is overdue and obtain the authorized change. Do not assume a data-driven department rule is running behind that explicit list.

### Case 7: The role is gone, but reading still works

**Facts:** In the main timeline, the automatic assignment ended. Readers removal reported a permission error, and native inspection confirms Readers remains. There is no other requirement for it.

**Reasoning:** This is a known fulfillment failure after membership withdrawal. Recover the exact removal and verify the account and native read outcome. Another successful identity calculation is not evidence that the failed source write recovered.

### Case 8: The old department was restored after a mistake

**Facts:** HR confirms the move was entered in error and restores RecordsOps/ARCHIVE-REVIEW. The corrected record is collected, the identity values become current, and relevant processing finds a match again.

**Reasoning:** The enabled automatic policy supplies a basis for assigning the role again. Check subsequent delivery of required rights; do not assume the correction erased the earlier removals, repaired all failed operations, or restored every former native condition. Preserve the history of both transitions.

## Follow a location change in a different project

A laboratory instrument role is automatically assigned to working analysts at the North site. It includes an instrument-login entitlement on one source and a results-folder entitlement on another. An analyst transfers to South.

What would you establish before declaring North access removed?

First inspect which fields the actual selector reads, where those values come from, and whether the approved effective move reached the current identity. Then evaluate the complete criteria and confirm the relevant membership decision.

After that, inspect each target account and operation separately. A successful results-folder removal does not prove instrument-login removal. Do not promise that withdrawal of North access and delivery of any South access form one atomic transaction or occur in a guaranteed source order.

If the business requires no period of overlapping site access, or cannot tolerate a gap, that requirement needs an explicit supported transition design and testing. It is not satisfied simply by drawing two role arrows beside each other.

When you explain a mover outcome, connect the evidence: **the work changed here, ISC received these values, this selector made this decision, and these target rights did or did not change.** That explanation tells you where an engineer should investigate next.
