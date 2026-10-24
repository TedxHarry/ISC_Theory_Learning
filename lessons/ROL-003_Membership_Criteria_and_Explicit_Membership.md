# Who should receive this role, and how does ISC decide?

Devi, employee `120303`, coordinates dispatch work in DispatchLane Production, a fictional application.

The access package is already agreed: she needs to read desk work and update its coordination records. The remaining question is who should receive that package.

The business approves two populations: working dispatch-desk staff in Operations, or working returns-desk staff in CustomerCare.

That sentence contains a policy. ISC still needs a configuration that represents it correctly.

“Operations or CustomerCare” is not enough. “Dispatch or returns” is not enough either. The department and job must form the approved pair, and the working-state requirement applies to both alternatives.

Let's turn that decision into comparisons we can trace, then contrast it with selecting people explicitly.

All people, identifiers, policies, records, application permissions and observations here are fictional. We use a standard role, supported Provisioning capabilities, standing access without separate activation and one correctly associated application account per identity.

## Separate the package from its recipients

In SailPoint Identity Security Cloud, or ISC, a **role** groups access for a business responsibility.

An **entitlement** represents a source access right, such as membership in a group. An **access profile** groups related entitlements from one source.

Here, the role **Desk coordinator**, teaching ID `R-1203`, contains the enabled **DispatchLane coordination** profile. That profile contains:

- `DL-8301`, Desk Readers.
- `DL-8302`, Desk Coordinators, which requires Readers on the same account to update coordination records.

A **source** represents a connected system or account-data collection. Its **connector** reads data and, where supported and configured, makes changes. The supplied DispatchLane integration supports these membership reads and writes.

Devi's ISC **identity** represents her as a person. Her application **account** is `dl-120303`. **Account correlation** associates that account with her identity. It is correctly correlated, enabled, usable for sign-in and assigned to desk North.

The native application limits the two permissions to that assigned desk. Role membership does not itself change North to another desk or grant application administration.

The identifiers are teaching labels, not actual ISC ID formats or an API payload.

The role's contents answer what access is required. Its **membership selector** identifies the configured basis for selecting recipients.

For automatic assignment, the standard choices are **Standard Criteria**, which compare available data, or **Identity List**, which explicitly names identities. Treat these as alternative selector configurations, not as an assumed combined “criteria plus exceptions” list.

The main example uses Standard Criteria. Its role is enabled, its profile is enabled and direct role requests are off. No other assignment route or lifecycle access requirement supplies this access.

## Know which record each comparison reads

A criterion is one configured test: which input to inspect, how to compare it and which value or entitlement is required.

For example, `department Equals Operations` is a test, not the entire membership policy.

ISC's standard builder supports different input categories:

| Input category | What you are testing |
|---|---|
| Identity Attribute | A mapped field on the person's ISC identity, such as department or job code. |
| Account Attribute | A supported field on an account from the selected source, not automatically the person's identity field of the same name. |
| Entitlement | Whether the selected source access item is held, using its actual source and entitlement identity. |

An **identity attribute** is a field on the identity. An **identity profile** defines how a population's identities are created and managed, including mappings that supply those fields from source information.

A source's **account schema** describes its account fields. The current standard builder supports string and boolean account/identity attribute types. It excludes the account description and fields marked as Account ID or Account Name from account-attribute criteria.

A **string** is text; a **boolean** is a true/false value. Do not assume every date, number, list or complex object in a source can be selected and compared in the same way. Check the supported input type and available operation.

The selected source matters. An account field named `department` in a directory can differ from the identity's mapped department. Changing which category you select changes the evidence being tested.

Entitlement-based eligibility also needs a reason. A maintained eligibility group can be a valid input if it represents the approved responsibility. Requiring the very permission this role is supposed to newly grant does not explain how somebody lacking it will qualify.

The main policy uses identity attributes only, avoiding those source-account ambiguities.

## Write each approved alternative completely

The relevant current identity fields are department, jobCode and lifecycle state.

A **lifecycle state** represents a stage such as working or departed. In this fictional configuration, its display label is Currently Employed and its technical name is `working`. Lifecycle-state criteria use the technical name.

The approved alternatives become two groups.

Group A requires all of:

- `department Equals Operations`.
- `jobCode Equals DISPATCH-DESK`.
- Lifecycle state equals `working`.

Group B requires all of:

- `department Equals CustomerCare`.
- `jobCode Equals RETURNS-DESK`.
- Lifecycle state equals `working`.

**AND** means every comparison in the group must be satisfied.

**OR** means a complete match to either alternative is sufficient.

For this policy, set AND within the groups. In the standard builder, that choice gives OR between groups. The reverse choice, OR within groups, gives AND between groups.

The two levels of combination matter. Do not read a page of conditions as one ungrouped sentence.

```text
Group A
  Operations
  AND DISPATCH-DESK
  AND working
         \
          OR --> selected by criteria
         /
Group B
  CustomerCare
  AND RETURNS-DESK
  AND working

Each branch must be a complete match.
```

The branches represent the two permitted combinations, not separate grants or a private execution sequence. One complete branch is enough; matching only part of each branch is not.

For Devi, the current values are Operations, DISPATCH-DESK and working.

Group A matches completely. Group B does not match, because she is not in CustomerCare with the returns job. The OR between complete groups still selects her.

A working returns-desk colleague in CustomerCare qualifies through Group B instead.

Neither needs to satisfy both departments.

## Preserve the pairs when you simplify a rule

Suppose somebody rewrites the policy as:

“Department is Operations or CustomerCare, AND job is DISPATCH-DESK or RETURNS-DESK, AND state is working.”

That sounds similar, but it permits combinations the business did not approve.

An Operations employee with RETURNS-DESK would now pass the independent department and job lists. So would a CustomerCare employee with DISPATCH-DESK.

The original policy permits two specific pairs. The rewrite permits the cross-pairs as well.

Let's compare representative current identity records against the original two-group policy:

| Department / jobCode / lifecycle state | Result and reason |
|---|---|
| Devi: Operations / DISPATCH-DESK / working | Selected through complete Group A. |
| CustomerCare / RETURNS-DESK / working | Selected through complete Group B. |
| Operations / RETURNS-DESK / working | Neither approved pair matches. |
| CustomerCare / DISPATCH-DESK / working | Neither approved pair matches. |
| CustomerCare / RETURNS-DESK / prehire | Group B fails its working-state condition. |
| Finance / DISPATCH-DESK / working | Group A fails its department condition. |
| Operations / missing jobCode / working | No positive match to the required job code is established; investigate the missing input. |

Testing only Devi would not expose the cross-pair defect. Include people who nearly qualify, not just people who clearly qualify.

There is another grouping trap: putting working only in Group A. Because the groups are alternatives, Group B would then select its department/job pair without that state restriction.

A condition written beside one alternative does not automatically guard the other.

## The comparison operation is part of the policy

**Equals** tests for the configured matching value. **Contains** tests whether the specified text occurs within the field.

If the approved job code is DISPATCH-DESK, using Contains DISPATCH-DESK would also accept DISPATCH-DESK-TRAINEE. That changes the recipient policy; it is not a convenient spelling of equality.

The builder's text Value comparison is case-insensitive. Do not design separate populations based only on upper- versus lowercase text in this field. Do not assume that also means whitespace is trimmed or every punctuation difference is normalized.

Multiple values inside one Equals criterion are alternatives: they are compared with OR. This is separate from AND between criterion rows.

In an independent approved variation, a job-code row could accept DISPATCH-DESK or DISPATCH-COVER. With AND within its group, the person must still satisfy that row and the department and working-state rows.

A person is not expected to have both scalar job codes at once.

For missing data, use explicit business decisions. A blank job code is not evidence of dispatch responsibility. Nor should an engineer replace a missing value with a qualifying one merely to make access appear.

Negative conditions need special caution. “Not Finance” is not equivalent to “belongs to either approved desk population.” It includes other known departments and leaves the treatment of missing or unusual values needing verification.

Do not invent one universal null result for every operation. Test the selected operator and input conditions, and keep the approved policy clear about unknown eligibility.

## An identity list asks a different question

Consider a separate configuration of the same role using Identity List instead of Standard Criteria.

The owner has explicitly approved Devi and one other identity for a controlled temporary desk-support assignment. The authorized administrator selects those exact identities.

The selector now asks whether the identity is listed. It does not run the former department/job/state expression as an extra hidden filter.

That does not mean an identity list overrides every lifecycle action or platform eligibility restriction. It means the list itself does not contain those former criteria.

The list names ISC identities, not DispatchLane accounts or native group members. Selecting Devi should identify the intended identity, not merely the first matching display name.

The list is also not a submitted access request. It is maintained configuration that drives automatic role assignment when applied.

**Automatic** describes how ISC acts on the configured selection. It does not mean every input was discovered without human decisions. An administrator can manually maintain a list that the platform uses automatically.

```text
Standard Criteria       Identity List
 compare current data    check identity
          \                /
        alternative selector methods
                    |
       relevant identity processing
                    |
            role assignment
                    |
       required account changes
                    |
      verify operation and native task
```

The upper branches are alternatives, not a requirement to pass both. The lower arrows separate selection, application and delivery; they are not a guaranteed engine order or fixed completion time.

A manually maintained list needs an owner, a reason for each entry and a review or expiry procedure appropriate to the assignment. Do not assume a temporary approval removes an identity from the list automatically on the intended date.

When Devi's responsibility ends, the approved list must be maintained accordingly and its effect verified. Correct HR values alone do not rewrite a stale explicit list.

Switching selector type is therefore a population change, not a cosmetic edit. Compare who the old configuration selects with who the new configuration selects before applying it.

## Use current inputs, not an upstream promise

**Account aggregation** reads configured account data into ISC. **Identity processing** evaluates identity information and applicable configuration, including role membership.

An approved HR update, the collected HR account and Devi's applied identity fields are different records.

If HR has changed her job to DISPATCH-DESK but her current identity still shows DISPATCH-DESK-TRAINEE, an Equals comparison against the current identity does not become true merely because the HR change was approved.

Trace the producer value, collection, identity mapping and relevant application. Correct the faulty stage instead of broadening Equals to Contains.

A saved new selector also does not prove every identity has already been evaluated with it. The role must be enabled, and new or updated configuration must be applied through relevant identity processing.

List-page Apply Changes for roles, access profiles and applications covers those configurations together, not just the one criterion you last edited. Review other pending changes and the affected population before broad application.

A process starting is not the same as all account changes finishing.

## Distinguish a match, an assignment and working access

**Role assignment** associates the role with an identity through the applicable route.

**Provisioning** carries out required account or access changes through a supported automatic or manual path.

For a clean comparison, Devi initially has neither DispatchLane membership and has no other grant route. Her role/profile are enabled, her current identity has the three Group A values, and her ISC processing status is Active.

Suppose the supplied observations, all on one date in UTC, are:

- At 12:00, the applied configuration and current identity values establish a complete Group A match.
- At 12:05, the role assignment is recorded.
- At 12:10, Readers is reported added, but the Coordinators addition is rejected because the integration actor lacks the required permission on this account.
- At 12:15, native checks confirm Devi can read North desk work but cannot update coordination records.

The matching logic did its job. The required access was only partly delivered.

Do not edit the membership rule to repair the rejected account operation. Inspect the exact source, account, entitlement, operation and error, then follow authorized correction and supported recovery.

The opposite investigation is possible too: if neither group matches and no other route selects Devi, missing access is not yet evidence of a failed write. First establish whether the requirement was selected.

If the role is requestable in a different design, a completed **access request**, which asks for specified access for an identity, can explain a role assignment outside this criteria match. Request approval does not make a false criterion true.

Keep the assignment origin visible rather than diagnosing every role holder as an automatic match.

## Know what an ending membership change means

When an identity no longer qualifies under criteria or is removed from the role's identity list, the automatic assignment requirement changes. Relevant evaluation can remove the role and its access, subject to other retained requirements.

Removing an identity from a membership list is different from deleting access entries from the role definition. Role-content removal propagation settings govern specified content-change behavior; do not treat them as a universal off switch for assignment removal.

The reverse distinction matters too. If the identity is still listed, a department change does not remove that list entry by itself.

A native entitlement can remain because another assigned role requires it. Source removal can also fail. Neither should be inferred merely from whether this role's label remains visible.

Verify the exact membership configuration, current assignment and source outcome. Role revocation does not itself mean deleting the native account.

Do not falsify identity data to make a comparison fail. If the business policy, list or source value is wrong, correct the appropriate approved object.

## Work through the selection decisions

### Case 1: A match is split across two groups

**Facts:** An identity has Operations, RETURNS-DESK and working. Groups A and B are unchanged.

**Reasoning:** Group A has the wrong job; Group B has the wrong department. Two partial matches do not form a complete approved alternative. The identity is not selected by this criterion expression.

### Case 2: Working appears only in Group A

**Facts:** Group B requires only CustomerCare and RETURNS-DESK. A prehire identity has that pair.

**Reasoning:** The OR between groups allows the complete, now shorter Group B to pass. If prehire access is not approved, the working-state condition must be represented in that branch too. A check in Group A does not protect Group B.

### Case 3: Both jobs are in one Equals row

**Facts:** In a separately approved variation, Group A's job-code Equals row accepts DISPATCH-DESK and DISPATCH-COVER. Department and state remain AND conditions. The identity has Operations, DISPATCH-COVER and working.

**Reasoning:** Either listed job value can satisfy that row. The other rows still apply, so this identity passes the revised Group A. Within-row alternatives are not two simultaneous scalar job values.

### Case 4: Contains includes a trainee

**Facts:** The rule uses Contains DISPATCH-DESK. The current job code is DISPATCH-DESK-TRAINEE; trainees are excluded by policy.

**Reasoning:** The text contains the configured substring. The operation broadened eligibility beyond the approved exact code. Correct the operation and reassess the population rather than claiming the trainee's source record is wrong.

### Case 5: The job code is missing

**Facts:** Department and working state are present. No current identity job code establishes either approved pair.

**Reasoning:** Do not assume eligibility or insert a qualifying fallback. Trace the approved source value and mapping/application. If policy needs an exception, define and approve its mechanism separately; do not infer a universal negative/null comparison result.

### Case 6: The explicit list is stale

**Facts:** In the Identity List variation, Devi remains listed after she moves to another responsibility. Her new department is correctly applied.

**Reasoning:** The list itself still selects her; it is not the old criteria expression. Maintain the approved list and verify the resulting assignment/access changes, considering other applicable controls and requirements. Correct department data alone is not proof of list cleanup.

### Case 7: The current source and identity disagree

**Facts:** The directory account says Operations, but the selected Identity Attribute department currently says Finance.

**Reasoning:** The criterion reads the identity field, not whichever account value looks preferable. Investigate the approved mapping and input provenance. Switching categories changes the policy's evidence and needs justification.

### Case 8: Criteria pass but the target rejects a change

**Facts:** Devi matches Group A, has the role assignment and holds Readers. The Coordinators addition failed.

**Reasoning:** Eligibility and assignment are established; full coordination access is not. Investigate and recover the exact provisioning failure, then verify the North update action. Do not change valid membership logic to conceal incomplete delivery.

## Transfer the grouping to another population

A training-support role is approved for working employees in either of these combinations:

- Research with job code LAB-TRAINER.
- Manufacturing with job code FLOOR-TRAINER.

An administrator proposes separate alternative lists of departments and jobs, joined with AND, plus working. Another administrator proposes a list of named identities instead.

What would you need to check before choosing or applying either design?

The independent department/job lists would allow Research with FLOOR-TRAINER and Manufacturing with LAB-TRAINER. If those cross-pairs are not approved, preserve the complete pairs in separate AND groups joined by OR, including the state restriction in each alternative.

For an identity list, verify the exact approved identities, ownership and maintenance process. Do not assume the previous data-driven conditions still run invisibly.

Test eligible members, cross-pairs, nonworking identities and missing values against current input records. After application, inspect actual assignments and per-account fulfillment.

The access package can remain identical while a grouping change selects the wrong people. That is why membership logic deserves its own evidence and review, rather than being treated as the last field to fill in after choosing entitlements.
