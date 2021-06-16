import React from 'react';

const ExamContext = React.createContext();

export const ExamProvider = ExamContext.Provider;
export const ExamConsumer = ExamContext.Consumer;

export default ExamContext;
