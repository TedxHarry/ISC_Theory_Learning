# Follow the access problem across the systems

Lesson ID: SYS-006  
Revision: 1.0

Devi has moved from Operations into Finance. She can sign in to the reporting application, but the Finance reports are unavailable to her.

The human resources team, or HR, says the transfer is complete. The directory team says her account is enabled. An ISC administrator confirms that the reporting source is connected.

Each statement can be true while Devi still lacks the access she needs.

The useful question is where the information and decisions stopped producing the required result. To answer it, you need a map that connects the records, the configured logic, and the application operation.

## Begin with the operation that should work

In this fictional example, the approved policy gives active Finance employees access to view Finance reports. It does not give them permission to edit financial data or export it.

Devi already has one enabled reporting account, `rpt-10482`. She uses that account when she signs in. Her employee number is `10482`.

The reporting application requires a permission called `FINANCE_REPORT_VIEW` to view the Finance report collection. The application owner has confirmed that Devi has no other grant that provides this access.

An **account** is a record through which a person or service uses a particular system. An **identity** in SailPoint Identity Security Cloud, or ISC, represents the person and connects information about their accounts and access.

Those distinctions give us a specific problem:

> Employee 10482 should be able to view the Finance report collection through account rpt-10482. That operation is currently denied.

“Reporting doesn't work” would leave too much unspecified. A failed sign-in, a missing report-viewing permission, and an unavailable application need different investigations.

Here, successful sign-in has already been confirmed. The application has also confirmed that the viewing operation is denied because the required permission is missing.

That evidence narrows the problem. It doesn't yet tell us why the permission is missing.

## Put each record in the system where it belongs

The situation contains more than one record about Devi.

HR holds her employment record. A directory holds her workplace account and a department value. The reporting application holds her reporting account and its permissions. ISC holds representations of collected source accounts, an identity for Devi, and the configuration used to manage access.

A **directory** stores accounts and related information used by other systems. A directory's department value can be separate from HR's department value, even when the organization expects them to agree.

A **source** is ISC's configured representation of an external system or collection of account data. A **connector** is the integration used to read that data and, where supported and configured, send changes.

In our example, ISC has an HR source, a directory source, and a reporting source. The reporting source is a representation within ISC; the reporting application is the system in which Devi opens reports.

**Aggregation** collects account information into ISC. **Account correlation** associates a collected account with the appropriate identity using the applicable matching behavior.

The engineer has already confirmed that the directory account and `rpt-10482` are associated with Devi's identity. That removes a wrong-person association from the main example. It does not remove it from every future investigation.

Use identifiers to follow these relationships. Display names help you read a screen, but two people can share a name, and account names can differ across systems.

Employee number 10482 identifies the person in this example. The source and account identifier identify the particular system record. Those values do different jobs.

## Which department value does ISC use?

An **attribute** is a named value on a record. HR's department, the directory account's department, and the identity's department are attributes on different records.

Their shared name doesn't make them one value.

An **authoritative source** supplies the population from which identities are established. An **identity profile** connects that population to its identity configuration. Attribute mappings determine where the identity's individual values come from.

A **mapping** specifies an input or calculation used to populate an identity attribute. HR can supply the identity population while another source supplies a particular attribute.

That is useful when the other source is the approved owner of that information. It also means you must inspect the mapping before concluding that the identity's department came from HR.

For this organization, the approved design says HR determines employment department. The configured identity department should therefore use the HR department value.

The configuration currently does something else. It reads the department attribute from Devi's associated directory account.

Let's inspect the supplied records. These are fictional observations from the same morning, after Devi's transfer became effective at 08:00. They are teaching records, not screenshots or a tenant execution trace.

| Record or configuration | Value available during the investigation |
|---|---|
| Current HR employment record | Employee 10482, department FIN, employment status ACTIVE |
| HR account data collected into ISC at 08:10 | Employee 10482, department FIN, employment status ACTIVE |
| Current directory account | Department OPS |
| Directory account data collected into ISC at 08:15 | Department OPS |
| Identity department mapping | Read department from the associated directory account |
| Identity employment-status mapping | Read employment status from HR |
| Devi's current ISC identity | Department OPS, employment status ACTIVE |

`FIN` is the department code for Finance; `OPS` is the code for Operations. The field called employment status is an attribute used by this example. It describes employment information; the reporting account's enabled state is recorded separately.

Look at the boundary between the collected values and the identity.

ISC has obtained HR's new department. Yet the department mapping selects the directory's older value. The resulting identity department is OPS.

Recollecting the same unchanged HR record cannot make a mapping start reading HR. The missing connection is in the configured selection of the attribute's input.

The directory's older department can require its own follow-up. But the agreed design does not make that directory value the authority for this access decision.

## How does department become application access?

A **role** groups access for a responsibility or population. It can be assigned automatically through configured criteria.

**Assignment criteria** are the conditions that decide who qualifies. This organization's enabled role, “Finance Reports,” uses these two conditions together:

```text
Identity department equals FIN
AND
Identity employment status equals ACTIVE
```

AND means both conditions must be true.

The criteria read identity attributes in this example. Role criteria can be designed with other supported inputs, so always inspect the configured type as well as the attribute name.

An **entitlement** is an access item represented from a source, such as an application permission. An **access profile** bundles related entitlements from one source.

The Finance Reports role contains the “Finance report viewing” access profile. That profile contains `FINANCE_REPORT_VIEW` from the reporting source.

The role states who qualifies. Its access contents state what that membership requires. The reporting application gives the permission its operational meaning.

**Identity processing** evaluates identity information and applicable access configuration. When the configured criteria qualify an identity for this role, the resulting assignment can initiate the required access changes.

**Provisioning** performs account or access changes in another system. The **target system** is the system receiving the change. Here, a supported provisioning operation adds the permission to the existing account `rpt-10482` in the reporting application.

The example assumes the required ISC services are enabled, the role and its access contents are configured correctly, and the integration supports the required write. It also assumes that processing has run against the identity values shown above.

Now evaluate those values:

Department OPS does not equal FIN. Employment status ACTIVE equals ACTIVE. One condition is false, so the combined condition is false.

Devi doesn't qualify for a new assignment from this role using the current mapped values. There is therefore no new grant from this automatic role path.

This is a reasoned evaluation of the supplied criteria and values. It does not imply that ISC exposes a log containing a line for every comparison.

## Read the map as dependencies and decisions

```text
DESIGN BASIS: approved Finance report-viewing requirement.
The Finance Reports role expresses who qualifies and what access is needed.

DATA AND DECISION PATH
HR system -------- aggregation ------> HR account data
Directory -------- aggregation ------> Directory account data

Both collected records are available to identity-profile mappings.
                         |
                         v
Mappings select an input for each identity attribute:
department <- directory; employment status <- HR
                         |
                         v
Devi's identity attributes
                         |
                 identity processing
                         v
Enabled Finance Reports role criteria
                  /                 \
       not met   /                   \ met
                v                     v
No new grant from this role       Role assignment
                                      |
                                      v
                             Required access profile
                                      |
                                      v
                          Provisioning to rpt-10482
                                      |
                              applied or rejected
                                      v
                           Reporting application
                                      |
                          application permission check
                                      v
                            Report viewing decision

OBSERVATION: reporting account data -- aggregation --> ISC account view
HUMAN CHECK: compare requirement, selected inputs, decisions, and outcome.
Correcting the department mapping selects HR instead of directory.
Arrows show dependencies in this example, not internal service topology.
```

HR and directory data are available to the mapping configuration. The diagram shows the current department selection from the directory and the employment-status selection from HR. Changing the department selection to HR changes which collected value supplies that identity attribute.

The criteria then evaluate the identity attributes. A matching role requires the defined access; provisioning attempts to deliver it. The application applies or rejects the attempted change and enforces its permission rules when the account views a report.

That last distinction matters. A failed write does not change the target just because a role was assigned.

The observation path at the bottom reads reporting account data into ISC. It helps the engineer compare collected permissions with activity and target evidence. It is separate from the write that seeks to change those permissions.

The human check compares these records and decisions with the approved requirement. The picture does not assert an automatic diagnostic or correction that ISC performs for you.

It also leaves out physical deployment details. A real connector can have additional execution and network dependencies. This map identifies the records and decisions relevant to the problem; its arrows do not describe undocumented ISC services or guarantee an immediate round trip.

## Investigate from the symptom, then explain forward

When you hear the report, you don't yet know that the mapping is the cause.

You can start at the application and work backward: which account was used, which operation failed, what permission is required, and what should have supplied it?

You can also start with the reported transfer and work forward: what changed in HR, what was collected, what became an identity value, and what should that value trigger?

The two directions meet at the configured assignment.

Here is how the investigation narrows in this case.

The application evidence establishes the denied viewing operation on `rpt-10482` and the missing permission. The account association confirms that the engineer is inspecting Devi's record.

The access design identifies Finance Reports as the intended automatic grant path. The role is enabled, its contents are correct, and its criteria use identity department and employment status.

The current identity values do not meet those criteria. The mapping and collected data explain why: the department comes from the directory instead of the approved HR input.

The access failure is therefore consistent with a mapping defect. The comparison is doing what the configured values tell it to do.

An absent provisioning activity entry alone would not establish that explanation. You would also need to consider search scope, available history, processing, and other grant paths. Here, the conclusion comes from the connected evidence, not from an empty result.

Before changing anything, write a short causal explanation:

> HR's FIN value reached ISC. The identity department mapping selects the directory's OPS value instead. The automatic Finance Reports criteria therefore do not match, so this path has not generated the expected grant. The reporting account lacks the required permission, which explains the application's denial.

Each sentence connects an input to a decision or an observed result. A colleague can check each link.

## Choose the correction at the boundary that is wrong

Several actions might change a screen without correcting this design.

Changing HR back to OPS would make correct business data wrong. Repeated HR aggregation would still leave the department mapping pointed at the directory. Resetting Devi's reporting password would not change role eligibility.

An authorized temporary grant could address an urgent business need, but it would need its own decision, scope, tracking, and removal plan. It would not repair the department mapping.

The lasting correction here is to align the department mapping with the approved design.

That mapping applies to more than Devi. Before changing it, assess the population whose identity values would change and the access decisions that consume department.

Suppose another employee has FIN in the directory but OPS in HR. Switching the mapping to HR could change that person's role eligibility in the opposite direction. That might be the intended correction, but you need to understand it before applying a shared change.

A **dependency** is something that relies on another value or capability. Roles depending on department are downstream dependencies of that mapping. Other mappings or configured automation can also depend on the same attribute.

Review those dependencies, use the available preview and testing facilities, and plan verification for the affected population. Previewing a mapped value does not execute every future target operation or prove the final application outcome.

The approved correction should address the shared configuration and the actual affected access. Its verification must include people who should gain access and people whose existing access could change.

## Trace the corrected path without skipping delivery

After assessing the change, the authorized engineer corrects the department mapping to read HR. The team applies the required processing through the supported procedure.

In this fictional successful continuation:

| Stage | Result |
|---|---|
| Selected mapping input | HR department FIN |
| Identity attributes | Department FIN and employment status ACTIVE |
| Role criteria | Both conditions are true |
| Role assignment | Finance Reports is assigned |
| Required access | Finance report viewing requires FINANCE_REPORT_VIEW |
| Provisioning result | The supported addition to rpt-10482 reports success |
| Current target account | The application confirms FINANCE_REPORT_VIEW is present |
| Controlled application check | Devi's account can view the approved Finance reports |
| Boundary check | The change has not added edit or export permissions |
| Collected reporting information | A subsequent appropriate collection reflects the granted permission |

The rows describe this example's successful outcome. They don't set a timing guarantee or imply that each row is a separate screen.

Processing completion alone doesn't prove successful provisioning. A provisioning success report doesn't prove that every application operation works. The target permission and controlled operation checks close different evidence gaps.

Use non-sensitive test reports and authorized checks. Preserve useful evidence of the original condition before overwriting it with the corrected state.

The identity department can now be FIN while the directory department remains OPS. In this design, changing the identity mapping does not itself update the directory account.

**Attribute synchronization** is a separate configured mechanism that can write selected identity values to corresponding account attributes. If the organization wants directory department synchronized from the identity, that needs its own supported configuration and validation.

Don't assume that reading an attribute into ISC or using it for a role automatically writes it everywhere else.

## Keep sign-in on its own branch

Devi's ability to sign in remained a useful fact throughout the investigation. It established that she could enter the application using the confirmed account under the tested conditions.

**Authentication** establishes who is signing in. **Authorization** decides whether an operation on a particular resource is allowed.

The **front end** is the page or interface the user sees. The **back end** is the trusted application processing that must enforce the permission decision. A missing report tile can be a clue, but the protected report operation must also be checked by the application.

An **identity provider** can perform sign-in checks for an application that trusts it. A **session** is the application's continuing context for a signed-in user. Sign-in account mapping and ISC account correlation are different relationships; verify which application account the session actually uses.

For our main example, that account is already confirmed as `rpt-10482`. The reporting application evaluates its current permissions for the viewing operation.

If the corrected permission is present but a different account is in the session, the original account's successful provisioning won't solve that session's problem.

If the application uses permissions retained in a session, its documented reevaluation behavior also matters. Establish that behavior before concluding that a newly applied permission is immediately usable.

Do not use another permission grant to compensate for an unexamined sign-in account or session condition.

## A change in evidence moves the investigation

The same complaint can come from a different point in the map. Change one fact and follow the consequences.

### HR is correct, but ISC has the previous HR value

Suppose HR shows FIN, but the collected HR account still shows OPS from before the transfer. The mapping correctly selects HR.

Now the evidence gap is between current HR data and collected HR data. Inspect the relevant extraction or feed, the actual record provided, collection scope, and collection result.

A recent successful job is not sufficient if it didn't include this employee or the updated attribute. Confirm which data reached ISC before changing the mapping.

### The identity is correct, but the role isn't assigned

Suppose the identity shows FIN and ACTIVE, but the role is absent.

Inspect the enabled role, the actual criteria and input types, and whether applicable processing evaluated the current configuration and data. The role name by itself doesn't establish its assignment logic.

Don't conclude that a connector write failed before establishing that this path required and attempted the write.

### The role is assigned, but the write was rejected

Suppose both criteria match and the role is present, but provisioning reports that the application rejected the addition for insufficient integration privilege.

A **technical account** is the account the integration uses to communicate with the target. Its write permissions differ from Devi's application permissions.

The failing boundary is now delivery. Check the operation, target account, privilege requirements, and current target state. An identity mapping change would not supply the technical account with a missing target privilege.

### The permission is present, but the operation is still denied

Suppose `FINANCE_REPORT_VIEW` is confirmed on the account, yet viewing a particular Finance report fails.

Check the precise resource, the signed-in account, session behavior, and the application's enforcement rules. The permission might require another condition, such as business-unit scope.

That condition is not part of our original simplified application. Discovering it means the real application rule needs a fuller explanation. It is not proof that ISC failed to add the recorded permission.

## Use the interface to answer a specific question

A source-account view helps inspect the account data ISC holds. An identity's attributes show the values on the identity. The identity profile's mapping explains where a value should come from. A role definition explains who should qualify and what access is included.

Provisioning Activity and Account Activity help inspect attempted changes and reported outcomes. The application's own account and authorization evidence address what is present and usable in the target.

ISC Search keeps a searchable view of information. Updating that view can take time, so a change can become visible there later than in another record. An empty search result needs a scope and freshness check before it becomes a conclusion about access.

These aren't competing screens from which you choose a favorite answer. Each provides evidence about a different part of the map.

For a useful investigation note, attach the question to the evidence:

> “The HR account record collected at 08:10 contains department FIN.”

That supports a statement about collection.

> “The current department mapping selects the directory account attribute.”

That supports a statement about input selection.

> “The role criteria use identity department, which currently equals OPS.”

That supports reasoning about eligibility.

A screenshot without the record identifier, relevant time, or meaning can leave the next engineer unable to connect it to the issue.

## Mark what you know and what you still need

You can build an investigation map on paper or in an ordinary document. It doesn't depend on a special ISC visualization feature.

For each connection, write the input, the applicable configuration, the expected output, and the evidence you have for the actual output. Mark a connection unknown when you haven't checked it.

For example:

| Connection | Expected output | Available evidence |
|---|---|---|
| HR to collected HR account | Department FIN | Confirmed in the 08:10 record |
| Collected input to identity department | FIN, using the approved HR mapping | Actual mapping selects directory; identity shows OPS |
| Identity to automatic role | Qualifies when department FIN and status ACTIVE | Current department condition is false |
| Role to target permission | Add the permission when this role requires a new grant | Main case has not reached that qualifying condition |
| Target permission to report operation | Authorized viewing for the correct account and scope | Missing permission and corresponding denial confirmed |

“Unknown” is useful. It identifies the next evidence to obtain without converting an assumption into a fact.

Do not mark every later component faulty merely because an earlier dependency is wrong. The application can be correctly refusing a permission that the configured process has not delivered.

After correcting one boundary, continue checking the rest. An upstream defect can coexist with a delivery or application problem.

## Work through the changed records

### Case 1: the right word on the wrong record

The collected HR account shows department FIN. The role criterion explicitly uses the identity department, which is OPS. The role is enabled, and no other criterion would qualify the person.

Does FIN on the HR account satisfy this configured role criterion?

**Reasoning:** No. The configured criterion reads the identity attribute. Inspect the identity's department mapping and applicable processing. If the approved design says HR should supply that value, compare that requirement with the actual selected input.

The same attribute name on two records does not make the records interchangeable.

### Case 2: repeat the successful collection

The HR collection obtained the new FIN value. The identity mapping selects directory department OPS. An engineer proposes repeatedly collecting HR until the role appears.

What would that change?

**Reasoning:** Recollecting the unchanged HR value doesn't redirect the mapping. Inspect and correct the selected input through an authorized change if it conflicts with the agreed design. Assess the shared population and downstream dependencies before applying it.

If another condition changes, a new collection might have other effects. That possibility doesn't make collection a correction for the supplied mapping defect.

### Case 3: the map stops at a green role

The identity now meets the criteria and Finance Reports is assigned. The provisioning operation was rejected, and the target lacks the permission.

Has the access requirement been fulfilled?

**Reasoning:** No. Assignment establishes required access through this path; the rejected operation and target state show that delivery has not fulfilled it.

Inspect the reported delivery error and integration conditions. Verify any authorized recovery against the target and the required operation. Further role assignment changes are not justified solely by this failed write.

### Case 4: make the comparison pass for everyone

An engineer proposes changing the criterion from department FIN to employment status ACTIVE alone. That would make Devi qualify without correcting her department.

Would you accept that fix?

**Reasoning:** It would qualify active employees outside Finance and change the access policy. The proposed condition doesn't express the approved requirement.

Correct the data-selection defect. If the business wants a wider population, that is a new access decision requiring an appropriate design and review, not an incidental troubleshooting shortcut.

## Draw the map for an unfamiliar employee

A contractor should receive access to a warehouse dashboard while assigned to location WH2. The contractor register is the approved source for location. A directory also holds a location value.

You are given these observations:

- The current contractor register and its collected ISC record both show WH2.
- The identity location mapping selects the directory.
- The directory's collected location is WH1, and the identity location is WH1.
- An enabled automatic role requires identity location WH2.
- The existing dashboard account is correctly associated with the identity.
- The dashboard's viewing permission is absent.
- Applicable processing has run with the supplied configuration and values.

Draw the links from the approved requirement through the records and criteria to the missing permission. Identify the defect, then name the checks that would remain after correcting it.

**One defensible answer:** The required WH2 value reached ISC, but the identity location selects directory WH1. The automatic role's location condition therefore does not match. This explains why the supplied automatic path has not produced the expected grant.

The defect is the mapping's disagreement with the approved source for location. Assess the shared mapping and dependent access decisions before correcting it. After authorized correction and applicable processing, check the new identity value, role assignment, operation outcome, target permission, and controlled dashboard use for the intended account and resource.

Also check that the change hasn't granted dashboard access to the wrong population or altered other access unexpectedly. Correcting the location value is a necessary step in this case, but it doesn't establish every downstream result.

Now describe your map to another engineer in connected sentences. Explain which record supplies a value, which configuration selects it, which condition consumes it, which operation should change the target, and which evidence confirms the user can do the intended work.

That explanation should let the other engineer follow the cause of the outcome, even when the application and permission names are unfamiliar.
