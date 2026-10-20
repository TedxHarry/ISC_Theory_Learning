# Identity and account: how one person is represented across systems

*Lesson FND-001 · Revision 1.3*

Someone asks you to show all the accounts an employee uses.

You could open each application and search for the employee. But the applications may use different usernames. One might know her by employee number, another by a shortened name, and another by an email address.

How do you establish that those records belong to the same person?

That question leads us to the relationship between an identity and an account in SailPoint Identity Security Cloud, or ISC.

## Start with the records that already exist

Devi works in the Finance department. She already has a worker record in the HR system, a directory account used for workplace access, and an account in a finance application.

We want ISC to bring those records together so the organization can understand her accounts and access.

The following records are fictional. We’re showing only the fields needed for this explanation.

| System | Record for Devi | Information used in our example |
|---|---|---|
| HR system | Worker record | Name: Devi; employee number: `10482`; department: Finance |
| Directory | Account with username `devi.r` | Employee ID: `10482` |
| Finance application | Account with username `dv10482` | Worker number: `10482` |

Notice that the usernames differ.

That does not, by itself, tell us whether the accounts belong to different people. Each system can have its own naming conventions.

We need a reliable relationship between the records.

## An account represents a record on a particular source

In the directory, Devi’s account contains information relevant to that directory. The finance account contains information relevant to the finance application.

ISC collects account information from systems it manages. Within ISC, that information is associated with a **source**.

A source represents a system or collection of account data configured in ISC. Its configuration describes how ISC obtains that data and, where supported, performs changes.

The **connector** provides the integration with the system.

There is one detail to be careful with: an account record does not always mean an interactive login. For an HR integration, the collected record can represent a worker. You should understand what the connector treats as an account rather than assuming every account has a password.

The fields on a record are its **attributes**. A username, employee number, department, and account status are examples. Their organization is described by the account schema.

When you inspect an account in ISC, you are inspecting ISC’s representation of that source record. The actual account still exists in its system.

Those two views can differ if a change has occurred and ISC has not yet received the corresponding update. Seeing an account in ISC gives you information about the account; assessing its current target state can require additional evidence.

## The identity gives ISC a person-level view

For an individual employee, an **identity** is the ISC record representing that person.

Devi’s identity can contain information such as her name, employee number, department, and manager. It also provides the place from which ISC relates her accounts and access across systems.

The identity gives us a person-level view. Each account preserves the details of one source record.

If you want to understand Devi’s department as calculated in ISC, inspect the identity’s department attribute.

If you want to understand the department recorded on her finance account, inspect that account’s department attribute.

Both fields might be named “department,” but they belong to different objects. They can have different values.

An attribute’s name alone does not tell you where its value came from or which record it describes.

## How does ISC build this relationship?

The administrator has prepared the sources, mappings, and account-matching configuration. The required identity information is available. ISC has not yet loaded Devi’s records.

In this example, the administrator loads HR first, followed by the directory and finance application.

**First, ISC reads the HR record.**

Reading account data into ISC is called **aggregation**.

HR has been designated as an **authoritative source** through an identity profile. Here, authoritative means that this source supplies the population from which our identities are established.

An **identity profile** includes mappings that specify where identity attribute values come from.

Our example maps HR’s employee number and department to the corresponding identity attributes. With the required information present, the authoritative account data establishes Devi’s identity.

An authoritative source does not have to supply every identity attribute. Another configuration could obtain employee number and department from HR while obtaining email from the directory. The identity profile’s mappings determine those sources.

The value `10482` is the employee number in this example. It is not the internal ID that ISC assigns to its identity object.

At this point, ISC has a person-level record for Devi. Her directory and finance accounts already exist in their systems, but we have not loaded them in this walkthrough.

**Next, ISC reads the directory account.**

The directory record contains the employee ID `10482`.

The configured matching criteria compare that account attribute with the employee number on an existing identity. In our example, the value uniquely matches Devi’s identity.

Matching and assigning a source account to an identity is called **account correlation**.

The directory account becomes associated with Devi’s identity.

**Then ISC reads the finance account.**

This source uses a field named worker number. Its configured criteria compare that field with the identity’s employee number.

Again, the value is `10482`, and the intended match is unique.

The finance account becomes associated with the same identity.

Our example uses employee identifiers because they provide the intended unique matches in these records. A real implementation must evaluate the available attributes and applicable correlation logic.

After successful processing in this example, we have:

| ISC identity | Associated source records |
|---|---|
| Devi | HR worker record |
| Devi | Directory account `devi.r` |
| Devi | Finance account `dv10482` |

The records remain separate. Their relationship allows ISC to show them together in the context of Devi.

## What happens when that comparison cannot match?

Consider a different first-time import. Devi’s identity already exists, but the directory account has never been associated with an identity.

This time, the values are:

| Value being compared | Value present |
|---|---|
| Employee number on Devi’s identity | `10482` |
| Employee ID on the directory account | Empty |

That comparison cannot establish the intended match. It has no account-side employee ID to match with `10482`.

But that observation alone does not establish the final correlation result. ISC also has default matching behavior, and another applicable comparison could establish a relationship.

For this variation, assume that no other configured or default matching logic finds an identity. The account remains uncorrelated to the intended employee identity.

You now have a specific data question to investigate: why is the directory employee ID empty, and who supplies that field?

The distinction matters. “This comparison failed” and “the account has no matching identity” are different conclusions. The second requires considering the complete applicable matching behavior.

## What changed, and what stayed the same?

In the successful example, we began with records in separate systems.

After loading and matching them, ISC can relate those records to Devi’s identity.

Her directory username is still `devi.r`. Her finance username is still `dv10482`. Associating the accounts does not require both systems to adopt the same username.

We also have not established that the accounts have appropriate access. We have established the relationship between the records and the employee.

That relationship makes later questions possible:

Which accounts are associated with Devi? What access do those accounts contain? Which account should a particular change concern?

The accuracy of those answers depends on the underlying data and associations.

## Does an identity’s existence prove that an application account exists?

Suppose the company introduces another application and Devi has no account in it.

Her existing identity does not establish that the new application account exists.

Creating or modifying an account in a target system is a **provisioning** operation. It needs the relevant configuration, required account values, and a supported fulfillment method.

Configured automation can connect identity-related events to account provisioning. For example, an organization can configure lifecycle-driven access to initiate changes as employees enter a business stage.

The distinction is between the identity record and the target account, with provisioning providing the relevant change mechanism. You must still establish whether that mechanism ran and what it accomplished.

This helps when someone reports, “Devi exists in ISC, but she cannot access the application.”

First establish which application and account are involved. Then investigate whether the account exists and whether it has the required access.

## Can Devi have two accounts on the same source?

Yes. An organization might give an employee a regular directory account and a separate administrative account.

If both accounts are associated with Devi, her identity can show both. They remain distinct accounts and can carry different access.

SailPoint documents that one identity can have multiple accounts on a source.

The practical question then becomes more specific.

“Change Devi’s account” is incomplete when two accounts are relevant. An engineer needs to establish which account the change should affect.

This is one reason account selection matters during provisioning.

## What if the finance account is missing from Devi’s identity?

There are different possibilities, and they call for different checks.

The account might exist in the application but not have been loaded into ISC. It might be outside the configured collection scope. Or it might be visible under the source without the expected association to Devi.

Separate two questions:

1. Does ISC contain the expected source account record?
2. Is that account associated with the expected identity?

The first question concerns collection and the account record. The second concerns the relationship.

You can inspect accounts through the source’s account view and inspect identity information through the identity view. These views let you examine the objects and relationships from different directions.

Finding the account under the source gives you a more focused investigation. Examine its current association and the information used for matching before assuming another account needs to be created.

## Now change one value

Devi moves from Finance to Operations.

HR records the new department. After the relevant collection and identity processing, ISC’s identity department is Operations.

Does that prove that the department on her finance account is also Operations?

Remember where the values live.

The identity department and the finance account’s department belong to separate records. Updating one does not establish that the other was updated.

ISC has a mechanism called **attribute synchronization** that can keep configured attributes on existing correlated accounts aligned with identity attributes. Its applicability depends on the configuration, and its execution and result need to be checked.

If the values differ, establish their origins and the expected update mechanism before deciding that something failed.

## Work through these before reading the explanations

**1. One employee has an HR record, a directory account, and a finance account. All have been successfully associated with the same identity. How many identities are represented in this example?**

Explain why the number of accounts does not determine the number of identities.

**2. The finance application contains Devi’s account. ISC’s source account list also contains it, but the expected association to Devi is absent. What has already been established, and what should you inspect next?**

Choose evidence that investigates the missing relationship.

**3. Devi’s identity shows Operations, while her finance account shows Finance. Does this observation alone establish that identity processing failed?**

Identify the evidence needed before reaching that conclusion.

**4. Devi has an identity in ISC but no account in a newly introduced application. Would associating one of her existing accounts with her identity create the missing application account?**

Explain which kind of operation would be needed and how you would establish its result.

## Compare your reasoning

**For the first question:** There is one identity associated with three source records. The identity represents the employee within ISC. The accounts preserve each source’s information. Successful association brings those records into the person-level view without combining them into one account.

**For the second:** The account exists in the application and has been collected into ISC. The unresolved part is its expected association. Inspect the account’s current association, its matching attributes, the corresponding identity attributes, and the applicable correlation configuration. The supplied observations do not yet identify the cause.

**For the third:** The different values alone do not establish a processing failure. Use evidence that answers the separate questions:

| Question | Evidence to examine |
|---|---|
| Why does the identity show Operations? | The identity profile’s department mapping, the mapped source value, and the current identity value. |
| What does ISC know about the finance account? | Its account attributes and the relevant collection or update history. |
| Should the finance department follow the identity department? | The finance source’s attribute-sync configuration and applicable mapping. |
| If an update was expected, what happened? | Attribute-sync events or provisioning activity, followed by the relevant current target-system information. |

SailPoint provides attribute-sync events for inspecting synchronization activity. Those events help you investigate an expected update; configuration alone does not establish its outcome.

**For the fourth:** Associating an existing account establishes a relationship with that account. Creating an account in another application requires the relevant provisioning operation and fulfillment. Configured automation may initiate it, but you must check the provisioning result and confirm that the intended account exists.

## Explain it to someone else

Using an application of your choice, explain:

- What the identity represents.
- What the application account represents.
- How the account becomes associated with the identity.
- Why the authoritative source does not have to supply every identity attribute.
- How account association, account creation, and attribute updates differ.

Use your own example rather than repeating Devi’s records. Keep each object and each operation clear as you explain the flow.
