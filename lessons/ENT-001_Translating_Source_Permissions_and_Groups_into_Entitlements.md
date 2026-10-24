# A group appears in ISC. What access does it actually represent?

Devi, employee number `100101`, checks invoices in an application called InvoiceDesk. Her account is `iv-100101`.

SailPoint Identity Security Cloud (ISC) shows an entitlement named Invoice Readers associated with that account. Devi can open a West-region invoice, but she cannot approve it. She also cannot open an East-region invoice.

Is the entitlement broken?

Before changing anything, we need to know what Invoice Readers represents, which account holds it, and what InvoiceDesk allows that account to do. Those are connected questions, but they are not the same question.

The InvoiceDesk application, records, configuration, policies and results below are fictional. The example assumes supported group and account collection, correctly linked records and membership that stays in place until removed, called standing access. It does not describe a default connector configuration or an actual tenant test.

## Start with the permission, not the label

A **permission** allows an action on something: reading an invoice, editing a supplier or approving an expense. The action and the thing it applies to both matter.

“Read invoices” is already more useful than “finance access.” But it may still be incomplete. Does it mean all invoices, or only invoices within the account's assigned region?

A **group** is a collection of accounts or other supported members. An application can use group membership when deciding what those members may do. A group used only as a mailing list doesn't automatically grant application permissions.

An **entitlement** in ISC represents an access right on a source. Depending on the system and supported integration, that right may be represented by a group, an application role, a license or another supported access object.

This is why an entitlement is not always one tiny permission. One application group can grant several actions. Another can grant only one. ISC's represented unit of access follows the source's supported model; it does not turn every possible application action into a separately manageable item.

For this example, the application owner supplies these rules:

| InvoiceDesk group | Agreed permission meaning |
|---|---|
| Invoice Readers, native ID G-4101 | Read invoices within the account's businessUnit; no editing or approval |
| Invoice Approvers, native ID G-4102 | Approve invoices within the account's businessUnit; does not itself release payment |

**Native ID** means the identifier used for the object in the external system. G-4101 identifies the Readers group in this integration.

Devi's account has businessUnit West and belongs to G-4101 only. The account is enabled, and her sign-in succeeds. Under the supplied policy, reading West invoices is expected. Approving an invoice or reading East invoices is not.

We haven't found a failure. We have found a boundary of her access.

Notice where the meaning came from: the application's permission configuration, confirmed by its owner. We didn't infer it from the word Readers alone.

## Keep the access object separate from its holder

An **account** is the record through which a person or another entity uses an external system. Devi is the person; iv-100101 is her InvoiceDesk account.

An **identity** is ISC's representation of a person or another entity. **Account correlation** associates a collected account with the appropriate identity. Here, that association has been checked: iv-100101 belongs on Devi's identity.

A **membership** is the relationship between an account and a group. The group can exist before Devi joins it and remain after she leaves it.

That gives us three different statements:

- G-4101 is an existing group in InvoiceDesk.
- Account iv-100101 belongs to G-4101.
- That account is associated with Devi's identity in ISC.

The first statement doesn't prove the second. The second doesn't, by itself, establish the third.

If twenty accounts belong to the same group, we have one group definition and twenty account-to-group membership relationships, not twenty unrelated entitlement definitions.

This distinction matters when someone asks, “Does Devi have Invoice Readers?” We need the correct account and its membership, not just a search result showing that the group exists.

## How the source group becomes an ISC entitlement

A **source** is ISC's configured representation of a system or collection of account data. A **connector** provides the supported integration used to read information and, where supported and configured, make changes.

Our source is InvoiceDesk Production. It represents the production InvoiceDesk system directly. It is not a directory group that a separate application may or may not honor.

**Aggregation** means collecting external data into ISC. Two collections have different jobs here:

**Account aggregation** collects accounts and their relevant attributes, including represented memberships. An **attribute** is a named piece of information on a record.

**Entitlement aggregation** collects the access objects themselves, such as group IDs, names and descriptions. With appropriate support and scope, it can collect groups that currently have no members.

A **catalog** is the collection of represented access items. An item being present in the catalog means ISC has a representation of that access. It does not mean everyone, or anyone in particular, holds it.

How does ISC know which account data represents access rather than an ordinary description?

A **schema** describes the attributes represented for a kind of record and their designated uses. The account schema identifies the membership attribute as entitlement information.

For this fictional integration:

- The account's membership attribute is named groups.
- It is marked as an entitlement attribute.
- It is multi-valued, so it can carry several group references.
- Its Type is groups, connected to the supported entitlement type also named groups.
- The entitlement schema selects id as the Entitlement ID and displayName as the Entitlement Name.

An **entitlement type** identifies a supported kind of access object. Here, groups is the supplied native object type, not a friendly name invented to improve the screen. Native type names and available capabilities depend on the integration.

The businessUnit attribute also matters to the application's authorization decision. That does not automatically make it an ISC entitlement. In this design it supplies the region used to limit the group's permission; groups carries the represented access memberships.

The word Type is doing a specific job in that account-schema setting: it connects the membership attribute to the corresponding kind of entitlement object.

On Devi's collected account, groups contains G-4101. On the collected group record, the selected ID value is also G-4101. The source context, schema relationship and matching identifying value connect the membership to the group details.

The displayed name Invoice Readers helps a person recognize it. It is not a substitute for the identifying reference.

These are selected teaching records, not an actual connector response or a required API request format:

```text
InvoiceDesk Production

Devi's ISC identity
  |
  | associated account
  v
Account: iv-100101
  businessUnit: West
  groups: [G-4101]
              |
              | matching group reference
              v
Entitlement type: groups
  id: G-4101
  displayName: Invoice Readers

Group definition != account membership
```

Read the diagram as relationships, not as a claimed processing schedule. The group details and account data can be collected at different times. Their relationship does not prove that every view is equally current.

Marking groups as an entitlement attribute tells ISC how to interpret the collected values. It does not add G-4101 to the external account.

Likewise, reading a group into the catalog does not create a new group in InvoiceDesk. Collection represents what the integration reads; a write is a different operation.

## What happens when Devi opens an invoice?

**Authentication** establishes who is signing in. **Authorization** decides whether the authenticated account may perform the requested action.

The application uses its own authorization rules. In our example, InvoiceDesk considers the account's membership and businessUnit when evaluating the selected invoice and action.

**Scope** is the boundary of the permission: which records or resources it covers. Here, West is part of that boundary.

```text
Devi signs into InvoiceDesk
  |
  v
Account iv-100101
  enabled; sign-in succeeds
  groups: G-4101
  businessUnit: West
  |
  v
InvoiceDesk evaluates its own policy
  |
  +-- Read West invoice --> Allowed
  |
  +-- Read East invoice --> Denied
  |
  +-- Approve invoice ---> Denied

ISC represents the group and membership.
InvoiceDesk enforces these actions.
```

This is the supplied application policy, not an ISC rule engine diagram. ISC does not need to approve each ordinary invoice-opening action for this integration.

**Effective access** means what the account can actually do under the conditions being evaluated. Recorded membership is important evidence, but membership alone may not describe every condition governing effective access.

A disabled account, a different resource, another grant or an application restriction can change the result. Some systems also have temporary access that must be activated. Just-in-time access means access is authorized ahead of time but provisioned for use when activated, rather than continuously held. Our example uses standing membership, not access awaiting that activation.

So when a user reports “I have the entitlement but access fails,” ask which action failed, on which resource, through which account, and when. “Access fails” is too broad to identify a broken stage.

## What the screen tells you, and what it doesn't

A friendly entitlement name is useful. A description is useful. Neither is an independent test of the application's current permission rules.

**Metadata** is information describing an object, such as its description or owner. An **owner** is the person or responsible party assigned to decisions about that access object. Ownership does not mean that person is a member of the group.

A useful description for G-4101 would say that it permits invoice reading within the account's businessUnit and excludes editing and approval. “Basic access” leaves important questions unanswered.

Still, correcting the description in ISC is not the same as correcting InvoiceDesk's permissions. If the application accidentally grants editing through G-4101, changing the words to “read only” doesn't remove editing.

Read each kind of evidence within its limits:

| Evidence available | What it supports, and what remains open |
|---|---|
| Catalog contains G-4101 | ISC represents the group; it does not establish Devi's membership |
| Collected groups on iv-100101 includes G-4101 | ISC recorded that account's membership at the relevant collection; check freshness for a current-state question |
| Account is correctly correlated to Devi | The recorded account access can be associated with her identity; it does not establish approval or appropriateness |
| Application owner confirms the permission rule | Establishes the agreed meaning; current enforcement still needs suitable evidence |
| A current application check allows West reading | Confirms that selected action under the checked conditions; not every action, invoice or account |

This is the front-end and back-end connection in practical terms. The screen presents records and relationships. The integration supplies the represented source data. The application applies its permission rules when an account attempts an action.

A screen displaying a name isn't proof that all three parts are correct.

## Having access isn't the same as having requested it

Suppose an InvoiceDesk administrator added Devi to G-4101 before this application was connected to ISC. Later, aggregation collects the existing account and membership.

ISC can now represent access it did not originally grant.

An **access request** asks for an access item for a recipient. The configured process may include an approval decision. A recorded membership is not, by itself, evidence that such a request existed or that an approver accepted it.

**Governance** concerns whether access is appropriate, accountable and maintained under the organization's policies. A **certification** is a review in which assigned reviewers decide whether selected existing access should be retained or removed.

These processes need accurate access representation precisely because existing access can come from outside ISC's request process.

An entitlement also doesn't become requestable merely because it was aggregated. **Requestable** means it has been made available through the applicable request configuration. That is separate from discovering that it exists.

We should therefore distinguish “Devi holds it,” “Devi should hold it,” and “Devi can request it.” One statement cannot silently stand in for the others.

## Where access profiles, roles and provisioning fit

An **access profile** bundles related entitlements from one source. For example, a configured Invoice Review access profile could include G-4101 together with another required InvoiceDesk entitlement.

An **ISC role** groups access for a business purpose and can support assignment based on configured criteria. It can include access profiles or direct entitlements.

Neither object changes what G-4101 means inside InvoiceDesk. They organize access requirements and how access is assigned or governed.

Be careful with the word role. An application's native role can be represented as an entitlement. That does not make it an ISC role. Ask which system owns the object and what job it performs.

**Provisioning** carries out supported account or access changes. If an authorized process requires a new membership, the supported fulfillment path must add that membership to the selected external account. A decision that access should be granted is not itself proof that the external change succeeded.

For direct fulfillment, operation support, source configuration, target permissions and the actual result all matter. Other integrations may require manual fulfillment. Read capability doesn't establish write capability.

Removing a membership is another distinct change. It concerns the account-to-group relationship, not necessarily the group's existence. An instruction to remove Devi's group membership should not be interpreted as an instruction to delete the shared group.

After an attempted change, verify the relevant outcome. Don't use an old collected membership as proof that a recent removal failed, or a completed approval as proof that a group addition succeeded.

Even a confirmed removal of G-4101 proves only that membership was removed. If another independently granted group permits the same action, Devi may retain that action through the other path.

## Work through the evidence

For each case, pause at the question and decide which fact is missing before reading the reasoning. Unless a case explicitly changes a fact, use the supplied InvoiceDesk policy.

### Case 1: The group is there, but is the account a member?

**Facts:** Entitlement aggregation collected G-4101. A fresh account collection for iv-100101 contains an empty groups list. The supplied application check confirms no other invoice-reading grant.

Can we say Devi holds Invoice Readers because the catalog shows it?

**Reasoning:** No. The group definition exists, but this account has no recorded membership in it. The supplied current check also rules out another reading grant for this case. The missing relationship cannot be filled in by the existence of a catalog item.

### Case 2: No ISC request can be found

**Facts:** Fresh account evidence includes G-4101. The application administrator's change record shows that membership was added directly in InvoiceDesk. No ISC access request was used.

Does the absence of an ISC request mean the entitlement isn't real?

**Reasoning:** No. The membership exists and can be represented in ISC. The record of how access was granted is different from the record of what access the account holds. Whether that direct grant was appropriate requires policy and authorization evidence; absence of an ISC request alone doesn't settle that question.

### Case 3: Readers can edit

**Facts:** The application owner confirms that a recent InvoiceDesk permission change accidentally added editing to G-4101. A current check shows iv-100101 can edit a West invoice. ISC still displays Invoice Readers.

Should we trust the label or change it to make the problem disappear?

**Reasoning:** Neither resolves the permission defect. The supplied application evidence establishes unintended editing. The responsible application team must address the actual permission configuration through the approved change process, with scope and affected members considered. A label correction might improve the description, but it cannot substitute for removing the unwanted capability.

### Case 4: The same name appears in two environments

**Facts:** InvoiceDesk Test and InvoiceDesk Production both contain a group displayed as Invoice Readers. Devi's production account has no G-4101 membership. Someone presents a Test catalog result as proof of production access.

Is the matching display name enough?

**Reasoning:** No. The result describes a different source context. Identify the production account, its relevant membership value and the production entitlement it references. Human-readable names don't collapse separate environments into one access object.

### Case 5: Approval fails, but reading works

**Facts:** Devi's current memberships contain only G-4101. West reading succeeds; approval is denied. The owner reconfirms the stated policy.

Should we re-run provisioning to fix approval?

**Reasoning:** The observed denial matches the access supplied. G-4101 doesn't authorize approval. First establish whether approval is a legitimate new requirement. If it is, follow the approved access process for the appropriate item. Repeating delivery of Readers doesn't turn it into Approvers.

### Case 6: One group, many holders

**Facts:** Twenty current account records each reference G-4101 on InvoiceDesk Production. The catalog has one matching group record.

Are nineteen entitlements missing?

**Reasoning:** No. One shared access object can have many holders. Investigate a missing membership on a particular account if the evidence indicates one, rather than expecting a separate group definition for every member.

### Case 7: The wrong person owns the account in ISC

**Facts:** iv-100101 belongs to Devi in InvoiceDesk and contains G-4101. In ISC, it has been correlated to another person's identity.

Would changing the entitlement description correct the person's access view?

**Reasoning:** No. The broken relationship is account-to-identity association, not the permission meaning of G-4101. Investigate the account ownership evidence and correlation under an approved correction process. The native membership and the incorrect identity association are separate facts.

### Case 8: Membership is removed, but reading remains

**Facts:** An authorized removal of G-4101 from iv-100101 is confirmed by fresh application evidence. The account still belongs to a second group, G-4199. The owner confirms that G-4199 independently permits West invoice reading, and a current read succeeds.

Did the G-4101 removal necessarily fail?

**Reasoning:** No. The selected membership was removed. Another supplied grant explains the remaining capability. If the requirement was to eliminate all invoice reading, that broader outcome hasn't been achieved. Review the other grant and its legitimate requirements before deciding on a further change.

## Try the reasoning in a different system

A project application exposes a native role named Project Reviewer, identified by R-82. Its supported integration represents the role as an entitlement. The account proj-501 references R-82 and is correctly associated with its owner in ISC.

The application owner states that R-82 permits reading reports only for projects assigned to that account. It does not permit editing. Current evidence shows the account can read an assigned project's report and is denied editing. The entitlement has not been configured as requestable.

Explain these four points:

- Why can a native role be an entitlement without being an ISC role?
- What establishes that this account holds the represented access?
- Why is the editing denial not a delivery failure?
- Why doesn't the catalog item automatically become an available access request?

The native role is an external access object; the ISC entitlement represents it. An ISC role is a separate access-model object. The matching R-82 account reference, correct source/type context and verified account association support the recorded holder relationship. The supplied policy explains the editing denial. Request configuration is separate from collection and membership.

To explain an entitlement clearly to someone else, start with the external access object and its agreed permission meaning. Then identify the account, the membership reference, ISC's representation and the evidence of what the application actually permits. That gives the name a meaning without asking it to prove more than it can.
