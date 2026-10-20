# Signing in, using a permission, and where ISC fits

*Lesson SYS-002 · Revision 1.1*

Devi checks supplier invoices for the Finance team. She already has an account in the finance application. When she opens it, her organization's sign-in service verifies her, and the application shows her name.

She can open the home page. She cannot open the invoice queue.

Her manager says, "I've approved the access." The support team says, "Her sign-in succeeded."

Both statements can be true while the invoice queue remains unavailable.

Let's separate what each statement tells us. The sign-in result concerns the identity being used. The manager's decision concerns whether Devi should receive access. Neither statement, by itself, tells us which permission the finance application is currently using for her account.

Devi and this application are fictional. We'll use two invented permissions: `INVOICE_VIEW` for reading invoices and `PAYMENT_RELEASE` for releasing payments. Her work requires invoice reading, not payment release.

## What did the successful sign-in actually establish?

**Authentication** verifies a claimed identity. When Devi signs in, the system checks evidence associated with the identity she is claiming to use. A username identifies the claim; entering a username alone doesn't prove it.

For example, a sign-in process could verify a password and require a second factor. **Multifactor authentication**, or MFA, uses evidence from different factor categories, such as something the person knows and something they possess. Entering the same password twice doesn't provide two different factors.

Successful authentication means the evidence satisfied the applicable authentication requirements. It doesn't mean, "Give this person every permission."

Now consider **authorization**. This is the decision about whether an identified user or other actor is allowed to access a resource or perform an action.

The resource could be the invoice queue. The action could be reading an invoice or releasing a payment. A **permission** expresses an allowed action or access right.

In our example, the application checks whether Devi's account has `INVOICE_VIEW` before returning invoice data. If it doesn't, the application denies that action even though it has already accepted her sign-in.

Keep the question specific:

- Authentication: which identity has been verified?
- Authorization: may that identity perform this action on this resource?

These are different decisions, not necessarily different products or screens. A single application can perform both. A sign-in service can also apply access policies, such as whether a user may enter a particular application. Don't assume every rejection during sign-in means the password was wrong.

For example, valid authentication evidence can still be followed by a denial because the user isn't assigned to the application. Investigating that result requires the policy decision, not another password reset.

## Where does ISC enter the picture?

SailPoint Identity Security Cloud, or ISC, helps an organization govern and administer access across connected systems.

**Identity governance** concerns whether access is appropriate, who is responsible for the decision, and whether it should continue. For Devi, the business question is: does her invoice-checking responsibility justify `INVOICE_VIEW`, and who can approve that access?

**Provisioning** is the process of carrying out account or access changes. Here, the required change is adding `INVOICE_VIEW` to the correct finance account. Provisioning can also involve account creation or removal of access, when the integration and configuration support those operations.

Governance establishes what should happen. Provisioning carries out the change. The application's authorization checks use the resulting access state when Devi works.

A manager can also be said to "authorize" access in the business sense. Here, when we discuss the application's authorization check, we mean its decision to allow or deny a particular operation, not the manager's earlier approval.

There is a possible gap between each of those stages. An approved change can fail to reach the application. A correctly delivered permission can still be insufficient for a different action.

An **access request** asks for an access item to be assigned to a particular recipient. In ISC, the item must be configured for requests, and the approval requirements depend on its configuration. A request isn't a sign-in attempt. It asks for access to be changed, not for the application to authenticate the requester.

For this example, `INVOICE_VIEW` is requestable, Devi's manager is the configured approver, and the request is for access to begin without a future start date. There is no additional activation step. These are example conditions, not requirements for every ISC request.

If the manager approves, ISC can proceed with the configured fulfillment path. **Fulfillment** means getting the requested change carried out, whether through a supported automated connection or assigned manual work.

If the manager rejects this request, this request must not be treated as a grant. That doesn't prove Devi has no invoice access through another assignment. You still need the account's actual state to answer that question.

## Which records are we talking about?

An **account** is a system-specific record used to represent a user or another actor. Devi has a finance account, and she also has a sign-in account with the organization's sign-in service. Those records belong to different systems, even if their usernames look alike.

An **identity** in ISC is the record that brings together information about the person and their associated accounts and access. Devi's ISC identity isn't the finance account itself.

A **source** is ISC's configured representation of a system or collection of account data. A **connector** supplies the integration used to read that system and, where supported and configured, perform changes.

**Account correlation** is the association of a collected source account with the appropriate ISC identity. This relationship helps ISC connect a finance account to Devi. It does not authenticate someone using that account.

The application receiving a provisioning change is called the **target system**. The same finance system is a source of account information when ISC reads it and a target when ISC sends it a change.

An **entitlement** represents an access right on a source, such as a group membership or application permission. A group brings accounts together so a system can apply shared access rules to its members. In this example, ISC represents `INVOICE_VIEW` as an entitlement.

Look at the relationships before following the change:

| Record or configuration | Relevant fact in this example |
|---|---|
| Devi's ISC identity | Represents Devi and is associated with her finance account |
| Finance account `fin-12002` | Already exists and currently lacks `INVOICE_VIEW` |
| Finance source and connector | Configured to read accounts and add this permission |
| `INVOICE_VIEW` entitlement | Represents the finance application's invoice-reading permission |
| Finance application's permission rule | Allows invoice reading when the account has `INVOICE_VIEW` |
| Sign-in integration | Maps the verified sign-in identifier to `fin-12002` |

There are two distinct associations here. Account correlation connects records within ISC's identity model. The sign-in integration connects a verified sign-in identity to an application account. Correct correlation in ISC doesn't prove the sign-in integration selects the same account.

That difference becomes useful when investigating a user with two accounts. You can provision the intended permission successfully and still have the user sign in to a different account.

## Follow the access change before following the sign-in

For this path, assume Devi has one relevant finance account, the request identifies her correctly, and the connector supports the requested permission change.

First, the submitted request identifies the recipient and the requested access. The manager reviews it against Devi's work and approves it.

Next, ISC's provisioning process uses the configured integration to request the change on `fin-12002`. The business approval supplies permission to proceed; it doesn't itself edit the finance account.

The finance system must accept and apply the operation. If the integration lacks permission to update accounts, or the target rejects the requested value, an approval can remain in the request history while the attempted change fails.

In the successful version of our example, the target adds `INVOICE_VIEW`. It doesn't add `PAYMENT_RELEASE`, change Devi's password, or sign her in. None of those is part of the requested operation.

The engineer then examines the reported operation result and the target account state. These checks answer different questions: what did the provisioning operation report, and what does the account now contain?

**Account aggregation** reads account data from a source into ISC. A subsequent successful collection of the relevant account and its permissions can update ISC's view of what the finance system reports. Reading the permission back is different from sending the change.

Don't turn this into a rule that another aggregation is always the next automatic step after every provisioning action. The collection mechanism, schedule, and connector behavior need to be checked. Nor does collecting account data require Devi to sign in.

For a system without an automated write path, the delivery stage can instead involve a person completing assigned work in that system. Recording the task as complete is a report about the work; the target account remains the place to verify the resulting permission.

## Now follow Devi into the application

Our finance application uses a separate **identity provider**, abbreviated **IdP**. An identity provider maintains identity information and provides authentication services that other systems can rely on. It can also apply policies controlling access to applications.

The finance application trusts this provider for sign-in. This arrangement uses **federation**: one system accepts identity information issued by another under an established trust configuration.

**Single sign-on**, or SSO, describes the experience of using an existing sign-in to enter participating applications without independently entering credentials for each one. Policies can still require another authentication step. SSO does not promise unrestricted access or an absence of future prompts.

For this example, the integration uses **Security Assertion Markup Language**, or SAML, a standard for exchanging identity and authentication information. A SAML **assertion** is a structured statement issued by the identity provider about the user and authentication. The receiving application must validate it rather than trusting arbitrary browser-supplied text.

The finance application is the **service provider** in this relationship: it receives the assertion and supplies the application service.

A **session** lets a system associate subsequent requests with a signed-in user without repeating the full sign-in exchange for every click. The provider's sign-in session and the finance application's session are separate. An existing session at the provider doesn't, by itself, prove that the application has established its own.

Here is the successful path in our configured example:

1. **Devi opens the finance application.** With no usable application session, the application directs her browser to the identity provider.
2. **The provider establishes her authenticated identity.** It checks the required evidence or uses an existing acceptable sign-in session. Its applicable access policies must also permit entry.
3. **The provider issues a sign-in response for the finance application.** The browser carries it back. The trust configuration determines which provider and signing information the application accepts.
4. **The application validates the response.** It checks that the sign-in information came from the trusted provider, hasn't been altered, is intended for this application, and is valid for use now. Information arriving through the browser is not sufficient proof by itself.
5. **The application identifies the finance account.** In this example, a configured identifier mapping selects `fin-12002`. The account already exists and is enabled.
6. **The application establishes a session.** Subsequent browser requests can now be associated with the signed-in user under the application's session rules.
7. **Devi asks to read invoices.** The application checks the permission required for that operation and, because `fin-12002` now has `INVOICE_VIEW`, returns the permitted data.

A session is not a permanent grant of every action. The application still needs to enforce authorization for protected operations.

In this example, opening a payment-release action is denied because `PAYMENT_RELEASE` is absent. Nothing has malfunctioned. Devi has the access her work requires, and the application is enforcing the distinction.

Other applications can authenticate against their own account records instead of using a separate identity provider. The location of authentication changes; the distinction between verifying identity and permitting an operation does not.

## Put the two processes beside each other

The arrows below show the order within each illustrated process. They don't show a required set of network services or a universal ISC execution pipeline.

```text
CHANGE ACCESS: one approved request in this example

ISC request for INVOICE_VIEW on Devi's finance account
    |
    v
Configured manager approval
    | rejected -> no grant from this request
    | approved
    v
ISC provisioning through the finance connector
    | failure -> investigate; approval is not delivery
    | target accepts and applies the change
    v
Finance account fin-12002 now has INVOICE_VIEW


USE ACCESS: a later visit to the finance application

Devi opens the finance application
    |
    v
Identity provider verifies identity and applies entry policies
    | denied -> no successful entry through this path
    | permitted
    v
Application validates the response and maps the user
    | invalid response or no usable account -> entry fails
    | valid response and enabled account fin-12002
    v
Application establishes a session
    |
    v
Devi requests invoice data
    |
    v
Application checks INVOICE_VIEW for that account
    | absent  -> deny invoice reading
    | present -> allow invoice reading in this example


OBSERVE ACCESS: separate collection, not a sign-in step

Finance account data -> account aggregation -> ISC account view
```

The connection between the first two processes is the account's permission state. Provisioning changes that state; the application's authorization check uses it.

ISC is not shown approving every invoice-opening click. In this architecture, the application enforces the operation using its configured access information. Don't add a live call to ISC unless the actual integration requires one.

The diagram separates a successful target change from subsequent collection into ISC. The observation arrow means data is read back, not that aggregation grants access.

The example also assumes the application reads the current account permission for the invoice operation. A different application could use permission information captured earlier in a session or a token. A **token** is a data object presented to a system as evidence for a particular security purpose. Its meaning, validation, and useful lifetime depend on the token type and integration.

That difference affects when changed permissions become effective. There is no universal "wait five minutes" answer.

## What happens behind the screen?

The **front end** is the part the user interacts with, such as the browser page, sign-in prompt, and invoice button. The **back end** is the server-side processing that handles requests, accesses records, and enforces decisions.

Suppose the finance page hides the payment-release button from Devi. That can help her understand what is available, but hiding a button isn't sufficient security. Someone could send a request without using that button.

A protected payment-release operation needs an authorization check at a trusted enforcement point, such as the application's server or a configured gateway. A gateway is a component that handles requests on their way to a service. The browser's appearance alone must not decide whether money can be released.

In our example, when Devi selects the invoice queue, the browser asks the application for invoice data. The server identifies the session, checks `INVOICE_VIEW` for the associated account, and either returns the data or denies the request.

The screen is showing the result of that processing. It is not showing an ISC approval being reevaluated.

ISC's screens also display different kinds of evidence. Request history records the access decision. Provisioning activity records describe attempted account operations and their reported outcomes. A collected account view describes data obtained from the source.

Before trusting a visible status, ask: which record is this, which account and operation does it refer to, and when was it recorded?

## Why can the permission exist while access still fails?

Let's change one condition at a time.

**The request is approved, but the target operation failed.** The business decision succeeded; delivery didn't. Examine the operation and error for the relevant source and account. Repeating approval doesn't repair the target rejection.

**The permission was added to `fin-12002`, but sign-in selects another account.** Investigate the identifier returned during sign-in and how the application maps it. Changing ISC correlation without establishing that it is wrong would address a different association.

**The identity provider accepted the user, but the application rejected the response.** Authentication at the provider doesn't establish that the receiving application accepted the trust exchange. Check the application-side failure and the configured trust relationship.

**The correct account has the permission, but an older session still uses earlier access information.** First establish how that application handles permission changes. A controlled new-session test can help distinguish stale session information from an incorrect permission mapping. It is a diagnostic test, not a universal fix.

**The application has another condition for the action.** For example, change our fictional application's rule so invoice reading requires both `INVOICE_VIEW` and membership in the invoice's business unit. The entitlement alone is now insufficient. You need the full application rule, including the business-unit value, to explain the denial.

**The user cannot even reach the application.** A network failure or unavailable service doesn't become an authorization problem merely because the user says, "I don't have access." Locate where the attempt stopped before proposing an access change.

Each variation changes the next useful check. That's why "ISC says she has access" isn't a complete diagnosis.

## What about removing access?

Suppose Devi stops checking invoices. The organization decides she should lose `INVOICE_VIEW`.

Removing that permission, disabling an account, preventing new sign-ins, and ending an existing session are different actions.

In our original example, removing `INVOICE_VIEW` causes the next invoice permission check to deny the operation. Devi can still sign in and use the application's permitted home-page features because the account itself remains enabled.

Now change the application behavior: it stores a permission snapshot when the session begins and continues using that snapshot. Changing the account record alone does not establish when that existing session stops permitting invoice access.

The application and sign-in teams must establish the supported session-expiry or revocation behavior. **Revocation** means withdrawing previously granted access or validity; the specific thing revoked could be a permission, a session, or a token.

For an urgent departure, checking only the ISC identity label or the completion of one removal operation is insufficient. The required outcome has to include the relevant target accounts, sign-in routes, and existing sessions. Direct application sign-in also matters if it is allowed independently of the identity provider.

Don't assume an ISC access-removal operation automatically ends every session in every application. Verify the integration's actual actions and the application's enforcement behavior.

## Does signing in to ISC change these distinctions?

No. ISC itself is an application people sign in to.

An organization can configure ISC to accept sign-in from an external identity provider. In that relationship, ISC is the service provider. This is separate from ISC governing accounts and access in the identity provider or in other applications.

Once someone has signed in to ISC, their permissions within ISC determine which administrative operations they may perform. ISC **user levels** are sets of permissions within the platform. Being able to enter ISC doesn't make someone an administrator.

There are therefore two different meanings to watch for when someone says, "Devi has access in SailPoint":

- She can sign in and perform permitted actions within ISC.
- ISC records or manages her access to another system.

Ask which one they mean.

ISC can also govern access associated with a supported SSO provider integration. For example, changing a governed group can affect which application that provider makes available to a user. That doesn't automatically establish the user's detailed invoice or payment permissions inside the application. The mapping between the group, application entry, and internal rights has to be understood.

## Work through the evidence

The following records are fictional, simplified evidence, not exact ISC log formats. The times show order within each case, not promised processing speeds.

### Case 1: approved, but unable to open invoices

The finance connector uses an **integration account**, an account authorized to perform its work in the target system. This is separate from Devi's account.

You receive these observations:

- At 09:00, the manager approved Devi's request for `INVOICE_VIEW`.
- At 09:02, the provisioning result reported that the finance integration account lacked permission to modify `fin-12002`.
- At 09:05, the application owner checked `fin-12002`; `INVOICE_VIEW` was absent.
- At 09:06, Devi successfully signed in, but invoice reading was denied.

What failed? Would resetting Devi's sign-in password address the supplied evidence?

**Reason it through.** The failed stage is the attempted target change. The integration account's insufficient update permissions explain why the requested change was rejected.

The target observation confirms the required permission was absent at 09:05. The subsequent sign-in succeeded, so resetting Devi's password does not address the demonstrated delivery failure.

The next step is to examine the integration's required privileges with the responsible application team, correct the authorized configuration through the organization's change process, and arrange a controlled retry where appropriate. Verify the target result afterward. Do not grant broad administrator access merely to make the error disappear.

### Case 2: delivered to one account, used through another

The finance application has two accounts associated with Devi:

- `fin-12002` has `INVOICE_VIEW`.
- `fin-archive-12002` does not.

The current application session identifies the user as `fin-archive-12002`. The ISC provisioning record identifies `fin-12002`.

Is the successful provisioning result contradicted by the user's failure?

**Reason it through.** No. The change and the attempted use concern different accounts. Investigate which account Devi should use and why the sign-in mapping selected the archive account.

The evidence doesn't justify copying permissions to both accounts or deleting either account immediately. First confirm their purposes and the intended mapping. A correction should restore the intended account selection, not conceal it with extra permissions.

### Case 3: a collected view differs from the application

At 10:00, ISC collected `INVOICE_VIEW` on `fin-12002`. At 10:20, an application administrator removed it directly. At 10:25, the application denied invoice reading. You are told no later collection or other refresh of that account has reached ISC.

Does the 10:00 ISC view prove the application made the wrong decision?

**Reason it through.** No. It describes an earlier observation. The supplied 10:20 change explains why the later application state differs.

Check the authorized reason for the direct removal and the current target record, then establish how ISC's account information will be refreshed. Do not automatically regrant the permission just to make the older view and newer state agree.

### Case 4: strong authentication, excessive access

A user passes MFA and releases a payment. The application logs show the account had `PAYMENT_RELEASE`, and the application's rule allowed the operation. The business owner then confirms that this user's work should never include payment release.

Did successful authentication make this access appropriate?

**Reason it through.** No. Authentication verified the claimed identity under the configured requirements. The application also applied its configured permission rule. The unresolved problem is why the account had an inappropriate permission.

Investigate the assignment origin, business approval or policy basis, and any direct application changes. The governance and access-administration process needs correction. Increasing the number of authentication prompts would not, by itself, remove that permission.

## Explain an unfamiliar case

A document application uses a corporate identity provider. A contractor can sign in and read documents but cannot export them.

For this fictional application, its server permits export only when an enabled account has `DOC_EXPORT`. There are no other export conditions, and the server reads current permissions for each export request.

ISC contains an approved request for `DOC_EXPORT` on account `doc-728`. The connector reports that it successfully added the permission to `doc-728`. You have no current application account record and no evidence of which account the contractor's session uses.

Explain to the application owner:

1. What each piece of evidence establishes.
2. What remains unproven.
3. Which observations you need before choosing a corrective action.

**A supported explanation would sound like this:**

"The contractor can enter the application and read documents, but that doesn't establish export permission. The ISC request records approval, and the connector reports a change to `doc-728`. We still need to confirm that this account currently has `DOC_EXPORT` and that the contractor's session uses this account. Please check both against the time of the failed export."

If the permission is absent, investigate delivery and later changes. If the session uses another account, investigate the account mapping. If both checks are confirmed and the account is enabled, the observed denial conflicts with the supplied simple export rule. Inspect the operation-specific application evidence and verify that the documented rule matches the deployed behavior.

You haven't guessed a fix. You've identified the missing facts that distinguish the possible causes.

Before closing that conversation, explain why asking ISC to approve the same request again would not resolve an account-mapping error. The approval answers whether the change is allowed. It doesn't select the account the application uses when the contractor signs in.
