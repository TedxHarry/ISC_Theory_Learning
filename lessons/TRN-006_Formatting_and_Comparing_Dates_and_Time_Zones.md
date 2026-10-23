# Which moment does this date actually mean?

Devi, employee `86006`, has a project assignment that ends at **17:00 UTC on October 23, 2026**. HR supplies the value `"10/23/2026 17:00:00 +0000"`.

SailPoint Identity Security Cloud (ISC) needs a review label saying whether that boundary has been reached.

At 16:59 UTC, the label should be `"Before boundary"`. At exactly 17:00 UTC, it should be `"Boundary reached"`.

That last sentence settles a business decision: equality belongs on the reached side. A different agreement, such as “remain valid throughout the end date,” would require a different boundary.

Before choosing a calculation, let's establish what the date means. Changing its appearance is not enough.

## A calendar date does not identify one moment

A **date-only value**, such as `2026-10-23`, identifies a calendar day. It does not include a time of day or say which place's calendar applies.

A **timestamp** includes date and time information. An **instant** is one exact point on the time line.

`2026-10-23T17:00:00Z` identifies an instant. The `T` separates the date and time; `Z` means UTC, the common reference time called Coordinated Universal Time.

An **offset** states how far a local clock reading is ahead of or behind UTC. For example, `+05:30` means five hours and thirty minutes ahead.

These two timestamp representations identify the same instant:

- `2026-10-23T17:00:00Z`
- `2026-10-23T22:30:00+05:30`

The clock readings differ; the moment does not.

Now consider `2026-10-23T17:00:00` without an offset. Which instant is that? You need the agreed time-zone context. Neither the reader's location nor the administrator's browser should silently decide the business meaning.

A **time zone**, such as `America/Chicago`, contains rules for interpreting local times, including changes of offset. An offset alone describes one displacement from UTC; it does not supply a location's future clock-change rules.

**Daylight-saving time** is a seasonal clock adjustment used by certain locations. Where clocks move forward, local times can be skipped. Where clocks move backward, the same local time can occur twice.

For a deadline expressed in local time, the agreement must resolve those cases. Do not attach a fixed offset to every date merely because that offset is correct for one example.

If HR supplied only October 23, you would need to ask: start of that day, end of that day, or a particular working-hour cutoff? In which time zone? Does the person remain eligible exactly at the boundary?

Our main example avoids that missing agreement. HR has already approved and supplied the exact UTC instant.

## Find the actual field before interpreting its text

An **identity** is ISC's representation of a person or another managed entity. An **account** is a record in a connected system. An **attribute** is a named field on a record.

The **AssignmentLedger Production source** is ISC's configured representation of HR assignment data. It is authoritative for this example's employee population: its worker accounts establish identities through the Employees **identity profile**.

The profile is shared configuration governing those identities, including how their identity fields receive values.

Devi already has one correctly associated AssignmentLedger account, `al-86006`, on her identity. We'll label the identity `I-86006`; this is a teaching label, not an actual ISC object ID.

**Account aggregation** reads account data into ISC. The assignmentEnd field has already been collected as the single text value shown in the opening.

Other required identity attributes are valid. There is no competing account, missing worker identity or proposed employment termination in this example.

The organization has added a custom identity field named **Assignment Boundary Review**, with internal name `assignmentBoundaryReview`. It is a review-only label. It does not control access, employment status or a target account action.

An **identity attribute mapping** defines how an identity field receives its value. This mapping will use a date comparison to supply one of the approved labels.

Keeping the input field, its meaning and its destination separate helps you investigate the right problem. A correctly parsed date from the wrong account is still the wrong deadline.

## Formatting begins by reading the original representation

A **transform** is a configurable ISC object that retrieves or manipulates data and returns a result. Its **input** is the supplied value; its **output** is the returned result.

ISC's `dateFormat` operation reads a date using an input pattern, then writes it using an output format.

**Parsing** means interpreting text as date and time components. **Formatting** means representing the interpreted value as text.

For `"10/23/2026 17:00:00 +0000"`, the agreed input pattern is `MM/dd/yyyy HH:mm:ss Z`.

Pattern letters are instructions, not labels you can freely capitalize:

| Pattern fragment | What it means here |
|---|---|
| `MM` | Month, such as 10 |
| `dd` | Day of month, such as 23 |
| `yyyy` | Calendar year, such as 2026 |
| `HH` | Hour using a 24-hour clock, such as 17 |
| `mm` | Minutes, such as 00; lowercase m is not month |
| `ss` | Seconds |
| `SSS` | Milliseconds, thousandths of a second, when included |
| `Z` | Numeric offset in the SimpleDateFormat pattern, such as +0000 |

These patterns use Java's **SimpleDateFormat** syntax, the date-pattern notation used by this ISC operation. Uppercase `YYYY` is a week-based year, not an interchangeable spelling of calendar year `yyyy`. Uppercase `DD` means day of year, not day of month.

You do not need a catalog of every pattern to review this definition. You do need to identify each part of the actual producer's value.

Offset notation is part of that agreement. Our input uses +0000 without a colon. A producer using +05:30 needs a matching pattern, such as the SimpleDateFormat offset pattern `XXX`; do not assume every offset spelling fits the same input pattern.

**ISO 8601** is a standard for date and time representations. ISC's named `ISO8601` format is a supported format choice; it is not permission to assume every date-looking string has the same precision or time-zone meaning.

The following complete illustrative definition uses **JSON**, a structured text format. Its quoted values are strings. Braces group named properties into objects.

The nested `accountAttribute` operation retrieves assignmentEnd from an associated account on the named source.

```json
{
  "name": "Read the assignment end instant",
  "type": "dateFormat",
  "attributes": {
    "inputFormat": "MM/dd/yyyy HH:mm:ss Z",
    "outputFormat": "ISO8601",
    "input": {
      "type": "accountAttribute",
      "attributes": {
        "sourceName": "AssignmentLedger Production",
        "attributeName": "assignmentEnd",
        "accountReturnFirstLink": true
      }
    }
  }
}
```

The root `type` chooses dateFormat. The root `name` identifies this proposed transform; it does not select the identity field to update.

The `attributes` object contains the operation settings. The explicit input supplies the account field, rather than leaving the input to be inferred only from a mapping's source selector.

`accountReturnFirstLink: true` tells accountAttribute to return the first selected account's field even if it is null. The unquoted `true` is a boolean yes/no setting. It does not fill a missing date or suppress a failed retrieval.

For the supplied value, the parsed instant is 17:00 UTC on October 23. An equivalent ISO representation is `2026-10-23T17:00:00.000Z`.

Check the returned representation, including its offset. Equivalent zero-offset spellings can identify the same instant; do not diagnose a timing error from spelling alone.

This definition illustrates the formatting step. The next definition includes that step directly inside the comparison; it does not depend on a separate saved intermediate identity field.

Another source can supply an **epoch timestamp**, a count measured from a defined starting moment, rather than readable calendar text. ISC provides named formats for these representations. `EPOCH_TIME_JAVA` uses milliseconds from January 1, 1970; `EPOCH_TIME_WIN32` uses 100-nanosecond intervals from January 1, 1601.

The starting moment and unit both matter. Do not interpret seconds as milliseconds or choose a format merely because the input contains digits. Special values that a producer uses for “never expires” also need that producer's documented meaning; they are not ordinary deadlines simply because they are numeric.

## Compare the moments, not their display text

ISC's `dateCompare` operation compares two dates and returns one configured result when the comparison is true and another when it is false.

Its inputs need the supported ISO date representation, or the special keyword `"now"`. **Now** means the date and time at evaluation, not the last collection time and not the time when someone saved the JSON.

The comparison has a direction:

- `firstDate` is the value on the left.
- `secondDate` is the value on the right.
- The `operator` states the relationship to test.

The supported operator names are `lt`, `lte`, `gt` and `gte`: less than, less than or equal to, greater than, and greater than or equal to.

Here, we ask whether **now is greater than or equal to the approved end instant**. Therefore now belongs on the left and the end instant on the right.

The **positiveCondition** is the output for a true comparison. The **negativeCondition** is the output for a false comparison. These are configured strings, not automatic account actions.

```json
{
  "name": "Assignment boundary review",
  "type": "dateCompare",
  "attributes": {
    "firstDate": "now",
    "secondDate": {
      "type": "dateFormat",
      "attributes": {
        "inputFormat": "MM/dd/yyyy HH:mm:ss Z",
        "outputFormat": "ISO8601",
        "input": {
          "type": "accountAttribute",
          "attributes": {
            "sourceName": "AssignmentLedger Production",
            "attributeName": "assignmentEnd",
            "accountReturnFirstLink": true
          }
        }
      }
    },
    "operator": "gte",
    "positiveCondition": "Boundary reached",
    "negativeCondition": "Before boundary"
  }
}
```

The mapping puts this final output in assignmentBoundaryReview. The transform name does not create that destination.

These are illustrative definitions, not uploads or evidence of tenant execution.

The nested objects describe value dependencies. First obtain and interpret the end value so the comparison has a usable date. The following arrows show those dependencies, not separate private ISC services or a guaranteed backend execution order:

```text
I-86006 / account al-86006
assignmentEnd collected from HR
              |
"10/23/2026 17:00:00 +0000"
              |
Parse with MM/dd/yyyy HH:mm:ss Z
              |
ISO value for 2026-10-23 17:00 UTC
              |
Compare now >= that end instant
          /             \
        true            false
         |                |
 Boundary reached    Before boundary
         \              /
           Selected result
                 |
Mapping supplies assignmentBoundaryReview

Errors are not ordinary false results.
```

At 16:59 UTC, now is earlier, so the comparison is false. At 17:00 UTC, the instants are equal, so gte is true.

Using `gt` would make equality false. Swapping the two dates while keeping gte would ask whether the deadline is at or after now, which is a different question.

| Evaluation time on October 23, 2026 | Main definition's result |
|---|---|
| 16:59:00 UTC | Before boundary |
| 17:00:00 UTC | Boundary reached, because equality is included |
| 17:01:00 UTC | Boundary reached |

Comparing display strings alphabetically does not replace this calculation. A month-first date string can sort incorrectly across years. Different offsets can also make clock text look ordered differently from the actual instants.

For example, `2026-10-23T17:00:00+02:00` is 15:00 UTC, earlier than `2026-10-23T16:00:00Z`. Looking only at 17 versus 16 would reverse the answer.

## Changing the format must not change the deadline

Suppose someone replaces the full output with only `yyyy-MM-dd`.

That can be suitable for a date-only display. It removes the time and offset information needed to represent this exact assignment boundary.

Reading that reduced value back as midnight would create a different boundary. The change would no longer be “just formatting” for this consumer.

A **consumer** is a configuration or system that uses the value. A display showing “October 23” and a calculation deciding whether 17:00 UTC has passed need different information.

Likewise, appending the literal letter Z to a local clock reading does not convert the clock reading to UTC. It asserts that the displayed time is UTC.

In a SimpleDateFormat pattern, quoting `'Z'` makes Z literal text. An offset pattern and a quoted letter do different jobs. Use actual time-zone interpretation and conversion, not a label pasted onto an unconverted local time.

Ambiguous input is another risk. The value `03/04/2026` can mean March 4 under month/day/year, or April 3 under day/month/year. Both dates exist. A calculation can parse successfully while following the wrong agreement.

Confirm the producer's format and business meaning. Do not choose whichever interpretation makes the example look reasonable.

## Date arithmetic changes the moment on purpose

A reminder requirement says: prepare a review point **24 hours before** the approved end instant.

Formatting cannot perform that subtraction. ISC's `dateMath` operation adds, subtracts or rounds date and time components according to an expression.

The expression `-24h` subtracts 24 hours. The unit letters matter: in dateMath, `M` means month and `m` means minute. A month is not a fixed number of days.

Here is a separate fixed-input illustration. The `static` operation supplies literal text, rather than retrieving each worker's date.

```json
{
  "name": "Illustrate a 24 hour review lead",
  "type": "dateMath",
  "attributes": {
    "expression": "-24h",
    "input": {
      "type": "static",
      "attributes": {
        "value": "2026-10-23T17:00:00.000Z"
      }
    }
  }
}
```

The arithmetic point is October 22 at 17:00 UTC. This is not a replacement for dynamic per-person retrieval and does not schedule a reminder.

DateMath expects its input in the documented ISO representation in UTC. Its documented output pattern is `yyyy-MM-dd'T'HH:mm`, which omits seconds and an offset.

For this illustration the output is `2026-10-22T17:00`. That text is not the same output contract as dateCompare's required ISO input. Before composing the result into dateCompare, use dateFormat with the matching input pattern and supported ISO output, verifying that the UTC interpretation is retained.

Do not add a Z and call the integration verified. The input context and the returned instant must agree.

A **rounding** expression changes precision or moves a value to a unit boundary. For example, `now/d` with `roundUp: false` truncates to the day boundary in the operation's context. It does not automatically mean “the end of the worker's local business day.”

Rounding before comparison can deliberately discard hours. If you need the exact 17:00 boundary, rounding it to a day is not harmless cleanup.

DateMath can use now in its expression. If now is specified there, it takes precedence over a supplied input date. An expression based on now is therefore not a disguised subtraction from HR's assignmentEnd.

DateFormat itself does not accept now as its input keyword. The operations have different contracts even though they all work with dates.

## A missing date is not a false comparison

**Null** means no value. An empty string is text with zero characters. Whitespace-only text contains spaces, even if it looks blank on screen.

A malformed value does not meet the expected representation. A business-invalid value can look perfectly formatted but still represent the wrong event or wrong deadline.

Do not treat any of these as proof that the boundary is in the future or has passed.

The negativeCondition handles a successfully evaluated false comparison. It is not a general error handler for a failed read, unsuccessful date interpretation or invalid configuration.

Check actual evaluation results and errors. Do not assume every malformed calendar date is strictly rejected merely because an input pattern exists; parsing and business validation are separate responsibilities.

A date such as February 30 must not be accepted as an approved deadline because a formatter returned something. Verify the actual parser behavior, detect unsuitable inputs and correct the responsible producer or supported preparation logic.

A fallback also changes policy. Replacing an unavailable end date with now can classify the record as reached. Replacing it with a distant future date can conceal a missing deadline for years.

Ask what absence means. No scheduled end, not yet recorded and a failed retrieval are different conditions. A nonempty substitute does not settle that question.

## The clock passing does not apply a new result by itself

The profile's **Preview** evaluates mappings for a selected identity using available data. Preview at 16:59 and Preview at 17:01 can legitimately return different labels with the same collected deadline.

The changing input is now.

**Identity processing** reevaluates identity data and related decisions against applicable configuration. A saved identity field shows an applied result from processing; it is not a continuously running display of the expression.

A time-dependent calculation therefore needs an appropriate reevaluation design. ISC supports scheduled processing for eligible identities and a documented periodic-refresh option for time-dependent attributes. Eligibility, tenant scheduling and queued execution matter.

The `requiresPeriodicRefresh` option requests periodic reevaluation. It does not create a second-by-second timer or guarantee processing exactly at an arbitrary business cutoff. The example definitions above do not configure a schedule.

For a deliberate future processing point, ISC also provides the **Next Processing Date** identity attribute, `nextProcessing`. It identifies when the identity should next undergo time-based processing. It must be mapped per profile and meet the documented future-time requirements, including being at least an hour after that attribute was updated.

That is separate configuration, not behavior automatically created by mentioning now or calculating a reminder date. Exact delivery of a target action needs further evidence.

This is a conceptual time-and-evidence sequence. The 17:03 processing observation is supplied fictional evidence, not a timing promise:

```text
October 23, 2026 / UTC

16:59  Relevant evaluation
       now < 17:00
       Result: Before boundary
         |
17:00  Business boundary passes
       No exact-time run is established
         |
17:03  Supplied authorized processing
       now >= 17:00
       Result: Boundary reached
         |
       Current identity value verified

A crossed boundary is not a completed write.
```

In this fictional continuation, the team reviews shared impact and completes authorized processing at 17:03 UTC. Current identity evidence then shows assignmentBoundaryReview `"Boundary reached"`.

The collected HR text remains unchanged. The calculation did not move the deadline, end Devi's employment or alter an account.

**Provisioning** makes account or access changes in a connected system. A comparison result does not establish that such a change was configured, attempted or completed.

For an unexpected outcome, connect the screen to the record behind it: exact identity field, mapping and definition; selected account and date text; approved format, offset and boundary policy; evaluation time; processing evidence; and current applied value.

If a target change is required, investigate that consumer separately. A review label and confirmed loss of target access answer different questions.

## Work through the boundary with changed facts

### 1. The producer changes its date order

**Facts:** A separate feed supplies 03/04/2026 under an approved day/month/year agreement. A proposed mapping interprets it with MM/dd/yyyy.

Can successful parsing establish the correct date?

**Reasoning:** No. The approved date is April 3; that pattern interprets March 4. Correct the format agreement in configuration and verify the interpreted date. No parsing error is needed for a wrong result.

### 2. Equality belongs on the reached side

**Facts:** Evaluation is exactly 17:00 UTC. The end instant is exactly 17:00 UTC. The approved policy includes equality, but a proposed version uses now gt end.

What happens?

**Reasoning:** Strict greater-than is false at equality, so that version returns Before boundary. The main gte definition returns Boundary reached. The operator must express the approved cutoff.

### 3. The dates were swapped

**Facts:** Now is 16:59 UTC. The deadline is 17:00 UTC. A proposed definition uses firstDate as the deadline, secondDate as now, operator gte and positive output Boundary reached.

Does it preserve the main meaning?

**Reasoning:** No. It asks whether 17:00 is at or after 16:59, which is true, and returns Boundary reached too early. Read the whole statement in left-to-right order before trusting the output label.

### 4. The clock readings differ

**Facts:** One value is 2026-10-23T17:00:00Z. Another is 2026-10-23T22:30:00+05:30.

Is the second deadline five and a half hours later?

**Reasoning:** No. Subtract its positive offset to express it in UTC; it is 17:00 UTC too. They identify the same instant. Preserve the offset when interpreting the text.

### 5. Formatting removed the time

**Facts:** The approved cutoff is October 23 at 17:00 UTC. An intermediate value keeps only 2026-10-23. A later design treats that date as 00:00 UTC.

Is that an equivalent representation?

**Reasoning:** No. It introduces a midnight boundary seventeen hours earlier. Date-only display can be valid for a display consumer but is insufficient to preserve this exact cutoff.

### 6. The reminder arithmetic returned text

**Facts:** The fixed UTC dateMath example subtracts 24 hours. Its returned text is 2026-10-22T17:00. A proposed dateCompare consumes it directly without adapting the output contract.

What needs attention?

**Reasoning:** The arithmetic point is correct, but dateMath's documented output lacks the full representation expected by dateCompare. Add the supported formatting step with the actual input pattern and verified UTC interpretation. Syntax, arithmetic and compatibility are separate checks.

### 7. The end field looks blank

**Facts:** The screen shows no visible date. No one has checked whether retrieval returned null, empty text, spaces or an error. Someone proposes a distant-future constant.

Can that close the investigation?

**Reasoning:** No. Establish the actual input and evaluation first, then the approved meaning of absence. A future constant can hide missing information and change the classification without authority. It does not repair collection or retrieval.

### 8. The cutoff passed without a checked reevaluation

**Facts:** At 16:59 the applied label was Before boundary. At 17:01 the same stored label is visible. No later processing result has been checked.

Does that prove dateCompare cannot compare the dates?

**Reasoning:** No. The field can still show an earlier applied result. Check when the calculation was reevaluated, whether the identity was eligible for the intended processing and whether its new result was applied. A passed cutoff alone is not processing evidence.

## Apply the reasoning to a local end date

A partner sends `2026-11-01` as the last permitted calendar day. The agreement says the person remains eligible throughout that day in the partner's named local time zone.

An engineer proposes appending T00:00:00Z to the date and subtracting 24 hours for a warning.

Before accepting that design, what do you need to resolve?

First establish the approved boundary. “Throughout November 1” points to the start of November 2 in the agreed local zone as the first excluded moment, not the start of November 1 in UTC.

Use that zone's rules for the relevant date to derive the instant. Do not invent an offset or assume the date has a universally applicable midnight.

Then clarify whether the warning means 24 elapsed hours before that instant or the same local clock time on the previous calendar day. Those are not interchangeable across a clock change.

Finally, verify the supported representation, calculation, reevaluation and any separately configured delivery. An accurate date formula still needs to be evaluated and applied before another process can use its result.

The question to keep asking is: are we preserving an agreed moment, deliberately deriving another one, or accidentally inventing one?
