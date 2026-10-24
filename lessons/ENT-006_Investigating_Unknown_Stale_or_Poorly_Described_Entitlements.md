# This entitlement looks wrong. What exactly needs fixing?

Devi, employee `100606`, reviews assigned customer-support cases in CaseBridge Production, a fictional application. She uses account `cb-100606`. Her manager confirms that reviewing those cases is still part of her work.

In SailPoint Identity Security Cloud, or ISC, her account shows the access value `G-9601`. The entry has no useful description. Someone looking at the catalog asks, “Is this an old group we can remove?”

Before answering, let's separate what we have seen from what we have assumed.

We have seen an access value without enough explanation. We have not yet established that the group is obsolete, that Devi should lose it, or that the application no longer contains it.

All systems, identifiers, times, configurations and observations below are fictional. They illustrate an investigation, not operations performed in a tenant or the behavior of a built-in CaseBridge connector.

## Give the uncertainty a precise name

An **entitlement** is an access right represented in ISC, such as an application group or permission. The **entitlement catalog** is ISC's collection of those represented access items.

“Unknown” describes our missing knowledge. It does not identify a cause.

A raw identifier can appear because ISC learned it from an account but has not obtained richer group information. An understandable name with an empty description can mean the source itself supplies no useful explanation. A detailed description can still be outdated if the native permission has changed.

Likewise, “stale” needs an object and a comparison. Is the membership old? Is the description old? Does the native group no longer exist? Or is the screen showing an earlier result?

These are different claims. Write the one you can support.

| Observation | What it does not establish |
|---|---|
| The display shows `G-9601` without a useful name | That the native group is invalid, unused or deleted. |
| No collected account currently holds an entitlement | That the source object no longer exists or has no planned use. |
| A group is absent from one read | That it is absent from the whole source, regardless of filters and permissions. |
| ISC and the application show different descriptions | That collection failed; maintained fields can have a different update authority. |
| An owner field is empty | That the permission is harmless, or that an arbitrary account holder can explain it. |
| A completed run reports a small discovered count | That the count is the whole catalog or covers every entitlement type. |

The distinction affects the correction. Removing a permission cannot repair a missing description. Writing a description cannot repair an incorrect membership.

## Identify the access before interpreting it

A **source** is ISC's representation of a system or account-data collection. CaseBridge Production is not the same source as CaseBridge Test, even if both contain a group called Case Reviewers.

An **account** is the application's login record. An ISC **identity** represents a person. In our example, `cb-100606` is correctly associated with Devi's identity. That establishes whose account we are examining; it does not explain its permissions.

An **entitlement type** describes a kind of access object, such as groups or native roles. An **account attribute** is a field on the account record; an entitlement attribute contains the access values held by the account. A **schema** describes the available fields and how ISC interprets them.

Record the source and environment, the entitlement type, the relevant account attribute and the native access value. Also retain the ISC entitlement identifier when identifying the catalog record. The ISC record identifier and the native group key identify different records.

For this example, the source's account attribute is `groups`, its entitlement type is also `groups`, and the native value is `G-9601`. The group schema uses `groupKey` as its identifier and `label` as its display name. These attribute names are fictional source definitions.

So “Case Reviewers in Production, type groups, key G-9601” is more useful than “that old review access.”

If a similarly named native role has value `G-9601`, it is not automatically the same object as the group. If a replacement group has the old group's name but a different key, do not merge them by appearance.

This is also why changing an identifier to make two screens match is a risky first move. Establish what each value identifies before considering a schema or data correction.

## Follow the two reads that supplied the picture

**Aggregation** reads source data into ISC. Account aggregation collects accounts and their entitlement values. Entitlement aggregation separately collects access-object details, where the source supports it.

Account data can create a simple catalog representation from the values accounts hold. Separate entitlement data can supply names, descriptions and other supported attributes, including access objects that nobody currently holds.

The two reads do not have to cover the same objects at the same time.

A **connector** is the integration used to communicate with the source. Its configured read scope, available permissions and supported operations determine what information it can obtain. Here is the supplied evidence for CaseBridge:

- At 09:00 UTC, the account read includes `cb-100606` with `groups = [G-9601]`.
- At 09:05 UTC, a group-definition read completes successfully for the configured `CurrentTeams` container.
- At 09:10 UTC, an application administrator confirms that native group `G-9601` exists in a different container, `LegacyTeams`. Its current label is Case Reviewers.

A **container** here is an application grouping used to limit the fictional connector's search. These container names and its filter are scenario assumptions, not standard ISC fields or universal connector options.

The relationship is easier to see when we keep both reads visible:

```text
CaseBridge Production
|
+-- account read
|   cb-100606 -> groups [G-9601]
|               |
|               v
|   ISC membership representation
|
+-- group definition read
    filter: CurrentTeams only
    |
    +-- G-9601 in LegacyTeams
        -> excluded from this read

Application evidence:
G-9601 exists and grants
read of assigned support cases
```

The arrows show where evidence comes from, not an undocumented backend sequence. The account read supplied a membership value. The separate definition read omitted its group because of its stated filter. The application evidence independently confirms that the group exists and what it permits.

A successful read of CurrentTeams can be correct within that scope and still be insufficient for the intended catalog.

The word “Legacy” in a container name also does not prove retirement. In the supplied facts, the group remains active and supports current work.

## If the detail was returned, check how it connects

A missing group definition is one possible cause. A definition that was returned but does not link correctly is another.

The account's entitlement attribute needs the correct entitlement-type connection. Its values must match the identifier selected for those entitlement objects. For our example, `groups` is marked as an entitlement attribute, permits multiple values, uses type `groups`, and contains `G-9601`. The group definition's `groupKey` also contains `G-9601`.

Those supplied settings agree. The main example therefore points to collection scope, not a failed key comparison.

Now change one fact. Suppose the account returns `G-9601`, but the selected group identifier is `label`, whose value is `Case Reviewers`. The displayed words may look sensible while the matching values disagree.

You would investigate the integration contract and schema selection. You would not change Devi's native membership to the label simply to make it look readable.

An identifier or type change can affect existing references and create duplicate representations. Test a proposed correction in a suitable non-production setting and assess existing data before applying it through the organization's controlled process.

Do not delete an entitlement type as a catalog-cleanup shortcut. Deleting the type does not delete its associated entitlements; it prevents their aggregation or update until an appropriate type exists again.

## A recent timestamp is not a complete answer

When you inspect an aggregation result, ask what operation it describes and which source, types and population it included. A recent account read does not prove that group descriptions were refreshed. A recent entitlement read does not independently establish today's membership for every account.

Then check completeness within the intended scope.

A read that stopped after one page is not a complete inventory. A credential that can see only one container cannot establish absence outside it. A query for groups does not establish the inventory of native roles.

The **integration credential** is the account or authorization the connector uses to read or change the source. The application's human administrator may see objects that this credential cannot see.

If the administrator finds `G-9601` but the connector does not return it, compare their source, query scope and visibility. Obtain only the read permissions needed for the agreed integration. Giving the connector broad write or administrator rights is not a justified response to a missing description.

For a file-based source, also inspect the file's origin and export time. Uploading a file today does not make yesterday's exported memberships current. Confirm the correct source template, identifiers and included rows rather than pasting a readable name over an unrelated key.

A job's discovered count is not automatically its source's entire catalog count. ISC can already contain entries learned from earlier reads or account-held values. Read the summary in the context of the operation it reports.

## Restore the missing detail without pretending you changed access

Return to the supplied CaseBridge facts.

The team confirms that LegacyTeams groups belong in this integration's agreed scope. It reviews the proposed filter change for other affected objects rather than treating it as a one-record edit.

In the fictional continuation, the approved correction includes the required container. A relevant group-definition read then returns `G-9601`, `label = Case Reviewers`, and its source description, **Support access**. The values link to the existing account-held group through the verified type and identifier.

That resolves missing collection detail. It does not resolve poor wording.

The application administrator confirms the current native permission: read assigned support cases, with no editing or export capability supplied by this group. The responsible business contact confirms the intended use and accepts accountability for maintaining the explanation.

An **entitlement owner** is the responsible identity recorded for the access item. Ownership is separate from membership. The most frequent holder is not automatically the right owner.

The team records an appropriate owner and maintains a clearer ISC description:

> Read the support cases assigned to the account in CaseBridge Production. This group does not grant editing or export. Intended for staff performing assigned-case review.

The native configuration establishes the scope and exclusions. The intended-use sentence guides assignment decisions; the sentence itself does not enforce them.

The final evidence compares both layers. The ISC entry now has a useful label, description and owner. Current native evidence still shows Devi's account in `G-9601`, with the same permission. The investigation improved understanding without removing or broadening her access.

All these continuation results are supplied fictional observations. They are not a prediction that a particular connector will expose the same fields or that changing a filter affects only one object.

## When the explanation stays old after collection succeeds

A description can be wrong even when the correct group was collected.

First compare the actual returned source field with the schema's description mapping. If the useful text exists in a different field, confirm whether the supported schema maps it. A mapping correction has a wider scope than editing one description.

Then inspect whether the ISC description was manually maintained. Manually updated entitlement names and descriptions are protected from replacement by later aggregation.

That protection can preserve a good business explanation. It can also preserve outdated wording. Repeating the same successful read does not decide which explanation the organization wants to maintain.

Agree which system owns the field's content, confirm the actual permission, and use the supported maintenance method. Do not clear protection across a source merely to repair one entry.

Also remember the opposite boundary: editing an ISC display name or description does not send that edit to the native source. If the application's own help text is wrong, that needs its own correction.

## Zero holders and a missing object are different findings

Suppose `G-9602`, Monthly Reviewers, has no holders in a confirmed complete, current account population. The application administrator confirms that the native group exists and is reserved for an approved periodic review.

Zero current holders is a meaningful count. It does not make the definition invalid. Check future use and dependencies before proposing retirement.

An **access profile** bundles related entitlements from one source. A **role** represents a broader business access requirement and can include access profiles or entitlements. Either can reference an item even when no current account holds it.

An **access request** asks for access to be granted. A **requestable** item is made available through a configured access-request mechanism. Turning that setting off is not the same as removing access already held by an account. It is also not proof that no automatic assignment or access-model reference exists.

Now consider a different group, `G-9603`, Old Exporters. The application team provides an approved retirement record and confirms deletion of that exact group in Production. A sufficiently authorized, complete native check confirms its absence. Historical evidence shows that this object was previously collected through entitlement aggregation.

This is stronger evidence of a retired native object than a zero-holder count.

ISC does not offer a general direct catalog-delete action for entitlements. For a source object collected through entitlement aggregation, the documented removal path is source deletion followed by entitlement aggregation. Account aggregation never deletes catalog entitlements merely because memberships disappear.

There is a qualification: entitlements created solely through account aggregation are an exception to that general entitlement-aggregation removal path. Establish how the record was created and consult the supported handling for that source instead of promising that another account read will remove it.

None of this authorizes deleting a live native group to tidy a screen. Native group deletion can affect every member and dependency. Confirm retirement, ownership, access-model references and the approved change before any destructive action.

## Choose the layer that is actually wrong

**Provisioning** changes accounts or access in a target system. It is separate from reading information or improving a description.

If a permission is valid but one person's access is no longer justified, the target may be that account's membership. If the permission definition itself is too broad, the target may be a shared application policy. Those changes have different effects.

Keep the investigation and correction responsibilities separate:

```text
Identify exact source/type/key
              |
              v
Compare current native evidence
              |
      +-------+-------+
      |               |
    found         not found
      |               |
      v               v
Check read path   Verify coverage
and field origin  before absence
      |               |
      +-------+-------+
              |
              v
Choose scoped approved correction
              |
              v
Verify that layer's result
+ any affected access outcome
```

“Not found” means investigate coverage before declaring absence. It does not mean delete. “Found” means compare the collection path and the field's origin; it does not mean approve access.

The final verification follows the chosen correction. An improved catalog entry needs matching identity, meaningful content and correct linkage. A membership change needs evidence for the exact account and entitlement, plus the relevant native result. A shared permission change needs checks for the affected population.

This is a human decision map, not an ISC processing order or a rule that every investigation must change something.

| Established cause | Appropriate correction and closing evidence |
|---|---|
| The intended group is excluded by the read scope | Review the scope change and its impact, then verify returned detail and correct linkage. |
| Source description is vague, but native meaning is confirmed | Agree content ownership, maintain an accurate explanation and check the saved result. |
| Returned keys do not match the selected schema identifier | Validate the contract and controlled mapping correction, including existing references and duplicate risk. |
| One holder no longer needs a valid permission | Use the approved account-access change process and verify its native outcome. |
| A native object is confirmed retired | Resolve dependencies and follow the supported catalog-synchronization path for that record's origin. |
| The evidence remains incomplete | Record the precise gap and accountable next check; do not disguise uncertainty with a guessed label or deletion. |

If unknown access could expose sensitive information, do not silently mark it harmless while waiting. Escalate the evidence gap and use the organization's approved risk-handling process, including any authorized interim restrictions. Uncertainty is not automatic approval, and it is not permission for an unreviewed broad deletion.

## Work through the evidence

### Case 1: The administrator found the missing group

**Facts:** CaseBridge's group read completed for CurrentTeams. Native `G-9601` is confirmed in LegacyTeams. Its key matches Devi's account value.

Does the completed run prove a connector failure?

**Reasoning:** No. The configured scope explains the omission. The read can succeed for its query while missing an object the integration was meant to cover. Compare the approved scope with the actual query, review a controlled correction, and verify returned detail. Do not change the group identifier or remove Devi's membership to repair the missing explanation.

### Case 2: The label matches, the key does not

**Facts:** The account holds group value `G-9601`. A returned group has `groupKey = G-9699` and label Case Reviewers. No replacement or migration evidence is supplied.

Can you treat the returned definition as the account's group?

**Reasoning:** No. A common display name does not establish identity. Find the definition for the exact source, type and key, or obtain evidence explaining a replacement. Do not merge records or assume the new group's permission is equivalent.

### Case 3: Nobody holds Monthly Reviewers

**Facts:** A complete current account read shows zero holders of `G-9602`. The native group exists, and its owner confirms an approved periodic use.

Should account aggregation remove its catalog entry?

**Reasoning:** No. Account aggregation does not delete entitlements from the catalog. The existing native definition and future-use evidence also defeat the assumption that zero holders means obsolete. Retain or change it according to the agreed business design, not a holder-count cleanup rule.

### Case 4: A deleted group remains visible

**Facts:** Approved deletion of native `G-9603` is confirmed. The catalog item was previously collected through entitlement aggregation. Only account aggregation has run since deletion.

Is another account read the documented catalog-removal mechanism?

**Reasoning:** No. Check the relevant entitlement-aggregation path and its outcome for the exact source and type. Also confirm that dependent access-model items have been addressed. The supplied evidence explains why disappearing memberships alone do not establish catalog deletion.

### Case 5: The new source description did not replace the old one

**Facts:** A relevant successful entitlement read returns the intended source description. ISC retains an older manually maintained description for the same item.

What would you investigate next?

**Reasoning:** Manual-update protection and the agreed authority for that field. Establish the desired current meaning and maintain it through the supported method. The mismatch alone does not establish a failed connection, and repeating collection does not resolve which text should be authoritative.

### Case 6: Only the first page was examined

**Facts:** An investigator cannot find an entitlement in the first page of a native query. More pages are available. No independent exact-key lookup has been performed.

Can they record the object as deleted?

**Reasoning:** No. The supplied search is incomplete. Complete the relevant search or obtain an appropriately authorized exact-key check before asserting absence. “Not yet observed” is the supported conclusion. A partial search does not authorize deletion or a classification based on a guessed permission.

### Case 7: Removing the type seems quicker

**Facts:** An entitlement type has poorly described entries. Someone proposes deleting the type to remove those entries and starting again.

Would that perform the proposed cleanup?

**Reasoning:** No. Type deletion does not delete the associated entitlements and stops their aggregation or update until an appropriate type exists. Investigate collection, field content and schema mapping instead. The proposed action damages the update path without establishing what is wrong with the access items.

### Case 8: The catalog is clearer, but access was supposed to be removed

**Facts:** An approved decision requires removing `G-9601` from `cb-100606`. The completed work changed only the ISC description. Current native evidence still shows the membership.

Has the required correction been delivered?

**Reasoning:** No. The task required an account-access change, not a description improvement. Inspect the appropriate provisioning activity or manual task and confirm the exact native result. The facts establish an unfulfilled access outcome; they do not identify an unobserved technical failure stage.

## Try it with a license instead of a group

A fictional design application shows entitlement `L-706` as Standard, with description “Default license.” A current, complete account read shows no assigned accounts. A supported native license-definition read confirms that `L-706` exists, permits editing and export, and is reserved for a project beginning next month. The responsible business contact confirms that planned use is approved.

Another license, `L-709`, is also displayed as Standard but permits viewing only. The source's identifiers distinguish the two. No retirement decision or access change has been approved.

Explain what needs investigation, whether the empty holder list makes `L-706` stale, and what you would correct.

The zero-holder evidence concerns assignment now. The native definition and approved planned use explain why the item can remain valid. No evidence establishes retirement.

The duplicate display wording is a usability problem, not proof that the licenses are duplicates. Preserve their separate keys and confirm their feature boundaries.

Obtain an accountable application contact and replace “Default license” with an accurate explanation of the actions and intended use. Check the supported mapping and field-maintenance authority before changing how descriptions are supplied.

A clearer catalog does not assign a license, change its native features or establish that a future worker should receive it. That needs the worker's requirement and the appropriate decision and delivery process.

When you close an entitlement investigation, say exactly what was unknown, which evidence resolved it, which layer changed and how you checked the result. If evidence is still missing, name the missing evidence and who will obtain it. That is more useful than calling the item “stale” and leaving the next person to guess what you meant.
