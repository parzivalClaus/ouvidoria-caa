import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ManifestationController from './app/controllers/ManifestationController';
import AnswerController from './app/controllers/AnswerController';
import CloseManifestationController from './app/controllers/CloseManifestationController';
import FaqController from './app/controllers/FaqController';
import RecoveryPassController from './app/controllers/RecoveryPassController';

import authMiddleware from './app/middlewares/auth';

const { Router } = require('express');

const routes = new Router();

// Create user
routes.post('/users', UserController.store);

// Create session
routes.post('/sessions', SessionController.store);

// Recovery Pass
routes.post('/recovery-pass', RecoveryPassController.store);

// Generate New Pass
routes.get('/recovery-pass', RecoveryPassController.index);

routes.use(authMiddleware);

// Update user
routes.put('/users', UserController.update);

// List Manifestations
routes.get('/manifestation', ManifestationController.index);

// List one Manifestation
routes.get('/manifestation/:questionProtocol', ManifestationController.index);

// Create Manifestation
routes.post('/manifestation', ManifestationController.store);

// Close Manifestation
routes.put(
  '/close-manifestation/:questionProtocol',
  CloseManifestationController.update
);

// Create Answer
routes.post('/answer/:questionProtocol', AnswerController.store);

// List Answers
routes.get('/answers/:questionProtocol', AnswerController.index);

// List Faqs
routes.get('/faq', FaqController.index);

// Create Faq
routes.post('/faq', FaqController.store);

// Update Faq
routes.put('/faq/:faqId', FaqController.update);

export default routes;
