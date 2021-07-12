# Countdown Timer

This is the spiritual successor to my previous project kell-clock

Version: 3.3.0

Updates:

-   Bug fixes
-   Updated docs

# Instructions

Minimum required set up for timer element is like so:

```html
<div class="countdown__container" data-countdown="11/12/2019 12:00:00">
    <!-- leave empty -->
</div>
```

Inner content should be empty.

Countdown target should be set on the HTML as data-countdown and is in the format:
MM/DD/YYYY HH:MM:SS

When the timer has passed, the content will say EXPIRED

All content will be unstyled.

If you want to display time annotations (10 hours, 10 minutes, 10 seconds) then add:

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

Alternatively, if you want different annotations, you can use CSS to add pseudo content in.

If you need the numbers split into spans so that you can individually style them, use:
data-display-spans="true"

```html
<div
    class="countdown__container"
    data-countdown="11/12/2019 12:00:00"
    data-display-spans="true"
>
    <!-- leave empty -->
</div>
```

Sometimes you may need the days to be incorporated into the hours value (i,e. so you can have 48hours in the countdown). For this, just add data-display-days-as-hours="true"

```html
<div
    class="countdown__container"
    data-countdown="11/12/2019 12:00:00"
    data-display-days-as-hours="true"
>
    <!-- leave empty -->
</div>
```