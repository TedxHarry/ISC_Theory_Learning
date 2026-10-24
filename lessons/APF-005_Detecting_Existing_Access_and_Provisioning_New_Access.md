# The profile appeared. Did ISC actually grant new access?

Devi, employee `110505`, reviews release evidence in BuildLedger Production, a fictional application. Her account, `bl-110505`, already has the groups needed to read evidence and add review comments.

The engineering team later defines a package for that capability in SailPoint Identity Security Cloud, or ISC. This package is called an **access profile**. After ISC reevaluates Devi's record, the profile appears among her access in ISC.

Nobody submitted a request for it.

Did ISC just give Devi new application access?

The profile's appearance alone does not establish that. ISC can recognize access that already exists and associate it with a matching access profile. That changes how the access is represented in ISC without necessarily adding anything to the application account.

The question to follow is: did ISC recognize existing holdings, or did a separate requirement cause a source change?

All people, records, identifiers, native permissions, configurations and observations here are fictional. The example uses one source and one correctly associated account so that we can examine the distinction without assuming how every multiple-account arrangement is handled.

## Establish what is already there

In ISC, an **entitlement** represents a source access right, such as a group membership. An **access profile** is a named bundle of related entitlements from one source.

A **source** represents a connected system or account-data collection in ISC. Its **connector** reads data and, where supported and configured, makes changes.

Here, the source represents BuildLedger Production. The supplied integration supports reading accounts and groups and adding or removing the memberships used in the example.

An **account** is the application's login record. An ISC **identity** represents the person. Devi's identity is correctly associated with `bl-110505`, her only account on this source.

The application team verifies the following native access. “Native” means in BuildLedger itself.

| Native group | Confirmed meaning and initial membership |
|---|---|
| `BL-5501`, Release Readers | Read release evidence in the account's assigned project. Already on `bl-110505`. |
| `BL-5502`, Review Comments | Add review comments when the same account also has Release Readers. Already on `bl-110505`. |
| `BL-5599`, Release Approvers | Approve a release, a responsibility outside ordinary evidence review. Also already on `bl-110505`. |

Devi's current work requires reading and commenting, not approving releases. The third membership therefore needs its own appropriateness investigation.

All three memberships are **standing access**: they do not require a separate activation before each use. Just-In-Time access, which has separate activation behavior, is outside the main example.

BuildLedger also requires an enabled account, successful sign-in and the relevant assigned-project scope. Devi's account is enabled, she can sign in, and its assigned project is North.

The proposed profile is **Release evidence review**, containing the first two entitlements. It deliberately excludes Release Approvers.

We will call the profile `AP-5505` and its referenced ISC entitlement records `E-5501` and `E-5502`. These are teaching labels, not real ISC ID formats or an API payload. The ISC record identifiers are distinct from native group keys.

The profile is enabled. Direct requests for it are off in a supported request configuration. No role or lifecycle requirement grants this profile in the main example.

## An entitlement in the catalog is not a membership

ISC needs information about both the access item and who holds it.

**Entitlement aggregation** collects definitions and details of access items, such as their names and descriptions. It can build a catalog containing groups that no account currently holds.

**Account aggregation** collects account records, including the fields that represent their entitlement holdings. Reading a group definition and reading an account's membership in that group answer different questions.

The source's **account schema** describes its account fields and identifies which represent entitlements. In this example, the `groups` field carries the membership keys. Its entitlement type and values are correctly linked to the represented group objects.

The collected account shows `BL-5501`, `BL-5502` and `BL-5599` in that field.

That is relevant holding evidence. The mere existence of three group definitions in the catalog would not establish that Devi holds any of them.

The account must also be associated with the right person. **Account correlation** is the matching and association of source accounts with ISC identities. A correctly read membership on someone else's account is not evidence that Devi holds it.

When investigating detection, follow the exact source, entitlement references, account holdings and account-to-identity association. Familiar display names are not enough.

## Detection recognizes the complete required set

**Access-profile detection** is ISC recognizing during identity processing that a user holds all the entitlements in an access profile and associating that profile with the identity.

**Identity processing** evaluates identity information and applicable access-model configuration. It is different from the source read that supplied the membership data.

For the single-account situation here, compare the profile's exact two entitlement references with the holdings recorded for Devi through `bl-110505`.

Does the recorded access include Release Readers? Yes.

Does it include Review Comments? Yes.

Both required items are present, so the complete profile set is present.

```text
Profile AP-5505 requires
E-5501 -> group BL-5501
E-5502 -> group BL-5502
             |
             | compare recorded holdings
             v
bl-110505: BL-5501 + BL-5502 + BL-5599
             |
             | required set present
             v
ISC associates AP-5505 with Devi

Detection does not add native groups.
BL-5599 remains outside this profile.
```

The arrows from `E-5501` and `E-5502` identify the native items represented by those records. The comparison arrow means checking the required set against recorded holdings. It does not mean writing those memberships to the application.

Notice the extra group, `BL-5599`. Holding the required set does not mean holding only that set.

The extra membership does not become part of Release evidence review merely because it is on the same account. Nor does recognizing the two-item package remove the extra membership.

Detection gives the existing required combination a profile association in ISC. It does not create a new native parent group or replace the two native memberships with a single BuildLedger membership called `AP-5505`.

The way ISC groups or presents access can change while the actual application permissions remain the same.

## Trace the existing-access path before calling it a grant

The supplied timeline makes the distinction concrete.

At **09:00 UTC**, native inspection shows all three groups on `bl-110505`. A controlled North-project read and review comment already succeed.

At **09:10 UTC**, the account information available in ISC records those same group holdings and the correct association with Devi. The group definitions and linkage are also correct.

At **09:20 UTC**, the team saves and enables Release evidence review with `E-5501` and `E-5502`.

At **09:25 UTC**, the reviewed access-model changes are applied through the relevant identity processing. Saving a new profile does not itself establish that every unchanged identity has already been evaluated against it.

At **09:28 UTC**, the supplied identity evidence shows `AP-5505` associated with Devi. No profile request, role assignment or lifecycle requirement explains a new grant. The existing collected set explains the association.

A fresh native check still shows the same three memberships. The application action worked before the profile existed and still works afterward.

The profile association is new. The underlying reading and commenting access is not new in this timeline.

That does not mean every identity-processing run is read-only. The same run can evaluate other requirements and initiate unrelated changes. We are separating this detection result from any separate provisioning work, not promising that the whole run can never write to a source.

These times are fictional observations, not fixed delays or a universal processing order.

## A partial set does not tell ISC to complete the package

Now take an independent variation of the same example.

Devi's account has only `BL-5501`. The profile still requires both `BL-5501` and `BL-5502`. No approved request, applicable role, lifecycle requirement or other grant route supplies the second item.

Detection cannot establish the complete profile set. One required entitlement is missing from the recorded holdings.

Does ISC add `BL-5502` just to make the profile fit?

No. Detection recognizes a combination already held. It is not a rule saying everyone who holds one component should receive the rest.

That distinction prevents a serious design mistake. A broadly held reader group could otherwise become an unintended route to editing, approval or other access bundled with it.

If the business wants readers with a particular responsibility to receive commenting access, define that requirement through an appropriate supported grant route. Do not expect the detection comparison to invent it.

An ISC **role** is a broader access requirement that can include profiles and use configured membership criteria or a list of identities. A **lifecycle state** describes an organizational stage, such as prehire or working, and can have configured access requirements.

Those configurations can select recipients and require access. They are different from discovering that a recipient already holds a complete set.

## A separate request can require the missing access

Continue with the partial-access variation, but now change the authorization facts.

The organization makes Release evidence review directly requestable. An **access request** asks for access to be given to a recipient. A **requestable** profile allows that direct request route under the supported configuration; it does not grant access merely by being visible.

Devi submits an eligible request for access now. The configured manager review approves it. An **approval** is the decision that the request may proceed.

**Provisioning** is the separate work of changing a source account or its access through a supported integration or manual process.

The observed operation in this variation attempts to add the missing `BL-5502` membership to `bl-110505`. That operation changes the source account; detecting an already complete set did not require this change.

```text
Independent partial-access variation
bl-110505 has BL-5501 only
             |
             v
Detection: required set incomplete
No missing-group grant from detection

Separate approved profile request
             |
             v
Provisioning attempts BL-5502 addition
             |
       +-----+------+
       |            |
    rejected     delivered
       |            |
       v            v
Verify absent   Verify native membership
Investigate     and intended action
```

The upper portion shows why detection alone stops short of associating a complete set in this variation. The lower portion introduces a separate approved request. It is not a continuation that detection automatically starts.

The two outcome branches compare different possible provisioning results. They are not two simultaneous outcomes for one operation.

If the operation reports a permission rejection and a current native check shows `BL-5502` absent, the missing access has not been delivered. Investigate the selected account, operation and source permissions.

If the operation is delivered and native evidence confirms `BL-5502` alongside `BL-5501`, test the intended action with the relevant account and project conditions. The application can then permit commenting under the supplied native rule.

Do not turn this example into a promise that every connector issues exactly one minimal write or handles an already held entitlement identically. The concrete operation here is supplied evidence. Verify the actual operation for the source you are managing.

A manual delivery path needs the same separation. An approved requirement can produce a task for a person to make the change; the existence of that task is not proof that the native membership was added.

## Recognition does not establish who approved the original access

Return to the main example, where the groups predate the profile.

The profile's name matches a useful work capability. That does not prove that every current holder was approved for the capability.

Detection can organize access that was granted through another process, including access added directly in the application. It does not retroactively create an approved ISC request or reconstruct a missing business justification.

Devi's extra Release Approvers membership makes this visible. The detected review profile does not explain why she can approve releases or establish that she should.

Distinguish three dates: when a native grant happened, when ISC collected it, and when ISC recognized the profile combination. They can differ. In our example, the 09:00 inspection establishes that access already existed then, not the exact date someone originally granted it.

To investigate origin, examine available request decisions, role/lifecycle assignment evidence, application audit records and approved work requirements. **Assignment origin** means the route by which an access association or requirement arose.

Missing request history alone does not prove detection was the origin. There could be another configured route, an earlier record outside the available history, or insufficient evidence. In our controlled main example, the supplied configuration and before-and-after observations establish the detection explanation.

When the real evidence is incomplete, say what you know and what you still need. Do not manufacture a historical approval from a current profile label.

## Recorded access is not a live authorization test

ISC's comparison depends on the information available to it. That information can differ from the current application state.

Suppose a native administrator removes `BL-5502` after the 09:10 account read. ISC still has the earlier full-set record when the new profile is evaluated.

That recorded set is no longer reliable evidence of current native membership. The comparison and the current application result can disagree because they concern different observations, not because the profile association has magically restored a group.

Inspect collection scope and freshness, the specific account's recorded values, the relevant processing and the native state.

A successful group-definition aggregation does not resolve a stale account-membership record. A source-wide success message also does not, by itself, prove that a particular account was included and updated.

Conversely, the two groups can be present and correctly detected while a South-project comment is denied. Under the supplied native rule, Devi's account is scoped to North. The denial does not automatically mean a membership is missing.

If you are dealing with multiple accounts or inherited access, establish which native account and supported represented relationships are involved. Do not add together permissions from unrelated accounts or assume that every native inheritance path is automatically represented in the same way.

Use each observation for the claim it can actually support:

| Observation | What it establishes, and what it does not |
|---|---|
| The profile contains `E-5501` and `E-5502` | The package definition. Not a membership or an approved recipient. |
| The two groups exist in the entitlement catalog | Represented access objects. Not proof that Devi holds them. |
| A correctly linked, collected account records both memberships | Recorded full-set holding evidence at that observation. Not a continuous live check of the application. |
| The identity shows `AP-5505` | A profile association in ISC. Alone, it does not establish a new native grant or historical approval. |
| An approved request and its account activity identify an attempted addition | A decision and a specific operation. The operation can still be pending or unsuccessful. |
| Current native membership and a controlled North-project comment succeed | Present capability under those account and resource conditions. Not authorization for every project or proof that all other access is appropriate. |

## Detection is useful for governance, but it is not cleanup

The benefit is practical: an existing reader-and-commenter combination can be governed as a meaningful capability rather than forcing a reviewer to infer the relationship between technical groups.

A **certification** is a review of whether existing access should be retained. Detected profiles can be reviewed through the applicable certification configuration. A profile association is information for that decision, not the decision itself.

The reviewer still needs the package's current meaning, the person's work need and relevant access outside the package. Release Approvers does not become appropriate because Release evidence review is sensible.

Do not use package creation to make an excessive membership look less visible or to imply that recognition has removed it. Inspect the person's full relevant access.

Also distinguish recognizing a profile from revoking one. A **revocation** asks for access to be taken away. Revoking a detected profile is not necessarily a harmless removal of a label: a supported revocation can remove its underlying entitlements.

Before any removal, establish the actual assignment requirements and the operation's documented overlap behavior. Do not assume another profile always preserves a shared entitlement. Verify the selected native result separately.

## An observed combination is not a promise to add future contents

Consider one final changed condition.

The profile originally contains two entitlements and was associated with Devi through detection only. The owner later adds a third entitlement, `BL-5503`, for a newly required comparison feature.

Devi does not already hold that third entitlement. No role or lifecycle assignment requires it, and there is no new grant request.

For profiles held through detection, adding an entitlement to the definition does not provision that added entitlement to existing holders. At the next relevant identity evaluation, the identity retains the profile only if it already holds the complete revised set.

The old native holdings do not automatically change merely because the definition now contains another item.

That is a specific definition-change rule. Do not generalize it into a universal statement about every removal, retry or repair operation. Profiles required through roles or lifecycle states have different documented change behavior.

The engineering habit is to establish the current definition and the assignment origin before predicting its effect on people.

## Work through the evidence

### Case 1: Both groups are in the catalog

**Facts:** `BL-5501` and `BL-5502` have catalog entries. Devi's collected account records only `BL-5501`.

Is the catalog enough to detect the two-item profile for Devi?

**Reasoning:** No. A catalog entry describes an access object, not the account's membership. Inspect the entitlement-bearing account field and its linkage. The recorded holding set in this case is incomplete.

### Case 2: One group is present and no grant route exists

**Facts:** The enabled profile contains the two groups. Only the reader is recorded. No request, role, lifecycle requirement or other authorized grant route supplies the commenter.

Should detection add the commenter membership?

**Reasoning:** No. It does not convert partial holdings into a grant requirement. Establish the approved work need and configure or use an appropriate supported route if additional access is justified.

### Case 3: The account has the required pair plus an approver

**Facts:** Devi is correctly associated with a collected account holding `BL-5501`, `BL-5502` and `BL-5599`. The profile references only the first two.

Does recognizing the profile establish that she has only review access?

**Reasoning:** No. The required pair is present, but the extra approver remains outside the bundle. Inspect the full relevant access and the approval responsibility. Detection does not remove or legitimize that extra capability.

### Case 4: No direct requests are allowed

**Facts:** The enabled profile is not directly requestable. The full required set already exists in the correctly represented account holdings, and relevant processing evaluates it.

Does the absence of a request prevent recognition of existing access?

**Reasoning:** No. Requestability controls the direct profile-request route. Detection recognizes the supplied complete set; it does not need to create a request for memberships already held.

### Case 5: The native membership changed after the read

**Facts:** ISC's account record contains both groups from 09:10. A native administrator removes the commenter at 09:15. The current application denies commenting, while the profile association is still visible in ISC.

Does the visible association prove that commenting still works?

**Reasoning:** No. The records concern different observations. Inspect the native account, the membership read's scope and freshness, and the subsequent processing. Do not try to fix current access merely by trusting or renaming the profile label.

### Case 6: The request was approved but the write failed

**Facts:** In the partial-access variation, the new request is approved. The commenter-add operation reports a source permission rejection. A current native check confirms the commenter is absent.

Has the approval supplied the missing membership?

**Reasoning:** No. It supplied the decision to proceed. The observed source operation failed. Investigate that specific failure, use an authorized supported recovery path and verify the resulting membership and action.

### Case 7: North works and South fails

**Facts:** Both groups are present on Devi's enabled account, sign-in succeeds, and the account is assigned to North. A North comment succeeds; a South comment is denied.

Does the South denial prove profile detection was wrong?

**Reasoning:** No. The account's scope explains the supplied outcome. Detection of the two entitlements is not a guarantee of authorization on every resource. Verify the native project condition before diagnosing a missing grant.

### Case 8: The detected profile gains a third item

**Facts:** Devi held the original two-item profile through detection only. Its definition now also requires `BL-5503`, which she lacks. No role/lifecycle requirement or new grant request applies.

Should the definition edit provision the third item automatically?

**Reasoning:** No. For this detection-origin definition change, the added entitlement is not provisioned. After relevant evaluation, the profile is retained only if the revised full set is already held. Do not mistake the old association for an ongoing requirement to deliver every future addition.

## Try the distinction on a different source

A fictional directory source supplies two groups: `D-51` allows viewing support tickets and `D-52` allows adding internal notes. An enabled **Ticket collaboration** profile references both.

The catalog contains both groups. One employee's correctly associated account records both memberships. Another employee's account records only `D-51`. Neither has a role/lifecycle requirement or a request for the profile.

Explain what can be recognized, what cannot be inferred about approval, and whether the second employee should automatically receive `D-52`.

The first employee's complete represented set supports detection during relevant processing. The catalog alone would not. That association does not prove who authorized the original memberships or whether they remain appropriate.

The second employee has only a partial set. Detection does not grant the missing internal-notes capability. Establish that person's work requirement before choosing any grant route.

Now change the evidence: a source administrator confirms the first employee's native `D-52` membership was removed after the last account read.

The earlier represented full set no longer proves current capability. Investigate the updated account collection and processing, while checking the current native permissions used by the ticket application.

Do not report that a newly appearing profile means a newly delivered permission. Connect the package definition to recorded holdings, the association's origin, any actual source operation and the current application result.
