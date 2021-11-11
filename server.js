const express = require('express');
const PORT = process.env.PORT || 3009;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello Massachusetts!'
    });
});

// Default response for any other request (Not Found)
// Will override all other requests! Put at END!
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
