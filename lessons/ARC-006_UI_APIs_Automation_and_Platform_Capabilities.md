# A button, an API call, or automation: what is ISC actually doing?

An administrator clicks a button in SailPoint Identity Security Cloud (ISC). A script sends a software request. A configured automation reacts to an event.

Each can begin useful work. But the place where the work starts doesn't tell you what it does, whose authority it uses, or whether an external account has changed.

Start with the operation behind the action. Are we reading information, saving configuration, submitting a request, or carrying out a change?

## The screen is one way into the platform

The **user interface**, or UI, is the set of pages and controls a person uses to interact with ISC.

The **frontend** is the part presented to the user, such as a browser page. The **backend** is the hosted service processing the relevant requests, configuration, and operations. These names describe responsibilities; they don't reveal ISC's private internal architecture.

An **API**, or application programming interface, is an interface software uses to request data or actions. An **API client** is the software making those calls. It can be a script, an integration application, or a tool used by an engineer.

A browser action can communicate with ISC's hosted services. A supported public API gives an authorized client a documented way to invoke a platform capability.

A **platform capability** is an operation ISC supports, such as retrieving an identity record, updating supported configuration, or submitting an access request.

These aren't two separate ISC systems. They are ways of interacting with the platform, under the applicable operation and permission rules.

But don't assume that every button maps to an identical public API. A page can combine information and perform more than one interaction. Public APIs have their own documented inputs, permissions, versions, and results.

A **public API** is intended for supported external use. Public doesn't mean unauthenticated or available to everyone.

## First separate the kinds of work

A control labeled Save and one labeled Request don't have the same purpose.

Suppose you're looking at an **access profile**, a bundle of entitlements from one source. An **entitlement** is an assignable access right. A **source** is ISC's configured representation of a connection and its account data. A **connector** is integration software that communicates with the managed system.

An **access request** asks for particular access for a recipient. **Aggregation** collects account or entitlement information into ISC. These are different operations from reading or changing the profile's configuration.

Consider these operations:

| Operation | What it asks ISC to do | What it doesn't establish |
|---|---|---|
| Read an access profile | Return its represented configuration | That anyone received its access |
| Change only its description | Save descriptive information on that object | That a target permission was added |
| Enable it for requests | Make it available under applicable request configuration | That an access request was submitted or approved |
| Submit an access request | Start the applicable request processing for a recipient | That downstream delivery has completed |
| Start an account aggregation | Collect account data through the configured source | That an external permission was granted |

The distinction follows the selected capability, not whether the user clicked a button or a client sent an API call.

A successful configuration update can be complete in its own scope while no external account changes. That isn't a failed account change; no account change was requested by that description-only update.

## Give one request a clear recipient and destination

Devi works in data-quality operations, employee number `36006`. She needs to read quality reports in a fictional application called ReportHub.

She already has account `report-36006`. ISC has an **identity**, its representation of Devi, and a source account record representing that external account.

The account is correctly associated with her identity. This association is **account correlation**. It establishes the represented owner; it doesn't grant the account a permission.

ReportHub Production is the source. Read quality reports is an access profile containing only entitlement `report.read` from that source. Under the fictional application's rules, it permits reading reports, not editing them.

Assume that the profile is requestable for Devi, the applicable request checks allow her to submit it, and her existing account is the intended eligible account. The configured review requires approval. The source supports automatic delivery of the approved assignment without account creation or a custom script.

The relevant objects have different identifiers. We'll use `I-36` for Devi's ISC identity and `AP-36` for the access profile. These are fictional stand-ins, not usable API values.

An **object ID** identifies a particular object inside ISC. The profile's ID isn't its display name, and Devi's identity ID isn't her ReportHub username.

The intended result is `report.read` on `report-36006` in the configured production application. Identifying `I-36` and `AP-36` correctly is necessary input to this example's request; it isn't that result.

## Follow the UI route, then the API route

Through the UI, Devi selects Read quality reports and submits the request for herself. The page presents choices and collects the information needed by the supported request flow.

In an alternative route, an authorized API client submits the corresponding supported access-request operation using the required object references and request information.

For this comparison, assume the API caller is acting in Devi's user context, has the necessary token permissions, and supplies the same intended recipient and access item. These are alternatives, not instructions to submit the request twice.

The conceptual relationship is:

```text
[Devi using UI]       [Authorized API client]
       |                       |
       +-----------+-----------+
                   |
                   v
[Applicable ISC request checks and processing]
                   |
                   v
[Configured approval and delivery conditions]
                   |
                   v
[Supported connector work, where required]
                   |
                   v
[ReportHub: report-36006 receives report.read]
```

The arrows show the intended relationship for a successfully delivered request, not ISC's private implementation or a guarantee that every submission reaches the final box.

The two entry routes don't promise identical forms, defaults, or internal endpoints. They invoke the relevant supported capability under their own documented requirements.

Submitting an access request through its API doesn't inherently skip the configured ISC approval process. If it is still awaiting approval, changing the submitting tool doesn't make the decision disappear.

## What does the API client actually send?

An **endpoint** is the address of an API operation. Its contract specifies how to call it and how to interpret its result.

An **API contract** is that documented agreement: supported operation, required input, permissions, response, and applicable behavior.

The client supplies the intended tenant and operation, relevant object references, and required input. A **tenant** is an organization's environment within ISC's hosted service. Selecting the wrong tenant can mean selecting different objects and configuration, even when names look familiar.

A **payload** is information carried in a request. ISC APIs use structured formats such as **JSON**, a text format for named values, objects, and lists.

For an access request, the client must distinguish who receives access from which access item is requested. A reference to `AP-36` doesn't identify the recipient, and `I-36` doesn't identify the source account's username.

The client's response is information about the API operation. It needs to be interpreted according to that contract, not reduced to “the call was green.”

An **SDK**, or software development kit, can provide library functions for calling supported APIs. A **CLI**, or command-line interface, lets someone invoke supported operations through text commands. Neither changes the caller's authority or adds a capability the platform doesn't support.

The tool can make a call easier to construct. It doesn't replace understanding the object, operation, and expected effect.

## The API caller doesn't become an administrator by using a token

**Authentication** establishes the caller's accepted identity or credential context. **Authorization** determines whether that caller can perform the operation on the relevant resource.

An **access token** is a credential presented to an API for authorized access under its rules. It isn't proof that the caller may perform every API operation.

For ISC, a **user level** establishes an applicable boundary around a user's platform permissions. These permissions concern using ISC itself, not the permissions an account holds in a managed business application.

A token's **scopes** specify permitted API access within the applicable authority. A user's broader permissions and the token's narrower permissions both matter. A valid read-only token doesn't become write-capable because its owner can perform more work through the UI.

A broad scope also doesn't turn a non-administrator into an administrator. Check the chosen operation's documented authorization requirements and the actual caller context.

A **personal access token**, or PAT, is a user-associated credential mechanism in ISC. Its client credentials can be used to obtain an access token through the supported authentication flow. Don't confuse the client secret used to obtain a token with the access token presented to a resource API.

A **client ID** identifies the registered client credential. A **client secret** is secret proof used in the applicable authentication flow. Other supported client arrangements have their own requirements. A credential acting outside a user context isn't interchangeable with the user context certain endpoints require. Select a supported credential and ownership arrangement for the operation, including unattended use.

Keep these values out of examples, screenshots, and support messages. Fictional object labels such as `I-36` aren't secrets and cannot authenticate a client.

A token that authorizes a call to ISC doesn't supply ReportHub's integration credentials. The two services enforce different authority boundaries.

## A successful submission isn't a completed assignment

The supported access-request API processes requests asynchronously. **Asynchronous** means the initiating interaction can finish before the requested processing finishes.

For the documented submission operation used here, the successful response is 202 Accepted. That means the request has been submitted and queued for processing. It isn't approval or proof of a completed target grant.

The response includes tracking information with access-request references. Preserve the relevant references and use supported status information to investigate the request rather than submitting another one because delivery isn't immediate.

For our fictional request, use `AR-36` as the request-reference stand-in. It identifies the request, not Devi, the access profile, or her external account.

If `AR-36` is waiting for the configured approval, the connector hasn't thereby failed. If later delivery reports an error, an earlier accepted submission doesn't establish that the target changed.

A **response** belongs to a particular interaction. Its success can mean “configuration saved,” “information returned,” or “request accepted,” depending on the operation. Don't turn all successful responses into the same business claim.

The endpoint's duplicate-handling behavior also matters. The access-request API doesn't promise an immediate submission error for every duplicate or overlapping request. Preserve references, inspect existing requests, and follow the documented behavior before repeating a call.

## The connector path still has work to do

**Provisioning** is the work of carrying out an account or access change.

For the successful ReportHub assignment, assume a supported **SaaS connector**, whose connector work runs in SailPoint's hosted environment without a customer-deployed Virtual Appliance cluster for that connection.

A **Virtual Appliance**, or VA, is a customer-deployed virtual machine used by VA-based integrations. Other sources can use that path; an API call to ISC doesn't convert a VA-based source to SaaS connectivity.

In the ReportHub example, the external integration actor `svc-report-isc` needs the applicable authority to assign `report.read`. It isn't Devi's own account, and it isn't the ISC API caller.

The platform can accept a request from an authorized ISC caller while the external system later refuses the connector's change. Changing from UI to API doesn't repair the external credential or target privilege.

The frontend starts or displays supported work. The backend processes that work. The connector performs its applicable integration part. The target holds and enforces the actual permission.

An API client closing after submission doesn't, by itself, cancel already submitted asynchronous work. Cancellation is a separate supported operation where available, not a consequence you should infer from closing a window or stopping a script.

## Now distinguish automation from the API it calls

**Automation** is work started or carried out by configured software instead of a person repeating each action manually.

An external scheduled script is one example. A **schedule** determines when the script runs. The script still needs valid credentials, correct references and inputs, and a supported operation.

The schedule isn't permission to request access for everyone. If the integration submits requests for other recipients, applicable on-behalf-of and caller-context rules still matter.

A script can also call ReportHub directly instead of asking ISC. That would be a different path, under ReportHub's credentials and controls. It doesn't automatically create an ISC access request, run ISC's review, or give ISC an immediate record of the change.

An ISC **Workflow** is another automation mechanism: a configured set of steps. Its **trigger** determines when the Workflow starts and supplies the initial input. It is managed within ISC rather than being a script that must keep running on an engineer's laptop.

A Workflow isn't a synonym for every internal ISC process. Account aggregation and access-request processing have their own supported behavior; don't assume they exist because someone created a custom Workflow.

Nor should you assume every Workflow action is an external public API call using the same personal token as an engineer. Inspect the selected action's supported behavior and any credentials its configured integration requires.

## A trigger starts a workflow. It doesn't define the whole result

An **event** reports that something happened. For example, an **identity attribute**, a named value on an identity such as department, can change. A **filter** narrows which events should start a Workflow through its trigger.

An **action** performs selected work, such as obtaining identity information or sending a notification. An **operator** directs the data flow or chooses a path. A comparison operator can select different actions based on input values.

An **execution** is one run of the configured Workflow. It has its own input, path, step results, and overall outcome.

Consider a separate fictional Workflow that responds to a relevant identity-attribute change. Its configured purpose is only to notify the application owner when a review is needed. It doesn't submit or grant access. Assume it is enabled and the relevant event is available to its trigger.

The design is:

```text
[Relevant identity-change event]
                |
                v
[Trigger filter matches?]
     | no                  | yes
     v                     v
[No execution]       [Workflow input]
                           |
                           v
                    [Review needed?]
                     | no       | yes
                     v          v
                   [End]   [Send notification]
                                |
                                v
                              [End]
```

The first comparison controls whether the event starts this Workflow. The second is a configured choice inside an execution.

An event that doesn't match this trigger filter isn't a failed execution of this Workflow. An execution taking the no-notification path hasn't secretly granted access.

The arrows describe this example's configured event and choice logic. They don't claim that every identity change starts every Workflow or that every automation must use these steps.

The input is information the steps use, not an instruction to invent a recipient. Each action needs the appropriate values from its configured input or earlier step outputs.

If a Workflow is intended to request access, it needs the applicable supported action and configuration. Naming a Workflow “Grant report access” doesn't add such an action to a notification-only definition.

## Saving the definition isn't running it

A Workflow definition describes its trigger, steps, conditions, and inputs. Saving the definition establishes configuration.

Whether it runs depends on its enabled state, the applicable trigger and filter, and the relevant runtime conditions. Saving isn't proof that a real event matched or that an action completed.

Likewise, testing with supplied sample input isn't evidence that the real event path is correctly configured. A sample run can validate particular behavior while leaving the actual trigger or input assumptions unproven.

Workflow execution history can show the path taken and the inputs, outputs, and configuration relevant to a run. Inspect those details when an expected action didn't happen.

A successful Workflow execution establishes success under that Workflow's definition and step behavior. If its only business action sends a notification, the execution isn't evidence of an access assignment.

If an action submits asynchronous work, also distinguish the action's successful submission from the later outcome of that work. Follow the selected action's documented semantics.

Workflow permissions, available actions, and product requirements still apply. Automation isn't a way to add an unavailable service or an unsupported connector operation.

## When the UI and API seem to disagree

First confirm that you're comparing the same question.

**Pagination** divides a result set into pages. A first API page isn't automatically the complete population. A UI can also apply a filter that the client didn't send, or the client can filter out records the UI displays.

| Check | Why the comparison can differ |
|---|---|
| Tenant and object references | Similar names can identify different objects or environments |
| Caller and permissions | A browser user and a token's caller/scopes can have different authority |
| Selected operation | Saving a profile isn't submitting a request for it |
| Filters and pagination | A page or API response can contain only part of the intended set |
| Observation time and record type | A request record, execution result, and collected account view answer different questions |

Don't diagnose a data-loss defect until the compared tenant, object, operation, caller context, filters, and timing are established.

An ISC account page displays represented account information. It isn't a continuous view inside ReportHub. A current request record and an older collected account view can therefore describe different stages without contradicting each other.

A **status query** asks for the state of a particular tracked object or operation. It's different from a command that submits new work.

Changing a page filter or refreshing an existing view isn't, by itself, a supported command to repeat target provisioning.

## Use the documented API rather than copying a browser interaction

A browser's internal calls aren't automatically a supported integration contract. Don't build a production integration around an undocumented call merely because it appeared while clicking a page.

Choose a documented operation and its applicable version. API versions can change contracts, authorization requirements, fields, or behavior. Experimental interfaces carry different stability conditions from public production interfaces.

Check the current documentation for the selected service rather than assuming an old version name or an example copied months ago remains the recommended contract.

No tool choice removes the need to understand input validation, object identity, permissions, or consequences. Repeating a write automatically can repeat effects if the operation doesn't provide the assumed duplicate protection.

For unattended work, define credential ownership and supported rotation, the intended tenant, scope, input validation, useful tracking, and the procedure for failures. Don't borrow an unrestricted administrator credential to avoid making those decisions.

## Work through these cases

Treat each case as a separate variation.

### 1. The UI works, but the token can only read

An administrator can update a supported configuration object through the UI. A client using that administrator's valid token is limited to the relevant read scope. The API rejects the update because the required scope is absent.

Does this establish that the API lacks the capability?

**Worked reasoning:** No. The supplied failure identifies a token-permission boundary. The broader UI authority doesn't remove the token's restriction. Confirm the documented operation and validate only the additional permission justified by the integration's approved purpose. Don't jump to an unrestricted token or an undocumented endpoint.

### 2. The profile description changed

A supported update changes only the description of `AP-36`. The response confirms the saved object. No access request or account-changing operation is submitted.

Should Devi's ReportHub permission change?

**Worked reasoning:** No. The operation saved descriptive configuration. It didn't request or provision `report.read` to `report-36006`. Read the response as success for that update, not as a failed access grant. An actual assignment requires the applicable supported access-changing flow.

### 3. The client exits after acceptance

The request API accepts the fictional `AR-36` submission. The client process exits. Later status information shows that the request is awaiting the required approval.

Should the integration submit again or conclude that exiting canceled it?

**Worked reasoning:** Neither conclusion follows. The supplied status establishes that submitted work remains tracked and is waiting for a configured decision. Use the request reference and supported status/approval evidence. Don't create a duplicate because the caller stopped or because delivery isn't immediate.

### 4. The Workflow succeeded, but no notification was needed

The notification-only Workflow starts. Execution evidence shows the review-needed comparison is false and the execution reaches its configured successful end without the notification action.

Someone reports that “the access-grant workflow completed, so Devi must have report access.”

What does the execution establish?

**Worked reasoning:** It establishes the supplied no-notification path under that definition. A misleading name doesn't add a request or grant action. Inspect the configured steps and execution evidence. To establish report access, examine an actual assignment/delivery record and the intended target state, not this Workflow's name or overall success alone.

### 5. The list contains fewer objects

A client retrieves the first page of a supported list operation. The returned pagination information shows more results exist. The UI displays a broader list under the same authorized user and tenant.

Can the first response establish that the API is missing objects?

**Worked reasoning:** No. The supplied pagination information establishes an incomplete client view. Follow the documented collection behavior and compare equivalent filters and object types. Successful retrieval of one page isn't proof that all matching records were retrieved or that undisplayed objects were deleted.

## Test the design on a different application

A team wants an external scheduler to automate request submission for a fictional training application.

The proposal says: “A successful run means we obtained a token and sent the request. We won't store request references or check status. If the learner can't use the application immediately, the next run will submit the same access again.”

What needs to change in that design?

**Worked reasoning:** Token acquisition establishes authentication material, not that a request was valid or accepted. The submission result must be interpreted according to the supported endpoint, and the request needs the correct recipient, item, tenant, caller authority, and applicable request conditions.

Preserve tracking references and distinguish submission, configured decisions, delivery, and target verification. Decide how later runs identify existing or unresolved work using documented behavior instead of blindly repeating writes.

Also define credentials and ownership appropriate for unattended use, scoped permissions, input validation, and failure handling. An automated caller still has to use supported operations and respect their authorization requirements.

You could explain the design this way: “The UI, API client, and automation are ways to begin or inspect work. The selected ISC capability defines what is requested. Its processing and connector path determine what happens next, and the relevant evidence tells us what actually completed.”
