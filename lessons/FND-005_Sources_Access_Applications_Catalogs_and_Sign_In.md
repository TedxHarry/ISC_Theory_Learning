# Sources, access applications, and sign-in: what does “the application” mean?

*Lesson FND-005 · Revision 1.0*

“I requested Expenses, but I still can’t submit a claim.”

Before investigating, establish what “Expenses” means in that sentence.

Was it an application name in ISC’s request catalog? Which access item was selected? Which account was changed? Has the employee reached the real expense system, or are they still being blocked during sign-in?

Those questions concern connected parts of the experience, but they do not describe the same object or the same event.

## Start with the real application and the existing accounts

Devi works in Finance. Her employee number is `25005`.

She already has a directory account, `dir-25005`, and a separate account, `exp-25005`, in the company’s expense system, ExpenseHub. She needs permission to submit her own expense claims. She does not need permission to approve other people’s claims.

An **enterprise application** is the actual business software people use. ExpenseHub is the enterprise application in this example. Its records, account restrictions, and claim-submission behavior exist outside SailPoint Identity Security Cloud, or ISC.

An **account** is a record in a particular system. The directory account and the ExpenseHub account remain different records even though they belong to Devi.

An ISC **identity** is the person-level representation that relates information and associated source accounts to the person.

A **source** is ISC’s configured representation of a system or account dataset. Our source, `Corporate-Directory`, represents the directory integration.

A **connector** supplies the integration used to read data and carry out supported changes. **Aggregation** collects source data into ISC. **Account correlation** matches and associates a source account with the appropriate ISC identity.

In this fictional example, ISC has collected Devi’s directory account and correctly associated it with her identity. The directory source supports the group-membership changes we describe.

We have not configured a separate ExpenseHub source in this example. ExpenseHub’s account already exists and has been linked to Devi through its separately configured sign-in arrangement.

That distinction will matter when we inspect what ISC can see and what the application knows.

## Why would Expenses use a directory source?

The organization’s expense integration uses directory groups to control business access.

An **entitlement** is an access item represented from a source, such as a group membership. In our directory, two group entitlements have these meanings:

| Directory entitlement | Intended meaning in this fictional design |
|---|---|
| `EXP_SUBMIT` | Permit the user to submit their own expense claims |
| `EXP_APPROVE` | Permit the user to approve other people’s expense claims |

The names and effects are example conditions, not standard SailPoint permissions.

ExpenseHub uses relevant group information received through its trusted sign-in integration to decide which operations the user may perform. Its account must also exist and satisfy the application’s requirements.

That is why our ISC change concerns a directory group even though the employee thinks of the requirement as “Expenses access.”

An **access profile** is a bundle of related entitlements from one source. We define:

- `Submit expenses`, containing `EXP_SUBMIT` from Corporate-Directory.
- `Approve expenses`, containing `EXP_APPROVE` from Corporate-Directory.

Each profile contains one entitlement here. A profile can contain a larger related bundle, but it keeps its single-source boundary.

The business names help people choose the appropriate access. Devi should request Submit expenses, not the approval package.

Delivering Submit expenses means making the supported change to her directory account under this design. It does not mean ISC must create a new ExpenseHub account, write a native ExpenseHub permission directly, or create a directory group named Submit expenses.

If a different organization uses an ExpenseHub connector to manage native accounts and permissions, its source and delivery path will differ. The application’s business name does not determine the technical integration method.

## The access application organizes the choice

An ISC **access application** is a logical access configuration used to organize access profiles for requests and to support configured password-management functions.

We create an access application named `Expenses`. Its account source is Corporate-Directory, and it groups the Submit expenses and Approve expenses access profiles.

Here, **account source** identifies the source supplying the accounts and access data for that ISC access-application configuration. It is not a statement that ExpenseHub’s software runs inside the directory.

Selecting that source links the configuration to the existing integration. It does not install another connector or create a separate ExpenseHub integration.

Notice the relationships:

```text
External business system: ExpenseHub
  Recognized by employees as Expenses

ISC access application: Expenses
  Account source: Corporate-Directory
  |
  +-- Access profile: Submit expenses
  |     Entitlement: EXP_SUBMIT
  |
  +-- Access profile: Approve expenses
        Entitlement: EXP_APPROVE

Both profiles contain directory entitlements.
The access application groups choices; it is not ExpenseHub.
```

The branches mean “groups these access profiles.” They do not show account changes being executed or a network path.

ExpenseHub is the real business application. Expenses is the ISC grouping that helps people find its access choices. Corporate-Directory is the source through which the described group data and changes are managed.

They can have different names because they do different work.

An access application can share a name with a source when that makes sense. Matching names do not make the two objects identical, and different names do not by themselves indicate a configuration error.

One source can also support more than one access application.

For example, the same directory might contain a `KB_READ` group used by a knowledge service. A separate Knowledge access application could organize a Read knowledge access profile backed by that directory group.

You now have two business-facing application groupings using one technical source. You have not created two directories.

## The catalog is what the requester can discover

An **access catalog** is the collection of access offerings people can find and select. In ISC, the Request Center presents configured offerings to users.

It is not a complete inventory of every permission held in every enterprise application.

A **requester** is the person initiating a request. A **recipient** is the identity intended to receive the access. Devi is both requester and recipient when she asks for her own expense access.

An **access request** asks for specified access for that recipient. **Requestable** means the item is available to ask for through the configured process; it does not mean approval or delivery has already happened.

Applications are one way to organize the choices. A person who finds Expenses still needs to select the relevant access profile.

Selecting Submit expenses does not mean requesting every profile grouped under Expenses. In particular, it does not imply approval authority.

ISC also supports requestable access profiles outside the application grouping, as well as applicable individual entitlements and roles. A **role** groups access for a responsibility or population and can contain access profiles and entitlements.

So the access application is not a compulsory container for every requestable item.

The same profile can be discoverable through an application grouping and through its own access-item presentation. Those routes lead to the configured access item, not two different versions of the underlying permission.

Exact presentation depends on the enabled experience and configuration. The useful engineering questions remain: what item is being offered, who is asking, who would receive it, and what would be changed?

## Why can an administrator see it when Devi cannot?

Several different configurations affect the request experience.

The access application must be enabled for the intended users and configured for the relevant request visibility. The required profiles must be associated with it, and the access items need their applicable request settings.

These controls have different purposes.

Application visibility concerns whether the grouping is presented. The associated profile supplies the actual access package. The profile’s request configuration controls how that item can be requested and reviewed.

An empty application grouping is not a useful substitute for a configured requestable profile.

Audience restrictions also matter. A **segment** groups identities using identity information and limits the request visibility of associated access items to that audience. An **identity attribute** is a named piece of information on an ISC identity, such as department.

For example, an organization could use a segment to present a Finance access item to the intended requesters. An administrator’s broader view does not establish that Devi sees the same catalog.

There is a particularly useful distinction when requesting for someone else.

SailPoint’s documented segmentation behavior concerns the requester’s visibility. A requester who can see an item can request it for another identity they are authorized to request for. You must not assume that a recipient outside that segment is automatically blocked merely because of that segment.

Segmentation therefore does not replace the recipient-related checks and approval design needed by the organization.

For example, if only Finance employees may receive Approve expenses, the review design must consider the recipient’s department. The fact that a Finance requester can see the item does not establish that a colleague they request for is eligible to approve expenses.

Nor should creating one segment be mistaken for making every other access item private. Items outside segments can remain broadly requestable under the other applicable settings.

In our main example, Devi requests for herself, the intended access is visible, and the required request configuration is in place. We are not relying on an administrator’s view as evidence of her experience.

If the item is missing, compare the actual requester, application/profile configuration, relevant audience settings, and any already-held access restrictions before making broad changes.

Do not make the entire catalog available to everyone just to resolve one report without understanding its cause.

## Follow the selected request to the directory account

Devi selects Submit expenses for her own identity.

Assume her directory account does not yet hold EXP_SUBMIT, and there is exactly one intended directory account for this operation: dir-25005.

The request identifies the recipient and the selected access item. Its applicable configuration determines the review process.

**Approval** records the required decision that the requested access may be given. It does not, by itself, modify a group or sign the employee into ExpenseHub.

Approving this ISC access request is different from approving an expense claim inside ExpenseHub. The first decides whether Devi may receive the selected access; the second is a business operation controlled by the separate EXP_APPROVE permission.

For this example, the required review completes successfully. We are not assuming that every ISC request always needs the same approver or approval sequence.

**Provisioning** carries out supported account or access changes through the configured delivery method.

Here, the intended operation adds EXP_SUBMIT to dir-25005 using the Corporate-Directory integration. The directory is the system receiving this change.

In the successful continuation, the directory accepts the operation and the intended account holds EXP_SUBMIT.

What has that established?

The directory membership has been delivered in this example. Devi has not yet performed a new ExpenseHub sign-in, and we have not yet checked claim submission there.

A rejected group-membership update would leave a different result. Finding Expenses, selecting the correct profile, and receiving approval would not override that rejection.

Use the relevant request and account-change activity, operation result, and current directory evidence to establish what happened. A later aggregation can supply a refreshed ISC observation; it is a separate observation, not a live guarantee attached to every screen.

## Signing in is another process

**Authentication** verifies a claimed identity under the required checks.

An **identity provider**, or IdP, performs the authentication used by the participating application and supplies information the application trusts under their configured relationship.

**Single sign-on**, or SSO, lets participating applications use that shared sign-in arrangement. An existing IdP sign-in can reduce repeated credential prompts when the applicable policies allow it.

That does not give the user every permission in those applications.

In our example, Devi opens ExpenseHub through the organization’s sign-in portal or the application’s address. This is separate from selecting an access application in ISC’s Request Center.

The IdP and ExpenseHub already have a working trust and account-matching arrangement. The successful trace assumes the new directory membership is available to the IdP, that the relevant current group information is supplied, and that ExpenseHub accepts the valid sign-in information.

The application matches that sign-in to Devi’s existing exp-25005 account.

**Authorization** determines whether that account may perform the requested operation. In our application’s stated design, claim submission requires the relevant EXP_SUBMIT group information, an enabled ExpenseHub account, and the application’s other requirements.

For the successful case, those requirements are met, and Devi can submit her claim.

The connected paths look like this:

```text
ACCESS REQUEST AND DIRECTORY CHANGE

Devi requests Submit expenses for her ISC identity
  Employee number 25005
              |
              | Required review completes
              | Supported configured provisioning
              v
Corporate-Directory
  Account dir-25005 receives EXP_SUBMIT


SEPARATE EXPENSEHUB SIGN-IN AND OPERATION

Devi opens ExpenseHub
              |
              | Configured IdP authenticates the user
              | Relevant current group information is supplied
              v
ExpenseHub accepts the sign-in information
  Matches existing account exp-25005
              |
              | Application checks claim-submission requirements
              v
Claim submission allowed in this successful example

Human verification crosses both paths.
Neither the catalog entry nor approval proves the final result.
```

The arrows show the chosen request/change and sign-in/operation paths. They are not one private ISC workflow.

In particular, ISC’s request approval does not call the IdP on Devi’s behalf and sign her into ExpenseHub. The sign-in happens when she uses the application under its configured authentication arrangement.

Adding an ISC access application also does not configure ExpenseHub’s SSO trust or its account matching. Those are separate configuration responsibilities.

An ISC account-correlation relationship and ExpenseHub’s mapping of a sign-in to a local account are different relationships. Correctly associating dir-25005 with Devi in ISC does not prove that ExpenseHub selected exp-25005.

## A successful sign-in can still lead to a denied operation

Suppose Devi signs in successfully, but ExpenseHub does not allow claim submission.

Do not treat “signed in” as proof of the submit permission. Authentication and operation authorization are separate checks.

First verify the intended directory account and its current membership. Then inspect the relevant sign-in and application evidence.

Did the application receive the expected group information? Did it match the intended ExpenseHub account? Is that account enabled? Does the operation have another requirement?

An application **session** is the continuing signed-in context used after authentication. The information used in an existing session may not reflect a later membership change immediately.

You must establish how this particular integration obtains and reevaluates access information. Our successful trace assumes relevant current information; it does not guarantee an instant update of every existing session.

A new password prompt is not a reliable test of entitlement delivery either. SSO can avoid a prompt, and the presence or absence of a prompt does not tell you whether EXP_SUBMIT is on the correct account.

The front end may show a request card, a sign-in page, or a disabled Submit button. The back-end work behind each is different: selecting an access item, executing a directory change, verifying a sign-in, mapping an account, and enforcing an application operation.

Use the screen to locate the symptom, then inspect evidence for the producing process.

## What does this integration leave outside ISC’s view?

Our Corporate-Directory source supplies directory accounts and group memberships.

It does not automatically supply ExpenseHub’s native accounts or every local permission inside ExpenseHub merely because an ISC access application is named Expenses.

For example, ExpenseHub might separately grant a local administrator privilege that is unrelated to EXP_SUBMIT and EXP_APPROVE.

The directory’s group list alone would not establish whether that privilege exists. A complete governance requirement for such native access would need an appropriate supported integration or another reliable collection and management arrangement.

Likewise, changing the directory membership does not, in this example, create the already-existing ExpenseHub account. If that account were missing, you would need to establish the actual account-creation mechanism instead of assuming the access-application grouping creates it.

The integration’s actual data and change boundaries determine what can be managed, not the business name printed on the request card.

## Password management and application removal need the same care

Access applications also support configured password-management functions.

A **password policy** defines the applicable requirements for acceptable passwords.

When an application name appears in a password-management experience, establish the source account and policy behind it. The name Expenses alone does not prove that ISC is managing a separate ExpenseHub-native password.

A supported source password change concerns the configured account. It is not an EXP_SUBMIT membership grant.

Now suppose the organization hides the Expenses access application.

That changes the ISC presentation. It does not establish that the existing directory membership was removed or that ExpenseHub has blocked the user.

Because profiles can be requestable independently, investigate their request configuration too before assuming hiding one grouping has eliminated every way to request its access.

Deleting an access application also is not an access-revocation operation. SailPoint documents that identities retain access profiles assigned through the deleted application.

The external ExpenseHub service and its native accounts are separate from the deleted ISC configuration.

Removing a catalog grouping, revoking a profile’s access, changing a source account, and ending an application session are different actions. Choose the action required by the business decision and verify its result.

## Use the evidence that matches the question

| Question | Evidence to inspect | What it does not establish alone |
|---|---|---|
| Why does Expenses use Corporate-Directory? | Access application’s account source, associated profiles, and their source entitlements | That ISC collects every ExpenseHub-native account or permission |
| Why can’t this requester find Submit expenses? | Actual requester context, request settings, grouping, and audience configuration | That existing target access has been removed |
| What did Devi ask for? | Recipient and selected profile on the request | That every profile under Expenses was requested or granted |
| Did the directory change succeed? | Relevant account-change activity, operation result, and current dir-25005 membership | That ExpenseHub received fresh group information or selected the correct account |
| Why is claim submission denied after sign-in? | Relevant sign-in/account-mapping evidence, membership information, account status, and application requirements | That another catalog change will fix authentication or authorization |

Several observations may be needed to answer one report. Do not substitute the most convenient screen for evidence of a different process.

## Work through these situations

**1. Expenses points at a directory.**

The Expenses access application uses Corporate-Directory, and its Submit expenses profile contains EXP_SUBMIT from that source.

A colleague calls this a mistake because the real expense software is ExpenseHub. Does the naming difference establish an error? What must the design actually establish?

**2. Only one access choice was requested.**

The Expenses grouping offers Submit expenses and Approve expenses. Devi requested Submit expenses.

Does approval of that request establish expense-approval authority? What operation should the supplied request lead to in our design?

**3. The requester and recipient differ.**

A Finance requester can see an item through a segment and is authorized to request for a colleague outside that segment.

Can you assume the recipient’s absence from that segment automatically blocks the request under the documented segmentation behavior? What control must the organization still design?

**4. Directory membership is correct, but sign-in selects another account.**

ISC correctly associates dir-25005 with Devi, and the directory membership includes EXP_SUBMIT. ExpenseHub’s sign-in mapping selects an old account instead of exp-25005.

Does repeating ISC account correlation necessarily repair the supplied cause?

**5. The application grouping was deleted.**

Expenses was deleted from ISC. Devi’s previously assigned Submit expenses profile and directory membership remain.

Is their continued presence enough to conclude deletion failed? Has target access been revoked?

## Compare your reasoning

**For the directory source:** The names alone do not establish an error. The design must show that the directory entitlement is the intended control for the business operation and that the configured change reaches the right account. It must also establish how the application receives and uses that information. A logical business-facing grouping does not require a same-named technical source, but it does not prove native application visibility either.

**For the selected choice:** No. The supplied request concerns Submit expenses, containing EXP_SUBMIT. Its approval does not grant the separate EXP_APPROVE entitlement. Follow the selected profile, recipient, intended directory account, and membership operation. Confirm the operation result rather than treating approval as delivery.

**For the other recipient:** No. The documented segment behavior uses requester visibility, and a requester can request visible items for recipients they are authorized to request for. The organization still needs appropriate recipient-related checks and review rules. Segmentation is not a substitute for that approval and eligibility design.

**For the old application account:** No. ISC’s directory-account association is already correct. The supplied fault is in the sign-in-to-ExpenseHub-account relationship. Inspect and correct that mapping through the responsible application/sign-in configuration owners, with authorization and impact review. Then verify that the intended account is selected and that the application receives the relevant access information. Do not change a correct ISC association merely to make an unrelated mapping appear consistent.

**For the deleted grouping:** Continued assigned access is consistent with the documented behavior. Deleting the access application is not revoking its previously assigned profiles or their underlying memberships. Verify the required target-access removal through the applicable supported process if removal is the actual objective. Existing application sessions require their own consideration; deletion of the catalog grouping does not establish that they ended.

## Explain an application name without losing the technical path

Choose a business application you know.

Identify the external software, the accounts it actually uses, the ISC source or sources that supply relevant data and changes, and any business-facing access application.

Explain what the requester chooses, what the recipient should receive, and which account would change. Then describe the separate sign-in and operation checks.

Change one condition: the catalog item is hidden, the requested group change fails, sign-in selects the wrong account, or the application has local access outside the connected source.

Explain which boundary you would investigate and what evidence would settle that question.
