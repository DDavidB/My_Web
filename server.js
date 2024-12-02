<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Website</title>
    <style>
        body {
            font-family: David, sans-serif;
            background-color: #865555;
            color: #800;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #0056b3;
        }
        img {
            max-width: 15%;
            height: auto;
            display: none; /* Hide the image initially */
        }
    </style>
    <!-- הוספת קישור ל-SheetJS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
</head>
<body>
    <h1>מה המצב , טוב לראותך  </h1>
    <h1>HTML זוהי התנסות שלי בכתיבת  </h1>

    <p>This is my first website built with HTML!</p>

    <h2>About Me</h2>
    <p>My name is דוד ברכה. I love coding and building websites.</p>

    <h2>אחינעם ברכה המתוקה</h2>
    <p>להצגת התמונה הזן את הקוד הנכון:</p>
    <input type="text" id="codeInput" placeholder="הזן קוד">
    <button onclick="checkCode()">אשר</button>
    <img id="secretImage" src="Ahinoam.jpg" alt="A beautiful scenery">

    <h2>הרשמה</h2>
    <form id="registrationForm">
        <label for="username">שם משתמש:</label><br>
        <input type="text" id="username" name="username"><br>
        <label for="carNumber">מספר רכב:</label><br>
        <input type="text" id="carNumber" name="carNumber"><br><br>
        <button type="button" onclick="register()">הרשם</button>
    </form>
    
    <h2>הורדת טבלת אקסל</h2>
    <p>להורדת הטבלה הזן את הקוד הנכון:</p>
    <input type="text" id="excelCodeInput" placeholder="הזן קוד">
    <button onclick="downloadExcel()">הורד טבלת אקסל</button>

    <h2>Contact</h2>
    <p>Feel free to <a href="mailto:davidbera8@gmail.com">email me</a> with any questions or comments.</p>

    <h2>השעה הנוכחית</h2>
    <p>השעה הנוכחית היא: <span id="time"></span></p>

    <script>
        function updateTime() {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;
            var timeString = hours + ":" + minutes + ":" + seconds;
            document.getElementById("time").textContent = timeString;
        }

        function checkCode() {
            var code = document.getElementById("codeInput").value;
            if (code === "2435") {
                document.getElementById("secretImage").style.display = "block";
            } else {
                alert("הקוד שהזנת שגוי. נסה שוב.");
            }
        }

        function register() {
            var username = document.getElementById("username").value;
            var carNumber = document.getElementById("carNumber").value;
            if (username && carNumber) {
                fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: username, carNumber: carNumber })
                }).then(response => {
                    return response.text();
                }).then(data => {
                    alert(data);
                    document.getElementById("registrationForm").reset();
                }).catch(error => {
                    console.error('Error:', error);
                });
            } else {
                alert("אנא מלא את כל השדות.");
            }
        }

        function downloadExcel() {
            var code = document.getElementById("excelCodeInput").value;
            if (code === "316691054") {
                fetch('/registrations')
                    .then(response => response.json())
                    .then(data => {
                        var wb = XLSX.utils.book_new();
                        var ws = XLSX.utils.json_to_sheet(data);
                        XLSX.utils.book_append_sheet(wb, ws, "Registrations");
                        XLSX.writeFile(wb, "registrations.xlsx");
                    }).catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                alert("הקוד שהזנת שגוי. נסה שוב.");
            }
        }

        // Update time every second
        setInterval(updateTime, 1000);
        // Initial call to display time immediately on load
        updateTime();
    </script>
</body>
</html>
