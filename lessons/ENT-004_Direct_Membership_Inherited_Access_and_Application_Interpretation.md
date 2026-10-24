# The membership was removed. Why does access still work?

Devi, employee number `100404`, uses account `rd-100404` in ReportDesk. An approved change removes that account from Support Team.

Fresh application evidence confirms the membership is gone. Yet Devi can still read a West-region report.

Does that mean the removal failed?

Not necessarily. A permission can be reached through more than one relationship. We need to identify what was removed and which route still allows the action.

The ReportDesk system, records, policies, changes and results below are fictional. Supported account and group reads, correct identity association and the stated hierarchy representation are supplied facts. Every allowed or denied result uses a fresh authorization check against the stated current relationships, not an old signed-in session. No actual tenant or application is changed.

## First distinguish the relationship from the permission

An **account** is a record in an external system. A **group** collects members, such as accounts or other supported groups.

A **membership** connects a member to a group. A **permission** allows an action on a resource, such as reading a report.

Those concepts connect, but they are not interchangeable. An application can use memberships when deciding whether an account has a permission.

An **entitlement** is an access right represented in SailPoint Identity Security Cloud (ISC). A source group can be represented as an entitlement even when that group carries more than one permission.

A **source** is ISC's configured representation of a system or collection of account data. Our source is ReportDesk Production. It represents this application directly, not an unrelated directory whose groups the application may or may not use.

Devi's account belongs on her ISC **identity**, the record representing her as a person. **Account correlation** establishes that account-to-identity association. The correct association is verified here; the digits in a username don't prove ownership.

The permission question is still about the account used for the report action, not every account that might belong to Devi.

## What does direct membership mean?

An account is a **direct member** when it belongs to a group through an account-to-group relationship, without passing through another group.

Before the removal, the current native account record has these direct memberships:

- G-8401, Support Team.
- G-8403, Exception Readers.

**Native** means information or behavior in the external system's context. These identifiers refer to ReportDesk groups, not ISC entitlement object IDs.

The account is not a direct member of G-8402, Report Readers.

That last fact does not yet answer whether the account can receive permissions associated with G-8402. We also need the group-to-group relationships and the application's rules.

## Now follow the nested relationship

ReportDesk allows one group to be a member of another. G-8401, Support Team, is a member of G-8402, Report Readers.

That is **nested membership**: a group participates as a member of another group.

Devi's account is directly in Support Team. Support Team is in Report Readers. Through that chain, the account is an **indirect member** of Report Readers under ReportDesk's supplied membership interpretation.

**Transitive membership** means following a chain of membership relationships rather than checking only one direct relationship. A chain can extend beyond one intermediate group when the system supports it.

**Inherited access**, as used here, means permission the application grants through those indirect group relationships. It does not mean the account received a new, separate direct membership in every group along the chain.

The direction matters:

“Support Team is a member of Report Readers” does not mean “every Report Readers member belongs to Support Team.”

A group that contains another group is sometimes called a parent, while the contained group is called a child. Before using those labels in a configuration or export, establish what the field actually represents. A list of containing groups and a list of contained groups point in opposite directions.

For this fictional source, a group field named parentGroups lists the groups containing it. On G-8401, that field contains G-8402. That field name and direction are part of the supplied integration contract, not a universal ISC attribute naming rule.

## The application decides whether the chain grants anything

**Authorization** is the decision about whether an account may perform an action on a resource. **Effective access** is what the account can actually do under the conditions being evaluated.

The application owner confirms this ReportDesk policy:

| Supplied relationship or condition | Meaning for this application |
|---|---|
| Membership reaching G-8402, Report Readers | Permits report reading, including through the supported nested chain |
| Direct membership in G-8403, Exception Readers | Independently permits report reading |
| Account businessUnit West | Limits either reading route to West-region reports |
| Account enabled and successful sign-in | Required before either reading route can be used |

The account's businessUnit is West. An **attribute** is a named piece of information, such as businessUnit on the account.

The two reading routes are alternatives. Either one can satisfy the group-based part of the policy. This is **OR** logic: route A or route B is sufficient for that part.

The account and region conditions are still required. Those are **AND** conditions: the grant route does not override the other required checks.

In this example, neither route permits editing reports. Exception Readers does not bypass the West-region boundary simply because the word Exception appears in its name.

```text
Path A: nested membership route
  rd-100404
      | direct member of
      v
  G-8401 Support Team
      | group is a member of
      v
  G-8402 Report Readers
      | application permits
      v
  Read West reports

Path B: separate direct route
  rd-100404
      | direct member of
      v
  G-8403 Exception Readers
      | application permits
      v
  Read West reports
```

Read each membership arrow as “is a member of.” The later arrows show the permission effect of the supplied application policy. They are not ISC provisioning steps.

The region, enabled-account and sign-in conditions apply to both paths even though they are not repeated at every arrow. Both paths end at the same selected action; they do not give the account two different copies of the report.

## Don't assume every application follows nested groups

The same membership chain can have a different permission effect in a different system.

Suppose another application checks only direct membership in Report Readers. An account that belongs only to Support Team would not meet that application's direct-membership requirement, even if the group-to-group relationship exists.

That outcome need not mean collection or provisioning failed. The application doesn't use the relationship in the way the proposed design expects.

There are real product-specific boundaries. Microsoft Entra group-based assignment to enterprise applications does not cascade assignment to nested groups. That is a restriction on that assignment mechanism, not a statement that every Microsoft service treats group nesting identically.

For any integration, ask which permission decision consumes the group information and whether that decision supports nesting. Directory membership, application assignment and permission inside the application can be separate decisions.

A diagram showing a path is therefore not enough. You need evidence that the relevant system honors that path for the selected action.

## What can ISC represent?

A **connector** provides the supported integration used to read data and perform supported changes.

**Aggregation** collects external data into ISC. Account collection can supply membership values; entitlement collection can supply group definitions and supported relationships between access objects.

A **schema** describes represented attributes and their designated uses. An **entitlement type** identifies a supported kind of access object.

Here, the account attribute groups is marked as entitlement information, supports multiple values and is connected to the groups entitlement type. Its source values identify the referenced groups. The group schema identifies each group through groupKey and displays its label.

The supplied read contract says groups contains direct account memberships. The group data separately supplies the G-8401-to-G-8402 relationship. Supported collection and schema interpretation represent that hierarchy in ISC.

ISC supports representing hierarchical entitlement relationships for applicable source types. A group schema can expose a setting called hierarchyAttribute identifying the field supplying hierarchy references. The actual source support, identifiers and relationship direction still need verification.

Merely adding a plausible field name does not create native nesting, teach a connector to read unsupported relationships or change the application's authorization rules.

Also check whether the collected membership list is direct-only or already expanded. An expanded list can include indirectly reached groups. Seeing G-8402 in such a list does not establish a separate direct account-to-G-8402 membership.

Do not count every displayed group as an independently writable grant without understanding what the representation contains.

```text
Collection evidence
  Native account + group records
        |
        | supported reads and mapping
        v
  ISC membership + hierarchy view

Authorization evidence
  Account used + current relationships
        |
        | ReportDesk permission policy
        v
  Action/resource allowed or denied

A represented edge is not a new grant.
A read is not a permission change.
```

The two sections are evidence boundaries, not a required sequence of backend jobs. ISC's view describes collected relationships. ReportDesk makes the permission decision in the supplied example.

A relationship can exist natively even when the integration hasn't collected it. Conversely, an old represented relationship can remain visible after a native change until the relevant evidence is updated. Match observation times and coverage before deciding which state a view describes.

## Removing one route doesn't remove the other

Return to the approved change.

Before it, rd-100404 directly holds G-8401 and G-8403. It reaches G-8402 indirectly through G-8401.

The authorized operation removes the account's direct G-8401 membership. Current native evidence verifies that exact relationship is absent. The group G-8401 still exists and remains a member of G-8402; other Support Team members are unaffected by this selected account change.

Devi's account now directly holds only G-8403.

Path A no longer starts from this account. Path B still does. Reading a West-region report therefore remains allowed under the supplied policy.

The successful read does not contradict the verified G-8401 removal.

Compare these independent variations. In each row, the account is enabled, sign-in succeeds and all other grant paths are excluded unless stated.

| Current account memberships and selected action | Result under the supplied policy |
|---|---|
| G-8401 and G-8403; read West report | Allowed through both routes |
| G-8403 only; read West report | Allowed through the independent direct route |
| G-8401 only; read West report | Allowed through G-8401 to G-8402 |
| Neither G-8401 nor G-8403, no direct G-8402; read West report | Denied because neither reading route remains |
| G-8401 and G-8403; read East report | Denied because the West-region boundary still applies |
| G-8401 and G-8403; edit West report | Denied because neither group grants editing |

These outcomes follow from the stated ReportDesk rules, not a universal permission-combining algorithm. Another system may apply different grant, restriction or denial rules.

If the approved requirement was only “remove Support Team membership from this account,” the supplied evidence establishes that outcome.

If the requirement was “eliminate this account's report-reading capability,” the remaining G-8403 route means that broader outcome has not been achieved.

Name the requirement before declaring the work complete.

## Which relationship would a correction affect?

**Provisioning** performs supported account or access changes. A removal request, an attempted operation and a confirmed current native relationship are different evidence.

If an account receives Report Readers indirectly, don't assume a request to remove that displayed item will remove every supporting relationship. Identify the supported action and the actual relationship it changes.

There is a practical difference between removing rd-100404 from G-8401 and removing G-8401 from G-8402.

The first changes one account's membership. The second changes a shared group relationship. It can affect other accounts reaching Report Readers through Support Team.

That wider effect is the change's **blast radius**: the people, accounts and capabilities it can affect beyond the selected example.

Support Team could also carry other legitimate permissions. Before removing it to interrupt report access, review those permissions and the approved requirement. A valid security outcome doesn't justify an unrelated loss of required access.

Do not flatten a nested relationship by adding direct G-8402 membership just to make a screen easier to interpret. That creates another native access path and can make later removal harder.

An **access profile** bundles entitlements from one source. An **ISC role** groups access for a business purpose. Those objects can express access requirements, but they are not themselves the source's group-to-group membership relationship.

An ISC requirement for a group and a native nested route to that group need their own evidence. Don't interpret “assigned through a role” as proof of native group nesting, or assume editing the native hierarchy removes every ISC requirement.

## When the visible result doesn't fit

Trace the account, action and resource first. “Devi still has access” can conceal a different account or a different report.

Then inspect each part of the proposed path: current direct memberships, group relationships, the permission rules that use them and the relevant resource conditions. Check whether the read covered all needed groups and relationships, not just their names.

If the application still permits an action after every known route is reportedly removed, record the gap. The evidence may be incomplete. The application may be evaluating different membership or session information than the report you inspected.

A **session** is an ongoing signed-in interaction. Establish how the application obtains and refreshes the information used for that session. Don't assume an old session proves a new grant exists, or prescribe a universal waiting period. Our supplied checks deliberately exclude old-session evidence.

Equally, a denied action doesn't prove every membership is missing. A resource restriction, wrong account or direct-only application policy can explain a denial while the membership records are correct.

Separate a relationship defect, a collection gap and a policy outcome. They require different corrections.

## Work through the paths

Each case supplies its own relevant facts. Use the membership direction and application rule before choosing an explanation.

### Case 1: The direct Readers membership is absent

**Facts:** rd-100404 directly holds G-8401 only. G-8401 is a member of G-8402. ReportDesk honors that nested route. The account meets the West-region and sign-in conditions.

Must the account also be added directly to G-8402 to read a West report?

**Reasoning:** No. The supplied nested path already satisfies the reading rule. Absence of a direct G-8402 membership is expected, not a missing grant. Adding it would create an additional path that needs its own authorization and later removal handling.

### Case 2: One removal is confirmed

**Facts:** The account's G-8401 membership is confirmed removed, but G-8403 remains. A fresh West reading check succeeds.

Does this prove the G-8401 operation failed?

**Reasoning:** No. G-8403 explains the remaining capability. The selected membership removal succeeded; a broader requirement to remove reading would still be unmet. Review that broader requirement and the remaining legitimate grants before proposing another change.

### Case 3: Another application requires direct membership

**Facts:** A different application's access policy accepts only direct G-8402 membership. The account has G-8401 only, and G-8401 belongs to G-8402. No other grant exists.

Does the chain establish authorization for that application?

**Reasoning:** No. Its direct-only rule does not accept this indirect route. Verify the approved access design and supported assignment path instead of assuming a hierarchy display proves a provisioning failure.

### Case 4: The arrows are reversed

**Facts:** G-8401 is a member of G-8402. Another account is directly in G-8402 but not G-8401. No reverse membership or other relationship is supplied.

Can that account be described as a member of Support Team?

**Reasoning:** No. Membership of the containing group does not establish membership of every group contained in it. Follow member-to-containing-group direction; don't reverse the relationship to manufacture access.

### Case 5: One edge change reaches other people

**Facts:** Many accounts belong to G-8401. A proposed correction for Devi removes G-8401 from G-8402 rather than changing Devi's account membership.

Is the change limited to Devi because her ticket prompted it?

**Reasoning:** No. The proposed operation changes the shared group-to-group relationship. Review other affected members, permissions and requirements before authorizing it. A person's ticket does not make a shared configuration change private to that person.

### Case 6: The expanded list looks direct

**Facts:** A source report explicitly combines direct and indirect memberships. It lists G-8402. No native direct-membership record for the selected account has been inspected.

Does the list prove there is a direct G-8402 membership to remove?

**Reasoning:** No. The item may be present through expansion. Inspect the direct relationship and supporting chain under the source's read contract. Don't convert a derived relationship into an assumed independently writable grant.

### Case 7: The hierarchy was not collected

**Facts:** The native G-8401-to-G-8402 relationship and the application's nested reading rule are verified. ISC has account and group records, but its selected collection omitted group-to-group relationships.

Must the missing hierarchy in ISC make the application deny reading?

**Reasoning:** No. Missing representation doesn't remove the native relationship. The application can use the supplied native path while ISC's explanation is incomplete. Investigate supported hierarchy collection and interpretation, not an unnecessary new account grant.

### Case 8: Memberships are right, but the resource is outside scope

**Facts:** Both reading routes exist. The account businessUnit is West. A fresh request to read an East report is denied.

Should the engineer repair aggregation to force an allowed result?

**Reasoning:** No. The denial matches the stated resource restriction. Neither grant bypasses the region condition. Establish a legitimate new business requirement before changing data or access to make the action succeed.

## Try a different access model

A document system has account doc-551. The account is a direct member of Project Reviewers. That group is a member of Document Readers. The account also has a separate, explicitly assigned document-reader role.

The owner confirms that either supported nested membership or that separate native role permits reading the selected project. These are application objects, not ISC roles. There are no other grants, and the account meets the resource and sign-in conditions.

An approved operation removes the account from Project Reviewers. Fresh native evidence verifies the removal, but reading still succeeds.

Explain the remaining route and whether the selected removal failed.

The separately assigned native document-reader role still grants reading. The Project Reviewers removal can be successful while the broader capability remains. The role and membership are different relationships.

Now change one fact: the separate native role is absent, and this document system does not use nested groups for reading. Only direct Document Readers membership would qualify, and that membership is absent.

The original group chain no longer establishes reading under that changed policy. The data structure alone cannot supply an authorization rule the application doesn't use.

A useful explanation of inherited access names every relationship, its direction and the policy that turns the chain into a permission. A useful removal explanation then identifies the exact relationship changed, the paths still present and the evidence for the required outcome.
