# Example register

Updated: October 20, 2026.

Each lesson establishes an independent fictional situation. Devi is a reusable teaching name, not a continuing biography across the course. An employee number is stable within its lesson and any deliberately linked continuation. New independent lessons receive new identifiers.

| Lesson | Working placement | Employee number | Relevant state | Main account identifier |
|---|---|---|---|---|
| SYS-001 | Module 1.1 | 11001 | Finance employee checking invoices; later no longer needs invoice access | Existing finance account; no specific username required |
| SYS-002 | Module 1.2 | 12002, reflected in account names | Finance employee checking invoices | fin-12002; the changed-account case also uses fin-archive-12002 |
| SYS-003 | Module 1.3 | 13003 | Move from Customer Support to Finance; manager-data handoff | HR and directory records inspected using the stated identifiers |
| SYS-004 | Module 1.4 | 14004, reflected in account name | Operations employee whose temporary export assignment ends | report-14004 |
| SYS-005 | Module 1.5 | 15005 | Finance invoice checker; later moves to supplier coordination | inv-15005 |
| SYS-006 | Module 1.6 | 16006 | Move from Operations to Finance | rpt-16006 |
| FND-001 | Module 2.1 | 10482 | Starts in Finance; the changed-value example moves her to Operations | devi.r and dv10482 |
| FND-002 | Module 2.2 | 20002 | Finance employee with an existing production account; separate test and file-fed portal comparisons | fin-20002 in separately identified production/test contexts; supplier-20002 in the portal |
| FND-003 | Module 2.3 | 23003 | Moves from Operations to Finance; HR orgCode FIN maps to identity Finance, while collected finance department initially remains Operations | dir-23003 and fin-23003; source/type-scoped group g-inv-read and g-report-export values |
| FND-004 | Module 2.4 | 24004 | Finance employee, job code AP_READER; main path has no listed grants, with separate preexisting-access, rejection, departure, and overlap variations | inv-24004 and dir-24004; source-specific InvoiceRead, SupplierRead, and FinanceWorkspace values |
| FND-005 | Module 2.5 | 25005 | Finance employee requests Submit expenses, not Approve expenses; directory-based grant and separate existing ExpenseHub account/sign-in | dir-25005 in Corporate-Directory; exp-25005 in ExpenseHub; EXP_SUBMIT/EXP_APPROVE group values |
| FND-006 | Module 2.6 | 26006 | Finance employee needs Ledger production invoice reading; independent label/key/schema-change variations and warehouse transfer | fin-26006, renamed finance.devi in one variation; native u-778 (u-991 only in the separate changed-key example); I-26/A-26/S-26/E-26/P-26/R-26 are fictional technical-ID stand-ins; test S-27/E-27 then E-28; warehouse S-81/S-82/A-81/I-81/E-81/E-82/P-81, native w-305 |
| FND-007 | Module 2.7 | 27007 | Warehouse employee with separate approved daily/admin Stockroom accounts; export required on daily account; alternate selection, disabled, retired, and removal cases remain separate | hr-27007/A-71 on People HR/S-71; dir-27007/A-72 on Corporate Directory/S-72; stock-27007/A-73 and stock-admin-27007/A-74 on Stockroom/S-73; I-71 is the person; payroll transfer uses pay-review/pay-support |
| ARC-001 | Module 3.1 | 31001 | Newly joined Procurement employee needs supplier-record viewing; existing account and supported fictional VA-based update; alternate privilege-denial timeline and separate SaaS document-service transfer | supplier-31001 is the recipient account; svc-supplier-isc is the integration actor; supplier.view is the requested access, not bank-detail-change access |
| ARC-002 | Module 3.2 | 32002 | Asset employee needs asset.read; one VA host fails and the other cannot resolve the target; separate interrupted-response and Payroll shared-route transfer cases | asset-32002 is the recipient; svc-asset-isc is the integration actor; C-Asset-Prod contains va-asset-01/va-asset-02; Operations Directory shares the example cluster; names are fictional, not commands |
| ARC-003 | Module 3.3 | 33003 | Project coordination employee needs project.view on an existing correctly associated ProjectBoard account; separate authority, destination, token, partial-collection and migration cases; independent private payroll API transfer | project-33003 is the recipient; isc-project-prod is the integration client; Delivery-Prod is production and Delivery-Test is separate test; ProjectBoard Production is the ISC source label, not destination proof |

Manager numbers, request IDs, and transfer-case account IDs represent different objects. They don't need to contain the employee number.

When an identifier changes, check the lesson, embedded examples, diagram source, worked answers, and current author notes together. Historical revision descriptions retain their historical facts. Never resolve a changed department by rewriting correct source data merely to match a different lesson's scenario.
