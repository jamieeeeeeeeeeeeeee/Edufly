$(document).ready(function() {
    // Initial session and break lengths
    var countS = 25; // Session length in minutes
    var countB = 5;  // Break length in minutes
    $("#session").html(countS);
    $("#break").html(countB);

    // Initial state
    var pos = "Pomodoro";
    $("#stats").html(pos);

    // Initialize FlipClock with time set to 0
    var clock = $(".timer").FlipClock(0, {  
        countdown: true,
        clockFace: 'MinuteCounter',
        autoStart: false,
        callbacks: {
            interval: function() {
                // Switch between session and break when time reaches 0
                if (clock.getTime().time === 0) {
                    if (pos === "Session") {
                        pos = "Break";
                        clock.setTime(countB * 60); // Set to break length
                        document.getElementById('alertSound').play();
                    } else {
                        pos = "Session";
                        clock.setTime(countS * 60); // Set to session length
                        document.getElementById('alertSound').play();
                    }
                    $("#stats").html(pos);
                    clock.start(); // Start the new timer
                }
            }
        }
    });

    // SESSION Increment/Decrement
    $("#sessInc").on("click", function() {
        countS += 1;
        $("#session").html(countS);
    });

    $("#sessDec").on("click", function() {
        if (countS > 1) {
            countS -= 1;
            $("#session").html(countS);
        }
    });

    // BREAK Increment/Decrement
    $("#breakInc").on("click", function() {
        countB += 1;
        $("#break").html(countB);
    });

    $("#breakDec").on("click", function() {
        if (countB > 1) {
            countB -= 1;
            $("#break").html(countB);
        }
    });

    // START Button
    $("#start").on("click", function() {
        // Start the session timer
        if (clock.getTime() === 0 || pos === "Pomodoro") {
            clock.setTime(countS * 60);
            pos = "Session";
            $("#stats").html(pos);
        }
        clock.start();
        const audio = document.getElementById('backgroundMusic');
        audio.play().catch(function(error) {
            console.error("Audio playback failed:", error);
        });
    });

    // STOP Button
    $("#stop").on("click", function() {
        clock.stop();
        document.getElementById('backgroundMusic').pause();
    });

    // CLEAR Button
    $("#clear").on("click", function() {
        clock.stop();
        pos = "Pomodoro";
        $("#stats").html(pos);
        clock.setTime(0); // Reset clock to 0
        document.getElementById('backgroundMusic').pause();
        document.getElementById('backgroundMusic').currentTime = 0; // Reset audio
    });
});

