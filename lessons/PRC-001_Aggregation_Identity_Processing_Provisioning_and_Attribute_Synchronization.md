# The data changed. Which process needs to act?

HR changes Devi's department from Finance to Engineering. A support ticket says, “The HR aggregation finished, but her application is still wrong.”

Which part is wrong?

The account data collected into ISC might still show Finance. The identity might show Finance even though the collected account shows Engineering. Or the identity might be correct while a connected application still has the old department or lacks the required group.

Those are different observations. Repeating the same action for all of them can leave the real cause untouched.

In SailPoint Identity Security Cloud, or ISC, **aggregation** brings account information in, **identity processing** reevaluates identity information and applicable access decisions, and **provisioning** carries out account or access changes. **Attribute synchronization** uses configured identity-to-account mappings to keep selected account fields aligned through provisioning.

Let's put those names against actual records and changes.

## Keep the person and her different records separate

Devi's employee number is 91001. She already has an ISC **identity**, the record representing her as a person. We will call it I-91001; this is a teaching label, not an actual ISC object ID.

An **account** is her record in a particular connected system. An **attribute** is a named field on a record.

Devi has three correctly associated accounts:

- WorkerHub Production account `wh-91001`, containing HR's worker information.
- ProjectDirectory account `pd-91001`, used by an engineering application.
- ArchiveDirectory account `ad-91001`, used by a separate archive system.

A **source** is ISC's configured representation of a system's account data. A **connector** supplies the supported integration with that system. A connector can support reading without supporting every kind of write.

WorkerHub is **authoritative** for this employee population: its worker accounts participate in establishing and maintaining the corresponding identities. The Employees **identity profile** supplies shared configuration for those identities.

Its department **mapping** selects how the identity department receives a value. Here it reads the associated WorkerHub account's department directly. No calculation or substitute changes the department.

**Account correlation** is the matching and association of accounts with identities. It answers which person owns an account in ISC. It does not copy every account field onto the identity or send that person's data back to the application.

The account relationships are already correct in this example. We are investigating what changes after HR updates one field.

The business requirements are specific:

- The identity department must reflect WorkerHub's approved department.
- ProjectDirectory's department must follow the identity department through an established attribute-sync configuration.
- An automatic role called Engineering Starter must give Engineering employees the Engineering Base access profile.
- No ongoing department update is configured for ArchiveDirectory.

A **role** can use identity conditions to determine who receives its configured access. This role tests department equal to Engineering.

An **access profile** bundles access from a source. Engineering Base contains one **entitlement**, a governed representation of a source-specific permission: membership in ProjectDirectory group `ENG-BASE`.

The role and access profile are enabled. They require ordinary ongoing group membership, with no separate activation step. ProjectDirectory supports both the department update and group-add operations, and provisioning is enabled; the executing account still needs permission for each operation.

Devi already has the required ProjectDirectory account. Before the change, its department is Finance and it does not have ENG-BASE. There is no Finance-based access assignment or removal to resolve in this example; other access stays outside this change.

The records, configurations, activity and outcomes below are fictional. No real tenant or external account is changed.

## Aggregation answers “what account information did we collect?”

**Account aggregation** reads account records into ISC from the configured source. For a file-based source, it imports the supplied file instead of making a live connection to the external application.

Its immediate subject is source-account information, not a command to set a target field.

For WorkerHub, we need to know whether the configured collection included wh-91001 and captured its new department.

HR saving Engineering does not prove that this data reached ISC. An aggregation marked successful does not, by itself, prove the exact account and field were included. Check the collected record as well as the operation's scope and outcome.

If ISC's WorkerHub account still says Finance, processing a mapping that reads that value cannot be expected to invent Engineering.

Aggregation can also participate in association and subsequent identity updates. When a relevant aggregation change modifies an identity, it can initiate event-based identity processing. Separating the responsibilities does not mean that a person must manually launch every stage.

But the word aggregation is not a promise that every record was reevaluated, every identity changed or every target write completed. Collection modes, optimization and the particular action matter.

For example, the UI's **Aggregate Account** action reloads a selected account's data. Its documented scope does not synchronize those new values into identity attributes or initiate provisioning. It is not interchangeable with every full-source aggregation path.

Also distinguish account aggregation from **entitlement aggregation**, which reads the access objects themselves. Collecting the ENG-BASE group object does not add Devi to it.

The direction is inward: the application supplies information, and ISC records what it read. A separately triggered action can follow, but reading membership is not granting membership.

## Identity processing answers “what should this identity look like now?”

Identity processing evaluates identity information against the applicable configuration.

For Devi, the Employees mapping needs the collected WorkerHub department. With Engineering available as the selected input, the identity's department can become Engineering.

Processing can also evaluate manager relationships, lifecycle-driven access and automatic role assignments.

**Manager correlation** resolves a manager reference to an identity. A **lifecycle state** represents a business stage, such as active employment, and can drive configured access. These are additional consumers of identity information, not other names for aggregation.

Devi's manager and lifecycle state are unchanged here. The relevant access decision is the Engineering Starter role condition.

If the current identity department meets that condition, the configured role can require Engineering Base. That establishes a reason for the access change. It does not establish that ProjectDirectory accepted it.

Identity processing can start from relevant data changes. It also has scheduled, time-based and manual paths with their own configuration and eligibility rules.

A saved mapping change and an upstream account change are different reasons to reevaluate. If an administrator changes identity mappings or access-model configuration, the affected identities need the supported application/processing step; saving instructions is not evidence that the population already reflects them.

Nor does a processing run guarantee a changed result. If the same applicable inputs and conditions yield the same values and requirements, there may be nothing new to apply.

When a display says that processing finished, ask what that completion covers. It does not validate that access was successfully provisioned after provisioning was started.

## Provisioning answers “what change was carried out?”

Provisioning performs account or access changes in a target system. Creating an account, changing an account field and adding or removing access are different operations.

They depend on supported capabilities, configuration, permissions and the particular target.

For Engineering Base, the required external change is adding pd-91001 to ENG-BASE. An account already exists, so this case does not need a new-account creation.

A **Create Account** configuration defines the fields and values for a new account when one is needed. It does not make every existing account field continuously follow the identity.

Provisioning is not limited to changes arising from identity processing. An approved **access request**, a request for specified access, can also initiate delivery. Reviews and other configured processes can require changes too. Their decision and delivery responsibilities remain distinct.

For a direct connection, ISC can use the connector's supported operations. For a disconnected or file-based integration, a manual provisioning task can require an authorized person to make the change externally. File import alone cannot push a write to that system.

“Provisioning started” therefore does not mean “the connector changed the account,” and “a manual task exists” does not mean a human has completed it.

Even an overall activity status needs context. Inspect the intended account, source, operation and item-level result or error. Then confirm the required target state through an appropriate observation.

A successful department update and a failed group update can both concern pd-91001. They do not have to share one outcome simply because they concern the same person and source.

## Attribute synchronization answers “which account fields must follow the identity?”

Attribute synchronization is a particular provisioning use, not an independent alternative to provisioning.

It specifies selected account attributes that should align with mapped identity attributes. In the supported configuration, the account attribute is included in the source's Create Account definition and mapped directly from an identity attribute there.

ProjectDirectory's department is mapped directly from identity department and is selected for sync. The configuration is already established for this scenario; we are not describing its initial setup or bulk application.

That tells us which value should be enforced and in which direction: identity department supplies ProjectDirectory department.

It does not say that ProjectDirectory owns the identity department. The Employees mapping still gets that value from WorkerHub.

Configured sync can react to a changed identity value and to detected changes in the associated account value. For example, collecting a native edit to ProjectDirectory department can lead to it being set back to the identity's value.

That is why “aggregation only reads” needs a careful boundary: the read operation collects data, but the detected difference can trigger a separately configured corrective write.

Sync applies to existing **correlated accounts**, meaning accounts associated with an identity. It does not create an account on its own. If another process creates the account, sync can then apply.

If one identity has several correlated accounts on the same source, sync updates all of them under its configuration. Do not assume it selects only the account that an access profile would choose for access delivery.

Null also needs care. Null means no value. A null set by an identity-profile mapping can propagate through configured attribute sync; it is not a universal “skip this field” instruction. Review missing-data policy before enabling a write.

For this one-account example, the expected department update is pd-91001 Finance to Engineering.

It does not add ENG-BASE. That membership comes from the separate access requirement and corresponding provisioning operation.

ArchiveDirectory's ad-91001 remains Finance because no ongoing department update is configured for it. Its different value is not, by itself, evidence of failed identity processing.

## Follow the conditional paths, not an imaginary fixed pipeline

Here is the data and department-field path for the supplied configuration:

```text
WorkerHub / wh-91001
approved department: Engineering
                |
        account aggregation
                v
ISC's WorkerHub account data
department: Engineering
                |
Employees identity mapping
during relevant identity processing
                v
Identity I-91001
department: Engineering
                |
configured ProjectDirectory
department attribute sync
                |
       supported provisioning
                v
ProjectDirectory / pd-91001
department: Engineering
IF the update succeeds
```

The arrows show required information and configured responsibilities. They are not private service names, a mandatory sequence of separate jobs, or guaranteed successful delivery.

For the access change, the identity value feeds another path:

```text
Identity department: Engineering
                |
role condition matches
Engineering Starter requires access
                |
Engineering Base access profile
contains ENG-BASE entitlement
                |
provisioning: add group membership
to ProjectDirectory pd-91001
                |
       +--------+--------+
       |                 |
   succeeds           fails
       |                 |
verify ENG-BASE    inspect the error
on the account    and actual state

Department sync is a separate change.
Neither result proves the other.
```

This branch explains why the department can be corrected while the engineering group is still absent.

It also prevents a different mistake: an access request can enter the delivery path without first repeating HR aggregation. Not every provisioning event starts at the top of the first diagram.

## Compare the processes by the change you need

Use this comparison against the actual objects, not as a list of four buttons to run:

| Process | Input, responsibility and evidence boundary |
|---|---|
| Account aggregation | Reads configured account data into ISC. Check collection scope and the exact collected account/field. An operation summary is not proof of identity or target outcomes. |
| Identity processing | Uses available identity/account information and applicable configuration to reevaluate identity data and decisions. Check the current identity and relevant requirements; completion does not prove delivered access. |
| Provisioning | Carries out a required account or access change through a supported automatic or manual path. Check the precise operation, result and actual target state. |
| Attribute synchronization | Uses configured identity-to-account field mappings to require alignment, then provisions eligible account-field updates. Check the mapping, account association, changed value and update result. It is not account creation or general access assignment. |

The first process gathers information. The second evaluates identity information and applicable requirements. Provisioning implements required changes. Sync specifies one kind of required field alignment that provisioning must deliver.

These responsibilities can interact. They are not four mutually exclusive categories of incident, and they are not four proof levels that automatically become true together.

<a href="../assets/PROCESSING_COMPARISON_GUIDE.txt" download>Download the processing comparison guide</a>

## Read the evidence without stretching its meaning

All of the following supplied observations occur on October 23, 2026. UTC means Coordinated Universal Time.

| Observation | What has been established |
|---|---|
| 10:00: HR publishes Engineering for employee 91001 | The producing system has changed; collection in ISC has not yet been established |
| 10:05: wh-91001 in ISC is verified with department Engineering | The needed account value is available in ISC |
| 10:06: relevant identity processing, current identity department Engineering and Engineering Starter assignment are verified | The mapped value and stated access requirement have been established for Devi |
| 10:07: the department update result and a fresh ProjectDirectory observation confirm Engineering on pd-91001 | The required target field change succeeded |
| 10:08: the ENG-BASE add operation reports insufficient permission | That membership operation failed; a corrected department does not make it successful |
| 10:09: a fresh ProjectDirectory observation confirms ENG-BASE is absent | The required membership has not been established |

The times are fictional observations, not performance guarantees or a required order between the two target changes. The writes could have different timing in another run.

At 10:05, the collected field is known. Without checking current identity data, we cannot conclude that identity processing has either finished or failed.

At 10:06, we have more evidence. We still cannot conclude that group membership exists externally.

At 10:09, we can describe the incident precisely: account collection and the identity change are verified; department delivery succeeded; group delivery failed because its operation lacked permission.

Reaggregating WorkerHub would not grant that missing target permission. Replacing the department mapping would not repair it either.

The next corrective action must address the authorized group-operation capability. After resolving the cause, retry or resume the appropriate failed work through a supported path and verify membership.

Do not treat “retry everything” as harmless. Shared processing can affect other identities and access. Check what is in scope and whether a previous operation already succeeded before requesting another change.

If a manual task were involved instead, the missing action might belong to a system owner rather than a connector. Task completion evidence and a current external observation would need to support the final claim.

## Start the investigation at the first unproven requirement

Suppose the ticket gives only “aggregation successful.” First ask which source, which account and which field were involved.

If the exact account still has old data, investigate collection or selection. Do not skip directly to provisioning.

If the collected input is correct but the identity is wrong, inspect the governing profile, mapping and any calculation, then relevant processing. **Preview** can test selected mapping results; it does not establish population-wide application or an external write.

If the identity is correct but the target field is wrong, inspect the intended update mechanism. Is sync configured for this field and source? Is the account correlated? Is the attribute eligible? Did the supported write run and what did it report?

If the target field is correct but access is missing, inspect the access requirement and its delivery. Syncing department is not the same change as granting ENG-BASE.

If all target values and memberships are correct but the user still cannot use the application, investigate the application separately. **Authentication** checks who is signing in; **authorization** determines what that signed-in user may do. Neither is proved solely by a correct ISC identity field or collected group name.

A generic record-modified timestamp cannot replace this trace. It shows that a record changed, not which individual requirement was evaluated or delivered.

Also keep ISC's service-data synchronization separate from account attribute sync. Identity information being reflected into Search is a visibility concern inside the platform, not proof that ProjectDirectory was updated.

## Check authority before correcting drift

A **drift** is a difference from the intended state.

Suppose the current identity still says Engineering, but an application administrator deliberately sets pd-91001 department to Finance.

ProjectDirectory aggregation can read that edit. Under our established sync policy, the identity remains the department authority for this account field, and detecting the difference can lead to corrective provisioning back to Engineering.

That is the configured behavior, but is it the approved behavior for this new request?

If the application has a legitimate exception, resolve ownership and policy before repeatedly forcing a value. If it has no exception, investigate and correct the unauthorized drift through the approved mechanism.

Avoid a circular design where identity department is sourced from ProjectDirectory while another operation independently overwrites ProjectDirectory from conflicting HR logic. Each field needs a clear producer, transformation if required, enforcement direction and exception policy.

An **account schema** defines the fields represented for source accounts. A field being present in that schema does not automatically authorize writing it, configure sync or make the connector support updates.

Read capability, data authority and write capability are different project decisions. They must agree before a repeated synchronization can be considered a correct solution.

## Work through the process choices

### 1. HR changed, but the collected account did not

**Facts:** HR says Engineering. The associated WorkerHub account in ISC still says Finance. The identity mapping reads that account directly.

Should you start by repairing role provisioning?

**Reasoning:** No. Establish collection of the correct worker and field first. The mapping cannot be expected to use uncollected Engineering. A target operation might also have a problem, but these facts have not established the new input or requirement.

### 2. The account value was reloaded individually

**Facts:** The UI Aggregate Account action reloads wh-91001 with Engineering. No current identity or target outcome has been checked.

Does this action itself establish an identity update and group grant?

**Reasoning:** No. The documented action updates account data without synchronizing identity attributes or affecting provisioning. Verify and use the appropriate supported identity-processing path when needed; do not substitute this action's completion for evidence of the other outcomes.

### 3. The mapping definition changed

**Facts:** An administrator corrects Employees' department mapping and saves it. Preview is correct for Devi. No application to the profile population has been verified.

Has the population been corrected?

**Reasoning:** Not from these facts. Saving and selected Preview establish configuration and a sample calculation. Relevant application/processing and current results need verification. Review the shared population and consumers before applying the change.

### 4. Processing finished while a write failed

**Facts:** Current department Engineering and Engineering Starter assignment are verified. The ENG-BASE add reports insufficient permission.

Did identity processing necessarily fail?

**Reasoning:** No. The stated identity and access requirement are established; delivery has a separate failure. Investigate the group operation's supported permission and result, then verify the required target membership after correction.

### 5. One field was delivered successfully

**Facts:** ProjectDirectory department is Engineering. ENG-BASE is absent, and its add failed.

Can successful department sync close the access incident?

**Reasoning:** No. A field update and a membership change are separate operations. The target needs the required group, not merely a department label that explains why access should be granted.

### 6. No account exists

**Facts:** Another employee has the right identity department, but no ProjectDirectory account. Attribute sync is configured for department.

Will attribute sync create the account?

**Reasoning:** No. It applies to existing correlated accounts. A separate approved account/access provisioning event needs the supported creation configuration. Once another operation creates the account, sync can apply; do not invent creation from a field-alignment setting.

### 7. Two correlated accounts exist

**Facts:** Another identity has both a normal and a privileged account on one source. Both are correlated. Department sync is enabled for that source.

Can you assume only the normal account receives a department update?

**Reasoning:** No. Attribute sync applies to all correlated accounts for that identity on the source. Review the suitability of the field and population. Do not reuse access-profile account-selection assumptions for sync.

### 8. Collection discovers an external edit

**Facts:** Identity department remains Engineering. A native ProjectDirectory edit sets Finance. Aggregation detects the edit, and established sync enforces department from the identity.

Does the possibility of a corrective write mean aggregation itself is a write operation?

**Reasoning:** No. Collection detects the changed account value; the configured enforcement can then require provisioning. Inspect the business authority and both operation boundaries. Reading a change and responding to it are connected but different responsibilities.

## Explain the same problem for a different field

An employee's approved work phone changes in HR.

The phone reaches the exact collected HR account and the identity's workPhone field. The contact application still has the old number. Its Create Account definition maps a phone field from workPhone, but ongoing phone synchronization is not configured.

Someone proposes running HR aggregation until the contact application changes.

What is missing?

Collection and the current identity value are already established. Repeating those steps does not create an ongoing target-update policy. New-account field configuration alone does not update this existing account.

First confirm that the contact application is supposed to follow HR's phone, that the account is correctly associated, and that a supported authorized update path exists. If attribute sync is selected, verify eligibility and scope rather than assuming every displayed field can be synced.

Then verify the actual phone update. This does not require inventing an access role or changing the employee's group memberships.

The useful explanation names each responsibility: where the approved information comes from, how ISC establishes the identity value, which configuration requires an external change, and what evidence confirms that change. “Run a refresh” is not a substitute for identifying those parts.
