import { Request, Response } from 'express';
import { asyncHandler } from '@shared/types';
import { formatResponse } from '@shared/utilities/response-helpers';

export const getHello = asyncHandler(async (req: Request, res: Response) => {
  const message = 'Hello, World! 🌍 Your feature-oriented Express.js backend is running!';
  
  res.json(formatResponse({ message }, 'Hello endpoint accessed successfully'));
});

export const getHelloWithName = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.params;
  const message = `Hello, ${name}! 👋 Welcome to the feature-oriented backend!`;
  
  res.json(formatResponse({ message, name }, `Personalized greeting for ${name}`));
});

export const postHello = asyncHandler(async (req: Request, res: Response) => {
  const { name, message: userMessage } = req.body;
  
  const response = {
    greeting: `Hello, ${name || 'Anonymous'}! 🎉`,
    echo: userMessage ? `You said: "${userMessage}"` : 'No message provided',
    timestamp: new Date().toISOString(),
  };
  
  res.status(201).json(formatResponse(response, 'Hello message created successfully'));
});