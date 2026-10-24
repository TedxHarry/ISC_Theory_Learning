# The profile is enabled. Who actually receives its access?

Devi, employee `110404`, maintains work orders in AssetRoute Production, a fictional application. Her account, `ar-110404`, already exists and can sign in. It does not yet have the memberships needed to read and update work orders.

The engineering team creates a package called **Work-order maintenance**, adds the required access items and enables it.

Devi still cannot update a work order.

Has enablement failed?

Not necessarily. We have established that the package can be used, but we have not yet established why Devi should receive it. A package definition and a decision to give that package to someone are different things.

All records, configurations, times, permission rules and observations here are fictional. The example uses a supported integration contract, not a claim that every source can perform these operations.

## Separate the package from the person receiving it

In SailPoint Identity Security Cloud, or ISC, an **entitlement** represents a source access right, such as a group membership. An **access profile** bundles related entitlements from one source.

A **source** represents a connected system or account-data collection in ISC. Its **connector** is the integration that reads information and, where supported and configured, makes changes.

Here, one source represents AssetRoute Production. The fictional connector supports reading accounts and groups and updating group memberships.

The profile contains two entitlements:

- `AR-4401`, Work-order Readers, permits reading work orders at the account's assigned site.
- `AR-4402`, Work-order Editors, permits updating those work orders when the same account also has Work-order Readers.

Neither group permits application administration. The application also requires an enabled account and successful sign-in. Devi's assigned site is North.

An **account** is the application's login record. An ISC **identity** represents the person. Devi's identity is correctly associated with `ar-110404`, her only account on this source.

We will call the access profile `AP-4404`. This is a teaching label, not a real ISC ID format or an API payload. The selected entitlements refer to the two Production groups, not similarly named Test groups.

The groups provide **standing access**: these memberships do not require a separate activation each time Devi uses the capability. Just-In-Time access, where access is activated for a limited period, has additional behavior and is not part of this example.

At the start, neither group is on Devi's account. There is no approved request, no applicable role assignment and no lifecycle configuration requiring this package.

That last sentence explains why simply enabling it has not given Devi access.

## Enabled answers whether the profile is available for use

When you create a profile in the administrative interface, it starts disabled. It needs entitlements before it can be enabled.

An **enabled** profile can participate in supported access delivery. A **disabled** profile is not provisioned through the profile, even if an existing role or lifecycle configuration still references it.

Enablement is a setting on the profile. It is not an employee-selection condition.

Changing it does not mean “give this to everyone,” “give this to everyone on the source,” or “give this to everyone with the same department as the owner.”

It also does not enable Devi's application account. That account has its own enabled or disabled condition in AssetRoute. The profile and the account are different objects, so their status fields answer different questions.

When you see an enabled profile in the administrative interface, you are looking at the status of that access-model object. You are not looking at proof of a completed membership change for a particular person.

To explain an actual grant, continue to the route that requires the access.

## Requestable answers whether the profile itself can be requested

An **access request** asks for access to be given to a recipient. ISC's **Request Center** is the user-facing place for finding and submitting supported access requests.

A profile marked **requestable** is configured to allow requests for that profile. The profile must also be enabled. Audience restrictions and the organization's supported request experience still matter.

The relevant configuration is commonly presented as **Allow Access Requests**. In the access-profile model, `enabled` and `requestable` are separate yes-or-no properties.

Do not assume their values from a screenshot of one toggle, an old article or a remembered default. Inspect the saved configuration in the tenant you are working on. This example assumes a Request Center configuration that supports making an enabled profile non-requestable.

Compare these situations:

| Profile configuration and route | What follows from the supplied facts |
|---|---|
| Disabled, even if a requestable value is present | The profile is not available for direct requests or provisioned through its role/lifecycle references. Existing native access is a separate question. |
| Enabled, not requestable, no applicable assignment route | Enablement alone gives nobody new access. No recipient has been selected. |
| Enabled, not requestable, included in an applicable automatic assignment | Profile requests are unnecessary for that assignment route. Access delivery still depends on processing and provisioning. |
| Enabled and requestable, no request submitted and no applicable automatic assignment | The direct request route is available where permitted. No grant follows merely from making the choice available. |

The table separates request availability from recipient selection. It does not claim these are the only access arrangements ISC supports.

A profile can be useful for automatic access without appearing as a separately requestable choice. Conversely, a requestable profile can remain unassigned until someone makes an appropriate request.

## A request still needs a decision and delivery

For an independent variation, suppose the organization enables direct requests for Work-order maintenance.

Devi is an eligible recipient, can find the package, submits the required justification and asks for access now. The supplied reviewer configuration requires her manager to approve.

An **approval** is the decision that the request may proceed. **Provisioning** is the separate work of changing the source account or its access through a supported integration or manual process.

Before approval, the submitted request is not evidence that the groups were granted. After approval, you still need to establish what happened to the account.

The supported route must select the right account and perform the required membership changes. A pending activity, a permission rejection or an uncompleted manual task can prevent delivery.

If a future start date is configured, an approval also does not mean the access should be available before that start date. Check the request's conditions, not just the word “Approved.”

Requestability does not promise that approval is required in every configuration. Local and global approval settings determine the applicable review behavior. Turning off a local approval option is not proof that no global approval applies.

Nor is a profile's owner automatically its reviewer. Inspect the actual review configuration.

Keep another distinction in mind: a requested ISC role uses the role's approval process. It does not automatically run the request-approval chain of every profile it contains. Review request exposure at the object being requested; a profile's direct-request setting is not a complete policy for every route to its underlying entitlements.

## Automatic assignment needs an actual rule or requirement

An ISC **role** represents a broader access requirement, such as the access needed for a business responsibility. It can include access profiles.

An automatically assigned role has configured **membership criteria**, meaning conditions used to select the identities that should receive it. In another supported arrangement, the role can use a configured list of identities. A role's name alone selects neither.

A **lifecycle state** describes a person's stage in the organization, such as prehire, working or leave. The identity's governing **identity profile** is the configuration that defines its identity mappings and lifecycle options.

For this example, Devi's current applied identity values are:

- `department = Facilities`.
- `lifecycleState = working`, the technical name of the enabled lifecycle state displayed as **Working**.

An **identity attribute** is a named value on the ISC identity. These are the applied values, not merely values shown in an upstream HR screen or an unapplied preview.

The team now defines and enables an ISC role called **Facilities technician**. It includes `AP-4404`. Its automatic membership criteria require both:

1. Department equals `Facilities`.
2. Lifecycle state equals `working`.

The conditions are joined with **AND**. Both must be satisfied. An employee in Facilities who is still in prehire does not satisfy this supplied rule.

The profile remains enabled and non-requestable. The role provides the reason for assigning it; the profile's request setting does not decide whether Devi meets the role criteria.

An alternative would be to include the profile as an access requirement of the enabled Working lifecycle state. That would apply within the governing identity profile and state, not select Facilities staff merely because the package name sounds department-specific.

These are different designs. A lifecycle requirement can be too broad for a department-specific need. Choose it only if everyone covered by that state should receive the package.

Neither design requires a separate profile request from each qualifying person. Their authorization comes from the configured access model. Automatic role/lifecycle assignment does not invoke the profile's direct-request approval chain.

This is why criteria, state configuration and the people they cover need careful review before application.

## Follow the route beyond the setting

**Identity processing** evaluates identities against configured mappings and access requirements. It is where current identity values and applicable role/lifecycle requirements can lead to access changes.

Saved access-model changes need the relevant processing to affect identities. For a reviewed set of role, access-profile or application changes, **Apply Changes** initiates that recalculation. Application from those list pages covers the related role, profile and application configurations together; do not treat it as an isolated change to the row you last edited.

Processing is not proof that the final source write succeeded. It can establish a requirement and start provisioning without validating completed delivery.

Here are the two route families we have described:

```text
Enabled profile AP-4404
|
+-- Direct profile request
|   Requestable + allowed audience
|   Submit and review as configured
|
+-- Automatic assignment
    Enabled role + matching criteria
    OR lifecycle access requirement

A route establishes required access.
             |
             v
Account selection and provisioning
             |
             v
Verify native memberships and action

Enablement alone creates no route.
```

The top branches show alternative reasons for requiring access. They are not stages everyone must pass through. An automatic assignment does not wait for a direct profile request.

“Allowed audience” means the configured request permissions and visibility allow the intended request. “Lifecycle access requirement” means an actual configured requirement for the person's governing state, not the existence of a state name.

The lower arrows mean that a required account change still needs delivery and verification. They are a simplified teaching sequence, not a private backend architecture or a promise about every service's execution order.

Account selection also matters. In the main case, Devi has one account. If she had multiple accounts, supported automatic account-selection criteria and request-time account selection would need separate inspection. Enabling the profile does not identify the correct account by itself.

Automatic assignment also does not promise automatic source writes. If the source's delivery path requires a manual task, a person must perform that change. The assignment can be automatic while delivery still needs human action and native verification. Our main example instead uses the supported group-membership integration.

## Trace what changed for Devi

Return to the main automatic-role example. Direct requests remain off.

At **10:00 UTC**, `AP-4404` is enabled, but no role or lifecycle requirement yet includes it. Native evidence shows neither group on `ar-110404`.

At **10:15 UTC**, the reviewed Facilities technician role and its membership criteria have been saved and enabled, and the relevant access-model processing is initiated.

At **10:17 UTC**, the supplied ISC evidence shows Devi assigned to that role. The relevant provisioning activity is still pending. Native inspection still shows neither group.

That is enough to establish an assignment decision, not working access. There is no contradiction in the application continuing to deny an update while delivery is pending.

At **10:24 UTC**, later native inspection shows both `AR-4401` and `AR-4402` on `ar-110404`. With her account enabled and sign-in successful, a controlled update to a North-site work order succeeds. An update to a South-site work order is denied, consistent with the supplied assigned-site restriction.

No direct profile request was submitted. That is expected because the role selected Devi automatically.

The times are fictional observations, not service-time guarantees. The gap between a role assignment and a successful application operation cannot be replaced with a universal waiting period.

Use separate evidence for separate questions:

| Question | Evidence that answers it |
|---|---|
| Can this profile participate, and can it be requested directly? | The exact profile's saved enabled/requestable settings and applicable request configuration. Not its name alone. |
| Why should this identity receive it? | Current applied identity values, enabled role and criteria or configured lifecycle requirement, plus the observed assignment. |
| Which account and change are involved? | The selected source/account and provisioning activity or manual task, including the specific operation and result. |
| Does the intended work now succeed within scope? | Current native memberships and a controlled application action with the required account, sign-in and resource conditions. |

If someone reports “ISC gave her access without approval,” establish the origin before diagnosing a bypass. A correctly configured automatic assignment does not need the profile-request review chain.

If that assignment was inappropriate, investigate the configured criteria and requirement, the applied inputs and the approval of the access-model change. Adding request approvers does not repair an overly broad automatic role rule.

## Turning off requests does not take back existing access

Suppose an independently requested, enabled profile should no longer be offered as a direct request choice. The team turns off Allow Access Requests using the supported configuration.

That closes the direct profile-request route. It does not, by itself, remove a membership already granted to an account.

It also does not disable a role, remove a lifecycle requirement or revoke their existing assignments.

In the main automatic-role case, requests were already off while Devi received the groups. That alone demonstrates why the requestability setting cannot be used as a universal switch for access.

Do not infer what happened to an already submitted or executing request from the current toggle alone. Inspect the request and its activity and use a supported, authorized action if it must be stopped. Changing a catalog setting is not evidence of cancellation.

## Disabling the profile pauses its use, not the native memberships

Now the team needs to pause Work-order maintenance while reviewing its design.

At **11:00 UTC**, it disables `AP-4404`.

A disabled profile is removed from the Request Center if it was previously offered there. Existing roles and lifecycle configurations can still reference it, but it is not provisioned through those references while disabled.

At the next relevant identity processing, the profile association is removed from identities that held it. However, disabling the profile does not deprovision the entitlements they already received.

At **11:06 UTC**, the supplied processing and identity evidence show Devi no longer associated with `AP-4404`. A fresh native check still shows both groups on `ar-110404`, and her North-site update still succeeds.

```text
Before the pause
AP-4404 enabled
Devi associated with AP-4404
ar-110404 has AR-4401 + AR-4402
Work-order updates allowed
          |
          | disable profile
          v
After relevant identity processing
AP-4404 disabled
Profile association removed
ar-110404 still has both groups
Work-order updates still allowed

Native removal needs separate action.
Disabling is not that action.
```

The arrow shows this particular pause followed by relevant processing. It does not show native removal, because the disable action did not perform it.

This is not proof that the application ignored ISC. The profile association and the native memberships are different state.

If the business intention is “Devi must no longer update work orders,” the team needs an authorized access-removal design appropriate to how her access was assigned. It must review ongoing role/lifecycle requirements and other relevant grants, perform the supported change, and verify the native result.

Do not assume every overlap preserves access, or that every profile can be revoked directly regardless of its assignment origin.

A disabled profile can also remain in an existing **certification**, a review of whether existing access should be retained. Disabling does not automatically cancel that review or make its revocation decisions unenforceable.

## Before enabling it again, inspect what still refers to it

The disabled profile has not forgotten its place in the access model.

If the Facilities technician role still includes `AP-4404`, reenabling and applying the configuration can make it available for that role's provisioning again. Review the current population and criteria before doing so.

Also check the saved request setting. “Enable again” is not a reason to assume the profile should become a direct request choice.

If the profile became disabled unexpectedly, inspect its entitlement references. ISC can disable a profile automatically when all its entitlements are deleted. Verify whether the intended entitlement objects still exist and whether the references remain valid. Do not blindly reenable an empty or incorrectly rebuilt package.

A source's configured provisioning capability, an enabled role, an enabled lifecycle state and an enabled profile are separate parts of the access path. Follow their actual relationships rather than treating one status label as the status of the whole path.

## Work through the evidence

### Case 1: Enabled, but nothing selects Devi

**Facts:** The profile is enabled and non-requestable. Devi has neither group. No applicable role, lifecycle requirement or other grant route is configured.

Should enabling the profile have added its groups to her account?

**Reasoning:** No. The package is available for use, but the supplied configuration selects no recipient. Establish the intended assignment route. Repeatedly applying an unchanged definition does not invent a missing requirement.

### Case 2: The profile is not requestable, but the role matches

**Facts:** The profile and Facilities technician role are enabled. The role includes the profile. Devi's applied values satisfy both criteria, and relevant processing evaluates them.

Does the non-requestable setting prevent automatic delivery?

**Reasoning:** No. It controls direct requests for the profile, not this configured automatic role assignment. Follow the resulting source/account provisioning and verify the native groups before claiming completed access.

### Case 3: The profile is requestable, but nobody requested it

**Facts:** The enabled profile allows direct requests. Nobody submits one. No automatic assignment applies and the groups are absent.

Has marking it requestable selected all eligible requesters as recipients?

**Reasoning:** No. Availability is not submission or assignment. The setting permits a route where the other conditions are met; it does not execute that route for every person who can see the item.

### Case 4: One condition matches and one does not

**Facts:** A different employee has `department = Facilities` and `lifecycleState = prehire`. The enabled role requires Facilities AND working. No other grant route applies.

Should this role give the employee Work-order maintenance?

**Reasoning:** No. AND requires both conditions. The lifecycle value does not match. Verify the actual applied values and whether the criteria express the approved requirement. Do not weaken the condition simply to make a test account qualify.

### Case 5: A request is approved for later

**Facts:** In an independent request-based variation, Devi has no groups and no automatic assignment. Her profile request is approved today, with a future start date. That start date has not arrived.

Does the approval alone prove provisioning failed because she cannot update work orders now?

**Reasoning:** No. The request's timing conditions do not yet require current delivery. Check the start date and time zone, the request status and the later operation. Approval and the access-start boundary are different facts.

### Case 6: The role still contains a disabled profile

**Facts:** Facilities technician is enabled and contains `AP-4404`. The profile is disabled. A newly qualifying employee lacks both groups.

Does the remaining reference mean the profile's groups should be provisioned anyway?

**Reasoning:** No. Existing configuration can retain the reference without the disabled profile being provisioned. Verify the profile state and the approved reason for the pause. Do not reenable it merely to make the reference look active.

### Case 7: Processing ended, but the change was rejected

**Facts:** The role assignment is recorded. Identity processing finishes. The specific group-add operation reports a source permission rejection, and current native evidence shows the group absent.

Can you conclude delivery succeeded because processing completed?

**Reasoning:** No. The assignment calculation and the source operation have different outcomes. Investigate the recorded operation, selected account and source permissions. Correct the verified cause under authorization, follow the supported recovery path and recheck native access. Changing requestability does not fix a rejected source write.

### Case 8: The profile label disappeared

**Facts:** After disabling and processing, Devi's identity no longer shows `AP-4404`. Native evidence still shows both groups, and a North-site update succeeds.

Has removing the profile association removed her ability to maintain work orders?

**Reasoning:** No. Disabling retained those native entitlements. The observed behavior matches that distinction. If removal is required, establish the supported operation and ongoing assignment requirements, perform the authorized change and verify the actual application outcome.

## Try the same reasoning with a license

A fictional design application has an enabled **Design editor** profile containing its editor-license entitlement. Direct profile requests are off. An enabled **Product designer** role includes that profile and selects identities whose applied job code is `DESIGN`.

One designer matches the criterion, but the attempted license assignment reports that no license capacity is available. A second employee does not match the role and has no other assignment route.

Explain why neither employee currently has working editor access, and whether enabling profile requests would solve either cause.

For the designer, the configured automatic requirement exists. The supplied failure is in license delivery. Investigate capacity and the supported recovery process. A new request does not create a spare license.

For the second employee, the supplied model creates no requirement. Establish whether the employee should qualify for the role, receive an approved exception through another supported route, or remain without access. Do not falsify the job code to force membership.

If the organization chooses to offer an exception request, it must deliberately configure the request route and its controls. Turning on requestability is only part of that design, not an assignment to the employee.

Finally, suppose an existing designer already has the native editor license and the team disables the profile. Do not report the license reclaimed merely because its profile association disappears. Verify the required native license removal and the resulting capacity separately.

Whenever a setting changes, ask which object changed, which route it controls, and what evidence establishes the account's actual access.
