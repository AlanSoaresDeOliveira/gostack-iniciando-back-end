import { Router } from 'express';
import appointmentRoutes from './appointements.routes';
import usersRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
