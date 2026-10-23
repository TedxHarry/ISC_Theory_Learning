# The mapping is saved. What still needs to happen?

Devi's source account already contains the correct cost centre, but SailPoint Identity Security Cloud (ISC) shows an older value on her identity.

An administrator finds the cause: the identity mapping reads a legacy field instead of the current cost-centre field. The administrator corrects the mapping and saves it. Preview now returns the right value.

Has the change been applied to Devi? Has it been applied to everyone using that mapping? Has any resulting access change reached the application?

Those are different questions.

**Manual identity processing** is an administrator-initiated reevaluation of identity information and applicable requirements. It provides a supported way to apply configuration changes without waiting for an unrelated source-data change.

It is not a general “make everything correct” operation, and it is not a harmless substitute for understanding the change's scope.

## Put the saved configuration beside the actual records

Devi's employee number is 94004. Her ISC **identity** is the record representing her as a person. We will label it I-94004; that is a teaching label, not an actual ISC object ID.

Her correctly associated HR account is `sl-94004` on StaffLedger Production.

A **source** is ISC's configured representation of a system's account data. An **account attribute** is a field on a source account. An **identity attribute** is a field on the identity.

The account data is already collected into ISC and contains two distinct fields:

- `costCenter = "0042"`, the approved current cost centre.
- `legacyCostCenter = "0088"`, a retained historical value that must not supply the current cost centre.

Both values are text. The leading zeros are part of their representation.

StaffLedger is authoritative for the employee population: its worker records establish and maintain the related identities. The Employees **identity profile** supplies shared configuration for them.

The profile's costCenter **mapping** tells ISC how to obtain the identity costCenter. Its old configuration reads the account's legacyCostCenter. Its approved replacement reads the account's costCenter directly.

No transform or fallback is needed. A **transform** is a calculation used to prepare a value; adding one would not repair choosing the wrong source field.

Devi's identity currently has 0088 because of the old mapping. Her source account does not need another HR edit to supply 0042.

The business owner has approved both the field correction and its access consequences.

An enabled automatic role called Finance Baseline tests whether identity costCenter equals the text 0042. A **role** groups configured access and can assign it using identity conditions.

Finance Baseline contains the enabled Finance Tools **access profile**, a bundle of access from FinanceDirectory. It includes an **entitlement**, the governed representation of membership in group `FT-BASE`.

This is ordinary ongoing access, with no separate activation step. Devi already has correctly associated FinanceDirectory account `fd-94004`, which initially lacks FT-BASE. The source supports the group-add operation and has provisioning enabled.

There is no 0088-based access assignment to remove, no cost-centre attribute sync, and no account creation in this example. Other mappings and access configurations are assumed reviewed and unchanged.

These records, approvals, actions and results are fictional. No real tenant or target account is changed.

## Save, Preview and application answer different questions

**Save** establishes the configuration you have stored. For this case, we verify that the saved Employees mapping selects StaffLedger costCenter, not legacyCostCenter.

**Preview** evaluates mappings for a selected identity using available data. A result of 0042 tells us that this selected evaluation produces the expected value.

It does not prove the current identity costCenter has changed. Check that record separately.

It also does not establish that the role was assigned or that FinanceDirectory accepted FT-BASE membership. Preview is not an external provisioning test.

**Applying the change** means initiating the relevant supported processing and verifying its results for the intended population.

A saved definition, a proposed result and an applied result are separate facts.

There is another boundary worth keeping clear: Save is not a private staging area.

Role configuration is used when identities are analyzed, and shared mappings or definitions can be consumed by relevant processing. A selected Preview or a plan to process only Devi does not create an isolated copy of the saved configuration.

Do not assume nobody else can encounter a saved shared change until you choose your preferred application action. Plan the timing, other processing and change coordination accordingly.

Where available, use an appropriate test environment before introducing a consequential shared change into production.

## Start with who the configuration can affect

Employees currently contains twelve identities. All twelve are in the Active identity state.

An **identity state** controls participation in ISC processes and features. Active and Inactive (short-term) are distinct states used in processing scope rules; a person's business department is not their identity state.

Our reviewed population is:

| Population group | Collected input, expected identity value and role effect |
|---|---|
| Four identities, including Devi | legacyCostCenter 0088; current account costCenter 0042. The correction should change identity costCenter to 0042 and newly satisfy Finance Baseline. |
| Two identities already using the same value in both fields | Both account fields contain 0042. The corrected mapping should keep identity 0042; these identities already have the role and confirmed FT-BASE access. |
| Six identities with another unchanged cost centre | Both account fields contain 0090. The corrected mapping should keep identity 0090; the role condition remains false. |

Four plus two plus six gives twelve. Six should satisfy the role condition after the corrected mapping is applied, but only four are newly eligible because of this correction.

That is a prediction from the supplied records and configuration. It is not proof that six target accounts already have membership.

No external write is required merely to make the two already-correct identities look newly processed. Their correct existing access can remain unchanged.

Review consumers before application. A **consumer** is a configuration or system that uses the value. Here, Finance Baseline consumes costCenter.

In another project, costCenter might also supply account attributes, routing, lifecycle calculations or other roles. A **lifecycle state** is a business-stage configuration that can drive access. **Manager correlation** resolves manager information to the corresponding identity.

Identity processing can evaluate applicable responsibilities beyond the one field you are investigating. Knowing that the current change is small does not prove every consequence is small.

If a mapping uses a shared referenced transform, inspect its other callers too. A **reference** reuses another named transform's instructions; a caller is a calculation using that shared definition.

A profile-local application does not prove that every caller in another profile has been evaluated.

## Choose the processing path by its actual scope

ISC supports several manual entry points. Their names do not make their populations identical.

| Supported action | Scope and interpretation |
|---|---|
| Apply Changes on an identity profile | Initiates processing for identities associated with that profile. For our Employees example, the reviewed profile population is twelve identities. |
| Apply Changes from the role, access-profile or application list pages | Uses the documented broader Active and Inactive (short-term) identity population. Do not assume it is limited to the one role, person or editor row that prompted the work. |
| Process Identity | Initiates processing for the selected identity. It is not restricted to recalculating only the cost-centre field or only the newly edited setting. |
| Process Identities | Initiates processing for the selected set of identities. Selecting several people does not apply the shared change to every other affected person. |

For these list-page actions, roles, access profiles and applications are processed together. Choosing the role list is not a switch for applying only the single role you edited. These are ISC configuration areas, not commands to restart the external business applications.

The identity-profile path's documented scope is its associated identities. Do not automatically substitute the broader list-page path's identity-state filter for that profile scope.

Conversely, do not assume the broader list-page path includes every identity state. Check which population the chosen action covers.

Selected-identity processing can supply useful evidence for a particular case. It is not a substitute for defining and completing the wider application scope.

It also is not a production safety barrier. The saved shared configuration remains shared.

For our correction, a supported selected-identity evaluation can establish Devi's actual result. A later Employees profile application can cover the twelve reviewed identities. Those are different claims even when the same saved mapping is used.

The decision is not simply “small button or big button.” It is which identities require reevaluation, what other applicable configuration they may encounter, and which outcomes must be verified.

## Processing uses current inputs and applicable configuration

A **connector** provides the supported integration with the external system. **Account aggregation** reads account data through that integration, or imports it from a file-based source.

Manual identity processing does not make missing or stale producer data appear. It uses the inputs available to the relevant calculations.

For Devi, the approved account field 0042 is already available. The defect is the mapping's selection, so a new HR edit is unnecessary.

If the account in ISC instead still contained an outdated current cost centre, processing that same input would not magically retrieve HR's newer value. Investigate collection first.

Likewise, do not use an optimized aggregation as an unexplained substitute for applying a saved mapping change. An existing unchanged account can be skipped during optimized account processing.

The UI action named Aggregate Account has its own narrower documented scope: it reloads account data without synchronizing the new data into identity attributes or affecting provisioning. It is not another name for Process Identity.

For the manual processing itself, applicable identity mappings and decisions can be reevaluated. If the corrected identity costCenter is 0042, Finance Baseline can now require Finance Tools.

**Provisioning** carries out required account or access changes through a supported automatic or manual delivery path.

The identity's correct cost centre and its role assignment explain why FT-BASE should be delivered. They do not establish that the group-add operation succeeded.

Here are the boundaries for the main example:

```text
Already collected sl-94004
costCenter 0042 / legacy 0088
                 |
saved mapping now selects costCenter
                 |
      +----------+----------+
      |                     |
selected Preview     relevant processing
      |                     |
proposed 0042        verify current 0042
                            |
                    verify role assignment
                            |
                    group-add provisioning
                            |
                    verify target FT-BASE

Preview does not perform the target write.
```

The arrows show dependencies and evidence responsibilities. They are not private backend services, a universal execution order for every identity field, or guaranteed delivery.

## Follow one identity without claiming the population is done

All observations below occur on October 23, 2026, in UTC, Coordinated Universal Time.

At 12:00, the approved Employees mapping is saved and its selected source field is verified.

At 12:05, Preview for Devi returns 0042. A separate current identity observation still shows 0088.

This establishes the difference between the proposed and current results at that moment. An old screenshot alone would not establish the current value, but here the current record has been checked.

At 12:10, the authorized selected-identity processing is initiated for I-94004.

At 12:12, relevant processing and current identity costCenter 0042 are verified. Finance Baseline assignment is also verified.

At 12:13, the FT-BASE add operation reports insufficient permission. At 12:14, a fresh FinanceDirectory observation confirms that fd-94004 still lacks the group.

The mapping correction has worked for Devi's identity. The resulting access delivery has a separate failure.

At 12:15, the other eleven current identity values are checked. The other three identities needing the correction still show 0088. The two already-correct identities show 0042, and the remaining six show 0090.

One selected identity's success has not corrected the other three affected identities in these supplied observations.

This is current evidence for the stated example, not a promise that other identities could not be processed for another reason. We have checked their values rather than assuming selected processing isolated the change.

Here is the same evidence progression:

```text
12:00  corrected shared mapping saved
12:05  Preview 0042 / current 0088
12:10  selected identity processing starts
12:12  current 0042 / role verified
12:13  group add reports permission error
12:14  target group still absent
12:15  other affected values still old

Identity correction: verified for Devi.
Population application: not complete.
Target membership: failed at last check.
```

This is a fictional observation timeline, not a timing guarantee or a prescribed job sequence.

## Apply the reviewed scope, then verify the required results

Before broad application, confirm the saved configuration is still the reviewed version.

If another administrator changes an unrelated role or shared transform after your review, the operation can encounter different applicable instructions from the ones you assessed. Do not treat your earlier Preview as approval for those later changes.

For broader role/access-profile/application application, ISC offers Review recent configuration changes before starting the job. It opens a predefined search for changes since the last manual processing initiated through those list pages.

That helps identify change scope. It is not a guarantee that only your edit will be processed, a complete dependency analysis, or an isolation mechanism.

Coordinate related approved changes rather than repeatedly applying one tiny edit after another. Broad processing consumes time and resources. The set should be reviewed and coherent, not an unexamined pile of unrelated edits.

In the fictional continuation, the approved Employees profile application is initiated at 12:20.

At 12:25, the relevant application has finished and current identity results are verified across the twelve reviewed identities: four corrected to 0042, two retained at 0042, and six retained at 0090. The six qualifying role assignments are also verified.

That supports the intended population's identity and role outcomes.

It does not establish target membership for every qualifying person. Devi's last target observation is still the failed 12:14 check. Do not silently turn that historical observation into a new current failure or a new current success at 12:25.

Recheck her target result and follow up on the missing permission through the authorized delivery path. Check the other required access outcomes separately.

Do not assume Apply Changes is a universal retry command for every previously failed provisioning item. The needed recovery depends on the actual failed operation and supported mechanism.

A manual-processing job's successful completion is not the end of the evidence chain.

## Keep proof of processing separate from proof of delivery

ISC can display active processing jobs, and audit records are available for manual processing initiated with Apply Changes.

Those records help establish that the relevant operation started and completed. Keep the scope, time and associated outcome together.

A completion event does not prove that every predicted value was correct or every required external change succeeded.

Check current identity values and assignments against the approved population prediction. Explain unchanged results where they are expected.

Then inspect provisioning activity for the exact source, account, operation and result. Where required, confirm the current target state.

For our example, “the profile application finished” and “all four newly required memberships are confirmed” are different acceptance statements.

A source total or job count does not replace record-level evidence for those statements. Equally, one successful target observation does not establish all four.

Also distinguish Search visibility from the underlying identity and target observations. A record appearing in a search view is not itself proof of a group-add result.

When a result cannot yet be verified, name that gap. Do not close the change simply because the most visible status is green.

## Restoring instructions does not undo completed effects

Suppose an application check discovers that the approved mapping change was wrong for part of the population.

Restoring the previous mapping changes the instructions for later evaluation. Saving the old configuration is not a transaction rollback of every identity value and external write already produced.

Affected identities may need supported reevaluation under the corrected configuration. External changes need their own authorized correction and verification.

Do not blindly remove FT-BASE from everyone in the profile. Some people may have a legitimate assignment through another approved route, and two had the access correctly before this change.

A **compensating correction** is a new authorized action intended to repair an earlier effect. It needs a specific target and requirement; it is not an assumption that all previous work disappears.

Preserve the before-and-after evidence so that you can distinguish newly introduced effects from valid preexisting state.

Likewise, repeatedly processing the same incorrect mapping will not repair it. Verify the cause before choosing another run.

## Work through the application decisions

### 1. Save and Preview look correct

**Facts:** The corrected mapping is saved. Preview returns 0042 for Devi. Current identity costCenter is separately checked and remains 0088.

Has her identity correction been applied?

**Reasoning:** Not in the supplied current observation. Save establishes the instructions and Preview establishes a selected result. Use the relevant supported processing path and verify the current identity. Do not infer a target write from either observation.

### 2. One identity has been processed

**Facts:** Devi now has current 0042. At the later current check, the other three identities requiring correction still have 0088.

Is the twelve-person population application complete?

**Reasoning:** No. The evidence establishes Devi's correction and the remaining old values. Selected processing does not constitute application to every affected person. Plan and verify the reviewed wider scope; do not rely on assumed isolation or unobserved automatic processing.

### 3. The current identity is already correct

**Facts:** One of the two already-correct identities has both account fields 0042, identity costCenter 0042, the required role and confirmed FT-BASE access.

Must another field change or membership addition occur to prove processing?

**Reasoning:** No. The corrected mapping can legitimately preserve those results. Verify the appropriate processing and current state; unchanged correctness is not a defect and a duplicate write is not a required success signal.

### 4. Apply Changes is chosen from a list page

**Facts:** An administrator edited one role and plans to use Apply Changes from the role list.

Can the administrator assume the operation touches only that role's current members?

**Reasoning:** No. The documented list-page scope includes Active and Inactive (short-term) identities. It also processes roles, access profiles and applications together, not just the edited role. Review applicable recent changes, eligibility and shared consumers before application. The edited row does not define the whole processing population.

### 5. An optimized source run is repeated

**Facts:** The account inputs remain unchanged, the defect is the saved field selection, and optimized aggregation skips existing unchanged records.

Is another identical source run sufficient proof of mapping application?

**Reasoning:** No. It does not establish the required identity reevaluation and current results. Use the supported application/processing path for the configuration correction. If input data were stale, that would be a separate collection problem.

### 6. One selected identity is a proposed safety barrier

**Facts:** A consequential shared role change has already been saved. Someone says it cannot affect anyone else because only Devi will be processed manually.

Is that isolation guaranteed?

**Reasoning:** No. The saved shared configuration can be encountered by other relevant identity processing. Selected scope does not create a private version. Use coordinated change control and appropriate preproduction testing rather than treating a selected run as a sandbox.

### 7. Population processing finished

**Facts:** All twelve current identity results and six qualifying role assignments are verified after profile application. Devi's last target check was the earlier failed group-add outcome; target state has not been rechecked since then.

Can you claim her membership is now present, or definitely still absent?

**Reasoning:** Neither current claim follows from that historical observation alone. Recheck the operation and current target membership. Population processing is not proof of delivery, and an old failure is not a new target-state observation.

### 8. The previous mapping is restored

**Facts:** Some target writes succeeded before a correction was reconsidered. The old mapping is then saved.

Are those writes automatically undone by that save?

**Reasoning:** No. Restoring instructions does not itself reverse completed effects. Identify affected identities and legitimate existing assignments, then authorize and verify the required reevaluation and compensating changes. Do not remove access indiscriminately.

## Apply the same reasoning to a manager correction

A contractor profile's manager mapping is corrected. Preview returns the expected manager-reference value for one person. The project proposes applying the profile change and immediately marking every approval route fixed.

What would you need to establish?

Identify the associated contractor population and the actual manager input. Confirm the mapping and manager-correlation configuration, which resolves that input to the appropriate manager identity.

Inspect representative variations, including missing or unmatched references, before broad application. A correct sample does not establish every manager relationship.

Choose the supported application scope and verify the current resolved manager for the required identities.

Then identify the approval process that uses the relationship and when it selects or records its approver. A corrected current manager does not, by itself, prove that an already-created approval was rerouted.

If approval repair is required, it needs its own supported authorized action and evidence.

The useful change record explains which instructions changed, which identities were reevaluated, which current results were verified, and which separate effects are complete or still open. “Saved and applied” is too short when it hides any of those distinctions.
