# Why does an organization need ISC?

*Lesson SYS-001 · Revision 1.3*

Devi works in Finance. She's just been assigned to check supplier invoices, and she already has an account in the finance application. Her password works. She can sign in.

But when she opens the invoice queue, the application refuses access.

What would you check first?

In this case, the application owner checks the account and confirms that it is missing the permission needed to view invoices. We now have a specific finding, not just an access-denied message.

Creating another account wouldn't address the missing permission on her existing account. Resetting her password wouldn't explain why she can sign in but cannot view invoices. Giving her every Finance permission would let her do more than her work requires.

We need a more precise answer: which permission does her work require, who can authorize it, and how will it reach the correct account?

Devi and the application are fictional. In this example, `INVOICE_VIEW` allows an account to read invoices. A separate permission, `PAYMENT_RELEASE`, allows payments to be released. Devi needs the first, not the second.

That distinction matters. Helping someone get access and controlling the access they receive are part of the same responsibility.

## Why can't the application team just add the permission?

They can, if the request is authorized and they have the means to make the change.

But look at what they need to know before doing it.

Does this account belong to Devi? Is invoice checking part of her current work? Does the permission mean what the requester thinks it means? Who approved it? Should it remain when her assignment changes?

The application team may know the technical permission without knowing Devi's current responsibilities. Her manager may know the responsibilities without knowing the application's permission names.

In a manually coordinated process, the information could be spread like this:

| Information needed | Where it lives in this example |
|---|---|
| Devi's employment details and employee number | HR system |
| Her current work assignment | Manager's instruction |
| Her account and current permissions | Finance application |
| Meaning of `INVOICE_VIEW` and `PAYMENT_RELEASE` | Application owner's access documentation |
| Approval to grant invoice access | Email or service ticket |
| Confirmation that the change was made | Application administrator's response and application records |

None of those records alone answers the whole question.

An HR record doesn't prove that the application account exists. An account doesn't explain whether its permissions are still justified. An approval email doesn't prove that an administrator applied the change.

You could bring the information together manually for Devi. Now imagine doing the same work whenever someone joins, changes responsibility, requests additional access, or leaves. Each case requires the right information to reach the right person, followed by a change and a check of its result.

The difficulty isn't simply the number of accounts. It's keeping those relationships and decisions reliable as people and systems change.

## What goes wrong when those pieces stay separate?

Suppose the administrator waits for a clear approval. Devi can't finish her assigned work while the request moves between teams. This is a delivery problem: legitimate access is missing.

Now suppose the administrator copies a colleague's permissions to avoid the delay. That colleague also releases payments. Devi receives `PAYMENT_RELEASE`, even though nobody established a reason for her to have it. This is an excessive-access problem.

Neither outcome requires anyone to be careless. The process can make the correct action difficult by failing to provide a clear access definition or an accountable decision.

There is another problem that appears later. Devi can have exactly the right access today and unnecessary access next month. Her work changes, but the old permission remains because no process connects the change in responsibility to a review or removal.

Then someone asks, "Why does she still have this?" The original ticket proves that access was approved at one point. It doesn't establish that the original reason still applies.

These are the kinds of problems that lead an organization to implement SailPoint Identity Security Cloud, or ISC: incomplete visibility, inconsistent access decisions, delayed changes, retained access, and weak evidence of what actually happened.

## Where does ISC fit?

ISC brings together information about people, their accounts, and their access. It provides configured ways to ask for access, apply account changes, and review whether existing access is still appropriate. The required capabilities must be available and configured; setting up ISC does not establish the organization's access rules.

The business still has to decide who should have invoice access. The application owner still has to explain what its permissions allow. The engineer connects those requirements to data, configuration, and a way to carry out the approved changes.

The policies, decisions, and reviews used to keep access appropriate are part of **identity governance**. **Identity administration** includes the operational work of managing accounts and their access. Together, these are called **identity governance and administration**, or **IGA**. In Devi's situation, judging whether invoice access is justified and applying the permission are connected responsibilities, but they are not the same action.

Think about the question you need answered, rather than starting with a screen:

"Which person is this, what access do they have, what should change, and what evidence will show that the change happened?"

To answer it, ISC first needs information about the person and the systems involved.

## How does ISC know which account belongs to Devi?

Within ISC, a **source** represents a system or collection of account data being managed. A **connector** provides the integration used to obtain that data and, where supported, make changes. The source is not a replacement for the application itself.

An **identity** is the person-level record representing Devi. Her **account** is the separate record in the finance application. ISC can associate that source account with her identity, allowing the account information to be understood in the context of the employee.

For this example, administrators have configured HR and the finance application as sources. They have also configured how the employee population becomes identities in ISC.

Reading account information into ISC is called **aggregation**. It supplies information about the source records. Reading the records is different from deciding whether their access is appropriate.

**Account correlation** is the matching and assignment of a source account to an identity. It answers, "Which identity does this account belong to?" It connects the records; it doesn't grant invoice access.

Our example uses employee number `11001` on Devi's identity and the corresponding employee-number field on her finance account. The account-matching configuration uses those values to establish the intended, unique association.

Now we can ask about the permissions on Devi's account without guessing from its username.

In ISC, an **entitlement** represents an access right on a source, such as an application permission or group membership. In this example, `INVOICE_VIEW` is collected and represented as an entitlement. Its business meaning comes from how the finance application uses it, not from the spelling of its name.

Notice what we've established so far: ISC has relevant data and an account association. We haven't yet established that Devi should receive a new permission or that any application change has happened.

## Turn "I need invoice access" into a specific decision

An **access request** is a way to ask for specific access through ISC. It identifies the access wanted and who should receive it. Here, Devi is asking for the invoice-viewing permission for herself. She already has a finance account, so she isn't asking for another one. Submitting the request does not mean that it has been approved or that the permission has reached her account.

The application owner confirms that `INVOICE_VIEW` permits the required invoice reading and does not allow payment release.

For our example, the ISC administrator has made this entitlement **requestable**, meaning it is available to be requested, and configured manager approval. Devi's correct manager is available in ISC, and she can see the entitlement among the access she is allowed to request. ISC supports entitlement requests and configurable approval requirements; manager approval here is our chosen configuration, not a universal default.

The business request now has a precise meaning:

"Give Devi's existing finance account `INVOICE_VIEW`, if her manager approves the need for invoice-checking work. Do not grant `PAYMENT_RELEASE`."

That is much clearer than "give her Finance access."

The narrower request helps everyone involved. Devi knows what she is requesting. Her manager can judge its business purpose. The engineer knows which access item and account the change concerns.

We also need a supported way to apply it. **Provisioning** is the process of making account or access changes in a target system. The **target system** is the system receiving the change, which is the finance application here. Reading the account tells ISC what it knows about the account; provisioning attempts to change it.

Assume the finance connector supports adding this entitlement, provisioning is enabled, and the integration has the required connection and permissions. Devi has one finance account, already associated with her identity. This request has no future start date or separate activation step.

Those conditions make the following path possible. They are not consequences of simply creating a source.

## Follow the request to the application

**Devi submits the request.**

The requested entitlement identifies the access she wants. Submitting it starts the request process; it doesn't itself establish approval or change her account.

**Her manager reviews the need.**

In our configured process, the manager decides whether invoice access is justified. If the manager rejects the request, this request does not authorize a grant. If the manager approves it, the approved request can proceed to fulfillment, meaning the work required to deliver the access.

Approval changes the decision about the request. The application's permission list still needs a separate change.

**ISC initiates the account change through the integration.**

The provisioning operation asks the finance application to add `INVOICE_VIEW` to Devi's existing account. It is not an account-creation operation.

**The application processes the operation.**

In the successful version of our example, the application accepts the change and stores the permission on the correct account. Its own permission logic then allows that account to read invoices.

The request interface didn't directly change what the invoice page permits. The approved request led to a provisioning operation, and that operation changed the application account.

**You check the result.**

ISC provides provisioning activity information and account activity details that help you inspect the operation and any reported errors. Use them to establish what was attempted and reported, then check the relevant target-account information and the required application behavior.

For Devi, the result we want is specific: her existing account has `INVOICE_VIEW`, she can read the invoice queue, and this request did not grant `PAYMENT_RELEASE`.

If you only check that she can sign in, you haven't tested the requirement. She could already sign in before the request.

### Trace the decision and the change separately

Follow the decision branches through Devi's configured request. The manager decides whether the access is justified; the finance application processes the attempted change. The engineer's checks are shown separately because they are human verification.

```text
Devi requests INVOICE_VIEW in ISC
                   |
                   v
Manager reviews the business need
       | rejects                   | approves
       v                           v
No grant from                ISC initiates the change
this request                       |
                                   v
                         Connector sends the operation
                                   |
                                   v
                         Finance application processes it
                              /                  \
                    accepts /                    \ rejects
                           v                      v
                  INVOICE_VIEW added       Account unchanged
                  to existing account      in this failure case

HUMAN CHECK after either application result:
Engineer inspects activity and current target state.
Check invoice reading and whether PAYMENT_RELEASE was added.

Manager rejection is a decision about the request.
Application rejection is a failure to apply the attempted change.
```

The two rejection paths mean different things. A manager can reject the business need before a grant is attempted. An application can reject an attempted change after the manager has approved it. In the failure case shown, the application rejects the operation without changing the account; other failures can require different checks.

This flow assumes the existing account and automated fulfillment configured above. It shows selected outcomes, not every waiting state, retry, or connector execution component. A rejected request does not prove that another process could never grant the same access. Approval also does not prove that the application change succeeded.

## What can you conclude from what you see?

Suppose you are helping someone investigate the request. Keep the meaning of each piece of evidence separate:

| Observation | What it supports | What it does not establish by itself |
|---|---|---|
| The request has an approval decision | The configured reviewer approved the request | The target account was updated |
| Provisioning activity records a failure for the entitlement change | That attempt encountered the reported problem | That approval was wrong, or that no other change ever reached the account |
| ISC's collected account data shows `INVOICE_VIEW` | ISC has recorded that membership from the available data | The account's state has not changed since that observation |
| A current application check confirms the entitlement on the intended account | The entitlement is present on that account at the time checked | Every unrelated application function works, or the access is justified forever |

ISC's identity views let you examine person-level attributes and access. Those views are useful because they bring related information together, but you still need to ask which record you're looking at and how current its information is.

This is why "it's showing in ISC" needs a follow-up question: what is showing? A request, a decision, an activity result, or collected access data?

Each can be correct while answering a different question.

## What if the manager approves, but the change fails?

Change one condition in our example. The integration can read finance accounts, but the credentials used for the change lack permission to add `INVOICE_VIEW`.

Assume the application rejects the operation and leaves the account unchanged. The activity details report the rejection.

Devi still cannot read invoices. The manager's approval remains a valid business decision, but the delivery failed.

Sending the same request through approval again doesn't address the rejected operation. The useful investigation is now at the integration and application boundary: which operation was attempted, which account did it target, what did the application reject, and which team owns the integration permissions?

You should also establish the current account state before deciding what to retry. An old failed attempt is not proof that nobody corrected the account afterward.

The distinction prevents a common waste of effort: asking the business to repeat its decision when the unresolved work is technical execution.

Now consider a different connection altogether. An application supplies account information through a file import and its changes are fulfilled manually. ISC can support a process in which a task is assigned for someone to make the required change outside ISC. The assigned person still has to perform it in the application.

A manual task can be tracked in ISC, but a task marked complete and an independently checked application result are different kinds of evidence.

So an application does not have to support fully automated changes to participate in a governed process. Its fulfillment method must be understood and its unfinished work must remain visible.

## Does every access change need a request?

No. A request is one way to start a change.

An organization can configure a **role**, an access grouping associated with a business responsibility, to be assigned when an identity meets defined membership conditions. For example, an organization could define a role for a particular job population. The configured conditions and available identity data determine who qualifies.

It can also configure **lifecycle states**, which represent business stages such as active employment or departure, to drive specified access and account actions. You may hear **LCS** as informal shorthand for lifecycle state; it is not a separate ISC object or a label you need to find on a screen. The state describes the stage; the configured actions determine what ISC should do about access.

The business still supplies the access requirement. Automation applies a configured decision; it does not make an undefined requirement correct.

If someone tells you, "Every new Finance employee needs invoice access," ask whether that includes people who only handle payroll, temporary workers, or employees whose start date is still in the future. These are requirement questions before they are configuration questions.

Our request example used a manager decision for a particular need. A configured automatic assignment uses a different trigger and decision path. Don't assume every ISC process must pass through the request sequence we followed.

## Why keep checking after access has been granted?

Three months later, Devi no longer checks invoices. She now works on a different responsibility that does not require `INVOICE_VIEW`.

The original grant was appropriate. Keeping it indefinitely is a new decision, whether someone makes that decision deliberately or simply forgets the permission exists.

This is why access management must account for changes as well as joining. Ask what access the new work needs, what previous access is still justified, and what should be removed. Adding new access does not, by itself, explain the fate of old access.

An organization also needs a way to review existing access. In ISC, a **certification campaign** organizes that review work. A **certification** is an assigned review within the campaign: a reviewer examines its access items and makes the decisions supported for them. The access model affects which items can be reviewed or revoked.

For Devi's no-longer-needed invoice access, a removal decision still has to reach the application. **Remediation** is the work of carrying out the required correction. Its result needs checking; a recorded revoke decision alone doesn't establish that the permission has disappeared.

Leaving the organization makes timing even more significant. In an environment with several applications, each relevant account and access path needs an intended outcome and a way to verify it. A changed employment label is information about the employee. It isn't evidence that every application has completed its required action.

ISC helps connect these decisions and actions, but the organization must define and maintain the connections.

## What will ISC not decide for you?

Return to the invoice permission. Suppose the application owner incorrectly describes `INVOICE_VIEW` as read-only, when the application's actual configuration also permits an unwanted action.

A successful grant of that permission would not make the access design safe. The description and application behavior need to agree.

Or suppose the manager approves a request without understanding why it is needed. Recording that approval makes the decision traceable; it doesn't make the judgment sound.

The same reasoning applies to incomplete data. If an application or account population hasn't been brought into the managed scope, a report limited to that scope cannot demonstrate that the whole organization has been checked.

These limitations give you practical project questions:

- Which people and systems are included, and which are outside the current scope?
- Who owns the employment and account information, and how are errors corrected?
- Who explains each permission's business meaning and decides when it is justified?
- Which changes are supported automatically, and who carries out the manual ones?
- What will count as evidence that the required result was achieved?

Answering these questions is part of implementing ISC. A connector configuration alone cannot answer them.

## Would a ticketing system or a script be enough?

It might be enough for a specific requirement.

A ticketing process can record a request, assign work, and capture a response. A script can make a well-defined change. Neither should be dismissed merely because it isn't ISC.

The question is what the whole solution must account for. If a script adds invoice access, what tells it that Devi is the intended person, that the change is justified, and which account to update? What initiates removal later? Where would someone investigate a rejected change?

If your existing solution answers those questions reliably, it already provides parts of the required control. If it does not, adding more scripts without connecting their responsibilities can leave the same gaps.

The case for ISC is a repeatable, connected way to manage identity and access across the systems in scope. Its value should be assessed against concrete outcomes: fewer unresolved access delays, appropriate removal of old access, clear ownership, and evidence that decisions reached the applications. Those are objectives to measure, not benefits guaranteed by buying the product.

## What would you conclude in these situations?

### 1. The application works, so what is the problem?

An employee has moved out of invoice processing. Their old permission still lets them read invoices. The application is operating exactly as configured.

Is the lack of an application error enough to conclude that access is correct? What needs to be checked?

### 2. The manager approved it

For Devi's request, you have an approval decision and a provisioning activity showing that the application rejected the entitlement change. A colleague suggests asking the manager to approve it again.

Which part of the process is already established? What evidence would guide the next action?

### 3. We connected the application

An application provides a file containing accounts and permissions. Those records have been imported into ISC. No automatic change integration exists, and no manual fulfillment responsibility has been agreed.

What has this implementation achieved? What is still missing before it can reliably carry out access changes?

### 4. Every reviewed item was appropriate

A review covered accounts collected from two applications. A third application was excluded from the collection scope.

Can the review establish that everyone's access across all three applications is appropriate? Explain your answer without assuming there is a problem in the excluded application.

## Compare your reasoning

**1. Correct application behavior is not proof of appropriate access.** The application is enforcing an existing permission. The unresolved question is whether the employee still has a business reason to hold it. Check the current responsibilities and access requirements with the accountable owner. If removal is required, identify the mechanism and verify the result. Removing access solely because a department name changed would also be an unsupported shortcut if the employee still had an approved need.

**2. Approval is established; successful delivery is not.** The supplied evidence points to a rejected operation, not a missing business decision. Inspect the activity's operation, account, and error details, together with the relevant integration permissions and current target-account state. Another approval does not correct those conditions. The exact repair depends on the rejection evidence; the facts given do not justify inventing one.

**3. The implementation has collected access information, but its change process is incomplete.** Imported records provide visibility into what the file contains, subject to its scope and freshness. They do not supply a way to modify the application. The organization needs an agreed supported fulfillment method, responsible people, and a way to verify changes. Manual fulfillment can be a valid design. Unassigned manual work is not a completed design.

**4. The conclusion must stay within the review's scope and available evidence.** The review can support conclusions about the included items at the relevant time. It cannot establish the appropriateness of excluded access. The third application might be correctly managed through another process, or it might have unresolved issues. You need its evidence before reaching either conclusion. An exclusion is a visibility boundary, not proof of misuse.

## Explain the need using a different application

Imagine a customer-support application. A support employee can view customer cases. A separate permission allows exporting customer records, and only a defined team should have it. Accounts and permissions exist, but approvals are in email and nobody routinely checks access after people change teams.

An application owner asks, "We already create accounts. What would an ISC implementation add?"

Explain the problem and a proposed approach. Include what information must be connected, who decides whether export access is justified, how approved changes reach the application, and how retained access would be reviewed. Don't assume automatic provisioning is available.

A sound explanation could be:

"Account creation addresses only part of the requirement. We also need to relate the support accounts to the right employees, distinguish case viewing from export access, and identify who is allowed to approve exports. We can bring the account and permission data into ISC and configure the applicable request and review processes. The application team must confirm whether changes can be automated; otherwise, we need an owned manual process. When someone changes teams, we need to reassess export access and verify any required removal. The evidence must show both the decision and what happened to the account."

Another implementation could use configured automatic assignment for a well-defined population instead of individual requests. That choice still needs reliable membership information, agreed access requirements, and verified outcomes. A different mechanism can be valid; an unexplained assumption cannot replace the decision.
