1. # How to Run

   Open index.html directly in a browser
   If you want a dev server:
   npx serve .
   Then visit http://localhost:3000.

2. # Stack & Design Choices

# Stack:

Vanilla HTML, CSS, and JavaScript no frameworks or libraries used. This task is a single focused form with live calculations, which does not need React or any virtual DOM. Plain JS is faster to write, easier to debug, and has zero dependencies to break.

# Design decision 1:

Preset tip buttons that stay visually distinct: The four preset buttons (10%, 15%, 20%, 25%) get a solid green background when active, so the user can see at a glance which rate is selected without hunting for a number in a text field. Clicking the active preset again deselects it which lets the user go back to typing a custom value without any friction.

# Design decision 2:

Per-person result gets a larger font and a highlighted row: The "Per Person" row uses a noticeably bigger font (1.5rem vs 1rem) and sits inside a tinted background block. The reason is that this is almost always the only number a user actually cares about when splitting a bill. Everything else such as total tip, grand total is supporting information. Making that one number dominant means someone can glance at the result panel and see what they owe without reading every row.

3. # Responsive & Accessibility

# How it behaves at different screen sizes:

On a 360px phone everything stacks in one column, the font sizes get a little smaller, card padding tightens, and the preset buttons shrink slightly but still tap easily. On a 1440px laptop the whole app just centers itself and stops at 520px wide no point stretching a simple form wall to wall.

# Accessibility thing I handled:

One accessibility thing I made sure to handle was tab order. We can go through the whole app with just a keyboard first bill, then tip presets, then custom tip input, then number of people, then reset. The reset button also has a visible focus ring so you're never lost. Error messages are always sitting in the DOM (just empty) so when they appear there's no layout jump.

# Accessibility skipped:

I did not add aria-live to the results panel so a screen reader user won't automatically hear the updated totals as they type. Adding aria-live="polite" to the results card would fix this. I skipped it because it was the most complex accessible pattern to get right without accidentally flooding the user with announcements on every keystroke

# 4. AI Usage:

I used Claude while building this. Here's exactly where and what I changed:
HTML structure:
I asked Claude to give me a starting structure for the form. It used <p> tags for the error messages that got added and removed from the DOM dynamically. I switched them to always-present empty <span> elements instead. Removing and adding nodes causes tiny layout shifts and can confuse screen readers.

Validation logic:
Claude's first draft of the bill validation accepted 0 as a valid input with no error. I added a specific check for zero with the message "Bill amount cannot be zero." A zero bill gives you all-zero outputs which is useless.

# 5.Honest Gap:

The rounding isn't perfect. I use Math.ceil to round every per-person amount up to the nearest rupees so nobody underpays. But if you multiply that rounded number back by the number of people it can be a rupee  or two more than the actual total. Like Rs 100 split 3 ways gives Rs 33.34 per person, but 33.34 × 3 = Rs 100.02 not Rs 100.00. With more time I would fix this properly like floor everyone's share first, calculate the leftover rupees, and add them one by one to the first few people so the total always adds up exactly right.