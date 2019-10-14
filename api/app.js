import BodyParser from 'body-parser';
import UserRoutes from './v1/routes/UserRoutes';
import ProjectRoutes from './v1/routes/ProjectRoutes';
import TaskRoutes from './v1/routes/TaskRoutes';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));



app.use('/api/v1/user/',UserRoutes); //ROUTE TO USER ROUTES
app.use('/api/v1/project/',ProjectRoutes); //ROUTE TO PROJECT ROUTES
app.use('/api/v1/task/',TaskRoutes);//ROUTE TO TASK ROUTES



module.exports = app;