# The same role was granted in two ways. What changes?

Devi can review evidence in ReviewHarbor. Her colleague can do the same work. Both have the **Evidence reviewer** role in SailPoint Identity Security Cloud, or ISC.

Devi received it because her job matched the role's membership rules. Her colleague requested it to cover a short project.

The resulting permission may look identical in ReviewHarbor. But those two explanations are not interchangeable. They tell us what authorized the access, which records to investigate, and what should happen when the work ends.

Start with this question: **Why does this particular person hold this particular assignment?**

## Put the role, the person, and the account in view

ReviewHarbor is a fictional evidence-review application. Devi, employee **120404**, normally reviews evidence for the Assurance team. ISC has an identity record representing her, linked to her existing ReviewHarbor Production account, **rh-120404**. That link is account correlation: it tells ISC which person's record the account belongs to.

Her account is enabled, she can sign in, and its resource scope is North. Signing in proves who she is; permission to review North evidence is a separate decision inside ReviewHarbor.

The enabled standard role **R-1204, Evidence reviewer**, contains one enabled access profile. An access profile bundles related rights from one source. Here it contains two group entitlements:

- **RH-8401, EvidenceReaders**, permits reading North evidence.
- **RH-8402, ReviewComments**, permits adding review comments, but only when EvidenceReaders is also held.

An entitlement represents a source-system access right, such as membership in one of those groups. A source is ISC's configured representation of a managed system and its accounts. The connector is the integration that reads or changes that system.

Neither group permits final approval, export, or administration. Those limits come from the fictional application's permission rules, not from the friendly name of the role.

This example assumes supported provisioning and ordinary standing access: once delivered, the rights can be used without activating each session. It does not use Just-In-Time access. All people, identifiers, policies, times, and results below are supplied examples, not observations from a tenant.

## Automatic assignment: the decision is built into the membership policy

The business has authorized regular evidence reviewers to receive this role. The configured Standard Criteria require all three current identity values:

- Department equals `Assurance`.
- Job code equals `EVIDENCE-REVIEW`.
- Lifecycle state equals `working`.

A lifecycle state represents a stage such as working, prehire, or departed. Here `working` is the configured technical name used in the criterion. It is not a universal ISC state name.

Devi's current values match all three. When relevant identity processing evaluates that enabled role, the configured policy supplies the basis for assigning it. Identity processing is the calculation that applies current identity and access-model configuration to the person.

There is no separate role access request waiting for a reviewer to approve Devi's ordinary criteria-based assignment. That does **not** mean the access has no authorization. The authorization was established when the organization approved the role's contents, recipient policy, and operation.

Think about the difference in responsibility. A request reviewer decides whether a particular proposed grant is justified. An automatic-policy owner must ensure that everyone selected by the rule is justified. A broad or stale rule can make a bad decision repeatedly.

ISC also supports **Identity List** as an alternative automatic membership configuration. An administrator explicitly selects ISC identities for that list. Selecting Devi there is not the same event as approving an access request. The maintained list, rather than her department/job comparison, supplies the membership basis. Standard Criteria and Identity List are alternative selector methods, not an assumed combined rules-plus-exceptions list.

Saving a selector is also different from applying it to identities. Configuration changes need relevant identity processing; an editor's successful save is not evidence that Devi's account groups changed.

## Requested assignment: a particular need goes through a request

Now consider an **independent alternative** for Devi. Keep her identity, account, and the role's contents the same, but suppose her current job code is `PROJECT-COORD`, not `EVIDENCE-REVIEW`. She does not meet the automatic criteria. She needs to review North evidence temporarily while covering a project.

This is an alternative history, not a second grant added to the first one. At its start, she has neither role assignment nor either group through any other route.

The role is configured to allow access requests, and Devi is allowed to request it. She submits a request for the Evidence reviewer role, with a justification and access dates. The request identifies the **recipient**, who will receive access; that person need not always be the **requester**, who submits the request.

For this example, the applicable review chain is Devi's manager followed by the role's primary owner. Both must approve. The manager checks whether the cover work is real; the owner checks whether this role's actual rights fit it.

A rejection ends this request's path to a grant. An unresolved review is not an approval. Neither situation means the automatic criteria failed to execute.

The criteria did not become true when the owner approved. Instead, a different configured authorization route accepted this specific need. **Automatic membership criteria are not automatically the eligibility filter for requesting that role.** Request availability, requester permissions, applicable controls, and the review decision still matter.

A role can support automatic assignment and requests at the same time. That is useful when the core team needs a right routinely and approved cover workers need it occasionally. It does not mean anyone can request anything, or that every request will be accepted.

## Requestable does not mean assigned

It helps to separate the switches and decisions.

| Configuration or evidence | What it tells you |
|---|---|
| Role enabled | The role is available for its configured assignment mechanisms. This alone selects nobody. |
| Automatic selector matches or includes Devi | There is a configured automatic membership basis to evaluate. It is not a request approval. |
| Role allows access requests | Requests are permitted for the role under applicable availability and permissions. No grant has happened merely because it is requestable. |
| Submitted request | Someone asked for a particular recipient to receive access. Submission is not authorization or delivery. |
| Required reviews approved | That request passed its required review decisions. Future dates and fulfillment still matter. |
| Reported source operation | A particular account change has an outcome to investigate. Read its scope and errors. |
| Native account and task evidence | You can assess what the target system currently permits on the intended account and resource. |

In the administration experience, **Define Assignment** answers the automatic-membership question. **Access Requests** answers whether and how the role can be requested. **Manage Access** describes its contents. They connect to the same role, but they do different jobs.

One more boundary matters. If the role includes an access profile, a request for the **role** uses the role's approval process, not an extra copy of that profile's direct-request approval process. The profile's own request settings govern requests for the profile itself. Automatic role assignment does not run those direct-request approvals either.

For our example, role approval is explicitly required. Elsewhere, do not infer “no approval” from one unchecked item-level option: applicable global approval configuration still needs checking.

```text
AUTOMATIC ROUTE      REQUEST ROUTE
Current criteria     Recipient + role
or identity list     + business need
        |                    |
Relevant identity    Applicable review
processing           + allowed dates
        |                    |
        +---------+----------+
                  |
        Role assignment basis
                  |
        Required source access
                  |
       Per-account provisioning
                  |
      Native rights and actual task

A route explains WHY.
Delivery shows WHAT reached WHERE.
```

The two routes converge on access requirements. Neither route makes the connector's write capability stronger or changes ReviewHarbor's native permission rules.

## Follow the requested route through dates and delivery

Continue with Devi's nonmatching, temporary-cover alternative.

The request record **rr-8404** names employee 120404, role R-1204, and ReviewHarbor Production account rh-120404. These are different kinds of identifiers: a person, a role, a request, and a target account. Keeping them separate prevents an approval for one thing from becoming evidence about another.

The supplied request asks for access from **October 26, 2026, 09:00 UTC** until **October 28, 2026, 17:00 UTC**. Its justification is “North evidence-review cover.” The role requires an end date, and these dates satisfy its configured limits.

Use the selected time zone when reading request dates. A wall-clock time without a zone is not enough to compare a request with a source event.

| Supplied observation | What you can conclude |
|---|---|
| October 24, 14:00 UTC: request submitted | A dated request exists for the named recipient, role, and account. Nothing here proves groups were added. |
| October 24, 15:00 UTC: manager approves | One required decision is complete. The owner decision is still outstanding. |
| October 24, 16:00 UTC: owner approves | Required reviews are complete. The future start remains October 26 at 09:00. |
| October 26, 08:45 UTC: neither group is present | This is consistent with the future start. Approval did not entitle this request to deliver early. |
| October 26, 09:05 UTC: Readers addition reports success; Comments addition reports a target permission error | Delivery is partial. The request's business approval did not authorize the connector credential inside ReviewHarbor. |
| October 26, 09:15 UTC: native account has Readers only; reading North works, commenting fails | The observed task matches the delivered subset, not the complete role's intended capability. |
| October 28, 17:00 UTC: the configured access end is reached | Withdrawal processing is due to start. This timestamp alone does not prove native removal finished. |

These observation times are examples, not promised processing intervals.

At 09:15, sending Devi back to request the role again misses the known cause. The evidence already identifies a failed source change. Investigate why the integration cannot add ReviewComments, make an authorized correction, then verify the resulting operation and native task. Do not widen membership criteria to repair a connector permission error.

Also distinguish **access end** from **approval timeout**. An approval timeout limits how long a request can remain unresolved. An access end date limits an assignment's intended access period. A pending request expiring does not prove some pre-existing native access was removed.

Where maximum request duration is configured, check its reference point: a supplied start date anchors the limit to that start; without one, the request time is used. Approval delay can therefore consume the available period when no start date is supplied. Do not promise “three full days after approval” merely because a three-day maximum exists.

```text
Request submitted
        |
Applicable approvals complete
        |
Future start still ahead?
        |
Wait for authorized start
        |
Source changes attempted
        |
Verify account and native task
        |
End date and time reached
        |
Withdrawal process starts
        |
Check retained role requirements
and actual source removals

Approval is not source delivery.
End time is not an instant cutoff.
```

A future start governs this request's grant. It does not place a denial over rights Devi already holds for another valid reason. In our temporary-cover alternative those rights were absent; in a real investigation, verify that assumption before treating earlier native access as a scheduling defect.

## What the screen can show, and what you still need to establish

A role's identity list can include people who obtained it through either route. Seeing Devi in that list answers a membership question; the role's name alone does not explain the origin or every target account.

For a requested assignment, connect the request history to the recipient, role, dates, assignment details, and account targets. The request tracker can show review progress and errors. Administrative provisioning activity provides another view of attempted source changes. Do not treat a status word detached from its object as a universal completion certificate.

For an automatic assignment, connect current identity inputs or the selected identity-list entry to the configured role and relevant processing. A request ID is not required evidence for a grant that was never a request.

In both routes, finish with the intended account and native operation. **Provisioning** is the work of changing the target system, such as adding a group. **Aggregation** reads account/access data back into ISC. An ISC display based on an earlier read and a later native observation can legitimately differ until collection and related updates catch up.

Suppose someone supplies only a screenshot saying “approved.” You still need to know: approved for whom, which role, which assignment, which account, what dates, and what source result? That is a request for missing evidence, not an accusation that the approval is wrong.

## Ending the need: use the route that actually granted it

Return first to the automatic alternative. If Devi stops meeting the role's criteria, relevant processing can withdraw that automatic membership and its associated access. If the selector is Identity List, the authorized list maintenance is the relevant starting point instead. Do not falsify her department merely to force a particular outcome.

An ordinary revocation request is not the way to override a continuing automatic membership requirement. Manually removing a native group while leaving its valid automatic requirement intact also fails to resolve why ISC should continue managing it.

For the requested alternative, identify the actual requested assignment and use its supported revocation or expiry route. A permitted removal request may itself need approval. If there are multiple assignments, inspect the account targets before selecting one to revoke.

Notice what **does not** follow: “Her job code changed, therefore every requested role she ever held disappears.” The automatic selector and the approved request are different bases. Investigate the requested assignment's dates, revocation history, and applicable lifecycle controls rather than borrowing the automatic route's explanation.

At an access end date, ISC starts deprovisioning. For disconnected fulfillment, a manual removal task may be involved. Even with a connected source, completion and native state need evidence. Do not treat an end date as an instantaneous, guaranteed application-session cutoff.

Finally, inspect other retained role requirements. If another assigned role still requires the same entitlement, removing this role does not imply that entitlement must disappear. A role removal is also not an account-deletion instruction.

These are separate questions: did the selected assignment end, what access remains required, what removal was attempted, and what can the account still do?

## Work through the decision

### Case 1: No automatic match, but an approved need

**Facts:** Devi has job code PROJECT-COORD. The role is requestable, she is permitted to request it, and the configured manager and owner approve her dated cover request.

**Reasoning:** Nonmatch rules out the stated automatic criterion, not the approved request route. Verify dates and delivery under that requested assignment. Changing her job code to EVIDENCE-REVIEW would misrepresent her real work record and could affect other decisions.

### Case 2: A requestable role never appears on the identity

**Facts:** The role is enabled and requestable. Devi neither matches its automatic selector nor has a submitted request.

**Reasoning:** Neither configured route has selected a grant for her. Requestable offers an entry point; it is not a broadcast assignment to every potential requester. There is no failed provisioning operation established by these facts.

### Case 3: The owner never receives a review

**Facts:** Devi's regular job matches the current, applied automatic criteria. Someone expects the role owner to approve each new matching identity.

**Reasoning:** This grant follows the approved automatic membership policy, not the role-request chain. Check whether that policy was intentionally authorized for the population. If per-person review is required, review the assignment design; waiting for a nonexistent request does not add that control.

### Case 4: The bundled profile's reviewer is absent

**Facts:** A role request completes its configured role reviews. Its included profile has a different approval chain for direct profile requests. No separate profile review appears.

**Reasoning:** The requested item was the role. Its review process governs this route. Do not assume a profile's direct-request configuration adds another approval layer to every containing role. Assess the actual role-review design against the business requirement.

### Case 5: Reading works before a future start

**Facts:** In a separate variation, Devi already holds EvidenceReaders through another assigned role. A new request for Evidence reviewer has a future start.

**Reasoning:** Existing Readers can explain early reading. The start date is not a deny rule over all other access. Inspect the specific earlier grant and native rights before claiming that the new request provisioned early; early commenting would need its own evidence.

### Case 6: All reviews passed, but commenting fails

**Facts:** In the supplied timeline, Readers was added successfully. The Comments operation reported a target permission error, and native inspection confirms its absence.

**Reasoning:** The known break is fulfillment of a particular entitlement on rh-120404. Approval, account correlation, and one successful group addition do not prove the second write succeeded. Correct the verified integration problem under change control and check actual recovery.

### Case 7: Revoke is offered for the wrong assignment

**Facts:** A requested role has assignments targeting a normal account and a separate administrative account. Only the administrative assignment is no longer justified.

**Reasoning:** Match assignment details to the exact source accounts before revocation. Removing an assignment by role name alone risks withdrawing the wrong work access. Do not assume the one-account setup in Devi's main example applies to this situation.

### Case 8: The end time passes, but a group remains

**Facts:** The temporary assignment ends. Another assigned role still requires EvidenceReaders; the account retains that group.

**Reasoning:** Retention can be correct for the other role. First establish whether this assignment ended and whether ReviewComments is still justified elsewhere. A remaining group alone neither proves expiry failed nor proves all temporary access was removed.

## Apply the reasoning to temporary license access

A design studio normally assigns its **Layout designer** role automatically to people whose current job requires layout work. The role contains a design-application entitlement and an approved font-library entitlement.

A communications employee needs the same capabilities for a two-week cover assignment. The business does not want everyone in Communications to receive them permanently.

A reasonable design can keep the ordinary automatic population narrow while permitting a justified, reviewed, dated role request for cover workers. That is a design proposal to validate against licensing, requester permissions, approval controls, and supported fulfillment, not an instruction to enable requests indiscriminately.

Explain the expected evidence in order: the identified recipient and accounts; the approved temporary need; any future start; separate delivery of both rights; the actual layout task; and withdrawal when the need ends. If the font-library write fails, the role name cannot make the font available. If another valid role retains a license, this temporary assignment's end does not alone prove the license should be removed.

The useful explanation is more precise than “ISC gave her a role.” **State the assignment basis, the intended period and account targets, the delivered rights, and what should end that particular requirement.**
