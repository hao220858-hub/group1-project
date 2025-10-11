const express = require('express');
const userRoutes = require('./routes/user'); // Dòng require route

const app = express();
app.use(express.json());

app.use('/api', userRoutes); // Dòng sử dụng route

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));