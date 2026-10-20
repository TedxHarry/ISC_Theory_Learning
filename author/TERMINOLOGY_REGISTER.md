# Terminology register

Updated: October 20, 2026.

This is an author maintenance aid for the meanings used in the current lessons. It is the seed for the later learner glossary, not an implemented glossary or tooltip system. Existing claim verification dates and applicability limits remain in REFERENCE_RECORDS.md.

A lesson explains each necessary term where it becomes useful. Use the concrete role it plays there: a missing target account, the collected representation, or the operation being attempted. The invariant below controls meaning; it does not require copying a dictionary paragraph into every lesson.

| Term | Meaning to preserve | Boundary to preserve |
|---|---|---|
| Identity | ISC's representation of a person or other entity, connecting relevant attributes, accounts, and access | It is not a target-system account |
| Account | A record used by a person or service in a particular system | The target record and ISC's representation are distinct |
| Source | ISC's configured representation of a system or collection of account data | Creating it does not create or replace the external application |
| Connector | The integration used to read data and perform supported configured operations | Read support does not prove write support, privileges, or success |
| Attribute | A named value on a particular record | Identical names on different records do not make one shared value |
| Aggregation | Collecting source account or access data into ISC within the applicable scope | It is not itself a grant, and observation is not a perpetual live guarantee |
| Account correlation | Associating a collected source account with the appropriate ISC identity | It does not authenticate a sign-in or create a missing target account |
| Entitlement | An access item represented from a source, such as a permission or group membership | The external system determines its operational meaning |
| Access profile | A bundle of related entitlements from one source | Detection/assignment and original delivery history must not be conflated |
| Role | An access grouping whose assignment represents required access for a responsibility or population | Criteria, requested assignment, and fulfilled target access are different evidence |
| Access request | Asking for specified access for a specified recipient | Request, approval, and delivered access are separate |
| Provisioning | Carrying out supported account or access changes | Initiation or processing completion does not validate target success |
| Deprovisioning | Removing previously granted account access or permissions through the applicable operation | A permission removal need not delete the account or end every session |
| Target system | The system receiving the attempted account or access change | The same external system can supply source data in the read direction |
| Identity processing | Evaluating identity information and applicable configured access | It can initiate changes; it does not prove their target outcome |
| Lifecycle state | A configured business stage used to drive applicable account and access actions | LCS is informal shorthand, not an additional object or guaranteed UI label |
| Certification campaign | The organizing set of access-review work | It is not the individual review assigned to a reviewer |
| Certification | An assigned review within a campaign | Supported decisions depend on the access and assignment model |
| Remediation | Work to carry out an access correction and verify its result | A recorded revoke decision alone is not completed removal |
| Authentication | Verification of a claimed identity under the applicable requirements | Successful authentication does not justify every permission |
| Authorization | Deciding whether an actor may perform a particular operation on a resource | Business approval and runtime application enforcement are distinct contexts |
| Front end / back end | User interface / trusted application processing | Hiding an interface control does not enforce the protected operation |

## Source anchors

The lesson-specific mappings and check dates are in [reference records](REFERENCE_RECORDS.md). The core anchors are [identities](https://documentation.sailpoint.com/saas/help/identities/index.html), [sources](https://documentation.sailpoint.com/saas/help/sources/index.html), [correlation](https://documentation.sailpoint.com/saas/help/accounts/correlation.html), [access objects](https://documentation.sailpoint.com/saas/help/access/index.html), [provisioning](https://documentation.sailpoint.com/saas/help/provisioning/index.html), [identity processing](https://documentation.sailpoint.com/saas/help/setup/identity_processing.html), [certifications](https://documentation.sailpoint.com/saas/help/certs/understanding_certifications.html), and [OWASP authorization guidance](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).

When a meaning is corrected, locate its uses across lessons and assessments, recheck relevant sources, and update affected explanations. Varying wording for its own sake is not a substitute for explaining the term in context.
