# Checklist: Resume Enrollment Entry

Generated from the capture (kit/screen.json). Route: `#/resume-enrollment-entry`.

## Done by the kit (do not rebuild)
- [x] dialog placement by layout: below (max-width: 1280px) the portal's phone branch, above it centered, capped at a share of the window's height (a dialog at the left edge at the small size is correct)
- [x] Reset: clears the fields
- [x] tooltips on every ? icon, MVC validation messages on Save, the shell and its side menu

## Left for you
- [ ] Cancel on the page (not in a dialog): what the screen's script does on it (often: back to the home page, or clear and hide the results)
- [ ] 3 part(s) hidden at rest (data-kit-h=…) that Search and the measured radios / checkboxes / dropdowns do not reveal (h1, h2, h3): find in the script what shows each and build that
- [ ] every task in spec/tasks.md that the list above does not cover (the screen's own messages and rules, exactly as its script has them: do not add a rule the script does not have)

## The screen's own script (paths in the screen folder)
- capture/js/Scripts/hp.ua3.providerEnrollment.commonPartial__884a35a7.js
- capture/js/Scripts/hp.ua3.providerEnrollment.resumeEnrollment__884a35a7.js
