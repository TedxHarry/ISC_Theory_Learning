# Signing into ISC and changing a password: which system is doing the work?

Devi works in support operations, employee number `37007`. She can open SailPoint Identity Security Cloud (ISC) through her company's sign-in service, but she has forgotten the password for a separate application called CaseDesk.

Someone suggests resetting her ISC password.

Before you do that, ask a more useful question: which system checks the password she has forgotten?

In this fictional setup, the company's sign-in service authenticates Devi into ISC. CaseDesk has its own account and password. Resetting the wrong credential won't restore her CaseDesk sign-in.

The same distinction helps when the problem runs in the other direction: an application works, but ISC doesn't open. Follow the configured authentication path rather than treating every account associated with a person as one shared login.

## Start with the person, then separate her accounts

An **identity** is ISC's representation of a person, connecting their relevant information, accounts, and access. An **account** belongs to a particular system. ISC's account record represents that external account; it isn't the external system itself.

A **source** is ISC's configured representation of a system or collection of account data. A **connector** provides the integration for reading data and performing supported operations.

Devi's accounts have different jobs:

| System or record | Relevant value | What it does here |
|---|---|---|
| Workforce HR | Account `hr-37007` | Supplies employee information used to establish her ISC identity |
| Corporate Directory | Account `corp-37007` | Holds her company directory account |
| AccessGate, a fictional identity provider | User `devi37007` | Authenticates her on the configured company sign-in route |
| ISC identity | Username `devi37007`; email `devi37007@corp.example` | Represents her within ISC |
| CaseDesk | Account `cases-37007` | Uses its own password in this example |

These aren't usable accounts or credentials. The labels establish which record we're discussing.

Assume the external accounts already exist and are correctly associated with Devi's ISC identity. **Account correlation** establishes that account-to-identity association. It doesn't make the accounts share a password.

**Aggregation** collects account information into ISC. A collected account record can help establish the account and its association. It doesn't make the user's password visible on the identity page.

Devi's employee number helps identify the person in this example. It isn't automatically her username in every system.

## Who checks the proof, and who decides what she may do?

**Authentication** establishes an accepted identity or sign-in context using the required proof. **Authorization** determines what that authenticated user may do.

A password is one form of proof, or **credential**. A sign-in process can also require another form of verification.

After authentication, a **session** lets a browser continue interacting with a service as the signed-in user under that service's rules. It avoids asking for the complete sign-in proof on every page interaction.

A successful ISC sign-in doesn't make Devi an ISC administrator. A **user level** sets an applicable boundary around her platform permissions. Those permissions concern using ISC itself, not every permission held by her business-application accounts.

Likewise, signing into CaseDesk doesn't establish that she may edit every case. Authentication and the application's permission checks answer different questions.

When someone says “Devi has access,” ask what they observed. Did she authenticate, open an allowed page, receive an assigned permission, or complete a particular business action? Those observations aren't interchangeable.

## ISC has more than one sign-in arrangement

A **tenant** is an organization's environment within ISC's hosted service. Its sign-in configuration determines which supported authentication arrangement applies.

An **identity profile** is configuration associated with identities from an authoritative source. Among its responsibilities are settings for their sign-in and recovery behavior.

An **authoritative source** supplies the accounts from which ISC establishes identities. Here that is Workforce HR. An **authentication source** is the configured source used to check a user's credentials for directory-based sign-in. The same source can have both roles, but the roles don't have to belong to the same system.

Our example can therefore use HR to establish who Devi is while a different service authenticates her.

Compare the arrangements:

| Arrangement | Where the relevant sign-in proof is checked | What ISC relies on |
|---|---|---|
| Site username and password | ISC's supported site sign-in process | Registered site credentials and applicable verification |
| Directory Connection, also called pass-through authentication | The configured supported authentication source through its integration | The result of checking the associated source account |
| External single sign-on | The configured identity provider | An accepted authentication response and identity mapping |

These are alternatives with their own requirements, not three steps every sign-in must perform.

**Single sign-on**, or SSO, lets participating services use an established authentication arrangement rather than each independently asking the user for a separate password.

An **identity provider**, or IdP, authenticates the user and supplies the authentication result to a service that trusts it. In our main setup, AccessGate is the IdP and ISC is the service being accessed.

Configuring Directory Connection on an identity profile doesn't mean a normal SSO sign-in uses both paths. When configured, SSO takes precedence over Directory Connection for that normal route. A supported direct sign-in route has separate conditions.

## Follow Devi's browser through the SSO route

Assume the tenant's SSO trust is correctly configured, Devi is allowed to use the integration, and her existing ISC identity can be matched using the configured mapping. No automatic creation of a missing identity is enabled in this example.

**Federation** is the trust arrangement that lets one service accept authentication performed by another. ISC is the **service provider**, or SP, in this sign-in relationship: it accepts the supported authentication result to provide its service.

The documented ISC integration uses **SAML**, Security Assertion Markup Language, to exchange that result. A SAML **assertion** is a structured statement about the authenticated user and the applicable authentication context. It isn't the user's password.

Let's follow the successful path.

Devi opens the organization's ISC sign-in address. The configured route sends her browser to AccessGate. AccessGate performs the authentication required by its policy, or uses an applicable existing IdP session.

The authentication response returns through the browser to ISC. ISC must accept the response under the configured trust and associate its identity information with the appropriate ISC user. Only then can this route establish the intended ISC sign-in.

The relationship is:

```text
[Devi opens ISC in her browser]
                |
                v
[AccessGate authenticates Devi]
                |
     SAML response via browser
                |
                v
[ISC checks trust and identity mapping]
                |
       accepted for this user
                |
                v
[Devi uses ISC in an ISC session]
```

The arrows show the successful logical exchange, not every network interaction or ISC's private validation sequence. A failure at authentication, response acceptance, or user matching prevents the successful outcome shown.

ISC doesn't need Devi's AccessGate password to accept the federated result. Signing in this way doesn't copy that password to CaseDesk.

The **frontend** is the page and browser interaction Devi sees. ISC's **backend**, the hosted processing behind those pages, handles its part of the supported authentication flow. The IdP performs its own authentication work.

Seeing the AccessGate page proves that the browser reached that page. It doesn't, by itself, prove that ISC accepted a response or created a session.

## Trust and identity matching are different checks

The configuration needs to establish which IdP ISC trusts and how the authenticated user maps to an ISC identity.

An **entity ID** identifies a participant in the SAML arrangement. A login address identifies where the browser should send the relevant interaction. The service-provider information also identifies the intended receiving service.

A **signing certificate** provides the public-key information used to verify the expected signing identity. The corresponding private signing key belongs with its authorized owner. A certificate change needs coordinated trust configuration; copying a user's password doesn't repair a signing-trust failure.

If a response is rejected for a signing-trust problem, inspect the configured IdP, certificate and reported validation error. Compare the intended tenant and service as well. Don't disable verification to make an untrusted response acceptable.

A validly signed response also needs the correct identity information. An **identity attribute** is a named value on the identity, such as email. The **identity mapping attribute** is the ISC identity value selected for matching the authenticated user.

Suppose this example maps the SAML user identifier to Devi's ISC email. Her identity contains `devi37007@corp.example`. The IdP must send the corresponding value expected by that configuration.

If it instead sends `devi37007@old.example`, a successful IdP authentication doesn't establish a successful ISC match. Check the selected mapping and actual values; don't conclude that Devi entered a bad password.

This sign-in matching isn't account correlation. Correlation connects a source account record to an ISC identity. SSO mapping connects the authenticated sign-in information to the intended ISC user. Both involve identity relationships, but they occur for different purposes.

A missing ISC user isn't automatically created just because the IdP authenticated someone. **Just-in-time account creation**, or JIT creation, is a separately configured option for establishing an ISC account and identity through the documented arrangement at sign-in. It isn't enabled by the word SSO, and it doesn't create every business-application account.

## Directory Connection checks a different path

Now consider an alternative setup in which Devi signs into ISC through Directory Connection rather than the normal external SSO route.

**Pass-through authentication**, or PTA, lets ISC use a supported configured source to check the user's source-account credentials. Devi supplies the password associated with `corp-37007`, not the separate CaseDesk password.

Assume Corporate Directory is a supported authentication source, its accounts have been aggregated, the relevant account is correctly associated, and the identity profile selects it for authentication. For clarity, Devi has one account on this authentication source in this example.

The logical relationship is:

```text
[Devi supplies directory credentials to ISC]
                    |
                    v
[Configured source integration checks them]
                    |
                    v
[Corporate Directory returns a result]
                    |
        accepted plus other required checks
                    |
                    v
[Devi uses ISC in an ISC session]
```

The arrows represent a configured credential check and its outcome, not raw password inspection or a universal connector protocol. The actual integration dependencies depend on the supported source and its connection configuration.

A **Virtual Appliance**, or VA, is a customer-deployed virtual machine used for applicable integrations. A VA-based authentication path needs that integration path to work. Don't insert a VA into every sign-in diagram: the external SSO exchange above and every supported source don't all share one runtime.

If the configured source cannot be reached, the attempt can fail even though Devi knows the correct password. That's a service or integration dependency, not proof of an incorrect credential.

Conversely, a healthy connection doesn't prove the user's supplied password is correct or the account is permitted to authenticate. Inspect the reported result and account state rather than diagnosing every failure as connectivity.

**Provisioning** carries out account or access changes. Multiple accounts add account-selection behavior: the account selected for an account change isn't automatically the account used for PTA. The selected authentication mechanism's documented behavior governs that choice.

Changing a production authentication source can disrupt sign-in. Treat it as an approved, tested authentication change with support guidance, not a quick way to investigate an unrelated application-password ticket.

## A second factor belongs to a particular verification process

**Multifactor authentication**, or MFA, requires proof from more than one factor category, such as knowledge of a password plus possession of a registered authenticator.

The IdP's authentication policy and ISC's own supported sign-in verification settings are separate configurations. A successful IdP challenge doesn't mean every ISC verification or recovery setting has been configured correctly.

A **TOTP**, time-based one-time password, is a short-lived code generated by an authenticator using registered secret material and time. Registering a device establishes the material needed for that verification; it doesn't change a managed application's password.

ISC has documented requirements for authenticator registration and direct sign-in for elevated users. Don't assume an IdP sign-in always prompts for the same additional ISC code, or that using SSO removes every ISC authenticator-registration responsibility.

Password reset verification is another context. A **password policy** defines applicable password requirements and verification conditions. The identity profile can offer recovery methods, while the applicable policy settings determine when additional authentication is required for password changes.

An IdP MFA reset, an ISC MFA reset, and a CaseDesk password reset target different things. Use the supported operation at the system that owns the affected verification.

If a user loses an authenticator, determine which challenge they cannot complete. Repeated password changes won't restore access to a missing registered device. Nor should you disable MFA as a substitute for the approved recovery procedure.

## Return to the CaseDesk password Devi actually forgot

**Password Management** lets users change passwords for supported, configured sources through ISC. **Password Manager** is the user-facing view of the applications or password groups available under that configuration.

It doesn't reveal users' existing password values. It also isn't evidence that every application account associated with Devi is password-manageable.

A **flat-file source** receives imported account records rather than providing a live connection for password changes. Flat-file sources aren't compatible with Password Management. Successfully importing CaseDesk accounts wouldn't, by itself, provide the operation needed to reset their passwords.

An **access application** is ISC configuration that groups relevant source access and can expose supported password-management functions. It isn't the external application or a new authentication trust.

For CaseDesk, assume:

- Its supported **direct connection**, a configured integration rather than just an imported account file, can perform the required password operation.
- Password Management, an appropriate password policy, and the relevant access application are configured and available to Devi.
- `cases-37007` is the intended eligible existing account.
- CaseDesk uses its own password, isn't configured to share or synchronize it with other sources, and isn't authenticating Devi through AccessGate.
- The configured recovery verification can be completed.

The configured policy applies to the selected password operation. CaseDesk can also enforce its own restrictions. A value accepted by one set of checks isn't permission to ignore the other system's requirements.

Devi chooses the CaseDesk password operation and completes its required verification. ISC processes the supported operation for the intended source account. The connector uses its configured integration path and authority to request the external password change.

In this example, `svc-case-isc` is the external integration actor. It needs authority for the requested operation. It isn't the recipient `cases-37007`, Devi's IdP account, or an ISC administrator.

The target must accept and apply the change. A reachable application or successful account read doesn't prove that the connector can change passwords.

```text
[Devi selects CaseDesk password change]
                  |
                  v
[Required verification and policy checks]
                  |
                  v
[Supported connector password operation]
                  |
                  v
[CaseDesk validates and applies the change]
                  |
                  v
[Inspect result for cases-37007]
```

The arrows trace this successful example. They don't prescribe every internal validation order or guarantee delivery. Target-side checks still apply, and a failed stage requires examining its own evidence. The final box is your inspection of the result, not a promise that ISC automatically performs a fresh CaseDesk login.

The result concerns `cases-37007`. Under the supplied setup, it doesn't change Devi's AccessGate password, her directory password, her ISC user level, or any CaseDesk permission.

A password change restores a usable credential when the relevant operation succeeds. It isn't an access request, which asks for particular access for a recipient. It doesn't create a missing account or assign a missing entitlement, an assignable access right.

## Which passwords are actually connected?

There are different reasons applications can appear together in Password Manager.

Two access applications can refer to one account source and therefore operate on the same underlying source password. Two tiles don't necessarily represent two independent password stores.

A **password sync group** is different: it groups supported direct-connect sources so a configured password change can be propagated across them. That connects password operations across sources; it isn't SSO.

Creating a sync group doesn't establish SAML trust. Configuring SSO doesn't create a sync group. Matching usernames don't establish either relationship.

A sync group's policy needs to be compatible with the participating targets. Source support, account context, verification and delivery dependencies remain relevant.

Also distinguish where the change begins. A change submitted through the configured ISC password-management path isn't evidence that a password changed directly on an external website will automatically propagate back through ISC. Any separate synchronization mechanism needs its own supported design.

In a PTA arrangement, changing the authentication-source password through supported Password Management affects the credential used for directory-based ISC sign-in. It doesn't mean a separate ISC password and a separate directory password were necessarily updated as two independent stores.

For a sync group using the documented PTA path, failure to change the authentication-source password prevents attempts on the other sources. Without PTA, the documented behavior can include partial outcomes: one source changes while another fails. Don't generalize one path's ordering to all password groups.

Password-history checking can also depend on an authentication source that supports it. Don't infer that aggregation gives ISC a readable history of everyone's passwords.

## A reset request, a completed change, and a fresh login prove different things

An administrator sending a password-reset email starts a recovery interaction. It doesn't establish that the user followed the instructions, passed verification, or completed the intended password change.

The supported reset behavior can interact with PTA and sync groups. Establish the configured scope before telling a user which credential will change.

Likewise, a user successfully completing recovery verification establishes that verification stage, not every downstream source result.

For an unexpected password outcome, preserve the operation's time, intended source/account, reported result and useful error detail. Relevant audit events can identify failed source updates. Don't put passwords, recovery codes, private keys, or complete sensitive authentication messages in support notes.

A collected account page shows represented information from the integration. It doesn't display the current password or independently prove that a later password operation succeeded.

A controlled fresh authentication test can help establish whether the intended system accepts the new credential, using the organization's approved procedure. An already-open application page is weaker evidence because it can be using an existing session.

Don't repeatedly guess passwords to test a theory. A **lockout** restricts further authentication after applicable failure conditions. ISC and an external authentication system can have their own lockout rules; repeated attempts can make the incident harder to resolve.

Password reset, unlock, reenable and MFA reset are separate operations. An account **disabled** by administration is not merely locked by failed attempts. The documented reset feature isn't available for disabled accounts; don't treat a reset as a route around that restriction. Any reenablement needs its own approved reason and procedure.

## Ending one session doesn't necessarily end the others

The IdP, ISC, and CaseDesk can each have their own sessions. A browser returning to ISC may still have a valid ISC session or may be authenticated again through a valid IdP session.

Neither observation proves that the user entered a password again.

ISC session settings govern its supported maximum and idle-session behavior. Browser handling can also affect whether a session is retained. Don't treat closing a window as reliable proof that every authentication context was terminated.

ISC doesn't support **SAML Single Logout**, the SAML mechanism for coordinating sign-out across participating services. A configured logout redirect isn't a guarantee that signing out of ISC terminates every session at the IdP and every business application.

Similarly, don't assume a password change immediately revokes every existing session, credential or integration token. Verify the affected system's supported session and revocation behavior.

This matters during suspected compromise. Password recovery alone isn't evidence that the security incident is contained. The responsible security team needs the relevant session, credential and access controls, not an assumption that all accounts share one logout.

An approved **emergency-access** arrangement provides a controlled route for authorized elevated users when normal IdP access is unavailable. ISC documents a direct sign-in option for such users, subject to its authentication requirements. It isn't a universal bypass for every employee or a replacement for keeping the normal trust healthy.

## Work through the evidence

Treat these as separate variations. All recorded outcomes below are fictional.

### 1. The IdP accepts Devi, but ISC cannot match her

AccessGate records successful authentication. The configured mapping uses ISC email, which is `devi37007@corp.example`. The response supplies `devi37007@old.example`, and ISC reports a user-matching failure. JIT creation is off.

Should the team reset Devi's password first?

**Worked reasoning:** The supplied evidence identifies mismatched mapping values after successful IdP authentication. Inspect the intended identity and the approved IdP/ISC mapping, then correct the responsible data or configuration. Don't create a duplicate identity or reset a credential to conceal the mismatch. IdP authentication alone didn't establish an ISC session.

### 2. A directory sign-in fails during a connection outage

In the alternative PTA setup, the integration reports that Corporate Directory cannot be reached. There is no result establishing whether the supplied user password was accepted or rejected.

Does this prove that `corp-37007` has the wrong password?

**Worked reasoning:** No. The available evidence establishes a connection dependency, not a completed credential decision. Investigate the configured authentication path and source availability. Don't reset the password or switch the production authentication source simply because the check couldn't complete.

### 3. ISC opens, but the Admin menu is unavailable

Devi authenticates successfully and opens her ISC account. Her assigned user level doesn't allow administration. Someone proposes repairing the SAML signing certificate.

Which boundary should you examine?

**Worked reasoning:** The supplied facts establish a signed-in user with limited platform authority. Check the intended user level and authorization, not the certificate as the cause of the missing administration capability. Granting a broader level still needs approved justification; a successful login isn't a reason to make someone an administrator.

### 4. The CaseDesk password changes, but an unrelated password doesn't

The supported operation reports a successful change for `cases-37007`, confirmed by an approved fresh CaseDesk sign-in. CaseDesk is standalone in Password Manager, outside every sync group, and uses its own authentication.

Should Devi expect her AccessGate password to change?

**Worked reasoning:** No. The configured scope and target evidence concern CaseDesk. No supplied sync relationship or shared password store connects it to AccessGate. Correct account correlation doesn't create that relationship.

### 5. A password group has mixed results

A separate non-PTA sync group contains two supported sources. Audit evidence shows the first accepted its password update while the second rejected it because of a target policy restriction.

Can the team say that nothing changed, or that both now share the new password?

**Worked reasoning:** Neither. The supplied per-source results establish a partial outcome. Reconcile which account changed, inspect the policy mismatch, and use supported recovery. Don't assume rollback, repeatedly submit blind changes, or report group-wide success from the first result.

### 6. Recovery verification succeeds, but the source change is denied

Devi completes the required recovery verification. The external integration actor then receives a permission-denied result for the CaseDesk password operation. No target change is confirmed.

Should the team reset her authenticator registration?

**Worked reasoning:** The supplied verification stage succeeded. The failure concerns the integration actor's target authority. Inspect that actor and the required supported password-operation privilege, then recover and verify the intended change. Resetting the user's authenticator doesn't grant the connector target authority.

### 7. An application stays open after a password reset

A password change is confirmed, but a browser tab that was already signed into the application still works. No fresh authentication has been attempted, and no session-revocation result is supplied.

Does the open tab prove that the password change failed?

**Worked reasoning:** No. The tab can be using an existing session. Separate the confirmed password result from the unanswered session question. Use approved fresh-authentication and session-management checks; don't infer either failed reset or complete incident containment from the old tab.

## Explain a new setup before approving it

A team proposes a new purchasing application: “People already sign into ISC through the company IdP. Once we aggregate purchasing accounts, ISC should know their passwords, let everyone reset them, and sign them straight into purchasing.”

What would you ask the team to establish?

**Worked reasoning:** Aggregation supplies represented account data, not readable user passwords. ISC federation establishes the sign-in relationship between the configured IdP and ISC, not a trust for every new application.

Identify the purchasing application's actual authentication arrangement and account owner relationship. Establish whether supported Password Management is in scope, which source and account would be changed, the required verification and compatible policies, and the connector's operation capability and authority.

If purchasing should use SSO, its own supported IdP integration and permitted-user configuration need to be established. Its business permissions still need the appropriate access design. If shared password changes are intended instead, identify an actual shared account source or supported sync-group arrangement rather than inferring one from matching usernames.

You can explain the distinction simply: “First identify the service we're entering and the system checking our proof. Then identify the account a password operation would change. Authentication, account data, password delivery and permission are connected only through the relationships we've actually configured.”
