# Countdown Timer

This is the spiritual successor to my previous project kell-clock

Version: 3.1.0

Updates:

-   Major Overhaul to prototype object pattern

# Instructions

Minimum Set up for timer element is like so:

```html
<div class="countdown__container" data-countdown="11/12/2019 12:00:00">
    <!-- leave empty -->
</div>
```

Inner content should ideally be empty.

Countdown target should be set on the HTML as data-countdown and is in the format:
MM/DD/YYYY HH:MM:SS

When the timer has passed, the content will say EXPIRED

If you want to display time annotations (i.e. 10 hours, 10 minutes, 10 seconds) then use:

```
data-display-annotations="true"
```

Like so:

```html
<div
    class="countdown__container"
    data-countdown="11/12/2019 12:00:00"
    data-display-annotations="true"
>
    <!-- leave empty -->
</div>
```

All content will be unstyled.

If you need the numbers split into spans so that you can individually style them, use:
data-display-spans="true"
