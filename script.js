document.addEventListener('DOMContentLoaded', function() {
    let timeInterval;
    const endDate = document.querySelector('input[name="endDate"]');
    const clock = document.querySelector('#clock');

    if (!clock) {
        console.error("Clock element not found.");
        return;
    }

    const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');

    const savedTime = localStorage.getItem('countdown');
    if (savedTime && !isNaN(Date.parse(savedTime))) {
        startClock(savedTime);
        endDate.valueAsDate = new Date(savedTime);
    }

    endDate.addEventListener('change', function(e) {
        e.preventDefault();
        clearInterval(timeInterval);
        const endDateTemp = new Date(this.value + "T00:00:00"); // Ensures correct parsing
        if (!isNaN(endDateTemp)) {
            localStorage.setItem('countdown', endDateTemp);
            startClock(endDateTemp);
        }
    });

    function startClock(endTime) {
        clearInterval(timeInterval);
        function updateCounter() {
            let t = timeRemaining(endTime);
            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
        updateCounter();
        timeInterval = setInterval(updateCounter, 1000);
    }

    function timeRemaining(endTime) {
        if (!endTime || isNaN(Date.parse(endTime))) {
            return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        let t = Date.parse(endTime) - Date.parse(new Date());
        return {
            'total': t,
            'days': Math.floor(t / (1000 * 60 * 60 * 24)),
            'hours': Math.floor((t / (1000 * 60 * 60)) % 24),
            'minutes': Math.floor((t / (1000 * 60)) % 60),
            'seconds': Math.floor((t / 1000) % 60)
        };
    }
});
