function CountdownTimer(data) {
    this._dateEnd = data.dateEnd || null;
    this._daysAsHours = data.daysAsHours || false;
    this._returnNumbersInSpans = data.returnNumbersInSpans || false;
    this._countdownElement = data.countdownElement || null;
    this._daysHTML = null;
    this._hoursHTML = null;
    this._minutesHTML = null;
    this._secondsHTML = null;
    this._timeLeft = 0;
    this._timeNow = 0;
    this._version = "3.0.0";
    this._d = 1000 * 60 * 60 * 24;
    this._h = 1000 * 60 * 60;
    this._m = 1000 * 60;
    this._timerSet = false;
}
CountdownTimer.prototype._getVersion = function _getVersion() {
    return this._version;
};
CountdownTimer.prototype._initCountdown = function _initCountdown() {
    if (!this._dateEnd || !document.querySelector(this._countdownElement))
        return this;

    this._setupElements();

    // * get DateAPI
    this._dateEnd = new Date(this._dateEnd).getTime();
    this._timerSet = true;

    return this;
};
CountdownTimer.prototype._setupElements = function _setupElements() {
    let _self = this;

    this._forEachNode(
        document.querySelectorAll(_self._countdownElement),
        function appendEach(target) {
            let timerArray = [
                document.createElement("span"),
                document.createElement("span"),
                document.createElement("span"),
                document.createElement("span"),
            ];
            timerArray[0].classList.add("countdown__days");
            timerArray[1].classList.add("countdown__hours");
            timerArray[2].classList.add("countdown__minutes");
            timerArray[3].classList.add("countdown__seconds");
            if (_self._daysAsHours) {
                timerArray.shift();
            }
            timerArray.forEach(function(tel) {
                target.append(tel);
            });
        }
    );
};
CountdownTimer.prototype._isTimerSet = function _isTimerSet() {
    return this._timerSet;
};
CountdownTimer.prototype._startCountdown = function _startCountdown() {
    if (this._isTimerSet()) {
        this._updateCountdown();
    }
};
CountdownTimer.prototype._updateCountdown = function _updateCountdown() {
    this._timeNow = new Date().getTime();
    this._timeLeft = this._dateEnd - this._timeNow;
    let _self = this;
    if (!this._daysAsHours) {
        let _dv = this._processValue(Math.floor(this._timeLeft / this._d));
        this._forEachNode(
            document.querySelectorAll(
                _self._countdownElement + " .countdown__days"
            ),
            function(el) {
                el.innerHTML = _dv;
            }
        );
    }
    let _hv = this._daysAsHours
        ? this._processValue(
              Math.floor((this._timeLeft % this._d) / this._h) +
                  Math.floor(this._timeLeft / this._d) * 24
          )
        : this._processValue(Math.floor((this._timeLeft % this._d) / this._h));
    this._forEachNode(
        document.querySelectorAll(
            _self._countdownElement + " .countdown__hours"
        ),
        function(el) {
            el.innerHTML = _hv;
        }
    );
    let _mv = this._processValue(
        Math.floor((this._timeLeft % this._h) / this._m)
    );
    this._forEachNode(
        document.querySelectorAll(
            _self._countdownElement + " .countdown__minutes"
        ),
        function(el) {
            el.innerHTML = _mv;
        }
    );
    let _sv = this._processValue(Math.floor((this._timeLeft % this._m) / 1000));
    this._forEachNode(
        document.querySelectorAll(
            _self._countdownElement + " .countdown__seconds"
        ),
        function(el) {
            el.innerHTML = _sv;
        }
    );
    if (this._timeLeft < 0) {
        this._forEachNode(
            document.querySelectorAll(_self._countdownElement),
            function(el) {
                el.innerHTML = "EXPIRED";
            }
        );
        this._timerSet = false;
    } else {
        window.setTimeout(_self._updateCountdown.bind(_self), 1000);
    }
};
CountdownTimer.prototype._processValue = function _processValue(v) {
    return this._returnNumbersInSpans
        ? this._split_nums(this._str_pad(v))
        : this._str_pad(v);
};
CountdownTimer.prototype._str_pad = function _str_pad(n) {
    let numLength = String(n).length,
        lx;

    if (numLength < 2) {
        lx = -2;
    } else {
        lx = numLength * -1;
    }

    return String("0" + n).slice(lx);
};
CountdownTimer.prototype._split_nums = function _split_nums(n) {
    return n
        .split("")
        .map(function(x) {
            return "<span class='countdown__number'>" + x + "</span>";
        })
        .join("");
};
CountdownTimer.prototype._forEachNode = (function _forEachNode(
    nodeList,
    callback
) {
    Array.prototype.forEach.call(nodeList, callback);
})(function initAction() {
    function ready(fn) {
        if (
            document.attachEvent
                ? document.readyState === "complete"
                : document.readyState !== "loading"
        ) {
            fn();
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }
    ready(function run() {
        Array.prototype.forEach.call(
            document.querySelectorAll(
                ".countdown__container:not(.countdown__started)"
            ),
            function forEachCountdownContainer(c) {
                let ctdwn = new CountdownTimer({
                    dateEnd: c.getAttribute("data-countdown"),
                    displayAnnotations: c.getAttribute(
                        "data-display-annotations"
                    ),
                    daysAsHours: true,
                    returnNumbersInSpans: false,
                    countdownElement: c,
                })
                    ._initCountdown()
                    ._startCountdown();
            }
        );
    });
})();
